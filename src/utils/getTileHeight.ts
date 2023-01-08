import { HEX_HEIGHT_TO_EDGE_RATIO, HEX_HEIGHT_TO_WIDTH_RATIO, MAX_TILE_HEIGHT, TILE_OFFSET } from '~constants'

export const getTileHeight = (screenWidth: number, screenHeight: number, radius: number): number => {
  const diameter = radius * 2 - 1
  const heightByScreenWidth = (screenWidth / diameter) * HEX_HEIGHT_TO_WIDTH_RATIO
  const heightByScreenHeight = screenHeight / diameter
  const height = Math.floor(
    Math.min(
      heightByScreenWidth + heightByScreenWidth / 2 * HEX_HEIGHT_TO_EDGE_RATIO - TILE_OFFSET,
      heightByScreenHeight - TILE_OFFSET,
      MAX_TILE_HEIGHT
    )
  )

  return height
}
