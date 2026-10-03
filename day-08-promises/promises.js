const p1 = new Promise((resolve, reject) => {
  resolve("success");
});
p1.then(result => console.log(result)); //success

const p2 = new Promise((resolve, reject) => {
  reject("failed");
});
p2.then(result => console.log(result))
  .catch(err => console.log("caught:", err)); //caught: failed

// chaining — tebak urutan nilai yang dioper tiap .then()
Promise.resolve(1)
  .then(val => {
    console.log(val);
    return val + 1; //2
  })
  .then(val => {
    console.log(val);
    return val + 1;//3
  })
  .then(val => console.log(val));//3

// ini jebakan — apa yang kejadian kalau .then() nggak di-return?
Promise.resolve(1)
  .then(val => {
    val + 1; // lupa return
  })
  .then(val => console.log(val)); //undefined, because log trying accses val value from then previously,there's no return in then previously so last then can't accses

function delay(ms){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        },ms)
    })
}

delay(1000).then(() => console.log("1 detik berlalu")); //1 detik berlalu, after 1 seccond

function checknumber(n){
    return new Promise((resolve, reject) => {
        if (n % 2 === 0){
            resolve(n)
        } else{
            reject("odd number")
        }
    })
}

checknumber(7).then(val => console.log(val)).catch(error => console.log("error: ", error))//error: odd number
checknumber(8).then(val => console.log(val)).catch(error => console.log("error: ", error))//8

function getUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("1. User ditemukan");

            resolve({
                id: 1,
                nama: "Rafa"
            });
        }, 1000);
    });
}

function getPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2. Postingan ditemukan");
            resolve(["Post A", "Post B"]);
        }, 1000)
    });
}

function getComments(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("3. Komentar ditemukan");
            resolve(["Komentar A", "Komentar B"]);
        }, 1000);
    })
}

getUser().then(user => {
   return getPosts(user.id)
}).then(post => {
    return getComments(post[1])
}).then(comments => {
    console.log(comments)
}).catch(error => {console.log("erorr: ", error)})
