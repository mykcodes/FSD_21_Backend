// 2. Simulates DOM-like event handeling in NODE.js using events.

const EventEmitter = require("events");

class Button extends EventEmitter {
    click() {
        console.log("Button Click Event");
        this.emit("click");
    }

    mouseover() {
        console.log("Mouse Event");
        this.emit("mouseover");
    }
}

const button = new Button();

button.on("click", () => {
    console.log("Click event received!");
});

button.on("mouseover", () => {
    console.log("Mouseover event received!");
});

button.click();
button.mouseover();