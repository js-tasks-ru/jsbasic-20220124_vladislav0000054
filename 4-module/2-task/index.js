function makeDiagonalRed(table) {
  let diagonalLength = table.rows.length;

  for (let i = 0; i < diagonalLength; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
