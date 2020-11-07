import * as PIXI from "pixi.js";
import "./Slider";


const app = new PIXI.Application({
    width: 500,
    height: 500
});

document.body.appendChild(app.view);

let slider = new Slider({
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
        console.log('Updated value to', slider.value);
    },
    onComplete: function (event) {
        console.log('Completed', this);
    }
})


app.stage.addChild(slider);