-day 1 :
what is function scope? = Variables defined inside a function are not accessible (visible) from outside the function.
what is global scope? = variables defined in outside function, for loops, and anything, they are accessible from inside or outside

`let j` and `var i` have different bindings; `let j` is block-scoped, so `j` has a separate binding for each iteration, whereas `var` follows function scope—which is why the final result differs.

-day 2: 
what is closure? = closure is a inner function that remember and can acsess the outer scope variable
Where a variable is declared decides whether it's shared. If it's declared inside the function, each call creates a new, separate box. If it's declared outside, all calls share the same box — so calling one function can affect another that references the same variable.
