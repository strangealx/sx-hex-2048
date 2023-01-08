import { describe, expect, test } from '@jest/globals'
import { cubeToIndices, cubeToOffset, indicesToCube, offsetToCube } from './coords'

describe('coordinates conversions', () => {
  const coords = [
    {
      cube: { x: 0, y: 0, z: 0 },
      offset: { col: 0, row: 0},
      indices: { radius: 2, colIndex: 1, rowIndex: 1 }
    },
    {
      cube: { x: -2, y: 3, z: -1 },
      offset: { col: -2, row: -2 },
      indices:{ radius: 4, colIndex: 1, rowIndex: 0 }
    },
    {
      cube: { x: -1, y: -2, z: 3 },
      offset: { col: -1, row: 2 },
      indices: { radius: 4, colIndex: 2, rowIndex: 5 }
    }
  ]

  describe('cube to offset', () => {
    test('should convert cube coordinates to offset', () => {
      coords.forEach(({ cube, offset }) => {
        expect(cubeToOffset(cube.x, cube.z)).toEqual(offset)
      })
    })
  })

  describe('offset to cube', () => {
    test('should convert offset coordinates to cube', () => {
      coords.forEach(({ cube, offset }) => {
        expect(offsetToCube(offset.col, offset.row)).toEqual(cube)
      })
    })
  })

  describe('cube to indices', () => {
    test('should convert cube coordinates to array indices', () => {
      coords.forEach(({ cube, indices: { radius, ...result } }) => {
        expect(cubeToIndices(cube.x, cube.z, radius)).toEqual(result)
      })
    })
  })

  describe('indices to cube', () => {
    test('should convert array indices to cube coordinates', () => {
      coords.forEach(({ cube, indices: { radius, ...indices } }) => {
        expect(indicesToCube(indices.colIndex, indices.rowIndex, radius)).toEqual(cube)
      })
    })
  })
})