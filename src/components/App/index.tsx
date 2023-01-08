import React, { useEffect, useState } from 'react'
import { DEFAULT_API_PORT, DEFAULT_BOARD_RADIUS } from '~constants'
import { useQueryParams } from '~hooks'
import { axios } from '~utils'
import { Game } from '../Game'

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false)
  const {
    radius: rawRadius = DEFAULT_BOARD_RADIUS,
    hostname: rawHostname = '',
    port: rawPort = DEFAULT_API_PORT
  } = useQueryParams('radius', 'hostname', 'port')

  // validate a little bit
  const radius = Number(rawRadius) || DEFAULT_BOARD_RADIUS
  const hostname = rawHostname.match(/^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/)?.[1] || '0.0.0.0'
  const port = Number(rawPort) || DEFAULT_API_PORT

  useEffect(() => {
    axios.defaults.baseURL = `http://${hostname}:${port}/${radius}`
    setIsReady(true)
  }, [hostname, port, radius])  

  return isReady ? <Game radius={Number(radius) || DEFAULT_BOARD_RADIUS} /> : null
}
