// create one promise that will display user name and password :
// using resolve and if data wii be rejected its display error : 

// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         let err = true;

//         if (err) {
//             resolve("User: CSE21, Password: 1234");
//         } else {
//             reject("ERROR... Data failed");
//         }
//     }, 2000);
// })
// .then((result) => {
//     console.log(result);
// })
// .catch((error) => {
//     console.log(error);
// });



// Async and Await : 

console.log("this is a async/await function");

async function test() {
    console.log("1");
    await console.log("2");
    console.log("3");
    console.log("4");
}

test();
console.log("5");