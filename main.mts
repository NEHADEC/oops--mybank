import inquirer from "inquirer"

// Bank account interface

interface bankAcount{
    accountNumber: number;
    balance: number;
    withdrew(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

//bank account class

class bankAcount implements bankAcount{

accountNumber: number;
balance: number;

constructor(accountNumber: number, balance: number){
    this.accountNumber = accountNumber;
    this.balance = balance
}

// debit money
withdrew(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`withdraw of $${amount} successful. remaining balance: $${this.balance}`);
        
    }else {
        console.log("Insufficient balnce.");
        
    }
}
//credit money
deposit(amount: number): void {
   if (amount >100){
    amount -= 1; //$1 fee charged if more than $100 is deposit
   }this.balance += amount;
   console.log(`Deposit of $${amount} siccessful. Remaining balance: $${this.balance}`);
   
}
   //check balance 
   checkBalance(): void {
    console.log(`current balance: $${this.balance}`);
    
   }

}

//customer class
class customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: bankAcount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: bankAcount)

    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    
    }
}
    //create bank accounts

    const accounts: bankAcount[] = [
          new bankAcount (1001, 500),
          new bankAcount (1002, 1900),
          new bankAcount (1003, 2000),

    ];

    //create customers

const customers: customer[] = [
    new customer ("Neha", "bilal", "female", 17, 3162223334, accounts[0]),
    new customer ("faizan", "bilal", "male", 4, 1234567890, accounts[1]),
    new customer ("Nida", "bilal", "female", 16, 1234567890, accounts[2])
]

// function to interact with bank account


async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        })

         const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
         if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "select an operation",
                choices: ["Deposit", "Withdrew", "Check Balance", "Exit"]
            }]);

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount)
                    break;
                case "Withdrew":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.withdrew(withdrawAmount.amount)
                    break;
                 case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank program...");
                    console.log("\n Thank You for using our bank services. Have a Great Day!");
                    return;
                    
                    
            }
            
        }else{
            console.log("Invalid account number. please try again!");
            
        }
    }while(true)
}
service();
