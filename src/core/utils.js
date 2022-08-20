export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


export function range(start, end) {
  //reversing values to get the correct range
  if (start > end) [start, end] = [end, start]

  return new Array(end - start + 1)
    .fill('')
    .map((_, index) => start + index)
}