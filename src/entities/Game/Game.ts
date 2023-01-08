import { NEIGHBORS } from '~constants'
import { TCell, TCubeCoords } from '~types'
import { cubeToIndices, indicesToCube, indicesToOffset } from '../../utils/coords'
import { ERotateDirection, EVerticalDirection, TBoard, TGame, TTile, TTileWithCoords } from './types'
import { fillWithNull, shift } from './utils'

export class Game implements TGame {
  private _radius: number
  private _board: TBoard
  private _deleted: TBoard
  private _idCounter: number
  private _moves: number
  private _score: number
  private _gameOver: boolean

  constructor(radius: number) {
    this._radius = radius
    this._board = this._createBoard(radius)
    this._deleted = []
    this._moves = 0
    this._score = 0
    this._gameOver = false
    this._idCounter = 0
  }

  get moves() {
    return this._moves
  }

  get score() {
    return this._score
  }

  get gameOver() {
    return this._gameOver
  }

  get radius() {
    return this._radius
  }

  get diameter() {
    return this._radius * 2 - 1
  }

  get board() {
    return this._board
  }

  get allTiles() {
    const { board } = this
    const output: TTileWithCoords[] = []

    this._each(board, (tile, col, row) => {
      output.push(this._fillTile(tile, col, row))
    })

    return output
  }

  get activeTiles() {
    const { board } = this
    const output: TTileWithCoords[] = []

    this._each(board, (tile, col, row) => {
      if (tile) {
        output.push(this._fillTile(tile, col, row))
      }
    })

    return output
  }

  get deletedTiles() {
    const { _deleted: board } = this
    const output: TTileWithCoords[] = []

    this._each(board, (tile, col, row) => {
      if (tile) {
        output.push({ ...this._fillTile(tile, col, row), deleted: true })
      }
    })

    return output
  }

  private _createBoard(radius: number) {
    const { diameter } = this
    const output: TBoard = []
    let count = radius
    let modifier = 1;
    
    for (let col = 0; col < diameter; col += 1) {
      for (let row = 0; row < count; row += 1) {
        if (!output[col]) {
          output[col] = []
        }

        output[col][row] = null
      }

      count += 1 * modifier

      if (count === diameter) {
        modifier *= -1
      }
    }

    return output
  }

  private _each(board: TBoard, fn: (tile: TTile | null, col: number, row: number) => void) {
    for (let col = 0; col < board.length; col += 1) {
      for (let row = 0; row < board[col].length; row += 1) {
        fn(board[col][row], col, row)
      }
    }
  }

  private _fillTile(tile: TTile | null, col: number, row: number) {
    const { radius } = this

    return {
      offsetCoords: indicesToOffset(col, row, radius),
      cubeCoords: indicesToCube(col, row, radius),
      ...(tile || { value: 0, id: 0 })
    }
  }

  private _addTile(tile: TCell & { id?: number }, board: TBoard): TBoard {
    const { radius } = this
    const { value, id, ...cubeCoords } = tile
    const { colIndex, rowIndex } = cubeToIndices(cubeCoords.x, cubeCoords.z, radius)
    const stored = board[colIndex][rowIndex]

    if (stored?.value) {
      throw new Error('Can\'t add tile: already exists')
    }

    board[colIndex][rowIndex] = { value, id: id || ++this._idCounter }
    
    return board
  }

  private _merge(board: TBoard) {
    const { radius, diameter, _board } = this
    const output: { shifted: TBoard, deleted: TBoard, score: number } = { shifted: [], deleted: [], score: 0 }

    for (let col = 0; col < board.length; col += 1) {
      const length = diameter - Math.abs(col - (radius - 1))
      const { tiles: shifted, deleted, score } = shift({ tiles: _board[col], deleted: [] })

      output.shifted[col] = fillWithNull(shifted, length)
      output.deleted[col] = fillWithNull(deleted, length)
      output.score += score || 0
    }

    return output
  }

  private _rotate(direction: ERotateDirection) {
    const { radius, activeTiles, deletedTiles } = this
    const board = this._createBoard(radius)
    const deleted = this._createBoard(radius)
    const addTile = (tile: TTileWithCoords, board: TBoard) => {
      const { value, id, cubeCoords: { x, y, z } } = tile
      const rotatedCoords = direction === ERotateDirection.CLOCKWISE
        ? { x: -y, y: -z, z: -x }
        : { x: -z, y: -x, z: -y }
      this._addTile({ value, id, ...rotatedCoords }, board)
    }
    activeTiles.forEach((tile) => addTile(tile, board))
    deletedTiles.forEach((tile) => addTile(tile, deleted))

    return { board, deleted }
  }

  private _save(board: TBoard, deleted: TBoard, score: number = 0) {
    this._board = board
    this._deleted = deleted
    this._score += score
  }

  private _checkMoves(neighbors: TCubeCoords[] = Object.values(NEIGHBORS)): boolean {
    const { activeTiles, radius, board } = this
    for (let i = 0; i < activeTiles.length; i += 1) {
      const { value, cubeCoords: { x, z } } = activeTiles[i]

      for (let n = 0; n < neighbors.length; n += 1) {
        const { x: nX, z: nZ } = neighbors[n]
        const { colIndex, rowIndex } = cubeToIndices(x + nX, z + nZ, radius)

        if (board[colIndex]?.[rowIndex] === null || value === board[colIndex]?.[rowIndex]?.value) {
          return true
        }
      }
    }

    return false
  }

  private _executeMove(fn: () => void, neightbors?: TCubeCoords[]): boolean {
    if (!this._checkMoves(neightbors)) {
      return false
    }
  
    fn()
    this._moves += 1
    if (!this._checkMoves()) {
      this._gameOver = true
    }

    return true
  }

  private _mergeTop() {
    const { board } = this
    const { shifted, deleted, score } = this._merge(board)
    this._save(shifted, deleted, score)
  }

  private _mergeBottom() {
    const { board } = this
    const mapReverse = (col: (TTile | null)[]) => col.reverse()
    const { shifted, deleted, score } = this._merge(board.map(mapReverse))
    this._save(shifted.map(mapReverse), deleted.map(mapReverse), score) 
  }

  private _mergeDiagonal(direction: EVerticalDirection, rotate: ERotateDirection, ) {
    const { board: rotatedBoard, deleted: rotatededDeleted } = this._rotate(rotate)
    this._save(rotatedBoard, rotatededDeleted)
    direction === EVerticalDirection.TOP ? this._mergeTop() : this._mergeBottom()
    const { board, deleted } = this._rotate(rotate * -1)
    this._save(board, deleted)
  }

  addTile(tile: TCell) {
    this._board = this._addTile(tile, this._board)

    if (!this._checkMoves()) {
      this._gameOver = true
    }
  }

  mergeTop() {
    return this._executeMove(() => this._mergeTop(), [NEIGHBORS.TOP])
  }

  mergeBottom() {
    return this._executeMove(() => this._mergeBottom(), [NEIGHBORS.BOTTOM])
  }

  mergeDiagonalTop(rotate: ERotateDirection) {
    return this._executeMove(() => {
      this._mergeDiagonal(EVerticalDirection.TOP, rotate)
    }, [rotate === ERotateDirection.CLOCKWISE ? NEIGHBORS.TOP_RIGHT : NEIGHBORS.TOP_LEFT])
  }

  mergeDiagonalBottom(rotate: ERotateDirection) {
    return this._executeMove(() => {
      this._mergeDiagonal(EVerticalDirection.BOTTOM, rotate)
    }, [rotate === ERotateDirection.CLOCKWISE ? NEIGHBORS.BOTTOM_LEFT : NEIGHBORS.BOTTOM_RIGHT])
  }
}
