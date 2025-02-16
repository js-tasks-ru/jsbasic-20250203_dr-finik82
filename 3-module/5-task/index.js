function getMinMax(str) {
  const numbers = str
    .split(' ')
    .map(Number)
    .filter(Number.isFinite);

  if (numbers.length === 0) {
    return { min: NaN, max: NaN };
  }

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return { min, max };
}
