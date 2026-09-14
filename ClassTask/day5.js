// Understand the concept of fetch in console :

async function test() {

    console.log("This is asynchronous function and we want use fetch() in console.");

    const response = await fetch("./student.json");
    console.log(response.status);

    const stud = await response.json();

    return stud;

    console.log("finally data fetched");
}

test().then( (res) => {
    console.log(res);
}).catch( (err) => {
    console.log(err);
})


// For Running on Node : 

// const fs = require("fs/promises");

// async function test() {
//     try {
//         console.log("This is asynchronous function and we want use JSON.");

//         const data = await fs.readFile("./student.json", "utf-8");
//         const students = JSON.parse(data);

//         console.log(students);
//     } catch (err) {
//         console.log(err);
//     }
// }

// test();