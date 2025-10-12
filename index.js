
function f(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello, World!");
        }, 3000);
    })
}

let t = await f()
console.log(t);

