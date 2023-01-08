import { describe, expect, test } from '@jest/globals'
import { COLORS } from '~constants'
import { getColor } from './getColor'

describe('tile color', () => {
  test('should return correct color for specific value', () => {
    for (let value = 2, i = 1; value < 2 ** 11; value *= 2, i += 1) {
      expect(getColor(value, COLORS)).toEqual(COLORS[i])
    }
  })

  test('should return last available color for too big value', () => {
    expect(getColor(2 ** COLORS.length + 1, COLORS)).toEqual(COLORS[COLORS.length - 1])
  })

  test('should return first available color for too small value', () => {
    expect(getColor(0, COLORS)).toEqual(COLORS[0])
    expect(getColor(1, COLORS)).toEqual(COLORS[0])
  })

  test('should return first available color for negative value', () => {
    expect(getColor(-5, COLORS)).toEqual(COLORS[0])
  })
})