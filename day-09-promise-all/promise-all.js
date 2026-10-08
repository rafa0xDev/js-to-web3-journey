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

// 3. Salah satu reject: apa yang ke-print? Apakah "ok" dan "ok2" ikut keluar?
Promise.allSettled([delay(500, "ok"), Promise.reject("boom"), delay(1000, "ok2")])
  .then(result => console.log(result)) //fulfilled, rejected, fulfilled, allSettled is tracking about status each promise we pass
  .catch(err => console.log("caught:", err)); //caught:boom

// 4. Tebak pemenangnya
Promise.race([delay(1000, "slow"), delay(300, "fast")]).then(console.log); //fast, bcz Promise.race taking the fastest process

function getUser(value){
    return new Promise(resolve => setTimeout(() => resolve(value), 800))
}

function getSettings(value){
    return new Promise(resolve => setTimeout(() => resolve(value), 800))
}
console.time("Sequential User")
getUser("user1").then(() => getSettings("settings1")).then(result => {console.log(result), console.timeEnd("Sequential User")}) //1.618ms/1.6ms, because running 1 by 1, so it takes so long
console.time("Parallel User2")
Promise.all([getUser("user2"), getSettings("settings2")]).then(result => {console.log(result), console.timeEnd("Parallel User2")}) //810.555ms/800ms, because getUser and getSetting runs in the same time

function withTimeout(promise, ms) {
    const timeout = new Promise((Promise,reject) => {
        setTimeout(() => {
            reject("timeout")
        }, ms)
    })
    return Promise.race([promise, timeout])
}
withTimeout(delay(300, "berhasil"), 500).then((result) => {console.log(result)}) //berhasil, bcs promise value runs faster than deadline

withTimeout(delay(1000, "slow"), 300)
  .then(r => console.log("then:", r))
  .catch(e => console.log("catch:", e)); //catch:timeout

let latestId = 0;

function searchSafe(query) {
  const myId = ++latestId;
  return search(query).then(result => {
    if (myId !== latestId) return;
    currentResults = result;
  });
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

setTimeout(() => console.log("final:", currentResults), 1500) //a, bcs ab will be turn into a bcs, a its the last finish search(ms)