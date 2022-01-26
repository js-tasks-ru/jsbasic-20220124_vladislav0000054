function factorial(n) {
  if(n === 0 || n === 1){
    return 1;
  }

  let result = n;
  let nextNumber = n - 1;

  while (nextNumber >= 1) {
    result *= nextNumber;
    nextNumber--;
  }

  return result;
}