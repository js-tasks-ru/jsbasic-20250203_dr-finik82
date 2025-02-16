function showSalary(users, age) {
  let result = '';

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.age <= age) {
      result += `${user.name}, ${user.balance}`;
      if (i < users.length - 1) {
        let nextUserIsEligible = false;
        for (let j = i + 1; j < users.length; j++) {
          if (users[j].age <= age) {
            nextUserIsEligible = true;
            break;
          }
        }
        if (nextUserIsEligible)
          result += '\n';
      }
    }
  }

  return result;
}
