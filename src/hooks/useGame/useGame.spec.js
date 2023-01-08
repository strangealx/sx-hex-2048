import { renderHook, act } from '@testing-library/react'
import axios from 'axios'
import { EGameStatus, EKeys } from '~types'
import { Game, ERotateDirection } from '~entities'
import { useGame } from './useGame'

jest.mock('~entities/Game')

describe('useGame', () => {
  const radius = 2

  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')
    Game.mockClear()
  })
  
  afterEach(() => {
    jest.useRealTimers()
  })

  test('should return correct initial game state', () => {
    renderHook(() => useGame(radius))
    expect(Game).toBeCalledTimes(1)
    expect(Game).toBeCalledWith(radius)
  })

  test('should return an error on api request fail', async () => {
    const { result } = renderHook(() => useGame(radius))
    axios.post.mockRejectedValueOnce({ status: 500 })
    
    await act(async () => await result.current.startGame())
    expect(axios.post).toHaveBeenCalledWith("", [])
    expect(result.current.error).toEqual({ status: 500 })
  })

  test('should return sorted tiles', async () => {
    const { result } = renderHook(() => useGame(radius))
    const mockTiles = [{ x: 0, y: 0, z: 0, value: 2 }, { x: 1, y: 1, z: 1, value: 2 }]
    const tilesCount = mockTiles.length
    const mockGameInstance = Game.mock.instances[0]
    mockGameInstance.activeTiles = mockTiles.map(({  value, ...coords} , i) => ({
      value,
      cubeCoords: coords,
      id: tilesCount - i
    }))
    mockGameInstance.deletedTiles = []
    axios.post.mockResolvedValue({ data: [], status: 200, statusText: 'OK' })

    await act(async () => await result.current.startGame())
    expect(result.current.activeTiles).toEqual(
      mockGameInstance.activeTiles.sort(({ id: aId }, { id: bId }) => aId - bId)
    )
  })

  test('should call specific method on each move', async () => {
    const { result } = renderHook(() => useGame(radius))
    const mockGameInstance = Game.mock.instances[0]
    mockGameInstance.activeTiles = []
    mockGameInstance.deletedTiles = []
    axios.post.mockResolvedValue({ data: [], status: 200, statusText: 'OK' })
    const moves = {
      [EKeys.NORTH]: {
        method: 'mergeTop',
        args: []
      },
      [EKeys.NORTH_EAST]: {
        method: 'mergeDiagonalTop',
        args: [ERotateDirection.CLOCKWISE]
      },
      [EKeys.NORTH_WEST]: {
        method: 'mergeDiagonalTop',
        args: [ERotateDirection.COUNTER_CLOCKWISE]
      },
      [EKeys.SOUTH]: {
        method: 'mergeBottom',
        args: []
      },
      [EKeys.SOUTH_WEST]: {
        method: 'mergeDiagonalBottom',
        args: [ERotateDirection.CLOCKWISE]
      },
      [EKeys.SOUTH_EAST]: {
        method: 'mergeDiagonalBottom',
        args: [ERotateDirection.COUNTER_CLOCKWISE]
      }
    }

    await act(async () => await result.current.startGame())

    const cases = Object.entries(moves)
    for (let i = 0; i < cases.length; i += 1) {
      const [key, { method, args }] = cases[i]
      await act(async () => await result.current.handleMove(key))
      expect(mockGameInstance[method]).toBeCalled()
      expect(mockGameInstance[method]).toBeCalledWith(...args)
    }
  })

  test('should do nothing on invalid move key', async () => {
    const { result } = renderHook(() => useGame(radius))
    const mockGameInstance = Game.mock.instances[0]
    mockGameInstance.activeTiles = []
    mockGameInstance.deletedTiles = []
    axios.post.mockResolvedValue({ data: [], status: 200, statusText: 'OK' })
    const moves = ['mergeTop', 'mergeBottom', 'mergeDiagonalTop']

    await act(async () => await result.current.startGame())
    await act(async () => await result.current.handleMove('key'))

    for (let i = 0; i < moves.length; i += 1) {
      expect(mockGameInstance[moves[i]]).not.toHaveBeenCalled()
    }
    expect(result.current.isControlsBlocked).toBe(false)
  })

  test('should return an error on move api request fail', async () => {
    const { result } = renderHook(() => useGame(radius))
    const mockGameInstance = Game.mock.instances[0]
    const mockMergeTop = mockGameInstance.mergeTop
    mockGameInstance.activeTiles = []
    mockGameInstance.deletedTiles = []
    axios.post.mockResolvedValueOnce({ data: [], status: 200, statusText: 'OK' })
    await act(async () => await result.current.startGame())
    expect(result.current.error).toBe(undefined)

    mockMergeTop.mockReturnValueOnce(true)
    axios.post.mockRejectedValueOnce({ status: 500 })
    await act(async () => await result.current.handleMove(EKeys.NORTH))
    expect(result.current.error).toEqual({ status: 500 })
  })

  test('should return correct game status', async () => {
    const { result } = renderHook(() => useGame(radius))
    const mockGameInstance = Game.mock.instances[0]
    const mockResponse = [{ x: 0, y: 0, z: 0, value: 2 }]
    mockGameInstance.gameOver = false
    mockGameInstance.activeTiles = mockResponse.map(({  value, ...coords }) => ({ value, cubeCoords: coords }))
    mockGameInstance.deletedTiles = []
    axios.post.mockResolvedValue({ data: mockResponse, status: 200, statusText: 'OK' })

    await act(async () => await result.current.startGame())
    expect(result.current.status).toBe(EGameStatus.PLAYING)
    expect(result.current.gameOver).toBe(false)

    mockGameInstance.gameOver = true
    await act(async () => await result.current.startGame())
    expect(result.current.status).toBe(EGameStatus.GAME_OVER)
    expect(result.current.gameOver).toBe(true)
  })
  
  test('should allow you to use Game instance as react hook', async () => {
    const { result } = renderHook(() => useGame(radius))
    const mockGameInstance = Game.mock.instances[0]
    const mockAddTile = mockGameInstance.addTile
    const mockMergeTop = mockGameInstance.mergeTop
    const mockResponse = [{ x: 0, y: 0, z: 0, value: 2 }]
    mockGameInstance.activeTiles = mockResponse.map(({  value, ...coords }) => ({ value, cubeCoords: coords }))
    mockGameInstance.deletedTiles = []
    axios.post.mockResolvedValue({ data: mockResponse, status: 200, statusText: 'OK' })
    
    expect(result.current.isLoading).toBe(true)

    await act(async () => await result.current.startGame())
    expect(axios.post).toHaveBeenCalledWith("", [])
    expect(mockAddTile).toBeCalledTimes(mockResponse.length)
    expect(mockAddTile).toBeCalledWith(mockResponse[0])
    expect(result.current.isLoading).toBe(false)
  
    mockMergeTop.mockReturnValueOnce(true)
    await act(async () => await result.current.handleMove(EKeys.NORTH))
    expect(axios.post).toHaveBeenCalledWith("", mockResponse)
    expect(mockMergeTop).toBeCalledTimes(1)
    expect(result.current.isControlsBlocked).toBe(true)
  
    await act(async () => {
      jest.runAllTimers()
    })
    expect(mockAddTile).toBeCalledTimes(mockResponse.length * 2)
    expect(mockAddTile).toBeCalledWith(mockResponse[0])
    expect(result.current.isControlsBlocked).toBe(false)
  })

  test('should allow you to restart game', async () => {
    const { result } = renderHook(() => useGame(radius))
    const mockGameInstance = Game.mock.instances[0]
    const mockResponse = [{ x: 0, y: 0, z: 0, value: 2 }]
    mockGameInstance.activeTiles = mockResponse.map(({  value, ...coords }) => ({ value, cubeCoords: coords }))
    mockGameInstance.deletedTiles = []
    axios.post.mockResolvedValue({ data: mockResponse, status: 200, statusText: 'OK' })
    
    expect(result.current.isLoading).toBe(true)

    await act(async () => await result.current.startGame())
    expect(result.current.isLoading).toBe(false)
    expect(axios.post).toBeCalledTimes(1)
    await act(async () => await result.current.restartGame())
    expect(result.current.isLoading).toBe(true)
  })
})
