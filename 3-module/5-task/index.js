function getMinMax(str) {
  let numbersArray = str
    .split(' ')
    .filter(x => isFinite(x));
    
  let min = Math.min(...numbersArray);
  let max = Math.max(...numbersArray);
  
  return {
    min,
    max,
  };
}