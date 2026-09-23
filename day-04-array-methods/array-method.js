const nums = [1, 2, 3, 4, 5];

console.log(nums.map(n => n * 2)); //[2, 4, 6, 8, 10], because each value in the array is multiplied by 2
console.log(nums.filter(n => n % 2 === 0)); //[2, 4], because only even numbers are included
console.log(nums.reduce((acc, n) => acc + n, 0)); // 15, because it sums all values in the array
console.log(nums.reduce((acc, n) => acc + n)); // 15, same as above — the initial value is optional, so it defaults to the first element of the array (1) and starts the summation from there
console.log(nums.map(n => n > 3)); // [false, false, false, true, true], because it returns a boolean for each element
console.log(nums.filter(n => n > 10)); // [], because no elements in the array are greater than 10

function myMap(arr, callback){
    const result = []
    for(let i = 0; i < arr.length; i++){
        const mapped = callback(arr[i], arr)
        result.push(mapped)
    }
    return result
}

console.log(myMap([1, 2, 3], n => n * 2)) //[2,4,6]

function myFilter(arr, callback){
    const result = []
    for(let i = 0; i < arr.length; i++){
        const fillterd = callback(arr[i], arr)
        if (fillterd) {
            result.push(arr[i])//ganti arr[i] ke mapped kalo mau hasil boolean
        }
    }
    return result
}

console.log(myFilter([1, 2, 3, 4], n => n % 2 === 0))//[2,4]

function myReduce(arr, callback, initialValue){
    let result = initialValue
    for(let i = 0; i < arr.length; i++){
        result = callback(result, arr[i])
    }
    return result
}
console.log(myReduce([1, 2, 3, 4], (acc, n) => acc + n, 0)) //10

function myReduce2(arr, callback, initialValue){ //case tanpa initialvalue
    let result = initialValue
    let startindex = 0 
    if(initialValue === undefined){
        result = arr[0]
        startindex = 1
    }
    for(let i = startindex; i < arr.length; i++){
        result = callback(result, arr[i])
    }
    return result
}
console.log(myReduce2([1, 2, 3, 4], (acc, n) => acc + n)) //10

const testArr = [5, 10, 15, 20];
console.log(myMap(testArr, n => n + 1));//[ 6, 11, 16, 21 ]
console.log(testArr.map(n => n + 1));//[ 6, 11, 16, 21 ]
// dua baris ini harus keluar sama persis


