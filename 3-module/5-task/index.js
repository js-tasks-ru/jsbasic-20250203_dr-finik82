function getMinMax(str) {
  const numbers = str
    .split(' ')
    .map(Number)
    .filter(Number.isFinite);

  if (numbers.length === 0) {
    return { min: NaN, max: NaN };
  }

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  }
}