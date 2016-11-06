/*
* 	Documents Screen 
*	For viewing documents filesystem
*   Sections Organization:
* 	1) Export Screen- this screen as a container template
*	2) Imports
*	3) Assets- format standard sizes, colors, images, text fonts
*	4) Behaviors
*	5) Templates
*	6) Application and Application Data- example data, display test code
*/

/************ 1) EXPORT SCREEN **********************************************/
export var DocumentsScreen = Container.template($ => ({	contents: [],
	screenData: $.screenData,
	Behavior: screenBehavior}));

/************ 2) IMPORTS *****************************************************/
import {    VerticalScroller,    VerticalScrollbar,    TopScrollerShadow,    BottomScrollerShadow} from 'src/scroller';

/************ 3) ASSETS ******************************************************/

// Format standards. Edit here if necessary
let labelWidth = 25;		// width of a label tag
let labelHeight = 30;		// height of a label tag
let docIconSize = 30;		// width and height of a document and folder icon
let lineHeight = 50;		// height of a document listing
let sideMargin = 30;		// left and right margin of a document listing
let docNameWidth = 200;		// width of a doc name listing before cutoff
let headingTextHeight = 16;	// height of a heading bold text
let subTextHeight = 14;		// height of a standard sub text
let directoryHeight = 16;	// height of a directory text
let directoryWidth = 250;	// width of a directory before cutoff



// Solid Fill Skins
let redSkin = new Skin({ fill:'#EB5757' }); 		// = "red"
let orangeSkin = new Skin({ fill:'#F2994A' }); 		// = "orange"
let yellowSkin = new Skin({ fill: '#F2C94C' }); 	// = "yellow"
let greenSkin = new Skin({ fill: '#219653' }); 		// = "green"
let skySkin = new Skin({ fill: '#56CCF2' });		// = "sky"
let blueSkin = new Skin({ fill: '#2F80ED' });		// = "blue"
let purpleSkin = new Skin({ fill: '#9B51E0'});		// = "purple"
let greySkin = new Skin({ fill: '#828282'});		// = "grey"

let lineSkin = new Skin({fill: 'white', stroke: 'silver'});	//stroked skin of a document listing

// Source Images
let docInIcon = Picture.template($ => ({			// icon for a in document
	left: sideMargin,
	width: docIconSize, height: docIconSize,
	url: new Texture('assets/icon_document.png'),
	aspect: 'fit'
}));

let docOutOtherIcon = Picture.template($ => ({		// icon for document out by other
	width: docIconSize, height: docIconSize,
	url: new Texture('assets/icon_document_out_other.png'),
	aspect: 'fit'
}));

let docOutYouIcon = Picture.template($ => ({		// icon for document out by you
	width: docIconSize, height: docIconSize,
	url: new Texture('assets/icon_document_out_you.png'),
	aspect: 'fit'
}));

// Text Labels
let tagLabel = Label.template($ => ({				// for a label tag
	width: labelWidth, height: labelHeight,
	style: new Style({font: "16px Roboto", color: "white", horizontal: "center"}),
	string: $.string
}));

let docNameLabel = Label.template($ => ({			// for a document's name
	height: headingTextHeight, width: docNameWidth,
	style: new Style({font: "16px Roboto Medium", color: "black", horizontal: "left"}),
	string: $.string
}));

let docTierLabel = Label.template($ => ({			// for a document's tier
	height: headingTextHeight, width: docNameWidth,
	style: new Style({font: "12px Roboto Medium", color: "black", horizontal: "left"}),
	string: $.string
}));

let directoryLabel = Label.template($ => ({			// for the directory on top
	height: directoryHeight, width: directoryWidth,
	style: new Style({font: "16 px Roboto Regular", color: "black", horizontal: "left"}),
	string: $.string
}));


/************* 4) BEHAVIORS ****************************************************/

// Main screen behavior
class screenBehavior extends Behavior {
	onCreate(screen) {
		// Add scroller TODO
			// Add directory
			// Add folders
			// Add documents
		
	}
};

// Auto-generates skin and text of a label or tag icon
class labelBehavior extends Behavior {
	onCreate(label) {
		// Add initial to label
		contents.add(new tagLabel({string: label.text.slice(0, 1)}));
		
		// Color label
		switch (label.color) {
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
	onCreate(document) {
		// Add document icon
		switch (document.out) {
			case 'in':
				document.add(new docInIcon());
				break;
			case 'other':
				document.add(new docOutOtherIcon());
				break;
			case 'you':
				document.add(new docOutYouIcon());
				break;
		}
		
		// Add document name and tier
		document.add(new Column({
			width: docNameWidth,
			contents: [
				new docNameLabel({string: document.name}),
				new docTierLabel({string: document.tier})
			]
		}));
		
		// Add document labels
		for (i = 0; i < document.labels.length; i++) {
			document.add(new LabelTag({text: documents.labels[i][0], color: documents.labels[i][1]}));
		}
	
	}
};

class folderBehavior extends Behavior {
	// TODO
};

/**************** TEMPLATES *******************************************/
// Label or tag icon. Define text = label name, color = label color
let LabelTag = Container.template($ => ({
	width: labelWidth, height: labelHeight, right: sideMargin,
	text: $.text,
	color: $.color,
	Behavior: labelBehavior,
	contents: []
}));

// Listing for a document. Define name = docName, tier, labels list, 
//									out = 'in', 'other', or 'you'
let DocumentLine = Line.template($ => ({
	top: 0, left: 0, right: 0, height: lineHeight,
	name: $.name,
	tier: $.tier,
	labels: $.labels,
	out: $.out,
	skin: lineSkin,
	Behavior: documentBehavior,
	contents: []
}));

let FolderLine = Line.template($ => ({
	// TODO
}));

/***************** APPLICATION AND APPLICATION DATA ******************/

// For testing. Example data
let directory = '/My Cabinet/';

let documents = {
	document1: { labels:[('F', 'red'), ('P', 'orange')], name:'Document#1', tier:'Tier 1', out: 'in'},	document2: { labels:[('C', 'green')], name:'Document#2', tier:'Tier 1', out: 'other'}};

let folders = {
	folder1: { labels: [], name:'Folder#1', tier:['Tier 1', 'Tier 2']}
};

let screenData = {
	directory: directory,
	documents: documents,
	folders: folders
};

// For Testing/Display. Comment out
application.add(new DocumentsScreen(screenData));