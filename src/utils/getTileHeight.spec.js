import { describe, expect, test } from '@jest/globals'
import { MAX_TILE_HEIGHT } from '~constants'
import { getTileHeight } from './getTileHeight'

describe('tile size', () => {
  const caseByWidth = { width: 320, height: 1024, radius: 4, result: 49 }
  const caseByHeight = { width: 1024, height: 320, radius: 4, result: 43 }
  const caseMax = { width: 1024, height: 1024, radius: 2, result: MAX_TILE_HEIGHT }
  
  test('should return correct tile sizes by sreen width', () => {
    const { width, height, radius, result } = caseByWidth
    expect(getTileHeight(width, height, radius)).toEqual(result)
  })

  test('should return correct tile sizes by sreen height', () => {
    const { width, height, radius, result } = caseByHeight
    expect(getTileHeight(width, height, radius)).toEqual(result)
  })

  test('should return max available size', () => {
    const { width, height, radius, result } = caseMax
    expect(getTileHeight(width, height, radius)).toEqual(result)
  })
})