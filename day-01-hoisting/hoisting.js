console.log(x); //undefined because var defaults to undefined when hoisted
var x = 10;
console.log(x); //10 because x is now assigned the value 10

console.log(foo()); //hello because function declarations are hoisted to the top of their scope

function foo() {
    return "Hello!";
}

// console.log(a);
// let a = 5; //ReferenceError: Cannot access 'a' before initialization because let and const are hoisted but not initialized until their definition is evaluated

function test() { //function scope
    console.log(a); //undefined because var is hoisted and initialized to undefined
    var a = 10;
    console.log(a); //10 because a is now assigned the value 10
}

test();//function works because var is function scoped and hoisted to the top of the function

console.log(b); //undefined because var is hoisted and initialized to undefined
var b = 10;
var b = 20; //b is redeclared and reassigned to 20, but since var is function scoped, it does not throw an error.
console.log(b); //20 because b is now assigned the value 20

console.log(boo);//undefined because function expressions are not hoisted, only the variable declaration is hoisted, so boo is undefined at this point

var boo = function() {
    return "Hello!";
};

console.log(boo());//Hello! because boo is now assigned the function expression and can be called

// console.log(c); //ReferenceError: Cannot access 'c' before initialization because const is hoisted but not initialized until its definition is evaluated
// const c = 30;

function hoist() {
    console.log(c);//undefined because var is hoisted and initialized to undefined
    var c = 10;
    console.log(c);//10 because c is now assigned the value 10 only in function scope, not in the global scope  
}

var c = 20;
hoist();
console.log(c);//20 because c is now assigned the value 20 in the global scope

console.log(doo); //undefined because arrow functions are not hoisted, only the variable declaration is hoisted, so doo is undefined at this point

var doo = () => {
    return "Arrow Function!";
};

console.log(doo()); //Arrow Function! because doo is now assigned the arrow function and can be called

for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000); //(3, 3, 3) because var is function scoped and the value of i is 3 after the loop ends, so all the setTimeout callbacks will log 3
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j), 1000); //(0, 1, 2) because let is block scoped and each iteration has its own binding for j
}