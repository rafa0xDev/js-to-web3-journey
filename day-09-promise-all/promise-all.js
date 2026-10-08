const delay = (ms, value) =>
  new Promise(resolve => setTimeout(() => resolve(value), ms));

// 1. Berurutan: tebak total waktunya
console.time("sequential");
delay(1000, "A")
  .then(() => delay(1000, "B"))
  .then(() => console.timeEnd("sequential")); //2000 ms, bcs the delay B start walking after process A finish

// 2. Paralel: tebak isi array dan total waktunya
console.time("parallel");
Promise.all([delay(1000, "A"), delay(1000, "B")]).then(result => {
  console.log(result); // A B 1000ms
  console.timeEnd("parallel");
});

// 3. Salah satu reject: apa yang ke-print? Apakah "ok" dan "ok2" ikut keluar?
Promise.all([delay(500, "ok"), Promise.reject("boom"), delay(1000, "ok2")])
  .then(result => console.log(result)) //nothing display as result, bcs Promise.all need all process to be fulfiled, if only 1 rejected, every process would be rejected also
  .catch(err => console.log("caught:", err)); //boom

// 4. Tebak pemenangnya
Promise.race([delay(1000, "slow"), delay(300, "fast")]).then(console.log); //fast, bcz Promise.race taking the fastest process

function getUser(value){
    return new Promise(resolve => setTimeout(() => resolve(value), 800))
}

function getSettings(value){
    return new Promise(resolve => setTimeout(() => resolve(value), 800))
}
console.time("Sequential Alok")
getUser("alok").then(() => getSettings("hamil??")).then(result => {console.log(result), console.timeEnd("Sequential Alok")}) //1.625ms, because running 1 by 1, so it takes so long
console.time("Parallel Rafa")
Promise.all([getUser("rafa"), getSettings("gntg")]).then(result => {console.log(result), console.timeEnd("Parallel Rafa")}) //810.555ms, because getUser and getSetting runs in the same time

function withTimeout(promise, ms) {
    const timeout = new Promise(reject => {
        setTimeout(() => {
            reject("timeout")
        }, ms)
    })
    return Promise.race([
        promise, timeout
    ])
}
withTimeout(delay(300, "berhasil"), 500) //berhasil, bcs promise is faster than deadline time

function search(query) {
    const ms = query === "a" ? 1000 : 200; // "a" lambat, "ab" cepat
    return delay(ms, "results for " + query);
}

let currentResults;

search("a").then(result => {
    currentResults = result
    console.log(currentResults)
});
search("ab").then(result => {
     currentResults = result
    console.log(currentResults)
});