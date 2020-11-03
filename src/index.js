import { Application } from 'pixi.js'

const app = new Application({
    width: 100,
    height: 100
})

document.body.appendChild(app.view)

// console.log(PIXI);
// const app = new PIXI.Application({
//     view: canvas,
//     width: 900,
//     height: 450,
//     transparent: false
// }).setup().run();

// // document.body.appendChild(app.view);

// let slider1 = new Slider({
//     x: 10,
//     y: 20
// });

// let slider2 = new Slider({
//     x: 10,
//     y: 70,
//     value: 85,
//     tooltip: 'Start value 85',
//     container: app.view
// });

// let slider3 = new Slider({
//     x: 10,
//     y: 120,
//     min: -1000,
//     max: 2000,
//     value: 300,
//     disabled: true
// });

// let slider4 = new Slider({
//     x: 10,
//     y: 170,
//     value: -20,
//     width: 600,
//     height: 8,
//     fill: 0xda3031,
//     stroke: 0xf9bc2e,
//     strokeWidth: 2,
//     controlStrokeWidth: 4,
//     controlRadius: 24,
//     theme: 'red',
//     tooltip: 'Range: 0 - 100',
//     onStart: (event, slider) => {
//         console.log('Started', event)
//     },
//     onUpdate: (event, slider) => {
//         slider.tooltip.content = slider.value
//     },
//     onComplete: function (event) {
//         console.log('Completed', this)
//     }
// });

// let button1 = new Button({
//     x: 10,
//     y: 240,
//     label: 'Toggle-slider-button',
//     type: 'checkbox',
//     active: true,
//     action: e => {
//         slider5.visible = !slider5.visible
//     }
// });

// let slider5 = new Slider({
//     x: 230,
//     y: 250
// });

// app.scene.addChild(slider1, slider2, slider3, slider4);
// app.scene.addChild(button1, slider5);