function sumSalary(salaries) {
  let salariesSum = 0;

  for (let prop in salaries) {
    let propValue = salaries[prop];

    if(typeof propValue === 'number' && isFinite(propValue)){
      salariesSum += propValue;
    }
  }

  return salariesSum;
}
