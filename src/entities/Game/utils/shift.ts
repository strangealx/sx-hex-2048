import { TTile } from '../types'

type TShift = {
  tiles: (TTile | null)[]
  deleted: (TTile | null)[]
  score?: number
}

export const shift = (prev: TShift): TShift => {
  const {
    tiles: [tile0, tile1, ...restTiles],
    deleted,
    score = 0
  } = prev

  if (tile0 === undefined) {
    return { ...prev, tiles: [] }
  }
  if (tile0 === null) {
    return shift({ ...prev, tiles: [tile1, ...restTiles] })
  }
  if (tile1 === null) {
    return shift({ ...prev, tiles: [tile0, ...restTiles] })
  }
  if (tile0?.value === tile1?.value) {
    const value = tile1.value * 2
    const {
      tiles: deeperTiles,
      ...next
    } = shift({ tiles: restTiles, deleted: [...deleted, tile0], score: score + value })

    return { tiles: [{ ...tile1, value }, ...deeperTiles], ...next }
  }

  const {
    tiles: deeperTiles,
    ...next
  } = shift({ tiles: [tile1, ...restTiles], deleted: [...deleted, null], score })

  return { tiles: [tile0, ...deeperTiles], ...next }
}
