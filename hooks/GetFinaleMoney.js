import { auth } from "../config";

const GetFinaleMoney = (arrayhavingautuser) => {
  let arrayuser = [];
  let arrayamount = [];
  let a = 0,
    b = 0;
  let moneytake = 0,
    moneygive = 0;
  for (let k = 0; k < arrayhavingautuser.length; k++) {
    var data = Object.values(arrayhavingautuser[k].expenses || {});

    for (let i = 0; i < data.length; i++) {
      let paidby = data[i].paidby;
      let amount = data[i].amount / data[i].splittingusers.length;
      for (let j = 0; j < data[i].splittingusers.length; j++) {
        if (
          paidby !== data[i].splittingusers[j].user &&
          (paidby === auth.currentUser.email ||
            data[i].splittingusers[j].user === auth.currentUser.email) &&
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
            };
            arrayamount[b] = amount;
            a++;
            b++;
          }
        }
      }
    }
  }
  arrayuser.forEach((i, index) => {
    if (arrayamount[index] < 0) {
      if (i.by === auth.currentUser.email) {
        moneytake += Math.abs(arrayamount[index]);
      }
    } else {
      if (i.to === auth.currentUser.email) {
        moneytake += arrayamount[index];
      }
    }
  });
  arrayuser.forEach((i, index) => {
    if (arrayamount[index] < 0) {
      if (i.to === auth.currentUser.email) {
        moneygive += Math.abs(arrayamount[index]);
      }
    } else {
      if (i.by === auth.currentUser.email) {
        moneygive += arrayamount[index];
      }
    }
  });
  return {
    moneygive: Math.round(moneygive),
    moneytake: Math.round(moneytake),
    arrayuser,
    arrayamount,
  };
};

export default GetFinaleMoney;
