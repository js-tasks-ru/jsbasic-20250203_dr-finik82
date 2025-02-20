function highlight(table) {
  let tbody = table.querySelector('tbody');
  let rows = tbody.rows;

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];

    let statusCell = row.cells[3];
    if (statusCell.dataset.available === 'true') {
      row.classList.add('available');
    } else if (statusCell.dataset.available === 'false') {
      row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }

    let genderCell = row.cells[2];
    if (genderCell.textContent === 'm') {
      row.classList.add('male');
    } else if (genderCell.textContent === 'f') {
      row.classList.add('female');
    }

    let ageCell = row.cells[1];
    if (Number(ageCell.textContent) < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}

