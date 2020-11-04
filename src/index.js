import * as PIXI from "pixi.js";
import "./Slider";


const app = new PIXI.Application({
    width: 500,
    height: 500
});

document.body.appendChild(app.view);


// let slider1 = new Slider({
//     x: 150,
//     y: 250
// });

// let slider2 = new Slider({
//     x: 10,
//     y: 70,
//     value: 85,
//     container: app.view
// })

// let slider3 = new Slider({
//     x: 10,
//     y: 120,
//     min: -1000,
//     max: 2000,
//     value: 300,
//     disabled: true
// })

let slider4 = new Slider({
    x: 100,
    y: 200,
    value: -20,
    width: 200,
    height: 8,
    fill: 0xda3031,
    stroke: 0xf9bc2e,
    strokeWidth: 2,
    controlStrokeWidth: 4,
    controlRadius: 24,
    theme: 'red',
    onStart: (event, slider) => {
        console.log('Started', event);
    },
    onUpdate: (event, slider) => {
        console.log(slider.value);
    },
    onComplete: function (event) {
        console.log('Completed', this);
    }
})


app.stage.addChild(slider4);