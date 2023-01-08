import { EKeys, TCubeCoords } from '~types'

export const MAX_TILE_HEIGHT = 64

export const HEADER_FOOTER_OFFSET = 128

export const TILE_OFFSET = 2

export const TILE_HEIGHT_TO_FONT_SIZE_RATIO = 2.4

export const HEX_HEIGHT_TO_EDGE_RATIO = 1 / Math.sqrt(3)

export const HEX_HEIGHT_TO_WIDTH_RATIO = Math.sqrt(3) / 2

export const DEFAULT_BOARD_RADIUS = 2

export const DEFAULT_API_PORT = 80

export const MOVEMEMT_ANIMATION_DURATION = 200

export const BLINK_ANIMATION_DURATION = 300

export const NEW_TILE_ANIMATION_DELAY = 150

export const INCREMENT_ANIMATION_DURATION = 500

export const COLORS = [
  '#000000',
  '#88B605',
  '#587603',
  '#293601',
  '#48765F',
  '#1A9C70',
  '#14C3B6',
  '#1591B6',
  '#1668C3',
  '#1C15B6',
  '#821DB6',
  '#C31555'
]

export const NEIGHBORS: Record<string, TCubeCoords> = {
  TOP: { x: 0, y: 1, z: -1 },
  TOP_LEFT: { x: -1, y: 1, z: 0 },
  TOP_RIGHT: { x: 1, y: 0, z: -1 },
  BOTTOM: { x: 0, y: -1, z: 1 },
  BOTTOM_LEFT: { x: -1, y: 0, z: 1 },
  BOTTOM_RIGHT: { x: 1, y: -1, z: 0 }, 
}

export const CONTROLS: { [key in keyof typeof EKeys]: string } = {
  NORTH_WEST: 'TOP LEFT',
  NORTH: 'TOP',
  NORTH_EAST: 'TOP RIGHT',
  SOUTH_WEST: 'BOTTOM LEFT',
  SOUTH: 'BOTTOM',
  SOUTH_EAST: 'BOTTOM RIGHT',
}
