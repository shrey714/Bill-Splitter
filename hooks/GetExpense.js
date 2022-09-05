const getExpense = (data) => {
  let arrayuser = [];
  let arrayamount = [];
  let a = 0,
    b = 0;
  for (let i = 0; i < data.length; i++) {
    let paidby = data[i].paidby;
    let amount = data[i].amount / data[i].splittingusers.length;
    for (let j = 0; j < data[i].splittingusers.length; j++) {
      if (
        paidby !== data[i].splittingusers[j].user &&
        data[i].splittingusers[j].status === false
      ) {
        const index = arrayuser.findIndex((element, index) => {
          if (
            element.to === paidby &&
            element.by === data[i].splittingusers[j].user
          ) {
            arrayamount[index] = arrayamount[index] + amount;
            return true;
          } else if (
            element.to === data[i].splittingusers[j].user &&
            element.by === paidby
          ) {
            arrayamount[index] = arrayamount[index] - amount;
            return true;
          }
          return false;
        });
        if (index === -1) {
          arrayuser[a] = {
            to: paidby,
            by: data[i].splittingusers[j].user,
            status: data[i].splittingusers[j].status,
          };
          arrayamount[b] = amount;
          a++;
          b++;
        }
      }
    }
  }
  return { arrayuser, arrayamount };
};

export default getExpense;
