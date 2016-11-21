/*
* 	Users Screen 
*	For viewing users database
*	Simulate on iap140: 640x960 / 2 (iPhone 4)
*   Sections Organization:
* 	1) Export Screen- this screen as a container template
*	2) Imports
*	3) Assets- format standard sizes, colors, images, text fonts
*	4) Behaviors
*	5) Templates
*/

/************ 1) EXPORT SCREEN **********************************************/
export var UsersScreen = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: lineSkin,
	contents: [],
	Behavior: screenBehavior
}));

/************ 2) IMPORTS *****************************************************/
import * as common from "common";

import {
    VerticalScroller,
    VerticalScrollbar,
    TopScrollerShadow,
    BottomScrollerShadow
} from 'src/scroller';

/************ 3) ASSETS ******************************************************/

// Format standards. Edit here if necessary
const screenWidth = 320;		// width of screen / 2
const screenHeight = 480;		// height of screen / 2
const sortOffset = 275;			// left offset of sort button
const userIconSize = 30;		// width and height of a label tag
const lineHeight = 50;			// height of a document listing
const sideMargin = 15;			// left and right margin of a document listing
const spacing = 10;				// spacing left and right of items
const userNameWidth = 150;		// width of a doc name listing before cutoff
const headingTextHeight = 16;	// height of a heading bold text
const subTextHeight = 14;		// height of a standard sub text
const sortBarHeight = 32;		// height of sortbar/directory from documents




// Solid Fill Skins
let redSkin = new Skin({ fill:'#EB5757' }); 		// = "red"
let orangeSkin = new Skin({ fill:'#F2994A' }); 		// = "orange"
let yellowSkin = new Skin({ fill: '#F2C94C' }); 	// = "yellow"
let greenSkin = new Skin({ fill: '#219653' }); 		// = "green"
let skySkin = new Skin({ fill: '#56CCF2' });		// = "sky"
let blueSkin = new Skin({ fill: '#2F80ED' });		// = "blue"
let purpleSkin = new Skin({ fill: '#9B51E0'});		// = "purple"
let greySkin = new Skin({ fill: '#828282'});		// = "grey"

let lineSkin = new Skin({							//stroked skin of a user listing
		fill: 'white', 			
		stroke: 'silver',
		borders: {left: 0, right: 0, top: 1, bottom: 1}
});	

let pendingSkin = new Skin({						//stroked skin of a pending user listing
		fill: '#EBEBEB', 			
		stroke: 'silver',
		borders: {left: 0, right: 0, top: 1, bottom: 1}
});	
		
// Source Images
let userWhiteout = Picture.template($ => ({		// hardcoded white cutouts over user icons
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: screenWidth, height: lineHeight,
	url: 'assets/listing_line_users_white_cutouts.png',
	aspect: 'fit'
}));

let pendingWhiteout = Picture.template($ => ({		// hardcoded grey cutouts over pending user icons
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: screenWidth, height: lineHeight,
	url: 'assets/listing_line_users_pending_cutouts.png',
	aspect: 'fit'
}));

let pendingIcon = Picture.template($ => ({		// hourglass user icon for pending users
	width: userIconSize, height: userIconSize,
	url: 'assets/icon_pending_hourglass_32x32.png',
	aspect: 'fit'
}));

// Text Labels
// For clickable text
let clickableStyle = common.bodyLinkStyle;
//new Style({font: "16px Roboto Regular", color: "#2F80ED", horizontal: "left"});

// For nonclickable text
let nonClickableStyle = common.bodyStyle;
//new Style({font: "16px Roboto Regular", color: "black", horizontal: "left"});

let iconLabel = Label.template($ => ({				// for a user icon
	width: userIconSize, height: userIconSize,
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	style: new Style({font: "16px Roboto Medium", color: "white", horizontal: "center"}),
	string: $.string
}));

let userNameLabel = Label.template($ => ({			// for a user's name or tier
	height: headingTextHeight, width: $.width,
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	style: new Style({font: "16px Roboto Medium", color: "black", horizontal: "left"}),
	string: $.string
}));



/************* 4) BEHAVIORS ****************************************************/

// Main screen behavior
class screenBehavior extends Behavior {
	onCreate(screen, data) {
		// Extract given data TODO
		this.data = data;
		this.users = data.users;
		
		// Add directory bar line
		let sortBarHeading = new SortBarLine();
		
		// Add scroller 
		let contentToScrollVertically = new Column({
			top: 0, left: 0, right: 0, 
			contents: []});
			// Add users
			for (let i = 0; i < data.users.length; i++) {
				contentToScrollVertically.add(new userLine(
						{name: data.users[i].name,
						tier: data.users[i].tier,
						color: data.users[i].color}
				));
			}
		let mainScroller = new MainScroller({contentToScrollVertically});
		
		// Add plus button
		let plusButton = common.PlusButton();
		
		// Add to screen
		let screenColumn = new Column({
			top: 0, left: 0, right: 0, bottom: 0,
			contents: []
		});
		screenColumn.add(new Container({left: 0, right:0, top: 0, height: 2*sortBarHeight}));
		screenColumn.add(mainScroller);
		screen.add(screenColumn);
		screen.add(sortBarHeading);
		screen.add(plusButton);
		
	}
};

// Auto-generates skin and text of a label or tag icon
class userIconBehavior extends Behavior {
	onCreate(icon, data) {
		// Extract given data
		this.text = data.text;
		let nameSplit = data.text.split(" ");
		this.firstName = nameSplit[0];
		this.lastName = nameSplit[nameSplit.length - 1];
		this.color = data.color;
		
		// Color label
		let pending = true;
		switch (this.color) {
			case 'red':
				icon.skin = redSkin;
				pending = false;
				break;
			case 'orange':
				icon.skin = orangeSkin;
				pending = false;
				break;
			case 'yellow':
				icon.skin = yellowSkin;
				pending = false;
				break;
			case 'green':
				icon.skin = greenSkin;
				pending = false;
				break;
			case 'sky':
				icon.skin = skySkin;
				pending = false;
				break;
			case 'blue':
				icon.skin = blueSkin;
				pending = false;
				break;
			case 'purple':
				icon.skin = purpleSkin;
				pending = false;
				break;
			case 'grey':
				icon.skin = greySkin;
				pending = false;
				break;
		} 
		
		// If status is pending
		if (pending) {
			icon.skin = greySkin;
			icon.add(new pendingIcon());
		} else {
		// Add initial to label
		icon.add(new iconLabel({string: this.firstName.slice(0,1)+this.lastName.slice(0,1)}));
		}
	}
};

// Auto-generates user icon, name, and tier
class userBehavior extends common.ButtonBehavior {
	onCreate(user, data) {
		// Extract given data
		this.name = data.name;
		this.tier = data.tier;
		this.color = data.color; 
		
		// Creation of line
		let userLine = new Line({top: 0, bottom: 0, left: 0, right: 0, contents: []});
		
		// Add left margin spacing
		userLine.add(new Container({left:0, width: sideMargin}));
		
		// Add user icon
		userLine.add(new userIcon({text: this.name, color: this.color}));
		
		// Add user name and tier
		userLine.add(new userNameLabel({string: this.name, width: userNameWidth, left: spacing}));
		userLine.add(new userNameLabel({string: this.tier, left: 0}));
		
		// Add line and masking cutout to container
		user.add(userLine);
		
		// Apply skin and masking cutout to container
		if (this.color != 'pending') {
			user.skin = lineSkin;
			user.add(new userWhiteout({top: 0, left: 0, right: 0, bottom: 0}));	
		} else {
			user.skin = pendingSkin;
			user.add(new pendingWhiteout({top: 0, left: 0, right: 0, bottom: 0}));	
		}
	}
	onTap(user) {
		switch (this.name) {
			case "Brian Chen":
				application.distribute("dispatch", "userProfileScreen", "push");
				break;
			case "Gabrielle Glasner":
				application.distribute("dispatch", "userProfileScreen2", "push");
				break;
		}
		
	}
};

class sortBarBehavior extends Behavior {
	onCreate(col, data) {
		// Sort text
		let top = new Line({left: 0, width: screenWidth, height: sortBarHeight, top: 0, 
			contents: [new Container({width: sortOffset}), new sortButton()]});
		col.add(top);
		
		// Access tier headings text
		let bottom = new Line({ left: 0, top: 0, width: screenWidth, height: sortBarHeight,
			contents: [] });
		bottom.add(new Label({left: sideMargin,  
			width: userIconSize + userNameWidth, height: headingTextHeight,
			style: common.bodyBoldStyle, string: "Users"}));
		bottom.add(new Label({left: 0, style: common.bodyBoldStyle, 
			string: "Access Tier"}));
		col.add(bottom);
		
	}
};

class sortButtonBehavior extends Behavior {
	onCreate(button) {
		//TODO
	}
	onTouchBegan(button) {
	}
	onTouchEnded(button) {
	}
};



/**************** 5) TEMPLATES *******************************************/

// Sort button on upper right
let sortButton = Label.template($ => ({
	string: 'Sort v',  right: sideMargin, 
	style: common.bodyLinkStyleRight,
	Behavior: sortButtonBehavior
}));


// User icon. Define data = {text = user's name, color = label color}
// When instantiating, call new userIcon(data)
let userIcon = Container.template($ => ({
	width: userIconSize, height: userIconSize, 
	Behavior: userIconBehavior,
	contents: []
}));

// Listing for a document. Define data = {name = username, tier, color = icon color or 'pending'}
// When instantiating, call new userLine(data)
let userLine = Container.template($ => ({
	top: 0, left: 0, right: 0, height: lineHeight, width: screenWidth,
	Behavior: userBehavior, active: true,
	contents: []
}));

// Line on top for sort bar. 
let SortBarLine = Column.template($ => ({
	height: 2*sortBarHeight, width: screenWidth,
	top: 0, left: 0, right: 0,
	skin: lineSkin,
	Behavior: sortBarBehavior,
	contents: []
}));

// Scroller template
let MainScroller = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, 
    contents: [
      VerticalScroller($, {
      	active: true,
      	top: 0, left: 0, right: 0,
      	contents: [ $.contentToScrollVertically,
      		VerticalScrollbar(), TopScrollerShadow(), BottomScrollerShadow(),
      	]
      }),  
    ]
}));



