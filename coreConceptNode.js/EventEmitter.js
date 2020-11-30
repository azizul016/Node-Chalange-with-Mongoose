const EventEmitter = require("events").EventEmitter;
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();
const myEmitter = new EventEmitter();
function greeting() {
  myEmitter.on("greet", (data) => {
    // console.log(data);
  });
//   console.log("This is greeting function");
}
greeting();
myEmitter.emit("greet", "azizul", "rana");


//emitemitter using in class based ;

class Greetings extends EventEmitter {
    constructor(name){
        super();
        this.name = name;
    }
    // greet(){
    //     myGreetings.on('greet', data => {
    //         console.log(`${data} ${myGreetings.name}`);
    //     })
    // }
    greet(){
        this.on('greet', data =>{
            console.log(`${data} ${this.name}`);
        })
    }
}
const myGreetings = new Greetings('rana')
// console.log(myGreetings);
myGreetings.greet();
myGreetings.emit('greet', 'hello')

