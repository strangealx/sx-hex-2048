import { axios } from '~utils'
import { TCell } from '../types/game'

export const createGame = async (): Promise<TCell[]> => {
  const { data } = await axios.post<TCell[]>('', [])
  return data
}

export const submitMove = async (filled: TCell[]): Promise<TCell[]> => {
  const { data } = await axios.post<TCell[]>('', filled)
  return data
}
