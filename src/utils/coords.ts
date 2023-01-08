import { TCubeCoords, TIndices, TOffsetCoords } from '~types'

export const cubeToOffset = (x: number, z: number): TOffsetCoords => {
  const col = x
  const row = z + (x - (x & 1)) / 2

  return { col, row }
}

export const offsetToCube = (col: number, row: number): TCubeCoords => {
  const x = col
  const z = row - (col - (col & 1)) / 2
  const y = (x * -1 + z * -1)
  return { x, z, y: y === 0 ? 0 : y }
}

export const offsetToIndices = (col: number, row: number, radius: number): TIndices => {
  const offset = radius - 1
  const diameter = radius * 2 - 1
  const colIndex = col + offset
  const rowIndex = row + Math.floor((diameter - Math.abs(col)) / 2)

  return { colIndex, rowIndex }
}

export const cubeToIndices = (x: number, z: number, radius: number): TIndices => {
  const { col, row } = cubeToOffset(x, z)
  
  return offsetToIndices(col, row, radius)
}

export const indicesToOffset = (colIndex: number, rowIndex: number, radius: number): TOffsetCoords => {
  const offset = radius - 1
  const diameter = radius * 2 - 1
  const offsetCol = colIndex - offset

  return {
    col: offsetCol,
    row: rowIndex - Math.floor((diameter - Math.abs(offsetCol)) / 2)
  }
}

export const indicesToCube = (colIndex: number, rowIndex: number, radius: number): TCubeCoords => {
  const offsetCoords = indicesToOffset(colIndex, rowIndex, radius)
  
  return offsetToCube(offsetCoords.col, offsetCoords.row)
}
