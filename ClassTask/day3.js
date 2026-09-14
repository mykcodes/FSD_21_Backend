// Promises : 


const promiseone = new Promise((resolve,reject) => {
    console.log("Promise Done");
    resolve("Opperation Successfull");
})

let success = true;

if(success) {
    resolve("Operation Succesfull");
}else{
    reject("Rejected");
}

// promiseone.then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })


