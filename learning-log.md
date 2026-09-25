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

-day 4:
1. the difference of map/filter/reduce:
map = creating new array that each elemen was totaly change 
filter = creating new array that each elemen is not changing but the members element change depend on condition
reduce = creating a new single value(number, string, object, new array depend on value you choose for initVal) from all accumulation array element

2. bugs found in myReduce2 v1:
function myReduce2(arr, callback, initialValue){ //case tanpa initialvalue
    let result = initialValue
    let startindex = 0 
    if(initialValue){ 
        result = arr[0]
        startindex = 1
    }
    for(let i = 0; i < arr.length; i++){
        result = callback(result, arr[i])
    }
    return result
}
console.log(myReduce2([1, 2, 3, 4], (acc, n) => acc + n, 0)) //10
- `if (initialValue)` fails on `0` because `0` is falsy in JS, causing initial value check to bypass completely
- must use `initialValue === undefined` to safely check if the initial parameter was actually omitted
- `for (let i = 0)` ignores `startindex = 1`, causing the first element (`arr[0]`) to be processed twice

# Review Day 5: Reference, Shallow Copy & Deep Copy in JS

### 1. Why does changing `point2.x` also change `point.x`?
because **`point2` only stores a reference (memory address) to the same object as `point`, so both variables point to the same location in memory.**

---

### 2. Why does changing `arr2` (after spread) NOT affect `arr1`?
because **the spread operator (`...`) unpacks `arr1`'s elements into a completely new array instance with its own independent memory address.**

---

### 3. What's the difference between reference and copy in JS?
**A reference points to the same memory location (modifying one affects the other), while a copy creates a new independent instance with its own memory allocation.**

---

### 4. Why is spread (`{...obj}`) called a "shallow" copy, not a "deep" copy?
because **it only copies the top-level properties; nested objects (like `obj.profile`) are still copied by reference, meaning inner objects are still shared between both instances.**