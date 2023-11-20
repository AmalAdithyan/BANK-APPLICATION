const jwt = require('jsonwebtoken')
const db = require('./db.js')
//userDetails = {
//1000: { acno: 1000, username: "anu", password: "abc123", balance: 0, transaction: [] },  //1000: is bank data key // acno:1000(it is key and value)
//1001: { acno: 1001, username: "amal", password: "abc123", balance: 0, transaction: [] },
//1002: { acno: 1002, username: "arun", password: "abc123", balance: 0, transaction: [] },
//1003: { acno: 1003, username: "akil", password: "abc123", balance: 0, transaction: [] }
//}

register = (uname, acno, psw) => { //this is to store and also to check if the user registered data is already in ithe object or not
  //if (acno in userDetails) { //here we check if the user entered register data is in the userdetails
  return db.User.findOne({ acno }).then(user => { //findone cheyumbo oral nammude databasil indonnan nokkunath
    if (user) {              //different ports ayathukond findone asynchronous anu so output edukanamengil ".then" use cheyum           
      return {  //synchronus ayitula fn nde akath asynchronous call nadanal synchronus ayitula fn asynchronous avum
        status: false, // here we should use function with argument and return value because if you want a function that could call and store data. here we return false
        message: 'user already present',
        statusCode: 401
      }
    }
    else {
      //create a new user object in database
      const newuser = new db.User({
        acno,
        username: uname,
        password: psw,
        balance: 0,
        transaction: []
      })
      //save in db
      newuser.save()
      return {
        status: true,
        message: 'register success',
        statusCode: 200
      }
    }
  })

}

login = (acno, psw) => {
  // console.log("Login function in DataService called");
  //var userDetails = this.userDetails;
  // if (acno in userDetails) { // checking if account number is in userDetails
  //psw inde akathe passwordum 1000/any acno akathulla passwordum equal anoon check cheyyan
  return db.User.findOne({ acno, password: psw }).then(user => {
    if (user) {
      currentUser = user.username
      currentAcno = acno
      //console.log("User logged in:", this.currentUser);
      const token = jwt.sign({ currentAcno }, "supersecretkey123")
      return {
        status: true,
        message: 'login success',
        statusCode: 200,
        currentUser,
        currentAcno,
        token
      }
    }
    else {
      return {
        status: false,
        message: 'incorrect account number or password',
        statusCode: 401
      }
    }
  })

}

//alert("Login Successfull") //also [acnum].password cant be used here because []-- it
// here [acnum] is not in quotes bcoz its a variable and ["password"] is a direct keyword so given inside a string
//userDetails[acnum]gives that acno object //["password"] gives the password
//this.router.navigateByUrl('dashboard') //navigateByUral vechan redirect cheyendath.
//how to use it==>classine akathulla methodine call cheyan reference vechale call cheya here reference is "router" then router.method(which is  navigateByUrl)  
// here inside navigatebyurl('ivide redirect cheyendath engotan aa path kodukanam') 
//also use "this." to make it instance because its inside a class or method call cheyumbo instance akkanam 


deposit = (acnum, password, amount) => {
  // Convert string amount to number
  var amnt = parseInt(amount);
  return db.User.findOne({ acno: acnum, password }).then(user => {
    if (user) {
      user.balance += amnt
      user.transaction.push({ Type: "CREDIT", amount: amnt })
      user.save()
      return {
        status: true,
        message: `${amnt} is credited to your bank account and the balance is ${user.balance}`,
        statusCode: 200,
      }
    }
    else {
      return {
        status: false,
        message: 'incorrect password or account number',
        statusCode: 401
      }
    }
  })
}


//WITHDRAW
withdraw = (acnum, password, amount) => {

  // Convert string amount to number
  var amnt = parseInt(amount)
  return db.User.findOne({ acno: acnum, password }).then(user => {
    if (user) {
      if (amnt <= user.balance) {
        user.balance -= amnt
        user.transaction.push({ Type: "DEBIT", amount: amnt })
        user.save()
        return {
          status: true,
          message: `${amnt} is debited to your bank account and the balance is ${user.balance}`,
          statusCode: 200,
        }
      }
      else {
        return {
          status: false,
          message: 'insufficient balance',
          statusCode: 401
        }
      }
    }
    else {
      return {
        status: false,
        message: 'incorrect account or password',
        statusCode: 401
      }
    }
  })

}
transaction = (acno) => {
  return db.User.findOne({ acno }).then(data => {
    if (data) {
      return {
        status: true,
        statusCode: 200,
        transaction: data.transaction

      }
    }
  })

}
deleteAcc = (acno) => {
  return db.User.deleteOne({ acno }).then(user => {
    if (user) {
      return {
        status: true,
        statusCode: 200,
        message: 'account deleted'
      }
    }
    else {
      return {
        status: false,
        message: 'user not exist',
        statusCode: 401
      }
    }
  })
}

module.exports = {
  register, login, deposit, withdraw, transaction, deleteAcc
}