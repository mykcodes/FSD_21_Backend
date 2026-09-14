const fs = require("fs");

fs.writeFile("student.txt", "Name : Rahul\n Roll No : 101");

console.log("File Created Succesfully");

let data = fs.readFile("student.txt", "utf8");