export const getColor = (value: number, colors: string[]) => {
  const colorIndex = Math.min(Math.log2(value <= 0 ? 1 : value), colors.length - 1)
  return colors[colorIndex]
}
