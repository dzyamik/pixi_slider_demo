import * as PIXI from "pixi.js";


(function () {
    'use strict';

    /**
     * Class that represents a PixiJS Theme.
     *
     * @example
     * // Create the theme
     * const yellow = new Theme({
     *     fill: 0xfecd2d,
     *     fillActive: 0xfe9727,
     *     strokeActive: 0xfecd2d,
     *     strokeActiveWidth: 4,
     *     textStyle: {
     *         fill: 0x5ec7f8
     *     },
     *     textStyleActive: {
     *         fill: 0x5954d3
     *     },
     *     textStyleLarge: {
     *         fontSize: 36
     *     }
     * })
     *
     * // Create the app and apply the new theme to it
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 450,
     *     height: 150,
     *     theme: yellow
     * }).setup().run()
     *
     * @class
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest}
     */
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

    /**
     * Class that represents a PixiJS ThemeDark.
     *
     * @example
     * // Create the app with a new dark theme
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 450,
     *     height: 150,
     *     theme: new ThemeDark()
     * }).setup().run()
     *
     * @class
     * @extends Theme
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest}
     */
    class ThemeDark extends Theme { }

    /**
     * Class that represents a PixiJS ThemeLight.
     * The color1 is set to 0xf6f6f6, color2 to 0x282828.
     *
     * @example
     * // Create the app with a new light theme
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 450,
     *     height: 150,
     *     theme: new ThemeLight()
     * }).setup().run()
     *
     * @class
     * @extends Theme
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest}
     */
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

    /**
     * Class that represents a PixiJS ThemeRed.
     * The primaryColor is set to 0xd92f31.
     *
     * @example
     * // Create the app with a new red theme
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 450,
     *     height: 150,
     *     theme: new ThemeRed()
     * }).setup().run()
     *
     * @class
     * @extends Theme
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest}
     */
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

    /**
     * Class that represents a PixiJS Progress.
     *
     * @example
     * // Create the progress
     * const progress = new Progress({
     *     app: app
     * })
     *
     * // Add the progress to a DisplayObject
     * app.scene.addChild(progress)
     *
     * @class
     * @extends PIXI.Container
     * @see {@link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container}
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/progress.html|DocTest}
     */
    class Progress extends PIXI.Container {
        /**
         * Creates an instance of a Progress.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the progress.
         * @param {number} [opts.id=auto generated] - The id of the progress.
         * @param {PIXIApp} [opts.app=window.app] - The app where the progress belongs to.
         * @param {number} [opts.width] - The width of the progress bar. When not set, the width is the size of the app
         *     minus 2 * opts.margin.
         * @param {number} [opts.height=2] - The height of the progress bar.
         * @param {string|Theme} [opts.theme=dark] - The theme to use for this progress. Possible values are dark, light, red
         *     or a Theme object.
         * @param {number} [opts.margin=100] - The outer spacing to the edges of the app.
         * @param {number} [opts.padding=0] - The inner spacing (distance from icon and/or label) to the border.
         * @param {number} [opts.fill=Theme.fill] - The color of the progress background as a hex value.
         * @param {number} [opts.fillAlpha=Theme.fillAlpha] - The alpha value of the background.
         * @param {number} [opts.fillActive=Theme.primaryColor] - The color of the progress background when activated.
         * @param {number} [opts.fillActiveAlpha=Theme.fillActiveAlpha] - The alpha value of the background when activated.
         * @param {number} [opts.stroke=Theme.stroke] - The color of the border as a hex value.
         * @param {number} [opts.strokeWidth=0] - The width of the border in pixel.
         * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
         * @param {number} [opts.strokeActive=Theme.strokeActive] - The color of the border when activated.
         * @param {number} [opts.strokeActiveWidth=0] - The width of the border in pixel when activated.
         * @param {number} [opts.strokeActiveAlpha=Theme.strokeActiveAlpha] - The alpha value of the border when activated.
         * @param {boolean} [opts.background=false] - The alpha value of the border when activated.
         * @param {number} [opts.backgroundFill=Theme.background] - A textstyle object for the styling of the label. See PIXI.TextStyle
         *     for possible options.
         * @param {number} [opts.backgroundFillAlpha=1] - A textstyle object for the styling of the label when the
         *     progress is activated. See PIXI.TextStyle for possible options.
         * @param {number} [opts.radius=Theme.radius] - The radius of the four corners of the progress (which is a rounded rectangle).
         * @param {boolean} [opts.destroyOnComplete=true] - Should the progress bar destroy itself after reaching 100 %?
         * @param {boolean} [opts.visible=true] - Is the progress initially visible (property visible)?
         */
        constructor(opts = {}) {
            super();

            const theme = Theme.fromString(opts.theme);
            this.theme = theme;

            this.opts = Object.assign(
                {},
                {
                    id: PIXI.utils.uid(),
                    app: window.app,
                    width: null,
                    height: 2,
                    margin: 100,
                    padding: 0,
                    fill: theme.fill,
                    fillAlpha: theme.fillAlpha,
                    fillActive: theme.primaryColor,
                    fillActiveAlpha: theme.fillActiveAlpha,
                    stroke: theme.stroke,
                    strokeWidth: 0,
                    strokeAlpha: theme.strokeAlpha,
                    strokeActive: theme.strokeActive,
                    strokeActiveWidth: 0,
                    strokeActiveAlpha: theme.strokeActiveAlpha,
                    background: false,
                    backgroundFill: theme.background,
                    backgroundFillAlpha: 1,
                    radius: theme.radius,
                    destroyOnComplete: true,
                    visible: true
                },
                opts
            );

            this.id = this.opts.id;

            this.background = null;
            this.bar = null;
            this.barActive = null;

            this.alpha = 0;

            this.visible = this.opts.visible;

            this._progress = 0;

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
         * @return {Progress} A reference to the progress for chaining.
         */
        setup() {
            // interaction
            //-----------------
            this.on('added', e => {
                this.show();
            });

            // background
            //-----------------
            if (this.opts.background) {
                const background = new PIXI.Graphics();
                this.background = background;
                this.addChild(background);
            }

            // bar
            //-----------------
            const bar = new PIXI.Graphics();
            this.bar = bar;
            this.addChild(bar);

            const barActive = new PIXI.Graphics();
            this.barActive = barActive;
            this.bar.addChild(barActive);

            return this
        }

        /**
         * Should be called to refresh the layout of the progress. Can be used after resizing.
         *
         * @return {Progress} A reference to the progress for chaining.
         */
        layout() {
            const width = this.opts.app.size.width;
            const height = this.opts.app.size.height;

            // background
            //-----------------
            if (this.opts.background) {
                this.background.clear();
                this.background.beginFill(this.opts.backgroundFill, this.opts.backgroundFillAlpha);
                this.background.drawRect(0, 0, width, height);
                this.background.endFill();
            }

            this.draw();

            return this
        }

        /**
         * Draws the canvas.
         *
         * @private
         * @return {Progress} A reference to the progress for chaining.
         */
        draw() {
            this.bar.clear();
            this.barActive.clear();

            this.drawBar();
            this.drawBarActive();

            return this
        }

        /**
         * Draws the bar.
         *
         * @private
         * @return {Progress} A reference to the progress for chaining.
         */
        drawBar() {
            const width = this.opts.app.size.width;
            const height = this.opts.app.size.height;

            this.radius = this.opts.radius;
            if (this.radius * 2 > this.opts.height) {
                this.radius = this.opts.height / 2;
            }

            const wantedWidth = this.opts.width || width - 2 * this.opts.margin;
            const wantedHeight = this.opts.height;

            this.bar.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
            this.bar.beginFill(this.opts.fill, this.opts.fillAlpha);
            if (this.radius > 1) {
                this.bar.drawRoundedRect(0, 0, wantedWidth, wantedHeight, this.radius);
            } else {
                this.bar.drawRect(0, 0, wantedWidth, wantedHeight);
            }
            this.bar.endFill();

            this.bar.x = width / 2 - this.bar.width / 2;
            this.bar.y = height / 2 - this.bar.height / 2;

            return this
        }

        /**
         * Draws the active bar.
         *
         * @private
         * @return {Progress} A reference to the progress for chaining.
         */
        drawBarActive() {
            const wantedWidth = this.bar.width - 2 * this.opts.padding;
            const wantedHeight = this.bar.height - 2 * this.opts.padding;

            const barActiveWidth = (wantedWidth * this._progress) / 100;

            this.barActive.lineStyle(this.opts.strokeActiveWidth, this.opts.strokeActive, this.opts.strokeActiveAlpha);
            this.barActive.beginFill(this.opts.fillActive, this.opts.fillActiveAlpha);
            if (barActiveWidth > 0) {
                if (this.radius > 1) {
                    this.barActive.drawRoundedRect(0, 0, barActiveWidth, wantedHeight, this.radius);
                } else {
                    this.barActive.drawRect(0, 0, barActiveWidth, wantedHeight);
                }
            }
            this.barActive.endFill();

            this.barActive.x = this.opts.padding;
            this.barActive.y = this.opts.padding;

            return this
        }

        /**
         * Shows the progress (sets his alpha values to 1).
         *
         * @return {Progress} A reference to the progress for chaining.
         */
        show() {
            TweenLite.to(this, this.theme.fast, { alpha: 1 });

            return this
        }

        /**
         * Hides the progress (sets his alpha values to 1).
         *
         * @return {Progress} A reference to the progress for chaining.
         */
        hide() {
            TweenLite.to(this, this.theme.fast, {
                alpha: 0,
                onComplete: () => (this.visible = false)
            });

            return this
        }

        /**
         * Gets or sets the progress. Has to be a number between 0 and 100.
         *
         * @member {number}
         */
        get progress() {
            return this._progress
        }
        set progress(value) {
            value = Math.round(value);

            if (value < 0) {
                value = 0;
            }

            if (value > 100) {
                value = 100;
            }

            TweenLite.to(this, this.theme.normal, {
                _progress: value,
                onUpdate: () => this.draw(),
                onComplete: () => {
                    if (value === 100 && this.opts.destroyOnComplete) {
                        TweenLite.to(this, this.theme.fast, {
                            alpha: 0,
                            onComplete: () => this.destroy({ children: true })
                        });
                    }
                }
            });
        }
    }

    /**
     * Class that represents a PixiJS AbstractPopup.
     * The class is used for various other Popup-like classes
     * like Popup, Message, Tooltip...
     *
     * @class
     * @abstract
     * @extends PIXI.Graphics
     * @see {@link http://pixijs.download/dev/docs/PIXI.Graphics.html|PIXI.Graphics}
     */
    class AbstractPopup extends PIXI.Graphics {
        /**
         * Creates an instance of an AbstractPopup (only for internal use).
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the popup.
         * @param {number} [opts.id=auto generated] - The id of the popup.
         * @param {number} [opts.x=0] - The x position of the popup. Can be also set after creation with popup.x = 0.
         * @param {number} [opts.y=0] - The y position of the popup. Can be also set after creation with popup.y = 0.
         * @param {string|Theme} [opts.theme=dark] - The theme to use for this popup. Possible values are dark, light, red
         *     or a Theme object.
         * @param {string|number|PIXI.Text} [opts.header] - The heading inside the popup as a string, a number (will be
         *     converted to a text) or as a PIXI.Text object.
         * @param {string|number|PIXI.DisplayObject} [opts.content] - A text, a number (will be converted to a text) or
         *     an PIXI.DisplayObject as the content of the popup.
         * @param {number} [opts.minWidth=320] - The minimum width of the popup.
         * @param {number} [opts.minHeight=130] - The minimum height of the popup.
         * @param {number} [opts.padding=Theme.padding] - The inner spacing (distance from header and content) the the border.
         * @param {number} [opts.fill=Theme.fill] - The color of the button background as a hex value.
         * @param {number} [opts.fillAlpha=Theme.fillAlpha] - The alpha value of the background.
         * @param {number} [opts.stroke=Theme.stroke] - The color of the border as a hex value.
         * @param {number} [opts.strokeWidth=Theme.strokeWidth] - The width of the border in pixel.
         * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
         * @param {object} [opts.headerStyle=Theme.textStyleLarge] - A textstyle object for the styling of the header. See PIXI.TextStyle
         *     for possible options.
         * @param {object} [opts.textStyle=Theme.textStyleSmall] - A textstyle object for the styling of the text. See PIXI.TextStyle
         *     for possible options.
         * @param {number} [opts.radius=Theme.radius] - The radius of the four corners of the popup (which is a rounded rectangle).
         * @param {hiddenCallback} [opts.onHidden] - Executed when the popup gets hidden.
         * @param {boolean} [opts.visible=true] - Is the popup initially visible (property visible)?
         * @param {string} [opts.orientation] - When set to portrait, the popup cannot be displayed in landscape mode. When set
         *     to landscape, the popup cannot be displayed in portrait mode.
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
                    header: null, // null or null
                    content: null, // null or String or PIXI.DisplayObject
                    minWidth: 320,
                    minHeight: 130,
                    maxWidth: null,
                    padding: theme.padding,
                    fill: theme.fill,
                    fillAlpha: theme.fillAlpha,
                    stroke: theme.stroke,
                    strokeWidth: theme.strokeWidth,
                    strokeAlpha: theme.strokeAlpha,
                    headerStyle: theme.textStyleLarge,
                    textStyle: theme.textStyleSmall,
                    radius: theme.radius,
                    onHidden: null,
                    visible: true,
                    orientation: null
                },
                opts
            );

            this.id = this.opts.id;

            this.headerStyle = new PIXI.TextStyle(this.opts.headerStyle);
            this.textStyle = new PIXI.TextStyle(this.opts.textStyle);

            if (this.opts.maxWidth) {
                this.headerStyle.wordWrap = true;
                this.headerStyle.wordWrapWidth = this.opts.maxWidth - 2 * this.opts.padding;

                this.textStyle.wordWrap = true;
                this.textStyle.wordWrapWidth = this.opts.maxWidth - 2 * this.opts.padding;
            }

            this.alpha = 0;
            this.visible = this.opts.visible;

            this._header = null;
            this._content = null;

            // position
            this.x = this.opts.x;
            this.y = this.opts.y;

            // padding
            this.innerPadding = this.opts.padding * 1.5;

            // interaction
            //-----------------
            this.interactive = true;
            this.on('added', e => {
                this.show();
            });
        }

        /**
         * Creates the framework and instantiates everything.
         *
         * @private
         * @return {AbstractPopup} A reference to the popup for chaining.
         */
        setup() {
            // position
            //-----------------
            this.sy = this.opts.padding;

            // header
            //-----------------
            if (this.opts.header != null) {
                let header = null;

                if (this.opts.header instanceof PIXI.Text) {
                    header = this.opts.header;
                } else if (typeof this.opts.header === 'number') {
                    header = new PIXI.Text(this.opts.header.toString(), this.headerStyle);
                } else {
                    header = new PIXI.Text(this.opts.header, this.headerStyle);
                }

                header.x = this.opts.padding;
                header.y = this.sy;

                this.addChild(header);

                this.sy += header.height;

                this._header = header;
            }

            if (this.opts.header && this.opts.content) {
                this.sy += this.innerPadding;
            }

            // content
            //-----------------
            if (this.opts.content != null) {
                let content = null;

                if (typeof this.opts.content === 'string') {
                    content = new PIXI.Text(this.opts.content, this.textStyle);
                } else if (typeof this.opts.content === 'number') {
                    content = new PIXI.Text(this.opts.content.toString(), this.textStyle);
                } else {
                    content = this.opts.content;
                }

                content.x = this.opts.padding;
                content.y = this.sy;

                this.sy += content.height;

                this.addChild(content);

                this._content = content;
            }

            return this
        }

        /**
         * Should be called to refresh the layout of the popup. Can be used after resizing.
         *
         * @return {AbstractPopup} A reference to the popup for chaining.
         */
        layout() {
            // wanted width & wanted height
            //-----------------
            const padding = this.opts.padding;
            const size = this.getInnerSize();
            const width = size.width + 2 * padding;
            const height = size.height + 2 * padding;

            this.wantedWidth = Math.max(width, this.opts.minWidth);
            this.wantedHeight = Math.max(height, this.opts.minHeight);

            if (this.opts.maxWidth) {
                this.wantedWidth = Math.min(this.wantedWidth, this.opts.maxWidth);
            }

            if (this.opts.radius * 2 > this.wantedWidth) {
                this.wantedWidth = this.opts.radius * 2;
            }

            if (this.opts.radius * 2 > this.wantedHeight) {
                this.wantedHeight = this.opts.radius * 2;
            }

            switch (this.opts.orientation) {
                case 'portrait':
                    if (this.wantedWidth > this.wantedHeight) {
                        this.wantedHeight = this.wantedWidth;
                    }
                    break
                case 'landscape':
                    if (this.wantedHeight > this.wantedWidth) {
                        this.wantedWidth = this.wantedHeight;
                    }
                    break
            }

            this.draw();

            return this
        }

        /**
         * Draws the canvas.
         *
         * @private
         * @return {AbstractPopup} A reference to the popup for chaining.
         */
        draw() {
            const square = Math.round(this.wantedWidth) === Math.round(this.wantedHeight);
            const diameter = Math.round(this.opts.radius * 2);

            this.clear();
            this.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
            this.beginFill(this.opts.fill, this.opts.fillAlpha);
            if (square && diameter === this.wantedWidth) {
                this.drawCircle(this.wantedWidth / 2, this.wantedHeight / 2, this.opts.radius);
            } else {
                this.drawRoundedRect(0, 0, this.wantedWidth, this.wantedHeight, this.opts.radius);
            }
            this.endFill();

            return this
        }

        /**
         * Calculates the size of the children of the AbstractPopup.
         * Cannot use getBounds() because it is not updated when children
         * are removed.
         *
         * @private
         * @returns {object} An JavaScript object width the keys width and height.
         */
        getInnerSize() {
            let width = 0;
            let height = 0;

            if (this._header) {
                width = this._header.width;
                height = this._header.height;
            }

            if (this._header && this._content) {
                height += this.innerPadding;
            }

            if (this._content) {
                width = Math.max(width, this._content.width);
                height += this._content.height;
            }

            return { width, height }
        }

        /**
         * Shows the popup (sets his alpha values to 1).
         *
         * @param {callback} [cb] - Executed when show animation was completed.
         * @return {AbstractPopup} A reference to the popup for chaining.
         */
        show(cb) {
            TweenLite.to(this, this.theme.fast, {
                alpha: 1,
                onComplete: () => {
                    if (cb) {
                        cb.call(this);
                    }
                }
            });

            return this
        }

        /**
         * Hides the popup (sets his alpha values to 0).
         *
         * @param {callback} [cb] - Executed when hide animation was completed.
         * @return {AbstractPopup} A reference to the popup for chaining.
         */
        hide(cb) {
            TweenLite.to(this, this.theme.fast, {
                alpha: 0,
                onComplete: () => {
                    this.visible = false;
                    if (cb) {
                        cb.call(this);
                    }
                }
            });

            if (this.opts.onHidden) {
                this.opts.onHidden.call(this, this);
            }

            return this
        }

        /**
         * Sets or gets the header. The getter always returns a PIXI.Text object. The setter can receive
         * a string, a number or a PIXI.Text object.
         *
         * @member {string|number|PIXI.Text}
         */
        get header() {
            return this._header
        }
        set header(value) {
            if (this._header) {
                this._header.destroy();
            }
            this.opts.header = value;
            this.setup().layout();
        }

        /**
         * Sets or gets the content. The getter always returns an PIXI.DisplayObject. The setter can receive
         * a string, a number or a PIXI.DisplayObject.
         *
         * @member {string|number|PIXI.DisplayObject}
         */
        get content() {
            return this._content
        }
        set content(value) {
            if (this._content) {
                this._content.destroy();
            }
            this.opts.content = value;
            this.setup().layout();
        }
    }

    /**
     * Class that represents a PixiJS Tooltip.
     *
     * @example
     * // Create the app
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 900,
     *     height: 250
     * }).setup().run()
     *
     * // Add an DisplayObject to the app
     * const circle = new PIXI.Graphics()
     * circle.beginFill(0x5251a3)
     * circle.drawCircle(50, 50, 40)
     * app.scene.addChild(circle)
     *
     * const tooltip = new Tooltip({
     *     object: circle,
     *     container: app.scene,
     *     content: 'Das Gesetz ist der Freund des Schwachen.'
     * })
     *
     * @class
     * @extends AbstractPopup
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/tooltip.html|DocTest}
     */
    class Tooltip extends AbstractPopup {
        /**
         * Creates an instance of a Tooltip.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the tooltip.
         * @param {number} [opts.minWidth=0] - The minimum width of the tooltip.
         * @param {number} [opts.minHeight=0] - The minimum height of the tooltip.
         * @param {number} [opts.padding=Theme.padding / 2] - The inner spacing of the tooltip.
         * @param {PIXI.DisplayObject} opts.object - The object, where the tooltip should be displayed.
         * @param {PIXI.DisplayObject} [opts.container=object] - The container where the tooltip should be attached to.
         * @param {number} [opts.offsetLeft=8] - The horizontal shift of the tooltip.
         * @param {number} [opts.offsetTop=-8] - The vertical shift of the tooltip.
         * @param {number} [opts.delay=0] - A delay, after which the tooltip should be opened.
         */
        constructor(opts = {}) {
            const theme = Theme.fromString(opts.theme);

            opts = Object.assign(
                {},
                {
                    minWidth: 0,
                    minHeight: 0,
                    padding: theme.padding / 2,
                    object: null,
                    container: null,
                    offsetLeft: 8,
                    offsetTop: -8,
                    delay: 0
                },
                opts
            );

            opts.container = opts.container || opts.object;

            super(opts);

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
         * @return {Tooltip} A reference to the tooltip for chaining.
         */
        setup() {
            super.setup();

            // bind events this
            //-----------------
            this.interactive = true;

            let mouseoverTooltip = false;

            this.on('mouseover', e => {
                mouseoverTooltip = true;
            });

            this.on('mouseout', e => {
                mouseoverTooltip = false;
                if (!mouseoverObject) {
                    this.hide(() => {
                        this.opts.container.removeChild(this);
                    });
                }
            });

            // bind events object
            //-----------------
            const object = this.opts.object;
            object.interactive = true;

            let mouseoverObject = false;

            object.on('mouseover', e => {
                this.timeout = window.setTimeout(() => {
                    mouseoverObject = true;
                    this.visible = true;
                    this.opts.container.addChild(this);
                    this.setPosition(e);
                }, this.opts.delay * 1000);
            });

            object.on('mousemove', e => {
                if (mouseoverObject) {
                    this.setPosition(e);
                }
            });

            object.on('mouseout', e => {
                mouseoverObject = false;
                window.clearTimeout(this.timeout);
                if (!mouseoverTooltip) {
                    this.hide(() => {
                        this.opts.container.removeChild(this);
                    });
                }
            });

            return this
        }

        /**
         * Calculates and sets the position of the tooltip.
         *
         * @private
         * @return {Tooltip} A reference to the tooltip for chaining.
         */
        setPosition(e) {
            const position = e.data.getLocalPosition(this.opts.container);

            this.x = position.x + this.opts.offsetLeft;
            this.y = position.y + this.opts.offsetTop - this.height;

            return this
        }
    }

    /**
     * Class that represents a PixiJS Badge.
     *
     * @example
     * // Create the app
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 900,
     *     height: 250
     * }).setup().run()
     *
     * // Add an DisplayObject to the app
     * const circle = new PIXI.Graphics()
     * circle.beginFill(0x5251a3)
     * circle.drawCircle(50, 50, 40)
     * app.scene.addChild(circle)
     *
     * const badge1 = new Badge({
     *     object: circle,
     *     container: app.scene,
     *     content: 'Das Gesetz ist der Freund des Schwachen.'
     * })
     *
     * @class
     * @extends AbstractPopup
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/badge.html|DocTest}
     */
    class Badge extends AbstractPopup {
        /**
         * Creates an instance of a Badge.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the badge.
         * @param {number} [opts.minWidth=0] - The minimum width of the badge.
         * @param {number} [opts.minHeight=0] - The minimum height of the badge.
         * @param {number} [opts.padding=Theme.padding / 2] - The inner spacing of the badge.
         * @param {string|object} [opts.tooltip] - A string for the label of the tooltip or an object to configure the tooltip
         *     to display.
         */
        constructor(opts = {}) {
            const theme = Theme.fromString(opts.theme);

            opts = Object.assign(
                {},
                {
                    minWidth: 0,
                    minHeight: 0,
                    padding: theme.padding / 2,
                    tooltip: null
                },
                opts
            );

            super(opts);

            this.tooltip = null;

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
         * @override
         * @return {Badge} A reference to the badge for chaining.
         */
        setup() {
            super.setup();

            // tooltip
            //-----------------
            if (this.opts.tooltip) {
                if (typeof this.opts.tooltip === 'string') {
                    this.tooltip = new Tooltip({
                        object: this,
                        content: this.opts.tooltip
                    });
                } else {
                    this.opts.tooltip = Object.assign({}, { object: this }, this.opts.tooltip);
                    this.tooltip = new Tooltip(this.opts.tooltip);
                }
            }

            return this
        }

        /**
         * Should be called to refresh the layout of the badge. Can be used after resizing.
         *
         * @override
         * @return {Badge} A reference to the badge for chaining.
         */
        layout() {
            super.layout();

            this.content.x = this.width / 2 - this.content.width / 2 - this.opts.strokeWidth / 2;
            this.content.y = this.height / 2 - this.content.height / 2 - this.opts.strokeWidth / 2;

            return this
        }
    }

    class Events$1 {
        static stop(event) {
            event.preventDefault();
            event.stopPropagation();
        }

        static extractPoint(event) {
            switch (event.constructor.name) {
                case 'TouchEvent':
                    for (let i = 0; i < event.targetTouches.length; i++) {
                        let t = event.targetTouches[i];
                        return { x: t.clientX, y: t.clientY }
                    }
                    break
                default:
                    return { x: event.clientX, y: event.clientY }
            }
        }

        static isCaptured(event) {
            if (event.__capturedBy) return true
            return false
        }

        static capturedBy(event, obj) {
            event.__capturedBy = obj;
        }

        static isPointerDown(event) {
            // According to
            // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
            // pointer events use the buttons feature to represent pressed buttons
            return event.buttons
        }

        static isMouseDown(event) {
            // Attempts to clone the which attribute of events failed in WebKit. May
            // be this is a bug or a security feature. Workaround: we introduce
            // a mouseDownSubstitute attribute that can be assigned to cloned
            // events after instantiation.
            if (Reflect.has(event, 'mouseDownSubstitute')) return event.mouseDownSubstitute
            return event.buttons || event.which
        }

        static isSimulatedEvent(event) {
            return Reflect.has(event, 'mouseDownSubstitute')
        }

        static isMouseRightClick(event) {
            return event.buttons || event.which
        }

        static extractTouches(targets) {
            let touches = [];
            for (let i = 0; i < targets.length; i++) {
                let t = targets[i];
                touches.push({
                    targetSelector: this.selector(t.target),
                    identifier: t.identifier,
                    screenX: t.screenX,
                    screenY: t.screenY,
                    clientX: t.clientX,
                    clientY: t.clientY,
                    pageX: t.pageX,
                    pageY: t.pageY
                });
            }
            return touches
        }

        static createTouchList(targets) {
            let touches = [];
            for (let i = 0; i < targets.length; i++) {
                let t = targets[i];
                let touchTarget = document.elementFromPoint(t.pageX, t.pageY);
                let touch = new Touch(undefined, touchTarget, t.identifier, t.pageX, t.pageY, t.screenX, t.screenY);
                touches.push(touch);
            }
            return new TouchList(...touches)
        }

        static extractEvent(timestamp, event) {
            let targetSelector = this.selector(event.target);
            let infos = {
                type: event.type,
                time: timestamp,
                constructor: event.constructor,
                data: {
                    targetSelector: targetSelector,
                    view: event.view,
                    mouseDownSubstitute: event.buttons || event.which, // which cannot be cloned directly
                    bubbles: event.bubbles,
                    cancelable: event.cancelable,
                    screenX: event.screenX,
                    screenY: event.screenY,
                    clientX: event.clientX,
                    clientY: event.clientY,
                    layerX: event.layerX,
                    layerY: event.layerY,
                    pageX: event.pageX,
                    pageY: event.pageY,
                    ctrlKey: event.ctrlKey,
                    altKey: event.altKey,
                    shiftKey: event.shiftKey,
                    metaKey: event.metaKey
                }
            };
            if (event.type.startsWith('touch')) {
                // On Safari-WebKit the TouchEvent has layerX, layerY coordinates
                let data = infos.data;
                data.targetTouches = this.extractTouches(event.targetTouches);
                data.changedTouches = this.extractTouches(event.changedTouches);
                data.touches = this.extractTouches(event.touches);
            }
            if (event.type.startsWith('pointer')) {
                let data = infos.data;
                data.pointerId = event.pointerId;
                data.pointerType = event.pointerType;
            }
            if (Events$1.debug) {
                Events$1.extracted.push(this.toLine(event));
            }
            return infos
        }

        static cloneEvent(type, constructor, data) {
            if (type.startsWith('touch')) {
                // We need to find target from layerX, layerY
                //var target = document.querySelector(data.targetSelector)
                // elementFromPoint(data.layerX, data.layerY)
                //data.target = target
                data.targetTouches = this.createTouchList(data.targetTouches);
                data.changedTouches = this.createTouchList(data.changedTouches);
                data.touches = this.createTouchList(data.touches);
            }
            // We need to find target from pageX, pageY which are only
            // available after construction. They seem to getter items.

            let clone = Reflect.construct(constructor, [type, data]);
            clone.mouseDownSubstitute = data.mouseDownSubstitute;
            return clone
        }

        static simulateEvent(type, constructor, data) {
            data.target = document.querySelector(data.targetSelector);
            let clone = this.cloneEvent(type, constructor, data);
            if (data.target != null) {
                data.target.dispatchEvent(clone);
            }
            if (Events$1.debug) {
                Events$1.simulated.push(this.toLine(clone));
            }
        }

        static toLine(event) {
            return `${event.type} #${event.target.id} ${event.clientX} ${event.clientY}`
            let result = event.type;
            let selector = this.selector(event.target);
            result += ' selector: ' + selector;
            if (event.target != document.querySelector(selector)) console.log('Cannot resolve', selector);
            let keys = ['layerX', 'layerY', 'pageX', 'pageY', 'clientX', 'clientY'];
            for (let key of keys) {
                try {
                    result += ' ' + key + ':' + event[key];
                } catch (e) {
                    console.log('Invalid key: ' + key);
                }
            }
            return result
        }

        static compareExtractedWithSimulated() {
            if (this.extracted.length != this.simulated.length) {
                alert(
                    'Unequal length of extracted [' +
                    this.extracted.length +
                    '] and simulated events [' +
                    this.simulated.length +
                    '].'
                );
            } else {
                for (let i = 0; i < this.extracted.length; i++) {
                    var extracted = this.extracted[i];
                    var simulated = this.simulated[i];
                    if (extracted != simulated) {
                        console.log('Events differ:' + extracted + '|' + simulated);
                    }
                }
            }
        }

        static selector(context) {
            return OptimalSelect.select(context)
        }

        static reset() {
            this.extracted = [];
            this.simulated = [];
        }

        static resetSimulated() {
            this.simulated = [];
        }

        static showExtractedEvents(event) {
            if (!event.shiftKey) {
                return
            }
            if (this.popup == null) {
                let element = document.createElement('div');
                Elements.setStyle(element, {
                    position: 'absolute',
                    width: '480px',
                    height: '640px',
                    overflow: 'auto',
                    backgroundColor: 'lightgray'
                });
                document.body.appendChild(element);
                this.popup = element;
            }
            this.popup.innerHTML = '';
            for (let line of this.extracted) {
                let div = document.createElement('div');
                div.innerHTML = line;
                this.popup.appendChild(div);
            }
            let div = document.createElement('div');
            div.innerHTML = '------------ Simulated -----------';
            this.popup.appendChild(div);
            for (let line of this.simulated) {
                let div = document.createElement('div');
                div.innerHTML = line;
                this.popup.appendChild(div);
            }
            Elements.setStyle(this.popup, {
                left: event.clientX + 'px',
                top: event.clientY + 'px'
            });
        }
    }

    Events$1.popup = null;
    Events$1.debug = true;
    Events$1.extracted = [];
    Events$1.simulated = [];
    Events$1.simulationRunning = false;

    /* globals */

    /** Tests whether an object is empty
     * @param {Object} obj - the object to be tested
     * @return {boolean}
     */
    function isEmpty(obj) {
        // > isEmpty({})
        // true
        for (let i in obj) {
            return false
        }
        return true
    }

    function lerp(start, stop, amt) {
        return amt * (stop - start) + start
    }

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    // Taken from: https://davidwalsh.name/essential-javascript-functions
    function debounce(func, wait, immediate) {
        let timeout;
        return function () {
            let context = this,
                args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        }
    }

    /** Returns an id that is guaranteed to be unique within the livetime of the
     * application
     * @return {string}
     */
    let _idGenerator = 0;
    function getId() {
        return 'id' + _idGenerator++
    }

    class Dates {
        static create(fullYear, month, day) {
            return new Date(Date.UTC(fullYear, month, day))
        }

        static daysInMonth(date) {
            return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        }

        static startYearRange(date) {
            return new Date(Date.UTC(date.getFullYear() - 1, 11, 31, 23, 59, 59, 999))
        }

        static endYearRange(date) {
            return new Date(Date.UTC(date.getFullYear() + 1, 0, 1))
        }

        static prevYear(date, offset = 1) {
            return this.create(date.getFullYear() - offset, 0, 1)
        }

        static nextYear(date, offset = 1) {
            return this.create(date.getFullYear() + offset, 0, 1)
        }

        static nextMonth(date) {
            return this.create(date.getFullYear(), date.getMonth() + 1, 1)
        }

        static nextDay(date) {
            return this.create(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        }

        static nextHour(date) {
            // See http://stackoverflow.com/questions/1050720/adding-hours-to-javascript-date-object
            return new Date(date.getTime() + 60 * 60 * 1000)
        }

        static nextMinute(date) {
            // See above
            return new Date(date.getTime() + 60 * 1000)
        }

        static nextSecond(date) {
            // See above
            return new Date(date.getTime() + 1000)
        }

        static nextMillisecond(date) {
            // See above
            return new Date(date.getTime() + 1)
        }

        static *iterYears(start, end) {
            let date = this.create(start.getFullYear(), 0, 1);
            while (date <= end) {
                yield date;
                date = this.nextYear(date);
            }
            yield date;
        }

        static *iterMonths(year, limit = 12) {
            let month = 0;
            while (month < limit) {
                let date = this.create(year.getFullYear(), month, 1);
                yield date;
                month += 1;
            }
        }

        static *iterMonthsOfYears(years) {
            for (let year of years) {
                for (let month of this.iterMonths(year)) {
                    yield month;
                }
            }
        }

        static *iterDays(month) {
            let day = 1;
            let limit = Dates.daysInMonth(month);
            while (day <= limit) {
                let date = this.create(month.getFullYear(), month.getMonth(), day);
                yield date;
                day += 1;
            }
        }

        static *iterDaysOfMonths(months) {
            for (let month of months) {
                for (let day of this.iterDays(month)) {
                    yield day;
                }
            }
        }
    }
    /* Color conversion functions */

    class Colors {
        // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

        static rgb2num(red, green, blue) {
            let rgb = blue | (green << 8) | (red << 16);
            return 0x000000 + rgb
        }

        static rgb2hex(red, green, blue) {
            let rgb = blue | (green << 8) | (red << 16);
            return '#' + (0x1000000 + rgb).toString(16).slice(1)
        }

        static hex2rgb(hex) {
            // long version
            let r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
            if (r) {
                return r.slice(1, 4).map(x => {
                    return parseInt(x, 16)
                })
            }
            // short version
            r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
            if (r) {
                return r.slice(1, 4).map(x => {
                    return 0x11 * parseInt(x, 16)
                })
            }
            return null
        }

        static rgb(r, g, b) {
            return { r, g, b }
        }

        static string2hex(str) {
            return parseInt('0x' + str.slice(1))
        }

        static lerp(rgb1, rgb2, amount) {
            return {
                r: Math.round(lerp(rgb1.r, rgb2.r, amount)),
                g: Math.round(lerp(rgb1.g, rgb2.g, amount)),
                b: Math.round(lerp(rgb1.b, rgb2.b, amount))
            }
        }

        static get violet() {
            return Colors.rgb2num(89, 34, 131)
        }

        static get steelblue() {
            return Colors.rgb2num(0, 130, 164)
        }

        static get ochre() {
            return Colors.rgb2num(181, 157, 0)
        }

        static get turquoise() {
            return Colors.rgb2num(34, 164, 131)
        }

        static get eminence() {
            return Colors.rgb2num(150, 60, 134)
        }

        static random() {
            let r = Math.round(Math.random() * 255);
            let g = Math.round(Math.random() * 255);
            let b = Math.round(Math.random() * 255);
            return Colors.rgb2num(r, g, b)
        }
    }

    class Cycle extends Array {
        constructor(...items) {
            super();
            for (let item of items) {
                this.push(item);
            }
            this.index = 0;
        }

        next() {
            if (this.index == this.length) {
                this.index = 0;
            }
            return this[this.index++]
        }

        current() {
            if (this.index === this.length) {
                this.index = 0;
            }
            return this[this.index]
        }
    }

    /** Static methods to compute 2D points with x and y coordinates.
     */
    class Points {
        static length(a) {
            return Math.sqrt(a.x * a.x + a.y * a.y)
        }

        static normalize(p) {
            let len = this.length(p);
            return this.multiplyScalar(p, 1 / len)
        }

        static mean(a, b) {
            return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
        }

        static subtract(a, b) {
            return { x: a.x - b.x, y: a.y - b.y }
        }

        static multiply(a, b) {
            return { x: a.x * b.x, y: a.y * b.y }
        }

        static divide(a, b) {
            return { x: a.x / b.x, y: a.y / b.y }
        }

        static multiplyScalar(a, b) {
            return { x: a.x * b, y: a.y * b }
        }

        static add(a, b) {
            return { x: a.x + b.x, y: a.y + b.y }
        }

        static negate(p) {
            return { x: -p.x, y: -p.y }
        }

        static angle(p1, p2) {
            return Math.atan2(p1.y - p2.y, p1.x - p2.x)
        }

        static normalizedAngle(p1, p2) {
            return Angle.normalize(this.angle(p1, p2))
        }

        static normalized2Angle(p1, p2) {
            return Angle.normalize2(this.angle(p1, p2))
        }

        static arc(p, alpha, radius) {
            return {
                x: p.x + radius * Math.cos(alpha),
                y: p.y + radius * Math.sin(alpha)
            }
        }

        static distance(a, b) {
            let dx = a.x - b.x;
            let dy = a.y - b.y;
            return Math.sqrt(dx * dx + dy * dy)
        }

        // Distance == 0.0 indicates an inside relation.
        static distanceToRect(p, r) {
            let cx = Math.max(Math.min(p.x, r.x + r.width), r.x);
            let cy = Math.max(Math.min(p.y, r.y + r.height), r.y);
            return Math.sqrt((p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy))
        }

        static fromPageToNode(element, p) {
            //    if (window.webkitConvertPointFromPageToNode) {
            //             return window.webkitConvertPointFromPageToNode(element,
            //                                                     new WebKitPoint(p.x, p.y))
            //         }
            return window.convertPointFromPageToNode(element, p.x, p.y)
        }

        static fromNodeToPage(element, p) {
            //  if (window.webkitConvertPointFromNodeToPage) {
            //             return window.webkitConvertPointFromNodeToPage(element,
            //                                                     new WebKitPoint(p.x, p.y))
            //         }
            return window.convertPointFromNodeToPage(element, p.x, p.y)
        }
    }

    /** Static methods to compute angles.
     */
    class Angle {
        static normalize(angle) {
            let TAU = Math.PI * 2.0;
            while (angle > Math.PI) {
                angle -= TAU;
            }
            while (angle < -Math.PI) {
                angle += TAU;
            }
            return angle
        }

        static normalize2(angle) {
            let TAU = Math.PI * 2.0;
            while (angle > TAU) {
                angle -= TAU;
            }
            while (angle < 0) {
                angle += TAU;
            }
            return angle
        }

        static normalizeDegree(angle) {
            let full = 360.0;
            while (angle > 180.0) {
                angle -= full;
            }
            while (angle < -180.0) {
                angle += full;
            }
            return angle
        }

        static normalizedDiff(a, b) {
            return this.normalize(this.diff(a, b))
        }

        static normalized2Diff(a, b) {
            return this.normalize2(this.diff(a, b))
        }

        static diff(a, b) {
            return Math.atan2(Math.sin(a - b), Math.cos(a - b))
        }

        static degree2radian(degree) {
            return (Math.PI * degree) / 180.0
        }

        static radian2degree(rad) {
            return (180.0 / Math.PI) * rad
        }
    }

    class Elements$1 {
        static setStyle(element, styles) {
            for (let key in styles) {
                element.style[key] = styles[key];
            }
        }

        static addClass(element, cssClass) {
            element.classList.add(cssClass);
        }

        static removeClass(element, cssClass) {
            element.classList.remove(cssClass);
        }

        static toggleClass(element, cssClass) {
            element.classList.toggle(cssClass);
        }

        static hasClass(element, cssClass) {
            return element.classList.contains(cssClass)
        }
    }

    class MapProxy {
        /* This class is needed if we want to use the interaction classes
        in Firefox 45.8 and modern Browsers.

        A workaround for https://github.com/babel/babel/issues/2334
      */
        constructor() {
            this.map = new Map();
        }

        get size() {
            return this.map.size
        }

        get(key) {
            return this.map.get(key)
        }

        set(key, value) {
            return this.map.set(key, value)
        }

        delete(key) {
            return this.map.delete(key)
        }

        clear() {
            return this.map.clear()
        }

        has(key) {
            return this.map.has(key)
        }

        keys() {
            return this.map.keys()
        }

        values() {
            return this.map.values()
        }

        entries() {
            return this.map.entries()
        }

        forEach(func) {
            this.map.forEach(func);
        }
    }

    /* Based om https://gist.github.com/cwleonard/e124d63238bda7a3cbfa */
    class Polygon {
        /*
         *  This is the Polygon constructor. All points are center-relative.
         */
        constructor(center) {
            this.points = new Array();
            this.center = center;
        }

        /*
         *  Point x and y values should be relative to the center.
         */
        addPoint(p) {
            this.points.push(p);
        }

        /*
         *  Point x and y values should be absolute coordinates.
         */
        addAbsolutePoint(p) {
            this.points.push({ x: p.x - this.center.x, y: p.y - this.center.y });
        }

        /*
         * Returns the number of sides. Equal to the number of vertices.
         */
        getNumberOfSides() {
            return this.points.length
        }

        /*
         * rotate the polygon by a number of radians
         */
        rotate(rads) {
            for (let i = 0; i < this.points.length; i++) {
                let x = this.points[i].x;
                let y = this.points[i].y;
                this.points[i].x = Math.cos(rads) * x - Math.sin(rads) * y;
                this.points[i].y = Math.sin(rads) * x + Math.cos(rads) * y;
            }
        }

        /*
         *  The draw function takes as a parameter a Context object from
         *  a Canvas element and draws the polygon on it.
         */
        draw(context, { lineWidth = 2, stroke = '#000000', fill = null } = {}) {
            context.beginPath();
            context.moveTo(this.points[0].x + this.center.x, this.points[0].y + this.center.y);
            for (let i = 1; i < this.points.length; i++) {
                context.lineTo(this.points[i].x + this.center.x, this.points[i].y + this.center.y);
            }
            context.closePath();
            context.lineWidth = lineWidth;
            if (stroke) {
                context.strokeStyle = stroke;
                context.stroke();
            }
            if (fill) {
                context.fillStyle = fill;
                context.fill();
            }
        }

        absolutePoints() {
            let result = new Array();
            for (let p of this.points) {
                result.push(Points.add(p, this.center));
            }
            return result
        }

        flatAbsolutePoints() {
            let result = new Array();
            for (let p of this.points) {
                let a = Points.add(p, this.center);
                result.push(a.x);
                result.push(a.y);
            }
            return result
        }

        /*
         *  This function returns true if the given point is inside the polygon,
         *  and false otherwise.
         */
        containsPoint(pnt) {
            let nvert = this.points.length;
            let testx = pnt.x;
            let testy = pnt.y;

            let vertx = new Array();
            for (let q = 0; q < this.points.length; q++) {
                vertx.push(this.points[q].x + this.center.x);
            }

            let verty = new Array();
            for (let w = 0; w < this.points.length; w++) {
                verty.push(this.points[w].y + this.center.y);
            }

            let i,
                j = 0;
            let c = false;
            for (i = 0, j = nvert - 1; i < nvert; j = i++) {
                if (
                    verty[i] > testy != verty[j] > testy &&
                    testx < ((vertx[j] - vertx[i]) * (testy - verty[i])) / (verty[j] - verty[i]) + vertx[i]
                )
                    c = !c;
            }
            return c
        }

        multiplyScalar(scale) {
            let center = Points.multiplyScalar(this.center, scale);
            let clone = new Polygon(center);
            for (let p of this.points) {
                clone.addPoint(Points.multiplyScalar(p, scale));
            }
            return clone
        }

        /*
         *  To detect intersection with another Polygon object, this
         *  function uses the Separating Axis Theorem. It returns false
         *  if there is no intersection, or an object if there is. The object
         *  contains 2 fields, overlap and axis. Moving the polygon by overlap
         *  on axis will get the polygons out of intersection.
         */
        intersectsWith(other) {
            let axis = { x: 0, y: 0 };
            let tmp, minA, maxA, minB, maxB;
            let side, i;
            let smallest = null;
            let overlap = 99999999;

            /* test polygon A's sides */
            for (side = 0; side < this.getNumberOfSides(); side++) {
                /* get the axis that we will project onto */
                if (side == 0) {
                    axis.x = this.points[this.getNumberOfSides() - 1].y - this.points[0].y;
                    axis.y = this.points[0].x - this.points[this.getNumberOfSides() - 1].x;
                } else {
                    axis.x = this.points[side - 1].y - this.points[side].y;
                    axis.y = this.points[side].x - this.points[side - 1].x;
                }

                /* normalize the axis */
                tmp = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
                axis.x /= tmp;
                axis.y /= tmp;

                /* project polygon A onto axis to determine the min/max */
                minA = maxA = this.points[0].x * axis.x + this.points[0].y * axis.y;
                for (i = 1; i < this.getNumberOfSides(); i++) {
                    tmp = this.points[i].x * axis.x + this.points[i].y * axis.y;
                    if (tmp > maxA) maxA = tmp;
                    else if (tmp < minA) minA = tmp;
                }
                /* correct for offset */
                tmp = this.center.x * axis.x + this.center.y * axis.y;
                minA += tmp;
                maxA += tmp;

                /* project polygon B onto axis to determine the min/max */
                minB = maxB = other.points[0].x * axis.x + other.points[0].y * axis.y;
                for (i = 1; i < other.getNumberOfSides(); i++) {
                    tmp = other.points[i].x * axis.x + other.points[i].y * axis.y;
                    if (tmp > maxB) maxB = tmp;
                    else if (tmp < minB) minB = tmp;
                }
                /* correct for offset */
                tmp = other.center.x * axis.x + other.center.y * axis.y;
                minB += tmp;
                maxB += tmp;

                /* test if lines intersect, if not, return false */
                if (maxA < minB || minA > maxB) {
                    return false
                } else {
                    let o = maxA > maxB ? maxB - minA : maxA - minB;
                    if (o < overlap) {
                        overlap = o;
                        smallest = { x: axis.x, y: axis.y };
                    }
                }
            }

            /* test polygon B's sides */
            for (side = 0; side < other.getNumberOfSides(); side++) {
                /* get the axis that we will project onto */
                if (side == 0) {
                    axis.x = other.points[other.getNumberOfSides() - 1].y - other.points[0].y;
                    axis.y = other.points[0].x - other.points[other.getNumberOfSides() - 1].x;
                } else {
                    axis.x = other.points[side - 1].y - other.points[side].y;
                    axis.y = other.points[side].x - other.points[side - 1].x;
                }

                /* normalize the axis */
                tmp = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
                axis.x /= tmp;
                axis.y /= tmp;

                /* project polygon A onto axis to determine the min/max */
                minA = maxA = this.points[0].x * axis.x + this.points[0].y * axis.y;
                for (i = 1; i < this.getNumberOfSides(); i++) {
                    tmp = this.points[i].x * axis.x + this.points[i].y * axis.y;
                    if (tmp > maxA) maxA = tmp;
                    else if (tmp < minA) minA = tmp;
                }
                /* correct for offset */
                tmp = this.center.x * axis.x + this.center.y * axis.y;
                minA += tmp;
                maxA += tmp;

                /* project polygon B onto axis to determine the min/max */
                minB = maxB = other.points[0].x * axis.x + other.points[0].y * axis.y;
                for (i = 1; i < other.getNumberOfSides(); i++) {
                    tmp = other.points[i].x * axis.x + other.points[i].y * axis.y;
                    if (tmp > maxB) maxB = tmp;
                    else if (tmp < minB) minB = tmp;
                }
                /* correct for offset */
                tmp = other.center.x * axis.x + other.center.y * axis.y;
                minB += tmp;
                maxB += tmp;

                /* test if lines intersect, if not, return false */
                if (maxA < minB || minA > maxB) {
                    return false
                } else {
                    let o = maxA > maxB ? maxB - minA : maxA - minB;
                    if (o < overlap) {
                        overlap = o;
                        smallest = { x: axis.x, y: axis.y };
                    }
                }
            }
            return { overlap: overlap + 0.001, axis: smallest }
        }

        static fromPoints(points) {
            let min = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };
            let max = { x: Number.MIN_VALUE, y: Number.MIN_VALUE };
            for (let p of points) {
                min.x = Math.min(p.x, min.x);
                max.x = Math.max(p.x, max.x);
                min.y = Math.min(p.y, min.y);
                max.y = Math.max(p.y, max.y);
            }
            let center = Points.mean(min, max);
            let polygon = new Polygon(center);
            for (let p of points) {
                polygon.addAbsolutePoint(p);
            }
            return polygon
        }
    }

    class LowPassFilter {
        constructor(smoothing = 0.5, bufferMaxSize = 10) {
            this.smoothing = smoothing; // must be smaller than 1
            this.buffer = []; // FIFO queue
            this.bufferMaxSize = bufferMaxSize;
        }

        /**
         * Setup buffer with array of values
         *
         * @param {array} values
         * @returns {array}
         * @access public
         */
        setup(values) {
            for (let i = 0; i < values.length; i++) {
                this.__push(values[i]);
            }
            return this.buffer
        }

        /**
         * Clear buffer to prepare for new values.
         *
         * @access public
         */
        clear() {
            this.buffer = [];
        }

        /**
         * Add new value to buffer (FIFO queue)
         *
         * @param {integer|float} value
         * @returns {integer|float}
         * @access private
         */
        __push(value) {
            let removed = this.buffer.length === this.bufferMaxSize ? this.buffer.shift() : 0;

            this.buffer.push(value);
            return removed
        }

        /**
         * Smooth value from stream
         *
         * @param {integer|float} nextValue
         * @returns {integer|float}
         * @access public
         */
        next(nextValue) {
            // push new value to the end, and remove oldest one
            let removed = this.__push(nextValue);
            // smooth value using all values from buffer
            let result = this.buffer.reduce((last, current) => {
                return this.smoothing * current + (1 - this.smoothing) * last
            }, removed);
            // replace smoothed value
            this.buffer[this.buffer.length - 1] = result;
            return result
        }

        /**
         * Smooth array of values
         *
         * @param {array} values
         * @returns {undefined}
         * @access public
         */
        smoothArray(values) {
            let value = values[0];
            for (let i = 1; i < values.length; i++) {
                let currentValue = values[i];
                value += (currentValue - value) * this.smoothing;
                values[i] = Math.round(value);
            }
            return values
        }
    }

    /* global */

    /**
     * Callback for the button action.
     *
     * @callback actionCallback
     * @param {object} event - The event object.
     * @param {Button} button - A reference to the button (also this refers to the button).
     */

    /**
     * Callback for the button beforeAction.
     *
     * @callback beforeActionCallback
     * @param {object} event - The event object.
     * @param {Button} button - A reference to the button (also this refers to the button).
     */

    /**
     * Callback for the button afterAction.
     *
     * @callback afterActionCallback
     * @param {object} event - The event object.
     * @param {Button} button - A reference to the button (also this refers to the button).
     */

    /**
     * Class that represents a PixiJS Button.
     *
     * @example
     * // Create the button
     * const button = new Button({
     *     label: 'My Button',
     *     action: () => console.log('Button was clicked')
     * })
     *
     * // Add the button to a DisplayObject
     * app.scene.addChild(button)
     *
     * @class
     * @extends PIXI.Container
     * @see {@link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container}
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/button.html|DocTest}
     */
    class Button$1 extends PIXI.Container {
        /**
         * Creates an instance of a Button.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the button.
         * @param {number} [opts.id=auto generated] - The id of the button.
         * @param {string} [opts.label] - The label of the button.
         * @param {number} [opts.x=0] - The x position of the button. Can be also set after creation with button.x = 0.
         * @param {number} [opts.y=0] - The y position of the button. Can be also set after creation with button.y = 0.
         * @param {string|Theme} [opts.theme=dark] - The theme to use for this button. Possible values are dark, light, red
         *     or a Theme object.
         * @param {number} [opts.minWidth=44] - The minimum width of the button.
         * @param {number} [opts.minHeight=44] - The minimum height of the button.
         * @param {number} [opts.padding=Theme.padding] - The inner spacing (distance from icon and/or label) to the border.
         * @param {string|PIXI.DisplayObject} [opts.icon] - The icon of the button. Can be a predefined one, an URL or an PIXI.DisplayObject.
         * @param {string|PIXI.DisplayObject} [opts.iconActive=icon] - The icon of the button when activated. Can be a predefined one, an URL or an PIXI.DisplayObject.
         * @param {string} [opts.iconPosition=left] - The position of the icon in relation to the label. Can be left or right.
         * @param {number} [opts.iconColor=Theme.iconColor] - The color of the icon (set by the tint property) as a hex value.
         * @param {number} [opts.iconColorActive=Theme.iconColorActive] - The color of the icon when activated.
         * @param {number} [opts.fill=Theme.fill] - The color of the button background as a hex value.
         * @param {number} [opts.fillAlpha=Theme.fillAlpha] - The alpha value of the background.
         * @param {number} [opts.fillActive=Theme.fillActive] - The color of the button background when activated.
         * @param {number} [opts.fillActiveAlpha=Theme.fillActiveAlpha] - The alpha value of the background when activated.
         * @param {number} [opts.stroke=Theme.stroke] - The color of the border as a hex value.
         * @param {number} [opts.strokeWidth=Theme.strokeWidth] - The width of the border in pixel.
         * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
         * @param {number} [opts.strokeActive=Theme.strokeActive] - The color of the border when activated.
         * @param {number} [opts.strokeActiveWidth=Theme.strokeActiveWidth] - The width of the border in pixel when activated.
         * @param {number} [opts.strokeActiveAlpha=Theme.strokeActiveAlpha] - The alpha value of the border when activated.
         * @param {object} [opts.textStyle=Theme.textStyle] - A textstyle object for the styling of the label. See PIXI.TextStyle
         *     for possible options.
         * @param {number} [opts.textStyleActive=Theme.textStyleActive] - A textstyle object for the styling of the label when the
         *     button is activated. See PIXI.TextStyle for possible options.
         * @param {string} [opts.style=default] - A shortcut for styling options. Possible values are default, link.
         * @param {number} [opts.radius=Theme.radius] - The radius of the four corners of the button (which is a rounded rectangle).
         * @param {boolean} [opts.disabled=false] - Is the button disabled? When disabled, the button has a lower alpha value
         *     and cannot be clicked (interactive is set to false).
         * @param {boolean} [opts.active=false] - Is the button initially active?
         * @param {actionCallback} [opts.action] - Executed when the button was triggered (by pointerup).
         * @param {beforeActionCallback} [opts.beforeAction] - Executed before the main action is triggered.
         * @param {afterActionCallback} [opts.afterAction] - Executed after the main action was triggered.
         * @param {string} [opts.type=default] - The type of the button. Can be default or checkbox. When the type is
         *     checkbox, the active state is toggled automatically.
         * @param {string} [opts.align=center] - The horizontal position of the label and the icon. Possible values are
         *     left, center and right. Only affects the style when the minWidth is bigger than the width of the icon and label.
         * @param {string} [opts.verticalAlign=middle] - The vertical position of the label and the icon. Possible values are
         *     top, middle and button. Only affects the style when the minHeight is bigger than the height of the icon and label.
         * @param {string|object} [opts.tooltip] - A string for the label of the tooltip or an object to configure the tooltip
         *     to display.
         * @param {string|object} [opts.badge] - A string for the label of the badge or an object to configure the badge to display.
         *     If the parameter is an object, all badge options can be set plus the following:
         * @param {string} [opts.badge.align=right] - The horizontal alignment of the badge. Possible values: left, center, right
         * @param {string} [opts.badge.verticalAlign=top] - The vertical alignment of the badge. Possible values: top, middle, bottom
         * @param {number} [opts.badge.offsetLeft=0] - The horizontal shift of the badge.
         * @param {number} [opts.badge.offsetTop=0] - The vertical shift of the badge.
         * @param {boolean} [opts.visible=true] - Is the button initially visible (property visible)?
         */
        constructor(opts = {}) {
            super();

            const theme = Theme.fromString(opts.theme);
            this.theme = theme;

            this.opts = Object.assign(
                {},
                {
                    id: PIXI.utils.uid(),
                    label: null,
                    x: 0,
                    y: 0,
                    minWidth: 44,
                    minHeight: 44,
                    padding: theme.padding,
                    icon: undefined,
                    iconActive: undefined,
                    iconPosition: 'left',
                    iconColor: theme.iconColor,
                    iconColorActive: theme.iconColorActive,
                    fill: theme.fill,
                    fillAlpha: theme.fillAlpha,
                    fillActive: theme.fillActive,
                    fillActiveAlpha: theme.fillActiveAlpha,
                    stroke: theme.stroke,
                    strokeWidth: theme.strokeWidth,
                    strokeAlpha: theme.strokeAlpha,
                    strokeActive: theme.strokeActive,
                    strokeActiveWidth: theme.strokeActiveWidth,
                    strokeActiveAlpha: theme.strokeActiveAlpha,
                    textStyle: {},
                    textStyleActive: {},
                    style: 'default',
                    radius: theme.radius,
                    disabled: false,
                    active: false,
                    action: null,
                    beforeAction: null,
                    afterAction: null,
                    type: 'default',
                    align: 'center',
                    verticalAlign: 'middle',
                    tooltip: null,
                    badge: null,
                    visible: true
                },
                opts
            );

            this.id = this.opts.id;

            this.opts.textStyle = Object.assign({}, theme.textStyle, this.opts.textStyle);
            this.opts.textStyleActive = Object.assign({}, theme.textStyleActive, this.opts.textStyleActive);

            if (typeof this.opts.icon === 'undefined' && typeof this.opts.iconActive !== 'undefined') {
                this.opts.icon = this.opts.iconActive;
            } else if (typeof this.opts.icon !== 'undefined' && typeof this.opts.iconActive === 'undefined') {
                this.opts.iconActive = this.opts.icon;
            }

            if (this.opts.style === 'link') {
                Object.assign(this.opts, {
                    strokeAlpha: 0,
                    strokeActiveAlpha: 0,
                    fillAlpha: 0,
                    fillActiveAlpha: 0
                });
            }

            this._active = null;
            this._disabled = null;

            this.__start = { x: null, y: null };

            this.iconInactive = null;
            this.iconActive = null;
            this.text = null;

            this.button = null;
            this.content = null;

            this.tooltip = null;
            this.badge = null;

            this.visible = this.opts.visible;

            // setup
            //-----------------
            this.setup();
        }

        /**
         * Captures an event to inform InteractionMapper about processed events.
         *
         * @param {event|PIXI.InteractionEvent} event - The PIXI event to capture.
         */
        capture(event) {
            Events$1.capturedBy(event.data.originalEvent, this);
        }

        /**
         * Creates children and instantiates everything.
         *
         * @private
         * @return {Button} A reference to the button for chaining.
         */
        setup() {
            // Button
            //-----------------
            let button = new PIXI.Graphics();
            this.button = button;
            this.addChild(button);

            // Content
            //-----------------
            let content = new PIXI.Container();
            this.content = content;
            this.addChild(content);

            // Text
            //-----------------
            if (this.opts.label) {
                this.text = new PIXI.Text(this.opts.label, this.opts.textStyle);
            }

            // Icon
            //-----------------
            if (this.opts.icon) {
                this.iconInactive = this.loadIcon(this.opts.icon, this.opts.iconColor);
            }

            if (this.opts.iconActive) {
                this.iconActive = this.loadIcon(this.opts.iconActive, this.opts.iconColorActive);
            }

            // interaction
            //-----------------
            this.button.on('pointerover', e => {
                this.capture(e);
                TweenLite.to([this.button, this.content], this.theme.fast, {
                    alpha: 0.83,
                    overwrite: 'none'
                });
            });

            this.button.on('pointermove', e => {
                this.capture(e);
            });

            this.button.on('pointerout', this.onEnd.bind(this));
            this.button.on('pointercancel', this.onEnd.bind(this));
            this.button.on('pointerupoutside', this.onEnd.bind(this));
            this.button.on('pointertap', this.onEnd.bind(this));
            this.button.on('scroll', this.onEnd.bind(this));

            // eslint-disable-next-line no-unused-vars
            this.button.on('pointerdown', e => {
                //this.capture(e)
                this.__start.x = e.data.global.x;
                this.__start.y = e.data.global.y;
                TweenLite.to([this.button, this.content], this.theme.fast, {
                    alpha: 0.7,
                    overwrite: 'none'
                });
            });

            this.button.on('pointerup', e => {
                this.capture(e);

                const distance = Points.distance(e.data.global, this.__start);

                if (distance < 5) {
                    if (this.opts.beforeAction) {
                        this.opts.beforeAction.call(this, e, this);
                    }

                    if (this.opts.action) {
                        this.opts.action.call(this, e, this);
                    }

                    TweenLite.to([this.button, this.content], this.theme.fast, {
                        alpha: 0.83,
                        overwrite: 'none'
                    });

                    if (this.opts.type === 'checkbox') {
                        this.active = !this.active;
                    }

                    if (this.opts.afterAction) {
                        this.opts.afterAction.call(this, e, this);
                    }
                }
            });

            // disabled
            //-----------------
            this.disabled = this.opts.disabled;

            // active
            //-----------------
            this.active = this.opts.active; // calls .layout()

            // tooltip
            //-----------------
            if (this.opts.tooltip) {
                if (typeof this.opts.tooltip === 'string') {
                    this.tooltip = new Tooltip({
                        object: this,
                        content: this.opts.tooltip
                    });
                } else {
                    this.opts.tooltip = Object.assign({}, { object: this }, this.opts.tooltip);
                    this.tooltip = new Tooltip(this.opts.tooltip);
                }
            }

            // badge
            //-----------------
            if (this.opts.badge) {
                let opts = Object.assign(
                    {},
                    {
                        align: 'right',
                        verticalAlign: 'top',
                        offsetLeft: 0,
                        offsetTop: 0
                    }
                );
                if (typeof this.opts.badge === 'string') {
                    opts = Object.assign(opts, { content: this.opts.badge });
                } else {
                    opts = Object.assign(opts, this.opts.badge);
                }

                const badge = new Badge(opts);
                this.addChild(badge);
                this.badge = badge;
            }

            this.layout();

            // set position
            //-----------------
            this.position.set(this.opts.x, this.opts.y);

            return this
        }

        /**
         * Should be called to refresh the layout of the button. Can be used after resizing.
         *
         * @return {Button} A reference to the button for chaining.
         */
        layout() {
            // Clear content
            //-----------------
            this.removeChild(this.content);
            this.content = new PIXI.Container();
            this.addChild(this.content);

            // Set the icon
            //-----------------
            let icon = null;

            if (!this.active && this.iconInactive) {
                icon = this.iconInactive;
            } else if (this.active && this.iconActive) {
                icon = this.iconActive;
            }

            // Set the text
            //-----------------
            if (this.text) {
                this.text.position.set(0, 0);
            }

            // Width and Height
            //-----------------
            let width = 0;
            if (icon && this.text) {
                width = icon.width + this.text.width + 3 * this.opts.padding;
            } else if (icon) {
                width = icon.width + 2 * this.opts.padding;
            } else if (this.text) {
                width = this.text.width + 2 * this.opts.padding;
            }

            if (width < this.opts.minWidth) {
                width = this.opts.minWidth;
            }

            let height = 0;
            if (icon) {
                height = icon.height + 2 * this.opts.padding;
            } else if (this.text) {
                height = this.text.height + 2 * this.opts.padding;
            }

            if (height < this.opts.minHeight) {
                height = this.opts.minHeight;
            }

            this._width = width;
            this._height = height;

            // Position icon and text
            //-----------------
            if (icon && this.text) {
                if (this.opts.iconPosition === 'right') {
                    icon.x = this.text.width + this.opts.padding;
                } else {
                    this.text.x = icon.width + this.opts.padding;
                }
                this.content.addChild(icon, this.text);
            } else if (icon) {
                this.content.addChild(icon);
            } else if (this.text) {
                this.content.addChild(this.text);
            }

            this.layoutInnerContent();
            this.layoutContent();

            this.icon = icon;

            // badge
            //--------------------
            if (this.badge) {
                this.removeChild(this.badge);
                const width = this._width;
                const height = this._height;
                this.addChild(this.badge);

                const badge = this.badge;

                switch (badge.opts.align) {
                    case 'left':
                        badge.x = -badge.width / 2 + badge.opts.offsetLeft;
                        break
                    case 'center':
                        badge.x = width / 2 - badge.width / 2 + badge.opts.offsetLeft;
                        break
                    case 'right':
                        badge.x = width - badge.width / 2 + badge.opts.offsetLeft;
                }

                switch (badge.opts.verticalAlign) {
                    case 'top':
                        badge.y = -badge.height / 2 + badge.opts.offsetTop;
                        break
                    case 'middle':
                        badge.y = height / 2 - badge.height / 2 + badge.opts.offsetTop;
                        break
                    case 'bottom':
                        badge.y = height - badge.height / 2 + badge.opts.offsetTop;
                }
            }

            // draw
            //-----------------
            this.draw();

            return this
        }

        /**
         * Calculates the positions of the content children (icon and/or text).
         *
         * @private
         * @return {Button} A reference to the button for chaining.
         */
        layoutInnerContent() {
            for (let child of this.content.children) {
                switch (this.opts.verticalAlign) {
                    case 'top':
                        child.y = 0;
                        break
                    case 'middle':
                        child.y = this.content.height / 2 - child.height / 2;
                        break
                    case 'bottom':
                        child.y = this.content.height - child.height;
                        break
                }
            }

            return this
        }

        /**
         * Sets the horizontal and vertical position of the content.
         * Uses the option keys "align" and "verticalAlign".
         *
         * @private
         * @return {Button} A reference to the button for chaining.
         */
        layoutContent() {
            switch (this.opts.align) {
                case 'left':
                    this.content.x = this.opts.padding;
                    break
                case 'center':
                    this.content.x = (this._width - this.content.width) / 2;
                    break
                case 'right':
                    this.content.x = this._width - this.opts.padding - this.content.width;
                    break
            }

            switch (this.opts.verticalAlign) {
                case 'top':
                    this.content.y = this.opts.padding;
                    break
                case 'middle':
                    this.content.y = (this._height - this.content.height) / 2;
                    break
                case 'bottom':
                    this.content.y = this._height - this.opts.padding - this.content.height;
                    break
            }

            return this
        }

        /**
         * Draws the canvas.
         *
         * @private
         * @return {Button} A reference to the button for chaining.
         */
        draw() {
            this.button.clear();
            if (this.active) {
                this.button.lineStyle(this.opts.strokeActiveWidth, this.opts.strokeActive, this.opts.strokeActiveAlpha);
                this.button.beginFill(this.opts.fillActive, this.opts.fillActiveAlpha);
            } else {
                this.button.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
                this.button.beginFill(this.opts.fill, this.opts.fillAlpha);
            }
            this.button.drawRoundedRect(0, 0, this._width, this._height, this.opts.radius);
            this.button.endFill();

            return this
        }

        /**
         * Gets or sets the active state.
         *
         * @member {boolean}
         */
        get active() {
            return this._active
        }
        set active(value) {
            this._active = value;

            if (this._active) {
                if (this.text) {
                    this.text.style = this.opts.textStyleActive;
                }
            } else {
                if (this.text) {
                    this.text.style = this.opts.textStyle;
                }
            }

            this.layout();
        }

        /**
         * Gets or sets the disabled state. When disabled, the button cannot be clicked.
         *
         * @member {boolean}
         */
        get disabled() {
            return this._disabled
        }
        set disabled(value) {
            this._disabled = value;

            if (this._disabled) {
                this.button.interactive = false;
                this.button.buttonMode = false;
                this.button.alpha = 0.5;
                if (this.icon) {
                    this.icon.alpha = 0.5;
                }
                if (this.text) {
                    this.text.alpha = 0.5;
                }
            } else {
                this.button.interactive = true;
                this.button.buttonMode = true;
                this.button.alpha = 1;
                if (this.icon) {
                    this.icon.alpha = 1;
                }
                if (this.text) {
                    this.text.alpha = 1;
                }
            }
        }

        /**
         * Shows the button (sets his alpha values to 1).
         *
         * @return {Button} A reference to the button for chaining.
         */
        show() {
            this.opts.strokeAlpha = 1;
            this.opts.strokeActiveAlpha = 1;
            this.opts.fillAlpha = 1;
            this.opts.fillActiveAlpha = 1;

            this.layout();

            return this
        }

        /**
         * Hides the button (sets his alpha values to 0).
         *
         * @return {Button} A reference to the button for chaining.
         */
        hide() {
            this.opts.strokeAlpha = 0.0;
            this.opts.strokeActiveAlpha = 0.0;
            this.opts.fillAlpha = 0.0000000001; // WORKAROUND: See https://github.com/pixijs/pixi.js/wiki/v5-Migration-Guide#graphics-interaction
            this.opts.fillActiveAlpha = 0.0000000001;

            this.layout();

            return this
        }

        /**
         * Loads an icon
         *
         * @private
         * @param {string|PIXI.DisplayObject} icon - The icon to load.
         * @param {number} color - The color of the icon (if not an PIXI.DisplayObject).
         * @return {PIXI.DisplayObject} Return the icon as an PIXI.DisplayObject.
         */
        loadIcon(icon, color) {
            let displayObject = null;

            if (icon instanceof PIXI.DisplayObject) {
                displayObject = icon;
            } else {
                let size = 17;
                if (this.text) {
                    size = this.text.height;
                } else if (this.opts.minHeight) {
                    size = this.opts.minHeight - 2 * this.opts.padding;
                }

                const url = Button$1.iconIsUrl(icon) ? icon : `../../assets/icons/${icon}.png`;
                const iconTexture = PIXI.Texture.from(url);

                const sprite = new PIXI.Sprite(iconTexture);
                sprite.tint = color;
                sprite.width = size;
                sprite.height = size;

                displayObject = sprite;
            }

            return displayObject
        }

        /**
         * Tests if an icon string is an url.
         *
         * @private
         * @static
         * @param {string} url - The url to test.
         * @return {boolean} true if the url is an url to an image.
         */
        static iconIsUrl(url) {
            return /\.(png|svg|gif|jpg|jpeg|tif|tiff)$/i.test(url)
        }

        /**
         * Gets or sets the color of the current icon (no matter how the status is). Changing the color, changes
         * the tint property of the icon sprite.
         *
         * @member {number}
         */
        get iconColor() {
            return this.icon ? this.icon.tint : null
        }
        set iconColor(value) {
            if (this.icon) {
                this.icon.tint = value;
            }
        }

        onEnd(event) {
            this.capture(event);
            TweenLite.to([this.button, this.content], this.theme.fast, {
                alpha: 1,
                overwrite: 'none'
            });
        }
    }

    /* globals ThrowPropsPlugin, Strong */

    /**
     * Class that represents a PixiJS ButtonGroup.
     *
     * @example
     * // Create the button group
     * const buttonGroup = new ButtonGroup({
     *     buttons: [
     *         {label: 'Button 1', action: event => console.log(event)},
     *         {label: 'Button 2', action: event => console.log(event)},
     *         {label: 'Button 3', action: event => console.log(event)}
     *     ],
     *     minWidth: 100
     * })
     *
     * // Add the button group to a DisplayObject
     * app.scene.addChild(buttonGroup)
     *
     * @class
     * @extends PIXI.Graphics
     * @see {@link http://pixijs.download/dev/docs/PIXI.Graphics.html|PIXI.Graphics}
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/buttongroup.html|DocTest}
     */
    class ButtonGroup extends PIXI.Container {
        /**
         * Creates an instance of a ButtonGroup.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the button group.
         * @param {number} [opts.id=auto generated] - The id of the button group.
         * @param {number} [opts.x=0] - The x position of the button group. Can be also set after creation with buttonGroup.x = 0.
         * @param {number} [opts.y=0] - The y position of the button group. Can be also set after creation with buttonGroup.y = 0.
         * @param {object[]} [opts.buttons=[]] - An array of the buttons of the button group. One item of the array (one object)
         *     can have exactly the same properties as an Button object when instantiating a Button. If a property of the button group
         *     conflicts with a property of a button object, the value from the button object will be used.
         * @param {string|Theme=} [opts.theme=dark] - The theme to use for this button group. Possible values are dark, light, red
         *     or a Theme object.
         * @param {number} [opts.minWidth=44] - Button: The minimum width of one button.
         * @param {number} [opts.minHeight=44] - Button: The minimum height of one button.
         * @param {number} [opts.maxWidth] - The maximum width of the button group. If the buttons are wider than the maximum width, the buttons get stacked. Note: The buttons can only be stacked if margin is not zero. Note 2: Load the Greensock ThrowPropsPlugin for smoother animations.
         * @param {number} [opts.maxHeight] - The maximum height of the button group. If the buttons are higher than the maximum height, the buttons get stacked. Note: The buttons can only be stacked if margin is not zero. Note 2: Load the Greensock ThrowPropsPlugin for smoother animations.
         * @param {number} [opts.stackPadding=10] - The padding for stacked buttons.
         * @param {PIXI.Application} [opts.app=window.app] - The PixiJS Application. Must be set if you want to use the mousewheel to scroll your button group. Only used when the buttons are stacked (with maxWidth or maxHeight).
         * @param {number} [opts.padding=Theme.padding] - Button: The inner spacing (distance from icon and/or label) the the border.
         * @param {number} [opts.margin=Theme.margin] - The outer spacing (distance from one button to the previous/next button).
         * @param {string} [opts.iconPosition=left] - Button: The position of the icon in relation to the label. Can be left or right.
         * @param {number} [opts.iconColor=Theme.iconColor] - Button: The color of the icon (set by the tint property) as a hex value.
         * @param {number} [opts.iconColorActive=Theme.iconColorActive] - Button: The color of the icon when activated.
         * @param {number} [opts.fill=Theme.fill] - Button: The color of the button background as a hex value.
         * @param {number} [opts.fillAlpha=Theme.fillAlpha] - Button: The alpha value of the background.
         * @param {number} [opts.fillActive=Theme.fillActive] - Button: The color of the button background when activated.
         * @param {number} [opts.fillActiveAlpha=Theme.fillActiveAlpha] - Button: The alpha value of the background when activated.
         * @param {number} [opts.stroke=Theme.stroke] - Button: The color of the border as a hex value.
         * @param {number} [opts.strokeWidth=Theme.strokeWidth] - Button: The width of the border in pixel.
         * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - Button: The alpha value of the border.
         * @param {number} [opts.strokeActive=Theme.strokeActive] - Button: The color of the border when activated.
         * @param {number} [opts.strokeActiveWidth=Theme.strokeActiveWidth] - Button: The width of the border in pixel when activated.
         * @param {number} [opts.strokeActiveAlpha=Theme.strokeActiveAlpha] - Button: The alpha value of the border when activated.
         * @param {object} [opts.textStyle=Theme.textStyle] - Button: A textstyle object for the styling of the label. See PIXI.TextStyle
         *     for possible options.
         * @param {number} [opts.textStyleActive=Theme.textStyleActive] - Button: A textstyle object for the styling of the label when the
         *     button is activated. See PIXI.TextStyle for possible options.
         * @param {string} [opts.style=default] - A shortcut for styling options. Possible values are default, link.
         * @param {number} [opts.radius=Theme.radius] - Button: The radius of the four corners of the button (which is a rounded rectangle).
         * @param {boolean} [opts.disabled=false] - Is the button group disabled? When disabled, the button group has a lower alpha value
         *     and cannot be clicked (interactive of every button is set to false).
         * @param {string} [opts.type=default] - The type of the button group. Can be default, checkbox or radio. When the type is
         *     checkbox, the active state is toggled for each button automatically. When the type is radio, only one button can
         *     be activated at the same time.
         * @param {string} [opts.orientation=horizontal] - The orientation of the button group. Can be horizontal or vertical.
         * @param {string} [opts.align=center] - Button: The horizontal position of the label and the icon. Possible values are
         *     left, center and right. Only affects the style when the minWidth is bigger than the width of the icon and label.
         * @param {string} [opts.verticalAlign=middle] - Button: The vertical position of the label and the icon. Possible values are
         *     top, middle and bottom. Only affects the style when the minHeight is bigger than the height of the icon and label.
         * @param {boolean} [opts.visible=true] - Is the button group initially visible (property visible)?
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
                    buttons: [],
                    minWidth: 44,
                    minHeight: 44,
                    maxWidth: null,
                    maxHeight: null,
                    stackPadding: 10,
                    app: window.app,
                    padding: theme.padding,
                    margin: theme.margin,
                    iconPosition: 'left', // left, right
                    iconColor: theme.iconColor,
                    iconColorActive: theme.iconColorActive,
                    fill: theme.fill,
                    fillAlpha: theme.fillAlpha,
                    fillActive: theme.fillActive,
                    fillActiveAlpha: theme.fillActiveAlpha,
                    stroke: theme.stroke,
                    strokeWidth: theme.strokeWidth,
                    strokeAlpha: theme.strokeAlpha,
                    strokeActive: theme.strokeActive,
                    strokeActiveWidth: theme.strokeActiveWidth,
                    strokeActiveAlpha: theme.strokeActiveAlpha,
                    textStyle: {},
                    textStyleActive: {},
                    style: 'default',
                    radius: theme.radius,
                    disabled: null,
                    type: 'default', // default, checkbox, radio
                    orientation: 'horizontal',
                    align: 'center', // left, center, right
                    verticalAlign: 'middle', // top, middle, bottom
                    visible: true
                },
                opts
            );

            this.opts.textStyle = Object.assign({}, theme.textStyle, this.opts.textStyle);
            this.opts.textStyleActive = Object.assign({}, theme.textStyleActive, this.opts.textStyleActive);

            this.buttons = [];

            this._disabled = null;
            this.__dragging = false;

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
         * @return {ButtonGroup} A reference to the button group for chaining.
         */
        setup() {
            // inner container
            //--------------------
            const container = new PIXI.Graphics();
            this.addChild(container);
            this.container = container;

            // Buttons
            //-----------------
            let position = 0;
            let index = 0;

            for (let it of this.opts.buttons) {
                delete it.x;
                delete it.y;

                if (this.opts.orientation === 'horizontal') {
                    it.x = position;
                } else {
                    it.y = position;
                }

                it.theme = it.theme || this.opts.theme;
                it.minWidth = it.minWidth || this.opts.minWidth;
                it.minHeight = it.minHeight || this.opts.minHeight;
                it.padding = it.padding || this.opts.padding;
                it.iconPosition = it.iconPosition || this.opts.iconPosition;
                it.iconColor = it.iconColor || this.opts.iconColor;
                it.iconColorActive = it.iconColorActive || this.opts.iconColorActive;
                it.fill = it.fill || this.opts.fill;
                it.fillAlpha = it.fillAlpha || this.opts.fillAlpha;
                it.fillActive = it.fillActive || this.opts.fillActive;
                it.fillActiveAlpha = it.fillActiveAlpha || this.opts.fillActiveAlpha;
                it.stroke = it.stroke || this.opts.stroke;
                it.strokeWidth = it.strokeWidth != null ? it.strokeWidth : this.opts.strokeWidth;
                it.strokeAlpha = it.strokeAlpha != null ? it.strokeAlpha : this.opts.strokeAlpha;
                it.strokeActive = it.strokeActive || this.opts.strokeActive;
                it.strokeActiveWidth = it.strokeActiveWidth != null ? it.strokeActiveWidth : this.opts.strokeActiveWidth;
                it.strokeActiveAlpha = it.strokeActiveAlpha != null ? it.strokeActiveAlpha : this.opts.strokeActiveAlpha;
                it.textStyle = it.textStyle || this.opts.textStyle;
                it.textStyleActive = it.textStyleActive || this.opts.textStyleActive;
                it.style = it.style || this.opts.style;
                it.radius = it.radius != null ? it.radius : this.opts.radius;
                if (!it.type) {
                    switch (this.opts.type) {
                        case 'checkbox':
                            it.type = this.opts.type;
                            break
                        default:
                            it.type = 'default';
                            break
                    }
                }
                //it.type = it.type || this.opts.type || 'default'
                it.align = it.align || this.opts.align;
                it.verticalAlign = it.verticalAlign || this.opts.verticalAlign;
                it.afterAction = (event, button) => {
                    if (this.opts.type === 'radio' && button.opts.type === 'default') {
                        this.buttons.forEach(it => {
                            if (it.opts.type === 'default') {
                                it.active = false;
                            }
                        });

                        if (button.opts.type === 'default') {
                            button.active = true;
                        }
                    }
                };

                if (it.tooltip) {
                    if (typeof it.tooltip === 'string') {
                        it.tooltip = { content: it.tooltip, container: this };
                    } else {
                        it.tooltip = Object.assign({}, { container: this }, it.tooltip);
                    }
                }

                let button = new Button$1(it);

                this.container.addChild(button);
                this.buttons.push(button);

                button.__originalPosition = {
                    x: button.x,
                    y: button.y
                };

                position += (this.opts.orientation === 'horizontal' ? button.width : button.height) + this.opts.margin;

                button.__initIndex = index;
                index++;
            }

            if (this.opts.orientation === 'vertical') {
                const maxWidth = this.getMaxButtonWidth();

                this.buttons.forEach(it => {
                    it.opts.minWidth = maxWidth;
                    it.layout();
                });
            }

            // disabled
            //-----------------
            if (this.opts.disabled != null) {
                this.disabled = this.opts.disabled;
            }

            // interaction
            //--------------------
            if (this.opts.margin > 0 && (this.opts.maxWidth || this.opts.maxHeight)) {
                this.interactive = true;
                this.on('pointerdown', this.onStart.bind(this));
                this.on('pointermove', this.onMove.bind(this));
                this.on('pointerup', this.onEnd.bind(this));
                this.on('pointercancel', this.onEnd.bind(this));
                this.on('pointerout', this.onEnd.bind(this));
                this.on('pointerupoutside', this.onEnd.bind(this));
                this.on('scroll', this.onScroll.bind(this));

                // mousewheel
                //--------------------
                if (this.opts.app) {
                    const app = this.opts.app;
                    app.view.addEventListener('mousewheel', event => {
                        const bounds = this.getBounds();
                        const x = event.clientX - app.view.getBoundingClientRect().left;
                        const y = event.clientY - app.view.getBoundingClientRect().top;
                        if (bounds.contains(x, y)) {
                            event.preventDefault();
                            this.emit('scroll', event);
                        }
                    });
                }

                const background = new PIXI.Graphics();
                background.beginFill(0x000000, 0);
                background.drawRect(0, 0, this.width, this.height);
                background.endFill();
                this.addChildAt(background, 0);

                this.__initWidth = this.container.width;
                this.__initHeight = this.container.height;
            }

            return this
        }

        /**
         * Should be called to refresh the layout of the button group. Can be used after resizing.
         *
         * @return {ButtonGroup} A reference to the button group for chaining.
         */
        layout() {
            // set position
            //-----------------
            this.position.set(this.opts.x, this.opts.y);

            // draw
            //-----------------
            this.draw();

            // stack
            //-----------------
            if (this.opts.margin > 0 && (this.opts.maxWidth || this.opts.maxHeight)) {
                this.stack();
            }

            return this
        }

        /**
         * Draws the canvas.
         *
         * @private
         * @return {ButtonGroup} A reference to the button group for chaining.
         */
        draw() {
            if (this.opts.margin === 0) {
                this.buttons.forEach(it => it.hide());

                this.container.clear();
                this.container.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
                this.container.beginFill(this.opts.fill, this.opts.fillAlpha);
                this.container.drawRoundedRect(0, 0, this.width, this.height, this.opts.radius);

                // Draw borders
                this.container.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha / 2);

                this.buttons.forEach((it, i) => {
                    if (i > 0) {
                        this.container.moveTo(it.x, it.y);

                        if (this.opts.orientation === 'horizontal') {
                            this.container.lineTo(it.x, it.height);
                        } else {
                            this.container.lineTo(it.width, it.y);
                        }
                    }
                });

                this.container.endFill();
            }

            return this
        }

        /**
         * Gets or sets the disabled state. When disabled, no button of the button group can be clicked.
         *
         * @member {boolean}
         */
        get disabled() {
            return this._disabled
        }

        set disabled(value) {
            this._disabled = value;

            this.buttons.forEach(it => (it.disabled = value));
        }

        /**
         * Gets or sets the maximum width of the button group for stacking. Usefull when you want to resize the available space.
         *
         * @member {number}
         */
        get maxWidth() {
            return this.opts.maxWidth
        }

        set maxWidth(value) {
            this.opts.maxWidth = value;
            this.layout();
        }

        /**
         * Gets or sets the maximum height of the button group for stacking. Usefull when you want to resize the available space.
         *
         * @member {number}
         */
        get maxHeight() {
            return this.opts.maxHeight
        }

        set maxHeight(value) {
            this.opts.maxHeight = value;
            this.layout();
        }

        /**
         * Searches all buttons of the button group and returns the maximum width of one button.
         *
         * @private
         * @return {number} The maximum with of a button of the button group.
         */
        getMaxButtonWidth() {
            let widths = this.buttons.map(it => it.width);

            return Math.max(...widths)
        }

        /**
         * Shows the button group (sets his alpha value to 1).
         *
         * @return {ButtonGroup} A reference to the button group for chaining.
         */
        show() {
            this.alpha = 1;

            return this
        }

        /**
         * Hides the button group (sets his alpha value to 0).
         *
         * @return {ButtonGroup} A reference to the button group for chaining.
         */
        hide() {
            this.alpha = 0;

            return this
        }

        /**
         *
         * @private
         * @param {*} event
         */
        onStart(event) {
            if (
                (this.opts.maxWidth != null && this.__initWidth > this.opts.maxWidth) ||
                (this.opts.maxHeight != null && this.__initHeight > this.opts.maxHeight)
            ) {
                this.__dragging = true;

                this.capture(event);

                this.__delta = {
                    x: this.container.position.x - event.data.global.x,
                    y: this.container.position.y - event.data.global.y
                };

                TweenLite.killTweensOf(this.container.position, { x: true, y: true });
                if (typeof ThrowPropsPlugin != 'undefined') {
                    ThrowPropsPlugin.track(this.container.position, 'x,y');
                }
            }
        }

        /**
         *
         * @private
         * @param {*} event
         */
        onMove(event) {
            if (this.__dragging) {
                this.capture(event);
                if (this.opts.orientation === 'horizontal') {
                    this.container.position.x = event.data.global.x + this.__delta.x;
                } else {
                    this.container.position.y = event.data.global.y + this.__delta.y;
                }

                this.stack();
            }
        }

        /**
         *
         * @private
         * @param {*} event
         */
        onEnd(event) {
            if (this.__dragging) {
                this.__dragging = false;

                this.capture(event);

                const throwProps = { x: { velocity: 'auto' }, y: { velocity: 'auto' } };

                if (this.opts.orientation === 'horizontal') {
                    if (this.__initWidth > this.opts.maxWidth) {
                        // stack!
                        const distanceToLeft = this.container.x;
                        const distanceToRight = this.opts.maxWidth - this.container.x - this.__initWidth;

                        if (distanceToLeft > 0) {
                            throwProps.x.end = 0;
                        } else if (distanceToRight > 0) {
                            throwProps.x.end = this.opts.maxWidth - this.__initWidth;
                        }
                    } else {
                        // just magnetize
                        throwProps.x.end = 0;
                    }
                } else {
                    if (this.__initHeight > this.opts.maxHeight) {
                        // stack!
                        const distanceToTop = this.container.y;
                        const distanceToBottom = this.opts.maxHeight - this.container.y - this.__initHeight;

                        if (distanceToTop > 0) {
                            throwProps.y.end = 0;
                        } else if (distanceToBottom > 0) {
                            throwProps.y.end = this.opts.maxHeight - this.__initHeight;
                        }
                    } else {
                        // just magnetize
                        throwProps.y.end = 0;
                    }
                }

                if (typeof ThrowPropsPlugin != 'undefined') {
                    ThrowPropsPlugin.to(
                        this.container.position,
                        {
                            throwProps,
                            ease: Strong.easeOut,
                            onUpdate: () => this.stack(),
                            onComplete: () => ThrowPropsPlugin.untrack(this.container.position)
                        },
                        0.8,
                        0.4
                    );
                } else {
                    if (this.opts.orientation === 'horizontal' && throwProps.x.end != null) {
                        TweenMax.to(this.container.position, 0.3, { x: throwProps.x.end, onUpdate: this.stack.bind(this) });
                    } else if (this.opts.orientation === 'vertical' && throwProps.y.end != null) {
                        TweenMax.to(this.container.position, 0.3, { y: throwProps.y.end, onUpdate: this.stack.bind(this) });
                    }
                }
            }
        }

        /**
         *
         * @private
         * @param {*} event
         */
        onScroll(event) {
            if (
                (this.opts.maxWidth != null && this.__initWidth > this.opts.maxWidth) ||
                (this.opts.maxHeight != null && this.__initHeight > this.opts.maxHeight)
            ) {
                this.capture(event);

                if (this.opts.orientation === 'horizontal') {
                    this.container.position.x -= event.deltaX;
                    if (this.container.position.x > 0) {
                        this.container.position.x = 0;
                    } else if (this.container.position.x + this.__initWidth < this.opts.maxWidth) {
                        this.container.position.x = this.opts.maxWidth - this.__initWidth;
                    }
                } else {
                    this.container.position.y -= event.deltaY;
                    if (this.container.position.y > 0) {
                        this.container.position.y = 0;
                    } else if (this.container.position.y + this.container.height < this.opts.maxHeight) {
                        this.container.position.y = this.opts.maxHeight - this.container.height;
                    }
                }

                this.stack();
            }
        }

        /**
         * Captures an event to inform InteractionMapper about processed events.
         *
         * @param {event|PIXI.InteractionEvent} event - The PIXI event to capture.
         */
        capture(event) {
            const originalEvent = event.data && event.data.originalEvent ? event.data.originalEvent : event;
            Events$1.capturedBy(originalEvent, this);
        }

        /**
         * @private
         */
        stack() {
            if (this.opts.maxWidth) {
                this._stackHorizontal();
            } else if (this.opts.maxHeight) {
                this._stackVertical();
            }
        }

        /**
         * @private
         */
        _stackHorizontal() {
            const sorted = [];

            let reverseCounter = this.buttons.length - 1;

            this.buttons.forEach((it, index) => {
                const leftCorner = it.__originalPosition.x + this.container.x;
                const rightCorner = it.__originalPosition.x + it.button.width;
                const paddingLeft = index * this.opts.stackPadding;
                const paddingRight = reverseCounter * this.opts.stackPadding;
                if (leftCorner < paddingLeft) {
                    // left border
                    it.x = -this.container.x + paddingLeft;
                } else if (rightCorner > -this.container.x + this.opts.maxWidth - paddingRight) {
                    // right border
                    it.x = -this.container.x + this.opts.maxWidth - it.button.width - paddingRight;
                } else {
                    it.x = it.__originalPosition.x;
                }

                reverseCounter--;

                sorted.push(it);
            });

            const min = Math.min(...sorted.map(it => it.x));
            const max = Math.max(...sorted.map(it => it.x + it.button.width));
            const center = (min + max) / 2;

            // z-index
            sorted
                .sort((a, b) => {
                    const centerA = a.x + a.button.width / 2;
                    const centerB = b.x + b.button.width / 2;

                    if (centerA < center && centerB < center) {
                        if (a.x < b.x) {
                            return -1
                        } else if (b.x < a.x) {
                            return 1
                        }
                    } else if (centerA > center && centerB > center) {
                        if (a.x + a.button.width > b.x + b.button.width) {
                            return -1
                        } else if (b.x + b.button.width < a.x + a.button.x) {
                            return 1
                        }
                    }

                    return 0
                })
                .forEach(it => it.parent.addChild(it));
        }

        /**
         * @private
         */
        _stackVertical() {
            const sorted = [];

            let reverseCounter = this.buttons.length - 1;

            this.buttons.forEach((it, index) => {
                const topCorner = it.__originalPosition.y + this.container.y;
                const bottomCorner = it.__originalPosition.y + it.button.height;
                const paddingTop = index * this.opts.stackPadding;
                const paddingBottom = reverseCounter * this.opts.stackPadding;
                if (topCorner < paddingTop) {
                    // top border
                    it.y = -this.container.y + paddingTop;
                } else if (bottomCorner > -this.container.y + this.opts.maxHeight - paddingBottom) {
                    // bottom border
                    it.y = -this.container.y + this.opts.maxHeight - it.button.height - paddingBottom;
                } else {
                    it.y = it.__originalPosition.y;
                }

                reverseCounter--;

                sorted.push(it);
            });

            const min = Math.min(...sorted.map(it => it.y));
            const max = Math.max(...sorted.map(it => it.y + it.button.height));
            const center = (min + max) / 2;

            // z-index
            sorted
                .sort((a, b) => {
                    const centerA = a.y + a.button.height / 2;
                    const centerB = b.y + b.button.height / 2;

                    if (centerA < center && centerB < center) {
                        if (a.y < b.y) {
                            return -1
                        } else if (b.y < a.y) {
                            return 1
                        }
                    } else if (centerA > center && centerB > center) {
                        if (a.y + a.button.height > b.y + b.button.height) {
                            return -1
                        } else if (b.y + b.button.height < a.y + a.button.y) {
                            return 1
                        }
                    }

                    return 0
                })
                .forEach(it => it.parent.addChild(it));
        }
    }

    /**
     * Class that represents a PixiJS InteractivePopup.
     * The class is used for various other Popup-like classes
     * like Popup, Message...
     *
     * @class
     * @abstract
     * @extends AbstractPopup
     */
    class InteractivePopup extends AbstractPopup {
        /**
         * Creates an instance of an InteractivePopup (only for internal use).
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the popup.
         * @param {boolean} [opts.closeOnPopup=false] - Should the popup be closed when the user clicks on the popup?
         * @param {boolean} [opts.closeButton=true] - Should a close button be displayed on the upper right corner?
         * @param {object} [opts.button] - A Button object to be display on the lower right corner.
         * @param {object} [opts.buttonGroup] - A ButtonGroup object to be displayed on the lower right corner.
         */
        constructor(opts = {}) {
            opts = Object.assign(
                {},
                {
                    closeOnPopup: false,
                    closeButton: true,
                    button: null,
                    buttonGroup: null
                },
                opts
            );

            super(opts);

            this._closeButton = null;
            this._buttons = null;

            // padding
            this.smallPadding = this.opts.padding / 2;

            // setup
            //-----------------
            this.setup();

            // layout
            //-----------------
            this.layout();
        }

        /**
         * Creates the framework and instantiates everything.
         *
         * @private
         * @return {AbstractPopup} A reference to the popup for chaining.
         */
        setup() {
            super.setup();

            // interaction
            //-----------------
            this.on('pointerup', e => {
                if (this.opts.closeOnPopup) {
                    this.hide();
                } else {
                    e.stopPropagation();
                }
            });

            // closeButton
            //-----------------
            if (this.opts.closeButton) {
                let closeButton = PIXI.Sprite.from('../../assets/icons/close.png');
                closeButton.width = this.headerStyle.fontSize;
                closeButton.height = closeButton.width;
                closeButton.tint = this.theme.color2;
                // This is needed, because the closeButton belongs to the content. The popup must resize with the closeButton.
                if (this._header) {
                    closeButton.x = this._header.width + this.innerPadding;
                } else if (this._content) {
                    closeButton.x = this._content.width + this.innerPadding;
                }

                closeButton.interactive = true;
                closeButton.buttonMode = true;
                closeButton.on('pointerdown', e => {
                    this.hide();
                });

                this._closeButton = closeButton;
                this.addChild(closeButton);

                // maxWidth is set and a closeButton should be displayed
                //-----------------
                if (this.opts.maxWidth) {
                    const wordWrapWidth =
                        this.opts.maxWidth - 2 * this.opts.padding - this.smallPadding - this._closeButton.width;
                    if (this._header) {
                        this.headerStyle.wordWrapWidth = wordWrapWidth;
                    } else if (this._content) {
                        this.textStyle.wordWrapWidth = wordWrapWidth;
                    }
                }
            }

            // buttons
            //-----------------
            if (this.opts.button || this.opts.buttonGroup) {
                if (this.opts.button) {
                    this._buttons = new Button$1(Object.assign({ textStyle: this.theme.textStyleSmall }, this.opts.button));
                } else {
                    this._buttons = new ButtonGroup(
                        Object.assign({ textStyle: this.theme.textStyleSmall }, this.opts.buttonGroup)
                    );
                }
                this.addChild(this._buttons);

                this._buttons.y = this.innerPadding + this.sy;
            }

            return this
        }

        /**
         * Should be called to refresh the layout of the popup. Can be used after resizing.
         *
         * @return {AbstractPopup} A reference to the popup for chaining.
         */
        layout() {
            super.layout();

            // closeButton
            //-----------------
            if (this.opts.closeButton) {
                this._closeButton.x = this.wantedWidth - this.smallPadding - this._closeButton.width;
                this._closeButton.y = this.smallPadding;
            }

            // buttons
            //-----------------
            if (this._buttons) {
                this._buttons.x = this.wantedWidth - this.opts.padding - this._buttons.width;
                this._buttons.y = this.wantedHeight - this.opts.padding - this._buttons.height;
            }

            return this
        }

        /**
         * Calculates the size of the children of the AbstractPopup.
         * Cannot use getBounds() because it is not updated when children
         * are removed.
         *
         * @private
         * @override
         * @returns {object} An JavaScript object width the keys width and height.
         */
        getInnerSize() {
            let size = super.getInnerSize();

            if (this._closeButton) {
                size.width += this.smallPadding + this._closeButton.width;
            }

            if (this._buttons) {
                size.width = Math.max(size.width, this._buttons.x + this._buttons.width);
                size.height += this.innerPadding + this._buttons.height;
            }

            return size
        }
    }

    /**
     * Class that represents a PixiJS Popup.
     *
     * @example
     * // Create the popup
     * const popup = new Popup({
     *     header: 'Goethe',
     *     content: 'Man kann die Erfahrung nicht frÃ¼h genug machen, wie entbehrlich man in der Welt ist.'
     * })
     *
     * // Add the popup to a DisplayObject
     * app.scene.addChild(popup)
     *
     * @class
     * @extends InteractivePopup
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/popup.html|DocTest}
     */
    class Popup extends InteractivePopup {
        /**
         * Creates an instance of a Popup.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the popup.
         * @param {boolean} [opts.closeButton=false] - Should a close button be displayed on the upper right corner?
         * @param {number} [opts.minWidth=0] - The minimum width of the popup.
         * @param {number} [opts.minHeight=0] - The minimum height of the popup.
         */
        constructor(opts = {}) {
            opts = Object.assign(
                {},
                {
                    closeButton: false,
                    minWidth: 0,
                    minHeight: 0
                },
                opts
            );

            super(opts);
        }
    }

    /**
     * Class that represents a PixiJS Modal.
     *
     * @example
     * // Create the button and the modal when clicked
     * const button = new Button({
     *     label: 'Show Modal',
     *     action: e => {
     *         const modal = new Modal({
     *             app: app,
     *             header: 'This is the header',
     *             content: 'This is the text.'
     *         })
     *         app.scene.addChild(modal)
     *     }
     * })
     *
     * // Add the button to a DisplayObject
     * app.scene.addChild(button)
     *
     * @class
     * @extends PIXI.Container
     * @extends InteractivePopup
     * @see {@link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container}
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/modal.html|DocTest}
     */
    class Modal extends PIXI.Container {
        /**
         * Creates an instance of a Modal.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the modal.
         * @param {number} [opts.id=auto generated] - The id of the modal.
         * @param {PIXIApp} [opts.app=window.app] - The app where the modal belongs to.
         * @param {number} [opts.backgroundFill=Theme.background] - The color of the background.
         * @param {number} [opts.backgroundFillAlpha=0.6] - The opacity of the background.
         * @param {boolean} [opts.closeOnBackground=true] - Should the modal be closed when the user clicks the
         *     background?
         * @param {boolean} [opts.visible=true] - Is the modal initially visible (property visible)?
         */
        constructor(opts = {}) {
            super();

            const theme = Theme.fromString(opts.theme);
            this.theme = theme;

            this.opts = Object.assign(
                {},
                {
                    id: PIXI.utils.uid(),
                    app: window.app,
                    backgroundFill: theme.background,
                    backgroundFillAlpha: 0.6,
                    closeOnBackground: true,
                    visible: true
                },
                opts
            );

            this.id = this.opts.id;

            this.background = null;
            this.popup = null;

            this.alpha = 0;
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
         * @return {Modal} A reference to the modal for chaining.
         */
        setup() {
            // interaction
            //-----------------
            this.interactive = true;
            this.on('added', e => {
                if (this.visible) {
                    this.show();
                }
            });

            // background
            //-----------------
            let background = new PIXI.Graphics();
            this.background = background;
            this.addChild(this.background);

            if (this.opts.closeOnBackground) {
                background.interactive = true;
                background.on('pointerup', e => {
                    this.hide();
                });
            }

            // popup
            //-----------------
            const popupOpts = Object.assign({}, this.opts, {
                visible: true,
                onHidden: () => {
                    this.hide();
                }
            });
            let popup = new InteractivePopup(popupOpts);
            this.popup = popup;
            this.addChild(popup);
            popup.show();

            return this
        }

        /**
         * Should be called to refresh the layout of the modal. Can be used after resizing.
         *
         * @return {Modal} A reference to the modal for chaining.
         */
        layout() {
            const width = this.opts.app.size.width;
            const height = this.opts.app.size.height;

            // background
            //-----------------
            this.background.clear();
            this.background.beginFill(this.opts.backgroundFill, this.opts.backgroundFillAlpha);
            this.background.drawRect(0, 0, width, height);
            this.background.endFill();

            // position
            this.popup.x = width / 2 - this.popup.width / 2;
            this.popup.y = height / 2 - this.popup.height / 2;

            return this
        }

        /**
         * Shows the modal (sets his alpha values to 1).
         *
         * @return {Modal} A reference to the modal for chaining.
         */
        show() {
            TweenLite.to(this, this.theme.fast, {
                alpha: 1,
                onStart: () => (this.visible = true)
            });

            return this
        }

        /**
         * Hides the modal (sets his alpha values to 0).
         *
         * @return {Modal} A reference to the modal for chaining.
         */
        hide() {
            TweenLite.to(this, this.theme.fast, {
                alpha: 0,
                onComplete: () => (this.visible = false)
            });

            return this
        }

        /**
         * Sets or gets the header. The getter always returns a PIXI.Text object. The setter can receive
         * a string or a PIXI.Text object.
         *
         * @member {string|PIXI.Text}
         */
        get header() {
            return this.popup.header
        }
        set header(value) {
            this.opts.header = value;
            this.background.destroy();
            this.popup.destroy();
            this.setup().layout();
        }

        /**
         * Sets or gets the content. The getter always returns an PIXI.DisplayObject. The setter can receive
         * a string or a PIXI.DisplayObject.
         *
         * @member {string|PIXI.DisplayObject}
         */
        get content() {
            return this.popup.content
        }
        set content(value) {
            this.opts.content = value;
            this.background.destroy();
            this.popup.destroy();
            this.setup().layout();
        }
    }

    /**
     * Class that represents a Message. A message pops up and disappears after a specific amount of time.
     *
     * @example
     * // Create the PixiJS App
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 900,
     *     height: 250
     * }).setup().run()
     *
     * // Create a button
     * let button = new Button({
     *     label: 'Click me',
     *     action: e => {
     *         const message = new Message({
     *             app: app,
     *             header: 'Header',
     *             content: 'Text.'
     *         })
     *         app.scene.addChild(message)
     *     }
     * })
     *
     * // Add the button to the scene
     * app.scene.addChild(button)
     *
     * @class
     * @extends InteractivePopup
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/message.html|DocTest}
     */
    class Message extends InteractivePopup {
        /**
         * Creates an instance of a Message.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the message.
         * @param {PIXIApp} [opts.app=window.app] - The PIXIApp where this message belongs to.
         * @param {boolean} [opts.closeButton=false] - Should a close button be displayed in the upper right corner?
         * @param {number} [opts.minWidth=280] - The minimum width of the message box. Automatically expands with the content.
         * @param {number} [opts.minHeight=100] - The minimum height of the message box. Automatically expands with the content.
         * @param {number} [opts.margin=Theme.margin] - The outer spacing of the message box.
         * @param {string} [opts.align=right] - The horizontal position of the message box relative to the app. Possible
         *     values are left, center, right.
         * @param {string} [opts.verticalAlign=top] - The vertical position of the message box relative to the app. Possible
         *     values are top, middle, bottom.
         * @param {number} [opts.duration=5] - The duration in seconds when the message box should disappear.
         * @param {boolean} [opts.autoClose=true] - Should the message box be closed automatically?
         * @param {number} [opts.closeDuration=Theme.fast] - The duration in seconds of the closing of the message box.
         */
        constructor(opts = {}) {
            const theme = Theme.fromString(opts.theme);

            opts = Object.assign(
                {},
                {
                    app: window.app,
                    closeButton: false,
                    minWidth: 280,
                    minHeight: 100,
                    margin: theme.margin,
                    align: 'right', // left, center, right
                    verticalAlign: 'top', // top, middle, bottom
                    duration: 5,
                    autoClose: true,
                    closeDuration: theme.fast
                },
                opts
            );

            super(opts);
        }

        /**
         * Relayouts the position of the message box.
         *
         * @return {Message} Returns the message box for chaining.
         */
        layout() {
            super.layout();

            // horizontal
            switch (this.opts.align) {
                case 'left':
                    this.x = this.opts.margin;
                    break
                case 'center':
                    this.x = this.opts.app.size.width / 2 - this.width / 2;
                    break
                case 'right':
                    this.x = this.opts.app.size.width - this.opts.margin - this.width;
                    break
            }

            // vertical
            switch (this.opts.verticalAlign) {
                case 'top':
                    this.y = this.opts.margin;
                    break
                case 'middle':
                    this.y = this.opts.app.size.height / 2 - this.height / 2;
                    break
                case 'bottom':
                    this.y = this.opts.app.size.height - this.opts.margin - this.height;
                    break
            }
        }

        /**
         * Shows the message box.
         *
         * @private
         */
        show() {
            super.show();

            if (this.opts.autoClose) {
                window.setTimeout(() => {
                    this.hide();
                }, this.opts.duration * 1000);
            }
        }
    }

    /* global apollo, subscriptions, gql */

    /**
     * A special InteractionManager for fullscreen apps, which may
     * go beyond the limits of WebGL drawing buffers. On Safari and Chrome
     * the drawing buffers are limited to 4096 in width (Safari) or 4096x4096
     * in total buffer size (Chrome). The original InteractionManager.mapPositionToPoint
     * does not work with these extreme sizes which mainly occur if large
     * retina displays (>= 4K) are used with devicePixelRatio > 1.
     *
     * @private
     * @class
     * @extends PIXI.interaction.InteractionManager
     * @see {@link http://pixijs.download/dev/docs/PIXI.interaction.InteractionManager.html|PIXI.interaction.InteractionManager}
     * @see {@link https://stackoverflow.com/questions/29710696/webgl-drawing-buffer-size-does-not-equal-canvas-size}
     */
    class FullscreenInteractionManager extends PIXI.interaction.InteractionManager {
        mapPositionToPoint(point, x, y) {
            let resolution = this.renderer.resolution;
            let extendWidth = 1.0;
            let extendHeight = 1.0;
            let dy = 0;
            let canvas = this.renderer.view;
            let context = canvas.getContext('webgl');
            if (context.drawingBufferWidth < canvas.width || context.drawingBufferHeight < canvas.height) {
                extendWidth = context.drawingBufferWidth / canvas.width;
                extendHeight = context.drawingBufferHeight / canvas.height;
                //dx = wantedWidth - context.drawingBufferWidth
                dy = (canvas.height - context.drawingBufferHeight) / resolution;
            }
            x *= extendWidth;
            y *= extendHeight;

            super.mapPositionToPoint(point, x, y + dy);
        }
    }

    /**
     * The class PixiApp extends the class PIXI.Application
     * by several functions and makes meaningful pre-assumptions.
     *
     * @example
     * // Create the app
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 450,
     *     height: 150,
     *     fpsLogging: true,
     *     theme: 'light',
     *     transparent: false
     * }).setup().run()
     *
     * @class
     * @extends PIXI.Application
     * @see {@link http://pixijs.download/dev/docs/PIXI.Application.html|PIXI.Application}
     */
    class PIXIApp extends PIXI.Application {
        /**
         * Creates an instance of a PixiApp.
         *
         * @constructor
         * @param {object} [opts={}] - An options object. The following options can be set:
         * @param {number} [opts.width] - The width of the renderer. If no set, the application will run in fullscreen.
         * @param {number} [opts.height] - The height of the renderer. If no set, the application will run in fullscreen.
         * @param {HTMLElement} [opts.view] - The canvas HTML element. If not set, a render-element is added inside the body.
         * @param {boolean} [opts.transparent=true] - Should the render view be transparent?
         * @param {boolean} [opts.antialias=true] - Sets antialias (only applicable in chrome at the moment).
         * @param {number} [opts.resolution=window.devicePixelRatio | 1] - The resolution / device pixel ratio of the renderer, retina would be 2.
         * @param {boolean} [opts.autoResize=true] - Should the canvas-element be resized automatically if the resolution was set?
         * @param {number} [opts.backgroundColor=0x282828] - The color of the background.
         * @param {string|Theme} [opts.theme=dark] - The name of the theme (dark, light, red) or a Theme object to use for styling.
         * @param {boolean} [opts.fpsLogging=false] - If set to true, the current frames per second are displayed in the upper left corner.
         * @param {object} [opts.progress={}] - Can be used to add options to the progress bar. See class Progress for more informations.
         * @param {boolean} [opts.forceCanvas=false] - Prevents selection of WebGL renderer, even if such is present.
         * @param {boolean} [opts.roundPixels=true] - Align PIXI.DisplayObject coordinates to screen resolution.
         * @param {boolean} [opts.monkeyPatchMapping=true] - Monkey patch for canvas fullscreen support on large displays.
         * @param {boolean} [opts.adaptive=true] - Adds Graphics adaptive calculation of quadratic curve and arc subdivision.
         */
        constructor({
            width = null,
            height = null,
            view = null,
            transparent = true,
            backgroundColor = 0x282828,
            theme = 'dark',
            antialias = true,
            resolution = window.devicePixelRatio || 1,
            autoResize = true,
            fpsLogging = false,
            progress = {},
            forceCanvas = false,
            roundPixels = true,
            monkeyPatchMapping = true,
            adaptive = true,
            graphql = false
        }) {
            const fullScreen = !width || !height;

            if (fullScreen) {
                width = window.innerWidth;
                height = window.innerHeight;
            }

            super({
                view,
                width,
                height,
                transparent,
                antialias,
                resolution,
                autoResize,
                backgroundColor,
                forceCanvas
            });

            this.width = width;
            this.height = height;
            this.theme = Theme.fromString(theme);
            this.fpsLogging = fpsLogging;
            this.progressOpts = progress;
            this.fullScreen = fullScreen;
            this.orient = null;
            this.originalMapPositionToPoint = null;
            this.monkeyPatchMapping = monkeyPatchMapping;
            if (parseInt(PIXI.VERSION) >= 5) {
                PIXI.settings.ROUND_PIXELS = roundPixels;
                PIXI.GRAPHICS_CURVES.adaptive = adaptive;
            } else {
                PIXI.Graphics.CURVES.adaptive = adaptive;
            }
            this.graphql = graphql;
            if (fullScreen || autoResize) {
                console.log('App is in fullScreen mode or autoResize mode');
                const resizeDebounced = debounce(event => this.resize(event), 50);
                window.addEventListener('resize', resizeDebounced);
                document.body.addEventListener('orientationchange', this.checkOrientation.bind(this));
            }
            if (monkeyPatchMapping) {
                console.log('Using monkey patched coordinate mapping');
                // Pluggin the specializtion does not work. Monkey patching does
                // this.renderer.plugins.interaction = new FullscreenInteractionManager(this.renderer)
                this.monkeyPatchPixiMapping();
            }
        }

        /**
         * Extra setup method to construct complex scenes, etc...
         * Overwrite this method if you need additonal views and components.
         *
         * @return {PIXIApp} A reference to the PIXIApp for chaining.
         */
        setup() {
            this.scene = this.sceneFactory();
            this.stage.addChild(this.scene);

            // fpsLogging
            if (this.fpsLogging) {
                this.addFpsDisplay();
            }

            // GraphQL
            if (this.graphql && typeof apollo !== 'undefined') {
                const networkInterface = apollo.createNetworkInterface({
                    uri: '/graphql'
                });

                const wsClient = new subscriptions.SubscriptionClient(`wss://${location.hostname}/subscriptions`, {
                    reconnect: true,
                    connectionParams: {}
                });

                const networkInterfaceWithSubscriptions = subscriptions.addGraphQLSubscriptions(networkInterface, wsClient);

                this.apolloClient = new apollo.ApolloClient({
                    networkInterface: networkInterfaceWithSubscriptions
                });
            }

            // progress
            this._progress = new Progress(
                Object.assign({ theme: this.theme }, this.progressOpts, {
                    app: this
                })
            );
            this._progress.visible = false;
            this.stage.addChild(this._progress);

            return this
        }

        /**
         * Tests whether the width is larger than the height of the application.
         *
         * @return {boolean} Returns true if app is in landscape mode.
         */
        orientation() {
            return this.width > this.height
        }

        /**
         * Checks orientation and adapts view size if necessary. Implements a
         * handler for the orientationchange event.
         *
         * @param {event=} - orientationchange event
         */
        checkOrientation(event) {
            var value = this.orientation();
            if (value != this.orient) {
                setTimeout(
                    100,
                    function () {
                        this.orientationChanged(true);
                    }.bind(this)
                );
                this.orient = value;
            }
        }

        /**
         * Called if checkOrientation detects an orientation change event.
         *
         * @param {boolean=} [force=false] - Called if checkOrientation detects an orientation change event.
         */
        orientationChanged(force = false) {
            if (this.expandRenderer() || force) {
                this.layout();
            }
        }

        /**
         * Called after a resize. Empty method but can be overwritten to
         * adapt their layout to the new app size.
         *
         * @param {number} [width] - The width of the app.
         * @param {number} [height] - The height of the app.
         */
        layout(width, height) { }

        /**
         * Draws the display tree of the app. Typically this can be delegated
         * to the layout method.
         *
         */
        draw() {
            this.layout(this.width, this.height);
        }

        /*
         * Run the application. Override this method with everything
         * that is needed to maintain your App, e.g. setup calls, main loops, etc.
         *
         */
        run() {
            return this
        }

        /*
         * Overwrite this factory method if your application needs a special
         * scene object.
         *
         * @returns {PIXI.Container} - A new PIXI Container for use as a scene.
         */
        sceneFactory() {
            return new PIXI.Container()
        }

        /**
         * Adds the display of the frames per second to the renderer in the upper left corner.
         *
         * @return {PIXIApp} - Returns the PIXIApp for chaining.
         */
        addFpsDisplay() {
            const fpsDisplay = new FpsDisplay(this);
            this.stage.addChild(fpsDisplay);

            return this
        }

        /**
         * Returns the size of the renderer as an object with the keys width and height.
         *
         * @readonly
         * @member {object}
         */
        get size() {
            return { width: this.width, height: this.height }
        }

        /**
         * Returns the center of the renderer as an object with the keys x and y.
         *
         * @readonly
         * @member {object}
         */
        get center() {
            return { x: this.width / 2, y: this.height / 2 }
        }

        /**
         * Resizes the renderer to fit into the window or given width and height.
         *
         * @param {object} [event] - The event.
         * @param {object=} [opts={}] - The event.
         * @param {number} [opts.width=window.innerWidth] - The width of the app to resize to.
         * @param {number} [opts.height=window.innerHeight] - The height of the app to resize to.
         * @return {PIXIApp} - Returns the PIXIApp for chaining.
         */
        resize(event, { width = window.innerWidth, height = window.innerHeight } = {}) {
            this.width = width;
            this.height = height;
            this.expandRenderer();
            this.layout(width, height);
            //console.log("App.resize", width, height, window.innerWidth, window.innerHeight )
            // if (this.scene) {
            // console.log("gl.drawingBufferWidth", this.renderer.view.getContext('webgl').drawingBufferWidth)
            // console.log("scene", this.scene.scale, this.renderer, this.renderer.autoResize, this.renderer.resolution)
            // }
            return this
        }

        /**
         * @todo Write the documentation.
         *
         * @private
         */
        monkeyPatchPixiMapping() {
            if (this.originalMapPositionToPoint === null) {
                let interactionManager = this.renderer.plugins.interaction;
                this.originalMapPositionToPoint = interactionManager.mapPositionToPoint;
                interactionManager.mapPositionToPoint = (point, x, y) => {
                    return this.fixedMapPositionToPoint(point, x, y)
                };
            }
        }

        /**
         * In some browsers the canvas is distorted if the screen resolution and
         * overall size of the canvas exceeds the internal limits (e.g. 4096 x 4096 pixels).
         * To compensate these distortions we need to fix the mapping to the actual
         * drawing buffer coordinates.
         * @private
         * @param {any} local
         * @param {number} x
         * @param {number} y
         * @return {} interactionManager.mapPositionToPoint
         */
        fixedMapPositionToPoint(local, x, y) {
            let resolution = this.renderer.resolution;
            let interactionManager = this.renderer.plugins.interaction;
            let extendWidth = 1.0;
            let extendHeight = 1.0;
            let dy = 0;
            let canvas = this.renderer.view;
            let context = canvas.getContext('webgl');

            if (
                context !== null &&
                (context.drawingBufferWidth < canvas.width || context.drawingBufferHeight < canvas.height)
            ) {
                extendWidth = context.drawingBufferWidth / canvas.width;
                extendHeight = context.drawingBufferHeight / canvas.height;
                //dx = wantedWidth - context.drawingBufferWidth
                dy = (canvas.height - context.drawingBufferHeight) / resolution;
            }
            x *= extendWidth;
            y *= extendHeight;
            return this.originalMapPositionToPoint.call(interactionManager, local, x, y + dy)
        }

        /**
         * Expand the renderer step-wise on resize.
         *
         * @param {number} [expand] - The amount of additional space for the renderer [px].
         * @return {boolean} true if the renderer was resized.
         */
        expandRenderer(expand = 256) {
            let renderer = this.renderer;
            let resolution = this.renderer.resolution;
            let ww = this.width;
            let hh = this.height;
            let sw = this.screen.width;
            let sh = this.screen.height;
            if (ww > sw || hh > sh) {
                //console.log('App.expandRenderer')
                renderer.resize(ww + expand, hh + expand);
                return true
            }

            renderer.resize(ww, hh);
            return false
        }

        /**
         * Set the loading progress of the application. If called for the first time, display the progress bar.
         *
         * @param {number} [value] - Should be a value between 0 and 100. If 100, the progress bar will disappear.
         * @return {PIXIApp|Progress} The PixiApp object for chaining or the Progress object when the method was
         *     called without a parameter.
         */
        progress(value) {
            if (typeof value === 'undefined') {
                return this._progress
            }

            this._progress.visible = true;
            this._progress.progress = value;

            return this
        }

        /**
         * Opens a new Modal object binded to this app.
         *
         * @param {object} [opts] - An options object for the Modal object.
         * @return {Modal} Returns the Modal object.
         */
        modal(opts = {}) {
            let modal = new Modal(Object.assign({ theme: this.theme }, opts, { app: this }));
            this.scene.addChild(modal);

            return modal
        }

        /**
         * Opens a new Message object binded to this app.
         *
         * @param {object} [opts] - An options object for the Message object.
         * @return {Message} Returns the Message object.
         */
        message(opts = {}) {
            let message = new Message(Object.assign({ theme: this.theme }, opts, { app: this }));
            this.scene.addChild(message);

            return message
        }

        /**
         * Loads sprites, e.g. images into the PIXI TextureCache.
         *
         * @param {string|string[]} resources - A String or an Array of urls to the images to load.
         * @param {function} [loaded] - A callback which is executed after all resources has been loaded.
         *     Receives one paramter, a Map of sprites where the key is the path of the image which was
         *     loaded and the value is the PIXI.Sprite object.
         * @param {object} [opts] - An options object for more specific parameters.
         * @param {boolean} [opts.resolutionDependent=true] - Should the sprites be loaded dependent of the
         *     renderer resolution?
         * @param {boolean} [opts.progress=false] - Should a progress bar display the loading status?
         * @return {PIXIApp} The PIXIApp object for chaining.
         */
        loadSprites(resources, loaded = null, { resolutionDependent = true, progress = false } = {}) {
            this.loadTextures(
                resources,
                textures => {
                    let sprites = new Map();

                    for (let [key, texture] of textures) {
                        sprites.set(key, new PIXI.Sprite(texture));
                    }

                    if (loaded) {
                        loaded.call(this, sprites);
                    }
                },
                { resolutionDependent, progress }
            );

            return this
        }

        /**
         * Loads textures, e.g. images into the PIXI TextureCache.
         *
         * @param {string|string[]} resources - A String or an Array of urls to the images to load.
         * @param {function} [loaded] - A callback which is executed after all resources has been loaded.
         *     Receives one paramter, a Map of textures where the key is the path of the image which was
         *     loaded and the value is the PIXI.Texture object.
         * @param {object} [opts] - An options object for more specific parameters.
         * @param {boolean} [opts.resolutionDependent=true] - Should the textures be loaded dependent of the
         *     renderer resolution?
         * @param {boolean} [opts.progress=false] - Should a progress bar display the loading status?
         * @return {PIXIApp} The PIXIApp object for chaining.
         */
        loadTextures(resources, loaded = null, { resolutionDependent = true, progress = false } = {}) {
            if (!Array.isArray(resources)) {
                resources = [resources];
            }

            const loader = this.loader;

            for (let resource of resources) {
                if (!loader.resources[resource]) {
                    if (resolutionDependent) {
                        let resolution = Math.round(this.renderer.resolution);
                        switch (resolution) {
                            case 2:
                                loader.add(resource, resource.replace(/\.([^.]*)$/, '@2x.$1'));
                                break
                            case 3:
                                loader.add(resource, resource.replace(/\.([^.]*)$/, '@3x.$1'));
                                break
                            default:
                                loader.add(resource);
                                break
                        }
                    } else {
                        loader.add(resource);
                    }
                }
            }

            if (progress) {
                loader.on('progress', e => {
                    this.progress(e.progress);
                });
            }

            loader.load((loader, resources) => {
                const textures = new Map();

                for (let key in resources) {
                    textures.set(key, resources[key].texture);
                }

                if (loaded) {
                    loaded.call(this, textures);
                }
            });

            return this
        }

        /**
         * Queries the GraphQL endpoint.
         *
         * @param {string} [query] - The GraphQL query string.
         * @param {object} [opts={}] - An options object. The following options can be set:
         *     http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.query
         * @return {Promise} Returns a Promise which is either resolved with the resulting data or
         *     rejected with an error.
         */
        query(query, opts = {}) {
            if (typeof query === 'string') {
                opts = Object.assign({}, opts, { query });
            } else {
                opts = Object.assign({}, query);
            }

            opts.query = opts.query.trim();

            if (!opts.query.startsWith('query')) {
                if (opts.query.startsWith('{')) {
                    opts.query = `query ${opts.query}`;
                } else {
                    opts.query = `query {${opts.query}}`;
                }
            }

            opts.query = gql(opts.query);

            return this.apolloClient.query(opts)
        }

        /**
         * Mutate the GraphQL endpoint.
         *
         * @param {string} [mutation] - The GraphQL mutation string.
         * @param {object} [opts={}] - An options object. The following options can be set:
         *     http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.mutate
         * @return {Promise} Returns a Promise which is either resolved with the resulting data or
         *     rejected with an error.
         */
        mutate(mutation, opts = {}) {
            if (typeof mutation === 'string') {
                opts = Object.assign({}, opts, { mutation });
            } else {
                opts = Object.assign({}, mutation);
            }

            opts.mutation = opts.mutation.trim();

            if (!opts.mutation.startsWith('mutation')) {
                if (opts.mutation.startsWith('{')) {
                    opts.mutation = `mutation ${opts.mutation}`;
                } else {
                    opts.mutation = `mutation {${opts.mutation}}`;
                }
            }

            opts.mutation = gql(opts.mutation);

            return this.apolloClient.mutate(opts)
        }

        /**
         * Subscribe the GraphQL endpoint.
         *
         * @param {string} [subscription] - The GraphQL subscription.
         * @param {object} [opts={}] - An options object. The following options can be set:
         *     http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.query
         * @return {Promise} Returns a Promise which is either resolved with the resulting data or
         *     rejected with an error.
         */
        subscribe(subscription, opts = {}) {
            if (typeof subscription === 'string') {
                opts = Object.assign({}, opts, { subscription });
            } else {
                opts = Object.assign({}, subscription);
            }

            opts.subscription = opts.subscription.trim();

            if (!opts.subscription.startsWith('subscription')) {
                if (opts.subscription.startsWith('{')) {
                    opts.subscription = `subscription ${opts.subscription}`;
                } else {
                    opts.subscription = `subscription {${opts.subscription}}`;
                }
            }

            opts.query = gql(opts.subscription);

            delete opts.subscription;

            return this.apolloClient.subscribe(opts)
        }

        /**
         * Supports the page as a global coordinate system and converts browser page coordinates
         * to local DisplayObject coordinates.
         *
         * @param {DisplayObject} displayObject - The PIXI displayObject.
         * @param {number} x - The x coordinate.
         * @param {number} y - The y coordinate.
         *
         * @return {PIXI.Point} Returns a PIXI.Point.
         */

        convertPointFromPageToNode(displayObject, x, y) {
            let resolution = this.renderer.resolution;
            console.log('resolution', resolution);
            let pixiGlobal = window.convertPointFromPageToNode(app.view, x, y);
            pixiGlobal.x /= resolution;
            pixiGlobal.y /= resolution;
            return displayObject.toLocal(new PIXI.Point(pixiGlobal.x, pixiGlobal.y))
        }

        /**
         * Supports the page as a global coordinate system and converts local DisplayObject coordinates
         * to browser page coordinates.
         *
         * @param {DisplayObject} displayObject - The PIXI displayObject.
         * @param {number} x - The x coordinate.
         * @param {number} y - The y coordinate.
         *
         * @return {Point} Returns a DOM Point.
         */

        convertPointFromNodeToPage(displayObject, x, y) {
            let resolution = this.renderer.resolution;
            let pixiGlobal = displayObject.toGlobal(new PIXI.Point(x, y));
            pixiGlobal.x *= resolution;
            pixiGlobal.y *= resolution;
            // console.log("app.convertPointFromNodeToPage", pixiGlobal)
            return window.convertPointFromNodeToPage(app.view, pixiGlobal.x, pixiGlobal.y)
        }
    }

    /**
     * The class fpsdisplay shows in the upper left corner
     * of the renderer the current image refresh rate.
     *
     * @private
     * @class
     * @extends PIXI.Graphics
     * @see {@link http://pixijs.download/dev/docs/PIXI.Graphics.html|PIXI.Graphics}
     */
    class FpsDisplay extends PIXI.Graphics {
        /**
         * Creates an instance of a FpsDisplay.
         *
         * @constructor
         * @param {PIXIApp} app - The PIXIApp where the frames per second should be displayed.
         */
        constructor(app) {
            super();

            this.app = app;

            this.lineStyle(3, 0x434f4f, 1)
                .beginFill(0x434f4f, 0.6)
                .drawRoundedRect(0, 0, 68, 32, 5)
                .endFill()
                .position.set(20, 20);

            this.text = new PIXI.Text(
                this.fps,
                new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: 'bold',
                    fill: '#f6f6f6',
                    stroke: '#434f4f',
                    strokeThickness: 3
                })
            );
            this.text.position.set(6, 6);

            this.addChild(this.text);

            this.refreshFps();

            window.setInterval(this.refreshFps.bind(this), 1000);
        }

        /**
         * Refreshes fps numer.
         *
         * @return {PIXIApp} Returns the PIXIApp object for chaining.
         */
        refreshFps() {
            this.text.text = `${this.app.ticker.FPS.toFixed(1)} fps`;

            return this
        }
    }

    /**
     * A Gaussian blur filter. With this filter, you can blur an area of a PIXI.DisplayObject. This cannot
     * be done with the PIXI.filters.BlurFilter (when you use the PIXI.filters.BlurFilter with
     * an filter area, all pixels outside of the area are not displayed). Attention: The area of
     * the filter is always in global scope, NOT relative to the PIXI.DisplayObject the filter
     * is assigned to!
     *
     * @example
     * // Create the app
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 480,
     *     height: 270,
     *     transparent: false
     * }).setup().run()
     *
     * // Add a video sprite
     * const sprite = new PIXI.Sprite(PIXI.Texture.from("assets/blurfilter.mp4"))
     * sprite.width = app.size.width
     * sprite.height = app.size.height
     * app.scene.addChild(sprite)
     *
     * // Create the filter and assign it to the scene
     * const blurFilter = new BlurFilter(new PIXI.Rectangle(20, 20, 80, 60))
     * app.scene.filters = [blurFilter]
     *
     * @class
     * @extends PIXI.Filter
     * @param {PIXI.Rectangle|PIXI.Circle|PIXI.DisplayObject} shape The area where the blur effect should be applied to. Relative to the
     *     canvas, NOT relative to the PIXI.DisplayObject where the blur effect is assigned to!
     * @param {number} [blur=50] The strength of the blur.
     */
    class BlurFilter extends PIXI.Filter {
        constructor(shape, blur = 50) {
            super();

            const normalized = this.normalize(shape);

            this.tiltShiftXFilter = new TiltShiftXFilter(normalized, blur);
            this.tiltShiftYFilter = new TiltShiftYFilter(normalized, blur);
        }

        apply(filterManager, input, output) {
            let renderTarget = filterManager.getFilterTexture();
            this.tiltShiftXFilter.apply(filterManager, input, renderTarget);
            this.tiltShiftYFilter.apply(filterManager, renderTarget, output);
            filterManager.returnFilterTexture(renderTarget);

            // let renderTarget = filterManager.getRenderTarget(true)
            // this.tiltShiftXFilter.apply(filterManager, input, renderTarget)
            // this.tiltShiftYFilter.apply(filterManager, renderTarget, output)
            // filterManager.returnRenderTarget(renderTarget)
        }

        /**
         * The strength of the blur.
         *
         * @member {number}
         */
        get blur() {
            return this.tiltShiftXFilter.blur
        }
        set blur(value) {
            this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = value;
        }

        /**
         * The blur shape.
         *
         * @member {PIXI.Rectangle|PIXI.Circle|PIXI.DisplayObject}
         */
        get shape() {
            return this.tiltShiftXFilter.shape
        }
        set shape(value) {
            this.tiltShiftXFilter.shape = this.tiltShiftYFilter.shape = this.normalize(value);
        }

        /**
         *
         * @private
         * @param {PIXI.Rectangle|PIXI.Circle|PIXI.DisplayObject} value
         * @returns {Object}
         */
        normalize(value) {
            let shape = null;

            if (value instanceof PIXI.Circle) {
                shape = { type: 'circle', x: value.x, y: value.y, r: value.radius };
            } else if (value instanceof PIXI.Rectangle) {
                shape = {
                    type: 'rectangle',
                    x: value.x,
                    y: value.y,
                    width: value.width,
                    height: value.height
                };
            } else {
                const bounds = value.getBounds();
                shape = {
                    type: 'rectangle',
                    x: bounds.x,
                    y: bounds.y,
                    width: bounds.width,
                    height: bounds.height
                };
            }

            return shape
        }
    }

    /**
     * A TiltShiftAxisFilter.
     *
     * @class
     * @extends PIXI.Filter
     * @abstract
     * @private
     */
    class TiltShiftAxisFilter extends PIXI.Filter {
        constructor(shape, blur) {
            const vertex = `
            attribute vec2 aVertexPosition;
            attribute vec2 aTextureCoord;

            uniform mat3 projectionMatrix;

            varying vec2 vVertexPosition;
            varying vec2 vTextureCoord;

            void main(void) {
                vVertexPosition = aVertexPosition;
                vTextureCoord = aTextureCoord;
                gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
            }
        `;

            const fragment = `

            varying vec2 vVertexPosition;
            varying vec2 vTextureCoord;

            uniform sampler2D uSampler;
            
            uniform int shape;
            uniform vec4 rectangle;
            uniform vec3 circle;
            uniform float blur;
            uniform vec2 delta;
            uniform vec2 texSize;

            float random(vec3 scale, float seed) {
                return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
            }

            void main(void) {
                bool inside = false;

                if (shape == 1) {
                    inside = distance(vVertexPosition, circle.xy) <= circle.z;
                } else if (shape == 2) {
                    inside = vVertexPosition.x >= rectangle.x && vVertexPosition.x <= rectangle.z && vVertexPosition.y >= rectangle.y && vVertexPosition.y <= rectangle.w;
                }

                if (inside) {
                    vec4 color = vec4(0.0);
                    float total = 0.0;

                    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);

                    for (float t = -30.0; t <= 30.0; t++) {
                        float percent = (t + offset - 0.5) / 30.0;
                        float weight = 1.0 - abs(percent);
                        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * blur);
                        sample.rgb *= sample.a;
                        color += sample * weight;
                        total += weight;
                    }

                    gl_FragColor = color / total;
                    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;
                } else {
                    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
                }
            }
        `;

            super(vertex, fragment);

            if (shape.type === 'circle') {
                this.uniforms.shape = 1;
                this.uniforms.circle = [shape.x, shape.y, shape.r];
            } else {
                this.uniforms.shape = 2;
                this.uniforms.rectangle = [shape.x, shape.y, shape.x + shape.width, shape.y + shape.height];
            }
            this.uniforms.blur = blur;
            this.uniforms.delta = new PIXI.Point(0, 0);
            this.uniforms.texSize = new PIXI.Point(480, 270);

            this.updateDelta();
        }

        /**
         * The strength of the blur.
         *
         * @member {number}
         * @memberof PIXI.filters.TiltShiftAxisFilter#
         */
        get blur() {
            return this.uniforms.blur
        }
        set blur(value) {
            this.uniforms.blur = value;
        }

        /**
         * The blur shape.
         *
         * @member {PIXI.Rectangle}
         * @memberof PIXI.filters.TiltShiftAxisFilter#
         */
        get shape() {
            if (this.uniforms.shape === 1) {
                const circle = this.uniforms.circle;
                return new PIXI.Circle(circle[0], circle[1], circle[2])
            } else {
                const rectangle = this.uniforms.rectangle;
                return new PIXI.Rectangle(rectangle[0], rectangle[1], rectangle[2], rectangle[3])
            }
        }
        set shape(value) {
            if (value.type === 'circle') {
                this.uniforms.shape = 1;
                this.uniforms.circle = [value.x, value.y, value.r];
            } else {
                this.uniforms.shape = 2;
                this.uniforms.rectangle = [value.x, value.y, value.x + value.width, value.y + value.height];
            }
        }
    }

    /**
     * A TiltShiftXFilter.
     *
     * @class
     * @extends PIXI.TiltShiftAxisFilter
     * @private
     */
    class TiltShiftXFilter extends TiltShiftAxisFilter {
        /**
         * Updates the filter delta values.
         */
        updateDelta() {
            this.uniforms.delta.x = 0.1;
            this.uniforms.delta.y = 0;
        }
    }

    /**
     * A TiltShiftYFilter.
     *
     * @class
     * @extends PIXI.TiltShiftAxisFilter
     * @private
     */
    class TiltShiftYFilter extends TiltShiftAxisFilter {
        /**
         * Updates the filter delta values.
         */
        updateDelta() {
            this.uniforms.delta.x = 0;
            this.uniforms.delta.y = 0.1;
        }
    }

    // In order to test this interface implementation run jsc interface.js

    class Interface {
        // Abstract interface that should be extended in interface subclasses.
        // By convention all interfaces should start with an upper 'I'

        static implementationError(klass) {
            let interfaceKeys = Reflect.ownKeys(this.prototype);
            let classKeys = Reflect.ownKeys(klass.prototype);
            for (let key of interfaceKeys) {
                let interfaceDesc = this.prototype[key];
                let classDesc = klass.prototype[key];
                if (typeof classDesc == 'undefined') return 'Missing ' + key
            }
            return null
        }

        static implementedBy(klass) {
            // In the first step only checks whether the methods of this
            // interface are all implemented by the given class
            let error = this.implementationError(klass);
            return error == null
        }

        // TODO: Specify optional methods
        //     static optionalMethods() {
        //         return [this.onMouseWheel]
        //     }
    }

    /* eslint-disable no-undef */
    /* eslint-disable no-console */
    /* eslint-disable no-unused-vars */
    let ipc = null;
    let logMessages = new Set();
    let logHandlers = {
        log: console.log,
        warn: console.warn,
        error: console.error
    };

    try {
        ipc = require('electron').ipcRenderer;
        logHandlers.log = message => ipc.send('log', message);
        logHandlers.warn = message => ipc.send('warn', message);
        logHandlers.error = message => ipc.send('error', message);
    } catch (e) {
        console.log('Cannot use electron logging.');
    }

    /** Basic class for app specific logging requirements.
     * Can be used to implement persistent logging in electron apps.
     * Uses a logMessage cache to prevent error overflows. This is
     * needed since errors may occur very frequently
     * (e.g. display update loops at 60fps, programmatic loops, ...).
     *
     * The logging handlers can be overwritten by calling the static
     * setup method.
     */
    class Logging$1 {
        /** Static log function.
         * @param {*} message
         */
        static log(message) {
            logHandlers.log(message);
        }

        /**
         * Static warn function.
         * Emits each warning only once per session.
         * @param {*} message
         */
        static warn(message) {
            if (!logMessages.has(message)) {
                logMessages.add(message);
                logHandlers.warn(message);
            }
        }

        /**
         * Static error function.
         * Emits each error message only once per session.
         * @param {*} message
         */
        static error(message) {
            if (!logMessages.has(message)) {
                logMessages.add(message);
                logHandlers.error(message);
            }
        }

        static setup({ log = console.log, warn = console.warn, error = console.error } = {}) {
            logHandlers.log = log;
            logHandlers.warn = warn;
            logHandlers.error = error;
        }
    }

    /* eslint-disable no-unused-vars */

    /** Interaction patterns

        See interaction.html for explanation
    */

    class IInteractionTarget extends Interface {
        capture(event) {
            return typeof true
        }

        onStart(event, interaction) { }
        onMove(event, interaction) { }
        onEnd(event, interaction) { }

        onMouseWheel(event) { }
    }

    class IInteractionMapperTarget extends Interface {
        capture(event) {
            return typeof true
        }

        findTarget(event, local, global) {
            return IInteractionTarget
        }
    }

    class PointMap extends MapProxy {
        // Collects touch points, mouse coordinates, etc. as key value pairs.
        // Keys are pointer and touch ids, the special "mouse" key.
        // Values are points, i.e. all objects with numeric x and y properties.
        constructor(points = {}) {
            super();
            for (let key in points) {
                this.set(key, points[key]);
            }
        }

        toString() {
            let points = [];
            for (let key of this.keys()) {
                let value = this.get(key);
                points.push(`${key}:{x:${value.x}, y:${value.y}}`);
            }
            let attrs = points.join(', ');
            return `[PointMap ${attrs}]`
        }

        clone() {
            let result = new PointMap();
            for (let key of this.keys()) {
                let value = this.get(key);
                result.set(key, { x: value.x, y: value.y });
            }
            return result
        }

        keyOf(value) {
            for (let key of this.keys()) {
                let p = this.get(key);
                if (p.x == value.x && p.y == value.y) {
                    return key
                }
            }
            return null
        }

        firstKey() {
            for (let key of this.keys()) {
                return key
            }
            return null
        }

        first() {
            for (let key of this.keys()) {
                return this.get(key)
            }
            return null
        }

        farthests() {
            if (this.size == 0) {
                return null
            }
            let pairs = [];
            for (let key of this.keys()) {
                let p = this.get(key);
                p.key = key;
                for (let k of this.keys()) {
                    let q = this.get(k);
                    q.key = k;
                    pairs.push([p, q]);
                }
            }
            let sorted = pairs.sort((a, b) => {
                return Points.distance(b[0], b[1]) - Points.distance(a[0], a[1])
            });
            return sorted[0]
        }

        mean() {
            if (this.size == 0) {
                return null
            }
            let x = 0.0,
                y = 0.0;
            for (let p of this.values()) {
                x += p.x;
                y += p.y;
            }
            return { x: x / this.size, y: y / this.size }
        }
    }

    class InteractionDelta {
        /**
         *Creates an instance of InteractionDelta.
         * @param {*} x
         * @param {*} y
         * @param {*} zoom
         * @param {*} rotate
         * @param {*} about
         * @param {*} number - number of involved pointer
         * @param {*} distance - distance of farthests touch points
         * @memberof InteractionDelta
         */
        constructor(x, y, zoom, rotate, about, number, distance) {
            this.x = x;
            this.y = y;
            this.zoom = zoom;
            this.rotate = rotate;
            this.about = about;
            this.number = number;
            this.distance = distance;
        }

        toString() {
            let values = [];
            for (let key of Object.keys(this)) {
                let value = this[key];
                if (key == 'about') {
                    values.push(`${key}:{x:${value.x}, y:${value.y}}`);
                } else {
                    values.push(`${key}:${value}`);
                }
            }
            let attrs = values.join(', ');
            return `[InteractionDelta ${attrs}]`
        }
    }

    class InteractionPoints {
        constructor(parent = null) {
            this.parent = parent;
            this.current = new PointMap();
            this.previous = new PointMap();
            this.start = new PointMap();
            this.ended = new PointMap();
            this.timestamps = new Map();
        }

        moved(key) {
            let current = this.current.get(key);
            let previous = this.previous.get(key);
            return Points.subtract(current, previous)
        }

        move() {
            let current = this.current.mean();
            let previous = this.previous.mean();
            return Points.subtract(current, previous)
        }

        /**
         * Computes the delta between previous and current angles. Corrects
         * value that are larger than 45Â°
         * @param {*} a
         * @param {*} b
         * @returns delta
         */
        diffAngle(a, b) {
            let alpha = Math.atan2(Math.sin(a - b), Math.cos(a - b));
            if (Math.abs(alpha) > Math.PI / 4) {
                alpha -= Math.PI;
            }
            return alpha
        }

        /**
         * Computes the delta between interaction points at t and t+1.
         *
         * @returns InteractionDelta
         * @memberof InteractionPoints
         */
        delta() {
            let prev = [];
            let curr = [];
            let cm = { x: 0, y: 0 };
            let pm = { x: 0, y: 0 };
            let count = 0;
            for (let key of this.current.keys()) {
                if (this.previous.has(key)) {
                    let p = this.previous.get(key);
                    let c = this.current.get(key);
                    pm = Points.add(pm, p);
                    cm = Points.add(cm, c);
                    prev.push(p);
                    curr.push(c);
                    count += 1;
                }
            }
            if (count > 0) {
                pm = Points.multiplyScalar(pm, 1 / count);
                cm = Points.multiplyScalar(cm, 1 / count);
                let delta = Points.subtract(cm, pm);
                let scale = 0;
                let scaled = 0;
                let alpha = 0;
                let zoom = 1;
                for (let i = 0; i < count; i++) {
                    let p = prev[i];
                    let c = curr[i];
                    let previousAngle = Points.angle(p, pm);
                    let currentAngle = Points.angle(c, cm);
                    let diff = this.diffAngle(currentAngle, previousAngle);
                    alpha += diff;

                    let distance1 = Points.distance(p, pm);
                    let distance2 = Points.distance(c, cm);
                    if (distance1 != 0 && distance2 != 0) {
                        scale += distance2 / distance1;
                        scaled += 1;
                    }
                }
                if (scaled > 0) {
                    zoom = scale / scaled;
                }
                alpha /= count;

                let current = this.current.farthests();

                let c1 = current[0];
                let c2 = current[1];
                let distance2 = Points.distance(c1, c2);

                return new InteractionDelta(delta.x, delta.y, zoom, alpha, cm, count, distance2)
            } else {
                return null
            }
        }

        /**
         * Computes the delta between interaction points at t and t+1.
         *
         * @returns InteractionDelta
         * @memberof InteractionPoints
         */
        deltaByTwoFarthestsPoints() {
            let csize = this.current.size;
            let psize = this.previous.size;
            if (csize >= 2 && csize == psize) {
                // Reduce to the two farthests points
                let current = this.current.farthests();

                let c1 = current[0];
                let c2 = current[1];

                let p1 = this.previous.get(c1.key);
                let p2 = this.previous.get(c2.key);

                let d1 = Points.subtract(c1, p1);
                let d2 = Points.subtract(c2, p2);
                let cm = Points.mean(c1, c2);

                // Using the mean leads to jumps between time slices with 3 and 2 fingers
                // We use the mean of deltas instead
                let delta = Points.mean(d1, d2);
                let zoom = 1.0;
                let distance1 = Points.distance(p1, p2);
                let distance2 = Points.distance(c1, c2);
                if (distance1 != 0 && distance2 != 0) {
                    zoom = distance2 / distance1;
                }
                let currentAngle = Points.angle(c1, c2);
                let previousAngle = Points.angle(p1, p2);
                let alpha = this.diffAngle(currentAngle, previousAngle);
                return new InteractionDelta(delta.x, delta.y, zoom, alpha, cm, csize, distance2)
            } else if (csize == 1 && psize == 1 && this.current.firstKey() == this.previous.firstKey()) {
                // We need to ensure that the keys are the same, since single points with different keys
                // can jump
                let current = this.current.first();
                let previous = this.previous.first();
                let delta = Points.subtract(current, previous);
                return new InteractionDelta(delta.x, delta.y, 1.0, 0.0, current, csize)
            }
            return null
        }

        started(key, point) {
            this.current.set(key, point);
            this.start.set(key, point);
            this.previous.set(key, point);
            this.timestamps.set(key, performance.now());
        }

        update(key, point) {
            // Returns true iff the key is new
            this.current.set(key, point);
            if (!this.start.has(key)) {
                this.start.set(key, point);
                this.previous.set(key, point);
                this.timestamps.set(key, performance.now());
                return true
            }
            return false
        }

        updatePrevious() {
            for (let key of this.current.keys()) {
                this.previous.set(key, this.current.get(key));
            }
        }

        stop(key, point) {
            if (this.current.has(key)) {
                this.current.delete(key);
                this.previous.delete(key);
                this.ended.set(key, point);
            }
        }

        finish(key, point) {
            this.current.delete(key);
            this.previous.delete(key);
            this.start.delete(key);
            this.timestamps.delete(key);
            this.ended.delete(key);
        }

        isFinished() {
            return this.current.size == 0
        }

        isNoLongerTwoFinger() {
            return this.previous.size > 1 && this.current.size < 2
        }

        isTap(key) {
            return this.parent.isTap(key)
        }

        isDoubleTap(key) {
            return this.parent.isDoubleTap(key)
        }

        isLongPress(key) {
            return this.parent.isLongPress(key)
        }
    }

    class Interaction extends InteractionPoints {
        constructor(tapDistance = 10, tapDuration = 250.0, longPressTime = 500.0) {
            super();
            this.tapDistance = tapDistance;
            this.tapCounts = new Map();
            this.tapPositions = new Map();
            this.tapTimestamps = new Map();
            this.tapDuration = tapDuration;
            this.longPressTime = longPressTime;
            this.targets = new Map();
            this.subInteractions = new Map(); // target:Object : InteractionPoints
        }

        stop(key, point) {
            super.stop(key, point);
            for (let points of this.subInteractions.values()) {
                points.stop(key, point);
            }
        }

        addTarget(key, target) {
            this.targets.set(key, target);
            this.subInteractions.set(target, new InteractionPoints(this));
        }

        removeTarget(key) {
            let target = this.targets.get(key);
            this.targets.delete(key);
            // Only remove target if no keys are refering to the target
            let remove = true;
            for (let t of this.targets.values()) {
                if (target === t) {
                    remove = false;
                }
            }
            if (remove) {
                this.subInteractions.delete(target);
            }
        }

        finish(key, point) {
            super.finish(key, point);
            this.removeTarget(key);
        }

        mapInteraction(points, aspects, mappingFunc) {
            // Map centrally registered points to target interactions
            // Returns an array of [target, updated subInteraction] pairs
            let result = new Map();
            for (let key in points) {
                if (this.targets.has(key)) {
                    let target = this.targets.get(key);
                    if (this.subInteractions.has(target)) {
                        let interaction = this.subInteractions.get(target);
                        for (let aspect of aspects) {
                            let pointMap = this[aspect];
                            let point = pointMap.get(key);
                            let mapped = mappingFunc(point, target);
                            interaction[aspect].set(key, mapped);
                        }
                        result.set(target, interaction);
                    }
                }
            }
            return result
        }

        registerTap(key, point) {
            if (this.tapCounts.has(key)) {
                let count = this.tapCounts.get(key);
                this.tapCounts.set(key, count + 1);
            } else {
                this.tapCounts.set(key, 1);
            }
            this.tapPositions.set(key, point);
            this.tapTimestamps.set(key, performance.now());
        }

        unregisterTap(key) {
            this.tapCounts.delete(key);
            this.tapPositions.delete(key);
            this.tapTimestamps.delete(key);
        }

        isTap(key) {
            let ended = this.ended.get(key);
            let start = this.start.get(key);
            if (start && ended && Points.distance(ended, start) < this.tapDistance) {
                let t1 = this.timestamps.get(key);
                let tookLong = performance.now() > t1 + this.longPressTime;
                if (tookLong) {
                    return false
                }
                return true
            }
            return false
        }

        isDoubleTap(key) {
            let ended = this.ended.get(key);
            if (this.tapCounts.has(key) && this.tapCounts.get(key) > 2) {
                this.unregisterTap(key);
            }
            if (this.tapPositions.has(key)) {
                let pos = this.tapPositions.get(key);
                if (Points.distance(ended, pos) > this.tapDistance) {
                    this.unregisterTap(key);
                }
            }
            if (this.tapTimestamps.has(key) && performance.now() > this.tapTimestamps.get(key) + this.tapDuration) {
                //console.log("tap too long")
                this.unregisterTap(key);
            }
            let result = false;
            if (this.isTap(key)) {
                this.registerTap(key, ended);
                result = this.tapCounts.get(key) == 2;
            } else {
                this.unregisterTap(key);
            }
            //console.log("isDoubleTap", this.tapCounts.get(key), result)
            return result
        }

        isAnyTap() {
            for (let key of this.ended.keys()) {
                if (this.isTap(key)) return true
            }
            return false
        }

        isLongPress(key) {
            let ended = this.ended.get(key);
            let start = this.start.get(key);
            if (start && ended && Points.distance(ended, start) < this.tapDistance) {
                let t1 = this.timestamps.get(key);
                let tookLong = performance.now() > t1 + this.longPressTime;
                if (tookLong) {
                    return true
                }
                return false
            }
            return false
        }

        isAnyLongPress() {
            for (let key of this.ended.keys()) {
                if (this.isLongPress(key)) return true
            }
            return false
        }

        isStylus(key) {
            return key === 'stylus'
        }
    }

    /**
     * This class implements the main delegate functionality: All necessary event handlers are registered for the
     * given element. Uses PointerEvents if available or TouchEvents on iOS. The fallback is on mouse events.
     * Collects the events if the interaction target captures the start event (i.e. declares that
     * the target wants the start event as well as all following move and end evcents.)
     *
     * @export
     * @class InteractionDelegate
     */
    class InteractionDelegate {
        // Long press: http://stackoverflow.com/questions/1930895/how-long-is-the-event-onlongpress-in-the-android
        // Stylus support: https://w3c.github.io/touch-events/

        /**
         * Creates an instance of InteractionDelegate.
         * @param {any} element
         * @param {any} target
         * @param {any} [{ mouseWheelElement = null, useCapture = true, capturePointerEvents = true, debug = false }={}]
         * @memberof InteractionDelegate
         */
        constructor(
            element,
            target,
            {
                mouseWheelElement = null,
                useCapture = true,
                capturePointerEvents = true,
                cancelOnWindowOut = true,
                debug = false
            } = {}
        ) {
            this.debug = debug;
            this.interaction = new Interaction();
            this.element = element;
            this.mouseWheelElement = mouseWheelElement || element;
            this.target = target;
            this.useCapture = useCapture;
            this.capturePointerEvents = capturePointerEvents;
            this.cancelOnWindowOut = cancelOnWindowOut;
            this.setupInteraction();
        }

        setupInteraction() {
            if (this.debug) {
                let error = this.targetInterface.implementationError(this.target.constructor);
                if (error != null) {
                    throw new Error('Expected IInteractionTarget: ' + error)
                }
            }
            this.setupTouchInteraction();
            this.setupMouseWheelInteraction();
        }

        get targetInterface() {
            return IInteractionTarget
        }

        setupTouchInteraction() {
            let element = this.element;
            let useCapture = this.useCapture;
            if (window.PointerEvent) {
                if (this.debug) console.log('Pointer API' + window.PointerEvent);
                element.addEventListener(
                    'pointerdown',
                    e => {
                        if (this.debug) console.log('pointerdown', e.pointerId);
                        if (this.capture(e)) {
                            if (this.capturePointerEvents) {
                                try {
                                    element.setPointerCapture(e.pointerId);
                                } catch (e) {
                                    console.warn('Cannot setPointerCapture');
                                }
                            }
                            this.onStart(e);
                        }
                    },
                    useCapture
                );
                element.addEventListener(
                    'pointermove',
                    e => {
                        if (this.debug) console.log('pointermove', e.pointerId, e.pointerType);

                        if (e.pointerType == 'touch' || (e.pointerType == 'mouse' && Events$1.isPointerDown(e))) {
                            // this.capture(e) &&
                            if (this.debug) console.log('pointermove captured', e.pointerId);
                            this.onMove(e);
                        }
                    },
                    useCapture
                );
                element.addEventListener(
                    'pointerup',
                    e => {
                        if (this.debug) console.log('pointerup', e.pointerId, e.pointerType);
                        this.onEnd(e);
                        if (this.capturePointerEvents) {
                            try {
                                element.releasePointerCapture(e.pointerId);
                            } catch (e) {
                                console.warn('Cannot release pointer');
                            }
                        }
                    },
                    useCapture
                );
                element.addEventListener(
                    'pointercancel',
                    e => {
                        if (this.debug) console.log('pointercancel', e.pointerId, e.pointerType);
                        this.onEnd(e);
                        if (this.capturePointerEvents) element.releasePointerCapture(e.pointerId);
                    },
                    useCapture
                );

                if (!this.capturePointerEvents) {
                    element.addEventListener(
                        'pointerleave',
                        e => {
                            if (this.debug) console.log('pointerleave', e.pointerId, e.pointerType);
                            if (e.target == element) this.onEnd(e);
                        },
                        useCapture
                    );
                }

                if (!this.capturePointerEvents) {
                    element.addEventListener(
                        'pointerout',
                        e => {
                            if (this.debug) console.log('pointerout', e.pointerId, e.pointerType);
                            if (e.target == element) this.onEnd(e);
                        },
                        useCapture
                    );
                }

                if (this.cancelOnWindowOut) {
                    window.addEventListener(
                        'pointerout',
                        e => {
                            if (this.debug) console.log('pointerout', e.pointerId, e.pointerType, e.target);
                            if (e.target == element) {
                                this.onEnd(e);
                            }
                        },
                        useCapture
                    );
                }
            } else if (window.TouchEvent) {
                if (this.debug) console.log('Touch API');
                element.addEventListener(
                    'touchstart',
                    e => {
                        if (this.debug) console.log('touchstart', this.touchPoints(e));
                        if (this.capture(e)) {
                            for (let touch of e.changedTouches) {
                                this.onStart(touch);
                            }
                        }
                    },
                    useCapture
                );
                element.addEventListener(
                    'touchmove',
                    e => {
                        if (this.debug) console.log('touchmove', this.touchPoints(e), e);
                        for (let touch of e.changedTouches) {
                            this.onMove(touch);
                        }
                        for (let touch of e.targetTouches) {
                            this.onMove(touch);
                        }
                    },
                    useCapture
                );
                element.addEventListener(
                    'touchend',
                    e => {
                        if (this.debug) console.log('touchend', this.touchPoints(e));
                        for (let touch of e.changedTouches) {
                            this.onEnd(touch);
                        }
                    },
                    useCapture
                );
                element.addEventListener(
                    'touchcancel',
                    e => {
                        if (this.debug) console.log('touchcancel', e.targetTouches.length, e.changedTouches.length);
                        for (let touch of e.changedTouches) {
                            this.onEnd(touch);
                        }
                    },
                    useCapture
                );
            } else {
                if (this.debug) console.log('Mouse API');

                element.addEventListener(
                    'mousedown',
                    e => {
                        if (this.debug) console.log('mousedown', e);
                        if (this.capture(e)) {
                            this.onStart(e);
                        }
                    },
                    useCapture
                );
                element.addEventListener(
                    'mousemove',
                    e => {
                        // Dow we only use move events if the mouse is down?
                        // HOver effects have to be implemented by other means
                        // && Events.isMouseDown(e))

                        if (Events$1.isMouseDown(e)) {
                            if (this.debug) console.log('mousemove', e);
                            this.onMove(e);
                        }
                    },
                    useCapture
                );
                element.addEventListener(
                    'mouseup',
                    e => {
                        if (this.debug) console.log('mouseup', e);
                        this.onEnd(e);
                    },
                    true
                );

                if (!this.capturePointerEvents) {
                    element.addEventListener(
                        'mouseout',
                        e => {
                            if (e.target == element) {
                                this.onEnd(e);
                                console.warn("Shouldn't happen: mouseout ends interaction");
                            }
                        },
                        useCapture
                    );
                }
                if (this.cancelOnWindowOut) {
                    window.addEventListener(
                        'mouseout',
                        e => {
                            if (e.target == element) {
                                this.onEnd(e);
                            }
                        },
                        useCapture
                    );
                }
            }
        }

        isDescendant(parent, child) {
            if (parent == child) return true
            let node = child.parentNode;
            while (node != null) {
                if (node == parent) {
                    return true
                }
                node = node.parentNode;
            }
            return false
        }

        touchPoints(event) {
            let result = [];
            for (let touch of event.changedTouches) {
                result.push(this.extractPoint(touch));
            }
            return result
        }

        setupMouseWheelInteraction() {
            this.mouseWheelElement.addEventListener('mousewheel', this.onMouseWheel.bind(this), true);
            this.mouseWheelElement.addEventListener('DOMMouseScroll', this.onMouseWheel.bind(this), true);
        }

        onMouseWheel(event) {
            if (this.capture(event) && this.target.onMouseWheel) {
                this.target.onMouseWheel(event);
            }
        }

        onStart(event) {
            let extracted = this.extractPoint(event);
            this.startInteraction(event, extracted);
            this.target.onStart(event, this.interaction);
        }

        onMove(event) {
            let extracted = this.extractPoint(event, 'all');
            this.updateInteraction(event, extracted);
            this.target.onMove(event, this.interaction);
            this.interaction.updatePrevious();
        }

        onEnd(event) {
            let extracted = this.extractPoint(event, 'changedTouches');
            this.endInteraction(event, extracted);
            this.target.onEnd(event, this.interaction);
            this.finishInteraction(event, extracted);
        }

        /**
         * Asks the target whether the event should be captured
         *
         * @param {any} event
         * @returns {bool}
         * @memberof InteractionDelegate
         */
        capture(event) {
            if (Events$1.isCaptured(event)) {
                return false
            }
            let captured = this.target.capture(event);
            return captured
        }

        getPosition(event) {
            return { x: event.clientX, y: event.clientY }
        }

        extractPoint(event, touchEventKey = 'all') {
            // 'targetTouches'
            let result = {};
            switch (event.constructor.name) {
                case 'MouseEvent': {
                    let buttons = event.buttons || event.which;
                    if (buttons) result['mouse'] = this.getPosition(event);
                    break
                }
                case 'PointerEvent': {
                    result[event.pointerId.toString()] = this.getPosition(event);
                    break
                }
                case 'Touch': {
                    let id = event.touchType === 'stylus' ? 'stylus' : event.identifier.toString();
                    result[id] = this.getPosition(event);
                    break
                }
                //             case 'TouchEvent':
                //                 // Needs to be observed: Perhaps changedTouches are all we need. If so
                //                 // we can remove the touchEventKey default parameter
                //                 if (touchEventKey == 'all') {
                //                     for(let t of event.targetTouches) {
                //                         result[t.identifier.toString()] = this.getPosition(t)
                //                     }
                //                     for(let t of event.changedTouches) {
                //                         result[t.identifier.toString()] = this.getPosition(t)
                //                     }
                //                 }
                //                 else {
                //                     for(let t of event.changedTouches) {
                //                         result[t.identifier.toString()] = this.getPosition(t)
                //                     }
                //                 }
                //                 break
                default:
                    break
            }
            return result
        }

        interactionStarted(event, key, point) {
            // Callback: can be overwritten
        }

        interactionEnded(event, key, point) {
            // Callback: can be overwritten
        }

        interactionFinished(event, key, point) { }

        startInteraction(event, extracted) {
            for (let key in extracted) {
                let point = extracted[key];
                this.interaction.started(key, point);
                this.interactionStarted(event, key, point);
            }
        }

        updateInteraction(event, extracted) {
            for (let key in extracted) {
                let point = extracted[key];
                let updated = this.interaction.update(key, point);
                if (updated) {
                    console.warn("new pointer in updateInteraction shouldn't happen", key);
                    this.interactionStarted(event, key, point);
                }
            }
        }

        endInteraction(event, ended) {
            for (let key in ended) {
                let point = ended[key];
                this.interaction.stop(key, point);
                this.interactionEnded(event, key, point);
            }
        }

        finishInteraction(event, ended) {
            for (let key in ended) {
                let point = ended[key];
                this.interaction.finish(key, point);
                this.interactionFinished(event, key, point);
            }
        }
    }
    /**
     * A special InteractionDelegate that maps events to specific parts of
     * the interaction target. The InteractionTarget must implement a findTarget
     * method that returns an object implementing the IInteractionTarget interface.
     *
     * If the InteractionTarget also implements a mapPositionToPoint method this
     * is used to map the points to the local coordinate space of the the target.
     *
     * This makes it easier to lookup elements and relate events to local
     * positions.
     *
     * @export
     * @class InteractionMapper
     * @extends {InteractionDelegate}
     */
    class InteractionMapper$1 extends InteractionDelegate {
        constructor(
            element,
            target,
            {
                tapDistance = 10,
                longPressTime = 500.0,
                useCapture = true,
                capturePointerEvents = true,
                mouseWheelElement = null,
                logInteractionsAbove = 12
            } = {}
        ) {
            super(element, target, {
                tapDistance,
                useCapture,
                capturePointerEvents,
                longPressTime,
                mouseWheelElement
            });
            this.logInteractionsAbove = logInteractionsAbove;
        }

        get targetInterface() {
            return IInteractionMapperTarget
        }

        mapPositionToPoint(point, element = null) {
            if (this.target.mapPositionToPoint) {
                return this.target.mapPositionToPoint(point, element)
            }
            return point
        }

        interactionStarted(event, key, point) {
            if (this.target.findTarget) {
                let local = this.mapPositionToPoint(point);
                let found = this.target.findTarget(event, local, point);
                if (found != null) {
                    this.interaction.addTarget(key, found);
                }
            }
            let size = this.interaction.current.size;
            let limit = this.logInteractionsAbove;
            if (size > limit) {
                Logging$1.log(`Number of interactions ${size} exceeds ${limit}`);
            }
        }

        onMouseWheel(event) {
            if (this.capture(event)) {
                if (this.target.findTarget) {
                    let point = this.getPosition(event);
                    let local = this.mapPositionToPoint(point);
                    let found = this.target.findTarget(event, local, point);
                    if (found != null && found.onMouseWheel) {
                        found.onMouseWheel(event);
                        return
                    }
                }
                if (this.target.onMouseWheel) {
                    this.target.onMouseWheel(event);
                }
            }
        }

        onStart(event) {
            let extracted = this.extractPoint(event);
            this.startInteraction(event, extracted);
            let mapped = this.interaction.mapInteraction(
                extracted,
                ['current', 'start'],
                this.mapPositionToPoint.bind(this)
            );
            for (let [target, interaction] of mapped.entries()) {
                target.onStart(event, interaction);
            }
        }

        onMove(event) {
            let extracted = this.extractPoint(event, 'all');
            this.updateInteraction(event, extracted);
            let mapped = this.interaction.mapInteraction(
                extracted,
                ['current', 'previous'],
                this.mapPositionToPoint.bind(this)
            );
            for (let [target, interaction] of mapped.entries()) {
                target.onMove(event, interaction);
                interaction.updatePrevious();
            }
            this.interaction.updatePrevious();
        }

        onEnd(event) {
            let extracted = this.extractPoint(event, 'changedTouches');
            this.endInteraction(event, extracted);
            let mapped = this.interaction.mapInteraction(extracted, ['ended'], this.mapPositionToPoint.bind(this));
            for (let [target, interaction] of mapped.entries()) {
                target.onEnd(event, interaction);
            }
            this.finishInteraction(event, extracted);
        }

        /**
         *
         *
         * @static
         * @param {string|array} types - An event type, an array of event types or event types seperated by a space sign. The following
         *     events are possible:
         *         pan, panstart, panmove, panend, pancancel, panleft, panright, panup, pandown
         *         pinch, pinchstart, pinchmove, pinchend, pinchcancel, pinchin, pinchout
         *         press, pressup
         *         rotate, rotatestart, rotatemove, rotateend, rotatecancel
         *         swipe, swipeleft, swiperight, swipeup, swipedown
         *         tap
         * @param {HTMLElement|HTMLElement[]} elements - An HTML element or an array of HTML elements.
         * @param {function} [cb] - The callback. A function which is executed after the event occurs. Receives the event object as the
         *     first paramter
         * @param {object} [opts] - An options object. See the hammer documentation for more details.
         */
        static on(types, elements, cb, opts = {}) {
            opts = Object.assign({}, {}, opts);

            if (typeof Hammer === 'undefined') {
                console.error('Hammer.js not found!');
                return this
            }

            if (typeof Hammer.__hammers === 'undefined') {
                Hammer.__hammers = new Map();
            }

            // convert to array
            types = Array.isArray(types) ? types : types.split(/\s/);
            if (elements instanceof NodeList || elements instanceof HTMLCollection) {
                elements = Array.from(elements);
            }
            elements = Array.isArray(elements) ? elements : [elements];

            for (let i = 0; i < types.length; i++) {
                const type = types[i].toLowerCase();

                // list of hammer events
                const useHammer = /^(tap|doubletap|press|pan|swipe|pinch|rotate).*$/.test(type);

                // if it is a hammer event
                if (useHammer) {
                    for (let j = 0; j < elements.length; j++) {
                        // if(elements[j].tagName == "svg") return false;

                        let hammer = new Hammer(elements[j], opts);

                        if (window.propagating !== 'undefined') {
                            hammer = propagating(hammer);
                        }

                        // recognizers
                        if (type.startsWith('pan')) {
                            hammer.get('pan').set(Object.assign({ direction: Hammer.DIRECTION_ALL }, opts));
                        } else if (type.startsWith('pinch')) {
                            hammer.get('pinch').set(Object.assign({ enable: true }, opts));
                        } else if (type.startsWith('press')) {
                            hammer.get('press').set(opts);
                        } else if (type.startsWith('rotate')) {
                            hammer.get('rotate').set(Object.assign({ enable: true }, opts));
                        } else if (type.startsWith('swipe')) {
                            hammer.get('swipe').set(Object.assign({ direction: Hammer.DIRECTION_ALL }, opts));
                        } else if (type.startsWith('tap')) {
                            hammer.get('tap').set(opts);
                        }

                        hammer.on(type, event => {
                            cb(event);
                        });

                        if (Hammer.__hammers.has(elements[j])) {
                            const elementHammers = Hammer.__hammers.get(elements[j]);
                            elementHammers.push(hammer);
                            Hammer.__hammers.set(elements[j], elementHammers);
                        } else {
                            Hammer.__hammers.set(elements[j], [hammer]);
                        }
                    }
                } else {
                    for (let j = 0; j < elements.length; j++) {
                        Hammer.on(elements[j], type, event => {
                            cb(event);
                        });
                    }
                }
            }
        }

        /**
         *
         *
         * @static
         * @param {HTMLElement|HTMLElement[]} elements - An HTML element or an array of HTML elements.
         */
        static off(elements) {
            if (typeof Hammer === 'undefined') {
                console.error('Hammer.js not found!');
                return this
            }

            // convert to array
            if (elements instanceof NodeList || elements instanceof HTMLCollection) {
                elements = Array.from(elements);
            }
            elements = Array.isArray(elements) ? elements : [elements];

            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];

                if (Hammer.__hammers.has(element)) {
                    const elementHammers = Hammer.__hammers.get(element);
                    elementHammers.forEach(it => it.destroy());
                    Hammer.__hammers.delete(element);
                }
            }
        }
    }

    window.InteractionMapper = InteractionMapper$1;

    /** Report capabilities with guaranteed values.
     */
    class Capabilities {
        /** Returns the browser userAgent.
        @return {string}
        */
        static get userAgent() {
            return navigator.userAgent || 'Unknown Agent'
        }

        /** Tests whether the app is running on a mobile device.
        Implemented as a readonly attribute.
        @return {boolean}
        */
        static get isMobile() {
            return /Mobi/.test(navigator.userAgent)
        }

        /** Tests whether the app is running on a iOS device.
        Implemented as a readonly attribute.
        @return {boolean}
        */
        static get isIOS() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
        }

        /** Tests whether the app is running in a Safari environment.
        See https://stackoverflow.com/questions/7944460/detect-safari-browser
        Implemented as a readonly attribute.
        @return {boolean}
        */
        static get isSafari() {
            return (
                navigator.vendor &&
                navigator.vendor.indexOf('Apple') > -1 &&
                navigator.userAgent &&
                !navigator.userAgent.match('CriOS')
            )
        }

        /**
         * Distincts if the app is running inside electron or not.
         *
         * source: https://github.com/cheton/is-electron
         */
        static get isElectron() {
            // Renderer process
            if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
                return true
            }

            // Main process
            if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
                return true
            }

            // Detect the user agent when the `nodeIntegration` option is set to true
            if (
                typeof navigator === 'object' &&
                typeof navigator.userAgent === 'string' &&
                navigator.userAgent.indexOf('Electron') >= 0
            ) {
                return true
            }

            return false
        }

        /** Returns the display resolution. Necessary for retina displays.
        @return {number}
        */
        static get devicePixelRatio() {
            return window.devicePixelRatio || 1
        }

        /** Returns true if the device is a multi-touch table. This method is currently not universal usable and not sure!
        @return {boolean}
        */
        static get isMultiTouchTable() {
            return (
                Capabilities.devicePixelRatio > 2 &&
                Capabilities.isMobile === false &&
                /Windows/i.test(Capabilities.userAgent)
            )
        }

        /** Returns true if mouse events are supported
        @return {boolean}
        */
        static supportsMouseEvents() {
            return typeof window.MouseEvent != 'undefined'
        }

        /** Returns true if touch events are supported
        @return {boolean}
        */
        static supportsTouchEvents() {
            return typeof window.TouchEvent != 'undefined'
        }

        /** Returns true if pointer events are supported
        @return {boolean}
        */
        static supportsPointerEvents() {
            return typeof window.PointerEvent != 'undefined'
        }

        /** Returns true if DOM templates are supported
        @return {boolean}
        */
        static supportsTemplate() {
            return 'content' in document.createElement('template')
        }
    }

    /** Basic tests for Capabilities.
     */
    class CapabilitiesTests {
        static testConfirm() {
            let bool = confirm('Please confirm');
            document.getElementById('demo').innerHTML = bool ? 'Confirmed' : 'Not confirmed';
        }

        static testPrompt() {
            let person = prompt('Please enter your name', 'Harry Potter');
            if (person != null) {
                demo.innerHTML = 'Hello ' + person + '! How are you today?';
            }
        }

        static testUserAgent() {
            let agent = 'User-agent: ' + Capabilities.userAgent;
            user_agent.innerHTML = agent;
        }

        static testDevicePixelRatio() {
            let value = 'Device Pixel Ratio: ' + Capabilities.devicePixelRatio;
            device_pixel_ratio.innerHTML = value;
        }

        static testMultiTouchTable() {
            let value = 'Is the device a multi-touch table? ' + Capabilities.isMultiTouchTable;
            multi_touch_table.innerHTML = value;
        }

        static testSupportedEvents() {
            let events = [];
            if (Capabilities.supportsMouseEvents()) {
                events.push('MouseEvents');
            }
            if (Capabilities.supportsTouchEvents()) {
                events.push('TouchEvents');
            }
            if (Capabilities.supportsPointerEvents()) {
                events.push('PointerEvents');
            }
            supported_events.innerHTML = 'Supported Events: ' + events.join(', ');
        }

        static testAll() {
            this.testUserAgent();
            this.testDevicePixelRatio();
            this.testMultiTouchTable();
            this.testSupportedEvents();
        }
    }

    /* Optional global variables, needed in DocTests. */
    window.Capabilities = Capabilities;
    window.CapabilitiesTests = CapabilitiesTests;

    /* eslint-disable no-unused-vars */

    /**
     * A base class for scatter specific events.
     *
     * @constructor
     * @param {name} String - The name of the event
     * @param {target} Object - The target of the event
     */
    class BaseEvent {
        constructor(name, target) {
            this.name = name;
            this.target = target;
        }
    }

    // Event types
    const START = 'onStart';
    const UPDATE = 'onUpdate';
    const END = 'onEnd';

    /**
     * A scatter event that describes how the scatter has changed.
     *
     * @constructor
     * @param {target} Object - The target scatter of the event
     * @param {optional} Object - Optional parameter
     */
    class ScatterEvent extends BaseEvent {
        constructor(
            target,
            { translate = { x: 0, y: 0 }, scale = null, rotate = 0, about = null, fast = false, type = null } = {}
        ) {
            super('scatterTransformed', { target: target });
            this.translate = translate;
            this.scale = scale;
            this.rotate = rotate;
            this.about = about;
            this.fast = fast;
            this.type = type;
        }

        toString() {
            return (
                "Event('scatterTransformed', scale: " + this.scale + ' about: ' + this.about.x + ', ' + this.about.y + ')'
            )
        }
    }

    /**
     * A scatter resize event that describes how the scatter has changed.
     *
     * @constructor
     * @param {target} Object - The target scatter of the event
     * @param {optional} Object - Optional parameter
     */
    class ResizeEvent extends BaseEvent {
        constructor(target, { width = 0, height = 0 } = {}) {
            super('scatterResized', { width: width, height: height });
            this.width = width;
            this.height = height;
        }

        toString() {
            return 'Event(scatterResized width: ' + this.width + 'height: ' + this.height + ')'
        }
    }

    /**
     * A abstract base class that implements the throwable behavior of a scatter
     * object.
     *
     * @constructor
     */
    class Throwable {
        constructor({
            movableX = true,
            movableY = true,
            throwVisibility = 44,
            throwDamping = 0.95,
            autoThrow = true,
            onThrowFinished = null
        } = {}) {
            this.movableX = movableX;
            this.movableY = movableY;
            this.throwVisibility = throwVisibility;
            this.throwDamping = throwDamping;
            this.autoThrow = autoThrow;
            this.velocities = [];
            this.velocity = null;
            this.timestamp = null;
            this.onThrowFinished = onThrowFinished;
            //console.log("onThrowFinished", onThrowFinished)
        }

        observeVelocity() {
            this.lastframe = performance.now();
        }

        addVelocity(delta, buffer = 5) {
            let t = performance.now();
            let dt = t - this.lastframe;
            this.lastframe = t;
            if (dt > 0) {
                // Avoid division by zero errors later on
                // and consider the number of involved pointers sind addVelocity will be called by the
                // onMove events
                let velocity = {
                    t: t,
                    dt: dt,
                    dx: delta.x / delta.number,
                    dy: delta.y / delta.number
                };
                this.velocities.push(velocity);
                while (this.velocities.length > buffer) {
                    this.velocities.shift();
                }
            }
        }

        meanVelocity(milliseconds = 30) {
            this.addVelocity({ x: 0, y: 0, number: 1 });
            let sum = { x: 0, y: 0 };
            let count = 0;
            let t = 0;
            for (let i = this.velocities.length - 1; i > 0; i--) {
                let v = this.velocities[i];
                t += v.dt;
                let nv = { x: v.dx / v.dt, y: v.dy / v.dt };
                sum = Points.add(sum, nv);
                count += 1;
                if (t > milliseconds) {
                    break
                }
            }
            if (count === 0) return sum // empty vector
            return Points.multiplyScalar(sum, 1 / count)
        }

        killAnimation() {
            this.velocity = null;
            this.velocities = [];
        }

        startThrow() {
            this.velocity = this.meanVelocity();
            if (this.velocity != null) {
                // Call next velocity to ansure that specializations
                // that use keepOnStage are called
                this.velocity = this.nextVelocity(this.velocity);
                if (this.autoThrow) this.animateThrow(performance.now());
            } else {
                this.onDragComplete();
            }
        }

        _throwDeltaTime() {
            let t = performance.now();
            let dt = t - this.lastframe;
            this.lastframe = t;
            return dt
        }

        animateThrow(time) {
            if (this.velocity != null) {
                let dt = this._throwDeltaTime();
                // console.log("animateThrow", dt)
                let next = this.nextVelocity(this.velocity);
                let prevLength = Points.length(this.velocity);
                let nextLength = Points.length(next);
                if (nextLength > prevLength) {
                    let factor = nextLength / prevLength;
                    next = Points.multiplyScalar(next, 1 / factor);
                    console.log('Prevent acceleration', factor, this.velocity, next);
                }
                this.velocity = next;
                let d = Points.multiplyScalar(this.velocity, dt);
                this._move(d);

                this.onDragUpdate(d);
                if (dt == 0 || this.needsAnimation()) {
                    requestAnimationFrame(this.animateThrow.bind(this));
                    return
                } else {
                    if (this.isOutside()) {
                        requestAnimationFrame(this.animateThrow.bind(this));
                        return
                    }
                }
            }
            this.onDragComplete();
            if (this.onThrowFinished != null) {
                this.onThrowFinished();
            }
        }

        needsAnimation() {
            if (this.velocity == null) {
                return false
            }
            return Points.length(this.velocity) > 0.01
        }

        nextVelocity(velocity) {
            // Must be overwritten: computes the changed velocity. Implement
            // damping, collison detection, etc. here
            let next = Points.multiplyScalar(velocity, this.throwDamping);
            return {
                x: this.movableX ? next.x : 0,
                y: this.movableY ? next.y : 0
            }
        }

        _move(delta) {
            // Overwrite if necessary
        }

        onDragComplete() {
            // Overwrite if necessary
        }

        onDragUpdate(delta) {
            // Overwrite if necessary
        }
    }

    class AbstractScatter extends Throwable {
        constructor({
            minScale = 0.1,
            maxScale = 1.0,
            startScale = 1.0,
            autoBringToFront = true,
            autoThrow = true,
            translatable = true,
            scalable = true,
            rotatable = true,
            resizable = false,
            movableX = true,
            movableY = true,
            throwVisibility = 44,
            throwDamping = 0.95,
            overdoScaling = 1,
            mouseZoomFactor = 1.1,
            rotationDegrees = null,
            rotation = null,
            onTransform = null,
            interactive = true,
            onClose = null,
            onThrowFinished = null,
            scaleAutoClose = false,
            scaleCloseThreshold = 0.1,
            scaleCloseBuffer = 0.05,
            maxRotation = Angle.degree2radian(5),
            minInteractionDistance = 0,
            useLowPassFilter = false
        } = {}) {
            if (rotationDegrees != null && rotation != null) {
                throw new Error('Use rotationDegrees or rotation but not both')
            } else if (rotation != null) {
                rotationDegrees = Angle.radian2degree(rotation);
            } else if (rotationDegrees == null) {
                rotationDegrees = 0;
            }
            super({
                movableX,
                movableY,
                throwVisibility,
                throwDamping,
                autoThrow,
                onThrowFinished
            });

            /**
             * Closes the card when the minScale is reached and the
             * card is released. Card can be saved by scaling it up again.
             */
            this.scaleAutoClose = scaleAutoClose;
            this.scaleCloseThreshold = scaleCloseThreshold;
            this.scaleCloseBuffer = scaleCloseBuffer;
            this.scaleAutoCloseTimeout = null;

            this.interactive = interactive;
            this.startRotationDegrees = rotationDegrees;
            this.startScale = startScale; // Needed to reset object
            this.minScale = minScale;
            this.maxScale = maxScale;
            this.maxRotation = maxRotation;
            this.overdoScaling = overdoScaling;
            this.translatable = translatable;
            if (!translatable) {
                this.movableX = false;
                this.movableY = false;
            }
            this.scalable = scalable;
            this.rotatable = rotatable;
            this.resizable = resizable;
            this.mouseZoomFactor = mouseZoomFactor;
            this.autoBringToFront = autoBringToFront;
            this.useLowPassFilter = useLowPassFilter;
            this.minInteractionDistance = minInteractionDistance;
            if (useLowPassFilter) {
                this.rotateLPF = new LowPassFilter();
                this.zoomLPF = new LowPassFilter();
                this.zoomLPF.setup([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            }
            this.dragging = false;
            this.onTransform = onTransform != null ? [onTransform] : null;
            this.onClose = onClose != null ? [onClose] : null;
        }

        addCloseEventCallback(callback) {
            if (this.onClose == null) {
                this.onClose = [];
            }
            this.onClose.push(callback);
        }

        addTransformEventCallback(callback) {
            if (this.onTransform == null) {
                this.onTransform = [];
            }
            this.onTransform.push(callback);
        }

        startGesture(interaction) {
            this.bringToFront();
            this.killAnimation();
            this.observeVelocity();
            if (this.useLowPassFilter) {
                this.rotateLPF.clear();
                this.zoomLPF.clear();
                this.zoomLPF.setup([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            }
            return true
        }

        close() {
            console.log('SCATTER WAS CLOSED!');
            this._callCloseCallbacks();
            this._removeCallbacks();
            this._removeSelfFromScatterContainer();
        }

        _callCloseCallbacks() {
            if (this.onClose) {
                this.onClose.forEach(callback => callback(this));
            }
        }

        _removeCallbacks() {
            this.onClose = [];
            this.onTransform = [];
        }

        _removeSelfFromScatterContainer() {
            // Removes self from container when it's closed.
            if (this.container) {
                this.container.remove(this);
            }
        }

        gesture(interaction) {
            let delta = interaction.delta();
            if (delta != null) {
                this.addVelocity(delta);
                let rotate = delta.rotate;
                let zoom = delta.zoom;
                if (this.maxRotation != null) {
                    if (Math.abs(rotate) > this.maxRotation) {
                        rotate = 0;
                    }
                }
                if (this.useLowPassFilter) {
                    rotate = this.rotateLPF.next(rotate);
                    zoom = this.zoomLPF.next(zoom);
                }
                if (delta.distance < this.minInteractionDistance) {
                    let ratio = delta.distance / this.minInteractionDistance;
                    rotate *= ratio;
                    let zoomDelta = zoom - 1;
                    zoomDelta *= ratio;
                    zoom = 1 + zoomDelta;
                }

                this.transform(delta, zoom, rotate, delta.about);
                if (zoom != 1) this.interactionAnchor = delta.about;
            }
        }

        get polygon() {
            let w2 = (this.width * this.scale) / 2;
            let h2 = (this.height * this.scale) / 2;
            let center = this.center;
            let polygon = new Polygon(center);
            polygon.addPoint({ x: -w2, y: -h2 });
            polygon.addPoint({ x: w2, y: -h2 });
            polygon.addPoint({ x: w2, y: h2 });
            polygon.addPoint({ x: -w2, y: h2 });
            polygon.rotate(this.rotation);
            return polygon
        }

        isOutside() {
            let stagePolygon = this.containerPolygon;
            if (stagePolygon == null) return false
            let polygon = this.polygon;
            if (polygon == null) return false
            let result = stagePolygon.intersectsWith(polygon);
            return result === false || result.overlap < this.throwVisibility
        }

        recenter() {
            // Return a small vector that guarantees that the scatter is moving
            // towards the center of the stage
            let center = this.center;
            let target = this.container.center;
            let delta = Points.subtract(target, center);
            return Points.normalize(delta)
        }

        nextVelocity(velocity) {
            return this.keepOnStage(velocity)
        }

        bouncing() {
            // Implements the bouncing behavior of the scatter. Moves the scatter
            // to the center of the stage if the scatter is outside the stage or
            // not within the limits of the throwVisibility.

            let stagePolygon = this.containerPolygon;
            let polygon = this.polygon;
            let result = stagePolygon.intersectsWith(polygon);
            if (result === false || result.overlap < this.throwVisibility) {
                let cv = this.recenter();
                let recentered = false;
                while (result === false || result.overlap < this.throwVisibility) {
                    polygon.center.x += cv.x;
                    polygon.center.y += cv.y;
                    this._move(cv);
                    result = stagePolygon.intersectsWith(polygon);
                    recentered = true;
                }
                return recentered
            }
            return false
        }

        keepOnStage(velocity, collision = 0.5) {
            let stagePolygon = this.containerPolygon;
            // UO: since keepOnStage is called in nextVelocity we need to
            // ensure a return value
            if (!stagePolygon) return { x: 0, y: 0 }
            let polygon = this.polygon;
            let bounced = this.bouncing();
            if (bounced) {
                let stage = this.containerBounds;
                let x = this.center.x;
                let y = this.center.y;
                let dx = this.movableX ? velocity.x : 0;
                let dy = this.movableY ? velocity.y : 0;
                let factor = this.throwDamping;
                // if (recentered) {
                if (x < 0) {
                    dx = -dx;
                    factor = collision;
                }
                if (x > stage.width) {
                    dx = -dx;
                    factor = collision;
                }
                if (y < 0) {
                    dy = -dy;
                    factor = collision;
                }
                if (y > stage.height) {
                    dy = -dy;
                    factor = collision;
                }
                // }
                return Points.multiplyScalar({ x: dx, y: dy }, factor)
            }
            return super.nextVelocity(velocity)
        }

        endGesture(interaction) {
            this.startThrow();
            this._checkAutoClose();
        }

        _checkAutoClose() {
            if (this.scaleAutoClose)
                if (this.scale < this.minScale + this.scaleCloseThreshold - this.scaleCloseBuffer) {
                    this.zoom(this.minScale, {
                        animate: 0.2,
                        onComplete: this.close.bind(this)
                    });
                } else if (this.scale < this.minScale + this.scaleCloseThreshold) {
                    this.zoom(this.minScale + this.scaleCloseThreshold, {
                        animate: 0.4
                    });
                }
        }

        rotateDegrees(degrees, anchor) {
            let rad = Angle.degree2radian(degrees);
            this.rotate(rad, anchor);
        }

        rotate(rad, anchor) {
            this.transform({ x: 0, y: 0 }, 1.0, rad, anchor);
        }

        move(d, { animate = 0 } = {}) {
            if (this.translatable) {
                if (animate > 0) {
                    let startPos = this.position;
                    TweenLite.to(this, animate, {
                        x: '+=' + d.x,
                        y: '+=' + d.y,
                        /* scale: scale, uo: not defined, why was this here? */
                        onUpdate: e => {
                            let p = this.position;
                            let dx = p.x - startPos.x;
                            let dy = p.x - startPos.y;
                            this.onMoved(dx, dy);
                        }
                    });
                } else {
                    this._move(d);
                    this.onMoved(d.x, d.y);
                }
            }
        }

        moveTo(p, { animate = 0 } = {}) {
            let c = this.origin;
            let delta = Points.subtract(p, c);
            this.move(delta, { animate: animate });
        }

        centerAt(p, { animate = 0 } = {}) {
            let c = this.center;
            let delta = Points.subtract(p, c);
            this.move(delta, { animate: animate });
        }

        zoom(scale, { animate = 0, about = null, delay = 0, x = null, y = null, onComplete = null } = {}) {
            let anchor = about || this.center;
            if (scale != this.scale) {
                if (animate > 0) {
                    TweenLite.to(this, animate, {
                        scale: scale,
                        delay: delay,
                        onComplete: onComplete,
                        onUpdate: this.onZoomed.bind(this)
                    });
                } else {
                    this.scale = scale;
                    this.onZoomed(anchor);
                }
            }
        }

        _move(delta) {
            this.x += this.movableX ? delta.x : 0;
            this.y += this.movableX ? delta.y : 0;
        }

        transform(translate, zoom, rotate, anchor) {
            let delta = {
                x: this.movableX ? translate.x : 0,
                y: this.movableY ? translate.y : 0
            };
            if (this.resizable) var vzoom = zoom;
            if (!this.translatable) delta = { x: 0, y: 0 };
            if (!this.rotatable) rotate = 0;
            if (!this.scalable) zoom = 1.0;
            if (zoom == 1.0 && rotate == 0) {
                this._move(delta);
                if (this.onTransform != null) {
                    let event = new ScatterEvent(this, {
                        translate: delta,
                        scale: this.scale,
                        rotate: 0,
                        about: anchor,
                        fast: false,
                        type: UPDATE
                    });
                    this.onTransform.forEach(function (f) {
                        f(event);
                    });
                }
                return
            }
            let origin = this.rotationOrigin;
            let beta = Points.angle(origin, anchor);
            let distance = Points.distance(origin, anchor);
            let { scale: newScale, zoom: thresholdedZoom } = this.calculateScale(zoom);

            let newOrigin = Points.arc(anchor, beta + rotate, distance * thresholdedZoom);
            let extra = Points.subtract(newOrigin, origin);
            let offset = Points.subtract(anchor, origin);
            this._move(offset);
            this.scale = newScale;
            this.rotation += rotate;
            offset = Points.negate(offset);
            offset = Points.add(offset, extra);
            offset = Points.add(offset, translate);
            this._move(offset);

            delta.x += extra.x;
            delta.y += extra.y;
            if (this.onTransform != null) {
                let event = new ScatterEvent(this, {
                    translate: delta,
                    scale: newScale,
                    rotate: rotate,
                    about: anchor
                });
                this.onTransform.forEach(function (f) {
                    f(event);
                });
            }
            if (this.resizable) {
                this.resizeAfterTransform(vzoom);
            }
        }

        /**
         * For a given zoom, a new scale is calculated, taking
         * min and max scale into account.
         *
         * @param {number} zoom - The zoom factor, to scale the object with.
         * @returns {object} - Returns an object containing the a value for a valid scale and the corrected zoom factor.
         */
        calculateScale(zoom) {
            let scale = this.scale * zoom;

            let minScale = this.minScale / this.overdoScaling;
            let maxScale = this.maxScale * this.overdoScaling;
            if (scale < minScale) {
                scale = minScale;
                zoom = scale / this.scale;
            }
            if (scale > maxScale) {
                scale = maxScale;
                zoom = scale / this.scale;
            }

            if (this.scaleAutoClose) this._updateTransparency();

            return { zoom, scale }
        }

        _updateTransparency() {
            if (this.scale < this.minScale + this.scaleCloseThreshold) {
                let transparency = this.calculateScaleTransparency();
                this.element.style.opacity = transparency;
            } else this.element.style.opacity = 1;
        }

        calculateScaleTransparency() {
            let transparency = (this.scale - this.minScale) / this.scaleCloseThreshold;
            transparency = transparency > 1 ? 1 : transparency < 0 ? 0 : transparency;
            return transparency
        }

        resizeAfterTransform(zoom) {
            // Overwrite this in subclasses.
        }

        validScale(scale) {
            scale = Math.max(scale, this.minScale);
            scale = Math.min(scale, this.maxScale);
            return scale
        }

        animateZoomBounce(dt = 1) {
            if (this.zoomAnchor != null) {
                let zoom = 1;
                let amount = Math.min(0.01, (0.3 * dt) / 100000.0);
                if (this.scale < this.minScale) zoom = 1 + amount;
                if (this.scale > this.maxScale) zoom = 1 - amount;
                if (zoom != 1) {
                    this.transform({ x: 0, y: 0 }, zoom, 0, this.zoomAnchor);
                    requestAnimationFrame(dt => {
                        this.animateZoomBounce(dt);
                    });
                    return
                }
                this.zoomAnchor = null;
            }
        }

        checkScaling(about, delay = 0) {
            this.zoomAnchor = about;
            clearTimeout(this.animateZoomBounce.bind(this));
            setTimeout(this.animateZoomBounce.bind(this), delay);
        }

        onMouseWheel(event) {
            if (event.claimedByScatter) {
                if (event.claimedByScatter != this) return
            }
            this.killAnimation();
            this.targetScale = null;
            let direction = event.detail < 0 || event.wheelDelta > 0;
            let globalPoint = { x: event.clientX, y: event.clientY };
            let centerPoint = this.mapPositionToContainerPoint(globalPoint);
            if (event.shiftKey) {
                let degrees = direction ? 5 : -5;
                let rad = Angle.degree2radian(degrees);
                return this.transform({ x: 0, y: 0 }, 1.0, rad, centerPoint)
            }
            const zoomFactor = this.mouseZoomFactor;
            let zoom = direction ? zoomFactor : 1 / zoomFactor;
            this.transform({ x: 0, y: 0 }, zoom, 0, centerPoint);
            this.checkScaling(centerPoint, 200);

            if (this.scaleAutoClose) {
                if (this.scale <= this.minScale + this.scaleCloseThreshold) {
                    if (this.scaleAutoCloseTimeout) clearTimeout(this.scaleAutoCloseTimeout);
                    this.scaleAutoCloseTimeout = setTimeout(() => {
                        this._checkAutoClose();
                    }, 600);
                }
                this._updateTransparency();
            }
        }

        onStart(event, interaction) {
            if (this.startGesture(interaction)) {
                this.dragging = true;
                this.interactionAnchor = null;
            }
            if (this.onTransform != null) {
                let event = new ScatterEvent(this, {
                    translate: { x: 0, y: 0 },
                    scale: this.scale,
                    rotate: 0,
                    about: null,
                    fast: false,
                    type: START
                });
                this.onTransform.forEach(function (f) {
                    f(event);
                });
            }
        }

        onMove(event, interaction) {
            /** As long as mouseout && mouseleave interrupt we cannot be sure that
             * dragging remains correct.
             */
            if (this.dragging) {
                this.gesture(interaction);
            }
        }

        onEnd(event, interaction) {
            console.log('Scatter.onEnd', this.dragging);
            if (interaction.isFinished()) {
                this.endGesture(interaction);
                this.dragging = false;
                for (let key of interaction.ended.keys()) {
                    if (interaction.isTap(key)) {
                        console.log('Scatter.isTap');
                        let point = interaction.ended.get(key);
                        this.onTap(event, interaction, point);
                    }
                }
                if (this.onTransform != null) {
                    let event = new ScatterEvent(this, {
                        translate: { x: 0, y: 0 },
                        scale: this.scale,
                        rotate: 0,
                        about: null,
                        fast: false,
                        type: END
                    });
                    this.onTransform.forEach(function (f) {
                        f(event);
                    });
                }
            }
            let about = this.interactionAnchor;
            if (about != null) {
                this.checkScaling(about, 100);
            }
        }

        //onTap(event, interaction, point) {}

        onTap(event, interaction, point) {
            console.log('AbstractScatter.onTap', this.tapDelegate, interaction);
            if (this.tapDelegate) {
                Events$1.stop(event);
                this.tapDelegate.tap(event, 'scatter');
            }
        }

        onDragUpdate(delta) {
            if (this.onTransform != null) {
                let event = new ScatterEvent(this, {
                    fast: true,
                    translate: delta,
                    scale: this.scale,
                    about: this.currentAbout,
                    type: null
                });
                this.onTransform.forEach(function (f) {
                    f(event);
                });
            }
        }

        onDragComplete() {
            if (this.onTransform) {
                let event = new ScatterEvent(this, {
                    scale: this.scale,
                    about: this.currentAbout,
                    fast: false,
                    type: null
                });
                this.onTransform.forEach(function (f) {
                    f(event);
                });
            }
        }

        onMoved(dx, dy, about) {
            if (this.onTransform != null) {
                let event = new ScatterEvent(this, {
                    translate: { x: dx, y: dy },
                    about: about,
                    fast: true,
                    type: null
                });
                this.onTransform.forEach(function (f) {
                    f(event);
                });
            }
        }

        onResizing() {
            if (this.onTransform != null) {
                let event = new ScatterEvent(this, {
                    scale: this.scale,
                    fast: false,
                    type: null
                });
                this.onTransform.forEach(function (f) {
                    f(event);
                });
            }
        }

        onZoomed(about) {
            if (this.scaleAutoClose) this._updateTransparency();

            if (this.onTransform != null) {
                let event = new ScatterEvent(this, {
                    scale: this.scale,
                    about: about,
                    fast: false,
                    type: null
                });
                this.onTransform.forEach(function (f) {
                    f(event);
                });
            }
        }
    }

    class DOMScatter extends AbstractScatter {
        constructor(
            element,
            container,
            {
                startScale = 1.0,
                minScale = 0.1,
                maxScale = 1.0,
                overdoScaling = 1.5,
                autoBringToFront = true,
                translatable = true,
                scalable = true,
                rotatable = true,
                movableX = true,
                movableY = true,
                rotationDegrees = null,
                rotation = null,
                onTransform = null,
                transformOrigin = 'center center',
                // extras which are in part needed
                x = 0,
                y = 0,
                width = null, // required
                height = null, // required
                resizable = false,
                tapDelegate = null,
                triggerSVGClicks = false,
                allowClickDistance = 44,
                verbose = true,
                onResize = null,
                touchAction = 'none',
                throwVisibility = 44,
                throwDamping = 0.95,
                autoThrow = true,
                scaleAutoClose = false,
                onClose = null,
                scaleCloseThreshold = 0.1,
                scaleCloseBuffer = 0.05,
                useLowPassFilter = false,
                maxRotation = Angle.degree2radian(15),
                minInteractionDistance = 200
            } = {}
        ) {
            super({
                minScale,
                maxScale,
                startScale,
                overdoScaling,
                autoBringToFront,
                translatable,
                scalable,
                rotatable,
                movableX,
                movableY,
                resizable,
                rotationDegrees,
                rotation,
                onTransform,
                throwVisibility,
                throwDamping,
                autoThrow,
                scaleAutoClose,
                scaleCloseThreshold,
                scaleCloseBuffer,
                onClose,
                useLowPassFilter,
                maxRotation,
                minInteractionDistance
            });
            if (container == null || width == null || height == null) {
                throw new Error('Invalid value: null')
            }
            element.scatter = this;
            this.element = element;
            this.x = x;
            this.y = y;
            this.oldX = 0;
            this.oldY = 0;
            this.meanX = x;
            this.meanY = y;
            this.width = width;
            this.height = height;
            this.throwVisibility = Math.min(width, height, throwVisibility);
            this.container = container;
            this.tapDelegate = tapDelegate;
            this.scale = startScale;
            this.rotationDegrees = this.startRotationDegrees;
            this.transformOrigin = transformOrigin;
            this.initialValues = {
                x: x,
                y: y,
                width: width,
                height: height,
                scale: startScale,
                rotation: this.startRotationDegrees,
                transformOrigin: transformOrigin
            };
            this.tapNodes = new Map();

            // For tweenlite we need initial values in _gsTransform
            TweenLite.set(element, this.initialValues);
            this.onResize = onResize;
            this.verbose = verbose;
            if (touchAction !== null) {
                Elements$1.setStyle(element, { touchAction });
            }
            this.resizeButton = null;
            if (resizable) {
                let button = document.createElement('div');
                button.style.position = 'absolute';
                button.style.right = '0px';
                button.style.bottom = '0px';
                button.style.width = '50px';
                button.style.height = '50px';
                button.className = 'interactiveElement';
                this.element.appendChild(button);

                button.addEventListener('pointerdown', e => {
                    this.startResize(e);
                });

                button.addEventListener('pointermove', e => {
                    this.resize(e);
                });

                button.addEventListener('pointerup', e => {
                    this.stopResize(e);
                });
                this.resizeButton = button;
            }
            if (tapDelegate) {
                tapDelegate.handleClicks();
            }
            container.add(this);
        }

        /** Returns geometry data as object. **/
        getState() {
            return {
                scale: this.scale,
                x: this.x,
                y: this.y,
                rotation: this.rotation
            }
        }

        close() {
            super.close();
            let parent = this.element.parentNode;
            if (parent) parent.removeChild(this.element);
        }

        get rotationOrigin() {
            return this.center
        }

        get x() {
            return this._x
        }

        get y() {
            return this._y
        }

        set x(value) {
            this._x = value;
            TweenLite.set(this.element, { x: value });
        }

        set y(value) {
            this._y = value;
            TweenLite.set(this.element, { y: value });
        }

        get position() {
            let transform = this.element._gsTransform;
            let x = transform.x;
            let y = transform.y;
            return { x, y }
        }

        get origin() {
            let p = this.fromNodeToPage(0, 0);
            return Points.fromPageToNode(this.container.element, p)
        }

        get bounds() {
            let stage = this.container.element.getBoundingClientRect();
            let rect = this.element.getBoundingClientRect();
            return {
                top: rect.top - stage.top,
                left: rect.left - stage.left,
                width: rect.width,
                height: rect.height
            }
        }

        get center() {
            let r = this.bounds;
            let w2 = r.width / 2;
            let h2 = r.height / 2;
            //   if (this.resizable) {
            //             w2 *= this.scale
            //             h2 *= this.scale
            //         }
            var x = r.left + w2;
            var y = r.top + h2;
            return { x, y }
        }

        set rotation(radians) {
            let rad = radians; // Angle.normalize(radians)
            let degrees = Angle.radian2degree(rad);
            TweenLite.set(this.element, { rotation: degrees });
            this._rotation = rad;
        }

        set rotationDegrees(degrees) {
            let deg = degrees; // Angle.normalizeDegree(degrees)
            TweenLite.set(this.element, { rotation: deg });
            this._rotation = Angle.degree2radian(deg);
        }

        get rotation() {
            return this._rotation
        }

        get rotationDegrees() {
            return this._rotation
        }

        set scale(scale) {
            TweenLite.set(this.element, {
                scale: scale,
                transformOrigin: this.transformOrigin
            });
            this._scale = scale;
        }

        get scale() {
            return this._scale
        }

        get containerBounds() {
            return this.container.bounds
        }

        get containerPolygon() {
            return this.container.polygon
        }

        mapPositionToContainerPoint(point) {
            return this.container.mapPositionToPoint(point)
        }

        capture(event) {
            return true
        }

        reset() {
            TweenLite.set(this.element, this.initialValues);
        }

        hide() {
            TweenLite.to(this.element, 0.1, {
                display: 'none',
                onComplete: e => {
                    this.element.parentNode.removeChild(this.element);
                }
            });
        }

        show() {
            TweenLite.set(this.element, { display: 'block' });
        }

        showAt(p, rotationDegrees) {
            TweenLite.set(this.element, {
                display: 'block',
                x: p.x,
                y: p.y,
                rotation: rotationDegrees,
                transformOrigin: this.transformOrigin
            });
        }

        bringToFront() {
            // this.element.parentNode.appendChild(this.element)
            // uo: On Chome and Electon appendChild leads to flicker
            TweenLite.set(this.element, { zIndex: DOMScatter.zIndex++ });
        }

        isDescendant(parent, child) {
            let node = child.parentNode;
            while (node != null) {
                if (node == parent) {
                    return true
                }
                node = node.parentNode;
            }
            return false
        }

        fromPageToNode(x, y) {
            return Points.fromPageToNode(this.element, { x, y })
        }

        fromNodeToPage(x, y) {
            return Points.fromNodeToPage(this.element, { x, y })
        }

        _move(delta) {
            // UO: We need to keep TweenLite's _gsTransform and the private
            // _x and _y attributes aligned
            let x = this.element._gsTransform.x;
            let y = this.element._gsTransform.y;
            if (this.movableX) {
                x += delta.x;
            }
            if (this.movableY) {
                y += delta.y;
            }
            this._x = x;
            this._y = y;
            TweenLite.set(this.element, { x: x, y: y });
        }

        resizeAfterTransform(zoom) {
            if (this.onResize) {
                let w = this.width * this.scale;
                let h = this.height * this.scale;
                let event = new ResizeEvent(this, { width: w, height: h });
                this.onResize(event);
            }
        }

        startResize(e) {
            e.preventDefault();
            let event = new CustomEvent('resizeStarted');

            let oldPostition = {
                x: this.element.getBoundingClientRect().left,
                y: this.element.getBoundingClientRect().top
            };
            this.bringToFront();

            this.element.style.transformOrigin = '0% 0%';

            let newPostition = {
                x: this.element.getBoundingClientRect().left,
                y: this.element.getBoundingClientRect().top
            };

            let offset = Points.subtract(oldPostition, newPostition);

            this.oldX = e.clientX;
            this.oldY = e.clientY;

            e.target.setAttribute('resizing', 'true');
            e.target.setPointerCapture(e.pointerId);

            TweenLite.to(this.element, 0, { css: { left: '+=' + offset.x + 'px' } });
            TweenLite.to(this.element, 0, { css: { top: '+=' + offset.y + 'px' } });

            this.element.dispatchEvent(event);
        }

        resize(e) {
            e.preventDefault();

            let rotation = Angle.radian2degree(this.rotation);
            rotation = (rotation + 360) % 360;
            let event = new CustomEvent('resized');
            if (e.target.getAttribute('resizing') == 'true') {
                let deltaX = e.clientX - this.oldX;
                let deltaY = e.clientY - this.oldY;

                let r = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                let phi = Angle.radian2degree(Math.atan2(deltaX, deltaY));

                phi = (phi + 630) % 360;
                let rot = (rotation + 90 + 630) % 360;

                let diffAngle = (0 + rot + 360) % 360;
                let phiCorrected = (phi + diffAngle + 360) % 360;

                let resizeW = r * Math.cos(Angle.degree2radian(phiCorrected));
                let resizeH = -r * Math.sin(Angle.degree2radian(phiCorrected));

                if (
                    (this.element.offsetWidth + resizeW) / this.scale > (this.width * 0.5) / this.scale &&
                    (this.element.offsetHeight + resizeH) / this.scale > (this.height * 0.3) / this.scale
                )
                    TweenLite.to(this.element, 0, {
                        width: this.element.offsetWidth + resizeW / this.scale,
                        height: this.element.offsetHeight + resizeH / this.scale
                    });

                this.oldX = e.clientX;
                this.oldY = e.clientY;
                this.onResizing();

                this.element.dispatchEvent(event);
            }
        }

        stopResize(e) {
            e.preventDefault();

            let event = new CustomEvent('resizeEnded');
            let oldPostition = {
                x: this.element.getBoundingClientRect().left,
                y: this.element.getBoundingClientRect().top
            };
            this.element.style.transformOrigin = '50% 50%';
            let newPostition = {
                x: this.element.getBoundingClientRect().left,
                y: this.element.getBoundingClientRect().top
            };
            let offset = Points.subtract(oldPostition, newPostition);

            TweenLite.to(this.element, 0, { css: { left: '+=' + offset.x + 'px' } });
            TweenLite.to(this.element, 0, { css: { top: '+=' + offset.y + 'px' } });

            e.target.setAttribute('resizing', 'false');

            this.element.dispatchEvent(event);
        }
    }

    DOMScatter.zIndex = 1000;

    /* eslint-disable no-console */

    class CardWrapper extends Object {
        constructor(domNode, { triggerSVGClicks = true, allowClickDistance = 44 } = {}) {
            super();
            this.domNode = domNode;
            this.triggerSVGClicks = triggerSVGClicks;
            this.allowClickDistance = allowClickDistance;
            this.tapNodes = new Map();
            this.tapHandler = new Map();
        }

        handleClicks() {
            this.domNode.addEventListener(
                'click',
                event => {
                    if (event.isTrusted) {
                        Events$1.stop(event);
                        if (this.triggerSVGClicks && this.isSVGNode(event.target)) {
                            this.tap(event, 'triggerSVGClicks');
                        }
                    }
                },
                true
            );
        }

        handleClicksAsTaps() {
            this.domNode.addEventListener(
                'click',
                event => {
                    if (event.isTrusted) {
                        Events$1.stop(event);
                    }
                    this.tap(event);
                },
                true
            );
        }

        isClickPrevented(node) {
            if (node == null) {
                return false
            }
            if (node.style && node.style.pointerEvents == 'none') {
                return true
            }
            return this.isClickPrevented(node.parentNode)
        }

        isClickable(node) {
            if (node == null) return false
            //  console.log("isClickable", node, this.isClickPrevented(node))
            if (this.isClickPrevented(node)) {
                return false
            }
            if (node.tagName == 'A' && node.hasAttribute('href')) return true
            if (node.hasAttribute('onclick')) return true
            return false
        }

        hasClickHandler(node) {
            if (node == null) return false
            if (this.tapNodes.has(node)) return true
            for (let [selector, handler] of this.tapHandler.entries()) {
                for (let obj of this.domNode.querySelectorAll(selector)) {
                    if (node == obj) {
                        return true
                    }
                }
            }
            return false
        }

        /**
         * Returns an array of all active nodes.
         * Unfortunately we cannot search for all nodes with an attached 'click' event listener
         * See https://stackoverflow.com/questions/11455515/how-to-check-whether-dynamically-attached-event-listener-exists-or-not
         * Therefore we can only detect the following standard cases:
         * I. All clickable objects like activeNodes
         * II. Objects that have been attached a click handler by the scatter itself via
         */
        activeNodes() {
            let result = [];
            for (let node of this.domNode.querySelectorAll('*')) {
                if (this.isClickable(node)) result.push(node);
                if (this.hasClickHandler(node)) result.push(node);
            }
            return result
        }

        nearestActive(event) {
            let element = this.domNode;
            let activeNodes = this.activeNodes();
            let globalClick = event.center ? event.center : { x: event.x, y: event.y };
            let localClick = Points.fromPageToNode(element, globalClick);

            let clickRects = activeNodes.map(link => {
                let rect = link.getBoundingClientRect();
                let topLeft = Points.fromPageToNode(element, rect);
                let center = Points.fromPageToNode(element, {
                    x: rect.x + rect.width / 2,
                    y: rect.y + rect.height / 2
                });
                return {
                    x: topLeft.x,
                    y: topLeft.y,
                    width: rect.width,
                    height: rect.height,
                    center,
                    link
                }
            });

            let distances = [];
            clickRects.forEach(rect => {
                let distance = Points.distanceToRect(localClick, rect);
                distances.push(parseInt(distance));
            });

            let closestClickIndex = distances.indexOf(Math.min(...distances));
            let closestClickable = activeNodes[closestClickIndex];
            if (distances[closestClickIndex] < this.allowClickDistance) {
                return closestClickable
            }
            return null
        }

        isSVGNode(node) {
            return node.ownerSVGElement || node.tagName == 'svg'
        }

        simulateClick(node, event) {
            /* https://stackoverflow.com/questions/49564905/is-it-possible-to-use-click-function-on-svg-tags-i-tried-element-click-on-a
             proposes the dispatchEvent solution. But this leads to problems in flippable.html hiding the back page.
            Therefore we use the original click event (see constructor). */
            if (this.isSVGNode(node)) {
                if (this.triggerSVGClicks) {
                    let click = new Event('click');
                    node.dispatchEvent(click);
                }
                return
            }
            node.click();
        }

        nodeTapped(node, event) {
            console.log('nodeTapped', node, this.isClickable(node));
            if (this.isClickable(node)) {
                this.simulateClick(node, event);
                return true
            }
            if (this.tapNodes.has(node)) {
                let handler = this.tapNodes.get(node);
                handler(event, node);
                return true
            }
            for (let [selector, handler] of this.tapHandler.entries()) {
                console.log('nodeTapped', selector);
                for (let obj of this.domNode.querySelectorAll(selector)) {
                    if (node == obj) {
                        handler(event, node);
                        return true
                    }
                }
            }
            return false
        }

        tap(event, calledBy = 'unknown') {
            if (event.isTrusted) {
                let node = this.nearestActive(event);
                console.log('tap', node);
                this.nodeTapped(node, event);

                /*  let node = document.elementFromPoint(event.clientX, event.clientY)
                if (!this.nodeTapped(node, event)) {
                    node = this.nearestActive(event)
                    this.nodeTapped(node, event)
                } */
            }
        }

        onTap(objOrSelector, handler) {
            if (typeof objOrSelector == 'string') {
                this.tapHandler.set(objOrSelector, handler);
            } else {
                this.tapNodes.set(objOrSelector, handler);
            }
        }
    }

    /* eslint-disable no-unused-vars */

    class CardLoader {
        constructor(
            src,
            {
                x = 0,
                y = 0,
                width = 1000,
                height = 800,
                maxWidth = null,
                maxHeight = null,
                scale = 1,
                minScale = 0.5,
                maxScale = 1.5,
                rotation = 0
            } = {}
        ) {
            this.src = src;
            this.x = x;
            this.y = y;
            this.scale = scale;
            this.rotation = rotation;
            this.maxScale = maxScale;
            this.minScale = minScale;
            this.wantedWidth = width;
            this.wantedHeight = height;
            this.maxWidth = maxWidth != null ? maxWidth : window.innerWidth;
            this.maxHeight = maxHeight != null ? maxHeight : window.innerHeight;
            this.addedNode = null;
        }

        unload() {
            if (this.addedNode) {
                this.addedNode.remove();
                this.addedNode = null;
            }
        }
    }

    class DOMFlip {
        constructor(
            domScatterContainer,
            flipTemplate,
            frontLoader,
            backLoader,
            {
                closeOnMinScale = false,
                flipDuration = 1,
                fadeDuration = 0.2,
                overdoScaling = 1,
                autoLoad = false,
                center = null,
                preloadBack = false,
                translatable = true,
                scalable = true,
                rotatable = true,
                tapDelegateFactory = null,
                onFront = null,
                onBack = null,
                onClose = null,
                onUpdate = null,
                onRemoved = null,
                onLoaded = null
            } = {}
        ) {
            this.domScatterContainer = domScatterContainer;
            this.id = getId();
            this.flipDuration = flipDuration;
            this.fadeDuration = fadeDuration;
            this.closeOnMinScale = closeOnMinScale;
            this.flipTemplate = flipTemplate;
            this.frontLoader = frontLoader;
            this.backLoader = backLoader;
            this.translatable = translatable;
            this.scalable = scalable;
            this.rotatable = rotatable;
            this.tapDelegateFactory = tapDelegateFactory;
            this.onFrontFlipped = onFront;
            this.onBackFlipped = onBack;
            this.onClose = onClose;
            this.onRemoved = onRemoved;
            this.onUpdate = onUpdate;
            this.onLoaded = onLoaded;
            this.center = center;
            this.preloadBack = preloadBack;
            this.overdoScaling = overdoScaling;
            if (autoLoad) {
                this.load();
            }
        }

        load() {
            return new Promise((resolve, reject) => {
                let t = this.flipTemplate;
                let dom = this.domScatterContainer.element;
                let wrapper = t.content.querySelector('.flipWrapper');
                wrapper.id = this.id;
                let clone = document.importNode(t.content, true);
                dom.appendChild(clone);
                // We cannot use the document fragment itself because it
                // is not part of the main dom tree. After the appendChild
                // call we can access the new dom element by id
                this.cardWrapper = dom.querySelector('#' + this.id);
                let front = this.cardWrapper.querySelector('.front');
                this.frontLoader.load(front).then(loader => {
                    this.frontLoaded(loader).then(obj => {
                        if (this.onLoaded) this.onLoaded();
                        resolve(this);
                    });
                });
            })
        }

        frontLoaded(loader) {
            return new Promise((resolve, reject) => {
                let scatter = new DOMScatter(this.cardWrapper, this.domScatterContainer, {
                    x: loader.x,
                    y: loader.y,
                    startScale: loader.scale,
                    scale: loader.scale,
                    maxScale: loader.maxScale,
                    minScale: loader.minScale,
                    width: loader.wantedWidth,
                    height: loader.wantedHeight,
                    rotation: loader.rotation,
                    translatable: this.translatable,
                    scalable: this.scalable,
                    rotatable: this.rotatable,
                    overdoScaling: this.overdoScaling,
                    tapDelegate: this.tapDelegateFactory ? new this.tapDelegateFactory(this.cardWrapper) : null
                });

                if (this.center) {
                    scatter.centerAt(this.center);
                }

                if (this.closeOnMinScale) {
                    const removeOnMinScale = function () {
                        if (scatter.scale <= scatter.minScale) {
                            this.flippable.close();

                            // 'Disable' overdoscaling to avoid weird jumps on close.
                            scatter.minScale /= scatter.overdoScaling;
                            scatter.overdoScaling = 1;

                            //Remove callback
                            if (scatter.onTransform) {
                                let callbackIdx = scatter.onTransform.indexOf(removeOnMinScale);
                                scatter.onTransform.splice(callbackIdx, 1);
                            }
                        }
                    }.bind(this);
                    scatter.addTransformEventCallback(removeOnMinScale);
                }

                let flippable = new DOMFlippable(this.cardWrapper, scatter, this);
                let back = this.cardWrapper.querySelector('.back');

                if (this.preloadBack) {
                    this.backLoader.load(back).then(loader => {
                        this.setupFlippable(flippable, loader);
                    });
                }
                this.flippable = flippable;
                resolve(this);
            })
        }

        centerAt(p) {
            this.center = p;
            this.flippable.centerAt(p);
        }

        zoom(scale) {
            this.flippable.zoom(scale);
        }

        setupFlippable(flippable, loader) {
            flippable.wantedWidth = loader.wantedWidth;
            flippable.wantedHeight = loader.wantedHeight;
            flippable.wantedScale = loader.scale;
            flippable.minScale = loader.minScale;
            flippable.maxScale = loader.maxScale;
            flippable.scaleButtons();
        }

        start({ targetCenter = null } = {}) {
            this.flippable.showFront();
            if (this.preloadBack) {
                this.flippable.start({ duration: this.flipDuration, targetCenter });
            } else {
                let back = this.cardWrapper.querySelector('.back');
                let flippable = this.flippable;
                this.backLoader.load(back).then(loader => {
                    this.setupFlippable(flippable, loader);
                    flippable.start({ duration: this.flipDuration, targetCenter });
                });
            }
        }

        fadeOutAndRemove() {
            TweenLite.to(this.cardWrapper, this.fadeDuration, {
                opacity: 0,
                onComplete: () => {
                    this.cardWrapper.remove();
                }
            });
        }

        closed() {
            this.unload();
        }

        unload() {
            if (!this.preloadBack) {
                this.backLoader.unload();
            }
        }
    }

    class DOMFlippable {
        constructor(element, scatter, flip) {
            // Set log to console.log or a custom log function
            // define data structures to store our touchpoints in

            this.element = element;
            this.flip = flip;
            this.card = element.querySelector('.flipCard');
            this.front = element.querySelector('.front');
            this.back = element.querySelector('.back');
            this.flipped = false;
            this.scatter = scatter;
            this.onFrontFlipped = flip.onFrontFlipped;
            this.onBackFlipped = flip.onBackFlipped;
            this.onClose = flip.onClose;
            this.onRemoved = flip.onRemoved;
            this.onUpdate = flip.onUpdate;

            this.wantedWidth = scatter.width;
            this.wantedHeight = scatter.height;
            this.wantedScale = scatter.scale;
            this.minScale = scatter.minScale;
            this.maxScale = scatter.maxScale;

            this.flipDuration = flip.flipDuration;
            this.fadeDuration = flip.fadeDuration;
            scatter.addTransformEventCallback(this.scatterTransformed.bind(this));

            TweenLite.set(this.element, { perspective: 5000 });
            TweenLite.set(this.card, { transformStyle: 'preserve-3d' });
            TweenLite.set(this.back, { rotationY: -180 });
            TweenLite.set([this.back, this.front], {
                backfaceVisibility: 'hidden',
                perspective: 5000
            });
            TweenLite.set(this.front, { visibility: 'visible' });
            this.infoBtn = element.querySelector('.infoBtn');
            this.backBtn = element.querySelector('.backBtn');
            this.closeBtn = element.querySelector('.closeBtn');
            /* Buttons are not guaranteed to exist. */
            if (scatter.tapDelegate == null) {
                let tapDelegate = new CardWrapper(element);
                scatter.tapDelegate = tapDelegate;
            }
            if (this.infoBtn) {
                scatter.tapDelegate.onTap(this.infoBtn, event => {
                    this.flip.start();
                });
                this.enable(this.infoBtn);
            }
            if (this.backBtn) {
                scatter.tapDelegate.onTap(this.backBtn, event => {
                    this.start();
                });
            }
            if (this.closeBtn) {
                scatter.tapDelegate.onTap(this.closeBtn, event => {
                    this.close();
                });
                this.enable(this.closeBtn);
            }
            this.scaleButtons();
            this.bringToFront();
        }

        close() {
            this.disable(this.infoBtn);
            this.disable(this.closeBtn);
            if (this.onClose) {
                this.onClose(this);
                this.flip.closed();
            } else {
                this.scatter.zoom(0.1, {
                    animate: this.fadeDuration,
                    onComplete: () => {
                        this.element.remove();
                        this.flip.closed();
                        if (this.onRemoved) {
                            this.onRemoved.call(this);
                        }
                    }
                });
            }
        }

        showFront() {
            TweenLite.set(this.front, { visibility: 'visible' });
        }

        centerAt(p) {
            this.scatter.centerAt(p);
        }

        zoom(scale) {
            this.scatter.zoom(scale);
        }

        get buttonScale() {
            let iscale = 1.0;

            if (this.scatter != null) {
                let scale = this.scatter.scale || 1;
                iscale = 1.0 / scale;
            }
            return iscale
        }

        scaleButtons() {
            TweenLite.set([this.infoBtn, this.backBtn, this.closeBtn], {
                scale: this.buttonScale
            });
        }

        bringToFront() {
            this.scatter.bringToFront();
            TweenLite.set(this.element, { zIndex: DOMScatter.zIndex++ });
        }

        clickInfo() {
            this.bringToFront();
            this.infoBtn.click();
        }

        scatterTransformed(event) {
            this.scaleButtons();
        }

        targetRotation(alpha) {
            let ortho = 90;
            let rest = alpha % ortho;
            let delta = 0.0;
            if (rest > ortho / 2.0) {
                delta = ortho - rest;
            } else {
                delta = -rest;
            }
            return delta
        }

        infoValues(info) {
            let startX = this.element._gsTransform.x;
            let startY = this.element._gsTransform.y;
            let startAngle = this.element._gsTransform.rotation;
            let startScale = this.element._gsTransform.scaleX;
            let w = this.element.style.width;
            let h = this.element.style.height;
            // eslint-disable-next-line no-console
            console.log(info, startX, startY, startAngle, startScale, w, h);
        }

        show(element, duration = 0, alpha = 1) {
            if (element) {
                TweenLite.to(element, duration, { autoAlpha: alpha }); // visibility: 'visible', display: 'initial'})
            }
        }

        hide(element, duration = 0, alpha = 0) {
            if (element) {
                TweenLite.to(element, duration, { autoAlpha: alpha }); // {visibility: 'hidden', display: 'none'})
            }
        }

        enable(button) {
            this.show(button, this.fadeDuration);
            if (button) {
                TweenLite.set(button, { pointerEvents: 'auto' });
            }
        }

        disable(button) {
            this.hide(button, this.fadeDuration);
            if (button) {
                TweenLite.set(button, { pointerEvents: 'none' });
            }
        }

        start({ targetCenter = null } = {}) {
            this.bringToFront();
            console.log('flippable start', this.flipped);
            if (!this.flipped) {
                this.startX = this.element._gsTransform.x;
                this.startY = this.element._gsTransform.y;
                this.startAngle = this.element._gsTransform.rotation;
                this.startScale = this.element._gsTransform.scaleX;
                this.startWidth = this.element.style.width;
                this.startHeight = this.element.style.height;
                this.scatterStartWidth = this.scatter.width;
                this.scatterStartHeight = this.scatter.height;
                this.show(this.back);
                this.disable(this.infoBtn);
                this.disable(this.closeBtn);
            } else {
                this.show(this.front, this.fadeDuration);
                this.disable(this.backBtn);
            }
            let { scalable, translatable, rotatable } = this.scatter;
            this.saved = { scalable, translatable, rotatable };
            this.scatter.scalable = false;
            this.scatter.translatable = false;
            this.scatter.rotatable = false;
            this.scatter.killAnimation();

            this.flipped = !this.flipped;
            let targetY = this.flipped ? 180 : 0;
            let targetZ = this.flipped ? this.startAngle + this.targetRotation(this.startAngle) : this.startAngle;
            let targetScale = this.flipped ? this.wantedScale : this.startScale;
            let w = this.flipped ? this.wantedWidth : this.startWidth;
            let h = this.flipped ? this.wantedHeight : this.startHeight;
            let dw = this.wantedWidth - this.scatter.width;
            let dh = this.wantedHeight - this.scatter.height;
            let tc = targetCenter;
            let xx = tc != null ? tc.x - w / 2 : this.startX - dw / 2;
            let yy = tc != null ? tc.y - h / 2 : this.startY - dh / 2;
            let x = this.flipped ? xx : this.startX;
            let y = this.flipped ? yy : this.startY;

            let onUpdate = this.onUpdate !== null ? () => this.onUpdate(this) : null;
            TweenLite.to(this.card, this.flipDuration, {
                rotationY: targetY,
                ease: Power1.easeOut,
                transformOrigin: '50% 50%',
                onUpdate,
                onComplete: e => {
                    if (this.flipped) {
                        //this.hide(this.front)
                        this.enable(this.backBtn);
                        this.show(this.backBtn);

                        if (this.onFrontFlipped) {
                            this.onFrontFlipped(this);
                        }
                    } else {
                        if (this.onBackFlipped == null) {
                            this.enable(this.infoBtn, this.fadeDuration);
                            this.enable(this.closeBtn, this.fadeDuration);
                        } else {
                            this.onBackFlipped(this);
                        }
                        this.flip.unload();
                    }
                    this.scatter.scale = targetScale;
                    this.scaleButtons();
                    this.scatter.rotationDegrees = targetZ;
                    this.scatter.width = this.flipped ? w : this.scatterStartWidth;
                    this.scatter.height = this.flipped ? h : this.scatterStartHeight;

                    let { scalable, translatable, rotatable } = this.saved;
                    this.scatter.scalable = scalable;
                    this.scatter.translatable = translatable;
                    this.scatter.rotatable = rotatable;
                },
                force3D: true
            });
            // See https://greensock.com/forums/topic/7997-rotate-the-shortest-way/
            TweenLite.to(this.element, this.flipDuration / 2, {
                scale: targetScale,
                ease: Power1.easeOut,
                rotationZ: targetZ + '_short',
                transformOrigin: '50% 50%',
                width: w,
                height: h,
                x: x,
                y: y,
                onComplete: e => {
                    if (this.flipped) {
                        this.hide(this.front);
                        // this.hide(this.infoBtn)
                    } else {
                        this.hide(this.back);
                        // this.show(this.infoBtn)
                    }
                }
            });
        }
    }

    /* ES Lint  */
    /* globals PIXI, console*/

    const registeredTiles = new Map();
    /** Implements a baseTexture cache. The last textures are kept for reuse  */
    let keepTextures = 0;
    const keptTextures = [];
    const lateTextures = new Map();
    let lastSweepTime = 0;
    let sweepInterval = 2000.0;

    /** The current Tile implementation simply uses PIXI.Sprites.
     *
     * BTW: PIXI.extras.TilingSprite is not appropriate. It should be used for
     * repeating patterns.
     **/
    class Tile extends PIXI.Sprite {
        constructor(texture, url) {
            super(texture);
            this.url = url;
            this.register(url);
        }

        /**
         * Static method to enable keeping of base textures
         *
         * @static
         * @param {*} value
         * @memberof Tile
         */
        static enableKeepTextures(value = 1000) {
            keepTextures = value;
        }

        /**
         * Returns true iff the url is pending
         *
         * @static
         * @param {*} url
         * @returns
         * @memberof Tile
         */
        /*static isPending(url) {
            return pendingTiles.has(url) && pendingTiles.get(url) > 0
        } */

        static isObsolete(url) {
            if (registeredTiles.has(url) && registeredTiles.get(url) > 0) {
                return false
            }
            return true
        }

        /**
         * Loads a tile from image using the PIXI.Texture.from method.
         *
         * @static
         * @param {*} imageId
         * @param {*} crossorigin
         * @param {*} scaleMode
         * @returns
         * @memberof Tile
         */
        static fromImage(imageId, crossorigin, scaleMode) {
            return new Tile(PIXI.Texture.from(imageId, crossorigin, scaleMode), imageId)
        }

        /**
         * Registers the tile in the global reference counter for textures
         *
         * @param {*} url
         * @param {boolean} [debug=false]
         * @memberof Tile
         */
        register(url, debug = false) {
            //Tile.unschedule(url)
            if (registeredTiles.has(url)) {
                let tiles = registeredTiles.get(url);
                tiles.add(this);
                if (debug) console.log('Tile.register', url, tiles.size);
            } else {
                registeredTiles.set(url, new Set([this]));
                if (debug) console.log('Tile.register', url, 1);
            }
        }

        /**
         * Unregisters the rile in the global reference counter for textures
         *
         * @returns {number} The number of how often a texture is used.
         * @memberof Tile
         */
        unregister() {
            let tiles = registeredTiles.get(this.url);
            tiles.delete(this);
            if (tiles.size == 0) {
                registeredTiles.delete(this.url);
                return 0
            }
            return tiles.size
        }

        /**
         * Destroys this sprite and optionally its texture and children
         *
         * @param {*} options  Part of the PIXI API, but ignored in the implementation
         * @memberof Tile
         */
        destroy(options, debug = false) {
            let count = this.unregister();

            if (keepTextures > 0) {
                keptTextures.push({ url: this.url, texture: this.texture });

                let opts = { children: true, texture: false, baseTexture: false };
                if (debug) console.log('Tile.destroy', registeredTiles.size, opts);
                super.destroy(opts);

                while (keptTextures.length > keepTextures) {
                    let { url, texture } = keptTextures.shift();
                    if (Tile.isObsolete(url)) {
                        texture.destroy(true); // Destroy base as well
                        if (debug) console.log('Destroying texture and baseTexture', url);
                    }
                }
            } else {
                // No longer registered and not pending
                if (count <= 0) {
                    // && !Tile.isPending(this.url)
                    let opts = { children: true, texture: true, baseTexture: true };
                    super.destroy(opts);
                    if (debug) console.log('Tile.destroy', registeredTiles.size, opts);
                } else {
                    let opts = { children: true, texture: false, baseTexture: false };
                    if (debug) console.log('Tile.destroy', registeredTiles.size, opts);
                    super.destroy(opts);
                }
                if (this.parent != null) {
                    // UO: Emit warning and remove
                    console.warn('Destroying tile with parent. Hiding instead');
                    this.visible = false;
                }
            }
        }

        /**
         * Returns an available texture that can be reused
         *
         * @param {*} url
         * @returns
         * @memberof Tile
         */
        static textureAvailable(url) {
            if (registeredTiles.has(url)) {
                let tiles = registeredTiles.get(url);
                for (let tile of tiles.values()) {
                    //console.log("Reusing cached texture", tile.parent)
                    return tile.texture
                }
            }
            return null
        }

        /**
         * Specialized renderWebGL to avoid freezing system
         *
         * @param {*} renderer
         * @memberof Tile
         */
        renderWebGL(renderer) {
            try {
                super.renderWebGL(renderer);
            } catch (e) {
                // We want persistent logging here
                Logging.error('Error in Tile.renderWebGL: ' + e.message);
            }
        }

        /**
         * Removes lately arrived texture if they have not been touched in the meanwhile.
         *
         * @static
         * @memberof Tile
         */
        static sweepLateTextures() {
            let now = performance.now();
            if (now > lastSweepTime + sweepInterval) {
                lastSweepTime = now;
                let count = 0;
                for (let [url, texture] of lateTextures.entries()) {
                    if (texture) {
                        let base = texture.baseTexture;
                        if (base != null && base.touched == 0) {
                            texture.destroy(true);
                            //console.info("Sweeping ", url)
                            count += 1;
                            lateTextures.delete(url);
                        }
                    }
                }
                if (count > 0) console.log('Sweeping textures', count);
            }
        }

        /**
         * Texture received too late. We do not need it.
         * @param {*} url
         * @param {*} texture
         */
        static lateTexture(url, texture) {
            lateTextures.set(url, texture);
            //console.warn("Tile.lateTexture")
            // We cannot destroy the texture since we got errors in t.renderWebGL.
            // Perhaps we can destroy unsed textures later on
            Tile.sweepLateTextures();
        }

        static printInfos() {
            let references = new Map();
            let multiples = 0;
            for (let [url, tiles] of registeredTiles.entries()) {
                let count = tiles.size;
                references.set(url, count);
                if (count > 1) {
                    multiples += 1;
                }
            }
            console.log({ multiples, references });
        }
    }

    /**
     * A Tile Loader component that can be plugged into a Tiles Layer.
     */
    class TileLoader {
        constructor(tiles) {
            this.debug = false;
            this.tiles = tiles;
            this.setup();
        }

        /** Setup collections and instance vars. */
        setup() {
            this.map = new Map(); // Map {url : [ col, row]}
            this.loading = new Set(); // Set url
            this.loaded = new Map(); // Map {url : sprite }
            this.loadQueue = [];
        }

        /** Schedules a tile url for loading. The loading itself must be triggered
        by a call to loadOneTile or loadAll

        * @param {String} url - the url of the texture / tile
        * @param {Number} col - the tile col
        * @param {Number} row - the tile row
        **/
        schedule(url, col, row) {
            if (this.loaded.has(url)) return false
            if (this.loading.has(url)) return false

            //Tile.schedule(url)
            this.map.set(url, [col, row]);
            this.loading.add(url);
            this.loadQueue.push(url);
            return true
        }

        unschedule(url) {
            if (this.loaded.has(url)) this.loaded.delete(url);
            if (this.loading.has(url)) this.loading.delete(url);
            //Tile.unschedule(url)
            this.loadQueue = this.loadQueue.filter(item => item != url);
        }

        /** Cancels loading by clearing the load queue **/
        cancel() {
            this.loadQueue = [];
            this.loading.clear();
        }

        /** Destroys alls collections. **/
        destroy() {
            this.setup();
        }

        /** Private method. Informs the tile layer about a texture for a given url.
         * Creates the sprite for the loaded texture and informs the tile layer.
         * @param {String} url - the url
         * @param {Object} texture - the loaded resource
         **/
        _textureAvailable(url, col, row, texture) {
            let tile = this.loaded.get(url);
            if (tile != null) {
                console.warn('Tile already loaded');
                tile.unregister();
            }
            try {
                tile = new Tile(texture, url);
                this.loaded.set(url, tile);
                this.tiles.tileAvailable(tile, col, row, url);
            } catch (error) {
                console.warn('Tile loading error', error);
            }
        }
    }

    /**
     * Uses the PIXI Loader but can be replaced with othe loaders implementing
     * the public methods without underscore.
     * Calls the Tiles.tileAvailable method if the texture is available.
     **/
    class PIXITileLoader extends TileLoader {
        constructor(tiles, compression) {
            super(tiles);
            this.destroyed = false;
            this.loader = new PIXI.Loader();
            this.loader.on('load', this._onLoaded.bind(this));
            this.loader.on('error', this._onError.bind(this));
            if (compression) {
                this.loader.use(PIXI.compressedTextures.ImageParser.use);
            }
        }

        schedule(url, col, row) {
            // Overwritten schedule to avoid BaseTexture and Texture already loaded errors.
            if (this.loaded.has(url)) return false
            if (this.loading.has(url)) return false

            //Tile.schedule(url)
            let reusableTexture = Tile.textureAvailable(url);
            if (reusableTexture) {
                if (this.debug) console.log('Texture reusable', reusableTexture);
                this._textureAvailable(url, col, row, reusableTexture);
                return false
            }
            let texture = PIXI.utils.TextureCache[url];
            if (texture) {
                if (this.debug) console.log('Texture already loaded', texture);
                this._textureAvailable(url, col, row, texture);
                return false
            }
            let base = PIXI.utils.BaseTextureCache[url];
            if (base) {
                if (this.debug) console.log('BaseTexture already loaded', base);
                let texture = new PIXI.Texture(base);
                this._textureAvailable(url, col, row, texture);
                return false
            }
            return super.schedule(url, col, row)
        }

        /** Load one and only one of the scheduled tiles **/
        loadOneTile() {
            if (this.destroyed) return
            this._loadOneTile();
        }

        /** Load all scheduled tiles **/
        loadAll() {
            if (this.destroyed) return
            this._loadAllTiles();
        }

        /** Destroys the loader completly **/
        destroy() {
            this.destroyed = true;
            super.destroy();
            try {
                this.loader.reset();
            } catch (error) {
                console.warn('Error while resetting loader', error);
            }
        }

        _onError(loader, error) {
            console.warn('Cannot load', error);
        }

        /** Private method. Called by the PIXI loader after each successfull
         * loading of a single tile.
         * Creates the sprite for the loaded texture and informs the tile layer.
         * @param {Object} loader - the loader instance
         * @param {Object} resource - the loaded resource with url and texture attr
         **/
        _onLoaded(loader, resource) {
            if (this.destroyed) {
                let texture = resource.texture;
                let url = resource.url;
                Tile.lateTexture(url, texture);
                console.warn('Received resource after destroy', texture);
                return
            }
            try {
                let [col, row] = this.map.get(resource.url);
                this._textureAvailable(resource.url, col, row, resource.texture);
            } catch (err) {
                console.warn('Texture unavailable: ' + err.message);
            }
        }

        /** Private method: loads one tile from the queue. **/
        _loadOneTile(retry = 1) {
            //console.log("_loadOneTile")
            if (this.destroyed) {
                //console.warn("_loadOneTile after destroy")
                return
            }
            if (this.loader.loading) {
                setTimeout(() => {
                    this._loadOneTile();
                }, retry);
                return
            }
            if (this.loadQueue.length > 0) {
                let url = this.loadQueue.pop();
                this.loader.add(url, url);
                this.loader.load();
            }
        }

        /** Private method: loads all tiles from the queue in batches. Batches are
        helpfull to avoid loading tiles that are no longer needed because the
        user has already zoomed to a different level.**/
        _loadAllTiles(batchSize = 8, retry = 16) {
            if (this.destroyed) {
                return
            }
            if (this.loadQueue.length > 0) {
                if (this.loader.loading) {
                    //console.log("Loader busy", this.loadQueue.length)
                    setTimeout(() => {
                        this._loadAllTiles();
                    }, retry);
                    return
                }
                let i = 0;
                let urls = [];
                while (i < batchSize && this.loadQueue.length > 0) {
                    let url = this.loadQueue.pop();
                    if (!this.loaded.has(url)) {
                        let resource = this.loader.resources[url];
                        if (resource) {
                            console.log('Resource already added', url);
                        } else {
                            urls.push(url);
                            i += 1;
                        }
                    }
                }
                this.loader.add(urls).load(() => {
                    this._loadAllTiles();
                });
            }
        }
    }

    /**
     * Uses Workers but can be replaced with other loaders implementing
     * the public methods without underscore.
     * Calls the Tiles.tileAvailable method if the texture is available.
     **/
    class WorkerTileLoader extends TileLoader {
        constructor(tiles, workerPath) {
            super(tiles);

            let worker = (this.worker = new Worker(workerPath));

            worker.onmessage = event => {
                if (event.data.success) {
                    let { url, col, row, buffer } = event.data;
                    //console.log("WorkerTileLoader.loaded", url, buffer)
                    //let CompressedImage = PIXI.compressedTextures.CompressedImage
                    let compressed = PIXI.compressedTextures.loadFromArrayBuffer(buffer, url);
                    let base = new PIXI.BaseTexture(compressed);
                    let texture = new PIXI.Texture(base);
                    this._textureAvailable(url, col, row, texture);
                }
            };
        }

        loadOne() {
            if (this.loadQueue.length > 0) {
                let url = this.loadQueue.pop();
                let [col, row] = this.map.get(url);
                let tile = [col, row, url];
                this.worker.postMessage({ command: 'load', tiles: [tile] });
            }
        }

        loadAll() {
            let tiles = [];
            while (this.loadQueue.length > 0) {
                let url = this.loadQueue.pop();
                let [col, row] = this.map.get(url);
                tiles.push([col, row, url]);
            }
            this.worker.postMessage({ command: 'load', tiles });
        }

        cancel() {
            super.cancel();
            this.worker.postMessage({ command: 'abort' });
        }

        destroy() {
            this.worker.postMessage({ command: 'abort' });
            this.worker.terminate();
            this.worker = null;
            super.destroy();
        }
    }

    /**
     * A layer of tiles that represents a zoom level of a DeepZoomImage as a grid
     * of sprites.
     * @constructor
     * @param {number} level - the zoom level of the tile layer
     * @param {DeepZoomImage} view - the zoomable image the layer belongs to
     * @param {number} scale - the scale of the tile layer
     * @param {number} cols - the number of columns of the layer
     * @param {number} rows - the number of rows of the layer
     * @param {number} width - the width of the layer in pixel
     * @param {number} height - the height of the layer in pixel
     * @param {number} tileSize - the size of a single tile in pixel
     * @param {number} overlap - the overlap of the tiles in pixel
     * @param {number} fadeInTime - time needed to fade in tiles if TweenLite is set
     **/
    class Tiles extends PIXI.Container {
        constructor(level, view, scale, cols, rows, width, height, tileSize, overlap, fadeInTime = 0.33) {
            super();
            this.debug = false;
            this.showGrid = false;
            this.view = view;
            this.level = level;
            this.cols = cols;
            this.rows = rows;
            this.pixelWidth = width;
            this.pixelHeight = height;
            this.tileSize = tileSize;
            this.overlap = overlap;
            this.needed = new Map(); // url as key, [col, row] as value
            this.requested = new Set();
            this.available = new Map();
            this.scale.set(scale, scale);
            this.tileScale = scale;
            this.fadeInTime = fadeInTime;
            this.keep = false;
            if (this.view.useWorker && view.info.compression && view.info.compression.length > 0) {
                this.loader = new WorkerTileLoader(this, this.view.useWorker);
            } else {
                this.loader = new PIXITileLoader(this, view.info.compression);
            }
            this.interactive = false;
            this._highlight = null;

            this._info = null;

            this._centerPoint = null;
            this._boundsRect = null;

            this.infoColor = Colors.random();
            this.pprint();
            this.destroyed = false;
        }

        /** Tests whether all tiles are loaded. **/
        isComplete() {
            return this.cols * this.rows === this.children.length
        }

        /** Returns the highligh graphics layer for debugging purposes.
         **/
        get highlight() {
            if (this._highlight == null) {
                let graphics = new PIXI.Graphics();
                graphics.beginFill(0xffff00, 0.1);
                graphics.lineStyle(2, 0xffff00);
                graphics.drawRect(1, 1, this.tileSize - 2, this.tileSize - 2);
                graphics.endFill();
                graphics.interactive = false;
                this._highlight = graphics;
            }
            return this._highlight
        }

        /** Returns the highligh graphics layer for debugging purposes.
         **/
        get info() {
            if (this._info == null) {
                let graphics = new PIXI.Graphics();
                graphics.lineStyle(4, 0xff0000);
                graphics.interactive = false;
                this._info = graphics;
                this.addChild(this._info);
            }
            return this._info
        }

        /** Helper method pretty printing debug information. **/
        pprint() {
            if (this.debug)
                console.log(
                    'Tiles level: ' +
                    this.level +
                    ' scale: ' +
                    this.scale.x +
                    ' cols: ' +
                    this.cols +
                    ' rows: ' +
                    this.rows +
                    ' w: ' +
                    this.pixelWidth +
                    ' h: ' +
                    this.pixelHeight +
                    ' tsize:' +
                    this.tileSize
                );
        }

        /** Computes the tile position and obeys the overlap.
         * @param {number} col - The column of the tile
         * @param {number} row - The row of the tile
         * @returns {PIXI.Point} obj
         **/
        tilePosition(col, row) {
            let x = col * this.tileSize;
            let y = row * this.tileSize;
            let overlap = this.overlap;
            if (col != 0) {
                x -= overlap;
            }
            if (row != 0) {
                y -= overlap;
            }
            return new PIXI.Point(x, y)
        }

        /** Computes the tile size without overlap
         * @param {number} col - The column of the tile
         * @param {number} row - The row of the tile
         * @returns {PIXI.Point} obj
         **/
        tileDimensions(col, row) {
            let w = this.tileSize;
            let h = this.tileSize;
            let pos = this.tilePosition(col, row);
            if (col == this.cols - 1) {
                w = this.pixelWidth - pos.x;
            }
            if (row == this.rows - 1) {
                h = this.pixelHeight - pos.y;
            }
            return new PIXI.Point(w, h)
        }

        /** Method to support debugging. Highlights the specified tile at col, row **/
        highlightTile(col, row) {
            if (col > -1 && row > -1 && col < this.cols && row < this.rows) {
                let graphics = this.highlight;
                let dim = this.tileDimensions(col, row);
                graphics.position = this.tilePosition(col, row);
                graphics.clear();
                graphics.beginFill(0xff00ff, 0.1);
                graphics.lineStyle(2, 0xffff00);
                graphics.drawRect(1, 1, dim.x - 2, dim.y - 2);
                graphics.endFill();
                this.addChild(this.highlight);
            } else {
                this.removeChild(this.highlight);
            }
        }

        /** Loads the tiles for the given urls and adds the tiles as sprites.
         * @param {array} urlpos - An array of URL, pos pairs
         * @param {boolean} onlyone - Loads only on tile at a time if true
         **/
        loadTiles(urlpos, onlyone, refCol, refRow) {
            if (this.showGrid) {
                this.highlightTile(refCol, refRow);
            }
            urlpos.forEach(d => {
                let [url, col, row] = d;
                if (this.loader.schedule(url, col, row)) {
                    if (onlyone) {
                        return this.loader.loadOneTile()
                    }
                }
            });
            this.loader.loadAll();
        }

        /** Private method: add a red border to a tile for debugging purposes. **/
        _addTileBorder(tile, col, row) {
            let dim = this.tileDimensions(col, row);
            let graphics = new PIXI.Graphics();
            graphics.beginFill(0, 0);
            graphics.lineStyle(2, 0xff0000);
            graphics.drawRect(1, 1, dim.x - 2, dim.y - 2);
            graphics.endFill();
            tile.addChild(graphics);
        }

        /** Adds a tile. **/
        addTile(tile, col, row, url) {
            if (this.available.has(url)) {
                console.warn('Trying to add available tile');
                return
            }
            this.addChildAt(tile, 0);
            this.available.set(url, tile);
            if (this.destroyed) {
                console.warn('Adding to destroyed tiles layer');
            }
            // this._addTileBorder(tile, col, row)
        }

        /** Called by the loader after each successfull loading of a single tile.
         * Adds the sprite to the tile layer.
         * @param {Object} tile - the loaded tile sprite
         * @param {Number} col - the col position
         * @param {Number} row - the rowposition
         **/
        tileAvailable(tile, col, row, url) {
            let pos = this.tilePosition(col, row);
            if (this.showGrid) {
                this._addTileBorder(tile, col, row);
            }
            tile.position = pos;
            tile.interactive = false;
            if (TweenLite) {
                tile.alpha = 0;
                TweenLite.to(tile, this.fadeInTime, { alpha: this.alpha });
            }
            this.addTile(tile, col, row, url);
        }

        /** Destroys the tiles layer and destroys the loader. Async load calls are
         * cancelled.
         **/
        destroy() {
            this.destroyed = true;
            this.loader.destroy();
            super.destroy({ children: true }); // Calls destroyChildren
            this.available.clear();
            this.requested.clear();
            this.needed.clear();
        }

        destroyTile(url, tile) {
            this.loader.unschedule(url);
            this.removeChild(tile);
            tile.destroy();
            this.available.delete(url);
        }

        destroyTileByUrl(url) {
            if (this.available.has(url)) {
                let tile = this.available.get(url);
                this.destroyTile(url, tile);
            }
        }

        /* Destroys the tiles which are not with the bounds of the app to free
         * memory.
         **/
        destroyTiles(quadTrees) {
            let count = 0;
            for (let [url, tile] of this.available.entries()) {
                if (!quadTrees.has(url)) {
                    this.destroyTile(url, tile);
                    count += 1;
                }
            }
            if (count && this.debug) console.log('destroyTiles', this.level, count);
        }

        destroyUnneededTiles() {
            let count = 0;
            for (let [url, tile] of this.available.entries()) {
                if (!this.needed.has(url)) {
                    this.destroyTile(url, tile);
                    count += 1;
                }
            }
            if (count && this.debug) console.log('destroyUnneededTiles', this.level, count);
        }

        highlightInfos() {
            let graphics = this.info;
            let color = this.infoColor;
            graphics.clear();
            graphics.lineStyle(2, color);
            for (let [col, row] of this.needed.values()) {
                let dim = this.tileDimensions(col, row);
                let pos = this.tilePosition(col, row);
                graphics.beginFill(color, 0.2);
                graphics.drawRect(pos.x + 1, pos.y + 1, dim.x - 2, dim.y - 2);
                graphics.endFill();
            }
            let r = this._boundsRect;
            if (r != null) {
                graphics.lineStyle(20, color);
                graphics.drawRect(r.x, r.y, r.width, r.height);
                graphics.moveTo(r.x, r.y);
                graphics.lineTo(r.x + r.width, r.y + r.height);

                graphics.moveTo(r.x, r.y + r.height);
                graphics.lineTo(r.x + r.width, r.y);
            }

            let p = this._centerPoint;
            if (p != null) {
                graphics.drawCircle(p.x, p.y, 20);
            }
        }

        tintTiles(quadTrees) {
            for (let [url, tile] of this.available.entries()) {
                if (!quadTrees.has(url)) tile.tint = 0xff0000;
            }
        }

        untintTiles() {
            for (let [url, tile] of this.available.entries()) {
                tile.tint = 0xffffff;
            }
        }
    }

    function isEven(n) {
        return n % 2 == 0
    }

    /**
     * A utility class that holds information typically provided by DZI files, i.e.
     * height and width of the overall image, overlap, and image type.
     *
     * @constructor
     * @param {obj} attrs - A JSON-Object holding the listed keys and values
     * @example
     *     {
     *         "tileSize": 1024,
     *         "format": "jpeg",
     *         "overlap": 1,
     *         "height": 4794,
     *         "width": 4095,
     *         "clip": { "minLevel": 12, "maxLevel": 20, "startCol": 301436, "startRow": 354060 },
     *                   // optional: minLevel and maxLevel define the level bounds
     *                   // startCol: first col at maxLevel
     *                   // startRow: first row at maxLevel
     *         "path": "var/Vermeer/Vermeer_files",
     *         "type": "dzi",  // optional: dzi (default) or map
     *         "urlTileTemplate": "{path}/{level}/{column}/{row}.{format}"
     *           // optional: {path}/{level}/{column}_{row}.{format} (default) or
     *           // a template String with the format of the URL
     *     }
     */
    class DeepZoomInfo {
        constructor(attrs) {
            for (let key in attrs) {
                this[key] = attrs[key];
            }
            this.maxLevel = 0; // The highest level number, typically corresponds to the
            // number in the file system for the folder with tiles
            this.clip = this.clip || null; // e.g. { level: 12, col: 301436, row: 354060 }
            this.type = this.type || 'dzi';
            this.urlTileTemplate = this.urlTileTemplate || '{path}/{level}/{column}_{row}.{format}';
            this.setupDimensions();
        }

        /* Computes the needed number of layers from the width and height
         *  of the image. Note that this includes the level 0, i.e. 0 ... 4
         * means that 5 levels exist.
         **/
        numLevels() {
            let maxDimension = Math.max(this.width, this.height);
            let boundary = this.type === 'dzi' ? 1 : this.tileSize;
            let numLevels = 0;
            while (maxDimension >= boundary) {
                maxDimension /= 2;
                numLevels++;
            }
            return numLevels
        }

        /** Computes the scale at the given level.
         * @param {number} level - The level of the wanted layer
         * @returns {number} scale
         **/
        getScale(level) {
            let scale = 1;
            if (this.type === 'dzi') {
                scale = Math.pow(0.5, this.maxLevel - level + 1);
            } else {
                scale = Math.pow(0.5, this.maxLevel - level);
            }
            return scale
        }

        /** Computes the scaled width and height of the given level.
         * @param {number} level - The level of the wanted layer
         * @returns {array} size - The width and height
         **/
        getDimensions(level) {
            let scale = this.getScale(level);
            let w = Math.ceil(this.width * scale);
            let h = Math.ceil(this.height * scale);
            return [w, h]
        }

        /** Computes the number of cols and rows of tiles.
         * @param {number} level - The level of the wanted layer
         * @returns {array} size - The cols and rows
         **/
        getNumTiles(level) {
            let dim = this.getDimensions(level);
            let cols = Math.ceil(dim[0] / this.tileSize);
            let rows = Math.ceil(dim[1] / this.tileSize);
            if (this.clip) {
                let rest = this.rests[level];
                if (rest) {
                    if (rest.restCol) {
                        cols += 1;
                    }
                    if (rest.restRows) {
                        rows += 1;
                    }
                }
            }
            return [cols, rows]
        }

        setupDimensions(loadBaseImage = false) {
            /** Setup instance variables and load the base image, i.e. the largest
            image that can be represented as a single tile.
            @private
            **/
            let ww = this.width;
            let hh = this.height;
            let scale = 1.0;
            let level = 0;
            let single = 0;
            const tsize = this.tileSize;

            if (this.clip) {
                this.baseLevel = this.clip.minLevel;
                this.maxLevel = this.clip.maxLevel;
                this.baseImage = null;
                this.size = this.getDimensions(this.baseLevel);
                this.offsets = {};
                this.rests = {};
                let startCol = this.clip.startCol;
                let startRow = this.clip.startRow;
                let floatStartCol = startCol;
                let floatStartRow = startRow;
                for (let i = this.maxLevel; i >= this.baseLevel; i--) {
                    this.offsets[i] = { startCol, startRow };
                    let restCol = floatStartCol % 1;
                    let restRow = floatStartRow % 1;
                    this.rests[i] = { restCol, restRow };
                    startCol = Math.floor(startCol / 2);
                    startRow = Math.floor(startRow / 2);
                    floatStartCol /= 2;
                    floatStartRow /= 2;
                }
            } else {
                const boundary = this.type === 'dzi' ? 1.0 : tsize;
                while (ww > boundary && hh > boundary) {
                    if (ww >= tsize && hh >= tsize) {
                        single += 1;
                    }
                    scale = scale / 2.0;
                    ww = Math.ceil(this.width * scale);
                    hh = Math.ceil(this.height * scale);
                    level += 1;
                }
                this.baseLevel = level - single;
                this.maxLevel = this.numLevels() - 1;
                this.baseURL = this.urlForTile(this.baseLevel, 0, 0, false);

                if (loadBaseImage) {
                    this.imageForURL(this.baseURL, e => {
                        this.size = [e.target.naturalWidth, e.target.naturalHeight];
                        this.baseImage = e.target;
                    });
                } else {
                    this.baseImage = null;
                    this.size = this.getDimensions(this.baseLevel);
                }
            }
        }

        get maxLoadableLevel() {
            if (this.clip) {
                return this.maxLevel
            }
            return this.type === 'dzi' ? this.maxLevel : this.maxLevel
        }

        /** Computes the url for the given level, column and and row.
         * @param {number} level - The level of the wanted layer
         * @param {number} column - The column of the tile
         * @param {number} row - The row of the tile
         * @returns {string} url
         **/
        urlForTile(level, column, row, compressed = true) {
            let format = this.format;
            if (compressed && this.compression) {
                let supported = Capabilities.isIOS ? 'pvr' : 'dds';
                if (this.compression.indexOf(supported) >= 0) {
                    format = supported;
                }
            }
            if (this.clip) {
                let offset = this.offsets[level];
                if (offset) {
                    let { startCol, startRow } = offset;
                    column += startCol;
                    row += startRow;
                }
            }
            let url = this.urlTileTemplate
                .replace(/\{path\}/g, this.path)
                .replace(/\{level\}/g, level)
                .replace(/\{row\}/g, row)
                .replace(/\{column\}/g, column)
                .replace(/\{format\}/g, format);
            return url
        }

        /** Loads the image for the given url and executes a callback function
        on completion.
        * @param {string} url - The url of the tile
        * @param {function} complete - The callback function
        * @returns {Image} obj
        **/
        imageForURL(url, complete) {
            let img = new Image();
            img.onload = complete.bind(this);
            img.src = url;
            return img
        }

        /** Computes the columns and rows as well as scaled width and height.
         * @param {number} level - The level of the wanted layer
         * @returns {array} [cols, rows, width, height]
         **/
        dimensions(level) {
            let dim = this.getDimensions(level);
            let tiles = this.getNumTiles(level);
            return [tiles[0], tiles[1], dim[0], dim[1]]
        }

        test() {
            //console.log("w=" + this.width + " h=" + this.height + " maxlevel=" + this.maxLevel + " base=" + this.baseLevel)
            for (let i = 0; i <= this.maxLevel; i++) {
                console.log(' ' + i + ' -> ' + this.getScale(i) + ' [' + this.dimensions(i) + ']');
            }
            console.log(this.urlForTile(this.baseLevel, 0, 0));
        }
    }

    /**
     * A utility class that describes a quad tree of tiles. Each tile on a given
     * level has up to four corresponding tiles on the next level. A TileQuadNode
     * uses the attributes nw (i.e. northwest), ne, sw, se to link to the
     * quad nodes on the next level. The previous attributes links to the quad
     * one level below that holds the given quad as nw, ne, sw, or se.
     * We use this node class because we need a representation of tiles that are
     * needed but not loaded yet to compute tiles which can be abandoned to reduce
     * the memory pressure.
     *
     * @constructor
     * @param {level} Number - The level the quad node belongs to
     * @param {col} Number - The col of the quad
     * @param {row} Number - The level the quad node belongs to
     * @param {url} String - The level the quad node belongs to
     */
    class TileQuadNode {
        constructor(level, col, row, url) {
            this.level = level;
            this.col = col;
            this.row = row;
            this.url = url;
            this.nw = null;
            this.ne = null;
            this.sw = null;
            this.se = null;
            this.previous = null;
        }

        /** Return True if this node has no successors and can be used as
        an indicator of tiles to free.
        **/
        noQuads() {
            if (this.previous === null) return false
            return this.nw === null && this.ne === null && this.sw === null && this.se === null
        }

        /** Unlink the given quad node

        * @param {node} TileQuadNode - The TileQuadNode to remove
        **/
        unlink(node) {
            if (this.nw === node) this.nw = null;
            if (this.ne === node) this.ne = null;
            if (this.sw === node) this.sw = null;
            if (this.se === node) this.se = null;
        }

        /** Link this quad node to the given previous node. Use the north
        * and west flags to address nw, ne, sw, and se.

        * @param {node} TileQuadNode - The TileQuadNode to remove
        * @param {north} Boolean - Link to north (true) or south (false)
        * @param {west} Boolean - Link to west (true) or east (false)
        **/
        link(north, west, previous) {
            this.previous = previous;
            if (north) {
                if (west) {
                    previous.nw = this;
                } else {
                    previous.ne = this;
                }
            } else {
                if (west) {
                    previous.sw = this;
                } else {
                    previous.se = this;
                }
            }
        }
    }

    /**
     * The main class of a deeply zoomable image that is represented by a hierarchy
     * of tile layers for each zoom level. This gives the user the impression that
     * even huge pictures (up to gigapixel-images) can be zoomed instantaneously,
     * since the tiles at smaller levels are scaled immediately and overloaded by
     * more detailed tiles at the larger level as fast as possible.

     * @constructor
     * @param {DeepZoomInfo} deepZoomInfo - Information extracted from a JSON-Object
     */
    class DeepZoomImage extends PIXI.Container {
        constructor(
            deepZoomInfo,
            {
                debug = false,
                shadow = false,
                center = false,
                world = null, // Defines the world bounds the images lives in
                highResolution = true,
                autoLoadTiles = true,
                useWorker = '',
                minimumLevel = 0,
                alpha = 1,
                app = window.app
            } = {}
        ) {
            super();
            this.app = app;
            this.debug = debug;
            this.shadow = shadow;
            this.world = world;
            this.useWorker = useWorker;
            this.resolution = highResolution ? Math.round(window.devicePixelRatio) : 1;
            this.alpha = alpha;
            this.fastLoads = 0;
            this.active = true;
            this.autoLoadTiles = autoLoadTiles;
            this.minimumLevel = minimumLevel;
            this.quadTrees = new Map(); // url as keys, TileQuadNodes as values
            this.setup(deepZoomInfo, center);
        }

        get point() {
            if (this._point == null) {
                let graphics = new PIXI.Graphics();
                graphics.lineStyle(2, 0x00ff00);
                graphics.drawCircle(0, 0, 2);
                graphics.interactive = false;
                this._point = graphics;
            }
            return this._point
        }

        /** Reads the DeepZoomInfo object and initializes all tile layers.
         * Called by the constructor.
         * Creates the sprite for the loaded texture and add the sprite to the tile
         * layer.
         * @param {Object} deepZoomInfo - the DeepZoomInfo instance
         * @param {boolean} center - If true ensures that the pivot is set to the center
         **/
        setup(deepZoomInfo, center) {
            this.info = deepZoomInfo;
            this.interactive = true;
            this.tileLayers = {};

            this._foreground = null;
            this.tileContainer = new PIXI.Container();
            this.tileContainer.interactive = false;

            let [w, h] = this.baseSize;
            if (this.shadow) {
                this.filters = [new PIXI.filters.DropShadowFilter({ rotation: 45, distance: 3 })];
            }
            this.addChild(this.tileContainer);

            if (deepZoomInfo.clip) {
                let mask = new PIXI.Graphics();
                mask.alpha = 0.0000001;
                mask.beginFill(0xff0000, 1);
                mask.drawRect(0, 0, w, h);
                mask.endFill();
                this.mask = mask;
                this.addChild(mask);
                this.minimumLevel = deepZoomInfo.baseLevel;
            }
            this.currentLevel = Math.max(this.minimumLevel, deepZoomInfo.baseLevel);
            //console.log("autoLoadTiles", this.autoLoadTiles)
            if (this.autoLoadTiles) {
                this.setupTiles(center);
            }
        }

        /** Default setup method for tiles. Loads all tiles of the current level.
        Can be overwritten in subclasses.
        @param {boolean} center - If true ensures that the pivot is set to the center
        **/
        setupTiles(center = false) {
            // First load background tile
            let tiles = this.ensureAllTiles(this.currentLevel);
            if (center) {
                this.pivot.set(w / 2, h / 2);
            }
            let scaleLevel = this.levelForScale(1);
            this.ensureAllTiles(scaleLevel);
        }

        removeTileQuadNode(level, col, row, url) {
            if (this.quadTrees.has(url)) {
                let quad = this.quadTrees.get(url);
                this.tileQuadRemoved(quad);
                this.quadTrees.delete(url);
            }
        }

        addTileQuadNode(level, col, row, url) {
            if (this.quadTrees.has(url)) return this.quadTrees.get(url)
            let quad = new TileQuadNode(level, col, row, url);
            this.quadTrees.set(url, quad);
            this.tileQuadAdded(quad);
            return quad
        }

        tileQuadRemoved(quad) {
            let below = quad.previous;
            // if (this.debug) console.log("tileQuadRemoved", quad)
            if (below) {
                below.unlink(quad);
                if (below.noQuads()) {
                    if (this.debug) console.log('Removed tile below');
                    let levelBelow = quad.level - 1;
                    if (levelBelow < this.minimumLevel) return
                    let c = Math.floor(quad.col / 2);
                    let r = Math.floor(quad.row / 2);
                    let urlBelow = this.info.urlForTile(levelBelow, c, r);
                    if (this.quadTrees.has(urlBelow)) {
                        this.removeTileQuadNode(levelBelow, c, r, urlBelow);
                    }
                }
            }
        }

        tileQuadAdded(quad) {
            let levelBelow = quad.level - 1;
            if (levelBelow < this.minimumLevel) return
            //if (this.debug) console.log("tileQuadAdded", quad)
            let c = Math.floor(quad.col / 2);
            let r = Math.floor(quad.row / 2);
            let urlBelow = this.info.urlForTile(levelBelow, c, r);
            let below = null;
            if (!this.quadTrees.has(urlBelow)) {
                below = this.addTileQuadNode(levelBelow, c, r, urlBelow);
                quad.link(isEven(quad.row), isEven(quad.col), below);
            }
        }

        /** Returns the tile layer level that corresponds to the given scale.
         * @param {number} scale - the scale factor
         **/
        levelForScale(scale) {
            let level = Math.round(Math.log2(scale * this.resolution)); // Math.floor(Math.log2(event.scale))+1
            let newLevel = this.info.baseLevel + Math.max(level, 0);
            return Math.min(newLevel, this.info.maxLoadableLevel)
        }

        /** Returns the tile layer level that corresponds to the given scale.
         * @param {number} scale - the scale factor
         **/
        levelAndAlphaForScale(scale) {
            let value = Math.log2(scale * this.resolution);
            let level = Math.round(value);
            let newLevel = this.info.baseLevel + Math.max(level, 0);

            return { level: Math.min(newLevel, this.info.maxLoadableLevel), alpha: value - level }
        }

        /** Adds a tile layer to the DeepZoomImage.
         * @param {string} key - the access key
         * @param {Tiles} tiles - the tile layer object
         **/
        addTiles(key, tiles) {
            if (key in this.tileLayers) {
                console.warn('Tiles already availabl', key);
            }
            this.tileContainer.addChild(tiles);
            this.tileLayers[key] = tiles;
        }

        destroyTiles(key) {
            let tiles = this.tileLayers[key];
            this.tileContainer.removeChild(tiles);
            tiles.destroy();
            delete this.tileLayers[key];
        }

        /** Getter for PIXI.Container foreground layer.
         * Adds a PIXI.Container if necessary.
         **/
        get foreground() {
            if (this._foreground == null) {
                this._foreground = new PIXI.Container();
                this.addChild(this._foreground);
            }
            return this._foreground
        }

        /** Getter for the DeepZoomInfo base level size.
         **/
        get baseSize() {
            return this.info.getDimensions(this.info.baseLevel)
        }

        /** Getter for the current scaled size in pixels.
         **/
        get pixelSize() {
            let [w, h] = this.baseSize;
            return [w * this.scale.x, h * this.scale.y]
        }

        /** Getter for the max scale factor.
         **/
        get maxScale() {
            let delta = this.info.maxLevel - this.info.baseLevel;
            return (Math.pow(2, delta) / this.resolution) * 2
        }

        /** Getter for the current width.
         **/
        get width() {
            return this.pixelSize[0]
        }

        /** Getter for the current height.
         **/
        get height() {
            return this.pixelSize[1]
        }

        /* Overrides PIXI.Container.hitArea()
         * Allows to optimize the hit testing. Container with hit areas are directly
         * hit tested without consideration of children.
         */
        get hitArea() {
            // Defining the hitArea resulted hitting the scatter in masked area
            // when a mask was used (@TÃ¼sch[submaps]). Removing the hitArea() altogether
            // broke the interaction in other projects (@googleart).
            // Fix: When masked, the hitArea is ignored by returning null.
            // TODO: test if childs are hittested, without setting interactiveChildren.
            // Opel, 03-05-2018
            if (this.mask) {
                return null
            }
            return this
        }

        /* Overrides PIXI.Container.contains()
         * Allows to optimize the hit testing.
         */
        contains(x, y) {
            let [w, h] = this.baseSize;
            return x >= 0 && x <= w && y >= 0 && y <= h
        }

        /** Overrides PIXI.Container._calculateBounds()
         * Only considers the base size and reduces the calculation to a single
         * rect.
         */
        _calculateBounds() {
            let [w, h] = this.baseSize;
            this._bounds.addFrame(this.transform, 0, 0, w, h);
        }

        /** Overrides PIXI.Container.calculateBounds()
         * Skips the children and only considers the deep zoom base size. Calls
         * the also overwritten _calculateBounds method.
         */
        calculateBounds() {
            this._bounds.clear();
            this._calculateBounds();
            this._lastBoundsID = this._boundsID;
        }

        /** Returns a single sprite that can be used a thumbnail representation of
         * large images.
         * @return {Sprite} sprite - A sprite with a single tile texture
         */
        thumbnail() {
            return new PIXI.Sprite.from(this.info.baseURL)
        }

        /** Returns a list of all tiles of a given level.
         * @param {Tiles} tiles - the grid of tiles
         * @param {number} level - The zoom level of the grid
         * @return {Array[]} - An array of [url, col, row] arrays
         **/
        allTiles(tiles, level) {
            let result = [];
            for (let col = 0; col < tiles.cols; col++) {
                for (let row = 0; row < tiles.rows; row++) {
                    let url = this.info.urlForTile(level, col, row);
                    result.push([url, col, row]);
                }
            }
            return result
        }

        worldBounds() {
            let viewBounds = this.app.scene.bounds || this.app.scene.getBounds();
            // Using getBounds extends visible scope after loading tiles and leads
            // to excessive loading. So we prefer bounds over getBounds()
            if (this.world != null) {
                let bounds = this.world.bounds;
                let x = Math.max(-bounds.width, bounds.x);
                let y = Math.max(-bounds.height, bounds.y);
                let width = Math.min(viewBounds.width, bounds.width);
                let height = Math.min(viewBounds.height, bounds.height);
                //console.log("worldBounds new", { x, y, width, height })
                return { x, y, width, height }
            }
            //console.log("worldBounds old", viewBounds)
            return viewBounds
        }

        /** Loads all tiles that are needed to fill the app bounds.
         * @param {Tiles} tiles - the grid of tiles
         * @param {number} level - The zoom level of the grid
         * @param {boolean} debug
         * @return {Array[]} - An array of [url, col, row] arrays
         */
        neededTiles(tiles, level, debug = false) {
            let needed = [];
            let tsize = tiles.tileSize;
            let worldBounds = this.worldBounds();
            let maxWidth = worldBounds.width;
            let maxHeight = worldBounds.height;

            let pointInWindow = new PIXI.Point();
            let worldTopLeft = new PIXI.Point(worldBounds.x, worldBounds.y);
            let worldBottomRight = new PIXI.Point(worldBounds.x + maxWidth, worldBounds.y + maxHeight);
            let worldCenter = new PIXI.Point(worldBounds.x + maxWidth / 2, worldBounds.y + maxHeight / 2);
            let tilesCenter = tiles.toLocal(worldCenter);

            let topLeft = tiles.toLocal(worldTopLeft);
            let bottomRight = tiles.toLocal(worldBottomRight);
            tiles._centerPoint = tilesCenter;
            let bounds = new PIXI.Rectangle(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);

            tiles._boundsRect = bounds;

            /* UO: we need a toLocal call here since the transform may need an update
            which is guaranteed by the toLocal method. */
            let centerCol = Math.floor(tilesCenter.x / tsize);
            let centerRow = Math.floor(tilesCenter.y / tsize);

            // Expand because we want to test for included centers
            bounds.x -= tsize / 2;
            bounds.y -= tsize / 2;
            bounds.width += tsize;
            bounds.height += tsize;

            try {
                let maxTilesWidth = Math.ceil(maxWidth / tsize);
                let maxTilesHeight = Math.ceil(maxHeight / tsize);

                maxTilesWidth += 2;
                maxTilesHeight += 2;

                let startCol = Math.max(0, centerCol - maxTilesWidth);
                let endCol = Math.min(tiles.cols, centerCol + maxTilesWidth);

                let startRow = Math.max(0, centerRow - maxTilesHeight);
                let endRow = Math.min(tiles.rows, centerRow + maxTilesHeight);

                for (let col = startCol; col < endCol; col++) {
                    let cx = (col + 0.5) * tsize;
                    for (let row = startRow; row < endRow; row++) {
                        let cy = (row + 0.5) * tsize;
                        let tileCenter = new PIXI.Point(cx, cy);
                        if (bounds.contains(tileCenter.x, tileCenter.y)) {
                            let url = this.info.urlForTile(level, col, row);
                            needed.push([url, col, row]);
                        }
                    }
                }
            } catch (error) {
                console.warn(error.message);
            }
            return { centerCol, centerRow, needed }
        }

        /** Returns all changed tiles for a given level.
         * @param {Tiles} tiles - the grid of tiles
         * @param {number} level - The zoom level of the grid
         * @return {object} - An object with the keys added and removed which values are [url, col, row] arrays
         */
        changedTiles(tiles, level) {
            if (this.debug) console.time('changedTiles');
            let changed = { added: [], removed: [] };
            let newNeeded = new Map();
            let { centerCol, centerRow, needed } = this.neededTiles(tiles, level);
            needed.forEach(d => {
                let [url, col, row] = d;
                newNeeded.set(url, [col, row]);
                if (!tiles.requested.has(url)) {
                    changed.added.push(d);
                }
            });
            for (let url of tiles.needed.keys()) {
                if (!newNeeded.has(url)) {
                    let [col, row] = tiles.needed.get(url);
                    changed.removed.push([url, col, row]);
                }
            }
            tiles.needed = newNeeded;
            if (this.debug) console.log(newNeeded);
            if (this.debug) console.timeEnd('changedTiles');
            return { centerCol, centerRow, changed }
        }

        /** Populates all tiles for a given level.
         * @param {Tiles} tiles - the grid of tiles
         * @param {number} level - The zoom level of the grid
         */
        populateAllTiles(tiles, level) {
            let all = this.allTiles(tiles, level);
            for (let [url, col, row] of all) {
                this.addTileQuadNode(level, col, row, url);
            }
            tiles.loadTiles(all, false, 0, 0);
        }

        /** Loads all tiles that are needed to fill the browser window.
         * If the optional about parameter is provided (as a point with col as x,
         * and row as y attr) the tiles are sorted by the distance to this point.
         *
         * @param {Tiles} tiles - the grid of tiles
         * @param {number} level - The zoom level of the grid
         * Optional parameter:
         * @param {boolean} onlyone - if true only one tile is loaded
         * @param {PIXI.Point} about - point of interaction
         */
        populateTiles(tiles, level, { onlyone = false, about = null } = {}) {
            if (tiles.isComplete()) return
            let referenceCol = -1;
            let referenceRow = -1;
            let { centerCol, centerRow, changed } = this.changedTiles(tiles, level);
            if (about != null) {
                // We want to load tiles in the focus of the user first, therefore
                // we sort according to the distance of the focus of interaction
                let refPoint = this.toLocal(about);
                let scaledTileSize = tiles.tileSize * tiles.tileScale;
                referenceCol = Math.floor(refPoint.x / scaledTileSize);
                referenceRow = Math.floor(refPoint.y / scaledTileSize);
            } else {
                referenceCol = centerCol;
                referenceRow = centerRow;
            }
            referenceCol = centerCol;
            referenceRow = centerRow;

            let removed = changed.removed;
            for (let [url, col, row] of removed) {
                this.removeTileQuadNode(level, col, row, url);
            }
            let added = changed.added;
            if (added.length == 0) return
            for (let [url, col, row] of added) {
                this.addTileQuadNode(level, col, row, url);
            }
            let ref = new PIXI.Point(referenceCol, referenceRow);
            // Note: The array must be sorted in a way that the nearest tiles
            // are at the end of the array since the load queue uses Array.push
            // Array.pop
            added.sort((a, b) => {
                let aa = new PIXI.Point(a[1], a[2]);
                let bb = new PIXI.Point(b[1], b[2]);
                let da = Points.distance(aa, ref);
                let db = Points.distance(bb, ref);
                return db - da
            });
            tiles.loadTiles(added, onlyone, referenceCol, referenceRow);
        }

        /** Private method: creates all tiles for a given level.
         * @param {number} level - The zoom level of the grid
         * @return {Tiles} - tiles
         */
        _createTiles(key, level) {
            let [cols, rows, w, h] = this.info.dimensions(level);
            let increasedLevels = level - this.info.baseLevel;
            let invScale = Math.pow(0.5, increasedLevels);
            let tiles = new Tiles(level, this, invScale, cols, rows, w, h, this.info.tileSize, this.info.overlap);
            this.addTiles(key, tiles);
            if (this.info.clip) {
                let rest = this.info.rests[level];
                if (rest) {
                    let x = rest.restCol * this.info.tileSize * invScale;
                    let y = rest.restRow * this.info.tileSize * invScale;
                    tiles.x = -x;
                    tiles.y = -y;
                }
            }
            return tiles
        }

        /** Ensures that all needed tiles of a given level are loaded. Creates
         * a new Tiles layer if necessary
         * @param {number} level - The zoom level of the grid
         * @return {Tiles} tiles
         */
        ensureTiles(level, about) {
            let key = level.toString();
            if (key in this.tileLayers) {
                let tiles = this.tileLayers[key];
                this.populateTiles(tiles, level, { about: about });
                return tiles
            }
            let tiles = this._createTiles(key, level);
            this.populateTiles(tiles, level, { about: about });
            //console.log("ensureTiles", level)
            return tiles
        }

        untintTiles(level) {
            let key = level.toString();
            if (key in this.tileLayers) {
                let tiles = this.tileLayers[key];
            }
        }

        /** Ensures that all tiles of a given level are loaded.
         * @param {number} level - The zoom level of the grid
         */
        ensureAllTiles(level) {
            let key = level.toString();
            if (key in this.tileLayers) {
                let tiles = this.tileLayers[key];
                this.populateAllTiles(tiles, level);
                tiles.keep = true;
                return
            }
            let tiles = this._createTiles(key, level);
            this.populateAllTiles(tiles, level);
            tiles.keep = true;
            return tiles
        }

        hideTilesAboveLevel(level) {
            Object.keys(this.tileLayers).forEach(key => {
                let tiles = this.tileLayers[key];
                if (tiles.level > level) {
                    tiles.visible = false;
                }
            });
        }

        /** Destroys all tiles above a given level to ensure that the memory can
         * be reused.
         * @param {number} level - The zoom level of the grid
         */
        destroyTilesAboveLevel(level) {
            Object.keys(this.tileLayers).forEach(key => {
                let tiles = this.tileLayers[key];
                if (tiles.level > level && !tiles.keep) {
                    for (let url of tiles.available.keys()) {
                        let quad = this.quadTrees.get(url);
                        if (quad) this.removeTileQuadNode(quad);
                    }
                    this.destroyTiles(key);
                }
            });
        }

        destroyAllTiles() {
            Object.keys(this.tileLayers).forEach(key => {
                this.destroyTiles(key);
            });
        }

        /**
         * Tint tiles in all layers that are no longer needed
         *
         * @memberof DeepZoomImage
         */
        tintObsoleteTiles() {
            Object.keys(this.tileLayers).forEach(key => {
                let tiles = this.tileLayers[key];
                tiles.untintTiles();
                if (!tiles.keep) {
                    tiles.tintObsoleteTiles();
                }
            });
        }

        /**
         * Destroy tiles in all layers that are no longer needed
         *
         * @memberof DeepZoomImage
         */
        destroyUnneededTiles() {
            Object.keys(this.tileLayers).forEach(key => {
                let tiles = this.tileLayers[key];
                if (!tiles.keep) {
                    tiles.destroyUnneededTiles();
                }
            });
        }

        /**
         * Destroy tiles in all layers that are no longer needed
         *
         * @memberof DeepZoomImage
         */
        destroyObsoleteTiles() {
            Object.keys(this.tileLayers).forEach(key => {
                let tiles = this.tileLayers[key];
                if (!tiles.keep) {
                    tiles.destroyObsoleteTiles();
                }
            });
        }

        /**
         * Destroy tiles in all layers that are not part of the
         * visible quadTrees
         *
         * @memberof DeepZoomImage
         */
        destroyTiles() {
            Object.keys(this.tileLayers).forEach(key => {
                let tiles = this.tileLayers[key];
                if (!tiles.keep) {
                    tiles.destroyTiles(this.quadTrees);
                }
            });
        }

        /* Tint all tiles
         * @param {number} level - The zoom level of the grid
         */
        tintTilesBelowLevel(level) {
            Object.keys(this.tileLayers).forEach(key => {
                let tiles = this.tileLayers[key];
                if (tiles.level < level) {
                    tiles.tintTiles(this.quadTrees);
                }
            });
        }

        /**
         * Ensure that the given tiles layer is the topmost one and visible.
         * @param {*} tiles
         */
        bringTilesToFront(tiles) {
            this.tileContainer.addChild(tiles);
            tiles.visible = true;
        }

        /** A callback function that can be used by a Scatter view to inform
         * the zoomable image that it has been moved, rotated or scaled, and should
         * load tiles accordingly.
         * @param {PIXI.Point} translated - the movement of the scatter
         * @param {number} scale - the zoom factor
         * @param {PIXI.Point} about - the anchor point of the zoom
         * @param {boolean} fast - informs the callback to return as fast as possible,
         *  i.e. after loading a single tile
         * @param {boolean} debug - log debug infos
         */
        transformed(event) {
            if (!this.active) {
                return
            }
            let key = this.currentLevel.toString();
            let currentTiles = this.tileLayers[key];
            if (typeof currentTiles == 'undefined') {
                return
            }
            if (event.fast) {
                this.fastLoads += 1;
                this.populateTiles(currentTiles, this.currentLevel, {
                    onlyone: false,
                    about: event.about
                });
                if (this.fastLoads == 3) {
                    this.fastLoads = 0;
                } else {
                    return
                }
            }
            if (event.scale == null) {
                this.ensureTiles(this.currentLevel, event.about);
                return
            }

            let level = this.levelForScale(event.scale);
            let newLevel = Math.max(level, this.minimumLevel);
            if (newLevel != this.currentLevel) {
                if (!currentTiles.keep) {
                    currentTiles.loader.cancel();
                }
                this.hideTilesAboveLevel(newLevel);
                currentTiles = this.ensureTiles(newLevel, event.about);
                this.currentLevel = newLevel;
            } else {
                this.ensureTiles(this.currentLevel, event.about);
            }
            this.bringTilesToFront(currentTiles);
            if (this._foreground) {
                this.addChild(this._foreground);
            }
        }

        /**
         *Activates the textures on the DeepZoomImage.
         *
         * @memberof DeepZoomImage
         */
        activate() {
            this.active = true;
            this.destroyTilesAboveLevel(this.currentLevel);
            this.ensureTiles(this.currentLevel, null);
            //console.log("Activate Textures!", this.currentLevel)
        }

        /**
         *Dectivates the textures on the DeepZoomImage.
         *
         * @memberof DeepZoomImage
         */
        deactivate() {
            this.active = false;
            this.destroyAllTiles();
            this.tileContainer.destroy({ children: true });
        }

        throwFinished() {
            //console.log("throwFinished")
            let key = this.currentLevel.toString();
            let currentTiles = this.tileLayers[key];
            if (typeof currentTiles == 'undefined') {
                return
            }
            this.ensureTiles(this.currentLevel);
        }
    }

    let globalScatterLoaderCanvas = null;

    class ScatterLoader extends CardLoader {
        get scatter() {
            return this.src
        }

        unscaledSize() {
            let displayObject = this.scatter.displayObject;
            let w = displayObject.width;
            let h = displayObject.height;
            return [w / displayObject.scale.x, h / displayObject.scale.y]
        }

        scaledSize() {
            let displayObject = this.scatter.displayObject;
            let w = displayObject.width;
            let h = displayObject.height;
            return [w, h]
        }

        cloneScatterImage() {
            let w = this.scatter.width;
            let h = this.scatter.height;
            let isSprite = this.scatter.displayObject instanceof PIXI.Sprite;
            let isDeepZoom = this.scatter.displayObject instanceof DeepZoomImage;
            let resolution = app.renderer.resolution;
            if (isSprite) {
                w = this.scatter.displayObject.texture.width;
                h = this.scatter.displayObject.texture.height;
            } else if (isDeepZoom) {
                let [ww, hh] = this.scatter.displayObject.baseSize;
                w = ww;
                h = hh;
            }
            if (globalScatterLoaderCanvas === null) {
                globalScatterLoaderCanvas = document.createElement('canvas');
            }
            let canvas = globalScatterLoaderCanvas;
            canvas.width = w;
            canvas.height = h;
            let renderer = new PIXI.Renderer({
                width: w,
                height: h,
                view: canvas,
                resolution: resolution
            });

            let displayObject = this.scatter.displayObject;
            let x = displayObject.x;
            let y = displayObject.y;
            let rot = displayObject.rotation;
            let sx = displayObject.scale.x;
            let sy = displayObject.scale.y;
            displayObject.rotation = 0;
            // The Safari WebGLRenderer wants everything flipped
            // See https://github.com/pixijs/pixi.js/issues/2283
            displayObject.x = 0;
            if (Capabilities.isSafari) {
                displayObject.y = h;
                displayObject.scale.set(1, -1); // sx, -sy)
            } else {
                displayObject.y = 0;
                displayObject.scale.set(1, 1);
            }
            if (isSprite) {
                displayObject.width = w;
                displayObject.height = h;
            }
            renderer.render(displayObject);
            displayObject.rotation = rot;
            displayObject.x = x;
            displayObject.y = y;
            displayObject.scale.set(sx, sy);

            let url = canvas.toDataURL();
            return [x, y, w, h, url]
        }

        load(domNode) {
            return new Promise((resolve, reject) => {
                let isImage = domNode instanceof HTMLImageElement;
                let isSprite = this.scatter.displayObject instanceof PIXI.Sprite;
                let image = isImage ? domNode : document.createElement('img');
                let [x, y, w, h, cloneURL] = this.cloneScatterImage();
                let [ww, hh] = this.unscaledSize();
                image.onload = e => {
                    if (!isImage) domNode.appendChild(image);
                    this.x = x;
                    this.y = y;
                    this.wantedWidth = ww;
                    this.wantedHeight = hh;
                    this.scale = 1;
                    this.rotation = this.scatter.rotation;
                    resolve(this);
                };
                image.onerror = e => {
                    reject(this);
                };
                image.src = cloneURL;
            })
        }
    }

    class FlipEffect {
        constructor(scatter, domScatterContainer, flipTemplate, backLoader) {
            this.flipped = false;
            this.scatter = scatter;
            this.backLoader = backLoader;
            this.scatterLoader = new ScatterLoader(scatter);
            this.domFlip = new DOMFlip(domScatterContainer, flipTemplate, this.scatterLoader, backLoader, {
                onBack: this.backCardClosed.bind(this)
            });
            this.setupInfoButton();
        }

        startFlip() {
            let center = this.flipCenter();
            let loader = this.backLoader;
            this.domFlip.load().then(domFlip => {
                this.scatter.displayObject.visible = false;
                domFlip.centerAt(center);
                domFlip.zoom(this.scatter.scale);
                let target = this.constraintFlipCenter(center, loader);
                domFlip.start({ targetCenter: target });
            });
        }

        unscaledSize() {
            return this.scatterLoader.unscaledSize()
        }

        flipCenter() {
            let isSprite = this.scatter.displayObject instanceof PIXI.Sprite;
            let resolution = isSprite ? app.renderer.resolution : 1;
            let center = this.scatter.center;
            let canvas = app.renderer.view;
            let domNode = this.domFlip.domScatterContainer.element;
            let page = window.convertPointFromNodeToPage(canvas, center.x * resolution, center.y * resolution);
            let local = window.convertPointFromPageToNode(domNode, page.x, page.y);
            return local
        }

        constraintFlipCenter(center, loader) {
            let w = loader.wantedWidth;
            let h = loader.wantedHeight;
            let canvas = app.renderer.view;
            let x = center.x;
            let y = center.y;
            if (x < w / 2) x = w / 2;
            if (y < h / 2) y = h / 2;
            if (x > canvas.width) x = canvas.width - w / 2;
            if (y > canvas.height) y = canvas.height - h / 2;
            return { x, y }
        }

        setupInfoButton() {
            let iscale = 1.0 / this.scatter.scale;
            this.infoBtn = new PIXI.Graphics();
            this.infoBtn.beginFill(0x333333);
            this.infoBtn.lineStyle(4, 0xffffff);
            this.infoBtn.drawCircle(0, 0, 22);
            this.infoBtn.endFill();

            this.infoBtn.beginFill(0xffffff);
            this.infoBtn.lineStyle(0);
            this.infoBtn.drawCircle(0, -8, 4);
            this.infoBtn.endFill();

            this.infoBtn.lineStyle(6, 0xffffff);
            this.infoBtn.moveTo(0, -2);
            this.infoBtn.lineTo(0, 14);
            this.infoBtn.endFill();

            this.infoBtn.on('click', e => {
                this.infoSelected();
            });
            this.infoBtn.on('tap', e => {
                this.infoSelected();
            });

            this.infoBtn.interactive = true;
            this.infoBtn.width = 44;
            this.infoBtn.height = 44;
            this.infoBtn.pivot.x = 30;
            this.infoBtn.pivot.y = 30;

            let displayObject = this.scatter.displayObject;
            let [w, h] = this.unscaledSize();
            this.infoBtn.position = new PIXI.Point(w, h);
            if (displayObject.foreground) {
                this.infoBtn.scale.x = iscale;
                this.infoBtn.scale.y = iscale;
                displayObject.foreground.addChild(this.infoBtn);
            } else {
                displayObject.addChild(this.infoBtn);
            }

            this.scatter.addTransformEventCallback(e => {
                let displayObject = this.scatter.displayObject;
                if (displayObject.foreground) {
                    if (e.scale) {
                        let iscale = 1.0 / e.scale;
                        this.infoBtn.scale.x = iscale;
                        this.infoBtn.scale.y = iscale;
                    }
                }
            });
        }

        setupButton(url) {
            let svgImage = new Image();
            let canvas = document.createElement('canvas');
            canvas.width = 88 * 4;
            canvas.height = 44 * 4;
            svgImage.onload = e => {
                let displayObject = this.scatter.displayObject;
                canvas.getContext('2d').drawImage(svgImage, 0, 0, canvas.width, canvas.height);
                let texure = new PIXI.Texture(new PIXI.BaseTexture(canvas));
                this.infoBtn = new PIXI.Sprite(texure);
                this.infoBtn.anchor.set(0.5, 0.5);
                if (displayObject.foreground) {
                    displayObject.foreground.addChild(this.infoBtn);
                } else {
                    displayObject.addChild(this.infoBtn);
                }
                this.infoBtn.scale.set(0.5, 0.5);

                let [w, h] = this.unscaledSize();
                this.infoBtn.position = new PIXI.Point(w, h);
                this.infoBtn.interactive = true;
                this.infoBtn.updateTransform();
                this.infoBtn.on('click', e => {
                    this.infoSelected();
                });
                this.infoBtn.on('tap', e => {
                    this.infoSelected();
                });
            };
            svgImage.src = url;
        }

        infoSelected() {
            this.startFlip();
        }

        backSelected() {
            this.domFlip.start();
        }

        backCardClosed() {
            /*** The flip effect should now be in it's initial state again. All
            memory should be freed. ***/
            let displayObject = this.scatter.displayObject;
            displayObject.visible = true;
            this.domFlip.fadeOutAndRemove();
            this.flipped = false;
        }

        targetRotation(alpha) {
            let ortho = 90;
            let rest = alpha % ortho;
            let delta = 0.0;
            if (rest > ortho / 2.0) {
                delta = ortho - rest;
            } else {
                delta = -rest;
            }
            return delta
        }
    }

    /* globals Power2, Sine */
    /*eslint no-console: ["error", { allow: ["log", "info", "error"] }]*/

    /**
     * Callback for the flippable onStart function.
     *
     * @callback onStartCallback
     * @param {Flippable} flippable - A reference to the flippable (also this refers to the flippable).
     */

    /**
     * Callback for the flippable onUpdate function.
     *
     * @callback onUpdateCallback
     * @param {Flippable} flippable - A reference to the flippable (also this refers to the flippable).
     */

    /**
     * Callback for the flippable onComplete function.
     *
     * @callback onCompleteCallback
     * @param {Flippable} flippable - A reference to the flippable (also this refers to the flippable).
     */

    /**
     * Class that represents a PixiJS Flippable.
     *
     * @example
     * const front = PIXI.Sprite.from('./assets/front.jpg')
     * const back = PIXI.Sprite.from('./assets/back.jpg')
     * app.scene.addChild(front)
     *
     * // Create the flippable
     * const flippable = new Flippable(front, back, app.renderer)
     *
     * front.interactive = true
     * front.on('click', event => flippable.toggle())
     *
     * @class
     * @extends PIXI.projection.Camera3d
     * @see {@link https://github.com/pixijs/pixi-projection|PixiJS Projection}
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/flippable.html|DocTest}
     */
    class Flippable extends PIXI.projection.Camera3d {
        /**
         * Creates an instance of a Flippable.
         *
         * @constructor
         * @param {PIXI.DisplayObject} front - The object to show initially. Should have been added to the scene.
         * @param {PIXI.DisplayObject} back - The object to show on the backside. Should have not been added to the scene.
         * @param {PIXI.Renderer|PIXI.CanvasRenderer} renderer - The renderer of the application.
         * @param {object} [opts] - An options object which can contain the following properties.
         * @param {number} [opts.duration=1] - The duration of the flip animation in seconds.
         * @param {GSAP.Ease} [opts.ease=Power2.easeOut] - The ease of the flip animation.
         * @param {boolean} [opts.shadow=false] - Should be a shadow been display during the animation?
         * @param {numer} [opts.eulerX=0] - The shift of the x-axis during the animation.
         * @param {numer} [opts.eulerY=0] - The shift of the y-axis during the animation.
         * @param {GSAP.Ease} [opts.eulerEase=Power1.easeOut] - The ease of the shift.
         * @param {boolean} [opts.useBackTransforms=false] - When set to true, the flip animation also animates to the transform parameters of the back-object.
         * @param {GSAP.Ease} [opts.transformEase=Power2.easeOut] - The ease of the transform.
         * @param {numer} [opts.focus=800] - The value of the focus of the 3D camera (see pixi-projection).
         * @param {numer} [opts.near=10] - The near value of the 3D camera (see pixi-projection).
         * @param {numer} [opts.far=10000] - The far value of the 3D camera (see pixi-projection).
         * @param {boolean} [opts.orthographic=false] - Should the flip animation be an orthographic animation?
         * @param {function} [opts.onStart=null] - A callback executed on start of the flip animation.
         * @param {function} [opts.onUpdate=null] - A callback executed on each step of the flip animation.
         * @param {function} [opts.onComplete=null] - A callback executed when the flip animation is finished.
         */
        constructor(front, back, renderer, opts = {}) {
            super();

            this.opts = Object.assign(
                {},
                {
                    front,
                    back,
                    renderer,
                    duration: 1,
                    ease: Power2.easeOut,
                    shadow: false,
                    eulerX: 0,
                    eulerY: 0,
                    eulerEase: Power1.easeOut,
                    useBackTransforms: false,
                    transformEase: Power2.easeOut,
                    focus: 800,
                    near: 10,
                    far: 10000,
                    orthographic: false
                },
                opts
            );

            // planes
            //--------------------
            this.setPlanes(this.opts.focus, this.opts.near, this.opts.far, this.opts.orthographic);

            // flipped
            //--------------------
            this._flipped = false;

            // objects
            //--------------------
            this.objects = {};

            // setup
            //--------------------
            this.setup();
        }

        /**
         * Creates children and instantiates everything.
         *
         * @private
         * @return {Flippable} A reference to the flippable for chaining.
         */
        setup() {
            const scale = 0.5;

            // filters
            //--------------------
            const blurFilter = new PIXI.filters.BlurFilter();
            blurFilter.blur = 0.2;
            this.objects.blurFilter = blurFilter;

            // outer
            //--------------------
            const outer = new PIXI.projection.Container3d();
            outer.scale3d.set(scale);
            this.addChild(outer);
            this.objects.outer = outer;

            // shadow
            //--------------------
            const shadow = new PIXI.projection.Sprite3d(PIXI.Texture.from('../../assets/images/shadow.png'));
            shadow.renderable = false;
            shadow.anchor.set(0.5);
            shadow.scale3d.set(0.98);
            shadow.alpha = 0.7;
            shadow.filters = [blurFilter];
            shadow.visible = this.opts.shadow;
            outer.addChild(shadow);
            this.objects.shadow = shadow;

            // inner
            //--------------------
            const inner = new PIXI.projection.Container3d();
            inner.euler.y = Math.PI;
            outer.addChild(inner);
            this.objects.inner = inner;

            // front
            //--------------------
            const front = new PIXI.projection.Sprite3d(PIXI.Texture.EMPTY);
            front.scale.set(-1 / scale, 1 / scale);
            front.renderable = true;
            front.anchor.set(0.5);
            inner.addChild(front);
            this.objects.front = front;

            // back
            //--------------------
            const back = new PIXI.projection.Sprite3d(PIXI.Texture.EMPTY);
            back.scale.set(1 / scale, 1 / scale);
            back.renderable = false;
            back.anchor.set(0.5);
            inner.addChild(back);
            this.objects.back = back;

            return this
        }

        /**
         * Gets or sets the flipped state.
         *
         * @member {boolean}
         */
        get flipped() {
            return this._flipped
        }
        set flipped(toBack) {
            this._flipped = toBack;

            // references
            //--------------------
            const front = this.objects.front;
            const back = this.objects.back;
            const inner = this.objects.inner;
            const shadow = this.objects.shadow;
            const blurFilter = this.objects.blurFilter;

            const half = this.opts.duration / 2;
            const ease = this.opts.eulerEase;

            const fromObject = toBack ? this.opts.front : this.opts.back;
            const toObject = toBack ? this.opts.back : this.opts.front;

            // set textures for virtual front and virtual back
            //--------------------
            front.texture = this.generateTexture(this.opts.front);
            back.texture = this.generateTexture(this.opts.back);

            // switch objects and set params for virtual objects
            //--------------------
            const fromCenter = this.anchorToCenter(fromObject);
            const toCenter = this.anchorToCenter(toObject);

            // from values
            //--------------------
            this.x = fromCenter.x;
            this.y = fromCenter.y;
            front.width = fromObject.width * 2;
            front.height = fromObject.height * 2;
            back.width = fromObject.width * 2;
            back.height = fromObject.height * 2;
            this.rotation = fromObject.rotation;
            this.skew.x = fromObject.skew.x;
            this.skew.y = fromObject.skew.y;

            // calculate to values
            //--------------------
            const to = {
                x: this.opts.useBackTransforms ? toCenter.x : fromCenter.x,
                y: this.opts.useBackTransforms ? toCenter.y : fromCenter.y,
                anchorX: this.opts.useBackTransforms ? toObject.x : fromObject.x,
                anchorY: this.opts.useBackTransforms ? toObject.y : fromObject.y,
                width: this.opts.useBackTransforms ? toObject.width * 2 : fromObject.width * 2,
                height: this.opts.useBackTransforms ? toObject.height * 2 : fromObject.height * 2,
                rotation: this.opts.useBackTransforms ? toObject.rotation : fromObject.rotation,
                skewX: this.opts.useBackTransforms ? toObject.skew.x : fromObject.skew.x,
                skewY: this.opts.useBackTransforms ? toObject.skew.y : fromObject.skew.y
            };

            // set toObject end values
            //--------------------
            toObject.x = to.anchorX;
            toObject.y = to.anchorY;
            toObject.width = to.width / 2;
            toObject.height = to.height / 2;
            toObject.rotation = to.rotation;
            toObject.skew.x = to.skewX;
            toObject.skew.y = to.skewY;

            // flip
            //--------------------
            TweenLite.to(inner.euler, this.opts.duration, {
                y: toBack ? 0 : Math.PI,
                ease: this.opts.ease,
                onStart: () => {
                    this.switchDisplayObject(fromObject, this);
                    shadow.renderable = true;
                    if (this.opts.onStart) {
                        this.opts.onStart(this, this);
                    }
                },
                onUpdate: () => {
                    this.layout();
                    if (this.opts.onUpdate) {
                        this.opts.onUpdate(this, this);
                    }
                },
                onComplete: () => {
                    this.switchDisplayObject(this, toObject);
                    shadow.renderable = false;
                    if (this.opts.onComplete) {
                        this.opts.onComplete(this, this);
                    }
                }
            });

            // x & y
            //--------------------
            TweenLite.to(this, this.opts.duration, {
                x: to.x,
                y: to.y,
                ease: this.opts.transformEase
            });

            // width & height
            //--------------------
            TweenLite.to([front, back], this.opts.duration, {
                width: to.width,
                height: to.height,
                ease: this.opts.transformEase
            });

            // rotation
            //--------------------
            TweenLite.to(this, this.opts.duration, {
                directionalRotation: {
                    rotation: `${to.rotation}_short`,
                    useRadians: true
                },
                ease: this.opts.transformEase
            });

            // skewX & skewY
            //--------------------
            TweenLite.to(this.skew, this.opts.duration, {
                x: to.skewX,
                y: to.skewY,
                ease: this.opts.transformEase
            });

            // camera
            //--------------------
            new TimelineMax()
                .to(this.euler, half, {
                    x: this.opts.eulerX,
                    y: this.opts.eulerY,
                    ease
                })
                .to(this.euler, half, { x: 0, y: 0, ease });

            // shadow
            //--------------------
            new TimelineMax().to(shadow, half, { alpha: 0.3, ease }).to(shadow, half, { alpha: 0.7, ease });

            // blurfilter
            //--------------------
            new TimelineMax().to(blurFilter, half, { blur: 6, ease }).to(blurFilter, half, { blur: 0.2, ease });
        }

        /**
         * Should be called to refresh the layout of the camera.
         *
         * @return {Flippable} A reference to the flippable for chaining.
         */
        layout() {
            const front = this.objects.front;
            const back = this.objects.back;
            const shadow = this.objects.shadow;
            const inner = this.objects.inner;

            inner.position3d.z = -Math.sin(inner.euler.y) * front.texture.baseTexture.width * 2;

            //this.objects.shadow.euler = this.objects.inner.euler
            shadow.euler.x = -inner.euler.x;
            shadow.euler.y = -inner.euler.y;

            if (this.frontSideInFront) {
                front.renderable = true;
                back.renderable = false;
                shadow.width = front.width;
                shadow.height = front.height;
            } else {
                front.renderable = false;
                back.renderable = true;
                shadow.width = back.width;
                shadow.height = back.height;
            }

            return this
        }

        /**
         * Toggles the flippable. Switches the sides.
         *
         * @private
         * @return {Flippable} A reference to the flippable for chaining.
         */
        toggle() {
            this.flipped = !this.flipped;

            return this
        }

        /**
         * Gets the alignment state. true if the front side is in front, false otherwise.
         *
         * @member {boolean}
         */
        get frontSideInFront() {
            return !this.objects.inner.isFrontFace()
        }

        /**
         * Calculates the center point of an PIXI.DisplayObject.
         *
         * @private
         * @param {PIXI.DisplayObject} displayObject - The DisplayObject from which to calculate the center.
         * @return {object} Return an object with x and y.
         */
        anchorToCenter(displayObject) {
            const bounds = displayObject.getBounds();
            return {
                x: bounds.x + bounds.width / 2,
                y: bounds.y + bounds.height / 2
            }
        }

        /**
         * Creates children and instantiates everything.
         *
         * @private
         * @param {PIXI.DisplayObject} displayObject - The DisplayObject from which to generate the texture.
         * @return {PIXI.Texture} The generated PIXI.Texture.
         */
        generateTexture(displayObject) {
            // renderTexture
            //--------------------
            const renderTexture = PIXI.RenderTexture.create(displayObject.width, displayObject.height);

            // save position
            const transform = [
                displayObject.x,
                displayObject.y,
                displayObject.scale.x,
                displayObject.scale.y,
                displayObject.rotation,
                displayObject.skew.x,
                displayObject.skew.y,
                displayObject.pivot.x,
                displayObject.pivot.y
            ];

            displayObject.position.set(0, 0);
            displayObject.skew.set(0, 0);
            displayObject.rotation = 0;

            // render
            //--------------------
            this.opts.renderer.render(displayObject, renderTexture);

            // restore position
            displayObject.setTransform(...transform);

            return renderTexture
        }

        /**
         * Removed the first DisplayObject and adds the second one at the exactly same position.
         *
         * @private
         * @param {PIXI.DisplayObject} first - The old DisplayObject.
         * @param {PIXI.DisplayObject} second - The new DisplayObject.
         * @return {Flippable} A reference to the flippable for chaining.
         */
        switchDisplayObject(first, second) {
            if (first && second && first.parent) {
                const parent = first.parent;
                const index = parent.getChildIndex(first);
                parent.addChildAt(second, index);
                parent.removeChild(first);
            }

            return this
        }
    }

    /**
     *
     */
    class Popover extends PIXI.Graphics {
        constructor({
            title = null,
            text = null,
            x = 0,
            y = 0,
            placement = 'top',
            width = 250,
            titleStyle = {},
            textStyle = { fontSize: '1.6em' }
        } = {}) {
            super();

            this.opts = {
                title,
                text,
                x,
                y,
                placement,
                width,
                titleStyle,
                textStyle
            };

            this.padding = 12;

            let style = {
                fontFamily: 'Arial',
                fontSize: '2em',
                stroke: '#f6f6f6',
                strokeThickness: 3,
                wordWrap: true,
                wordWrapWidth: width - this.padding * 2
            };

            this.titleTextStyle = new PIXI.TextStyle(Object.assign({}, style, titleStyle));
            this.textTextStyle = new PIXI.TextStyle(Object.assign({}, style, textStyle));

            if (title || text) {
                this.setup();
                this.draw();
                this.positioning();
            }
        }

        setup() {
            this.removeChildren();

            if (this.opts.title) {
                this.titleText = new PIXI.Text(this.opts.title, this.titleTextStyle);
                this.titleText.position.set(this.padding, this.padding);
                this.addChild(this.titleText);
            }

            this.titleY = this.titleText ? this.titleText.y : 0;
            this.titleHeight = this.titleText ? this.titleText.height : 0;

            if (this.opts.text) {
                this.textText = new PIXI.Text(this.opts.text, this.textTextStyle);
                this.textText.position.set(this.padding, this.titleY + this.titleHeight + this.padding);
                this.addChild(this.textText);
            }

            this.textY = this.textText ? this.textText.y : 0;
            this.textHeight = this.textText ? this.textText.height : 0;
        }

        close() {
            this.parent.removeChild(this);
        }

        draw() {
            this.clear();
            this.beginFill(0xffffff, 1);
            this.lineStyle(1, 0x282828, 0.5);

            // Draw rounded rectangle
            const height = this.height + this.padding;
            this.drawRoundedRect(0, 0, this.opts.width, height, 8);

            // Draw anchor
            this.drawAnchor(this.opts.placement);

            // Draw title background
            if (this.opts.title) {
                this.lineStyle(0);
                this.beginFill(0xf7f7f7, 1);
                let x = 1;
                let y = this.titleText.x + this.titleText.height + this.padding / 2;
                this.moveTo(x, y);
                y = 9;
                this.lineTo(x, y);
                this.quadraticCurveTo(x, y - 8, x + 8, y - 8);
                x += this.opts.width - 7;
                y -= 8;
                this.lineTo(x, y);
                this.quadraticCurveTo(x + 5, y, x + 5, y + 8);
                x += 5;
                y += this.titleText.x + this.titleText.height + this.padding / 2;
                this.lineTo(x, y);
                if (this.opts.text) {
                    x = 1;
                    this.lineTo(x, y);
                } else {
                    this.quadraticCurveTo(x, y, x - 5, y + 4);
                    x = 6;
                    y += 4;
                    this.lineTo(x, y);
                    this.quadraticCurveTo(x, y, x - 5, y - 4);
                }
            }

            this.endFill();
        }

        drawAnchor(placement) {
            let x = 0;
            let y = 0;

            switch (placement) {
                case 'bottom':
                    if (this.opts.title) {
                        this.beginFill(0xf7f7f7, 1);
                    }
                    x = this.width / 2 - 10;
                    y = 1;
                    this.moveTo(x, y);
                    x += 10;
                    y -= 10;
                    this.lineTo(x, y);
                    x += 10;
                    y += 10;
                    this.lineTo(x, y);
                    break
                case 'right':
                    x = 1;
                    y = this.height / 2 - 10;
                    if (this.titleY + this.titleHeight > y) {
                        this.beginFill(0xf7f7f7, 1);
                    }
                    this.moveTo(x, y);
                    x -= 10;
                    y += 10;
                    this.lineTo(x, y);
                    x += 10;
                    y += 10;
                    this.lineTo(x, y);
                    break
                case 'left':
                    x = this.width - 2;
                    y = this.height / 2 - 10;
                    if (this.titleY + this.titleHeight > y) {
                        this.beginFill(0xf7f7f7, 1);
                    }
                    this.moveTo(x, y);
                    x += 10;
                    y += 10;
                    this.lineTo(x, y);
                    x -= 10;
                    y += 10;
                    this.lineTo(x, y);
                    break
                default:
                    x = this.width / 2 - 10;
                    y = this.height - 2;
                    this.moveTo(x, y);
                    x += 10;
                    y += 10;
                    this.lineTo(x, y);
                    x += 10;
                    y -= 10;
                    this.lineTo(x, y);
                    break
            }
        }

        positioning() {
            const x = this.opts.x;
            const y = this.opts.y;

            switch (this.opts.placement) {
                case 'bottom':
                    this.position.set(x - this.width / 2, y + 10);
                    break
                case 'right':
                    this.position.set(x, y - this.height / 2);
                    break
                case 'left':
                    this.position.set(x - this.width, y - this.height / 2);
                    break
                default:
                    this.position.set(x - this.width / 2, y - this.height);
                    break
            }
        }
    }

    /* eslint-disable no-unused-vars */

    /** A container for scatter objects, which uses a single InteractionMapper
     * for all children. This reduces the number of registered event handlers
     * and covers the common use case that multiple objects are scattered
     * on the same level.
     */
    class ScatterContainer extends PIXI.Graphics {
        /**
         * @constructor
         * @param {PIXI.Renderer} renderer - PIXI renderer, needed for hit testing
         * @param {Bool} stopEvents - Whether events should be stopped or propagated
         * @param {Bool} claimEvents - Whether events should be marked as claimed
         *                             if findTarget return as non-null value.
         * @param {PIXI.Container} container - A container for the scatter
         * @param {Bool} showBounds - Show bounds for debugging purposes.
         * @param {Bool} showTouches - Show touches and pointer for debugging purposes.
         * @param {Color} backgroundColor - Set background color if specified.
         * @param {PIXIApp} app - Needed if showBounds is true to register
         *                                update handler.
         */
        constructor(
            renderer,
            {
                stopEvents = true,
                claimEvents = true,
                container = null,
                showBounds = false,
                showPolygon = false,
                showTouches = false,
                backgroundColor = null,
                app = window.app
            } = {}
        ) {
            super();
            this.container = container;
            if (this.container)
                this.containerDimensions = {
                    x: this.container.width,
                    y: this.container.height
                };
            this.backgroundWidth = null;
            this.backgroundHeight = null;
            this.app = app;
            this.renderer = renderer;
            this.stopEvents = stopEvents;
            this.claimEvents = claimEvents;
            this.delegate = new InteractionMapper$1(this.eventReceiver, this);
            this.showBounds = showBounds;
            this.showTouches = showTouches;
            this.showPolygon = showPolygon;
            this.backgroundColor = backgroundColor;
            if (showBounds || showTouches || showPolygon) {
                //console.log("Show TOUCHES!!!")
                this.app.ticker.add(delta => this.update(delta), this);
            }
            if (backgroundColor) {
                this.updateBackground();
            }
        }

        updateBackground() {
            this.clear();
            let rect = this.bounds;
            this.beginFill(this.backgroundColor, 1);
            this.drawRect(0, 0, rect.width, rect.height);
            this.endFill();
        }

        get eventReceiver() {
            return this.renderer.plugins.interaction.interactionDOMElement
        }

        get bounds() {
            let x = 0;
            let y = 0;
            // @container: We need to call the constant values, as the container
            // gets resized, when a child moves outside the original boundaries.
            let w = this.container ? this.containerDimensions.x : this.backgroundWidth || this.app.width;
            let h = this.container ? this.containerDimensions.y : this.backgroundHeight || this.app.height;

            if (this.app.fullscreen && this.app.monkeyPatchMapping) {
                let fixed = this.mapPositionToPoint({ x: w, y: 0 });
                if (fixed.x < w) {
                    w = fixed.x;
                }
                if (fixed.y > 0) {
                    y += fixed.y;
                    h -= fixed.y;
                }
            }
            return new PIXI.Rectangle(x, y, w, h)
        }

        get center() {
            let r = this.bounds;
            return { x: r.width / 2, y: r.height / 2 }
        }

        get polygon() {
            let r = this.bounds;
            let w2 = r.width / 2;
            let h2 = r.height / 2;
            let center = { x: w2, y: h2 };
            let polygon = new Polygon(center);
            polygon.addPoint({ x: -w2, y: -h2 });
            polygon.addPoint({ x: w2, y: -h2 });
            polygon.addPoint({ x: w2, y: h2 });
            polygon.addPoint({ x: -w2, y: h2 });
            return polygon
        }

        update(dt) {
            this.clear();
            this.lineStyle(1, 0x0000ff);
            if (this.showBounds) {
                for (let child of this.children) {
                    if (child.scatter) {
                        //let {x, y, width, height} = child.scatter.throwBounds()
                        // new PIXI.Rectangle(x, y, width, height)
                        this.drawShape(child.scatter.bounds);
                        let center = child.scatter.center;
                        this.drawCircle(center.x, center.y, 4);
                        this.drawCircle(child.scatter.x, child.scatter.y, 4);
                    }
                }
                this.lineStyle(2, 0x0000ff);
                this.drawShape(this.bounds);
            }
            if (this.showPolygon) {
                this.lineStyle(2, 0xff0000);
                for (let child of this.children) {
                    if (child.scatter) {
                        let polygon = child.scatter.polygon;
                        let shape = new PIXI.Polygon(polygon.flatAbsolutePoints());
                        //shape.close() not possible in PixiJS v5
                        this.drawShape(shape);
                    }
                }
            }
            if (this.showTouches) {
                let current = this.delegate.interaction.current;
                for (let [key, point] of current.entries()) {
                    let local = this.mapPositionToPoint(point);
                    this.drawCircle(local.x, local.y, 12);
                }
            }
        }

        capture(event) {
            if (this.stopEvents) Events$1.stop(event);
            return true
        }

        fakeInteractionEvent(point, key) {
            return { data: { global: point, key: key } }
        }

        findHitScatter(data, displayObject, hit) {
            //     if (hit) {
            //             console.log("findHitScatter", displayObject)
            //         }
            if (hit && this.hitScatter === null && typeof displayObject != undefined) {
                this.hitScatter = displayObject.scatter ? displayObject.scatter : null;
            }
        }

        mapPositionToPoint(point, element = null) {
            // In case of nested scatters we get an additional parameter that
            // contains the found scatter
            let local = new PIXI.Point();
            let interactionManager = this.renderer.plugins.interaction;
            interactionManager.mapPositionToPoint(local, point.x, point.y);
            if (element instanceof DisplayObjectScatter && element.displayObject.parent != null) {
                return element.displayObject.parent.toLocal(local)
            }
            return local
        }

        /**
         * New method hitTest implemented (in InteractionManager, since 4.5.0).
         * See https://github.com/pixijs/pixi.js/pull/3878
         */
        findTarget(event, local, global) {
            if (event.claimedByScatter) {
                return null
            }
            this.hitScatter = null;
            let interactionManager = this.renderer.plugins.interaction;
            let fakeEvent = this.fakeInteractionEvent(local);
            interactionManager.processInteractive(fakeEvent, this, this.findHitScatter.bind(this), true);
            if (this.claimEvents) event.claimedByScatter = this.hitScatter;
            return this.hitScatter
        }

        findTargetNew(event, local, global) {
            // UO: still problematic. Does not find non interactive elements
            // which are needed for some stylus applications
            if (event.claimedByScatter) {
                return null
            }
            this.hitScatter = null;
            let interactionManager = this.renderer.plugins.interaction;
            let displayObject = interactionManager.hitTest(local, this);
            if (displayObject != null && displayObject.scatter != null) this.hitScatter = displayObject.scatter;
            if (this.claimEvents) event.claimedByScatter = this.hitScatter;
            return this.hitScatter
        }

        onStart(event, interaction) { }

        onMove(event, interaction) { }

        onEnd(event, interaction) {
            for (let key of interaction.ended.keys()) {
                let point = interaction.ended.get(key);
                if (interaction.isLongPress(key)) {
                    this.onLongPress(key, point);
                }
                if (interaction.isTap(key)) {
                    this.onTap(key, point);
                }
            }
        }

        onTap(key, point) {
            console.info('ScatterContainer.onTap');
        }

        onLongPress(key, point) {
            console.info('ScatterContainer.onLongPress');
        }

        bringToFront(displayObject) {
            this.addChild(displayObject);
        }

        layout(width, height) {
            this.backgroundWidth = width;
            this.backgroundHeight = height;
            if (this.backgroundColor) {
                this.updateBackground();
            }
        }
    }

    /** A wrapper for child elements of a ScatterContainer. Can be used
     *  to combine scattered objects with non-scattered objects. Any
     *  PIXI.DisplayObject can be wrapped.
     */
    class DisplayObjectScatter extends AbstractScatter {
        constructor(
            displayObject,
            renderer,
            {
                x = null,
                y = null,
                minScale = 0.1,
                maxScale = 1.0,
                startScale = 1.0,
                autoBringToFront = true,
                translatable = true,
                scalable = true,
                rotatable = true,
                resizable = false,
                movableX = true,
                movableY = true,
                throwVisibility = 44,
                throwDamping = 0.95,
                autoThrow = true,
                rotationDegrees = null,
                rotation = null,
                overdoScaling = 1.5,
                onTransform = null,
                onThrowFinished = null
            } = {}
        ) {
            // For the simulation of named parameters,
            // see: http://exploringjs.com/es6/ch_parameter-handling.html
            super({
                overdoScaling,
                minScale,
                maxScale,
                startScale,
                autoBringToFront,
                translatable,
                scalable,
                rotatable,
                resizable,
                movableX,
                movableY,
                throwVisibility,
                throwDamping,
                autoThrow,
                onThrowFinished,
                rotationDegrees,
                rotation,
                onTransform
            });
            this.displayObject = displayObject;
            this.displayObject.scatter = this;
            this.renderer = renderer;
            this.scale = startScale;
            this.rotationDegrees = this.startRotationDegrees;

            // Only set x and y if they are specified.
            // Otherwise the displayobject gets corrupted.
            if (x != null) this.x = x;
            if (y != null) this.y = y;
        }

        getWorldScatter() {
            return this
        }

        /** Returns geometry data as object. **/
        getState() {
            return {
                scale: this.scale,
                x: this.x,
                y: this.y,
                rotation: this.rotation
            }
        }

        setup() {
            this.setupMouseWheelInteraction();
        }

        roundPixel(value) {
            // UO: Should be obsolete because Renderer supports roundPixels by default
            return value
        }

        get container() {
            // return this.displayObject.parent
            let obj = this.displayObject;
            while (obj.parent != null && !(obj.parent instanceof ScatterContainer)) obj = obj.parent;
            return obj.parent
        }

        get x() {
            return this.position.x
        }

        set x(value) {
            this.position.x = value;
        }

        get y() {
            return this.position.y
        }

        set y(value) {
            this.position.y = value;
        }

        get polygon() {
            let polygon = new Polygon(this.center);
            let w2 = this.width / 2;
            let h2 = this.height / 2;
            polygon.addPoint({ x: -w2, y: -h2 });
            polygon.addPoint({ x: w2, y: -h2 });
            polygon.addPoint({ x: w2, y: h2 });
            polygon.addPoint({ x: -w2, y: h2 });
            polygon.rotate(this.rotation);
            return polygon
        }

        get containerBounds() {
            return this.container.bounds
        }

        get containerPolygon() {
            let container = this.container;
            if (container == null) return null
            return container.polygon
        }

        get position() {
            return this.displayObject.position
        }

        set position(value) {
            this.displayObject.position = value;
        }

        get scale() {
            return this.displayObject.scale.x
        }

        set scale(value) {
            this.displayObject.scale.x = value;
            this.displayObject.scale.y = value;
        }

        get width() {
            return this.displayObject.width
        }

        get height() {
            return this.displayObject.height
        }

        get bounds() {
            return this.displayObject.getBounds()
        }

        get pivot() {
            return this.displayObject.pivot
        }

        get rotation() {
            return this.displayObject.rotation
        }

        set rotation(value) {
            this.displayObject.rotation = value;
        }

        get rotationDegrees() {
            return Angle.radian2degree(this.displayObject.rotation)
        }

        set rotationDegrees(value) {
            this.displayObject.rotation = Angle.degree2radian(value);
        }

        get center() {
            let w2 = this.width / 2;
            let h2 = this.height / 2;
            let dist = Math.sqrt(w2 * w2 + h2 * h2);
            let angle = Points.angle({ x: w2, y: h2 }, { x: 0, y: 0 });
            let p = this.displayObject.x;
            let c = Points.arc(this.position, this.rotation + angle, dist);
            return c // Points.subtract(c, this.pivot)
        }

        get rotationOrigin() {
            // In PIXI the default rotation and scale origin is the position
            return this.position // Points.add(this.position, this.pivot)
        }

        mapPositionToContainerPoint(point) {
            // UO: We need the coordinates related to this scatter in case
            // of nested scatters
            if (this.container != null) return this.container.mapPositionToPoint(point, this)
            return point
        }

        capture(event) {
            return true
        }

        bringToFront() {
            if (this.autoBringToFront) {
                if (this.displayObject.parent instanceof ScatterContainer) {
                    let scatterContainer = this.displayObject.parent;
                    scatterContainer.bringToFront(this.displayObject);
                } else if (this.displayObject.parent != null && this.displayObject.parent.scatter) {
                    this.displayObject.parent.scatter.toFront(this.displayObject);
                }
            }
        }

        toFront(displayObject) {
            this.displayObject.addChild(displayObject);
        }

        validScale(scale) {
            scale = Math.max(scale, this.minScale);
            scale = Math.min(scale, this.maxScale);
            return scale
        }
    }

    /**
     *
     */
    class Command extends PIXI.Graphics {
        /*** Abstract base class for record, play, and stop commands. ***/
        constructor(tools, selectedColor, shape) {
            super();
            this.tools = tools;
            this.shape = shape;
            this.selected = false;
            this.disabled = false;
            this.selectedColor = selectedColor;
            this.draw();
            this.setup();
        }

        setup() { }

        draw() {
            this.clear();
            var color = this.selected ? this.selectedColor : 0xffffff;
            this.lineStyle(0);
            this.beginFill(color, 1);
            this.drawShape(this.shape);
            this.endFill();
        }

        select() {
            this.selected = true;
            this.draw();
        }

        deselect() {
            this.selected = false;
            this.draw();
        }

        toggle() {
            this.selected = !this.selected;
            this.draw();
        }

        stop() {
            this.selected = false;
            this.draw();
        }
    }

    class RecordCommand extends Command {
        /*** Records events for later replay. ***/
        setup() {
            this.recorder = new EventRecorder();
        }

        toggle() {
            super.toggle();
            if (!this.selected) {
                this.recorder.stopRecording();
            }
        }

        recordEvent(event) {
            this.recorder.record(event);
        }

        normalize(value, limit) {
            return value / limit
        }

        normalizeX(value) {
            return this.normalize(value, window.innerWidth)
        }

        normalizeY(value) {
            return this.normalize(value, window.innerHeight)
        }

        whileNotStopped() {
            return this.tools.play.selected
        }

        startReplay() {
            let whileCondition = this.whileNotStopped.bind(this);
            this.recorder.startReplay(whileCondition, () => this.tools.play.stop());
        }
    }

    class PlayCommand extends Command {
        /*** Plays recorded events. ***/
        toggle() {
            super.toggle();
            if (this.selected && this.tools.record.recorder.recorded.length > 0) {
                this.tools.startReplay();
            }
        }
    }

    class StopCommand extends Command {
        /*** Stops recording and playing. ***/
        toggle() {
            super.toggle();
            this.tools.record.stop();
            this.tools.play.stop();
            setTimeout(this.deselect.bind(this), 500);
        }
    }

    class RecorderTools extends PIXI.Container {
        constructor(renderer) {
            super(renderer);
            this.renderer = renderer;
            this.setupToolbar();
            this.replayRate = 100.0;
            this.onReset = null;
            this.touchGraphics = new PIXI.Graphics();
            this.showTouches();
        }

        setup(container) {
            // Since this delegate might shadow another delegate, we mus avoid
            // capturing PointerEvents.
            this.delegate = new InteractionMapper(container, this, {
                capturePointerEvents: false
            });
        }

        findTarget(event, local, global) {
            return this
        }

        setupToolbar() {
            this.toolbar = new PIXI.Graphics();
            this.record = new RecordCommand(this, 0xcc0000, new PIXI.Circle(0, 0, 16));
            this.play = new PlayCommand(this, 0x0000cc, new PIXI.Polygon(0, 16, 32, 16 + 16, 0, 16 + 32, 0, 16));
            this.stop = new StopCommand(this, 0x0000cc, new PIXI.Rectangle(0, 0, 32, 32));
            this.toolbar.addChild(this.record).position.set(44, 48);
            this.toolbar.addChild(this.play).position.set(44 + 44, 16);
            this.toolbar.addChild(this.stop).position.set(44 + 44 + 44 + 16, 32);
            this.updateToolbar();
            this.addChild(this.toolbar);
        }

        updateToolbar() {
            var graphics = this.toolbar;
            graphics.clear();
            graphics.beginFill(0x000000, 0.5);
            graphics.lineStyle(2, 0xffffff, 1);
            graphics.drawRoundedRect(16, 16, 44 * 4 + 8, 64, 8);
            graphics.endFill();
        }

        onMouseWheel(event) {
            console.log('onMouseWheel missing');
        }

        onPress(point) {
            if (this.record.containsPoint(point)) {
                this.record.toggle();
            }
            if (this.play.containsPoint(point)) {
                this.play.toggle();
            }
            if (this.stop.containsPoint(point)) {
                this.stop.toggle();
                if (this.onReset) {
                    this.onReset();
                }
            }
        }

        mapPositionToPoint(point) {
            let local = new PIXI.Point();
            this.renderer.plugins.interaction.mapPositionToPoint(local, point.x, point.y);
            return local
        }

        extractLocal(event) {
            return this.mapPositionToPoint(Events.extractPoint(event))
        }

        capture(event) {
            if (typeof event.mouseDownSubstitute != 'undefined') return false
            return true
        }

        startReplay() {
            if (this.onReset) {
                this.onReset();
            }
            this.record.startReplay();
        }

        showTouches() {
            this.addChild(this.touchGraphics);
        }

        recordEvent(event) {
            if (this.record.selected) {
                this.record.recordEvent(event);
            }
        }

        onStart(event, interaction) {
            let local = this.extractLocal(event);
            if (!this.toolbar.containsPoint(local)) {
                this.recordEvent(event);
                this.updateTouchGraphics(interaction);
            }
        }

        onMove(event, interaction) {
            let local = this.extractLocal(event);
            if (!this.toolbar.containsPoint(local)) {
                this.recordEvent(event);
                this.updateTouchGraphics(interaction);
            }
        }

        onEnd(event, interaction) {
            let local = this.extractLocal(event);
            if (this.toolbar.containsPoint(local)) {
                this.onPress(local);
            } else {
                this.recordEvent(event);
                this.updateTouchGraphics(interaction);
            }
        }

        updateTouchGraphics(interaction) {
            let current = interaction.current;
            let graphics = this.touchGraphics;
            if (graphics != null) {
                graphics.clear();
                for (let key of current.keys()) {
                    if (interaction.ended.has(key)) {
                        continue
                    }
                    let p = current.get(key);
                    if (key == 'mouse') {
                        graphics.beginFill(0xcc0000, 0.5);
                    } else {
                        graphics.beginFill(0xcccccc, 0.5);
                    }
                    graphics.drawCircle(p.x, p.y, 20);
                }
                graphics.endFill();
            }
        }
    }

    class AppTest extends PIXIApp {
        constructor(canvas, container) {
            super({ view: canvas, backgroundColor: 0x000000 });
            this.container = container;
        }

        sceneFactory() {
            return new RecorderTools(this.renderer)
        }

        setup() {
            super.setup();
            this.scene.setup(this.container);
        }

        run(reset = null) {
            this.scene.onReset = reset;
            console.log('Running AppTest');
            return this
        }
    }

    /**
     * Defines usefull default text styles.
     */
    class FontInfo {
        static get small() {
            return app.theme.textStyleSmall
        }

        static get normal() {
            return app.theme.textStyle
        }

        static get centered() {
            return Object.assign({}, app.theme.textStyle, { align: 'center' })
        }
    }

    /**
     * Static methods to support hyphenation of lines.
     *
     * @class Hypenate
     */
    class Hypenate {
        static splitPart(part) {
            let parts = part.split('-');
            if (parts.length == 1) return [part]
            let result = [];
            let last = parts.pop();
            for (let p of parts) {
                result.push(p + '-');
            }
            result.push(last);
            return result.filter(p => p.length > 0)
        }

        static splitWord(word) {
            if (typeof language == 'undefined') {
                if (word.indexOf('-') > -1) {
                    return word.split('-')
                }
                return [word]
            }
            let parts = language.hyphenate(word);
            let result = [];
            for (let part of parts) {
                for (let splitted of this.splitPart(part)) {
                    result.push(splitted);
                }
            }
            return result
        }

        static abbreviateLine(label, style, width) {
            const pixiStyle = new PIXI.TextStyle(style);
            let metrics = PIXI.TextMetrics.measureText(label, pixiStyle);
            while (metrics.width > width && label.length > 3) {
                label = label.slice(0, label.length - 1);
                metrics = PIXI.TextMetrics.measureText(label, pixiStyle);
            }
            label = label.slice(0, label.length - 1);
            return label + 'â€¦'
        }

        static splitLine(line, pixiStyle, width, space, minus) {
            let x = 0;
            let result = '';
            let words = line.split(' ');
            for (let word of words) {
                let wordMetrics = PIXI.TextMetrics.measureText(word, pixiStyle);
                if (x + wordMetrics.width >= width) {
                    let parts = this.splitWord(word);
                    let newWord = '';
                    if (parts.length == 1) {
                        newWord += '\n' + word + ' ';
                        x = wordMetrics.width + space.width;
                    } else {
                        let first = true;
                        let lastPart = '';
                        for (let part of parts) {
                            let partMetrics = PIXI.TextMetrics.measureText(part, pixiStyle);
                            if (x + partMetrics.width + space.width > width) {
                                newWord += (first || lastPart.endsWith('-') ? '\n' : '-\n') + part;
                                x = partMetrics.width;
                            } else {
                                newWord += part;
                                x += partMetrics.width;
                            }
                            lastPart = part;
                            first = false;
                        }
                        x += space.width;
                    }
                    result += newWord + ' ';
                } else {
                    result += word + ' ';
                    x += wordMetrics.width + space.width;
                }
            }
            return result
        }

        /**
         *  Main method and entry point for text hyphenation
         *
         * @static
         * @param {*} text
         * @param {*} style
         * @param {*} width
         * @memberof Hypenate
         * @returns {string}
         */
        static splitLines(text, style, width) {
            const pixiStyle = new PIXI.TextStyle(style);
            const lines = text.split('\n');
            const space = PIXI.TextMetrics.measureText(' ', pixiStyle);
            const minus = PIXI.TextMetrics.measureText('-', pixiStyle);
            let result = [];
            for (let line of lines) {
                result.push(this.splitLine(line, pixiStyle, width, space, minus));
            }
            return result.join('\n')
        }
    }

    class TextLabel extends PIXI.Text {
        /**
         *Creates an instance of TextLabel.
         * @param {string} text - The string that you would like the text to display
         * @param {object|PIXI.TextStyle} [style] - The style parameters
         * @param {canvas}
         * @memberof TextLabel
         */
        constructor(text, style = null, canvas = null, { minZoom = 0.1, maxZoom = 10 } = {}) {
            super(text, style, canvas);
            this.normFontSize = this.style.fontSize;
            this.minZoom = minZoom;
            this.maxZoom = maxZoom;
        }

        zoom(factor) {
            let oldValue = parseFloat(this.style.fontSize) / this.normFontSize;
            let value = oldValue * factor;
            this.setZoom(value);
        }

        setZoom(value) {
            let oldValue = parseFloat(this.style.fontSize) / this.normFontSize;
            if (value > this.maxZoom) {
                value = this.maxZoom;
            }
            if (value < this.minZoom) {
                value = this.minZoom;
            }
            if (value != oldValue) {
                this.style.fontSize = Math.max(value * this.normFontSize, 1);
            }
        }

        setZoomAndScale(scale) {
            this.scale.set(1 / scale);
            this.setZoom(scale);
        }
    }

    /**
     * A specialization of the PIXI.Graphics class that allows to
     * resuse and place labels across different layout variants
     *
     * @export
     * @class LabeledGraphics
     * @extends {PIXI.Graphics}
     */
    class LabeledGraphics extends PIXI.Graphics {
        /**
         * Creates an instance of LabeledGraphics and defines a local label cache.
         *
         * @memberof LabeledGraphics
         */
        constructor() {
            super();
            this.labels = new Map();
        }

        _createText(label, fontInfo) {
            return new TextLabel(label, fontInfo)
        }

        /**
         * Main additional method. Ensures that a text object is created that is cached
         * under the given key.
         *
         * @param {*} key - The cache key
         * @param {*} label - The label to show
         * @param {*} [attrs={}] - Defines attributes of the text object.
         *                               align: 'right', 'left', or 'center'
         *                               justify: 'top', 'bottom', or 'center'
         *                               maxLines: {integer} truncates the text and adds ellipsis
         *                               maxHeight: {number} truncates text that needs more space and adds ellipsis
         *                               maxWidth: {number} word wraps text using hyphenation if possible
         * @param {*} [fontInfo=FontInfo.normal] - Defines PIXI.TextStyle attributes
         * @returns {PIXI.Text} - instance
         * @memberof LabeledGraphics
         */
        ensureLabel(key, label, attrs = {}, fontInfo = FontInfo.normal) {
            if (attrs.maxWidth && attrs.maxLines == 1) {
                label = Hypenate.abbreviateLine(label, fontInfo, attrs.maxWidth);
            } else {
                if (attrs.maxWidth) {
                    label = Hypenate.splitLines(label, fontInfo, attrs.maxWidth);
                }
                if (attrs.maxLines) {
                    label = this.truncateLabel(label, fontInfo, attrs.maxLines);
                }
                if (attrs.maxHeight) {
                    let styleInfo = new PIXI.TextStyle(fontInfo);
                    let metrics = PIXI.TextMetrics.measureText(label, styleInfo);
                    let maxLines = Math.max(attrs.maxHeight / metrics.lineHeight, 1);
                    label = this.truncateLabel(label, fontInfo, maxLines);
                }
            }

            if (!this.labels.has(key)) {
                let text = this._createText(label, fontInfo);
                this.labels.set(key, text);
                this.addChild(text);
            }
            let text = this.labels.get(key);
            for (let k in attrs) {
                text[k] = attrs[k];
            }
            if (label != text.text) text.text = label;
            // We do not follow the flexbox jargon and use align for x and justify for y axis
            // This deviation is needed to ensure backward compatability
            switch (attrs.justify || null) {
                case 'top':
                    text.anchor.y = 0;
                    break
                case 'bottom':
                    text.anchor.x = 1;
                    break
                default:
                    text.anchor.y = 0.5;
                    break
            }
            switch (attrs.align) {
                case 'right':
                    text.anchor.x = 1;
                    break
                case 'center':
                    text.anchor.x = 0.5;
                    break
                default:
                    text.anchor.x = 0;
                    break
            }
            text.visible = true;
            return text
        }

        /**
         * Private method that truncates the text and adds an ellipsis if there are more lines
         * than wanted
         *
         * @param {*} text
         * @param {*} style
         * @param {*} [maxLines=Infinity]
         * @returns {string}
         * @memberof LabeledGraphics
         */
        truncateLabel(text, style, maxLines = Infinity) {
            if (maxLines === Infinity) {
                return text
            }
            const { wordWrapWidth } = style;
            const pixiStyle = new PIXI.TextStyle(style);
            const { lines } = PIXI.TextMetrics.measureText(text, pixiStyle);
            let newText = text;
            if (lines.length > maxLines) {
                const truncatedLines = lines.slice(0, maxLines);
                const lastLine = truncatedLines[truncatedLines.length - 1];
                const words = lastLine.split(' ');
                const wordMetrics = PIXI.TextMetrics.measureText(`\u00A0\n...\n${words.join('\n')}`, pixiStyle);
                const [spaceLength, dotsLength, ...wordLengths] = wordMetrics.lineWidths;
                const { text: newLastLine } = wordLengths.reduce(
                    (data, wordLength, i) => {
                        if (data.length + wordLength + spaceLength >= wordWrapWidth) {
                            return { ...data, length: wordWrapWidth }
                        }
                        return {
                            text: `${data.text}${i > 0 ? ' ' : ''}${words[i]}`,
                            length: data.length + wordLength + spaceLength
                        }
                    },
                    { text: '', length: dotsLength }
                );
                truncatedLines[truncatedLines.length - 1] = `${newLastLine}...`;
                newText = truncatedLines.join('\n');
            }
            return newText
        }

        /**
         * Returns the label for the given key.
         *
         * @param {*} key
         * @returns {Object}
         * @memberof LabeledGraphics
         */
        getLabel(key) {
            return this.labels.get(key)
        }

        /**
         * Hides the label with the given key.
         * @param {*} key
         * @memberof LabeledGraphics
         */
        hideLabel(key) {
            let label = this.labels.get(key);
            if (label) {
                label.visible = false;
            }
        }

        /**
         * Removes the label with the given key.
         * @param {*} key
         * @memberof LabeledGraphics
         */
        removeLabel(key) {
            let label = this.labels.get(key);
            this.labels.delete(key);
            label.destroy();
        }

        /**
         * Ensures that labels are hidden on clear.
         *
         * @memberof LabeledGraphics
         */
        clear() {
            super.clear();
            for (let key of this.labels.keys()) {
                this.hideLabel(key);
            }
        }

        /**
         * Logs debugging infos
         *
         * @memberof LabeledGraphics
         */
        debugInfos() {
            console.log({ size: this.labels.size, labels: this.labels });
        }
    }

    const labelCache = new Map();

    function getTexture(label, fontInfo = FontInfo.normal) {
        let key = label + fontInfo.fontFamily + fontInfo.fontSize;

        if (labelCache.has(key)) {
            return labelCache.get(key)
        }
        let expandedFont = Object.assign({}, fontInfo);
        expandedFont.fontSize *= window.devicePixelRatio;
        let text = new PIXI.Text(label, expandedFont);
        text.updateText();
        labelCache.set(key, text.texture);
        return text.texture
    }

    class SpriteLabel extends PIXI.Sprite {
        constructor(label, fontInfo) {
            let texture = getTexture(label, fontInfo);
            super(texture);
            this.label = label;
            this.fontInfo = fontInfo;
            this.scale.set(0.8 / window.devicePixelRatio);
        }

        set text(label) {
            this.label = label;
            this.texture = getTexture(label, this.fontInfo);
        }

        get text() {
            return this.label
        }
    }

    class BitmapLabeledGraphics extends LabeledGraphics {
        _createText(label, fontInfo) {
            let texture = getTexture(label, fontInfo);
            return new SpriteLabel(texture)
        }
    }

    /* eslint-disable no-unused-vars */

    class Ticks {
        get reservedPrefixes() {
            return ['decade', 'year', 'month', 'day', 'hour', 'minute', 'second']
        }

        static get largeTickSize() {
            return 4.2
        }

        get minWidth() {
            return 10
        }

        format(available) {
            return { year: '2-digit', timeZone: 'UTC' }
        }

        get minLabelWidth() {
            return 44
        }

        get formatKey() {
            return this.key
        }

        dateKey(date) {
            return this.key + date.getFullYear()
        }

        *iter(start, end) {
            let date = this.iterStart(start);
            while (date <= end) {
                yield date;
                date = this.next(date);
            }
            yield date;
        }

        *iterRanges(range) {
            for (let date of this.iter(range.start, range.end)) {
                let next = this.next(date);
                yield { start: date, end: next };
            }
        }

        selectedRange(timeline, info) {
            let first = null;
            let last = null;
            let visibleFirst = null;
            let visibleLast = null;
            let units = 0;
            for (let { start, end } of this.iterRanges(info)) {
                if (timeline.visibleRange(start, end)) {
                    if (first == null) {
                        first = start;
                    }
                    last = end;
                }
                if (timeline.visibleDate(start) && timeline.visibleDate(end)) {
                    units += 1;
                    if (visibleFirst == null) {
                        visibleFirst = start;
                    }
                    visibleLast = end;
                }
            }
            if (first == null) return info
            return {
                start: first,
                end: last,
                visibleStart: visibleFirst,
                visibleEnd: visibleLast,
                units: units
            }
        }

        drawTick(timeline, x, y, date) {
            let visible = date > timeline.start && date < timeline.end;
            if (!visible) return false
            timeline.drawTick(x);
            return true
        }

        toLocaleString(date, format) {
            return date.toLocaleDateString('de', format)
        }

        draw(timeline, range, width, height, available, format, nextFormat, level, extraTicks = false) {
            let first = null;
            let last = null;
            let keyedFormat = format ? format[this.formatKey] : null;
            let keyedNextFormat = nextFormat ? nextFormat[this.formatKey] : null;
            let redundant = nextFormat ? this.formatKey in nextFormat : false;
            let fullyRedundant = keyedFormat != null && keyedFormat == keyedNextFormat;
            let y = timeline.getY();
            for (let { start, end } of this.iterRanges(range)) {
                let x = timeline.toX(start);
                let xx = x;
                let yy = y + timeline.tickLabelOffset(-1);
                if (this.drawTick(timeline, x, y, start) && format) {
                    let key = this.dateKey(start);
                    let text = this.toLocaleString(start, format);
                    let align = 'center';
                    if (nextFormat) {
                        yy = y + timeline.tickLabelOffset(-1, 1);
                        align = 'left';
                        timeline.drawTick(x, Ticks.largeTickSize);
                        let nextX = timeline.toX(end) - 100;
                        if (x < 0 && nextX > -100 && !redundant) {
                            xx = Math.min(4, nextX);
                        } else {
                            xx -= 2;
                        }
                    } else if (level > 0) {
                        xx = x + available / 2;
                    }

                    if (!fullyRedundant) {
                        timeline.ensureLabel(key, text, { x: xx, y: yy, align }, FontInfo.small);
                    }
                    if (extraTicks) timeline.drawTick(x, -level);
                }
                if (timeline.visibleRange(start, end)) {
                    if (first == null) first = start;
                    last = end;
                }
            }
            if (first == null) return null
            return { start: first, end: last }
        }

        drawExtra(timeline, range, size) {
            for (let { start } of this.iterRanges(range)) {
                if (timeline.visibleDate(start)) {
                    let x = timeline.toX(start);
                    timeline.drawTick(x, -size);
                }
            }
        }
    }

    class DecadeTicks extends Ticks {
        get milliseconds() {
            return 10 * 365 * 24 * 60 * 60 * 1000
        }

        format(available) {
            return { year: 'numeric', timeZone: 'UTC' }
        }

        selection(timeline, dates, selected) {
            return dates
        }

        get key() {
            return 'decade'
        }

        get formatKey() {
            return 'year'
        }

        iterStart(start) {
            let modulo = start.getFullYear() % 10;
            let year = start.getFullYear() - modulo;
            return Dates.create(year, 0, 1)
        }

        next(decade) {
            return Dates.nextYear(decade, 10)
        }
    }

    class YearTicks extends Ticks {
        get milliseconds() {
            return 365 * 24 * 60 * 60 * 1000
        }

        format(available) {
            if (available < 44) return { year: '2-digit', timeZone: 'UTC' }
            return { year: 'numeric', timeZone: 'UTC' }
        }

        get minLabelWidth() {
            return 22
        }

        get key() {
            return 'year'
        }

        iterStart(start) {
            return Dates.create(start.getFullYear(), 0, 1)
        }

        next(year) {
            return Dates.nextYear(year)
        }
    }

    class MonthTicks extends Ticks {
        get milliseconds() {
            return (365 / 12) * 24 * 60 * 60 * 1000
        }

        format(available) {
            let format = { month: 'narrow', timeZone: 'UTC' };
            if (available > 44) format.month = 'short';
            if (available > 66) format.year = '2-digit';
            if (available > 100) {
                format.month = 'long';
                format.year = 'numeric';
            }
            return format
        }

        get minLabelWidth() {
            return 32
        }

        get key() {
            return 'month'
        }

        dateKey(date) {
            return this.key + date.getFullYear() + date.getMonth()
        }

        iterStart(start) {
            return Dates.create(start.getFullYear(), start.getMonth(), 1)
        }

        next(month) {
            return Dates.nextMonth(month)
        }
    }

    class DayTicks extends Ticks {
        get milliseconds() {
            return 24 * 60 * 60 * 1000
        }

        format(available) {
            let format = { day: 'numeric', timeZone: 'UTC' };
            if (available > 44) format.month = 'short';
            if (available > 100) {
                format.month = 'long';
                format.year = '2-digit';
            }
            if (available > 150) {
                format.weekday = 'short';
            }
            if (available > 200) {
                format.year = 'numeric';
                format.weekday = 'long';
            }
            return format
        }

        get key() {
            return 'day'
        }

        dateKey(date) {
            return this.key + date.getFullYear() + date.getMonth() + date.getDate()
        }

        iterStart(start) {
            return Dates.create(start.getFullYear(), start.getMonth(), start.getDate())
        }

        next(date) {
            return Dates.nextDay(date)
        }
    }

    class TimeTicks {
        constructor(...ticks) {
            this.ticks = ticks;
        }

        selectedRange(timeline) {
            let info = { start: timeline.start, end: timeline.end, units: 0 };
            for (let ticks of this.ticks) {
                info = ticks.selectedRange(timeline, info);
                if (info.units > 1) {
                    timeline.selection = [info.visibleStart, info.visibleEnd];
                    return
                }
            }
            timeline.selection = [info.start, info.end];
        }

        draw(timeline, width, height) {
            let range = timeline;
            let start = timeline.toX(range.start);
            let end = timeline.toX(range.end);
            let size = end - start;
            let duration = timeline.end - timeline.start;
            let formats = new Map();
            let nextFormats = new Map();
            let availables = new Map();
            let previous = null;
            let visible = [];
            for (let ticks of this.ticks) {
                let amount = ticks.milliseconds / duration;
                let available = amount * size;
                availables.set(ticks, available);
                if (available < ticks.minWidth) break
                formats.set(ticks, available < ticks.minLabelWidth ? null : ticks.format(available));
                nextFormats.set(previous, formats.get(ticks));
                previous = ticks;
                visible.push(ticks);
            }
            let level = 0;
            let ranges = [];
            for (let ticks of visible) {
                if (range == null) continue
                range = ticks.draw(
                    timeline,
                    range,
                    width,
                    height,
                    availables.get(ticks),
                    formats.get(ticks),
                    nextFormats.get(ticks),
                    level
                );
                if (range) {
                    ranges.push({ ticks, range });
                }
                level += 1;
            }

            let extraLevel = ranges.length - 1;
            let extraStart = extraLevel;
            for (let { ticks, range } of ranges) {
                ticks.drawExtra(timeline, range, extraLevel);
                extraLevel -= 1;
                if (extraLevel <= 0) {
                    continue
                }
            }

            timeline.drawTick(start, Ticks.largeTickSize);
            timeline.drawTick(start, -extraStart);
            timeline.drawTick(end, Ticks.largeTickSize);
            timeline.drawTick(end, -extraStart);
        }
    }

    class ColorRanges {
        constructor(label, color, ranges) {
            this.label = label;
            this.color = color;
            this.ranges = ranges;
        }

        draw(timeline, width, height, size = 12) {
            let minimum = 1 / Capabilities.devicePixelRatio;
            let h2 = size;
            timeline.lineStyle(size, this.color);
            for (let range of this.ranges) {
                if (range.to === null) {
                    range.to = Dates.nextDay(range.from);
                }
                let start = timeline.toX(range.from);
                let end = timeline.toX(range.to);
                if (end < start + minimum) {
                    end = start + minimum;
                }
                timeline.moveTo(start, h2);
                timeline.lineTo(end, h2);
            }
        }
    }

    class Timeline extends BitmapLabeledGraphics {
        constructor(width, height, { ticks = null, baseLine = 0.5, showRange = true, throwDamping = 0.95 } = {}) {
            super();
            this.wantedWidth = width;
            this.wantedHeight = height;
            this.extraLeft = 0;
            this.extraRight = 0;
            this.inset = 5;
            this.showRange = showRange;
            this.baseLine = baseLine;
            this.tickHeight = 4;
            this.zoom = 1;
            this.minZoom = 1;
            this.maxZoom = 12000;
            this.scroll = 0;
            this.draggable = false;
            this.deltas = [];
            this.labelDates = [];
            this.colorRanges = [];
            this.rangeColors = new Cycle(Colors.eminence, Colors.steelblue, Colors.ochre, Colors.turquoise);
            this.callbacks = [];
            this.onTapCallbacks = [];
            this.onDoubleTapCallbacks = [];
            this.onLongPressCallbacks = [];
            this.progress = null;
            this.start = null;
            this.end = null;
            this.selection = null;
            this.autoScroll = false;
            this.direction = -1;
            this.throwDamping = throwDamping;
            this.timeticks = ticks || new TimeTicks(new DecadeTicks(), new YearTicks(), new MonthTicks(), new DayTicks());
            this.labelPrefix = '__';
        }

        updateSelection() {
            if (this.visibleDate(this.start) && this.visibleDate(this.end)) {
                this.selection = [this.start, this.end];
            } else {
                this.timeticks.selectedRange(this);
            }

            return this.selection
        }

        addCallback(callback) {
            this.callbacks.push(callback);
        }

        addTabCallback(callback) {
            this.onTapCallbacks.push(callback);
        }

        addDoubleTapCallback(callback) {
            this.onDoubleTapCallbacks.push(callback);
        }

        addLongPressCallback(callback) {
            this.onLongPressCallbacks.push(callback);
        }

        addLabels(labels) {
            this.labelDates = labels;
        }

        range(start, end) {
            this.start = start;
            this.end = end;
        }

        draw(width, height) {
            this.wantedWidth = width;
            this.wantedHeight = height;
            this.redraw();
        }

        updateColorRanges(w, h) {
            let xx = w - this.inset;
            let size = FontInfo.small.fontSize;
            let yy = h - size;
            for (let i = this.colorRanges.length - 1; i >= 0; i--) {
                let cr = this.colorRanges[i];
                let label = cr.label;
                cr.draw(this, w, h);
                let current = this.ensureLabel(
                    'colorRange:' + label,
                    label,
                    { x: xx, y: yy, align: 'right' },
                    FontInfo.small
                );
                let r = current.getBounds();
                xx -= r.width + 16;

                this.lineStyle(size, cr.color);
                this.moveTo(xx, yy);
                this.lineTo(xx + size, yy);
                xx -= size + 4;
            }
        }

        drawSelectedRamge(selected) {
            this.lineStyle(2, app.theme.primaryColor);
            let start = this.toX(selected[0]);
            let end = this.toX(selected[1]);
            this.moveTo(start, 0);
            this.lineTo(end, 0);
            this.drawTick(start, -1.5, 0);
            this.drawTick(end, -1.5, 0);
        }

        redraw() {
            this.clear();
            let h = this.wantedHeight;
            let w = this.wantedWidth;
            let y = this.getY();
            this.prepareLabels();
            this.updateColorRanges(w, h);

            this.lineStyle(2, 0xffffff);
            if (this.start != null && this.end != null) {
                this.moveTo(this.toX(this.start), y);
                this.lineTo(this.toX(this.end), y);
                this.updateTicksAndLabels(w, h);
                this.updateSelection();
                let selected = this.selection;
                if (selected[0] != this.start && selected[1] != this.end) {
                    if (this.showRange) this.drawSelectedRamge(selected);
                }
                for (let callback of this.callbacks) {
                    callback(this.scroll, this.zoom, this.selection);
                }
            } else {
                this.moveTo(this.inset, y);
                this.lineTo(w - this.inset, y);
            }

            if (this.progress != null && this.progress < 1) {
                this.lineStyle(2, 0xccccff);
                this.moveTo(this.inset, y);
                this.lineTo((w - this.inset) * this.progress, y);
            }
        }

        totalWidth(bounded = false) {
            let w = this.wantedWidth - 2 * this.inset;
            return w * this.validZoom(this.zoom, bounded)
        }

        validZoom(zoom, bounded = true) {
            let overshoot = bounded ? 1.0 : 2.0;
            zoom = Math.max(zoom, this.minZoom / overshoot);
            zoom = Math.min(zoom, this.maxZoom * overshoot);
            return zoom
        }

        getY() {
            return this.wantedHeight * this.baseLine
        }

        toX(date) {
            let total = this.end - this.start;
            let offset = this.inset + this.scroll;
            let width = this.totalWidth();
            let delta = date - this.start;
            let ratio = delta / total;
            return offset + ratio * width
        }

        fromX(value) {
            let total = this.end - this.start;
            let offset = this.inset + this.scroll;
            let width = this.totalWidth();
            let ratio = (value - offset) / width;
            let time = this.start.getTime() + total * ratio;
            let date = new Date(time);
            return date
        }

        drawTick(x, direction = 1, y = null) {
            if (y == null) {
                y = this.getY();
            }
            this.moveTo(x, y);
            this.lineTo(x, y - this.tickHeight * direction * this.direction);
        }

        prepareLabels() {
            for (let key of this.labels.keys()) {
                if (!key.startsWith(this.labelPrefix)) this.labels.get(key).visible = false;
            }
        }

        updateTicksAndLabels(width, height) {
            this.drawTick(this.toX(this.start));
            this.drawTick(this.toX(this.end));
            this.timeticks.draw(this, width, height);
            this.updateLabels(width, height);
        }

        visibleDate(date, offset = 0) {
            if (date >= this.start && date <= this.end) {
                let x = this.toX(date) + offset;
                return x > 0 && x < this.wantedWidth
            }
            return false
        }

        visibleRange(start, end) {
            let x = this.toX(start);
            if (x > this.wantedWidth) return false
            x = this.toX(end);
            if (x < 0) return false
            return true
        }

        tickLabelOffset(direction = 1, level = 0) {
            let fs = FontInfo.small.fontSize;
            let dh = fs + level * (fs + 2);
            return this.direction * direction * dh
        }

        updateLabels(width, height) {
            let h2 = height / 2;
            if (this.labelDates) {
                let last = null;
                let y = h2 + this.tickLabelOffset();
                for (let i = this.labelDates.length - 1; i >= 0; i--) {
                    let [label, date] = this.labelDates[i];
                    let align = 'center'; // (last == null) ? 'right' : 'left'
                    let x = this.toX(date);
                    let current = this.ensureLabel(
                        this.labelPrefix + label,
                        label,
                        {
                            x: x,
                            y: y,
                            align
                        },
                        FontInfo.small
                    );
                    let r = current.getBounds();
                    current.visible = !(last != null && r.x + r.width > last.x);
                    if (current.visible) {
                        this.drawTick(x, -1);
                        last = r;
                    }
                }
            } else {
                let start = this.start.toLocaleDateString('de', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                });
                let end = this.end.toLocaleDateString('de', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                });
                this.ensureLabel(this.labelPrefix + 'start', start, {
                    x: this.toX(this.start),
                    y: h2
                });
                this.ensureLabel(this.labelPrefix + 'end', end, {
                    x: this.toX(this.end),
                    y: h2,
                    align: 'right'
                });
            }
        }

        onZoom(zoom, anchor) {
            let date = this.fromX(anchor.x);
            let newZoom = this.validZoom(this.zoom * zoom, false);
            this.zoom = newZoom;
            let newX = this.toX(date);
            this.scroll += anchor.x - newX;
        }

        onStart(event, interaction) {
            this.killTweens();
            this.deltas = [];
            this.validScroll();
            // if (typeof ThrowPropsPlugin != 'undefined') {
            //     ThrowPropsPlugin.track(this, 'delta')
            // }
        }

        onMove(event, interaction) {
            let delta = interaction.delta();
            if (delta == null) {
                return
            }
            this.scroll += delta.x;
            if (this.draggable) {
                this.y += delta.y;
            }
            while (this.deltas.length > 10) {
                this.deltas.pop(0);
            }
            this.deltas.push(delta.x);
            if (interaction.current.size > 1) {
                this.onZoom(delta.zoom, delta.about);
            }
            this.redraw();
        }

        onEnd(event, interaction) {
            // if (typeof ThrowPropsPlugin != 'undefined') {
            //     let vel = ThrowPropsPlugin.getVelocity(this, 'delta')
            //     ThrowPropsPlugin.untrack(this)
            // }
            this.killTweens();
            this.redraw();
            let delta = 0;
            for (let d of this.deltas) {
                delta += d;
            }
            if (this.deltas.length > 0) {
                delta /= this.deltas.length;
            }
            this.autoScroll = true;
            let anchor = interaction.current.mean();
            this.keepInBounds(delta, anchor);
            for (let key of interaction.ended.keys()) {
                if (interaction.isDoubleTap(key)) {
                    this.onDoubleTap(event, interaction, key);
                } else if (interaction.isTap(key)) {
                    this.onTap(event, interaction, key);
                } else if (interaction.isLongPress(key)) {
                    this.onLongPress(event, interaction, key);
                }
            }
        }

        onLongPress(event, interaction, key) {
            for (let callback of this.onLongPressCallbacks) {
                callback(event, interaction, key);
            }
        }

        onTap(event, interaction, key) {
            for (let callback of this.onTapCallbacks) {
                callback(event, interaction, key);
            }
        }

        onDoubleTap(event, interaction, key) {
            for (let callback of this.onDoubleTapCallbacks) {
                callback(event, interaction, key);
            }
        }

        _scrollMinimum(bounded) {
            let total = this.totalWidth(bounded);
            return -total + this.wantedWidth - 2 * this.inset
        }

        _scrollMaximum(bounded) {
            let total = this.totalWidth(bounded);
            let limit = this.wantedWidth;
            if (total > limit) return 0
            let w = limit - 2 * this.inset;
            return (w - total) / 2
        }

        scrollMinimum(bounded) {
            return this._scrollMinimum(bounded) - this.extraRight
        }

        scrollMaximum(bounded) {
            return this._scrollMaximum(bounded) + this.extraLeft
        }

        killTweens() {
            TweenLite.killTweensOf(this);
            this.autoScroll = false;
        }

        validScroll(bounded = true) {
            let minimum = this.scrollMinimum(bounded);
            let maximum = this.scrollMaximum(bounded);
            if (this.scroll < minimum) {
                this.scroll = minimum;
            }
            if (this.scroll > maximum) {
                this.scroll = maximum;
            }
        }

        keepInBounds(delta, anchor) {
            let bounded = true;
            let minimum = this.scrollMinimum(bounded);
            let maximum = this.scrollMaximum(bounded);
            let tweens = {};
            if (this.zoom > this.maxZoom) {
                tweens.zoom = this.maxZoom;
                let date = this.fromX(anchor.x);
                let oldZoom = this.zoom;
                this.zoom = this.maxZoom;
                let newX = this.toX(date);
                tweens.scroll = this.scroll + anchor.x - newX;
                this.zoom = oldZoom;
            } else {
                if (this.zoom < this.minZoom) {
                    tweens.zoom = this.minZoom;
                }
                if (this.scroll > maximum) {
                    tweens.scroll = maximum;
                }
                if (this.scroll < minimum) {
                    tweens.scroll = minimum;
                }
            }
            if (!isEmpty(tweens)) {
                tweens.onUpdate = () => {
                    this.redraw();
                };
                TweenLite.to(this, 0.5, tweens).delay(0.1);
                return
            }
            this.scroll += delta;
            delta *= this.throwDamping;
            this.redraw();
            if (Math.abs(delta) > 1 && this.autoScroll) {
                setTimeout(() => this.keepInBounds(delta, anchor), 1000 / 100);
            }
        }

        onMouseWheel(event) {
            this.killTweens();
            let direction = event.detail < 0 || event.wheelDelta > 0;
            let anchor = { x: event.clientX, y: event.clientY };
            const zoomFactor = 1.5;
            this.onZoom(direction ? zoomFactor : 1 / zoomFactor, anchor);
            this.redraw();
            this.keepInBounds(0, anchor);
        }

        showRanges(ranges, label = 'Untitled', color = null) {
            for (let cr of this.colorRanges) {
                if (cr.label == label) return
            }
            while (this.colorRanges.length >= this.rangeColors.length) {
                this.colorRanges.shift();
            }
            this.colorRanges.push(new ColorRanges(label, color, ranges));
            this.redraw();
        }
    }

    /**
     * pixi.js scrollbox: a masked content box that can scroll vertically or horizontally with scrollbars
     */
    class Scrollbox extends PIXI.Container {
        /**
         * create a scrollbox
         * @param {object} options
         * @param {boolean} [options.dragScroll=true] user may drag the content area to scroll content
         * @param {string} [options.overflowX=auto] (none, scroll, hidden, auto) this changes whether the scrollbar is shown
         * @param {string} [options.overflowY=auto] (none, scroll, hidden, auto) this changes whether the scrollbar is shown
         * @param {string} [options.overflow] (none, scroll, hidden, auto) sets overflowX and overflowY to this value
         * @param {number} [options.boxWidth=100] width of scrollbox including scrollbar (in pixels)
         * @param {number} [options.boxHeight=100] height of scrollbox including scrollbar (in pixels)
         * @param {number} [options.scrollbarSize=10] size of scrollbar (in pixels)
         * @param {number} [options.scrollbarOffsetHorizontal=0] offset of horizontal scrollbar (in pixels)
         * @param {number} [options.scrollbarOffsetVertical=0] offset of vertical scrollbar (in pixels)
         * @param {boolean} [options.stopPropagation=true] call stopPropagation on any events that impact scrollbox
         * @param {number} [options.scrollbarBackground=0xdddddd] background color of scrollbar
         * @param {number} [options.scrollbarBackgroundAlpha=1] alpha of background of scrollbar
         * @param {number} [options.scrollbarForeground=0x888888] foreground color of scrollbar
         * @param {number} [options.scrollbarForegroundAlpha=1] alpha of foreground of scrollbar
         * @param {string} [options.underflow=top-left] what to do when content underflows the scrollbox size: none: do nothing; (left/right/center AND top/bottom/center); OR center (e.g., 'top-left', 'center', 'none', 'bottomright')
         * @param {(boolean|number)} [options.fade] fade the scrollbar when not in use (true = 1000ms)
         * @param {number} [options.fadeWait=3000] time to wait before fading the scrollbar if options.fade is set
         * @param {(string|function)} [options.fadeEase=easeInOutSine] easing function to use for fading
         */
        constructor(options) {
            super();
            this.options = Object.assign(
                {},
                {
                    boxWidth: 100,
                    boxHeight: 100,
                    scrollbarSize: 10,
                    scrollbarBackground: 14540253,
                    scrollbarBackgroundAlpha: 1,
                    scrollbarForeground: 8947848,
                    scrollbarForegroundAlpha: 1,
                    dragScroll: true,
                    stopPropagation: true,
                    scrollbarOffsetHorizontal: 0,
                    scrollbarOffsetVertical: 0,
                    underflow: 'top-left',
                    fadeScrollbar: false,
                    fadeWait: 3000,
                    fadeEase: 'easeInOutSine'
                },
                options
            );
            this.ease = new PIXI.extras.Ease.list();

            this.on('added', event => {
                this.update();
            });

            /**
             * content in placed in here
             * you can use any function from pixi-viewport on content to manually move the content (see https://davidfig.github.io/pixi-viewport/jsdoc/)
             * @type {PIXI.extras.Viewport}
             */
            this.content = this.addChild(
                new PIXI.extras.Viewport({
                    passiveWheel: this.options.stopPropagation,
                    stopPropagation: this.options.stopPropagation,
                    screenWidth: this.options.boxWidth,
                    screenHeight: this.options.boxHeight
                })
            );
            this.content.decelerate().on('moved', () => this._drawScrollbars());

            /**
             * graphics element for drawing the scrollbars
             * @type {PIXI.Graphics}
             */
            this.scrollbar = this.addChild(new PIXI.Graphics());
            this.scrollbar.interactive = true;
            this.scrollbar.on('pointerdown', this.scrollbarDown, this);
            this.interactive = true;
            this.on('pointermove', this.scrollbarMove, this);
            this.on('pointerup', this.scrollbarUp, this);
            this.on('pointercancel', this.scrollbarUp, this);
            this.on('pointerupoutside', this.scrollbarUp, this);
            this._maskContent = this.addChild(new PIXI.Graphics());
            this.update();
        }

        /**
         * offset of horizontal scrollbar (in pixels)
         * @type {number}
         */
        get scrollbarOffsetHorizontal() {
            return this.options.scrollbarOffsetHorizontal
        }
        set scrollbarOffsetHorizontal(value) {
            this.options.scrollbarOffsetHorizontal = value;
        }

        /**
         * offset of vertical scrollbar (in pixels)
         * @type {number}
         */
        get scrollbarOffsetVertical() {
            return this.options.scrollbarOffsetVertical
        }
        set scrollbarOffsetVertical(value) {
            this.options.scrollbarOffsetVertical = value;
        }

        /**
         * disable the scrollbox (if set to true this will also remove the mask)
         * @type {boolean}
         */
        get disable() {
            return this._disabled
        }
        set disable(value) {
            if (this._disabled !== value) {
                this._disabled = value;
                this.update();
            }
        }

        /**
         * call stopPropagation on any events that impact scrollbox
         * @type {boolean}
         */
        get stopPropagation() {
            return this.options.stopPropagation
        }
        set stopPropagation(value) {
            this.options.stopPropagation = value;
        }

        /**
         * user may drag the content area to scroll content
         * @type {boolean}
         */
        get dragScroll() {
            return this.options.dragScroll
        }
        set dragScroll(value) {
            this.options.dragScroll = value;
            if (value) {
                this.content.drag();
            } else {
                this.content.removePlugin('drag');
            }
            this.update();
        }

        /**
         * width of scrollbox including the scrollbar (if visible)- this changes the size and not the scale of the box
         * @type {number}
         */
        get boxWidth() {
            return this.options.boxWidth
        }
        set boxWidth(value) {
            this.options.boxWidth = value;
            this.content.screenWidth = value;
            this.update();
        }

        /**
         * sets overflowX and overflowY to (scroll, hidden, auto) changing whether the scrollbar is shown
         * scroll = always show scrollbar
         * hidden = hide overflow and do not show scrollbar
         * auto = if content is larger than box size, then show scrollbar
         * @type {string}
         */
        get overflow() {
            return this.options.overflow
        }
        set overflow(value) {
            this.options.overflow = value;
            this.options.overflowX = value;
            this.options.overflowY = value;
            this.update();
        }

        /**
         * sets overflowX to (scroll, hidden, auto) changing whether the scrollbar is shown
         * scroll = always show scrollbar
         * hidden = hide overflow and do not show scrollbar
         * auto = if content is larger than box size, then show scrollbar
         * @type {string}
         */
        get overflowX() {
            return this.options.overflowX
        }
        set overflowX(value) {
            this.options.overflowX = value;
            this.update();
        }

        /**
         * sets overflowY to (scroll, hidden, auto) changing whether the scrollbar is shown
         * scroll = always show scrollbar
         * hidden = hide overflow and do not show scrollbar
         * auto = if content is larger than box size, then show scrollbar
         * @type {string}
         */
        get overflowY() {
            return this.options.overflowY
        }
        set overflowY(value) {
            this.options.overflowY = value;
            this.update();
        }

        /**
         * height of scrollbox including the scrollbar (if visible) - this changes the size and not the scale of the box
         * @type {number}
         */
        get boxHeight() {
            return this.options.boxHeight
        }
        set boxHeight(value) {
            this.options.boxHeight = value;
            this.content.screenHeight = value;
            this.update();
        }

        /**
         * scrollbar size in pixels
         * @type {number}
         */
        get scrollbarSize() {
            return this.options.scrollbarSize
        }
        set scrollbarSize(value) {
            this.options.scrollbarSize = value;
        }

        /**
         * width of scrollbox less the scrollbar (if visible)
         * @type {number}
         * @readonly
         */
        get contentWidth() {
            return this.options.boxWidth - (this.isScrollbarVertical ? this.options.scrollbarSize : 0)
        }

        /**
         * height of scrollbox less the scrollbar (if visible)
         * @type {number}
         * @readonly
         */
        get contentHeight() {
            return this.options.boxHeight - (this.isScrollbarHorizontal ? this.options.scrollbarSize : 0)
        }

        /**
         * is the vertical scrollbar visible
         * @type {boolean}
         * @readonly
         */
        get isScrollbarVertical() {
            return this._isScrollbarVertical
        }

        /**
         * is the horizontal scrollbar visible
         * @type {boolean}
         * @readonly
         */
        get isScrollbarHorizontal() {
            return this._isScrollbarHorizontal
        }

        /**
         * top coordinate of scrollbar
         */
        get scrollTop() {
            return this.content.top
        }

        /**
         * left coordinate of scrollbar
         */
        get scrollLeft() {
            return this.content.left
        }

        /**
         * width of content area
         * if not set then it uses content.width to calculate width
         */
        get scrollWidth() {
            return this._scrollWidth || this.content.width
        }
        set scrollWidth(value) {
            this._scrollWidth = value;
        }

        /**
         * height of content area
         * if not set then it uses content.height to calculate height
         */
        get scrollHeight() {
            return this._scrollHeight || this.content.height
        }
        set scrollHeight(value) {
            this._scrollHeight = value;
        }

        /**
         * draws scrollbars
         * @private
         */
        _drawScrollbars() {
            this._isScrollbarHorizontal =
                this.overflowX === 'scroll'
                    ? true
                    : ['hidden', 'none'].indexOf(this.overflowX) !== -1
                        ? false
                        : this.scrollWidth > this.options.boxWidth;
            this._isScrollbarVertical =
                this.overflowY === 'scroll'
                    ? true
                    : ['hidden', 'none'].indexOf(this.overflowY) !== -1
                        ? false
                        : this.scrollHeight > this.options.boxHeight;
            this.scrollbar.clear();
            let options = {};
            options.left = 0;
            options.right = this.scrollWidth + (this._isScrollbarVertical ? this.options.scrollbarSize : 0);
            options.top = 0;
            options.bottom = this.scrollHeight + (this.isScrollbarHorizontal ? this.options.scrollbarSize : 0);
            const width = this.scrollWidth + (this.isScrollbarVertical ? this.options.scrollbarSize : 0);
            const height = this.scrollHeight + (this.isScrollbarHorizontal ? this.options.scrollbarSize : 0);
            this.scrollbarTop = (this.content.top / height) * this.boxHeight;
            this.scrollbarTop = this.scrollbarTop < 0 ? 0 : this.scrollbarTop;
            this.scrollbarHeight = (this.boxHeight / height) * this.boxHeight;
            this.scrollbarHeight =
                this.scrollbarTop + this.scrollbarHeight > this.boxHeight
                    ? this.boxHeight - this.scrollbarTop
                    : this.scrollbarHeight;
            this.scrollbarLeft = (this.content.left / width) * this.boxWidth;
            this.scrollbarLeft = this.scrollbarLeft < 0 ? 0 : this.scrollbarLeft;
            this.scrollbarWidth = (this.boxWidth / width) * this.boxWidth;
            this.scrollbarWidth =
                this.scrollbarWidth + this.scrollbarLeft > this.boxWidth
                    ? this.boxWidth - this.scrollbarLeft
                    : this.scrollbarWidth;
            if (this.isScrollbarVertical) {
                this.scrollbar
                    .beginFill(this.options.scrollbarBackground, this.options.scrollbarBackgroundAlpha)
                    .drawRect(
                        this.boxWidth - this.scrollbarSize + this.options.scrollbarOffsetVertical,
                        0,
                        this.scrollbarSize,
                        this.boxHeight
                    )
                    .endFill();
            }
            if (this.isScrollbarHorizontal) {
                this.scrollbar
                    .beginFill(this.options.scrollbarBackground, this.options.scrollbarBackgroundAlpha)
                    .drawRect(
                        0,
                        this.boxHeight - this.scrollbarSize + this.options.scrollbarOffsetHorizontal,
                        this.boxWidth,
                        this.scrollbarSize
                    )
                    .endFill();
            }
            if (this.isScrollbarVertical) {
                this.scrollbar
                    .beginFill(this.options.scrollbarForeground, this.options.scrollbarForegroundAlpha)
                    .drawRect(
                        this.boxWidth - this.scrollbarSize + this.options.scrollbarOffsetVertical,
                        this.scrollbarTop,
                        this.scrollbarSize,
                        this.scrollbarHeight
                    )
                    .endFill();
            }
            if (this.isScrollbarHorizontal) {
                this.scrollbar
                    .beginFill(this.options.scrollbarForeground, this.options.scrollbarForegroundAlpha)
                    .drawRect(
                        this.scrollbarLeft,
                        this.boxHeight - this.scrollbarSize + this.options.scrollbarOffsetHorizontal,
                        this.scrollbarWidth,
                        this.scrollbarSize
                    )
                    .endFill();
            }
            // this.content.forceHitArea = new PIXI.Rectangle(0, 0 , this.boxWidth, this.boxHeight)
            this.activateFade();
        }

        /**
         * draws mask layer
         * @private
         */
        _drawMask() {
            this._maskContent
                .beginFill(0)
                .drawRect(0, 0, this.boxWidth, this.boxHeight)
                .endFill();
            this.content.mask = this._maskContent;
        }

        /**
         * call when scrollbox content changes
         */
        update() {
            this.content.mask = null;
            this._maskContent.clear();
            if (!this._disabled) {
                this._drawScrollbars();
                this._drawMask();
                if (this.options.dragScroll) {
                    const direction =
                        this.isScrollbarHorizontal && this.isScrollbarVertical
                            ? 'all'
                            : this.isScrollbarHorizontal
                                ? 'x'
                                : 'y';
                    if (direction !== null) {
                        this.content
                            .drag({ clampWheel: true, direction })
                            .clamp({ direction, underflow: this.options.underflow });
                    }
                }
            }
        }

        /**
         * show the scrollbar and restart the timer for fade if options.fade is set
         */
        activateFade() {
            if (this.options.fade) {
                if (this.fade) {
                    this.ease.remove(this.fade);
                }
                this.scrollbar.alpha = 1;
                const time = this.options.fade === true ? 1000 : this.options.fade;
                this.fade = this.ease.to(this.scrollbar, { alpha: 0 }, time, {
                    wait: this.options.fadeWait,
                    ease: this.options.fadeEase
                });
                this.fade.on('each', () => (this.content.dirty = true));
            }
        }

        /**
         * handle pointer down on scrollbar
         * @param {PIXI.interaction.InteractionEvent} e
         * @private
         */
        scrollbarDown(e) {
            const local = this.toLocal(e.data.global);
            if (this.isScrollbarHorizontal) {
                if (local.y > this.boxHeight - this.scrollbarSize) {
                    if (local.x >= this.scrollbarLeft && local.x <= this.scrollbarLeft + this.scrollbarWidth) {
                        this.pointerDown = { type: 'horizontal', last: local };
                    } else {
                        if (local.x > this.scrollbarLeft) {
                            this.content.left += this.content.worldScreenWidth;
                            this.update();
                        } else {
                            this.content.left -= this.content.worldScreenWidth;
                            this.update();
                        }
                    }
                    if (this.options.stopPropagation) {
                        e.stopPropagation();
                    }
                    return
                }
            }
            if (this.isScrollbarVertical) {
                if (local.x > this.boxWidth - this.scrollbarSize) {
                    if (local.y >= this.scrollbarTop && local.y <= this.scrollbarTop + this.scrollbarWidth) {
                        this.pointerDown = { type: 'vertical', last: local };
                    } else {
                        if (local.y > this.scrollbarTop) {
                            this.content.top += this.content.worldScreenHeight;
                            this.update();
                        } else {
                            this.content.top -= this.content.worldScreenHeight;
                            this.update();
                        }
                    }
                    if (this.options.stopPropagation) {
                        e.stopPropagation();
                    }
                    return
                }
            }
        }

        /**
         * handle pointer move on scrollbar
         * @param {PIXI.interaction.InteractionEvent} e
         * @private
         */
        scrollbarMove(e) {
            if (this.pointerDown) {
                if (this.pointerDown.type === 'horizontal') {
                    const local = this.toLocal(e.data.global);
                    this.content.left += local.x - this.pointerDown.last.x;
                    this.pointerDown.last = local;
                    this.update();
                } else if (this.pointerDown.type === 'vertical') {
                    const local = this.toLocal(e.data.global);
                    this.content.top += local.y - this.pointerDown.last.y;
                    this.pointerDown.last = local;
                    this.update();
                }
                if (this.options.stopPropagation) {
                    e.stopPropagation();
                }
            }
        }

        /**
         * handle pointer down on scrollbar
         * @private
         */
        scrollbarUp() {
            this.pointerDown = null;
        }

        /**
         * resize the mask for the container
         * @param {object} options
         * @param {number} [options.boxWidth] width of scrollbox including scrollbar (in pixels)
         * @param {number} [options.boxHeight] height of scrollbox including scrollbar (in pixels)
         * @param {number} [options.scrollWidth] set the width of the inside of the scrollbox (leave null to use content.width)
         * @param {number} [options.scrollHeight] set the height of the inside of the scrollbox (leave null to use content.height)
         */
        resize(options) {
            this.options.boxWidth = typeof options.boxWidth !== 'undefined' ? options.boxWidth : this.options.boxWidth;
            this.options.boxHeight = typeof options.boxHeight !== 'undefined' ? options.boxHeight : this.options.boxHeight;
            if (options.scrollWidth) {
                this.scrollWidth = options.scrollWidth;
            }
            if (options.scrollHeight) {
                this.scrollHeight = options.scrollHeight;
            }
            this.content.resize(this.options.boxWidth, this.options.boxHeight, this.scrollWidth, this.scrollHeight);
            this.update();
        }

        /**
         * ensure that the bounding box is visible
         * @param {number} x - relative to content's coordinate system
         * @param {number} y
         * @param {number} width
         * @param {number} height
         */
        ensureVisible(x, y, width, height) {
            this.content.ensureVisible(x, y, width, height);
            this._drawScrollbars();
        }
    }

    /**
     * Class that represents a PixiJS Scrollview.
     *
     * @example
     * // Create the app
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 600,
     *     height: 400
     * }).setup().run()
     *
     * // Create the Scrollview
     * app.loader
     *     .add('elephant', './assets/elephant-1.jpg')
     *     .load((loader, resources) => {
     *         const sprite = new PIXI.Sprite(resources.elephant.texture)
     *         const scrollview = new Scrollview({boxWidth: 400, boxHeight: 300})
     *         scrollview.content.addChild(sprite)
     *         app.scene.addChild(scrollview)
     *
     * @class
     * @extends PIXI.extras.Scrollbox
     * @see {@link https://davidfig.github.io/pixi-scrollbox/jsdoc/Scrollbox.html|Scrollbox}
     * @see {@link https://davidfig.github.io/pixi-viewport/jsdoc/Viewport.html|Viewport}
     */
    class Scrollview extends Scrollbox {
        /**
         * Creates an instance of a Scrollview.
         *
         * @constructor
         * @see https://davidfig.github.io/pixi-scrollbox/jsdoc/Scrollbox.html
         */
        constructor(opts = {}) {
            super(opts);

            this.opts = opts;
        }

        /**
         * Creates children and instantiates everything.
         *
         * @private
         * @return {Scrollview} A reference to the Scrollview for chaining.
         */
        setup() {
            return this
        }

        /**
         * Should be called to refresh the layout of the Scrollview. Can be used after resizing.
         *
         * @return {Scrollview} A reference to the Scrollview for chaining.
         */
        layout() {
            this.update();

            return this
        }
    }

    /**
     * Callback for the slider action onStart.
     *
     * @callback onStartCallback
     * @param {object} event - The event object.
     * @param {Slider} slider - A reference to the slider (also this refers to the slider).
     */

    /**
     * Callback for the slider action onUpdate.
     *
     * @callback onUpdateCallback
     * @param {object} event - The event object.
     * @param {Slider} slider - A reference to the slider (also this refers to the slider).
     */

    /**
     * Callback for the slider action onComplete.
     *
     * @callback onCompleteCallback
     * @param {object} event - The event object.
     * @param {Slider} slider - A reference to the slider (also this refers to the slider).
     */

    /**
     * Class that represents a PixiJS Slider.
     *
     * @example
     * // Create the app
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 900,
     *     height: 250
     * }).setup().run()
     *
     * // Create the slider
     * const slider = new Slider({
     *     x: 10,
     *     y: 20
     * })
     *
     * // Add the slider to a DisplayObject
     * app.scene.addChild(slider)
     *
     * @class
     * @extends PIXI.Container
     * @see {@link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container}
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/slider.html|DocTest}
     */
    class Slider extends PIXI.Container {
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
                TweenLite.to(this.control, this.theme.fast, { alpha: 0.83 });
            });

            this.sliderObj.on('pointerout', e => {
                TweenLite.to(this.control, this.theme.fast, { alpha: 1 });
            });

            this.sliderObj.on('pointerdown', e => {
                this.sliderObj.pointerdowned = true;
                TweenLite.to(this.control, this.theme.fast, { alpha: 0.7 });
            });

            // Click on the slider bar
            this.sliderObj.on('pointerup', e => {
                if (this.sliderObj.pointerdowned) {
                    this.sliderObj.pointerdowned = false;
                    const position = e.data.getLocalPosition(this.control.parent);
                    this.value = this.pixelToValue(position.x - this.opts.controlRadius);
                    TweenLite.to(this.control, this.theme.fast, { alpha: 0.83 });
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

            TweenLite.to(this.control, this.theme.fast, { x });
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

    /* eslint-disable no-undef */

    class StylusCommand extends Object {
        constructor() {
            super();
        }

        do(stylus) {
            stylus.commandStack.push(this);
        }

        undo(stylus) {
            stylus.undoCommandStack.push(this);
        }

        redo(stylus) {
            this.do(stylus);
        }
    }

    class StrokeCommand extends StylusCommand {
        constructor(stroke) {
            super();
            this.stroke = stroke;
        }

        do(stylus) {
            if (this.stroke.length > 0) {
                super.do(stylus);
                stylus.stroke = [];
                stylus.strokes.push(this.stroke);
                stylus.redraw();
                stylus.changed();
            }
        }

        undo(stylus) {
            if (this.stroke.length > 0) {
                super.undo(stylus);
                stylus.strokes.pop();
                stylus.redraw();
                stylus.changed();
            }
        }
    }

    class ClearCommand extends StylusCommand {
        do(stylus) {
            // Clears the command stack
            stylus.commandStack = [];
            super.do(stylus);
            this.strokes = stylus.strokes;
            stylus.stroke = [];
            stylus.strokes = [];
            stylus.redraw();
            stylus.changed();
        }

        undo(stylus) {
            //super.undo(stylus) // Clear all is not redoable
            stylus.stroke = [];
            stylus.strokes = this.strokes;
            stylus.redraw();
            stylus.changed();
        }
    }

    class Stylus extends PIXI.Graphics {
        constructor({
            width = window.innerWidth,
            height = window.innerHeight,
            interactive = true,
            color = 0x000000,
            tiltX = 0,
            tiltY = 0,
            backgroundAlpha = 1,
            backgroundFill = 0xffffff,
            colorAlpha = 1,
            captureEvents = true,
            acceptMouseEvents = true
        } = {}) {
            super();
            this.activePointers = 0;
            this.wantedWidth = width;
            this.wantedHeight = height;
            this.backgroundAlpha = backgroundAlpha;
            this.backgroundFill = backgroundFill;
            this.colorAlpha = colorAlpha;
            this.color = color;
            this.interactive = interactive;
            this.debug = false;
            this.tiltX = tiltX; // degrees -90 ... 90
            this.tiltY = tiltY; // degrees -90 ... 90
            this.captureEvents = captureEvents;
            this.commandStack = [];
            this.undoCommandStack = [];
            this.strokes = [];
            this.stroke = [];
            this.minStrokeLength = 4;
            if (captureEvents) this.registerEventHandler(acceptMouseEvents);
            this.drawBackground();
        }

        drawBackground() {
            this.clear();
            this.beginFill(this.backgroundFill, this.backgroundAlpha);
            this.drawRect(0, 0, this.wantedWidth, this.wantedHeight);
            this.endFill();
        }

        touchToPoint(t) {
            return { x: t.clientX, y: t.clientY }
        }

        isStylusPointer(event) {
            let identifier = event.data.identifier;
            if (typeof event.data.originalEvent.changedTouches !== 'undefined') {
                for (let touch of event.data.originalEvent.changedTouches) {
                    if (touch.identifier === identifier && touch.touchType === 'stylus') {
                        this.tiltX = Angle.radian2degree(touch.azimuthAngle);
                        this.tiltY = 90.0 - Angle.radian2degree(touch.altitudeAngle);
                        return true
                    }
                }
            }
            // UO: Not tested since the Sprot delivered "mouse" events to Chrome
            if (event.data.originalEvent.pointerType === 'pen') {
                this.tiltX = event.data.originalEvent.tiltX;
                this.tiltY = event.data.originalEvent.tiltY;
                return true
            }
            return false
        }

        isStylusTouch(event) {
            let identifier = event.data.identifier;
            if (typeof event.data.originalEvent.changedTouches !== 'undefined') {
                for (let touch of event.data.originalEvent.changedTouches) {
                    if (touch.identifier === identifier && touch.pointerType === 'touch') {
                        return true
                    }
                }
            }
            return false
        }

        getPointerID(event) {
            let identifier = event.data.identifier;
            for (let touch of event.data.originalEvent.changedTouches) {
                if (touch.identifier === identifier) {
                    return touch.pointerId
                }
            }
        }

        singlePointer() {
            return this.activePointers == 1
        }

        registerEventHandler() {
            window.addEventListener('keydown', e => {
                switch (e.keyCode) {
                    case 38: // up arrow
                        this.tiltX += 5;
                        break
                    case 40: // down arrow
                        this.tiltX -= 5;
                        break
                    case 37: // left arrow
                        this.tiltY -= 5;
                        break
                    case 39: // right arrow
                        this.tiltY += 5;
                        break
                }
                if (this.debug) console.log('keydown', e.keyCode, this.tiltX, this.tiltY);
            });

            this.on('pointerdown', e => {
                if (this.debug) console.log('pointerdown', e);
                if (this.eventInside(e)) {
                    this.activePointers += 1;
                    if (this.singlePointer()) {
                        this.startStroke(this.toStroke(e));
                    }
                }
            });

            this.on('pointermove', e => {
                if (Events$1.isPointerDown(e.data.originalEvent) || this.isStylusPointer(e) || this.isStylusTouch(e)) {
                    if (this.debug) console.log('pointermove', e, this.eventInside(e));
                    if (this.eventInside(e) && this.singlePointer()) this.moveStroke(this.toStroke(e));
                }
            });
            this.on('pointerup', e => {
                if (this.eventInside(e)) {
                    if (this.activePointers > 0) {
                        this.activePointers -= 1;
                        this.endStroke(this.toStroke(e));
                    }
                }
                if (this.debug) console.log('pointerup', this.activePointers);
            });
            this.on('pointerleave', e => {
                if (this.activePointers > 0) {
                    this.activePointers -= 1;
                }
                this.endStroke(this.toStroke(e));
            });
            this.on('pointercancel', e => {
                if (this.activePointers > 0) {
                    this.activePointers -= 1;
                }
                this.endStroke(this.toStroke(e));
            });
        }

        undoable() {
            return this.commandStack.length > 0
        }

        redoable() {
            return this.undoCommandStack.length > 0
        }

        undo() {
            if (this.undoable()) {
                let cmd = this.commandStack.pop();
                cmd.undo(this);
            }
        }

        redo() {
            if (this.redoable()) {
                let cmd = this.undoCommandStack.pop();
                cmd.redo(this);
            }
        }

        eventInside(event) {
            let local = this.toLocal(event.data.global);
            for (let child of this.children) {
                let r = child.getBounds();
                if (r.contains(local.x, local.y)) {
                    console.log('Child touched');
                    return false
                }
            }
            if (local.x < 0 || local.x > this.wantedWidth) return false
            if (local.y < 0 || local.y > this.wantedHeight) return false
            event.stopPropagation();
            // if (this.debug) console.log('stopPropagation', event)
            if (event.data.originalEvent.claimedByScatter) {
                return false
            }
            return true
        }

        toLocalPoint(event) {
            return this.toLocal(event.data.global)
        }

        toStroke(event) {
            let local = this.toLocalPoint(event);
            let x = Math.max(0, Math.min(local.x, this.wantedWidth));
            let y = Math.max(0, Math.min(local.y, this.wantedHeight));
            let desc = {
                x,
                y,
                pressure: event.pressure || null,
                tiltX: this.tiltX,
                tiltY: this.tiltY,
                color: this.color
            };
            return desc
        }

        startStroke(info) {
            this.stroke = [info];
            this.redraw();
        }

        moveStroke(info) {
            this.stroke.push(info);
            this.redraw();
        }

        // eslint-disable-next-line no-unused-vars
        endStroke(info) {
            if (this.stroke.length >= this.minStrokeLength) {
                let cmd = new StrokeCommand(this.stroke);
                cmd.do(this);
            }
        }

        tiltToLineWidth(value) {
            return 16 //Math.round(Math.abs(value / 10) + 1)
        }

        drawStroke(stroke) {
            if (stroke.length) {
                let start = stroke[0];
                this.beginFill(0, 0);
                this.moveTo(start.x, start.y);
                let lineWidth = this.tiltToLineWidth(start.tiltY);
                this.lineStyle(lineWidth, start.color, this.colorAlpha);
                for (let i = 1; i < stroke.length; i++) {
                    let info = stroke[i];
                    let lw = this.tiltToLineWidth(info.tiltY);
                    if (lw != lineWidth) {
                        lineWidth = lw;
                        this.lineStyle(lineWidth, info.color, this.colorAlpha);
                    }
                    this.lineTo(info.x, info.y);
                }
                this.endFill();
            }
        }

        drawTouch(point) {
            this.beginFill(0, 0);
            this.drawCircle(point.x, point.y, 22);
            this.endFill();
        }

        drawStrokes() {
            this.drawBackground();
            this.lineStyle(1.0, 0xff0000, 1);
            for (let stroke of this.iterStrokes()) {
                this.drawStroke(stroke);
            }
        }

        redraw() {
            this.drawStrokes();
        }

        // Can be overwritten if different levels of strokes are necessary
        *iterStrokes() {
            for (let stroke of this.strokes) {
                yield stroke;
            }
            yield this.stroke;
        }

        changed() {
            // Can be overwritten
        }

        clearAll() {
            let cmd = new ClearCommand();
            cmd.do(this);
        }

        normalizeInfo(info) {
            let { x, y, pressure, tiltX, tiltY, color } = info;
            x /= this.wantedWidth;
            y /= this.wantedHeight;
            return { x, y, pressure, tiltX, tiltY, color }
        }

        denormalizeInfo(info) {
            let { x, y, pressure, tiltX, tiltY, color } = info;
            x = x * this.wantedWidth;
            y = y * this.wantedHeight;
            return { x, y, pressure, tiltX, tiltY, color }
        }

        // Convert strokes into an object that can be stored in an Indexed DB.
        // Returns normalized strokes
        toObject() {
            let result = [];
            for (let stroke of this.strokes) {
                let normalized = [];
                for (let info of stroke) {
                    normalized.push(this.normalizeInfo(info));
                }
                result.push(normalized);
            }
            return result
        }

        // Read normalized strokes from an object from an Indexed DB.
        fromObject(normalizedStrokes) {
            this.strokes = [];
            for (let stroke of normalizedStrokes) {
                let denormalized = [];
                for (let info of stroke) {
                    denormalized.push(this.denormalizeInfo(info));
                }
                this.strokes.push(denormalized);
            }
        }

        // Convert strokes into a JSON object that can be stored in an Indexed DB
        toJSON() {
            return JSON.stringify(this.toObject())
        }

        // Convert strokes from a JSON
        fromJSON(json) {
            this.fromObject(JSON.parse(json));
        }

        // Returns a set of used colors
        usedColors() {
            let used = new Set();
            for (let info of this.stroke) {
                used.add(info.color);
            }
            for (let stroke of this.strokes) {
                for (let info of stroke) {
                    used.add(info.color);
                }
            }
            return used.values()
        }
    }

    /**
     * Callback for the switch action.
     *
     * @callback actionCallback
     * @param {object} event - The event object.
     * @param {Switch} switch - A reference to the switch (also this refers to the switch).
     */

    /**
     * Callback for the switch action.
     *
     * @callback actionActiveCallback
     * @param {object} event - The event object.
     * @param {Switch} switch - A reference to the switch (also this refers to the switch).
     */

    /**
     * Callback for the switch beforeAction.
     *
     * @callback beforeActionCallback
     * @param {object} event - The event object.
     * @param {Switch} switch - A reference to the switch (also this refers to the switch).
     */

    /**
     * Callback for the switch afterAction.
     *
     * @callback afterActionCallback
     * @param {object} event - The event object.
     * @param {Switch} switch - A reference to the switch (also this refers to the switch).
     */

    /**
     * Class that represents a PixiJS Switch.
     *
     * @example
     * // Create the app
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 900,
     *     height: 250
     * }).setup().run()
     *
     * // Create the switch
     * const switch1 = new Switch({
     *     x: 10,
     *     y: 20
     * })
     *
     * // Add the switch to a DisplayObject
     * app.scene.addChild(switch1)
     *
     * @class
     * @extends PIXI.Container
     * @see {@link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container}
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/switch.html|DocTest}
     */
    class Switch extends PIXI.Container {
        /**
         * Creates an instance of a Switch.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the switch.
         * @param {number} [opts.id=auto generated] - The id of the switch.
         * @param {number} [opts.x=0] - The x position of the switch. Can be also set after creation with switch.x = 0.
         * @param {number} [opts.y=0] - The y position of the switch. Can be also set after creation with switch.y = 0.
         * @param {string|Theme} [opts.theme=dark] - The theme to use for this switch. Possible values are dark, light, red
         *     or a Theme object.
         * @param {number} [opts.width=44] - The width of the switch.
         * @param {number} [opts.height=28] - The height of the switch.
         * @param {number} [opts.fill=Theme.fill] - The color of the switch background as a hex value.
         * @param {number} [opts.fillAlpha=Theme.fillAlpha] - The alpha value of the background.
         * @param {number} [opts.fillActive=Theme.fillActive] - The color of the switch background when activated.
         * @param {number} [opts.fillActiveAlpha=Theme.fillActiveAlpha] - The alpha value of the background when activated.
         * @param {number} [opts.stroke=Theme.stroke] - The color of the border as a hex value.
         * @param {number} [opts.strokeWidth=Theme.strokeWidth] - The width of the border in pixel.
         * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
         * @param {number} [opts.strokeActive=Theme.strokeActive] - The color of the border when activated.
         * @param {number} [opts.strokeActiveWidth=Theme.strokeActiveWidth] - The width of the border in pixel when activated.
         * @param {number} [opts.strokeActiveAlpha=Theme.strokeActiveAlpha] - The alpha value of the border when activated.
         * @param {number} [opts.controlFill=Theme.stroke] - The color of the switch control background as a hex value.
         * @param {number} [opts.controlFillAlpha=Theme.strokeAlpha] - The alpha value of the background.
         * @param {number} [opts.controlFillActive=Theme.stroke] - The color of the switch control background when activated.
         * @param {number} [opts.controlFillActiveAlpha=Theme.strokeAlpha] - The alpha value of the background when activated.
         * @param {number} [opts.controlStroke=Theme.stroke] - The color of the border as a hex value.
         * @param {number} [opts.controlStrokeWidth=Theme.strokeWidth * 0.8] - The width of the border in pixel.
         * @param {number} [opts.controlStrokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
         * @param {number} [opts.controlStrokeActive=Theme.stroke] - The color of the border when activated.
         * @param {number} [opts.controlStrokeActiveWidth=Theme.strokeActiveWidth * 0.8] - The width of the border in pixel when activated.
         * @param {number} [opts.controlStrokeActiveAlpha=Theme.strokeActiveAlpha] - The alpha value of the border when activated.
         * @param {number} [opts.duration=Theme.fast] - The duration of the animation when the switch gets activated in seconds.
         * @param {number} [opts.durationActive=Theme.fast] - The duration of the animation when the switch gets deactivated in seconds.
         * @param {boolean} [opts.disabled=false] - Is the switch disabled? When disabled, the switch has a lower alpha value
         *     and cannot be clicked (interactive is set to false).
         * @param {boolean} [opts.active=false] - Is the button initially active?
         * @param {actionCallback} [opts.action] - Executed when the switch was triggered in inactive state (by pointerup).
         * @param {actionActiveCallback} [opts.actionActive] - Executed when the button was triggered in active state (by pointerup).
         * @param {beforeActionCallback} [opts.beforeAction] - Executed before an action is triggered.
         * @param {afterActionCallback} [opts.afterAction] - Executed after an action was triggered.
         * @param {string|object} [opts.tooltip] - A string for the label of the tooltip or an object to configure the tooltip
         *     to display.
         * @param {boolean} [opts.visible=true] - Is the switch initially visible (property visible)?
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
                    width: 44,
                    height: 28,
                    fill: theme.fill,
                    fillAlpha: theme.fillAlpha,
                    fillActive: theme.primaryColor,
                    fillActiveAlpha: theme.fillActiveAlpha,
                    stroke: theme.stroke,
                    strokeWidth: theme.strokeWidth,
                    strokeAlpha: theme.strokeAlpha,
                    strokeActive: theme.primaryColor,
                    strokeActiveWidth: theme.strokeActiveWidth,
                    strokeActiveAlpha: theme.strokeActiveAlpha,
                    controlFill: theme.stroke,
                    controlFillAlpha: theme.strokeAlpha,
                    controlFillActive: theme.stroke,
                    controlFillActiveAlpha: theme.strokeAlpha,
                    controlStroke: theme.stroke,
                    controlStrokeWidth: theme.strokeWidth * 0.8,
                    controlStrokeAlpha: theme.strokeAlpha,
                    controlStrokeActive: theme.stroke,
                    controlStrokeActiveWidth: theme.strokeActiveWidth * 0.8,
                    controlStrokeActiveAlpha: theme.strokeActiveAlpha,
                    duration: theme.fast,
                    durationActive: theme.fast,
                    disabled: false,
                    active: false,
                    action: null,
                    actionActive: null,
                    beforeAction: null,
                    afterAction: null,
                    tooltip: null,
                    visible: true
                },
                opts
            );

            this.opts.controlRadius = this.opts.controlRadius || this.opts.height / 2;
            this.opts.controlRadiusActive = this.opts.controlRadiusActive || this.opts.controlRadius;

            // Validation
            //-----------------
            if (this.opts.height > this.opts.width) {
                this.opts.height = this.opts.width;
            }

            // Properties
            //-----------------
            this.id = this.opts.id;
            this.radius = this.opts.height / 2;

            this._active = null;
            this._disabled = null;

            this.switchObj = null;
            this.control = null;
            this.tooltip = null;

            this.visible = this.opts.visible;

            // animated
            //-----------------
            this.tempAnimated = {
                fill: this.opts.fill,
                fillAlpha: this.opts.fillAlpha,
                stroke: this.opts.stroke,
                strokeWidth: this.opts.strokeWidth,
                strokeAlpha: this.opts.strokeAlpha,
                controlFill: this.opts.controlFill,
                controlFillAlpha: this.opts.controlFillAlpha,
                controlStroke: this.opts.controlStroke,
                controlStrokeWidth: this.opts.controlStrokeWidth,
                controlStrokeAlpha: this.opts.controlStrokeAlpha,
                controlRadius: this.opts.controlRadius
            };

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
         * @return {Switch} A reference to the switch for chaining.
         */
        setup() {
            // Switch
            //-----------------
            let switchObj = new PIXI.Graphics();
            this.switchObj = switchObj;
            this.addChild(switchObj);

            // Control
            //-----------------
            this.xInactive = this.opts.controlRadius;
            this.xActive = this.opts.width - this.opts.controlRadiusActive;

            let control = new PIXI.Graphics();
            control.x = this.opts.active ? this.xActive : this.xInactive;
            control.y = this.opts.height / 2;

            this.control = control;

            this.addChild(this.control);

            // interaction
            //-----------------
            this.switchObj.on('pointerover', e => {
                TweenLite.to(this.control, this.theme.fast, { alpha: 0.83 });
            });

            this.switchObj.on('pointerout', e => {
                TweenLite.to(this.control, this.theme.fast, { alpha: 1 });
            });

            this.switchObj.on('pointerdown', e => {
                TweenLite.to(this.control, this.theme.fast, { alpha: 0.7 });
            });

            this.switchObj.on('pointerup', e => {
                if (this.opts.beforeAction) {
                    this.opts.beforeAction.call(this, e, this);
                }

                this.active = !this.active;

                if (this.active) {
                    if (this.opts.action) {
                        this.opts.action.call(this, e, this);
                    }
                } else {
                    if (this.opts.actionActive) {
                        this.opts.actionActive.call(this, e, this);
                    }
                }

                TweenLite.to(this.control, this.theme.fast, { alpha: 0.83 });

                if (this.opts.afterAction) {
                    this.opts.afterAction.call(this, e, this);
                }
            });

            // disabled
            //-----------------
            this.disabled = this.opts.disabled;

            // active
            //-----------------
            this.active = this.opts.active;

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
         * Should be called to refresh the layout of the switch. Can be used after resizing.
         *
         * @return {Switch} A reference to the switch for chaining.
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
         * Draws the switch to the canvas.
         *
         * @private
         * @return {Switch} A reference to the switch for chaining.
         */
        draw() {
            this.switchObj.clear();
            if (this.active) {
                this.switchObj.lineStyle(this.opts.strokeActiveWidth, this.opts.strokeActive, this.opts.strokeActiveAlpha);
                this.switchObj.beginFill(this.opts.fillActive, this.opts.fillActiveAlpha);
            } else {
                this.switchObj.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
                this.switchObj.beginFill(this.opts.fill, this.opts.fillAlpha);
            }
            this.switchObj.moveTo(this.radius, 0);
            this.switchObj.lineTo(this.opts.width - this.radius, 0);
            this.switchObj.arcTo(this.opts.width, 0, this.opts.width, this.radius, this.radius);
            this.switchObj.lineTo(this.opts.width, this.radius + 1); // BUGFIX: If not specified, there is a small area without a stroke.
            this.switchObj.arcTo(
                this.opts.width,
                this.opts.height,
                this.opts.width - this.radius,
                this.opts.height,
                this.radius
            );
            this.switchObj.lineTo(this.radius, this.opts.height);
            this.switchObj.arcTo(0, this.opts.height, 0, this.radius, this.radius);
            this.switchObj.arcTo(0, 0, this.radius, 0, this.radius);
            this.switchObj.endFill();

            // Draw control
            this.control.clear();
            if (this.active) {
                this.control.lineStyle(
                    this.opts.controlStrokeActiveWidth,
                    this.opts.controlStrokeActive,
                    this.opts.controlStrokeActiveAlpha
                );
                this.control.beginFill(this.opts.controlFillActive, this.opts.controlFillActiveAlpha);
                this.control.drawCircle(0, 0, this.opts.controlRadiusActive - 1);
            } else {
                this.control.lineStyle(this.opts.controlStrokeWidth, this.opts.controlStroke, this.opts.controlStrokeAlpha);
                this.control.beginFill(this.opts.controlFill, this.opts.controlFillAlpha);
                this.control.drawCircle(0, 0, this.opts.controlRadius - 1);
            }
            this.control.endFill();

            return this
        }

        /**
         * Draws the animation.
         *
         * @private
         * @return {Switch} A reference to the switch for chaining.
         */
        drawAnimated() {
            this.switchObj.clear();
            this.switchObj.lineStyle(this.tempAnimated.strokeWidth, this.tempAnimated.stroke, this.tempAnimated.strokeAlpha);
            this.switchObj.beginFill(this.tempAnimated.fill, this.tempAnimated.fillAlpha);
            this.switchObj.moveTo(this.radius, 0);
            this.switchObj.lineTo(this.opts.width - this.radius, 0);
            this.switchObj.arcTo(this.opts.width, 0, this.opts.width, this.radius, this.radius);
            this.switchObj.lineTo(this.opts.width, this.radius + 1); // BUGFIX: If not specified, there is a small area without a stroke.
            this.switchObj.arcTo(
                this.opts.width,
                this.opts.height,
                this.opts.width - this.radius,
                this.opts.height,
                this.radius
            );
            this.switchObj.lineTo(this.radius, this.opts.height);
            this.switchObj.arcTo(0, this.opts.height, 0, this.radius, this.radius);
            this.switchObj.arcTo(0, 0, this.radius, 0, this.radius);
            this.switchObj.endFill();

            this.control.clear();
            this.control.lineStyle(
                this.tempAnimated.controlStrokeWidth,
                this.tempAnimated.controlStroke,
                this.tempAnimated.controlStrokeAlpha
            );
            this.control.beginFill(this.tempAnimated.controlFill, this.tempAnimated.controlFillAlpha);
            this.control.drawCircle(0, 0, this.tempAnimated.controlRadius - 1);
            this.control.endFill();

            return this
        }

        /**
         * Gets or sets the active state.
         *
         * @member {boolean}
         */
        get active() {
            return this._active
        }

        set active(value) {
            this._active = value;

            if (this._active) {
                TweenLite.to(this.control, this.opts.duration, { x: this.xActive });
                TweenLite.to(this.tempAnimated, this.opts.duration, {
                    colorProps: {
                        fill: this.opts.fillActive,
                        stroke: this.opts.strokeActive,
                        controlFill: this.opts.controlFillActive,
                        controlStroke: this.opts.controlStrokeActive,
                        format: 'number'
                    },
                    fillAlpha: this.opts.fillActiveAlpha,
                    strokeWidth: this.opts.strokeActiveWidth,
                    strokeAlpha: this.opts.strokeActiveAlpha,
                    controlFillAlpha: this.opts.controlFillActiveAlpha,
                    controlStrokeWidth: this.opts.controlStrokeActiveWidth,
                    controlStrokeAlpha: this.opts.controlStrokeActiveAlpha,
                    controlRadius: this.opts.controlRadiusActive,
                    onUpdate: () => this.drawAnimated(),
                    onComplete: () => this.draw()
                });
            } else {
                TweenLite.to(this.control, this.opts.durationActive, {
                    x: this.xInactive
                });
                TweenLite.to(this.tempAnimated, this.opts.durationActive, {
                    colorProps: {
                        fill: this.opts.fill,
                        stroke: this.opts.stroke,
                        controlFill: this.opts.controlFill,
                        controlStroke: this.opts.controlStroke,
                        format: 'number'
                    },
                    fillAlpha: this.opts.fillAlpha,
                    strokeWidth: this.opts.strokeWidth,
                    strokeAlpha: this.opts.strokeAlpha,
                    controlFillAlpha: this.opts.controlFillAlpha,
                    controlStrokeWidth: this.opts.controlStrokeWidth,
                    controlStrokeAlpha: this.opts.controlStrokeAlpha,
                    controlRadius: this.opts.controlRadius,
                    onUpdate: () => this.drawAnimated(),
                    onComplete: () => this.draw()
                });
            }
        }

        /**
         * Gets or sets the disabled state. When disabled, the switch cannot be clicked.
         *
         * @member {boolean}
         */
        get disabled() {
            return this._disabled
        }

        set disabled(value) {
            this._disabled = value;

            if (this._disabled) {
                this.switchObj.interactive = false;
                this.switchObj.buttonMode = false;
                this.switchObj.alpha = 0.5;
                this.control.alpha = 0.5;
            } else {
                this.switchObj.interactive = true;
                this.switchObj.buttonMode = true;
                this.switchObj.alpha = 1;
                this.control.alpha = 1;
            }
        }

        /**
         * Shows the switch (sets his alpha values to 1).
         *
         * @return {Switch} A reference to the switch for chaining.
         */
        show() {
            this.opts.strokeAlpha = 1;
            this.opts.strokeActiveAlpha = 1;
            this.opts.fillAlpha = 1;
            this.opts.fillActiveAlpha = 1;
            this.opts.controlStrokeAlpha = 1;
            this.opts.controlStrokeActiveAlpha = 1;
            this.opts.controlFillAlpha = 1;
            this.opts.controlFillActiveAlpha = 1;

            this.layout();

            return this
        }

        /**
         * Hides the switch (sets his alpha values to 1).
         *
         * @return {Switch} A reference to the switch for chaining.
         */
        hide() {
            this.opts.strokeAlpha = 0;
            this.opts.strokeActiveAlpha = 0;
            this.opts.fillAlpha = 0;
            this.opts.fillActiveAlpha = 0;
            this.opts.controlStrokeAlpha = 0;
            this.opts.controlStrokeActiveAlpha = 0;
            this.opts.controlFillAlpha = 0;
            this.opts.controlFillActiveAlpha = 0;

            this.layout();

            return this
        }
    }

    /**
     * Class that represents a PixiJS PopupMenu.
     *
     * @example
     * // Create the button and the modal when clicked
     * const button = new Button({
     *     label: 'Show PopupMenu',
     *     action: e => {
     *         const popupmenu = new PopupMenu({
     *             items: [
     *                 {label: 'Save', action: () => alert('Saved')},
     *                 {label: 'Edit', action: () => alert('Edited')},
     *                 {label: 'Delete', action: () => alert('Deleted')}
     *             ]
     *         })
     *         app.scene.addChild(popupmenu)
     *     }
     * })
     *
     * // Add the button to a DisplayObject
     * app.scene.addChild(button)
     *
     * @class
     * @extends Popup
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/popupmenu.html|DocTest}
     */
    class PopupMenu extends Popup {
        /**
         * Creates an instance of a PopupMenu.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the modal.
         * @param {object[]} [opts.items=[]] - A list of the menu items. Each item must be of type object.
         *     If an object has a label property, a PIXI.Text object is created (using the textStyle property).
         *     If an object hasn't a label property, it must contain a content property which has to be a
         *     PIXI.DisplayObject.
         * @param {number} [opts.margin=Theme.margin / 2] - The app where the modal belongs to.
         * @param {object} [opts.textStyle=Theme.textStyle] - The color of the background.
         * @param {boolean} [opts.closeOnPopup=true] - The opacity of the background.
         */
        constructor(opts = {}) {
            const theme = Theme.fromString(opts.theme);

            opts = Object.assign(
                {},
                {
                    items: [],
                    margin: theme.margin / 2,
                    textStyle: theme.textStyle,
                    closeOnPopup: true
                },
                opts
            );

            super(opts);
        }

        /**
         * Creates children and instantiates everything.
         *
         * @private
         * @return {PopupMenu} A reference to the popupmenu for chaining.
         */
        setup() {
            // content
            //-----------------
            const content = new PIXI.Container();

            let y = 0;
            for (let item of this.opts.items) {
                let object = null;

                if (item.label) {
                    object = new PIXI.Text(item.label, item.textStyle || this.opts.textStyle);
                } else {
                    object = item.content;
                }

                object.y = y;

                if (item.action) {
                    if (item.disabled) {
                        object.alpha = 0.5;
                    } else {
                        object.interactive = true;
                        object.buttonMode = true;
                    }
                    object.on('pointerover', e => {
                        TweenLite.to(object, this.theme.fast, {
                            alpha: 0.83,
                            overwrite: 'none'
                        });
                    });
                    object.on('pointerout', e => {
                        TweenLite.to(object, this.theme.fast, {
                            alpha: 1,
                            overwrite: 'none'
                        });
                    });
                    object.on('pointerup', e => {
                        item.action.call(object, e, object);
                        if (this.opts.closeOnAction) {
                            this.hide();
                        }
                    });
                }

                content.addChild(object);

                y += object.height + this.opts.margin;
            }

            this.opts.content = content;

            super.setup();
        }
    }

    /* global Quad */

    /**
     * Class that represents a PixiJS Volatile.
     *
     * @example
     * const app = new PIXIApp({
     *     view: canvas,
     *     width: 900,
     *     height: 250
     * }).setup().run()
     *
     * const button = new Button({
     *     label: 'Volatile!',
     *     action: () => {
     *         new Volatile({
     *             object: button,
     *             direction: 'right',
     *             destroyOnComplete: false
     *         })
     *     }
     * })
     *
     * app.scene.addChild(button)
     *
     * @class
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/volatile.html|DocTest}
     */
    class Volatile {
        /**
         * Creates an instance of a Volatile.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the modal.
         * @param {number} [opts.id=auto generated] - The id of the tooltip.
         * @param {PIXI.DisplayObject|PIXI.DisplayObject[]} opts.object - The object where the volatile should be applied to.
         * @param {string} [opts.direction=top] - The animation direction. Possible values: top, right, bottom, left.
         * @param {function} [opts.onStart] - A function which is executed when the volatile animation starts.
         * @param {function} [opts.onComplete] - A function which is executed when the volatile animation finishes.
         * @param {number} [opts.distance=160] - The animation distance.
         * @param {number} [opts.duration=1.5] - The duration of the animation in seconds.
         * @param {object} [opts.ease=Quad.easeOut] - The easing of the animation, see {@link https://greensock.com/docs/Easing}
         * @param {boolean} [opts.destroyOnComplete=true] - Should the object be destroyed after the volatile animation?
         */
        constructor(opts = {}) {
            const theme = Theme.fromString(opts.theme);
            this.theme = theme;

            this.opts = Object.assign(
                {},
                {
                    id: PIXI.utils.uid(),
                    object: null,
                    direction: 'top', // top, right, bottom, left
                    onStart: null,
                    onComplete: null,
                    distance: 160,
                    duration: 1.5,
                    ease: Quad.easeOut,
                    destroyOnComplete: true
                },
                opts
            );

            this.id = this.opts.id;

            if (!Array.isArray(this.opts.object)) {
                this.opts.object = [this.opts.object];
            }

            this.objects = this.opts.object;

            // setup
            //-----------------
            this.setup();

            // layout
            //-----------------
            this.layout();

            // run
            //-----------------
            this.run();
        }

        /**
         * Creates children and instantiates everything.
         *
         * @private
         * @return {Volatile} A reference to the volatile for chaining.
         */
        setup() {
            return this
        }

        /**
         * Should be called to refresh the layout of the volatile. Can be used after resizing.
         *
         * @return {Volatile} A reference to the volatile for chaining.
         */
        layout() {
            return this
        }

        /**
         * Starts the volatile animation.
         *
         * @private
         * @return {Volatile} A reference to the volatile for chaining.
         */
        run() {
            for (let object of this.objects) {
                let x = object.x;
                let y = object.y;

                switch (this.opts.direction) {
                    case 'top':
                        y -= this.opts.distance;
                        break
                    case 'right':
                        x += this.opts.distance;
                        break
                    case 'bottom':
                        y += this.opts.distance;
                        break
                    case 'left':
                        x -= this.opts.distance;
                        break
                }

                TweenLite.to(object, this.opts.duration, {
                    x,
                    y,
                    alpha: 0,
                    ease: this.opts.ease,
                    overwrite: 'all',
                    onStart: () => {
                        if (this.opts.onStart) {
                            this.opts.onStart.call(object, object);
                        }
                    },
                    onComplete: () => {
                        if (this.opts.onComplete) {
                            this.opts.onComplete.call(object, object);
                        }

                        if (this.opts.destroyOnComplete) {
                            object.destroy({ children: true });
                        }
                    }
                });
            }

            return this
        }
    }

    /* globals ThrowPropsPlugin, Strong */

    /**
     * Class that represents a PixiJS List.
     *
     * @example
     * const elephant1 = PIXI.Sprite.from('./assets/elephant-1.jpg')
     * const elephant2 = PIXI.Sprite.from('./assets/elephant-2.jpg')
     *
     * // Create the list
     * const list = new List([elephant1, elephant2])
     *
     * app.scene.addChild(list)
     *
     * @class
     * @extends PIXI.Container
     * @see {@link http://pixijs.download/dev/docs/PIXI.Container.html|PixiJS Container}
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/list.html|DocTest}
     */
    class List extends PIXI.Container {
        /**
         * Creates an instance of a Flippable.
         *
         * @constructor
         * @param {PIXI.DisplayObject[]} items - An array of PIXI.DisplayObjects.
         * @param {object} [opts] - An options object which can contain the following properties.
         * @param {number} [opts.width] - The width of the list. If the items are larger than this width, the overflow
         *     will be hidden.
         * @param {number} [opts.height] - The height of the list. If the items are larger than this height, the overflow
         *     will be hidden.
         * @param {number} [opts.padding=10] - The inner spacing (distance from one item to the previous/next item).
         * @param {number} [opts.margin=10] - The outer spacing (distance from one item to the border).
         * @param {string} [opts.orientation=vertical] - The orientation of the button group. Can be horizontal or vertical.
         * @param {string} [opts.align=left] - The horizontal position of the items. Possible values are
         *     left, center and right.
         * @param {string} [opts.verticalAlign=middle] - The vertical position of the items. Possible values are
         *     top, middle and bottom.
         * @param {PIXI.Application} [opts.app] - The PixiJS Application. Must be set if you want to use the mousewheel to
         *     scroll your list.
         */
        constructor(items = [], opts = {}) {
            super();

            this.opts = Object.assign(
                {},
                {
                    padding: 10,
                    margin: 10,
                    orientation: 'vertical',
                    align: 'left',
                    verticalAlign: 'middle',
                    width: null,
                    height: null,
                    app: null
                },
                opts
            );

            this.__items = items;
            this.__dragging = false;

            // setup
            //--------------------
            this.setup();
        }

        /**
         * Creates children and instantiates everything.
         *
         * @private
         * @return {List} A reference to the list for chaining.
         */
        setup() {
            // inner container
            //--------------------
            const container = new PIXI.Container();
            this.addChild(container);
            this.container = container;

            // mask
            //--------------------
            const mask = new PIXI.Graphics();
            this.addChild(mask);
            this.__mask = mask;

            // add items
            //--------------------
            for (let item of this.__items) {
                container.addChild(item);
            }

            // interaction
            //--------------------
            this.interactive = this.opts.width || this.opts.height;
            this.on('pointerdown', this.onStart.bind(this));
            this.on('pointermove', this.onMove.bind(this));
            this.on('pointerup', this.onEnd.bind(this));
            this.on('pointercancel', this.onEnd.bind(this));
            this.on('pointerout', this.onEnd.bind(this));
            this.on('pointerupoutside', this.onEnd.bind(this));
            this.on('scroll', this.onScroll.bind(this));

            // mousewheel
            //--------------------
            if (this.opts.app) {
                const app = this.opts.app;
                app.view.addEventListener('mousewheel', event => {
                    const bounds = this.mask ? this.mask.getBounds() : this.getBounds();
                    const x = event.clientX - app.view.getBoundingClientRect().left;
                    const y = event.clientY - app.view.getBoundingClientRect().top;
                    if (bounds.contains(x, y)) {
                        event.preventDefault();
                        this.emit('scroll', event);
                    }
                });
            }

            this.layout();

            return this
        }

        /**
         * Replaces the existing items and relayouts the list.
         *
         * @param {PIXI.DisplayObject[]} items - An array of PIXI.DisplayObjects.
         * @return {List} A reference to the list for chaining.
         */
        setItems(items) {
            this.container.removeChildren();
            this.__items = items;
            for (let item of this.__items) {
                this.container.addChild(item);
            }
            this.layout();
        }

        /**
         * Should be called to refresh the layout of the list (the width or the height).
         *
         * @return {List} A reference to the list for chaining.
         */
        layout() {
            const margin = this.opts.margin;

            let x = margin;
            let y = margin;

            for (let item of this.__items) {
                item.x = x;
                item.y = y;

                if (this.opts.orientation === 'vertical') {
                    y += item.height + this.opts.padding;
                } else {
                    x += item.width + this.opts.padding;
                }
            }

            // vertical
            //--------------------
            if (this.opts.orientation === 'vertical') {
                switch (this.opts.align) {
                    case 'center':
                        this.__items.forEach(it => (it.x = margin + this.width / 2 - it.width / 2));
                        break
                    case 'right':
                        this.__items.forEach(it => (it.x = margin + this.width - it.width));
                        break
                    default:
                        this.__items.forEach(it => (it.x = margin));
                        break
                }

                if (this.opts.height) {
                    const mask = this.__mask;
                    mask.clear();
                    mask.beginFill(0x000);
                    mask.drawRect(0, 0, this.width + 2 * margin, this.opts.height);
                    this.mask = mask;

                    this.interactive = this.innerHeight > this.opts.height;
                }
            }

            // horizontal
            //--------------------
            if (this.opts.orientation === 'horizontal') {
                switch (this.opts.verticalAlign) {
                    case 'top':
                        this.__items.forEach(it => (it.y = margin));
                        break
                    case 'bottom':
                        this.__items.forEach(it => (it.y = margin + this.height - it.height));
                        break
                    default:
                        this.__items.forEach(it => (it.y = margin + this.height / 2 - it.height / 2));
                        break
                }

                if (this.opts.width) {
                    const mask = this.__mask;
                    mask.clear();
                    mask.beginFill(0x000);
                    mask.drawRect(0, 0, this.opts.width, this.height + 2 * margin);
                    this.mask = mask;

                    this.interactive = this.innerWidth > this.opts.width;
                }
            }

            return this
        }

        /**
         *
         */
        get innerWidth() {
            let size = 0;

            this.__items.forEach(it => (size += it.width));
            size += this.opts.padding * (this.__items.length - 1);
            size += 2 * this.opts.margin;

            return size
        }

        /**
         *
         */
        get innerHeight() {
            let size = 0;

            this.__items.forEach(it => (size += it.height));
            size += this.opts.padding * (this.__items.length - 1);
            size += 2 * this.opts.margin;

            return size
        }

        /**
         * Resizes the list.
         *
         * @param {number} widthOrHeight - The new width (if orientation is horizontal) or height (if orientation is vertical) of the list.
         */
        resize(widthOrHeight) {
            if (this.opts.orientation === 'horizontal') {
                this.opts.width = widthOrHeight;
            } else {
                this.opts.height = widthOrHeight;
            }

            this.layout();
        }

        /**
         *
         * @private
         * @param {*} event
         */
        onStart(event) {
            this.__dragging = true;

            this.capture(event);

            this.__delta = {
                x: this.container.position.x - event.data.global.x,
                y: this.container.position.y - event.data.global.y
            };

            TweenLite.killTweensOf(this.container.position, { x: true, y: true });
            if (typeof ThrowPropsPlugin != 'undefined') {
                ThrowPropsPlugin.track(this.container.position, 'x,y');
            }
        }

        /**
         *
         * @private
         * @param {*} event
         */
        onMove(event) {
            if (this.__dragging) {
                this.capture(event);

                if (this.opts.orientation === 'horizontal') {
                    this.container.position.x = event.data.global.x + this.__delta.x;
                } else {
                    this.container.position.y = event.data.global.y + this.__delta.y;
                }
            }
        }

        /**
         *
         * @private
         * @param {*} event
         */
        onEnd(event) {
            if (this.__dragging) {
                this.__dragging = false;

                this.capture(event);

                const throwProps = {};

                if (this.opts.orientation === 'horizontal') {
                    let min = this.opts.width - this.innerWidth;
                    min = min > 0 ? 0 : min;
                    throwProps.x = {
                        velocity: 'auto',
                        min,
                        max: 0
                    };
                } else {
                    let min = this.opts.height - this.innerHeight;
                    min = min > 0 ? 0 : min;
                    throwProps.y = {
                        velocity: 'auto',
                        min,
                        max: 0
                    };
                }

                if (typeof ThrowPropsPlugin != 'undefined') {
                    ThrowPropsPlugin.to(
                        this.container.position,
                        {
                            throwProps,
                            ease: Strong.easeOut,
                            onComplete: () => ThrowPropsPlugin.untrack(this.container.position)
                        },
                        0.8,
                        0.4
                    );
                }
            }
        }

        /**
         *
         * @private
         * @param {*} event
         */
        onScroll(event) {
            this.capture(event);

            if (this.opts.orientation === 'horizontal') {
                this.container.position.x -= event.deltaX;
                if (this.container.position.x > 0) {
                    this.container.position.x = 0;
                } else if (this.container.position.x + this.innerWidth < this.opts.width) {
                    this.container.position.x = this.opts.width - this.innerWidth;
                }
            } else {
                this.container.position.y -= event.deltaY;
                if (this.container.position.y > 0) {
                    this.container.position.y = 0;
                } else if (this.container.position.y + this.innerHeight < this.opts.height) {
                    this.container.position.y = this.opts.height - this.innerHeight;
                }
            }
        }

        /**
         * Captures an event to inform InteractionMapper about processed events.
         *
         * @param {event|PIXI.InteractionEvent} event - The PIXI event to capture.
         */
        capture(event) {
            const originalEvent = event.data && event.data.originalEvent ? event.data.originalEvent : event;
            Events$1.capturedBy(originalEvent, this);
        }
    }

    /* global */

    /**
     * Callback for the button action.
     *
     * @callback actionCallback
     * @param {object} event - The event object.
     * @param {Button} button - A reference to the button (also this refers to the button).
     */

    /**
     * Callback for the button beforeAction.
     *
     * @callback beforeActionCallback
     * @param {object} event - The event object.
     * @param {Button} button - A reference to the button (also this refers to the button).
     */

    /**
     * Callback for the button afterAction.
     *
     * @callback afterActionCallback
     * @param {object} event - The event object.
     * @param {Button} button - A reference to the button (also this refers to the button).
     */

    /**
     * Class that represents a PixiJS Text.
     *
     * @example
     * // Create the text
     * const text = new Text({
     *     label: 'My Text',
     *     action: () => console.log('Text was clicked')
     * })
     *
     * // Add the text to a DisplayObject
     * app.scene.addChild(text)
     *
     * @class
     * @extends PIXI.Container
     * @see {@link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container}
     * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/text.html|DocTest}
     */
    class Text extends PIXI.Container {
        /**
         * Creates an instance of a Button.
         *
         * @constructor
         * @param {object} [opts] - An options object to specify to style and behaviour of the button.
         * @param {number} [opts.id=auto generated] - The id of the button.
         * @param {string} [opts.label] - The label of the button.
         * @param {number} [opts.x=0] - The x position of the button. Can be also set after creation with button.x = 0.
         * @param {number} [opts.y=0] - The y position of the button. Can be also set after creation with button.y = 0.
         * @param {string|Theme} [opts.theme=dark] - The theme to use for this button. Possible values are dark, light, red
         *     or a Theme object.
         * @param {number} [opts.minWidth=44] - The minimum width of the button.
         * @param {number} [opts.minHeight=44] - The minimum height of the button.
         * @param {number} [opts.padding=Theme.padding] - The inner spacing (distance from icon and/or label) to the border.
         * @param {string|PIXI.DisplayObject} [opts.icon] - The icon of the button. Can be a predefined one, an URL or an PIXI.DisplayObject.
         * @param {string|PIXI.DisplayObject} [opts.iconActive=icon] - The icon of the button when activated. Can be a predefined one, an URL or an PIXI.DisplayObject.
         * @param {string} [opts.iconPosition=left] - The position of the icon in relation to the label. Can be left or right.
         * @param {number} [opts.iconColor=Theme.iconColor] - The color of the icon (set by the tint property) as a hex value.
         * @param {number} [opts.iconColorActive=Theme.iconColorActive] - The color of the icon when activated.
         * @param {number} [opts.fill=Theme.fill] - The color of the button background as a hex value.
         * @param {number} [opts.fillAlpha=Theme.fillAlpha] - The alpha value of the background.
         * @param {number} [opts.fillActive=Theme.fillActive] - The color of the button background when activated.
         * @param {number} [opts.fillActiveAlpha=Theme.fillActiveAlpha] - The alpha value of the background when activated.
         * @param {number} [opts.stroke=Theme.stroke] - The color of the border as a hex value.
         * @param {number} [opts.strokeWidth=Theme.strokeWidth] - The width of the border in pixel.
         * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
         * @param {number} [opts.strokeActive=Theme.strokeActive] - The color of the border when activated.
         * @param {number} [opts.strokeActiveWidth=Theme.strokeActiveWidth] - The width of the border in pixel when activated.
         * @param {number} [opts.strokeActiveAlpha=Theme.strokeActiveAlpha] - The alpha value of the border when activated.
         * @param {object} [opts.textStyle=Theme.textStyle] - A textstyle object for the styling of the label. See PIXI.TextStyle
         *     for possible options.
         * @param {number} [opts.textStyleActive=Theme.textStyleActive] - A textstyle object for the styling of the label when the
         *     button is activated. See PIXI.TextStyle for possible options.
         * @param {string} [opts.style=default] - A shortcut for styling options. Possible values are default, link.
         * @param {number} [opts.radius=Theme.radius] - The radius of the four corners of the button (which is a rounded rectangle).
         * @param {boolean} [opts.disabled=false] - Is the button disabled? When disabled, the button has a lower alpha value
         *     and cannot be clicked (interactive is set to false).
         * @param {boolean} [opts.active=false] - Is the button initially active?
         * @param {actionCallback} [opts.action] - Executed when the button was triggered (by pointerup).
         * @param {beforeActionCallback} [opts.beforeAction] - Executed before the main action is triggered.
         * @param {afterActionCallback} [opts.afterAction] - Executed after the main action was triggered.
         * @param {string} [opts.type=default] - The type of the button. Can be default or checkbox. When the type is
         *     checkbox, the active state is toggled automatically.
         * @param {string} [opts.align=center] - The horizontal position of the label and the icon. Possible values are
         *     left, center and right. Only affects the style when the minWidth is bigger than the width of the icon and label.
         * @param {string} [opts.verticalAlign=middle] - The vertical position of the label and the icon. Possible values are
         *     top, middle and button. Only affects the style when the minHeight is bigger than the height of the icon and label.
         * @param {string|object} [opts.tooltip] - A string for the label of the tooltip or an object to configure the tooltip
         *     to display.
         * @param {string|object} [opts.badge] - A string for the label of the badge or an object to configure the badge to display.
         *     If the parameter is an object, all badge options can be set plus the following:
         * @param {string} [opts.badge.align=right] - The horizontal alignment of the badge. Possible values: left, center, right
         * @param {string} [opts.badge.verticalAlign=top] - The vertical alignment of the badge. Possible values: top, middle, bottom
         * @param {number} [opts.badge.offsetLeft=0] - The horizontal shift of the badge.
         * @param {number} [opts.badge.offsetTop=0] - The vertical shift of the badge.
         * @param {boolean} [opts.visible=true] - Is the button initially visible (property visible)?
         */
        constructor(opts = {}) {
            super();

            const theme = Theme.fromString(opts.theme);
            this.theme = theme;

            this.opts = Object.assign(
                {},
                {
                    id: PIXI.utils.uid(),
                    label: null,
                    x: 0,
                    y: 0,
                    minWidth: 44,
                    minHeight: 44,
                    padding: theme.padding,
                    icon: undefined,
                    iconActive: undefined,
                    iconPosition: 'left',
                    iconColor: theme.iconColor,
                    iconColorActive: theme.iconColorActive,
                    fill: theme.fill,
                    fillAlpha: theme.fillAlpha,
                    fillActive: theme.fillActive,
                    fillActiveAlpha: theme.fillActiveAlpha,
                    stroke: theme.stroke,
                    strokeWidth: theme.strokeWidth,
                    strokeAlpha: theme.strokeAlpha,
                    strokeActive: theme.strokeActive,
                    strokeActiveWidth: theme.strokeActiveWidth,
                    strokeActiveAlpha: theme.strokeActiveAlpha,
                    textStyle: {},
                    textStyleActive: {},
                    style: 'default',
                    radius: theme.radius,
                    disabled: false,
                    active: false,
                    action: null,
                    beforeAction: null,
                    afterAction: null,
                    type: 'default',
                    align: 'center',
                    verticalAlign: 'middle',
                    tooltip: null,
                    badge: null,
                    visible: true
                },
                opts
            );

            this.id = this.opts.id;

            this.opts.textStyle = Object.assign({}, theme.textStyle, this.opts.textStyle);
            this.opts.textStyleActive = Object.assign({}, theme.textStyleActive, this.opts.textStyleActive);

            if (typeof this.opts.icon === 'undefined' && typeof this.opts.iconActive !== 'undefined') {
                this.opts.icon = this.opts.iconActive;
            } else if (typeof this.opts.icon !== 'undefined' && typeof this.opts.iconActive === 'undefined') {
                this.opts.iconActive = this.opts.icon;
            }

            if (this.opts.style === 'link') {
                Object.assign(this.opts, {
                    strokeAlpha: 0,
                    strokeActiveAlpha: 0,
                    fillAlpha: 0,
                    fillActiveAlpha: 0
                });
            }

            this._active = null;
            this._disabled = null;

            this.__start = { x: null, y: null };

            this.iconInactive = null;
            this.iconActive = null;
            this.text = null;

            this.button = null;
            this.content = null;

            this.tooltip = null;
            this.badge = null;

            this.visible = this.opts.visible;

            // setup
            //-----------------
            this.setup();
        }

        /**
         * Captures an event to inform InteractionMapper about processed events.
         *
         * @param {event|PIXI.InteractionEvent} event - The PIXI event to capture.
         */
        capture(event) {
            Events$1.capturedBy(event.data.originalEvent, this);
        }

        /**
         * Creates children and instantiates everything.
         *
         * @private
         * @return {Button} A reference to the button for chaining.
         */
        setup() {
            // Button
            //-----------------
            let button = new PIXI.Graphics();
            this.button = button;
            this.addChild(button);

            // Content
            //-----------------
            let content = new PIXI.Container();
            this.content = content;
            this.addChild(content);

            // Text
            //-----------------
            if (this.opts.label) {
                this.text = new PIXI.Text(this.opts.label, this.opts.textStyle);
            }

            // Icon
            //-----------------
            if (this.opts.icon) {
                this.iconInactive = this.loadIcon(this.opts.icon, this.opts.iconColor);
            }

            if (this.opts.iconActive) {
                this.iconActive = this.loadIcon(this.opts.iconActive, this.opts.iconColorActive);
            }

            // interaction
            //-----------------
            this.button.on('pointerover', e => {
                this.capture(e);
                TweenLite.to([this.button, this.content], this.theme.fast, {
                    alpha: 0.83,
                    overwrite: 'none'
                });
            });

            this.button.on('pointermove', e => {
                this.capture(e);
            });

            this.button.on('pointerout', this.onEnd.bind(this));
            this.button.on('pointercancel', this.onEnd.bind(this));
            this.button.on('pointerupoutside', this.onEnd.bind(this));
            this.button.on('pointertap', this.onEnd.bind(this));
            this.button.on('scroll', this.onEnd.bind(this));

            // eslint-disable-next-line no-unused-vars
            this.button.on('pointerdown', e => {
                //this.capture(e)
                this.__start.x = e.data.global.x;
                this.__start.y = e.data.global.y;
                TweenLite.to([this.button, this.content], this.theme.fast, {
                    alpha: 0.7,
                    overwrite: 'none'
                });
            });

            this.button.on('pointerup', e => {
                this.capture(e);

                const distance = Points.distance(e.data.global, this.__start);

                if (distance < 5) {
                    if (this.opts.beforeAction) {
                        this.opts.beforeAction.call(this, e, this);
                    }

                    if (this.opts.action) {
                        this.opts.action.call(this, e, this);
                    }

                    TweenLite.to([this.button, this.content], this.theme.fast, {
                        alpha: 0.83,
                        overwrite: 'none'
                    });

                    if (this.opts.type === 'checkbox') {
                        this.active = !this.active;
                    }

                    if (this.opts.afterAction) {
                        this.opts.afterAction.call(this, e, this);
                    }
                }
            });

            // disabled
            //-----------------
            this.disabled = this.opts.disabled;

            // active
            //-----------------
            this.active = this.opts.active; // calls .layout()

            // tooltip
            //-----------------
            if (this.opts.tooltip) {
                if (typeof this.opts.tooltip === 'string') {
                    this.tooltip = new Tooltip({
                        object: this,
                        content: this.opts.tooltip
                    });
                } else {
                    this.opts.tooltip = Object.assign({}, { object: this }, this.opts.tooltip);
                    this.tooltip = new Tooltip(this.opts.tooltip);
                }
            }

            // badge
            //-----------------
            if (this.opts.badge) {
                let opts = Object.assign(
                    {},
                    {
                        align: 'right',
                        verticalAlign: 'top',
                        offsetLeft: 0,
                        offsetTop: 0
                    }
                );
                if (typeof this.opts.badge === 'string') {
                    opts = Object.assign(opts, { content: this.opts.badge });
                } else {
                    opts = Object.assign(opts, this.opts.badge);
                }

                const badge = new Badge(opts);
                this.addChild(badge);
                this.badge = badge;
            }

            this.layout();

            // set position
            //-----------------
            this.position.set(this.opts.x, this.opts.y);

            return this
        }

        /**
         * Should be called to refresh the layout of the button. Can be used after resizing.
         *
         * @return {Button} A reference to the button for chaining.
         */
        layout() {
            // Clear content
            //-----------------
            this.removeChild(this.content);
            this.content = new PIXI.Container();
            this.addChild(this.content);

            // Set the icon
            //-----------------
            let icon = null;

            if (!this.active && this.iconInactive) {
                icon = this.iconInactive;
            } else if (this.active && this.iconActive) {
                icon = this.iconActive;
            }

            // Set the text
            //-----------------
            if (this.text) {
                this.text.position.set(0, 0);
            }

            // Width and Height
            //-----------------
            let width = 0;
            if (icon && this.text) {
                width = icon.width + this.text.width + 3 * this.opts.padding;
            } else if (icon) {
                width = icon.width + 2 * this.opts.padding;
            } else if (this.text) {
                width = this.text.width + 2 * this.opts.padding;
            }

            if (width < this.opts.minWidth) {
                width = this.opts.minWidth;
            }

            let height = 0;
            if (icon) {
                height = icon.height + 2 * this.opts.padding;
            } else if (this.text) {
                height = this.text.height + 2 * this.opts.padding;
            }

            if (height < this.opts.minHeight) {
                height = this.opts.minHeight;
            }

            this._width = width;
            this._height = height;

            // Position icon and text
            //-----------------
            if (icon && this.text) {
                if (this.opts.iconPosition === 'right') {
                    icon.x = this.text.width + this.opts.padding;
                } else {
                    this.text.x = icon.width + this.opts.padding;
                }
                this.content.addChild(icon, this.text);
            } else if (icon) {
                this.content.addChild(icon);
            } else if (this.text) {
                this.content.addChild(this.text);
            }

            this.layoutInnerContent();
            this.layoutContent();

            this.icon = icon;

            // badge
            //--------------------
            if (this.badge) {
                this.removeChild(this.badge);
                const width = this._width;
                const height = this._height;
                this.addChild(this.badge);

                const badge = this.badge;

                switch (badge.opts.align) {
                    case 'left':
                        badge.x = -badge.width / 2 + badge.opts.offsetLeft;
                        break
                    case 'center':
                        badge.x = width / 2 - badge.width / 2 + badge.opts.offsetLeft;
                        break
                    case 'right':
                        badge.x = width - badge.width / 2 + badge.opts.offsetLeft;
                }

                switch (badge.opts.verticalAlign) {
                    case 'top':
                        badge.y = -badge.height / 2 + badge.opts.offsetTop;
                        break
                    case 'middle':
                        badge.y = height / 2 - badge.height / 2 + badge.opts.offsetTop;
                        break
                    case 'bottom':
                        badge.y = height - badge.height / 2 + badge.opts.offsetTop;
                }
            }

            // draw
            //-----------------
            this.draw();

            return this
        }

        /**
         * Calculates the positions of the content children (icon and/or text).
         *
         * @private
         * @return {Button} A reference to the button for chaining.
         */
        layoutInnerContent() {
            for (let child of this.content.children) {
                switch (this.opts.verticalAlign) {
                    case 'top':
                        child.y = 0;
                        break
                    case 'middle':
                        child.y = this.content.height / 2 - child.height / 2;
                        break
                    case 'bottom':
                        child.y = this.content.height - child.height;
                        break
                }
            }

            return this
        }

        /**
         * Sets the horizontal and vertical position of the content.
         * Uses the option keys "align" and "verticalAlign".
         *
         * @private
         * @return {Button} A reference to the button for chaining.
         */
        layoutContent() {
            switch (this.opts.align) {
                case 'left':
                    this.content.x = this.opts.padding;
                    break
                case 'center':
                    this.content.x = (this._width - this.content.width) / 2;
                    break
                case 'right':
                    this.content.x = this._width - this.opts.padding - this.content.width;
                    break
            }

            switch (this.opts.verticalAlign) {
                case 'top':
                    this.content.y = this.opts.padding;
                    break
                case 'middle':
                    this.content.y = (this._height - this.content.height) / 2;
                    break
                case 'bottom':
                    this.content.y = this._height - this.opts.padding - this.content.height;
                    break
            }

            return this
        }

        /**
         * Draws the canvas.
         *
         * @private
         * @return {Button} A reference to the button for chaining.
         */
        draw() {
            this.button.clear();
            if (this.active) {
                this.button.lineStyle(this.opts.strokeActiveWidth, this.opts.strokeActive, this.opts.strokeActiveAlpha);
                this.button.beginFill(this.opts.fillActive, this.opts.fillActiveAlpha);
            } else {
                this.button.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
                this.button.beginFill(this.opts.fill, this.opts.fillAlpha);
            }
            this.button.drawRoundedRect(0, 0, this._width, this._height, this.opts.radius);
            this.button.endFill();

            return this
        }

        /**
         * Gets or sets the active state.
         *
         * @member {boolean}
         */
        get active() {
            return this._active
        }
        set active(value) {
            this._active = value;

            if (this._active) {
                if (this.text) {
                    this.text.style = this.opts.textStyleActive;
                }
            } else {
                if (this.text) {
                    this.text.style = this.opts.textStyle;
                }
            }

            this.layout();
        }

        /**
         * Gets or sets the disabled state. When disabled, the button cannot be clicked.
         *
         * @member {boolean}
         */
        get disabled() {
            return this._disabled
        }
        set disabled(value) {
            this._disabled = value;

            if (this._disabled) {
                this.button.interactive = false;
                this.button.buttonMode = false;
                this.button.alpha = 0.5;
                if (this.icon) {
                    this.icon.alpha = 0.5;
                }
                if (this.text) {
                    this.text.alpha = 0.5;
                }
            } else {
                this.button.interactive = true;
                this.button.buttonMode = true;
                this.button.alpha = 1;
                if (this.icon) {
                    this.icon.alpha = 1;
                }
                if (this.text) {
                    this.text.alpha = 1;
                }
            }
        }

        /**
         * Shows the button (sets his alpha values to 1).
         *
         * @return {Button} A reference to the button for chaining.
         */
        show() {
            this.opts.strokeAlpha = 1;
            this.opts.strokeActiveAlpha = 1;
            this.opts.fillAlpha = 1;
            this.opts.fillActiveAlpha = 1;

            this.layout();

            return this
        }

        /**
         * Hides the button (sets his alpha values to 0).
         *
         * @return {Button} A reference to the button for chaining.
         */
        hide() {
            this.opts.strokeAlpha = 0.0;
            this.opts.strokeActiveAlpha = 0.0;
            this.opts.fillAlpha = 0.0000000001; // WORKAROUND: See https://github.com/pixijs/pixi.js/wiki/v5-Migration-Guide#graphics-interaction
            this.opts.fillActiveAlpha = 0.0000000001;

            this.layout();

            return this
        }

        /**
         * Loads an icon
         *
         * @private
         * @param {string|PIXI.DisplayObject} icon - The icon to load.
         * @param {number} color - The color of the icon (if not an PIXI.DisplayObject).
         * @return {PIXI.DisplayObject} Return the icon as an PIXI.DisplayObject.
         */
        loadIcon(icon, color) {
            let displayObject = null;

            if (icon instanceof PIXI.DisplayObject) {
                displayObject = icon;
            } else {
                let size = 17;
                if (this.text) {
                    size = this.text.height;
                } else if (this.opts.minHeight) {
                    size = this.opts.minHeight - 2 * this.opts.padding;
                }

                const url = Button.iconIsUrl(icon) ? icon : `../../assets/icons/${icon}.png`;
                const iconTexture = PIXI.Texture.from(url);

                const sprite = new PIXI.Sprite(iconTexture);
                sprite.tint = color;
                sprite.width = size;
                sprite.height = size;

                displayObject = sprite;
            }

            return displayObject
        }

        /**
         * Tests if an icon string is an url.
         *
         * @private
         * @static
         * @param {string} url - The url to test.
         * @return {boolean} true if the url is an url to an image.
         */
        static iconIsUrl(url) {
            return /\.(png|svg|gif|jpg|jpeg|tif|tiff)$/i.test(url)
        }

        /**
         * Gets or sets the color of the current icon (no matter how the status is). Changing the color, changes
         * the tint property of the icon sprite.
         *
         * @member {number}
         */
        get iconColor() {
            return this.icon ? this.icon.tint : null
        }
        set iconColor(value) {
            if (this.icon) {
                this.icon.tint = value;
            }
        }

        onEnd(event) {
            this.capture(event);
            TweenLite.to([this.button, this.content], this.theme.fast, {
                alpha: 1,
                overwrite: 'none'
            });
        }
    }

    /* Needed to ensure that rollup.js includes class definitions and the classes
    are visible inside doctests.
    */
    window.PIXIApp = PIXIApp;
    window.BlurFilter = BlurFilter;
    window.FlipEffect = FlipEffect;
    window.Flippable = Flippable;
    window.DeepZoomInfo = DeepZoomInfo;
    window.DeepZoomImage = DeepZoomImage;
    window.Popover = Popover;
    window.ScatterContainer = ScatterContainer;
    window.DisplayObjectScatter = DisplayObjectScatter;
    window.Command = Command;
    window.RecorderTools = RecorderTools;
    window.Timeline = Timeline;
    window.AppTest = AppTest;
    window.Theme = Theme;
    window.Button = Button$1;
    window.ButtonGroup = ButtonGroup;
    window.Scrollview = Scrollview;
    window.Slider = Slider;
    window.Stylus = Stylus;
    window.Switch = Switch;
    window.Popup = Popup;
    window.PopupMenu = PopupMenu;
    window.Modal = Modal;
    window.Volatile = Volatile;
    window.Message = Message;
    window.Tooltip = Tooltip;
    window.Badge = Badge;
    window.Progress = Progress;
    window.List = List;
    window.LabeledGraphics = LabeledGraphics;
    window.FontInfo = FontInfo;
    window.Text = Text;

}());