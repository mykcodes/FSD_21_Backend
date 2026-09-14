// function add(num1,num2) {
// console.log("Addition ",num1+num2);
// }
// add(2,1);

// Function with return value 
// function mul(num1,num2) {
//     return num1*num2;
// }
// console.log("Multiplication : ",mul(3,7));

// Arrow Function : 
// syntax : fname=() => {}

    // const ml=(num1,num2,num3) => {
    //     console.log("Multiplication : ",num1*num2*num3);
    // }

    // ml(1,2,3);

    // arguments : array like object
    // arguments do not work in arrow functions as dom will not work in backened it will work only on browser and frontend.

    // const ni = () => {
    //     console.log(arguments);
    // }
    // ni("zaid");

    // Synchronous and Asynchronous Programming : 

    // console.log("Java Script");
    // function hello() {
    //     console.log("Hello World");
    // }
    // hello();
    // console.log("This is Synchronous Programming");

    // const hello = () => {
    //     setTimeout( () => {
    //         console.log("Hello,World!");
    //     },2000);
    // }
    // console.log("This is asynchronous Programming");
    // hello();

    //  CallBacks,Promises,async/await : 

//     function add(n1, n2, callback) {
//     console.log("Sum =", n1 + n2);

//     if (typeof callback === "function") {
//         callback();
//     }
// }

// function sayhi() {
//     console.log("This is callback function");
// }

// function hello() {
//     console.log("Hello World!");
// }

// let a = 10;
// let b = 20;

// add(a, b, sayhi);
// add(a, b, hello);

function display (callback) {
    console.log("Welcome to ABES");
    callback();
}

function print () {
    console.log("Learning FSD in CSE 21");
}

display(print);



