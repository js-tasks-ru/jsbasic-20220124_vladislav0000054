function highlight(table) {
  let tBody = table.tBodies[0];

  for (const row of tBody.rows) {
    let availableCell = row.cells[3];
    let genderCell = row.cells[2];
    let ageCell = row.cells[1];

    if(!availableCell.hasAttribute('data-available')){
      row.setAttribute('hidden', 'true');
    }else{
      if(availableCell.dataset.available === 'true'){
        row.classList.add('available');
        row.classList.remove('unavailable');
      }else{
        row.classList.add('unavailable');
        row.classList.remove('available');
      }
    }

    if(genderCell.innerHTML === 'm'){
      row.classList.add('male');
      row.classList.remove('female');
    }else{
      row.classList.add('female');
      row.classList.remove('male');
    }

    if(+ageCell.innerHTML < 18){
      row.style.textDecoration = 'line-through';
    }
  }
}
