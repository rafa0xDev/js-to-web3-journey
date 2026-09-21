function makeCounter() {
  let count = 0;
  return {
    increment: function() {
        count++;
        return count;
    },
    reset: function() {
        count = 0;
        return count;
    }
  }
}

let counter1 = makeCounter();
let counter2 = makeCounter();

counter1.increment(); //1
counter1.increment(); //2
counter1.increment(); //3

counter2.increment(); //1

function outer() {
  let secret = "hidden";
  function inner() {
    console.log(secret);
  }
  return inner;
}
const reveal = outer(); //the answer is "hidden" will be printed when reveal() is called
reveal(); // "hidden"

function once(fn) {
    let called = false;
    return function(...args){
        if(!called){
            called = true;
            return fn(...args);
        }   
    }
}

const logOnce = once((message) => console.log(message));
logOnce("Hello!"); // "Hello!"
logOnce("Second try") //no output, because the called variabel has been set to true after the first call

let called2 = false;
function once2(fn) {
    return function(...args){
        if(!called2){
            called2 = true;
            return fn(...args);
        }   
    }
}
const logA = once2((message) => console.log("A:",message));
const logB = once2((message) => console.log("B:",message));
logA("Hello!"); // "A: Hello!"
logB("Second try") // "B: Second try" because the called2 variable is shared between logA and logB, so the second call to logB will not be executed