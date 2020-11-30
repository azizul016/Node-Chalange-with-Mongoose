// console.log("azizul");

// setTimeout(() => {
//     console.log("rane");
// }, 3000);

// console.log("haque");
// debugger;

// const number = [1,22,2,32,33]
// const newNumber = number.find(num => num > 32)
// // console.log(newNumber);

// console.log(number.values(2));

// function makeAdder(x) {
//     return function(y) {
//       return x + y;
//     };
//   }

//   var add5 = makeAdder(5);
//   var add10 = makeAdder(10);
//   console.log(add5);

//   console.log(add5(2));  // 7
//   console.log(add10(2)); // 12

// function greeting(name) {
// //   alert("Hello " + name);
// // console.log(name);
// }

// function processUserInput(callback) {
//   var name = "azizul";
//   callback(name);
// }

// processUserInput(greeting('ranaa'));

// const dd = new String('rana');
// console.log(dd);
// console.log(dd.valueOf());
// var x = 10;
// var y = 20;
// var a = eval("x * y")
// console.log(typeof(a));

// const name = 'azizul';
// const newName = new String("rana")
// const againNew = newName.toString()
// const againName = newName.valueOf()
// console.log(againNew);
// console.log(typeof(againNew));
// console.log(againName);
// console.log(typeof(againName));

const question = ["What's your name?", "How old are you?"];
const answer = [];
process.stdout.write(question[0]);
process.stdin.on('data', (dat) => {
    console.log(dat.toString());
})