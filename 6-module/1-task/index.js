/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }

  render() {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${this.rows.map(row => `
          <tr>
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.salary}</td>
            <td>${row.city}</td>
            <td><button data-action="delete">X</button></td>
          </tr>
        `).join('')}
      </tbody>
    `;

    this.addEventListeners(table);
    return table;
  }

  addEventListeners(table) {
    table.addEventListener('click', (event) => {
      if (event.target.dataset.action === 'delete') {
        const row = event.target.closest('tr');
        row.remove();

        // Remove the row from the data
        const nameToDelete = row.querySelector('td:first-child').textContent;
        this.rows = this.rows.filter(row => row.name !== nameToDelete); // Update the internal data
      }
    });
  }
}
