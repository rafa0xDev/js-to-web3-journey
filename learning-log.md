-day 1 :
what is function scope? = Variables defined inside a function are not accessible (visible) from outside the function.
what is global scope? = variables defined in outside function, for loops, and anything, they are accessible from inside or outside

`let j` and `var i` have different bindings; `let j` is block-scoped, so `j` has a separate binding for each iteration, whereas `var` follows function scope—which is why the final result differs.

-day 2: 
what is closure? = closure is a inner function that remember and can acsess the outer scope variable
Where a variable is declared decides whether it's shared. If it's declared inside the function, each call creates a new, separate box. If it's declared outside, all calls share the same box — so calling one function can affect another that references the same variable.

-day 3:
1. "this" is a way to accses data/property of the object calling it without having to hardcode the object's name.
example :
const user1 = {
  nama: "Budi",
  sapa: function() {
    console.log("Halo " + user1.nama); // if variable name user1 changed, it broke because user1 is no longer exist
  }
};
however using "this" more dynamic and flexible :
const user1 = {
  nama: "Budi",
  sapa: function() {
    console.log("Halo " + this.nama); //it gonna be okay if the object name's changing, "this" gonna be flexible following object calling without having to hardcode the object's name.
  }
};
user1.sapa() // Halo Budi
2. why greetFn() and user.greet() output is different?
because greetFn() just coppying the user greet function, when the greetFn() running, "this" have no reference so it refers to the global object and then the output is undefined, however user.greet() work normally because greet() function was called by user object, so "this" has reference to the user object reference.
3. why arrow function in setTimeout saving "this"? 
because when setTimeout finished the timer set,arrow function has no "this" in default, so it will move up a level, then the arrow function found the delayedGreet function, delayedGreet from the user4 object, so "this" using the reference from user4
