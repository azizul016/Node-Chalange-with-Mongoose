// const os = require('os');
// console.log(os.platform())

//process module stdout and stdin process
// process.stdout.write("hello \n");
// process.stdout.write("world \n");
// process.stdin.on("data", (data) => {
//   if (data.toString().trim().toLowerCase() === "exit") {
//     process.exit();
//   } else {
//     console.log(data.toString());
//   }
// });

// process.on("exit", () => {
//   console.log("program is existed");
// });

//question and answer of process stdout and stdin;
//Link: https://www.youtube.com/watch?v=PK3cpqlM43E&list=PLyrs5AgsUPcU_ARdJ4X0s-fugt3vu4Vc8&index=18&ab_channel=webdeveloperbd
// const question = ["What's your name?", "How old are you?"];
// const answer = [];
// process.stdout.write(question[0]);
// process.stdin.on("data", (data) => {
//   answer.push(data.toString().trim());
//   if (answer.length < question.length) {
//     // when answer length is 1 then question length 2.
//     process.stdout.write(question[answer.length]); //another question write and kon question write hobe sheta index dara busa jabe.
//   } else {
//     process.exit();
//   }
//   // console.log(data.toString());
// });
// process.on("exit", () => {
//   for (const value of answer) {
//     // console.log(answer);
//     console.log(value);
//   }
// });

/////using readline for answer and question;
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = ["What's your name?", "How old are you?"];
const answer = [];
// rl.question('Whats is your name?', answer =>{
//   console.log(answer);
//   rl.setPrompt('How old are you?');
//   rl.prompt()
// })

rl.question(question[0], (data) => {
  // console.log(data);
  answer.push(data);
  if (answer.length < question.length) {
    rl.setPrompt(question[answer.length]);
    rl.prompt();
    rl.on("line", (data) => {
      if (data.toLowerCase().trim().toString() == "exit") {
        rl.close();
      } else {
        rl.setPrompt("What do you want?(If you want leave this app please write 'exit')");
        rl.prompt();
      }
      answer.push(data);

      // console.log(data);
    });
  }
});

rl.on("close", () => {
  console.log(`total data ${answer}`);
})
