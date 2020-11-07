class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    const isAllowed = function(value, balance) {
      if (value + balance >= 0) {
        return true;
      } else {
        return false;
      }
    }
    if (isAllowed(this.value, this.account.balance)) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      console.log('Insufficient funds');
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}
// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(150.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
