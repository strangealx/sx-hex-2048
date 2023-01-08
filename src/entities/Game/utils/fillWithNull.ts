export const fillWithNull = <T>(arr: T[], length: number): (T | null)[] => {
  const start = arr.length
  arr.length = length

  return (arr as (T | null)[]).fill(null, start, arr.length)
}
