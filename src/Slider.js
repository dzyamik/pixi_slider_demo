import * as PIXI from "pixi.js";
import gsap from "gsap";

class Theme {
    /**
     * Creates an instance of a Theme.
     *
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the theme.
     * @param {number} [opts.margin=10] - The outer spacing (distance to other objects) from the border.
     * @param {number} [opts.padding=10] - The inner spacing (distance from icon and/or label) to the border.
     * @param {number} [opts.radius=4] - The radius used when drawing a rounded rectangle.
     * @param {number} [opts.fast=0.25] - The duration of time when it has to be fast.
     * @param {number} [opts.normal=0.5] - The duration of time when it has to be normal.
     * @param {number} [opts.slow=1] - The duration of time when it has to be slow.
     * @param {number} [opts.primaryColor=0x5ec7f8] - The primary color of the theme.
     * @param {number} [opts.color1=0x282828] - The first color of the theme. For example used for the background.
     * @param {number} [opts.color2=0xf6f6f6] - The second color of the theme. For example used for the border.
     * @param {number} [opts.fill=color1] - The color of the background as a hex value.
     * @param {number} [opts.fillAlpha=1] - The alpha value of the background.
     * @param {number} [opts.fillActive=color1] - The color of the background when activated.
     * @param {number} [opts.fillActiveAlpha=1] - The alpha value of the background when activated.
     * @param {number} [opts.stroke=color2] - The color of the border as a hex value.
     * @param {number} [opts.strokeWidth=0.6] - The width of the border in pixel.
     * @param {number} [opts.strokeAlpha=1] - The alpha value of the border.
     * @param {number} [opts.strokeActive=color2] - The color of the border when activated.
     * @param {number} [opts.strokeActiveWidth=0.6] - The width of the border in pixel when activated.
     * @param {number} [opts.strokeActiveAlpha=1] - The alpha value of the border when activated.
     * @param {number} [opts.iconColor=color2] - The color of the icon (set by the tint property) as a hex value.
     * @param {number} [opts.iconColorActive=colorPrimary] - The color of the icon when activated.
     * @param {number} [opts.background=color1] - The color of a background for a component (e.g. at the Modal class).
     * @param {object} [opts.textStyle={}] - A textstyle object for the styling of text. See PIXI.TextStyle
     *     for possible options. Default object:
     * @param {string} [opts.textStyle.fontFamily="Avenir Next", "Open Sans", "Segoe UI", ...] - The font family.
     * @param {string} [opts.textStyle.fontWeight=400] - The font weight.
     * @param {number} [opts.textStyle.fontSize=16] - The font size.
     * @param {number} [opts.textStyle.fill=color2] - The fill color.
     * @param {number} [opts.textStyle.stroke=color1] - The stroke color.
     * @param {number} [opts.textStyle.strokeThickness=0] - The thickness of the stroke.
     * @param {number} [opts.textStyle.miterLimit=1] - The meter limit.
     * @param {string} [opts.textStyle.lineJoin=round] - The line join.
     * @param {object} [opts.textStyleActive=textStyle + {fill: primaryColor}] - A textstyle object which is used
     *     for actived text.
     * @param {object} [opts.textStyleSmall=textStyle + {fontSize: -= 3}] - A textstyle object which is used for
     *     small text.
     * @param {object} [opts.textStyleSmallActive=textStyleSmall + {fill: primaryColor}] - A textstyle object which
     *     is used for small actived text.
     * @param {object} [opts.textStyleLarge=textStyle + {fontSize: += 3}] - A textstyle object which is used for
     *     large text.
     * @param {object} [opts.textStyleLargeActive=textStyleLarge + {fill: primaryColor}] - A textstyle object which
     *     is used for large actived text.
     */
    constructor(opts = {}) {
        const colorPrimary = opts.primaryColor != null ? opts.primaryColor : 0x5ec7f8; // blue
        const color1 = opts.color1 != null ? opts.color1 : 0x282828; // black
        const color2 = opts.color2 != null ? opts.color2 : 0xf6f6f6; // white

        this.opts = Object.assign(
            {},
            {
                margin: 12,
                padding: 12,
                radius: 4,
                fast: 0.25,
                normal: 0.5,
                slow: 1,
                primaryColor: colorPrimary,
                color1: color1,
                color2: color2,
                fill: color1,
                fillAlpha: 1,
                fillActive: color1,
                fillActiveAlpha: 1,
                stroke: color2,
                strokeWidth: 0.6,
                strokeAlpha: 1,
                strokeActive: color2,
                strokeActiveWidth: 0.6,
                strokeActiveAlpha: 1,
                iconColor: color2,
                iconColorActive: colorPrimary,
                background: color1
            },
            opts
        );

        // Set textStyle and variants
        this.opts.textStyle = Object.assign(
            {},
            {
                fontFamily:
                    '"Avenir Next", "Open Sans", "Segoe UI", "Roboto", "Helvetica Neue", -apple-system, system-ui, BlinkMacSystemFont, Arial, sans-serif !default',
                fontWeight: '500',
                fontSize: 18,
                fill: color2,
                stroke: color1,
                strokeThickness: 0,
                miterLimit: 1,
                lineJoin: 'round'
            },
            this.opts.textStyle
        );
        this.opts.textStyleSmall = Object.assign(
            {},
            this.opts.textStyle,
            { fontSize: this.opts.textStyle.fontSize - 3 },
            this.opts.textStyleSmall
        );
        this.opts.textStyleLarge = Object.assign(
            {},
            this.opts.textStyle,
            { fontSize: this.opts.textStyle.fontSize + 3 },
            this.opts.textStyleLarge
        );
        this.opts.textStyleActive = Object.assign(
            {},
            this.opts.textStyle,
            { fill: this.opts.primaryColor },
            this.opts.textStyleActive
        );
        this.opts.textStyleSmallActive = Object.assign(
            {},
            this.opts.textStyleSmall,
            { fill: this.opts.primaryColor },
            this.opts.textStyleSmallActive
        );
        this.opts.textStyleLargeActive = Object.assign(
            {},
            this.opts.textStyleLarge,
            { fill: this.opts.primaryColor },
            this.opts.textStyleLargeActive
        );

        Object.assign(this, this.opts);
    }

    /**
     * Factory function
     *
     * @static
     * @param {string} theme=dark - The name of the theme to load.
     * @return {Theme} Returns a newly created Theme object.
     */
    static fromString(theme) {
        if (theme && typeof theme === 'object') {
            return theme
        }

        switch (theme) {
            case 'light':
                return new ThemeLight()
            case 'red':
                return new ThemeRed()
            default:
                return new ThemeDark()
        }
    }
}

export class Slider extends PIXI.Container {
    /**
     * Creates an instance of a Slider.
     *
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the slider.
     * @param {number} [opts.id=auto generated] - The id of the slider.
     * @param {number} [opts.x=0] - The x position of the slider. Can be also set after creation with slider.x = 0.
     * @param {number} [opts.y=0] - The y position of the slider. Can be also set after creation with slider.y = 0.
     * @param {string|Theme} [opts.theme=dark] - The theme to use for this slider. Possible values are dark, light, red
     *     or a Theme object.
     * @param {number} [opts.width=250] - The width of the slider.
     * @param {number} [opts.height=2] - The height of the slider.
     * @param {PIXI.DisplayObject} [opts.container=window.app|object] - The container where the slider events should be attached to.
     * @param {number} [opts.fill=Theme.fill] - The color of the slider background as a hex value.
     * @param {number} [opts.fillAlpha=Theme.fillAlpha] - The alpha value of the background.
     * @param {number} [opts.stroke=Theme.stroke] - The color of the border as a hex value.
     * @param {number} [opts.strokeWidth=Theme.strokeWidth] - The width of the border in pixel.
     * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
     * @param {number} [opts.controlFill=Theme.stroke] - The color of the slider control background as a hex value.
     * @param {number} [opts.controlFillAlpha=Theme.strokeAlpha] - The alpha value of the background.
     * @param {number} [opts.controlStroke=Theme.stroke] - The color of the border as a hex value.
     * @param {number} [opts.controlStrokeWidth=Theme.strokeWidth * 0.8] - The width of the border in pixel.
     * @param {number} [opts.controlStrokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
     * @param {number} [opts.controlRadius=16] - The radius of the slider control.
     * @param {boolean} [opts.disabled=false] - Is the slider disabled? When disabled, the slider has a lower alpha value
     *     and cannot be clicked (interactive is set to false).
     * @param {onStartCallback} [opts.onStart] - Executed when the slider control starts to move.
     * @param {onUpdateCallback} [opts.onUpdate] - Executed when the slider control is moved.
     * @param {onCompleteCallback} [opts.onComplete] - Executed when the slider control was dropped.
     * @param {string|object} [opts.tooltip] - A string for the label of the tooltip or an object to configure the tooltip
     *     to display.
     * @param {boolean} [opts.visible=true] - Is the slider initially visible (property visible)?
     */
    constructor(opts = {}) {
        super();

        const theme = Theme.fromString(opts.theme);
        this.theme = theme;

        this.opts = Object.assign(
            {},
            {
                id: PIXI.utils.uid(),
                x: 0,
                y: 0,
                width: 250,
                height: 2,
                container: null,
                fill: theme.fill,
                fillAlpha: theme.fillAlpha,
                stroke: theme.stroke,
                strokeWidth: theme.strokeWidth,
                strokeAlpha: theme.strokeAlpha,
                controlFill: theme.fill,
                controlFillAlpha: 0.5,
                controlStroke: theme.primaryColor,
                controlStrokeWidth: 2,
                controlStrokeAlpha: theme.strokeAlpha,
                controlRadius: 16,
                orientation: 'horizontal',
                min: 0,
                max: 100,
                value: 0,
                disabled: false,
                onStart: null,
                onUpdate: null,
                onComplete: null,
                tooltip: null,
                visible: true
            },
            opts
        );

        this.opts.container = this.opts.container || this;

        // Validation
        //-----------------
        if (this.opts.height > this.opts.width) {
            this.opts.height = this.opts.width;
        }

        if (this.opts.value < this.opts.min) {
            this.opts.value = this.opts.min;
        }

        if (this.opts.value > this.opts.max) {
            this.opts.value = this.opts.max;
        }

        // Properties
        //-----------------
        this.id = this.opts.id;
        this.radius = this.opts.height / 2;

        this._value = this.opts.value;
        this._disabled = null;

        this.sliderObj = null;
        this.control = null;
        this.tooltip = null;

        this.visible = this.opts.visible;

        // setup
        //-----------------
        this.setup();

        // layout
        //-----------------
        this.layout();
    }

    /**
     * Creates children and instantiates everything.
     *
     * @private
     * @return {Slider} A reference to the slider for chaining.
     */
    setup() {
        // Container events
        //-----------------
        const container = this.opts.container;

        this.on('pointermove', e => {
            if (this.control.dragging) {
                const moveX = this.control.event.data.getLocalPosition(this.control.parent).x;
                this._value = this.pixelToValue(moveX - this.control.delta - this.opts.controlRadius);
                let x = this.valueToPixel(this._value) + this.opts.controlRadius;
                this.control.x = x;

                if (this.opts.onUpdate) {
                    this.opts.onUpdate.call(this, e, this);
                }
            }
        });

        if (container instanceof Element) {
            container.addEventListener('pointerup', e => this.onEnd(e), false);
            container.addEventListener('pointercancel', e => this.onEnd(e), false);
            container.addEventListener('pointerleave', e => this.onEnd(e), false);
            container.addEventListener('pointerout', e => this.onEnd(e), false);
            container.addEventListener('mouseup', e => this.onEnd(e), false);
            container.addEventListener('mousecancel', e => this.onEnd(e), false);
            container.addEventListener('mouseleave', e => this.onEnd(e), false);
            container.addEventListener('mouseout', e => this.onEnd(e), false);
        } else {
            container.interactive = true;
            container.on('pointerup', e => this.onEnd(e));
            container.on('pointercancel', e => this.onEnd(e));
            container.on('pointerleave', e => this.onEnd(e));
            container.on('pointerout', e => this.onEnd(e));
        }

        // Slider
        //-----------------
        let sliderObj = new PIXI.Graphics();
        this.sliderObj = sliderObj;
        this.addChild(sliderObj);

        // Control
        //-----------------
        let control = new PIXI.Graphics();
        control.x = this.opts.controlRadius + this.valueToPixel(this.opts.value);
        control.y = this.opts.controlRadius;

        // pointerdown on the control for dragndrop
        control.on('pointerdown', e => {
            control.event = e;
            control.delta = e.data.getLocalPosition(this.control).x;
            control.dragging = true;

            if (this.opts.onStart) {
                this.opts.onStart.call(this, e, this);
            }
        });

        this.control = control;

        this.addChild(this.control);

        // interaction
        //-----------------
        this.sliderObj.on('pointerover', e => {
            gsap.to(this.control, this.theme.fast, { alpha: 0.83 });
        });

        this.sliderObj.on('pointerout', e => {
            gsap.to(this.control, this.theme.fast, { alpha: 1 });
        });

        this.sliderObj.on('pointerdown', e => {
            this.sliderObj.pointerdowned = true;
            gsap.to(this.control, this.theme.fast, { alpha: 0.7 });
        });

        // Click on the slider bar
        this.sliderObj.on('pointerup', e => {
            if (this.sliderObj.pointerdowned) {
                this.sliderObj.pointerdowned = false;
                const position = e.data.getLocalPosition(this.control.parent);
                this.value = this.pixelToValue(position.x - this.opts.controlRadius);
                gsap.to(this.control, this.theme.fast, { alpha: 0.83 });
            }
        });

        // disabled
        //-----------------
        this.disabled = this.opts.disabled;

        // tooltip
        //-----------------
        if (this.opts.tooltip) {
            if (typeof this.opts.tooltip === 'string') {
                this.tooltip = new Tooltip({
                    object: this,
                    content: this.opts.tooltip
                });
            } else {
                this.opts.tooltip.object = this;
                this.tooltip = new Tooltip(this.opts.tooltip);
            }
        }

        return this
    }

    /**
     * Should be called to refresh the layout of the slider. Can be used after resizing.
     *
     * @return {Slider} A reference to the slider for chaining.
     */
    layout() {
        // set position
        //-----------------
        this.position.set(this.opts.x, this.opts.y);

        // draw
        //-----------------
        this.draw();

        return this
    }

    /**
     * Draws the slider to the canvas.
     *
     * @private
     * @return {Slider} A reference to the slider for chaining.
     */
    draw() {
        const r = this.radius;
        const cr = this.opts.controlRadius;
        const w = this.opts.width;
        const h = this.opts.height;
        const x = cr + r;
        const y = cr + r - h;

        this.sliderObj.clear();
        this.sliderObj.beginFill(0xffffff, 0);
        this.sliderObj.drawRect(0, 0, x + w + cr, cr * 2);
        this.sliderObj.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
        this.sliderObj.beginFill(this.opts.fill, this.opts.fillAlpha);
        this.sliderObj.moveTo(x, y);
        this.sliderObj.lineTo(x + w, y);
        this.sliderObj.arcTo(x + w + r, y, x + w + r, y + r, r);
        this.sliderObj.lineTo(x + w + r, y + r + 1); // BUGFIX: If not specified, there is a small area without a stroke.
        this.sliderObj.arcTo(x + w + r, y + h, x + w, y + h, r);
        this.sliderObj.lineTo(x, y + h);
        this.sliderObj.arcTo(x - r, y + h, x - r, y + r, r);
        this.sliderObj.arcTo(x - r, y, x, y, r);
        this.sliderObj.endFill();

        // Draw control
        this.control.clear();
        this.control.lineStyle(this.opts.controlStrokeWidth, this.opts.controlStroke, this.opts.controlStrokeAlpha);
        this.control.beginFill(this.opts.controlFill, this.opts.controlFillAlpha);
        this.control.drawCircle(0, 0, cr - 1);
        this.control.beginFill(this.opts.controlStroke, this.opts.controlStrokeAlpha);
        this.control.drawCircle(0, 0, cr / 6);
        this.control.endFill();

        return this
    }

    /**
     * Executed, when the slider control movement ended.
     *
     * @private
     * @return {Slider} A reference to the slider for chaining.
     */
    onEnd(e) {
        if (this.control.dragging) {
            this.control.event = null;
            this.control.dragging = false;
            if (this.opts.onComplete) {
                this.opts.onComplete.call(this, e, this);
            }
        }

        return this
    }

    /**
     * Calculates the value for a given pixel.
     *
     * @private
     * @param {number} value
     * @returns  {number} The calucalted pixel.
     */
    valueToPixel(value) {
        if (value < this.opts.min) {
            value = this.opts.min;
        } else if (value > this.opts.max) {
            value = this.opts.max;
        }
        return (this.opts.width * (value - this.opts.min)) / (this.opts.max - this.opts.min)
    }

    /**
     * Calculates the pixel for a given value.
     *
     * @private
     * @param {number} pixel
     * @returns {number} The calucalted value.
     */
    pixelToValue(pixel) {
        if (pixel < 0) {
            pixel = 0;
        } else if (pixel > this.opts.width) {
            pixel = this.opts.width;
        }
        return this.opts.min + ((this.opts.max - this.opts.min) * pixel) / this.opts.width
    }

    /**
     * Gets or sets the value.
     *
     * @member {number}
     */
    get value() {
        return Math.round(this._value)
    }
    set value(value) {
        if (value < this.opts.min) {
            value = this.opts.min;
        } else if (value > this.opts.max) {
            value = this.opts.max;
        }
        this._value = value;

        const x = this.valueToPixel(value) + this.opts.controlRadius;

        gsap.to(this.control, this.theme.fast, { x });
    }

    /**
     * Gets or sets the disabled state. When disabled, the slider cannot be clicked.
     *
     * @member {boolean}
     */
    get disabled() {
        return this._disabled
    }
    set disabled(value) {
        this._disabled = value;

        if (this._disabled) {
            this.interactive = false;
            this.sliderObj.interactive = false;
            this.control.interactive = false;
            this.control.buttonMode = false;
            this.alpha = 0.5;
        } else {
            this.interactive = true;
            this.sliderObj.interactive = true;
            this.control.interactive = true;
            this.control.buttonMode = true;
            this.alpha = 1;
        }
    }

    /**
     * Shows the slider (sets his alpha values to 1).
     *
     * @return {Slider} A reference to the slider for chaining.
     */
    show() {
        this.opts.strokeAlpha = 1;
        this.opts.fillAlpha = 1;
        this.opts.controlStrokeAlpha = 1;
        this.opts.controlFillAlpha = 1;

        this.layout();

        return this
    }

    /**
     * Hides the slider (sets his alpha values to 1).
     *
     * @return {Slider} A reference to the slider for chaining.
     */
    hide() {
        this.opts.strokeAlpha = 0;
        this.opts.fillAlpha = 0;
        this.opts.controlStrokeAlpha = 0;
        this.opts.controlFillAlpha = 0;

        this.layout();

        return this
    }
}

class ThemeDark extends Theme { }
class ThemeLight extends Theme {
    /**
     * Creates an instance of a ThemeLight.
     *
     * @constructor
     */
    constructor() {
        super({ color1: 0xf6f6f6, color2: 0x282828 });
    }
}

class ThemeRed extends Theme {
    /**
     * Creates an instance of a ThemeRed.
     *
     * @constructor
     */
    constructor() {
        super({ primaryColor: 0xd92f31 });
    }
}

window.Theme = Theme;
window.Slider = Slider;