-day 1 :
what is function scope? = Variables defined inside a function are not accessible (visible) from outside the function.
what is global scope? = variables defined in outside function, for loops, and anything, they are accessible from inside or outside

`let j` and `var i` have different bindings; `let j` is block-scoped, so `j` has a separate binding for each iteration, whereas `var` follows function scope—which is why the final result differs.