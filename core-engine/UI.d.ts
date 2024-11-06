declare namespace UI {
    type ElementName = string | number | symbol;

	/**
	 * Object containing binding names as keys and string values as gui textures
	 * names.
	 */
	type BindingSet = {
		[key: string]: string
	};

	/**
	 * Object representing window style. Window styles allows to customize the
	 * way your windows look like.
	 */
	class Style {
		/**
		 * Classic (0.16.*-like) windows style, which also used before
		 * legacy version.
		 */
		static readonly CLASSIC: Style;
		/**
		 * Default windows style.
		 */
		static readonly DEFAULT: Style;
		static readonly LEGACY: Style;
		/**
		 * Adds gui texture name to use for the specified window part.
		 * @param key binding name
		 * @param name gui texture name
		 */
		addBinding(key: string, name: string): void;
		/**
		 * Gets texture binding bt it's name. Searches first in the additional
		 * styles, then in the current style, then in all it's parents.
		 * @param key binding name
		 * @param fallback value to return on binding failure
		 * @returns Ui texture name if current object, additional styles or one 
		 * of the parents contains such a binding name, fallback otherwise.
		 */
		getBinding(key: string, fallback: string): string;
		/**
		 * Adds an additional style object to the current style.
		 * @param style additional style object to be added
		 */
		addStyle(style: Style): void;
		/**
		 * Constructs new {@link UI.Style} object
		 * with bindings from {@link UI.Style.DEFAULT}.
		 */
		constructor();
		/**
		 * Constructs new {@link UI.Style} object
		 * from given {@link UI.BindingSet} object.
		 */
		constructor(bindings: BindingSet);
		/**
		 * @returns A copy of the current style. Only style bindings of the
		 * current style are copied, no parent/additional styles are copied.
		 */
		copy(): Style;
		/**
		 * Specifies parent style object for the current style.
		 * @param style style to be set as parent
		 */
		inherit(style: Style): void;
		/**
		 * Adds all values from given {@link UI.BindingSet} object.
		 */
		addAllBindings(bindings: BindingSet): void;
		/**
		 * @returns Collection containing all binding names
		 * from the current style object.
		 */
		getAllBindingNames(): java.util.Collection<string>;
		/**
		 * If name is a style value (starts with `"style:"`), returns
		 * corresponding gui texture name, else returns input string.
		 * @param name style value or bitmap name
		 */
		getBitmapName(name: string): string;
		getIntProperty(name: string, fallback: number): number;
		getFloatProperty(name: string, fallback: number): number;
		getDoubleProperty(name: string, fallback: number): number;
		getStringProperty(name: string, fallback: string): string;
		getBooleanProperty(name: string, fallback: boolean): boolean;
		setProperty(name: string, value: any): void;
		static getBitmapByDescription(style: Style, description: string): IBitmapWrap;
	}

	/**
	 * Object where you can specify how the UI element will behave on touch events.
	 */
	interface UIClickEvent {
		/**
		 * This function will be called when element is short touched.
		 */
		onClick?: (position: Vector, container: UiAbstractContainer | ItemContainer, tileEntity: Nullable<TileEntity> | any, window: IWindow, canvas: android.graphics.Canvas, scale: number) => void;
		/**
		 * This function will be called when element is long touched.
		 */
		onLongClick?: (position: Vector, container: UiAbstractContainer | ItemContainer, tileEntity: Nullable<TileEntity> | any, window: IWindow, canvas: android.graphics.Canvas, scale: number) => void;
	}

	interface IWindow {
		/**
		 * Closes window without container. Use only if the window was opened
		 * without container.
		 */
		close(): void;
		/**
		 * Called up to 66 times a second to update window's content.
		 * @param time current time in milliseconds
		 */
		frame(time: number): void;
		/**
		 * @returns New {@link UI.Container}
		 * that was used to open this window or null, if
		 * the window wasn't opened in container.
		 */
		getContainer(): Nullable<UiAbstractContainer>;
		/**
		 * @returns Window's content object
		 * (usually specified in the window's constructor).
		 */
		getContent(): WindowContent;
		/**
		 * Gets all the elements in the window.
		 * @returns HashMap containing string element name as keys and
		 * element instances as values.
		 */
		getElements(): java.util.HashMap<string, IElement>;
		/**
		 * @returns Object containing current style of the window.
		 */
		getStyle(): Style;
		/**
		 * Forces ui drawables of the window to refresh.
		 * @param onCurrentThread if `true`, the drawables will be refreshed 
		 * immediately, otherwise refresh event will be posted; ensure you are
		 * in the UI thread if you pass `true` as the parameter
		 * @default onCurrentThread: false
		 */
		invalidateDrawing(onCurrentThread: boolean): void;
		/**
		 * Forces ui elements of the window to refresh.
		 * @param onCurrentThread if `true`, the drawables will be refreshed 
		 * immediately, otherwise refresh event will be posted; ensure you are
		 * in the UI thread if you pass `true` as the parameter
		 * @default onCurrentThread: false
		 */
		invalidateElements(onCurrentThread: boolean): void;
		/**
		 * @returns `true` if the window can change it's contents position.
		 */
		isDynamic(): boolean;
		/**
		 * @returns `true` if the window has an inventory that should be updated.
		 */
		isInventoryNeeded(): boolean;
		/**
		 * @returns `true` if the window is opened, `false` otherwise.
		 */
		isOpened(): boolean;
		/**
		 * @returns Whether the window can be closed on pressing back navigation button.
		 */
		onBackPressed(): boolean;
		/**
		 * Opens window without container.
		 */
		open(): void;
		/**
		 * Sets container for the current window. Be careful when calling it
		 * manually. You should prefer opening the window via
		 * {@link UI.Container.openAs} call.
		 * @param container {@link UI.Container}
		 * to be associated with current window or null to associate no container with current window
		 */
		setContainer(container: Nullable<UiAbstractContainer>): void;
		/**
		 * Turns debug mode for the window on and off.
		 * @param debug if `true`, additional debug information will be drawn on
		 * the window canvas
		 */
		setDebugEnabled(debug: boolean): void;
	}

    interface ElementSet {
		[key: string]: Elements;
	}

	type DrawingSet = DrawingElements[];

    /**
	 * Object used to handle windows opening and closing events.
	 */
	interface WindowEventListener {
		/**
		 * Called when the window is opened.
		 * @param window current {@link UI.Window} object
		 */
		onOpen?: (window: Window) => void;
		/**
		 * Called when the window is closed.
		 * @param window current {@link UI.Window} object
		 */
		onClose?: (window: Window) => void;
	}

	interface IWindowLocation {
		/**
		 * X coordinate of the window in units.
		 * @default 0
		 */
		x?: number;
		/**
		 * Y coordinate of the window in units.
		 * @default 0
		 */
		y?: number;
		/**
		 * Width of the window in units, by default calculated to match right
		 * screen bound.
		 */
		width?: number;
		/**
		 * Height of the window in units, by default calculated to match bottom
		 * screen bound.
		 */
		height?: number;
		/**
		 * Defines scrollable window size along the X axis.
		 */
		scrollX?: number;
		/**
		 * Defines scrollable window size along the Y axis.
		 */
		scrollY?: number;
	}

	/**
	 * Object representing window location used in window content object and
	 * {@link UI.WindowLocation} constructor.
	 */
	interface WindowLocationDescription extends IWindowLocation {
		forceScrollX?: boolean,
		forceScrollY?: boolean,
		/**
		 * Determines whether the interface needs to be resized based
		 * on its size or a global unit system should be used.
		 * @since 2.3.1b115
		 */
		globalScale?: boolean,
		/**
		 * Paddings are distances from the window bounds to the elements in the
		 * window.
		 */
		padding?: {
			top?: number,
			bottom?: number,
			left?: number,
			right?: number;
		};
	}

	/**
	 * {@inheritDoc UI.WindowLocationDescription}
	 */
    type WindowLocationParams = WindowLocationDescription;

	/**
	 * Class representing window's location. All coordinates are defined in
	 * units (given screen's width is 1000 units).
	 */
	class WindowLocation {
		/**
		 * Constructs new {@link UI.WindowLocation} instance with default position and
		 * size (fullscreen window).
		 */
		constructor();
		/**
		 * Constructs new {@link UI.WindowLocation} instance with specified parameters.
		 */
		constructor(desc: WindowLocationDescription);
		/**
		 * Constant used to represent bottom padding.
		 */
		static readonly PADDING_BOTTOM: number;
		/**
		 * Constant used to represent left padding.
		 */
		static readonly PADDING_LEFT: number;
		/**
		 * Constant used to represent right padding.
		 */
		static readonly PADDING_RIGHT: number;
		/**
		 * Constant used to represent top padding.
		 */
		static readonly PADDING_TOP: number;
		forceScrollX: boolean;
		forceScrollY: boolean;
		/**
		 * Determines whether the interface needs to be resized based
		 * on its size or a global unit system should be used.
		 * @since 2.3.1b115
		 */
		globalScale: boolean;
		/**
		 * Window height.
		 */
		height: number;
		/**
		 * Window scale.
		 */
		scale: number;
		/**
		 * Horizontal window scroll.
		 */
		scrollX: number;
		/**
		 * Vertical window scroll.
		 */
		scrollY: number;
		/**
		 * Window width.
		 */
		width: number;
		/**
		 * Window horizontal position.
		 */
		x: number;
		/**
		 * Window vertical position.
		 */
		y: number;
		/**
		 * Window position on layers.
		 */
		zIndex: number;
		/**
		 * Constructs new {@link UI.WindowLocation} instance with default position and
		 * size (fullscreen window).
		 */
		constructor();
		/**
		 * Constructs new {@link UI.WindowLocation} instance with specified parameters.
		 * @param params 
		 */
		constructor(params: WindowLocationDescription);
		/**
		 * Sets scrollable window size. Should be greater then window 
		 * width/height for the changes to take effect.
		 * @param x scrollable window size along the X axis
		 * @param y scrollable window size along the Y axis
		 */
		setScroll(x: number, y: number): void;
		/**
		 * Sets the size of the window.
		 * @param x window's width
		 * @param y window's height
		 */
		setSize(x: number, y: number): void;
		/**
		 * @returns Window location as a js object. Note that paddings are not
		 * included into the object.
		 */
		asScriptable(): IWindowLocation;
		/**
		 * Creates a copy of current {@link UI.WindowLocation} object.
		 * @returns Newly created copy of the object.
		 */
		copy(): WindowLocation;
		/**
		 * Sets window location parameters.
		 * @param x X coordinate of the window
		 * @param y Y coordinate of the window
		 * @param width width of the window
		 * @param height height of the window
		 */
		set(x: number, y: number, width: number, height: number): void;
		/**
		 * Sets window location parameters from another {@link UI.WindowLocation}.
		 * Note that paddings are not copied instance.
		 * @param location another {@link UI.WindowLocation} instance to copy 
		 * parameters from
		 */
		set(location: WindowLocation): void;
		/**
		 * Sets window's scroll size to the windows size to remove scroll.
		 */
		removeScroll(): void;
		/**
		 * Sets padding of the window.
		 * @param padding one of the {@link UI.WindowLocation.PADDING_TOP}, 
		 * {@link UI.WindowLocation.PADDING_BOTTOM}, {@link UI.WindowLocation.PADDING_LEFT},
		 * {@link UI.WindowLocation.PADDING_RIGHT} constants
		 * @param value value of the padding to be assigned to appropriate 
		 * window bound
		 */
		setPadding(padding: 0 | 1 | 2 | 3, value: number): void;
		/**
		 * Sets the four paddings of the window for the appropriate bounds.
		 */
		setPadding(top: number, bottom: number, left: number, right: number): void;
		/**
		 * @returns Unit size (in pixels) in the fullscreen context (`<screen width> / 1000`).
		 */
		getScale(): number;
		/**
		 * @returns Unit size (in pixels) in the window's bounds.
		 */
		getDrawingScale(): number;
		/**
		 * @returns Window's rectangle in the {@link android.graphics.Rect} object.
		 */
		getRect(): android.graphics.Rect;
		showPopupWindow(win: android.widget.PopupWindow): void;
		updatePopupWindow(win: android.widget.PopupWindow): void;
		getLayoutParams(a1: number, a2: number, a3: number): android.view.WindowManager.LayoutParams;
		setupAndShowPopupWindow(win: android.widget.PopupWindow): void;
		/**
		 * Sets window's Z index. Z index determines how the window will be
		 * displayed when several windows are open.
		 * @param z window Z index
		 */
		setZ(z: number): void;
		/**
		 * @returns Window's width in units
		 * (always 1000 by definition of the unit).
		 */
		getWindowWidth(): 1000;
		/**
		 * @returns Window's height in units.
		 */
		getWindowHeight(): number;
		/**
		 * Transforms dimension in fullscreen units to the dimension within
		 * window's bounds.
		 * @param val value to be transformed
		 */
		globalToWindow(val: number): number;
		/**
		 * Transforms dimension within window's bounds to the dimension in
		 * fullscreen units.
		 * @param val value to be transformed
		 */
		windowToGlobal(val: number): number;
	}

	interface IBitmapWrap {
		/* static */ readonly MISSING_BITMAP: android.graphics.Bitmap;
		resize(x: number, y: number): IBitmapWrap;
		restore(): boolean;
		store(): boolean;
		storeIfNeeded(): void;
		restoreIfNeeded(): void;
		getWidth(): number;
		getHeight(): number;
		getConfig(): android.graphics.Bitmap.Config;
		getStackPos(): number;
		get(): android.graphics.Bitmap;
		isRecycled(): boolean;
		recycle(): void;
		removeCache(): void;
		getResizedCache(width: number, height: number): android.graphics.Bitmap;
		/* static */ wrap(bmp: android.graphics.Bitmap): IBitmapWrap;
		/* static */ wrap(name: string, width: number, height: number): IBitmapWrap;
		/* static */ wrap(name: string): IBitmapWrap;
	}

	/**
	 * Class representing static or animated texture.
	 */
	class Texture {
		animation: IBitmapWrap[];
		bitmap: IBitmapWrap;
		delay: number;
		isAnimation: boolean;
		/**
		 * Constructs new static {@link Texture} with specified bitmap.
		 * @param bitmap {@link android.graphics.Bitmap} instance
		 */
		constructor(bitmap: android.graphics.Bitmap);
		/**
		 * Constructs new animated {@link Texture} with specified frames.
		 * @param bitmaps an array of {@link android.graphics.Bitmap} instances to be 
		 * used as animation frames
		 */
		constructor(bitmaps: android.graphics.Bitmap[]);
		/**
		 * Constructs new static or animated {@link Texture} with specified frames.
		 * @param obj texture name or array of texture names for animated 
		 * textures. Accepts raw gui textures names and style bindings
		 * (formatted as "style:binding_name"). 
		 * @param style {@link Style} object to look for style bindings. If not 
		 * specified, default style is used
		 */
		constructor(obj: string | { [key: string]: string }, style?: Style);
		isAnimated(): boolean;
		/**
		 * Sets texture offsets in pixels from the upper left bound of the bitmap.
		 */
		readOffset(obj: { x?: number, y?: number }): void;
		/**
		 * @returns Frame number of the animation corresponding to current system time.
		 */
		getFrame(): number;
		/**
		 * @param frame frame number
		 * @returns Bitmap object containing animation frame 
		 * for the corresponding frame number.
		 */
		getBitmap(frame: number): android.graphics.Bitmap;
		getBitmapWrap(frame: number): IBitmapWrap;
		draw(canvas: android.graphics.Canvas, x: number, y: number, scale: number): void;
		drawCutout(canvas: android.graphics.Canvas, cutout: android.graphics.RectF, x: number, y: number, scale: number): void;
		/**
		 * @returns Width of the texture in pixels.
		 */
		getWidth(): number;
		/**
		 * @returns Height of the texture in pixels.
		 */
		getHeight(): number;
		/**
		 * Resizes all the frames of the texture to the specified size.
		 */
		resizeAll(width: number, height: number): void;
		/**
		 * Resizes all the frames by constant scale multiplier.
		 * @param scale scale to modify the frames by
		 */
		rescaleAll(scale: number): void;
		/**
		 * Resizes all the frames to match the first one.
		 */
		fitAllToOneSize(): void;
		/**
		 * Releases all allocated resources, should be called when the texture
		 * is not longer needed.
		 */
		release(): void;
	}

	/**
	 * Object containing font parameters. If no color, size and shadow are
	 * specified, default values are ignored and white font with text size 20,
	 * white color and 0.45 shadow is created.
	 */
	interface FontDescription {
		/**
		 * Font color, android integer color value (produced by
		 * {@link android.graphics.Color}).
		 * @default 0x000 // black
		 */
		color?: number,
		/**
		 * Font size.
		 * @default 20
		 */
		size?: number,
		/**
		 * Font shadow offset.
		 * @default 0 // no shadow
		 */
		shadow?: number,
		/**
		 * Font alignment, one of the {@link UI.Font.ALIGN_DEFAULT},
		 * {@link UI.Font.ALIGN_CENTER}, {@link UI.Font.ALIGN_END} constants.
		 */
		alignment?: number,
		/**
		 * Same as {@link alignment}.
		 */
		align?: number,
		/**
		 * If `true`, the font is bold, `false` otherwise.
		 * @default false
		 */
		bold?: boolean,
		/**
		 * If `true`, the font is italic, `false` otherwise.
		 * @default false
		 */
		cursive?: boolean,
		/**
		 * If `true`, the font is underlined, `false` otherwise.
		 * @default false
		 */
		underline?: boolean
	}

	/**
	 * {@inheritDoc UI.FontDescription}
	 */
    type FontParams = FontDescription;

    /**
	 * Class representing font used in the UI.
	 */
    class Font {
		/**
		 * Aligns text to the start of the element (left for English locale).
		 */
		static readonly ALIGN_CENTER: number;
		/**
		 * Aligns text to the center of the element.
		 */
		static readonly ALIGN_DEFAULT: number;
		/**
		 * Aligns text to the end of the element (right for English locale).
		 */
		static readonly ALIGN_END: number;
		/**
		 * Aligns text to the center of the element horizontally.
		 * @since 2.2.1b96
		 */
		static readonly ALIGN_CENTER_HORIZONTAL: number;
		alignment: number;
		color: number;
		isBold: boolean;
		isCursive: boolean;
		isUnderlined: boolean;
		shadow: number;
		size: number;
		/**
		 * Constructs new instance of the font with specified parameters.
		 * @param color font color, android integer color value (produced by
		 * android.graphics.Color)
		 * @param size font size
		 * @param shadow shadow offset
		 */
		constructor(color: number, size: number, shadow: number);
		/**
		 * Constructs new instance of the font with specified parameters.
		 * @param params parameters of the font
		 */
		constructor(params: FontDescription);
		/**
		 * Draws text on the canvas using created font.
		 * @param canvas {@link android.graphics.Canvas} instance to draw the text on
		 * @param x x coordinate of the text in pixels
		 * @param y x coordinate of the text in pixels
		 * @param text text string to draw
		 * @param scale additional scale to apply to the text
		 */
		drawText(canvas: android.graphics.Canvas, x: number, y: number, text: string, scale: number): void;
		/**
		 * Calculates bounds of the text given text position, text string and
		 * additional scale.
		 * @returns rect object containing calculated bounds of 
		 * the text
		 */
		getBounds(text: string, x: number, y: number, scale: number): android.graphics.Rect;
		/**
		 * Calculates text width given text string and additional scale.
		 * @returns width of the specified string when painted with specified 
		 * scale
		 */
		getTextWidth(text: string, scale: number): number;
		/**
		 * Calculates text height given text string and additional scale.
		 * @returns height of the specified string when painted with specified 
		 * scale
		 */
		getTextHeight(text: string, x: number, y: number, scale: number): number;
		/**
		 * Converts current {@link com.zhekasmirnov.innercore.api.mod.ui.types.Font Font} object to scriptable font description.
		 */
		asScriptable(): FontDescription;
    }

	/**
	 * Class used to visualize configuration file contents in a simple way.
	 */
    class ConfigVisualizer {
		/**
		 * Constructs new {@link UI.ConfigVisualizer} instance with specified elements 
		 * names prefix.
		 * @param config configuration file to be loaded
		 * @param prefix elements names prefix used for this visualizer
		 */
        constructor(config: com.zhekasmirnov.innercore.mod.build.Config, prefix: string);
		/**
		 * Constructs new {@link UI.ConfigVisualizer} instance with default elements 
		 * names prefix (*config_vis*).
		 * @param config configuration file to be loaded
		 */
        constructor(config: com.zhekasmirnov.innercore.mod.build.Config);
		/**
		 * Removes all elements with current element name prefix. In other
		 * words, removes all elements that were created by this.
		 * {@link UI.ConfigVisualizer} instance
		 * @param elements target {@link UI.WindowContent.elements} section
		 */
		clearVisualContent(elements: UI.ElementSet): void;
		/**
		 * Creates elements in the window to visualize configuration file.
		 * @param elements target {@link UI.WindowContent.elements} section
		 * @param prefs top left position of the first element. Default position 
		 * is (0, 0, 0)
		 */
		createVisualContent(elements: UI.ElementSet, prefs?: Partial<Vector>): void;
    }

	/**
	 * Object used to manipulate frame textures.
	 */
	interface FrameTexture {
		/**
		 * Specifies bottom left corner of the frame.
		 */
		/* static */ readonly CORNER_BOTTOM_LEFT: number;
		/**
		 * Specifies bottom right corner of the frame.
		 */
		/* static */ readonly CORNER_BOTTOM_RIGHT: number;
		/**
		 * Specifies top left corner of the frame.
		 */
		/* static */ readonly CORNER_TOP_LEFT: number;
		/**
		 * Specifies top right corner of the frame.
		 */
		/* static */ readonly CORNER_TOP_RIGHT: number;
		/**
		 * Specifies bottom side of the frame.
		 */
		/* static */ readonly SIDE_BOTTOM: number;
		/**
		 * Specifies left side of the frame.
		 */
		/* static */ readonly SIDE_LEFT: number;
		/**
		 * Specifies right side of the frame.
		 */
		/* static */ readonly SIDE_RIGHT: number;
		/**
		 * Specifies top side of the frame.
		 */
		/* static */ readonly SIDE_TOP: number;
		/**
		 * Expands side of the texture by specified amount of pixels.
		 * @param sideId side of the texture, one of the 
		 * **FrameTexture.SIDE_LEFT**, **FrameTexture.SIDE_RIGHT**, 
		 * **FrameTexture.SIDE_UP**, **FrameTexture.SIDE_DOWN** constants
		 * @returns Expanded {@link android.graphics.Bitmap} instance with the frame.
		 */
		expandSide(sideId: number, pixels: number): android.graphics.Bitmap;
		/**
		 * Expands texture to the specified side, filling the middle with
		 * specified color.
		 * @param color integer color value produced by {@link android.graphics.Color} 
		 * class
		 * @param sides array of booleans marking whether the side should be
		 * expanded or not. The order of the sides is
		 * **FrameTexture.SIDE_LEFT**, **FrameTexture.SIDE_RIGHT**,
		 * **FrameTexture.SIDE_UP**, **FrameTexture.SIDE_DOWN**
		 * @returns Expanded {@link android.graphics.Bitmap} instance with the frame.
		 */
		expand(width: number, height: number, color: number, sides: [boolean, boolean, boolean, boolean]): android.graphics.Bitmap;
		/**
		 * Expands texture to the specified side, filling the middle with
		 * specified color.
		 * @param color integer color value produced by {@link android.graphics.Color} 
		 * class
		 */
		expand(width: number, height: number, color: number): android.graphics.Bitmap;
		/**
		 * Expands texture to the specified side, filling the middle with
		 * specified color.
		 * @param scale scale of the created bitmap
		 * @param color integer color value produced by {@link android.graphics.Color} 
		 * class
		 * @param sides array of booleans marking whether the side should be 
		 * expanded or not. See {@link UI.FrameTexture.expand} parameters for details. 
		 * Default behavior is to scale all sides
		 * @returns Expanded and scaled {@link android.graphics.Bitmap} instance.
		 */
		expandAndScale(width: number, height: number, scale: number, color: number, sides: [boolean, boolean, boolean, boolean]): android.graphics.Bitmap;
		/**
		 * Expands texture to the specified side, filling the middle with
		 * specified color.
		 * @param scale scale of the created bitmap
		 * @param color integer color value produced by {@link android.graphics.Color}
		 * class
		 */
		expandAndScale(width: number, height: number, scale: number, color: number): android.graphics.Bitmap;
		/**
		 * @returns Original frame texture source stored in
		 * {@link android.graphics.Bitmap} instance.
		 */
		getSource(): android.graphics.Bitmap;
		/**
		 * @param side side of the texture, one of the
		 * **FrameTexture.SIDE_LEFT**, **FrameTexture.SIDE_RIGHT**,
		 * **FrameTexture.SIDE_UP**, **FrameTexture.SIDE_DOWN** constants
		 * @returns Texture side source extracted from the original frame
		 * texture source stored in {@link android.graphics.Bitmap} instance.
		 */
		getSideSource(side: number): android.graphics.Bitmap;
		/**
		 * @returns Object packed integer color value
		 * of the central pixel of the source texture.
		 */
		getCentralColor(): number;
		draw(canvas: android.graphics.Canvas, rect: android.graphics.RectF, scale: number, color: number, sides: [boolean, boolean, boolean, boolean]): void;
	}

    /**
	 * Namespace containing method to get {@link FrameTexture} instances.
	 */
    class FrameTextureSource {
        /**
		 * @param name gui texture name of the frame
		 */
        static get(name: string): FrameTexture;
		/*
		TODO:
			static get(name: string, style: Style): FrameTexture;
		*/
    }

    /**
	 * Namespace containing methods used to get and add gui textures.
	 */
    class TextureSource {
        /**
		 * @param name gui texture name
		 * @returns Bitmap instance with the ui texture, if it
		 * was loaded, with `"missing_texture"` texture otherwise.
		 */
        static get(name: string): android.graphics.Bitmap;
        /**
		 * 
		 * @param name gui texture name
		 * @returns Bitmap instance with the ui texture, if it
		 * was loaded, `null` otherwise.
		 */
        static getNullable(name: string): Nullable<android.graphics.Bitmap>;
        /**
		 * Adds any bitmap as a gui texture with specified name.
		 * @param name gui texture name
		 * @param bitmap {@link android.graphics.Bitmap} instance to be used as
		 * gui texture
		 */
        static put(name: string, bitmap: android.graphics.Bitmap): void;
		/*
		TODO:
			loadFile(file: java.io.File, namePrefix: string): void;
			loadAsset(name: string): void;
			loadDirectory(dir: java.io.File): void;
			loadDirectory(dir: java.io.File, namePrefix: string): void; 
		*/
    }

	/**
	 * Determines the overall size of game interface, which can vary
	 * depending on specific settings that are in place.
	 * @since 2.3.1b115
	 */
	function getMinecraftUiScale(): number;

	/**
	 * Defines the size of interface relative to the {@link UI.getMinecraftUiScale},
	 * with dimensions specified in units used within Inner Core interfaces.
	 * @since 2.3.1b115
	 */
	function getRelMinecraftUiScale(): number;

    /**
	 * Same as {@link UI.getScreenHeight}.
	 */
    function getScreenRelativeHeight(): number;

    /**
	 * @returns Screen height in units.
	 */
    function getScreenHeight(): number;
    
    /**
	 * Returns the currently running Android Activity, which can be
	 * used for various actions: opening dialogs, instantiating widgets,
	 * and many other operations with {@link android.content.Context}.
	 * @remarks
	 * It is not recommended to use it if it is possible to find
	 * a replacement in the presented Inner Core API.
	 */
    function getContext(): android.app.Activity;

}
