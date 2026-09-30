// console.log("1");

// setTimeout(() => console.log("2"), 0);//Macrotask

// Promise.resolve().then(() => console.log("3"));

// console.log("4");
// //1,4,3,2 

// console.log("A");

// setTimeout(() => console.log("B"), 0);//macrotask

// Promise.resolve().then(() => {
//   console.log("C");
//   Promise.resolve().then(() => console.log("D"));
// });

// setTimeout(() => console.log("E"), 0);

// console.log("F");
//A, F, C, D, B, E

function logInOrder(){
    console.log(1) //immidiate execution
    console.log(2) //immidiate execution
    setTimeout(() => {console.log(3)},0)
    console.log(4) //immidiate execution
    console.log(5) //immidiate execution
    Promise.resolve().then(() => {console.log(6)})
}

logInOrder() //1,2,4,5,6,3