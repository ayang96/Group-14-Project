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
	skin: lineSkin,	contents: [],
	screenData: $.screenData,
	Behavior: screenBehavior}));

/************ 2) IMPORTS *****************************************************/
import {    VerticalScroller,    VerticalScrollbar,    TopScrollerShadow,    BottomScrollerShadow} from 'src/scroller';

/************ 3) ASSETS ******************************************************/

// Format standards. Edit here if necessary
const labelWidth = 25;		// width of a label tag
const labelHeight = 30;		// height of a label tag
const docIconSize = 30;		// width and height of a document and folder icon
const lineHeight = 50;		// height of a document listing
const sideMargin = 20;		// left and right margin of a document listing
const spacing = 10;			// spacing left and right of items
const docNameWidth = 200;		// width of a doc name listing before cutoff
const headingTextHeight = 16;	// height of a heading bold text
const subTextHeight = 14;		// height of a standard sub text
const directoryHeight = 32;	// height of a directory text
const directoryWidth = 350;	// width of a directory before cutoff
const plusButtonSize = 60;	// width and height of the plus add button
const plusTopOffset = 570;	// top offset of the plus add button



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

let plusIcon = Picture.template($ => ({				// plus button
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: plusButtonSize, height: plusButtonSize,
	url: 'assets/icon_plus_button_60x60.png',
	aspect: 'fit'
}));

// Text Labels
let tagLabel = Label.template($ => ({				// for a label tag
	width: labelWidth, height: labelHeight,
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	style: new Style({font: "16px Roboto", color: "white", horizontal: "center"}),
	string: $.string
}));

let docNameLabel = Label.template($ => ({			// for a document's name
	height: headingTextHeight, width: docNameWidth,
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	style: new Style({font: "16px Roboto Medium", color: "black", horizontal: "left"}),
	string: $.string
}));

let docTierLabel = Label.template($ => ({			// for a document's tier
	height: headingTextHeight, width: docNameWidth,
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	style: new Style({font: "12px Roboto Medium", color: "black", horizontal: "left"}),
	string: $.string
}));

let directoryLabel = Label.template($ => ({			// for the directory on top
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	height: directoryHeight, width: directoryWidth,
	style: new Style({font: "16 px Roboto Regular", color: "black", horizontal: "left"}),
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
			// Add folders TODO
			
			// Add documents
			for (let i = 0; i < data.documents.length; i++) {
				contentToScrollVertically.add(new DocumentLine(
						{name: data.documents[i].name,
						tier: data.documents[i].tier,
						labels: data.documents[i].labels,
						out: data.documents[i].out}
				));
			}		let mainScroller = new MainScroller({contentToScrollVertically});
		
		// Add plus button
		let plusButton = new PlusButton();
		
		// Add to screen
		let screenColumn = new Column({
			top: 0, left: 0, right: 0, bottom: 0,
			contents: []
		});
		screenColumn.add(directoryHeading);
		screenColumn.add(mainScroller);
		screen.add(screenColumn);
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
		
		// Add document icon
		switch (this.out) {
			case 'in':
				document.add(new docInIcon({left: sideMargin}));
				break;
			case 'other':
				document.add(new docOutOtherIcon({left: sideMargin}));
				break;
			case 'you':
				document.add(new docOutYouIcon({left: sideMargin}));
				break;
		}
		
		// Add document name and tier
		document.add(new Column({
			width: docNameWidth, left: spacing,
			contents: [
				new docNameLabel({string: this.name}),
				new docTierLabel({string: this.tier})
			]
		}));
		
		// Add document labels
		for (let i = 0; i < this.labels.length; i++) {
			document.add(new LabelTag({text: this.labels[i][0], color: this.labels[i][1]}));
		}	
		// Add right margin
		document.add(new Container({width: sideMargin, right: 0}));
	}
};

class folderBehavior extends Behavior {
	// TODO
};

class directoryLineBehavior extends Behavior {
	onCreate(line, data) {
		// Extract given data
		this.name = data
		
		// Add directory listing
		line.add(new directoryLabel({left: sideMargin, top: 10, string: this.name }));
		
		// Add Sort function TODO
	}
};

class plusButtonBehavior extends Behavior {
	onCreate(button) {
		button.add(new plusIcon({top:0, bottom:0, left:0, right:0}));
	}
	onTouchStart(button) {
		//TODO
	}
	onTouchEnded(button) {
		//TODO
	}
};

/**************** 5) TEMPLATES *******************************************/
// Label or tag icon. Define data = {text = label name, color = label color}
// When instantiating, call new LabelTag(data)
let LabelTag = Container.template($ => ({
	width: labelWidth, height: labelHeight, right: 0,
	Behavior: labelBehavior,
	contents: []
}));

// Listing for a document. Define data = {name = docName, tier, labels list, 
//									out = 'in', 'other', or 'you'}
// When instantiating, call new DocumentLine(data)
let DocumentLine = Line.template($ => ({
	top: 0, left: 0, right: 0, height: lineHeight,
	skin: lineSkin,
	Behavior: documentBehavior,
	contents: []
}));

let FolderLine = Line.template($ => ({
	// TODO
}));

// Line on top for a directory. Define name = directory
// When instantiating, call DirectoryLine(name)
let DirectoryLine = Line.template($ => ({
	height: directoryHeight, 
	skin: lineSkin,
	Behavior: directoryLineBehavior,
	contents: []
}));

// Plus Add button template.
let PlusButton = Container.template($ => ({
	top: plusTopOffset,
	Behavior: plusButtonBehavior,
	contents: []
}));

// Scroller template
let MainScroller = Column.template($ => ({    left: 0, right: 0, top: 0, bottom: 0,     contents: [
      VerticalScroller($, {
      	active: true,
      	top: 0,
      	contents: [ $.contentToScrollVertically,
      		VerticalScrollbar(), TopScrollerShadow(), BottomScrollerShadow(),
      	]
      }),      ]}));



