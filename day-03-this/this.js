const user = {
  name: "Rafa",
  greet: function() {
    console.log(this.name);
  }
};
user.greet(); //rafa, because this refers to the object that is calling the method, which is user in this case.

const greetFn = user.greet;
greetFn(); //undefined, because this is not bound to the user object anymore. It refers to the global object (window in browsers) where name is not defined.

const user2 = {
  name: "Rafa",
  greet: () => {
    console.log(this.name);
  }
};
user2.greet();// undefined, because arrow functions do not have their own this context. They inherit this from the surrounding lexical scope, which in this case is the global scope where name is not defined.

const user3 = {
  name: "Rafa",
  delayedGreet: function() {
    setTimeout(function() {
      console.log(this.name);
    }, 100);
  }
};
user3.delayedGreet(); //undefined, because setTimeout's is automatically bound to the global object, so this refers to the global object where name is not defined.

const user4 = {
  name: "Rafa",
  delayedGreet: function() {
    setTimeout(() => {
      console.log(this.name);
    }, 100);
  }
};
user4.delayedGreet(); //Rafa, because the arrow function in setTimeout inherits this from the surrounding lexical scope (the delayedGreet method), which is bound to the user4 object.
const counter1 = {
  count: 0,
  increment: function() {
    setTimeout(function(){
        this.count++;
        console.log(this.count);
    }, 100);
  }
};
counter1.increment(); //nan, because setTimeout's function is automatically run in the global context, so this refers to the global object where count is not defined.
const counter2 = {
    count: 0,
    increment: function() {
        setTimeout(() => {
            this.count++;
            console.log(this.count);
        }, 100);
    }
}

counter2.increment(); //1, because the arrow function in setTimeout inherits this from the surrounding lexical scope (the increment method), which is bound to the counter object.
counter2.increment(); //2, because the arrow function in setTimeout inherits this from the surrounding lexical scope (the increment method), which is bound to the counter object.