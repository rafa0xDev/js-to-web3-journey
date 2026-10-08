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

-day7
callStack = is a task that javascript execute automated sequencial

microtask Queue = is a sequence task that javascript execute if callStack empty, if not empty already, microtask wait until callstack empty(promise.resolve().then())

macrotask queue = same like micro but, it will wait micro to end his job then he start(setTimeout, etc)

why promise go first than setTimeout?, bcs promise is considerd microtask while setTimeout considerd macrotask, micro always win, so promise go first

why the function logInOrder answer is 1,2,4,5,6,3 ?
bcs the 1,2,4,5 is a callstack, so it go first, when callstack empty micro's turn, so 6 go, then micro empty, macro's turns then 3 go, then result is  1,2,4,5,6,3

-day-8
A Promise is an object that represents a future result and has three states: `pending`, `fulfilled`, and `rejected`.
If you forget to `return` a value inside `.then()`, the next `.then()` receives `undefined`.
Promise chaining passes returned values from one `.then()` to the next.
This makes asynchronous code more linear and easier to read than deeply nested callbacks, helping avoid callback hell.

-day-9
# Async JavaScript — Promise Concurrency

## What I Learned

Hari ini belajar bagaimana beberapa Promise bisa dijalankan secara berurutan atau bersamaan, serta bagaimana `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, timeout, dan race condition bekerja.

---

## 1. Sequential vs Parallel

### Sequential

Sequential berarti task kedua baru dimulai setelah task pertama selesai.

```js
delay(1000, "A")
  .then(() => delay(1000, "B"))
  .then(() => console.timeEnd("sequential"));
```

Alurnya:

```text
A ────────→ 1000ms
             ↓
B ────────→ 1000ms
```

Total:

```text
1000 + 1000 ≈ 2000ms
```

Ini cocok ketika task berikutnya membutuhkan hasil dari task sebelumnya.

### Parallel

Parallel berarti beberapa task yang tidak saling bergantung bisa dimulai bersamaan.

```js
Promise.all([
  delay(1000, "A"),
  delay(1000, "B")
])
```

Alurnya:

```text
A ─────────→ 1000ms
B ─────────→ 1000ms
```

Total sekitar:

```text
1000ms
```

Mental model:

> Sequential = waktu task ditumpuk.
>
> Parallel = waktu ditentukan oleh task yang paling lama.

---

## 2. `Promise.all()`

`Promise.all()` digunakan ketika kita ingin menunggu beberapa Promise sekaligus.

```js
Promise.all([
  delay(1000, "A"),
  delay(1000, "B")
])
```

Jika semuanya fulfilled:

```js
["A", "B"]
```

Urutan hasil mengikuti urutan Promise di array, bukan urutan siapa yang selesai dulu.

Contoh:

```js
Promise.all([
  delay(1000, "A"),
  delay(300, "B")
])
```

Walaupun B selesai lebih dulu, hasilnya tetap:

```js
["A", "B"]
```

### Jika salah satu reject

```js
Promise.all([
  delay(500, "ok"),
  Promise.reject("boom"),
  delay(1000, "ok2")
])
```

Hasil `Promise.all()` menjadi rejected:

```text
caught: boom
```

Penting:

> Satu Promise reject tidak berarti Promise lain ikut menjadi rejected.

Promise lain tetap bisa berjalan. Yang reject adalah **Promise gabungan dari `Promise.all()`**.

Jadi:

```text
ok     → tetap berjalan
boom   → reject
ok2    → tetap berjalan

Promise.all()
     ↓
rejected
```

---

## 3. `Promise.allSettled()`

`Promise.allSettled()` digunakan ketika kita ingin mengetahui hasil dari **semua Promise**, baik yang berhasil maupun gagal.

Contoh konsep:

```text
A → fulfilled
B → rejected
C → fulfilled
```

Berbeda dengan `Promise.all()` yang langsung menghasilkan rejected ketika salah satu gagal.

Mental model:

```text
Promise.all()
→ "Semua harus berhasil."

Promise.allSettled()
→ "Gue mau tahu nasib semuanya."
```

---

## 4. `Promise.race()`

`Promise.race()` mengambil Promise yang **settled paling dulu**.

Settled berarti Promise sudah mendapatkan hasil akhir:

* fulfilled
* rejected

Contoh:

```js
Promise.race([
  delay(1000, "slow"),
  delay(300, "fast")
])
```

Hasil:

```text
fast
```

Karena:

```text
slow ─────────────→ 1000ms
fast ───→ 300ms
```

Catatan penting:

> `Promise.race()` tidak otomatis membatalkan Promise yang kalah.

Promise yang kalah masih bisa berjalan di belakang layar.

---

## 5. `withTimeout()`

`Promise.race()` bisa digunakan untuk membuat timeout.

```js
function withTimeout(promise, ms) {
  const timeout = new Promise(reject => {
    setTimeout(() => {
      reject("timeout");
    }, ms);
  });

  return Promise.race([
    promise,
    timeout
  ]);
}
```

Mental model:

```text
             Promise asli
            ↗
Promise.race()
            ↘
             timeout
```

Contoh:

```js
withTimeout(delay(300, "berhasil"), 500)
```

Promise asli selesai dalam 300ms, sedangkan timeout baru terjadi setelah 500ms.

Maka:

```text
"berhasil"
```

Kalau:

```js
withTimeout(delay(1000, "berhasil"), 500)
```

timeout selesai dulu:

```text
"timeout"
```

Jadi:

> `withTimeout()` adalah perlombaan antara Promise asli dan batas waktu.

---

## 6. Promise Tidak Sama dengan `Promise.all()`

Hal penting yang dipahami:

```js
const a = fetch("/a");
const b = fetch("/b");

Promise.all([a, b]);
```

`Promise.all()` bukan yang membuat A dan B mulai berjalan.

A mulai ketika:

```js
fetch("/a")
```

dipanggil.

B mulai ketika:

```js
fetch("/b")
```

dipanggil.

`Promise.all()` kemudian digunakan untuk:

> Menunggu beberapa Promise dan menggabungkan hasilnya.

Mental model:

```text
fetch()       → memulai pekerjaan
Promise.all() → menunggu beberapa pekerjaan
```

---

# 7. Race Condition

Race condition terjadi ketika beberapa operasi async berjalan bersamaan dan selesai dalam urutan yang tidak kita inginkan.

Contoh pencarian:

```js
function search(query) {
  const ms = query === "a" ? 1000 : 200;

  return delay(ms, "results for " + query);
}
```

User mengetik:

```text
"a"
```

kemudian langsung:

```text
"ab"
```

Request:

```text
"a"  → 1000ms
"ab" → 200ms
```

Maka:

```text
"a"  ─────────────────→ 1000ms
"ab" ───→ 200ms
```

`"ab"` selesai duluan:

```text
currentResults = "results for ab"
```

Tetapi 800ms kemudian request lama `"a"` selesai:

```text
currentResults = "results for a"
```

Akhirnya hasil terbaru ditimpa oleh hasil lama.

Ini adalah race condition.

### Masalah utamanya

Bukan sekadar:

> "Siapa yang selesai dulu?"

Tetapi:

> "Apakah hasil yang baru saja datang masih merupakan hasil yang relevan dengan request terbaru?"

---

## 8. Closure dan Request ID

Untuk memperbaiki race condition, setiap request bisa diberikan identifier.

Contoh mental model:

```text
"a"  → request #1
"ab" → request #2
```

Saat hasil datang, kita cek:

```text
request #2 selesai
→ masih request terbaru?
→ YES → tampilkan

request #1 selesai
→ masih request terbaru?
→ NO → abaikan
```

Closure berguna karena callback async dapat tetap mengingat nilai yang dimiliki ketika request tersebut dibuat.

Mental model:

> Setiap request membawa "nomor identitasnya sendiri", lalu ketika hasilnya kembali kita cek apakah nomor itu masih yang terbaru.

---

# 9. Mental Model Utama

```text
Ada dependency?
→ Sequential

Tidak ada dependency?
→ Parallel

Semua harus sukses?
→ Promise.all()

Mau mengetahui hasil semuanya?
→ Promise.allSettled()

Siapa yang settled dulu?
→ Promise.race()

Promise terlalu lama?
→ Promise.race() + timeout

Request lama bisa datang setelah request baru?
→ Race condition

Bagaimana mengabaikan request lama?
→ Identifikasi request + cek apakah masih terbaru
```

---

## 10. Hal yang Sempat Salah

### Salah #1 — Mengira `Promise.all()` yang membuat Promise berjalan paralel

Yang benar:

```text
Promise dibuat/dipanggil
        ↓
task mulai
        ↓
Promise.all() menunggu hasil
```

`Promise.all()` bukan tombol "jalankan semua".

---

### Salah #2 — Mengira reject satu Promise membuat Promise lain ikut reject

Yang benar:

```text
A → fulfilled
B → rejected
C → fulfilled

Promise.all()
     ↓
rejected
```

A dan C tidak otomatis menjadi rejected.

Yang rejected adalah Promise hasil `Promise.all()`.

---

### Salah #3 — Mengira `Promise.race()` hanya menangani Promise yang fulfilled

Yang benar:

```text
fulfilled tercepat → menang
rejected tercepat  → juga menang
```

`race()` melihat siapa yang **settled terlebih dahulu**.

---

## Teaching Snapshot

> Sequential berarti task berjalan satu per satu dan task berikutnya menunggu task sebelumnya. Parallel berarti task independen dimulai bersama sehingga total waktunya kira-kira sama dengan task yang paling lama. `Promise.all()` menunggu semuanya dan gagal jika ada satu yang reject, sedangkan `Promise.allSettled()` tetap memberikan hasil semua Promise. `Promise.race()` mengambil Promise yang settled paling dulu dan bisa digunakan untuk membuat timeout. Race condition terjadi ketika hasil async lama datang terlambat dan menimpa hasil baru, sehingga kita perlu memastikan setiap hasil masih berasal dari request terbaru.


