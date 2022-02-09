export default class UserTable {
  _elem = null;

  constructor(rows) {
    this._elem = document.createElement('table');
    initTableRows(this._elem, rows);
  }

  get elem(){
    return this._elem;
  }
}

function initTableRows(table, rows){
  table.innerHTML = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>`;

  for (const row of rows) {
     const tr = `
      <tr onclick="this.remove()">
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      </tr>`;  
      
      table.insertAdjacentHTML('beforeEnd', tr);
  }
}