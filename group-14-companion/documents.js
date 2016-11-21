/*
* 	Documents Screen 
*	For viewing documents filesystem
*	Simulate on iap140: 640x960 / 2 (iPhone 4)
*   Sections Organization:
* 	1) Export Screen- this screen as a container template
*	2) Imports
*	3) Assets- format standard sizes, colors, images, text fonts
*	4) Behaviors
*	5) Templates
*/

/************ 1) EXPORT SCREEN **********************************************/
export var DocumentsScreen = Container.template($ => ({
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
const labelWidth = 25;			// width of a label tag
const labelHeight = 30;			// height of a label tag
const docIconSize = 30;			// width and height of a document and folder icon
const lineHeight = 50;			// height of a document listing
const sideMargin = 15;			// left and right margin of a document listing
const spacing = 10;				// spacing left and right of items
const docNameWidth = 150;		// width of a doc name listing before cutoff
const headingTextHeight = 16;	// height of a heading bold text
const subTextHeight = 14;		// height of a standard sub text
const directoryHeight = 24;		// height of a directory text
const directoryWidth = 275;		// width of a directory before cutoff
let	  levelWidth = undefined;	// will change to truncLevelWidth if truncating
const truncLevelWidth = 18;		// will shrink previous levels to this width
const truncChars = 36;			// minimum # of chars threshold to start truncating
const truncLevels = 4;			// show only this # of levels at a time




// Solid Fill Skins
let redSkin = new Skin({ fill:'#EB5757' }); 		// = "red"
let orangeSkin = new Skin({ fill:'#F2994A' }); 		// = "orange"
let yellowSkin = new Skin({ fill: '#F2C94C' }); 	// = "yellow"
let greenSkin = new Skin({ fill: '#219653' }); 		// = "green"
let skySkin = new Skin({ fill: '#56CCF2' });		// = "sky"
let blueSkin = new Skin({ fill: '#2F80ED' });		// = "blue"
let purpleSkin = new Skin({ fill: '#9B51E0'});		// = "purple"
let greySkin = new Skin({ fill: '#828282'});		// = "grey"

let lineSkin = new Skin({							//stroked skin of a document listing
		fill: 'white', 			
		stroke: 'silver',
		borders: {left: 0, right: 0, top: 1, bottom: 1}
});	
		
// Source Images
let docInIcon = Picture.template($ => ({			// icon for a in document
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: docIconSize, height: docIconSize,
	url: 'assets/icon_document.png',
	aspect: 'fit'
}));

let docOutOtherIcon = Picture.template($ => ({		// icon for document out by other
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: docIconSize, height: docIconSize,
	url: 'assets/icon_document_out_other.png',
	aspect: 'fit'
}));

let docOutYouIcon = Picture.template($ => ({		// icon for document out by you
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: docIconSize, height: docIconSize,
	url: 'assets/icon_document_out_you.png',
	aspect: 'fit'
}));

let emptyTagIcon = Picture.template($ => ({			// icon for an empty label slot
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: labelWidth, height: labelHeight,
	url: 'assets/icon_empty_tag_label_flat_25x30px.png',
	aspect: 'stretch'
}));

let folderIcon = Picture.template($ => ({		// icon for folder
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: docIconSize, height: docIconSize,
	url: 'assets/icon_folder.png',
	aspect: 'fit'
}));

let tagWhiteout4 = Picture.template($ => ({		// hardcoded white cutouts over 4 tags
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: screenWidth, height: lineHeight,
	url: 'assets/listing_line_tags_white_cutouts.png',
	aspect: 'fit'
}));

let tagWhiteout3 = Picture.template($ => ({		// hardcoded white cutouts over 3 tags
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: screenWidth, height: lineHeight,
	url: 'assets/listing_line_tags_white_cutouts_3.png',
	aspect: 'fit'
}));

let tagWhiteout2 = Picture.template($ => ({		// hardcoded white cutouts over 2 tags
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: screenWidth, height: lineHeight,
	url: 'assets/listing_line_tags_white_cutouts_2.png',
	aspect: 'fit'
}));

let tagWhiteout1 = Picture.template($ => ({		// hardcoded white cutouts over 1 tags
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: screenWidth, height: lineHeight,
	url: 'assets/listing_line_tags_white_cutouts_1.png',
	aspect: 'fit'
}));

let tagWhiteout0 = Picture.template($ => ({		// hardcoded white cutouts over 0 tags
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: screenWidth, height: lineHeight,
	url: 'assets/listing_line_tags_white_cutouts.png',
	aspect: 'fit'
}));

// Text Labels
// For clickable text
let clickableStyle = common.bodyLinkStyle;
//new Style({font: "16px Roboto Regular", color: "#2F80ED", horizontal: "left"});

// For nonclickable text
let nonClickableStyle = common.smallStyle;
//new Style({font: "16px Roboto Regular", color: "black", horizontal: "left"});

let tagLabel = Label.template($ => ({				// for a label tag
	width: labelWidth, height: labelHeight,
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	style: new Style({font: "16px Roboto", color: "white", horizontal: "center"}),
	string: $.string
}));

let docNameLabel = Label.template($ => ({			// for a document's name
	height: headingTextHeight, width: docNameWidth,
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	style: new Style({font: "16px Roboto Medium", color: $.color, horizontal: "left"}),
	string: $.string
}));

let docTierLabel = Label.template($ => ({			// for a document's tier
	height: headingTextHeight, width: docNameWidth,
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	style: new Style({font: "12px Roboto Medium", color: $.color, horizontal: "left"}),
	string: $.string
}));



/************* 4) BEHAVIORS ****************************************************/

// Main screen behavior
class screenBehavior extends Behavior {
	onCreate(screen, data) {
		// Extract given data
		this.data = data;
		this.directory = data.directory;
		this.documents = data.documents;
		this.folders = data.folders;
		
		// Add directory bar line
		let directoryHeading = new DirectoryLine(this.data.directory);
		
		// Add scroller 
		let contentToScrollVertically = new Column({
			top: 0, left: 0, right: 0, 
			contents: []});
			// Add folders
			for (let i = 0; i < data.folders.length; i++) {
				contentToScrollVertically.add(new FolderLine(
						{name: data.folders[i].name,
						tier: data.folders[i].tier,
						labels: data.folders[i].labels}
				));
			}
			
			// Add documents
			for (let i = 0; i < data.documents.length; i++) {
				contentToScrollVertically.add(new DocumentLine(
						{name: data.documents[i].name,
						tier: data.documents[i].tier,
						labels: data.documents[i].labels,
						out: data.documents[i].out}
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
		screenColumn.add(new Container({left: 0, right:0, top: 0, height: directoryHeight}));
		screenColumn.add(mainScroller);
		screen.add(screenColumn);
		screen.add(directoryHeading);
		screen.add(plusButton);
		
	}
};

// Auto-generates skin and text of a label or tag icon
class labelBehavior extends Behavior {
	onCreate(label, data) {
		// Extract given data
		this.text = data.text;
		this.color = data.color;
		
		// Add initial to label
		label.add(new tagLabel({string: this.text.slice(0, 1)}));
		
		// Color label
		switch (this.color) {
			case 'red':
				label.skin = redSkin;
				break;
			case 'orange':
				label.skin = orangeSkin;
				break;
			case 'yellow':
				label.skin = yellowSkin;
				break;
			case 'green':
				label.skin = greenSkin;
				break;
			case 'sky':
				label.skin = skySkin;
				break;
			case 'blue':
				label.skin = blueSkin;
				break;
			case 'purple':
				label.skin = purpleSkin;
				break;
			case 'grey':
				label.skin = greySkin;
				break;
		} 
	}
};

// Auto-generates icon, name, label, and tier of a document
class documentBehavior extends Behavior {
	onCreate(document, data) {
		// Extract given data
		this.name = data.name;
		this.tier = data.tier;
		this.labels = data.labels; 
		this.out = data.out;

		// Creation of Line
		let docLine = new Line({top: 0, bottom: 0, left: 0, right: 0, contents: []});
		
		// Add document icon
		let validOut = false;
		switch (this.out) {
			case 'in':
				docLine.add(new docInIcon({left: sideMargin}));
				validOut = true;
				break;
			case 'other':
				docLine.add(new docOutOtherIcon({left: sideMargin}));
				validOut = true;
				break;
			case 'you':
				docLine.add(new docOutYouIcon({left: sideMargin}));
				validOut = true;
				break;
		}
		if (!validOut) docLine.add(new docInIcon({left: sideMargin})); // Assume in
		
		// Add document name and tier
		if (this.out != 'other') {
			docLine.add(new Column({
				width: docNameWidth, left: spacing,
				contents: [
					new docNameLabel({string: this.name, color: "black"}),
					new docTierLabel({string: this.tier, color: "black"})
				]
			}));
		} else {
			docLine.add(new Column({
				width: docNameWidth, left: spacing,
				contents: [
					new docNameLabel({string: this.name, color: "gray"}),
					new docTierLabel({string: this.tier, color: "gray"})
				]
			}));
		}
		
		// Add empty label slots
		for (let i = this.labels.length; i < 4; i++) {
			docLine.add(new emptyTagIcon({right:0, top: 0}));
		}
		
		// Add document labels
		for (let i = 0; i < Math.min(4, this.labels.length); i++) {
			docLine.add(new LabelTag({text: this.labels[i][0], color: this.labels[i][1],
										right: 0, top: 0}));
		}	
		
		// Add right margin
		docLine.add(new Container({width: sideMargin, right: 0}));
		
		
		document.add(docLine);
		switch (this.labels.length) {
			case 0:
				document.add(new tagWhiteout0({top: 0, left: 0, right: 0, bottom: 0}));
				break;
			case 1:
				document.add(new tagWhiteout1({top: 0, left: 0, right: 0, bottom: 0}));
				break;
			case 2:
				document.add(new tagWhiteout2({top: 0, left: 0, right: 0, bottom: 0}));
				break;
			case 3:
				document.add(new tagWhiteout3({top: 0, left: 0, right: 0, bottom: 0}));
				break;
			case 4:
				document.add(new tagWhiteout4({top: 0, left: 0, right: 0, bottom: 0}));
				break;
		}
	}
	onTouchBegan(document) {
		//TODO
	}
	onTouchEnded(document, x, y, ticks) {
		switch (this.name) {
			case "Document#1":
				application.distribute("dispatch", "documentInfoScreen", "push");
				break;
			case "Document#2":
				application.distribute("dispatch", "documentInfoScreen2", "push");
				break;
			case "Document#3":
				application.distribute("dispatch", "documentInfoScreen3", "push");
				break;
		}
	}
};

class folderBehavior extends Behavior {
	onCreate(folder, data) {
		// Extract given data
		this.name = data.name;
		this.tier = data.tier;
		this.labels = data.labels; 
		
		// Creation of line
		let folderLine = new Line({top: 0, bottom: 0, left: 0, right: 0, contents: []});
		
		// Add folder icon
		folderLine.add(new folderIcon({left: sideMargin}));
		
		// Add folder name 
		let folderName = new Column({
			width: docNameWidth, left: spacing,
			contents: [
				new docNameLabel({string: this.name, color: "black"}),
			]
		});
		
		// Add folder tiers
		let tierString = "";
		for (let i = 0; i < this.tier.length; i++) {
			if (i == 0) {
				tierString = this.tier[i];
			} else {
				tierString += ", ";
				tierString += this.tier[i];
			}
		}
		folderName.add(new docTierLabel({string: tierString, color: "black"}));
		folderLine.add(folderName);
		
		// Add empty label slots
		for (let i = this.labels.length; i < 4; i++) {
			folderLine.add(new emptyTagIcon({right:0, top: 0}));
		}
		
		// Add folder labels
		for (let i = 0; i < Math.min(4, this.labels.length); i++) {
			folderLine.add(new LabelTag({text: this.labels[i][0], color: this.labels[i][1], 
										right: 0, top: 0}));
		}	
		
		// Add right margin
		folderLine.add(new Container({width: sideMargin, right: 0}));
		
		folder.add(folderLine);
		switch (this.labels.length) {
			case 0:
				folder.add(new tagWhiteout0({top: 0, left: 0, right: 0, bottom: 0}));
				break;
			case 1:
				folder.add(new tagWhiteout1({top: 0, left: 0, right: 0, bottom: 0}));
				break;
			case 2:
				folder.add(new tagWhiteout2({top: 0, left: 0, right: 0, bottom: 0}));
				break;
			case 3:
				folder.add(new tagWhiteout3({top: 0, left: 0, right: 0, bottom: 0}));
				break;
			case 4:
				folder.add(new tagWhiteout4({top: 0, left: 0, right: 0, bottom: 0}));
				break;
		}	
	
	}
	onTouchBegan(document) {
		//TODO navigation into document page
	}
	onTouchEnded(document) {
		//TODO
	}
};

class directoryLevelBehavior extends Behavior {
	onCreate(level, data) {
		this.folder = data.string.split("/")[0];
		level.string = this.folder;
		
		level.style = clickableStyle;
		this.clickable = data.clickable;
		if (!data.clickable) { level.style = nonClickableStyle; }
	}
	onTouchBegan(level) {
		//TODO
	}
	onTouchEnded(level) {
		//TODO
	}
};

class directoryLineBehavior extends Behavior {
	onCreate(line, data) {
		// Extract given data
		this.name = data;
		this.levels = data.split("/");
		
		// Truncate width of level text based on # of chars, 
		// show only truncLevels levels at a time
		let hierarchy = new Line({left: 0, width: directoryWidth, height: line.height, top: 0, bottom: 0, contents: []});
		hierarchy.add(new Container({width: sideMargin, top: 0, bottom: 0, left: 0}));
		let levelStart = 0;
		if (this.name.length >= truncChars) { 
			levelWidth = truncLevelWidth;
			if (this.levels.length >= truncLevels) {
				levelStart = this.levels.length - truncLevels;
				hierarchy.add(new Label({style: nonClickableStyle, string: '/ ', left: 0}));
			}
		}
		
		// Add directory listing
		for (; levelStart < this.levels.length - 2; levelStart++) {
			if (this.levels[levelStart]) {
				hierarchy.add(new directoryLabel({showFull: false, 
						clickable: true, string: this.levels[levelStart]}));
				hierarchy.add(new Label({style: nonClickableStyle, string: '/ ', left: 0}));
			}
		}
		levelWidth = undefined;
		for (let i = this.levels.length - 2; i < this.levels.length; i++) {
			if (this.levels[i]) {
				let click = true;
				if (i == this.levels.length-1) { click = false; }
				hierarchy.add(new directoryLabel({showFull: true, 
							clickable: click, string: this.levels[i] }));
				hierarchy.add(new Label({style: nonClickableStyle, string: '/ ', left: 0}));
			}
		}
		line.add(hierarchy);
		
		// Add Sort function 
		line.add(new sortButton());
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
// For each directory level in the top bar
// When instantiating, call new directoryLabel({showFull: disallow truncation, 
//								clickable: link style or not, string: text here})
let directoryLabel = Label.template($ => ({	
	left: 0, width: levelWidth,
	style: clickableStyle,
	Behavior: directoryLevelBehavior
}));

// Sort button on upper right
let sortButton = Label.template($ => ({
	string: 'Sort v',  right: sideMargin, 
	style: common.bodyLinkStyleRight,
	Behavior: sortButtonBehavior
}));


// Label or tag icon. Define data = {text = label name, color = label color}
// When instantiating, call new LabelTag(data)
let LabelTag = Container.template($ => ({
	width: labelWidth, height: labelHeight, 
	right: $.right, top: $.top, left: $.left, bottom: $.bottom,
	Behavior: labelBehavior,
	contents: []
}));

// Listing for a document. Define data = {name = docName, tier, labels list, 
//									out = 'in', 'other', or 'you'}
// When instantiating, call new DocumentLine(data)
let DocumentLine = Container.template($ => ({
	top: 0, left: 0, right: 0, height: lineHeight, width: screenWidth,
	active: true,
	skin: lineSkin,
	Behavior: documentBehavior,
	contents: []
}));

// Listing for a folder. Define data = {name = docName, tier list, labels list}
// When instantiating, call new FolderLine(data)
let FolderLine = Container.template($ => ({
	top: 0, left: 0, right: 0, height: lineHeight,
	skin: lineSkin,
	Behavior: folderBehavior,
	contents: []
}));

// Line on top for a directory. Define name = directory
// When instantiating, call DirectoryLine(name)
let DirectoryLine = Line.template($ => ({
	height: directoryHeight, width: screenWidth,
	top: 0, left: 0, right: 0,
	skin: new Skin({fill:"#e6e6e6"}),
	Behavior: directoryLineBehavior,
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



