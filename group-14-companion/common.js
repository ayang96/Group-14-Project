import "src/date.format";

/**
 * This file is for everything that is used universally throughout this project.
 * Colors, styles, common UI elements, useful functions, etc. go here.
 * 
 * The best way to use is to add the import: import * as common from "common";
 * then use any of the assets like: common.assetName
 **/



/************ Colors / Skins / Styles **********************************************/

export var red = '#EB5757';
export var orange = '#F2994A';
export var yellow = '#F2C94C';
export var green = '#219653';
export var sky = '#56CCF2';
export var blue = '#2F80ED';
export var purple = '#9B51E0';
export var grey = '#828282';
export var black = 'black';

export var darkerBlue = "#0455C2"; // for second state of buttons and links

// Solid Fill Skins
export var redSkin = new Skin({ fill: red }); 			// = "red"
export var orangeSkin = new Skin({ fill: orange }); 	// = "orange"
export var yellowSkin = new Skin({ fill: yellow }); 	// = "yellow"
export var greenSkin = new Skin({ fill: green }); 		// = "green"
export var skySkin = new Skin({ fill: sky });			// = "sky"
export var blueSkin = new Skin({ fill: blue });			// = "blue"
export var purpleSkin = new Skin({ fill: purple });		// = "purple"
export var greySkin = new Skin({ fill: grey });			// = "grey"

export var buttonSkin = new Skin({ fill: [blue, darkerBlue] });
export var buttonStyleWhite = new Style({font: "16px Roboto Regular", color: blue});
export var buttonStyleBlue = new Style({font: "16px Roboto Regular", color: 'white'});

// Text Styles (left aligned by default for convenience)
export var bodyStyle 			= new Style({ font: "16px Roboto Regular", color: black, horizontal: "left" });
export var bodyBoldStyle 		= new Style({ font: "16px Roboto Medium", color: black, horizontal: "left" });
export var bodyLightStyle 		= new Style({ font: "16px Roboto Regular", color: grey, horizontal: "left" });
export var bodyLinkStyle 		= new Style({ font: "16px Roboto Regular", color: [blue, darkerBlue], horizontal: "left" });
export var smallStyle 			= new Style({ font: "14px Roboto Regular", color: black, horizontal: "left" });
export var smallLightStyle 		= new Style({ font: "14px Roboto Regular", color: grey, horizontal: "left" });
export var smallLinkStyle		= new Style({ font: "14px Roboto Regular", color: [blue, darkerBlue], horizontal: "left" });
export var titleStyle 			= new Style({ font: "18px Roboto Regular", color: black, horizontal: "left" });

// center aligned
export var bodyStyleCenter			= new Style({ font: "16px Roboto Regular", color: black, horizontal: "center" });
export var bodyBoldStyleCenter		= new Style({ font: "16px Roboto Medium", color: black, horizontal: "center" });
export var bodyLightStyleCenter		= new Style({ font: "16px Roboto Regular", color: grey, horizontal: "center" });
export var bodyLinkStyleCenter		= new Style({ font: "16px Roboto Regular", color: [blue, darkerBlue], horizontal: "center" });
export var smallStyleCenter			= new Style({ font: "14px Roboto Regular", color: black, horizontal: "center" });
export var smallLightStyleCenter	= new Style({ font: "14px Roboto Regular", color: grey, horizontal: "center" });
export var smallLinkStyleCenter		= new Style({ font: "14px Roboto Regular", color: [blue, darkerBlue], horizontal: "center" });
export var titleStyleCenter			= new Style({ font: "18px Roboto Regular", color: black, horizontal: "center" });

// right aligned
export var bodyStyleRight			= new Style({ font: "16px Roboto Regular", color: black, horizontal: "right" });
export var bodyBoldStyleRight		= new Style({ font: "16px Roboto Medium", color: black, horizontal: "right" });
export var bodyLightStyleRight		= new Style({ font: "16px Roboto Regular", color: grey, horizontal: "right" });
export var bodyLinkStyleRight		= new Style({ font: "16px Roboto Regular", color: [blue, darkerBlue], horizontal: "right" });
export var smallStyleRight			= new Style({ font: "14px Roboto Regular", color: black, horizontal: "right" });
export var smallLightStyleRight		= new Style({ font: "14px Roboto Regular", color: grey, horizontal: "right" });
export var smallLinkStyleRight		= new Style({ font: "14px Roboto Regular", color: [blue, darkerBlue], horizontal: "right" });
export var titleStyleRight			= new Style({ font: "18px Roboto Regular", color: black, horizontal: "right" });

// Layout constants/parameters
export const screenWidth = 320;		// width of screen / 2
export const screenHeight = 480;		// height of screen / 2
export const plusButtonSize = 60;		// width and height of the plus add button
export const plusBottomOffset = 15;	// bottom offset of the plus add button

// Images
export var plusIconUp = 'assets/icon_plus_button_60x60.png';

export var plusIconDown = 'assets/icon_plus_button_pressed_60x60.png';

/************ UI Elements **********************************************/

export var MenuHolder = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, active: true,
	name: "holder",
	contents: [ $.menu ],
	Behavior: class extends ButtonBehavior {
		onTap(content) {
			application.distribute("hideMenu");
		}
	}
}));

export var Dispatcher = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	contents: [
		new Container({
			left: 0, right: 0, top: 0, bottom: 0,
			name: "page",
		}),
		$.menuHolder,
	],
	Behavior: class extends Behavior {
		onDisplayed(content) {
			this.hideMenu(content);
		}
		dispatch(content, screenName) {
			if (screenName) {
				let screen = $.screens[screenName];
				if (screen) {
					content.page.empty();
					content.page.add(screen);
				}
			}
			this.hideMenu(content);
		}
		showMenu(content) {
			// Can change how this works
			if (! content.holder) {
				content.add($.menuHolder);
			}
		}
		hideMenu(content) {
			if (content.holder) {
				content.remove($.menuHolder);
			}
		}
	}
}))


// Plus Add button template. See its behavior below
export var PlusButton = Container.template($ => ({
	bottom: plusBottomOffset, width: plusButtonSize, height: plusButtonSize,
	Behavior: plusButtonBehavior, active: true,
	contents: []
}));


/************ Behaviors **********************************************/

/**
 * Use this behavior for anything that acts like a button,
 * e.g. When you press on it, it changes to a different color, and when
 * you release, it goes back to its original color. Different colors, fonts,
 * etc. should be implemented using different states. You can optionally
 * extend this behavior to take some action after pressing the button
 * using the onTap method.
 * Example:
		let myButton = new Container({ width: 100, height: 100, active: true,
			skin: new Skin({ fill: ['silver', 'gray'] }),
			Behavior: class extends ButtonBehavior {
				onTap(content) {
					// execute some code
					foo();
				}
			}
		});
*/
export class ButtonBehavior extends Behavior {
	onTouchBegan(content) {
		content.state = 1;
	}
	onTouchEnded(content) {
		content.state = 0;
		this.onTap(content);
	}
}

export class plusButtonBehavior extends Behavior {
	onCreate(button) {
		this.upSkin = plusIconUp;
		this.downSkin = plusIconDown;
		this.buttonImage = new Picture({width: plusButtonSize, height: plusButtonSize,
										aspect: 'fit', url: this.upSkin}); 
		button.add(this.buttonImage);
	}
	onTouchBegan(button) {
		//TODO navigation
		this.buttonImage.url = this.downSkin;
		trace('down\n');
	}
	onTouchEnded(button) {
		//TODO
		this.buttonImage.url = this.upSkin;
		trace('up\n');
	}
};


/************ Miscellaneous **********************************************/

/** Date string format to be used through the app **/
export function formatDate(date) {
	return date.format("mmm. d yyyy");
}
