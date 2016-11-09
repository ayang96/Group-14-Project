import "src/date.format";
import { CrossFade, Push, Flip, TimeTravel } from 'src/transition';

/**
 * This file is for everything that is used universally throughout this project.
 * Colors, styles, common UI elements, useful functions, etc. go here.
 * 
 * The best way to use is to add the import: import * as common from "common";
 * then use any of the assets like: common.assetName
 *
 * Sections Organization:
 * 	1) Colors / Skins / Styles
 *	2) UI Elements
 *	3) Behaviors
 *	4) Miscellaneous
 **/



/************ 1) Colors / Skins / Styles **********************************************/

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
export var systemGrey = "#F2F2F2"; // for backgrounds
export var systemDarkerGrey = "#CCCCCC"; // for second state of backgrounds
export var systemLineColor = grey; // for lines seperating things

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
export var buttonStyleWhite = new Style({font: "16px Roboto", color: blue});
export var buttonStyleBlue = new Style({font: "16px Roboto", color: 'white'});

export var darkScreenCoverSkin = new Skin({ fill: "rgba(0, 0, 0, 0.5)" });
export var alertSkin = new Skin({ fill: systemGrey });
export var alertOptionsSkin = new Skin({ stroke: systemLineColor, borders: { top: 1 }});
export var alertOptionButtonSkin = new Skin({ fill: [systemGrey, systemDarkerGrey] });
export var alertOptionsSeperatorSkin = new Skin({ fill: systemLineColor });

export var navBarSkin = new Skin({ fill: systemGrey, stroke: systemLineColor, borders: { bottom: 1 }});

// Text Styles (left aligned by default for convenience)
export var bodyStyle 			= new Style({ font: "16px Roboto", color: black, horizontal: "left" });
export var bodyBoldStyle 		= new Style({ font: "16px Roboto Medium", color: black, horizontal: "left" });
export var bodyLightStyle 		= new Style({ font: "16px Roboto", color: grey, horizontal: "left" });
export var bodyLinkStyle 		= new Style({ font: "16px Roboto", color: [blue, darkerBlue], horizontal: "left" });
export var bodyLinkBoldStyle 	= new Style({ font: "16px Roboto Medium", color: [blue, darkerBlue], horizontal: "left" });
export var smallStyle 			= new Style({ font: "14px Roboto", color: black, horizontal: "left" });
export var smallLightStyle 		= new Style({ font: "14px Roboto", color: grey, horizontal: "left" });
export var smallLinkStyle		= new Style({ font: "14px Roboto", color: [blue, darkerBlue], horizontal: "left" });
export var titleStyle 			= new Style({ font: "18px Roboto", color: black, horizontal: "left" });
export var titleBoldStyle 		= new Style({ font: "18px Roboto Medium", color: black, horizontal: "left" });

// center aligned
export var bodyStyleCenter			= new Style({ font: "16px Roboto", color: black, horizontal: "center" });
export var bodyBoldStyleCenter		= new Style({ font: "16px Roboto Medium", color: black, horizontal: "center" });
export var bodyLightStyleCenter		= new Style({ font: "16px Roboto", color: grey, horizontal: "center" });
export var bodyLinkStyleCenter		= new Style({ font: "16px Roboto", color: [blue, darkerBlue], horizontal: "center" });
export var bodyLinkBoldStyleCenter 	= new Style({ font: "16px Roboto Medium", color: [blue, darkerBlue], horizontal: "center" });
export var smallStyleCenter			= new Style({ font: "14px Roboto", color: black, horizontal: "center" });
export var smallLightStyleCenter	= new Style({ font: "14px Roboto", color: grey, horizontal: "center" });
export var smallLinkStyleCenter		= new Style({ font: "14px Roboto", color: [blue, darkerBlue], horizontal: "center" });
export var titleStyleCenter			= new Style({ font: "18px Roboto", color: black, horizontal: "center" });
export var titleBoldStyleCenter 	= new Style({ font: "18px Roboto Medium", color: black, horizontal: "center" });

// right aligned
export var bodyStyleRight			= new Style({ font: "16px Roboto", color: black, horizontal: "right" });
export var bodyBoldStyleRight		= new Style({ font: "16px Roboto Medium", color: black, horizontal: "right" });
export var bodyLightStyleRight		= new Style({ font: "16px Roboto", color: grey, horizontal: "right" });
export var bodyLinkStyleRight		= new Style({ font: "16px Roboto", color: [blue, darkerBlue], horizontal: "right" });
export var bodyLinkBoldStyleRight 	= new Style({ font: "16px Roboto Medium", color: [blue, darkerBlue], horizontal: "right" });
export var smallStyleRight			= new Style({ font: "14px Roboto", color: black, horizontal: "right" });
export var smallLightStyleRight		= new Style({ font: "14px Roboto", color: grey, horizontal: "right" });
export var smallLinkStyleRight		= new Style({ font: "14px Roboto", color: [blue, darkerBlue], horizontal: "right" });
export var titleStyleRight			= new Style({ font: "18px Roboto", color: black, horizontal: "right" });
export var titleBoldStyleRight 		= new Style({ font: "18px Roboto Medium", color: black, horizontal: "right" });

// Layout constants/parameters
export const screenWidth = 320;		// width of screen / 2
export const screenHeight = 480;		// height of screen / 2
export const plusButtonSize = 60;		// width and height of the plus add button
export const plusBottomOffset = 15;	// bottom offset of the plus add button
export const navBarHeight = 40;
export const navPadding = 15; // left-right padding of navBar items

// Images
export var plusIconUp = 'assets/icon_plus_button_60x60.png';

export var plusIconDown = 'assets/icon_plus_button_pressed_60x60.png';

/************ 2) UI Elements **********************************************/



/** 
Handles switching between screens in the app.
Use this as the main container for the app

Params:
$.menu : menu content to be displayed
$.screens: dict of <"screenName", screenContent>

Usage:
application.distribute("dispatch", "screenName")
	Makes the app switch to the screen with name "screenName" in $.screens
application.distribute("dispatch", "back")
	Makes the app go back to the last screen that it was on
application.distribute("showMenu")
	Shows the menu
application.distribute("hideMenu")
	Hides the menu
application.distribute("notify", "You're opening a doc!")
	Notifies the user about something
application.distribute("alert", { some settings })
	Alerts the user and prompts for action.
	See the document for Alert below on what settings can be passed in.
**/
export var Dispatcher = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	contents: [
		new Container({
			left: 0, right: 0, top: 0, bottom: 0,
			name: "page", contents: [ new Container() ],
		}),
		this.menuHolder,
	],
	Behavior: class extends Behavior {
		onCreate(content, data) {
			this.menuHolder = new MenuHolder({ menu: $.menu });
			this.prevScreen = null;
		}
		onDisplayed(content) {
			this.hideMenu(content);
		}
		dispatch(content, screenName, transition) {
			let screen = null;
			if (screenName === "back") {
				screen = this.prevScreen;
				transition = transition || 'pushRight';
			} else {
				screen = $.screens[screenName];
			}
			if (screen && screen != content.page.last) {
				this.prevScreen = content.page.last;
				switch (transition) {
					case 'push':
					case 'pushLeft':
						content.page.run( new Push(), content.page.last, screen, { duration: 400, direction: "left" } );
						break;
					case 'pushRight':
						content.page.run( new Push(), content.page.last, screen, { duration: 400, direction: "right" } );
						break;
					default:
						content.page.empty();
						content.page.add(screen);
				}
			}
			this.hideMenu(content);
		}
		showMenu(content) {
			// Can change how this works
			if (! content.holder) {
				content.add(this.menuHolder);
			}
		}
		hideMenu(content) {
			if (content.holder) {
				content.remove(this.menuHolder);
			}
		}
		notify(content, message) {
			let settings = {
				message: message,
				options: [{ string: "OK", callback: function(){} }]
			};
			application.add(new Alert(settings));
		}
		alert(content, settings) {
			application.add(new Alert(settings));
		}
	}
}));

let MenuHolder = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, active: true,
	name: "holder",
	contents: [ $.menu ],
	Behavior: class extends ButtonBehavior {
		onTap(content) {
			application.distribute("hideMenu");
		}
	}
}));

const menuBarHeight = 35;

// Template for adding a menu bar placeholder above and on top of screen.
// Instantiate as new screenWithMenubar({screen: [ScreenObject]})
export var ScreenWithMenuBar = Container.template($ => ({
	top:0, left:0, bottom:0, right:0,
	contents: [
	
		//new Picture({left:-40, url: "Assets/UserProfileIcon.png"}),
		new Container({top: menuBarHeight, left:0, right:0, bottom:0, contents: $.screen}),
		new Container({top: 0, left:0, right:0, height: menuBarHeight, skin: new Skin({fill:"#e6e6e6"}),
			contents:[
			new NavMenuButton,
			new Picture({height: 21 ,top: 8,left:64, url: "Assets/SearchIcon.png"}),
			new Label({ top: 7, left: 100,height:25 ,
            		style: new Style({ font: "13px Roboto Regular", color: "gray" }), 
            		string: "Search Documents" }),
			
			new Label({ top: 7, right: 10,height:25 ,
            		style: new Style({ font: "13px Roboto Regular", color: blue }), 
            		string: "Select" }),
			]
			}),
			//menu bar placeholder. TODO
		]
}));

export var NavBar = Line.template($ => ({
	left: 0, right: 0, top: 0, height: navBarHeight,
	name: "nav", skin: navBarSkin, active: true, contents: $.contents,
}));

export var NavMenuButton = Picture.template($ => ({
	height: 26, left: navPadding,
	url: "Assets/MenuIcon.png", active: true,
	Behavior: class extends ButtonBehavior {
		onTap(content){
			application.distribute("showMenu");
		}
	}
}));

export var NavBackButton = Label.template($ => ({
	left: navPadding, right: navPadding, style: bodyLinkStyle, active: true,
	string: "< Back", Behavior: class extends ButtonBehavior {
		onTap(content) {
			application.distribute("dispatch", "back");
		}
	}
}));

export var NavSelectButton = Label.template($ => ({
	left: navPadding, right: navPadding, style: bodyLinkStyleRight, active: true,
	string: "Select", Behavior: $.Behavior
}));

export var NavSelectAllButton = Label.template($ => ({
	left: navPadding, right: navPadding, style: bodyLinkStyleLeft, active: true,
	string: "Select All", Behavior: $.Behavior
}));

export var NavCancelButton = Label.template($ => ({
	left: navPadding, right: navPadding, style: bodyLinkBoldStyleRight, active: true,
	string: "Cancel", Behavior: $.Behavior
}));

export var NavEditButton = Label.template($ => ({
	left: navPadding, right: navPadding, style: bodyLinkStyleRight, active: true,
	string: "Edit", Behavior: $.Behavior
}))

export var NavTitleLeft = Label.template($ => ({
	left: navPadding, right: navPadding, style: bodyStyle, string: $.string,
}));

export var NavTitleCenter = Label.template($ => ({
	left: navPadding, right: navPadding, style: bodyStyleCenter, string: $.string,
}));


/**
Use for the big blue buttons at the bottom of a lot of our screens
Params:
$.string: "TAP ME" or something like that
$.Behavior: Behavior for this button, recommended is to extend ButtonBehavior
$.skin: optional, skin for the button, default is the blue common.buttonSkin
$.style: optional, style for the label in the button, default is the white common.buttonStyleBlue
$.left, $.right, $.top, $.bottom, $.width, $.height: optional, default is pretty good too
**/
export var NormalButton = Container.template($ => ({
	left: $.left, right: $.right, top: $.top || 0, bottom: $.bottom || 0,
	width: $.width || 130, height: $.height || 50,
	skin: $.skin || buttonSkin, active: true,
	Behavior: $.Behavior,
	contents: [
		new Label({ string: $.string, style: $.style || buttonStyleBlue })
	]
}));


/**
Use to display an alert. 
Note: For general alerts you should still use the dipatcher
Params:
$.title: optional, the title of the alert
$.message: the message
$.blocking: optional, set to true if you don't want the user
			to be able to get out of the alert without clicking
			an option, false otherwise (can click outside the
			bounds of the alert to exit), default is true
$.options: corresponds to the buttons, should be a list of dicts
			of the form:
			{
				string: "Okay/Cancel/etc",
				callback: function() {
					// zero argument function called when this
					// option is selected
				}
			}
**/
export var Alert = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	contents: [
		new ScreenCover({ skin: darkScreenCoverSkin }),
		new AlertBox($),
	],
	Behavior: class extends Behavior {
		onCreate(content, settings) {
			if ('blocking' in $) {
				this.blocking = $.blocking;
			} else {
				this.blocking = true;
			}
		}
		onTapOutside(content) {
			if (! this.blocking) {
				this.exit(content);
			}
		}
		exit(content) {
			application.remove(content);
			return true;
		}
	}
}));

let AlertBox = Container.template($ => ({
	left: 40, right: 40, active: true,
	skin: alertSkin, contents: [
		new Column({
			left: 0, right: 0, top: 0, bottom: 0,
			name: 'main', contents: [
				new Column({
					left: alertPadding, right: alertPadding, top: alertPadding, bottom: alertPadding,
					name: 'textArea'
				})
			]
		})
	],
	Behavior: class extends Behavior {
		onCreate(content) {
			if ($.title) {
				content.main.textArea.add(new AlertTitle($.title));
			}
			content.first.textArea.add(new AlertMessage($.message));
			if ($.options) {
				content.main.add(new AlertOptions($.options));
			}
		}
	}
}));

let AlertTitle = Label.template($ => ({
	left: 0, right: 0, bottom: alertPadding,
	string: $, style: titleBoldStyleCenter,
}));

let AlertMessage = Text.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	string: $, style: bodyStyle,
}));

let AlertOptions = Line.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	skin: alertOptionsSkin,
	Behavior: class extends Behavior {
		onCreate(content) {
			content.add(new AlertOptionButton($[0]));
			for (let i = 1; i < $.length; i++) {
				content.add(new AlertOptionSeperator());
				content.add(new AlertOptionButton($[i]));
			}
		}
	}
}));

let AlertOptionButton = Container.template($ => ({
	left: 0, right: 0, top: 1,
	active: true, skin: alertOptionButtonSkin, contents: [
		new Container({
			left: 0, right: 0, top: alertPadding, bottom: alertPadding,
			contents: [ new Label({ string: $.string, style: buttonStyleWhite }) ]
		})
	],
	Behavior: class extends ButtonBehavior {
		onTap(content) {
			$.callback();
			content.bubble("exit");
		}
	}
}));

let AlertOptionSeperator = Container.template($ => ({
	top: 0, bottom: 0, width: 1, skin: alertOptionsSeperatorSkin
}));

let alertPadding = 15;

// Use to cover the screen entirely to register taps
let ScreenCover = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	skin: $.skin, active: true,
	Behavior: class extends ButtonBehavior {
		onTap(content) {
			content.container.delegate("onTapOutside");
		}
	}
}));


// Plus Add button template. See its behavior below
export var PlusButton = Container.template($ => ({
	bottom: plusBottomOffset, width: plusButtonSize, height: plusButtonSize,
	Behavior: plusButtonBehavior, active: true,
	contents: []
}));


/************ 3) Behaviors **********************************************/

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
	}
	onTouchEnded(button) {
		//TODO
		this.buttonImage.url = this.upSkin;
	}
};


/************ 4) Miscellaneous **********************************************/

/** Date string format to be used through the app **/
export function formatDate(date) {
	return date.format("mmm. d yyyy");
}
