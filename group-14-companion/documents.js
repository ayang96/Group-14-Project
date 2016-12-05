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
	active: true,
	Behavior: screenBehavior
}));


/************ 2) IMPORTS *****************************************************/
import * as common from "common";
import * as model from "model";

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

let addDocumentFolderSkin = new Skin({
	width: 90, height: 90, aspect: 'fit',
	texture: new Texture('assets/icon_add_folder_document_45x45.png'),
	states: 90, variants: 90,
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
	url: 'assets/listing_line_tags_white_cutouts_0.png',
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

let applicationData = null;

// Main screen behavior
class screenBehavior extends Behavior{
	onCreate(screen, data) {
		// Extract given data
		this.data = data;
		applicationData = this.data;
		screen.active = true;
		screen.distribute("render");
	}
	onDisplaying(screen) {
		this.render(screen);
	}
	update(screen) {
		this.render(screen);
	}
	render(screen) {
		screen.empty()
		this.currFolderID = this.data.state.folder;
		this.currFolder = this.data.getFolderData(this.currFolderID);
		this.directory = this.data.getPath(this.currFolderID); //data.directory;
		
		//this.documents = this.data.documents; // Pull from all documents ver
		this.documents = this.currFolder.documents;
		//this.documents = this.data.getDocumentListData(Object.keys(this.currFolder)); //Pull from current children ver
		
		//this.folders = this.data.folders; // Pull from all folders ver
		this.folders = this.currFolder.folders; // Pull from current children ver
		
		//trace('This.currFolderID ' + this.currFolderID + '\n');
		//trace('This.currFolder ' + this.currFolder + '\n');
		//trace('This.currFolder keys ' + Object.keys(this.currFolder) + '\n'); 
		//trace('This.directory ' + this.directory + '\n');
		//trace('This.documents ' + this.documents + '\n');
		//trace('This.folders ' + this.folders + '\n');
		
		// Add nav bar
		let navBar = new common.NavBar({ contents: [
			new common.NavMenuButton(),
			new common.NavSearch({
				hintString: 'Search Documents/Folders/Labels...',
				string: this.data.state.documentsSearch,
				Behavior: class extends Behavior {
					onSearch(content, searchString) {
						applicationData.setState({ documentsSearch: searchString });
						if (searchString) {
							applicationData.search(searchString);
							applicationData.setState({ folder: 'search' });
						} else {
							applicationData.setState({ folder: 'root' });
						}
						application.distribute('update');
					}
				}
			}),
			new common.NavSelectButton({
				Behavior: class extends common.ButtonBehavior {
					onTap(content) {
						application.distribute('notify', 'Implementation coming soon!');
					}
				}
			})
		]});

		// Add directory bar line
		let directoryHeading = new DirectoryLine(this.directory);
		
		// Add scroller 
		let contentToScrollVertically = new Column({
			top: 0, left: 0, right: 0, 
			contents: []});
			// Add folders
			let foldersList = Object.keys(this.folders);
			//trace('foldersList length ' + foldersList.length + '\n');
			for (let i = 0; i < foldersList.length; i++) {
				let addingFolder = this.folders[i]; // Pulling curr directory ver
				//trace("addingFolder keys " + Object.keys(addingFolder) + '\n');
				let addingFolderID = addingFolder.id; // Pulling curr directory ver
				//let addingFolderID = foldersList[i]; // Pulling whole table ver
				//let addingFolder = this.data.getFolderData(addingFolderID); // Pulling whole table ver
				let addingFolderName = addingFolder.name;
				let addingFolderTiers = addingFolder.tiers;
				let addingFolderLabels = addingFolder.labels;
				//trace("addingFolderstats " + addingFolderName + addingFolderTiers + addingFolderLabels + addingFolderID + '\n');
				
				contentToScrollVertically.add(new FolderLine(
						{name: addingFolderName,
						tier: addingFolderTiers,
						labels: addingFolderLabels,
						id: addingFolderID
						}
						//{name: data.folders[i].name,
						//tier: data.folders[i].tier,
						//labels: data.folders[i].labels}
				));
			}
			
			// Add documents
			let docList = Object.keys(this.documents);
			for (let i = 0; i < docList.length; i++) {
				//let addingDocID = docList[i]; // Pulling whole table ver
				//let addingDoc = this.data.getDocumentData(addingDocID); // Pulling whole table ver
				let addingDoc = this.documents[i]; // Pulling curr directory ver
				let addingDocID = addingDoc.id; // Pulling curr directory ver
				let addingDocName = addingDoc.name;
				let addingDocTier = this.data.getTierData(addingDoc.tier); //addingDoc.tier;
				let addingDocLabels = addingDoc.labels;
				let addingDocOut = this.data.getDocumentState(addingDocID); //addingDoc.out;
				//trace("addingDoc keys " + Object.keys(addingDoc) + '\n');
				
				contentToScrollVertically.add(new DocumentLine(
						{name: addingDocName,
						tier: addingDocTier,
						labels: addingDocLabels,
						out: addingDocOut,
						id: addingDocID
						}
						//{name: data.documents[i].name,
						//tier: data.documents[i].tier,
						//labels: data.documents[i].labels,
						//out: data.documents[i].out}
				));
			}
		let mainScroller = new MainScroller({contentToScrollVertically});
		
		// Add plus button
		let plusButton = common.PlusButton({
			Behavior: class extends common.ButtonBehavior {
				onTap(content) {
					application.add(new common.ScreenCover({
						contents: [
							new Column({
								left: 0, right: 0, bottom: 0,
								contents: [
									new Line({
										left: 0, right: 0, bottom: 0,
										contents: [
											new Label({
												left: 0, right: 10, style: common.smallWhiteStyleRight,
												string: 'New Folder'
											}),
											new Container({
												right: 20, width: 45, height: 45, active: true,
												skin: addDocumentFolderSkin, variant: 0, state: 0,
												Behavior: class extends common.ButtonBehavior {
													onTap(content) {
														content.bubble('exit');
														application.distribute('dispatch', 'newFolderScreen', 'new');
													}
												}
											}),
											new Container({
												left: 20, width: 45, height: 45, active: true,
												skin: addDocumentFolderSkin, variant: 1, state: 0,
												Behavior: class extends common.ButtonBehavior {
													onTap(content) {
														content.bubble('exit');
														application.distribute('dispatch', 'newDocScreen', 'new');
													}
												}
											}),
											new Label({
												left: 10, right: 0, style: common.smallWhiteStyle,
												string: 'New Document'
											}),
										]
									}),
									new common.CancelButton({
										Behavior: class extends common.ButtonBehavior {
											onTap(content) {
												content.bubble('exit');
											}
										}
									}),
								]
							})
						],
						Behavior: class extends Behavior {
							exit(content) {
								application.remove(content);
								return true;
							}
						}
					}));
				}
			}
		});
		
		// Add to screen
		let screenColumn = new Column({
			top: 0, left: 0, right: 0, bottom: 0,
			contents: []
		});
		screenColumn.add(navBar);
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
		label.add(new tagLabel({string: this.text}));
		//label.add(new tagLabel({string: this.text.slice(0, 1).toUpperCase()}));
		
		// Color label
		let foundColor = false;
		switch (this.color) {
			case 'red':
				label.skin = redSkin;
				foundColor = true;
				break;
			case 'orange':
				label.skin = orangeSkin;
				foundColor = true;
				break;
			case 'yellow':
				label.skin = yellowSkin;
				foundColor = true;
				break;
			case 'green':
				label.skin = greenSkin;
				foundColor = true;
				break;
			case 'sky':
				label.skin = skySkin;
				foundColor = true;
				break;
			case 'blue':
				label.skin = blueSkin;
				foundColor = true;
				break;
			case 'purple':
				label.skin = purpleSkin;
				foundColor = true;
				break;
			case 'grey':
				label.skin = greySkin;
				foundColor = true;
				break;
		} 
		if (!foundColor) { // assume grey
			label.skin = greySkin;
		}
	}
};

// Auto-generates icon, name, label, and tier of a document
class documentBehavior extends Behavior {
	onCreate(document, data) {
		// Extract given data
		this.name = data.name;
		this.tierName = data.tier.name; //data.tier;
		this.labels = data.labels; 
		this.out = data.out;
		this.id = data.id;
		//trace("DocStats " + Object.keys(data) + '\n');
		//trace("DocumentStats " + this.name + this.tierName + this.labels + this.out + this.id + '\n');

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
		if (!validOut) docLine.add(new docOutOtherIcon({left: sideMargin})); // Assume other
		
		// Add document name and tier
		if (this.out != 'other') {
			docLine.add(new Column({
				width: docNameWidth, left: spacing,
				contents: [
					new docNameLabel({string: this.name, color: "black"}),
					new docTierLabel({string: this.tierName, color: "black"})
				]
			}));
		} else {
			docLine.add(new Column({
				width: docNameWidth, left: spacing,
				contents: [
					new docNameLabel({string: this.name, color: "gray"}),
					new docTierLabel({string: this.tierName, color: "gray"})
				]
			}));
		}
		
		let labelsList = Object.keys(this.labels);
		
		// Add empty label slots
		for (let i = labelsList.length; i < 4; i++) {
			docLine.add(new emptyTagIcon({right:0, top: 0}));
		}
		
		// Add document labels
		for (let i = 0; i < Math.min(4, labelsList.length); i++) {
			let label = applicationData.getLabelData(this.labels[i]); //this.labels[i];
			let addingLabelText = label.abbreviation;
			let addingLabelColor = label.color;
			//let addingLabelText = this.labels[i][0];
			//let addingLabelColor = this.labels[i][1];
			docLine.add(new LabelTag({text: addingLabelText, color: addingLabelColor,
										right: 0, top: 0}));
		}	
		
		// Add right margin
		docLine.add(new Container({width: sideMargin, right: 0}));
		
		
		document.add(docLine);
		switch (labelsList.length) {
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
	onTouchEnded(document, x, y, ticks) {
		applicationData.setState({document: this.id});
		application.distribute("dispatch", "documentInfoScreen", "push");
		//switch (this.name) {
		//	case "Document#1":
		//		application.distribute("dispatch", "documentInfoScreen", "push");
		//		break;
		//	case "Document#2":
		//		application.distribute("dispatch", "documentInfoScreen2", "push");
		//		break;
		//	case "Document#3":
		//		application.distribute("dispatch", "documentInfoScreen3", "push");
		//		break;
		//}
	}
};

class folderBehavior extends Behavior {
	onCreate(folder, data) {
		// Extract given data
		this.name = data.name;
		this.tier = data.tier;
		this.labels = data.labels; 
		this.id = data.id;
		//trace("DocStats " + Object.keys(data) + '\n');
		//trace("DocumentStats " + this.name + this.tier + this.labels + this.id + '\n');

		
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
				tierString = this.tier[i].name; //this.tier[i];
			} else {
				tierString += ", ";
				tierString += this.tier[i].name; //this.tier[i];
			}
		}
		folderName.add(new docTierLabel({string: tierString, color: "black"}));
		folderLine.add(folderName);
		
		let labelsList = Object.keys(this.labels);
		
		// Add empty label slots
		for (let i = labelsList.length; i < 4; i++) {
			folderLine.add(new emptyTagIcon({right:0, top: 0}));
		}
		
		// Add folder labels
		for (let i = 0; i < Math.min(4, labelsList.length); i++) {
			let label = this.labels[i];
			let addingLabelText = label.abbreviation;
			let addingLabelColor = label.color;
		//	let addingLabelText = this.labels[i][0];
		//	let addingLabelColor = this.labels[i][1];
			folderLine.add(new LabelTag({text: addingLabelText, color: addingLabelColor, 
										right: 0, top: 0}));
		}	
		
		// Add right margin
		folderLine.add(new Container({width: sideMargin, right: 0}));
		
		folder.add(folderLine);
		switch (labelsList.length) {
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
	onTouchEnded(folder, x, y, ticks) {
		applicationData.setState({folder: this.id});
		application.distribute("dispatch", "documentsScreen", "pushLeft"); // Going to child level
		application.distribute("render");
	}
};

class directoryLevelBehavior extends Behavior {
	onCreate(level, data) {
		this.folder = data.string.split("\\")[0];
		level.string = this.folder;
		//trace("DirectoryID " + Object.keys(data) + '\n');
		this.folderID = data.id.id;
		//trace("DirectoryStats " + level.string + this.folderID + '\n');
		//trace("dirID " + this.folderID + '\n'); 
		
		level.style = clickableStyle;
		this.clickable = data.clickable;
		if (!data.clickable) { level.style = nonClickableStyle; }
	}
	onTouchEnded(level, x, y, ticks) {
		applicationData.setState({folder: this.folderID});
		application.distribute("dispatch", "documentsScreen", "pushRight"); // Going to ancestor level
		application.distribute("render");
	}
};

class directoryLineBehavior extends Behavior {
	onCreate(line, data) {
		// Extract given data
		this.name = data.string;
		this.ids = data.folderDataList;
		this.levels = data.string.split("\\");

		
		// Truncate width of level text based on # of chars, 
		// show only truncLevels levels at a time
		let hierarchy = new Line({left: 0, width: directoryWidth, height: line.height, top: 0, bottom: 0, contents: []});
		hierarchy.add(new Container({width: sideMargin, top: 0, bottom: 0, left: 0}));
		let levelStart = 0;
		if (this.name.length >= truncChars) { 
			levelWidth = truncLevelWidth;
			if (this.levels.length >= truncLevels) {
				levelStart = this.levels.length - truncLevels;
				hierarchy.add(new Label({style: nonClickableStyle, string: '\\ ', left: 0}));
			}
		}
		
		
		// Add directory listing
		let currLevelIndex = 0;
		for (; levelStart < this.levels.length - 2; levelStart++) {
			if (this.levels[levelStart]) {
				hierarchy.add(new directoryLabel({showFull: false, 
						clickable: true, string: this.levels[levelStart], 
						id: this.ids[currLevelIndex]}));
				currLevelIndex++;
				hierarchy.add(new Label({style: nonClickableStyle, string: '\\ ', left: 0}));
			}
		}
		levelWidth = undefined;
		for (let i = this.levels.length - 2; i < this.levels.length; i++) {
			if (this.levels[i]) {
				let click = true;
				if (i == this.levels.length-1) { click = false; }
				hierarchy.add(new directoryLabel({showFull: true, 
							clickable: click, string: this.levels[i],
							id: this.ids[currLevelIndex] }));
				currLevelIndex++;
				hierarchy.add(new Label({style: nonClickableStyle, string: '\\ ', left: 0}));
			}
		}
		let levelsParsedCorrectly = (currLevelIndex == Object.keys(this.ids).length);
		
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
	active: true,
	Behavior: directoryLevelBehavior
}));

// Sort button on upper right
let sortButton = Label.template($ => ({
	string: 'Sort v',  right: sideMargin, 
	active: true,
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
	active: true,
	contents: []
}));

// Line on top for a directory. Define name = directory
// When instantiating, call DirectoryLine(name)
let DirectoryLine = Line.template($ => ({
	height: directoryHeight, width: screenWidth,
	top: 0, left: 0, right: 0,
	skin: new Skin({fill:"#e6e6e6"}),
	active: true,
	Behavior: directoryLineBehavior,
	contents: []
}));



// Scroller template
let MainScroller = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, clip: true,
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



