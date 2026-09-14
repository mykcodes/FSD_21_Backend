// 3. Visualize the event loop using setTimeOut,setImmedoate and process.nextTick.

new Promise((resolve, reject) => {

    setTimeout(() => {
        let err = true;

        if (err) {
            resolve("User: CSE21, Password: 1234");
        } else {
            reject("ERROR... Data failed");
        }
    }, 2000);

    console.log("Start");

    setImmediate(() => {
        console.log("Immediate");
    });

    process.nextTick(() => console.log("Next Tick"));

    console.log("End");
})
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.log(error);
});