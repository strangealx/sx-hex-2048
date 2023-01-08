export const useQueryParams = (...keys: string[]): Partial<Record<string, string>> => {
  const params = new URLSearchParams(window.location.search)

  return keys.reduce<Record<string, string>>((carry, key) => {
    const value = params.get(key)
  
    return {
      ...carry,
      ...(value ? { [key]: value } : undefined)
    }
  }, {})
}
