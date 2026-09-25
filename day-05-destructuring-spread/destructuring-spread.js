const point = { x: 1, y: 2 };
const point2 = point;
point2.x = 99;
console.log(point.x); // 99, because point2 variable keep the point address and then if one of the variables is changed,both change


const arr1 = [1, 2, 3];
const arr2 = [...arr1];
arr2.push(4);
console.log(arr1); //[1,2,3], because arr2 creating a new coppies of arr1 and became independet, so arr1 didnt get caused

const user = { name: "Rafa", age: 17 };
const { name, age } = user;
console.log( name, age);//Rafa 17, because the variable name is equal to the each key

const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log(first, second, rest); //10 20 [30, 40, 50], because Positional order is crucial in array destructuring.

function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4));//10

const nested = { a: 1, b: { c: 2 } };
const copy = { ...nested };
copy.b.c = 999;
console.log(nested.b.c); 
console.log(copy.b.c)//999, first copy is coppied the value variable nested, both of them keeping b address, so when the copy variable try to change c value to 999, he has b address, thats why it could change the value of c

function updateUser(user, update){
    return {
      ...user,
      ...update
    }
}

console.log(updateUser(user, { age: 18 }))
console.log(user)

function removeItem(arr, index){
  return [
    ...arr.slice(0, index), 
    ...arr.slice(index + 1)
  ]
}

console.log(removeItem([10, 20, 30, 40], 1))
console.log(removeItem([10, 20, 30, 40], 0))

// 1. Bikin objek awal dengan nested object
const original = { profile: { theme: "dark" } };

// 2. Coba "copy" pakai spread biasa
const copyOriginal = { ...original };

// 3. Ubah theme di objek hasil copy
copyOriginal.profile.theme = "light";
const safecopy = structuredClone(original)
safecopy.profile.theme = "dark"

// 4. Cek apakah objek asli ikut berubah
console.log(original.profile.theme); // Output: "light" (IKUT BERUBAH!)
console.log(copyOriginal.profile.theme);     // Output: "light"
console.log(safecopy.profile.theme);
console.log(original)