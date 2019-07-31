const chalk = require('chalk');

console.log(chalk.red('-------- output for of results ----------'));
let someArray = [1, "string", false];

for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}


console.log(chalk.red('\n\n-------- output for-of vs for-in results ----------'));
let list = [4, 5, 6];
for (let i in list) {
   console.log(i); // "0", "1", "2",
}
console.log('----------------');
for (let i of list) {
   console.log(i); // "4", "5", "6"
}

console.log(chalk.red('\n\n-------- output for-of vs for-in results 2 ----------'));
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
   console.log(pet); // "species"
}

for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}

console.log(chalk.red('\n\n---------- result of compile ------------'));
let numbers = [1, 2, 3];
for (let num of numbers) {
    console.log(num);
}

console.log(chalk.red('\n\n---------- custom iterator by generator ------------'));
const students = {
    *[Symbol.iterator] () {
        yield 'student1';
        yield 'student2';
        yield 'student3';
        return 'student4';
    }
};
let studentName;
for (studentName of students) {
    console.log(`studenta: ${studentName}`);
}