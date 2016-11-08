/*
* 	Main Screen 
*	Runs everything at start
*	Simulate on iap140: 640x960 / 2 (iPhone 4)
*   Sections Organization:
* 	1) Imports- import each screen
*	2) Assets- common stuff from Figma and our own icons
*	3) Behaviors
*	4) Templates
*	5) Application and Application Data- display and testing, example data here
*/

/***************** 1) IMPORTS *******************************************/
import {
    DocumentsScreen
} from "documents";
import { DocumentHistoryScreen } from "documenthistory";
import { Menu } from "Menu";
import * as common from "common";

/***************** 2) ASSETS ********************************************/
const applicationHeight = 480;
const menuBarHeight = 30;

/***************** 3) BEHAVIORS ********************************************/

/***************** 4) TEMPLATES ********************************************/

// Template for adding a menu bar placeholder above and on top of screen.
// Instantiate as new screenWithMenubar({screen: [ScreenObject]})
let screenWithMenubar = Container.template($ => ({
	top:0, left:0, bottom:0, right:0,
	contents: [
		new Container({height: applicationHeight - menuBarHeight, 
						left:0, right:0, bottom:0, contents: $.screen}),
		new Container({top: 0, left:0, right:0, height: menuBarHeight, skin: common.greySkin}),
			//menu bar placeholder. TODO
		]
}));

/***************** 5) APPLICATION AND APPLICATION DATA ******************/


// DOCUMENTSSCREEN For testing. Example data 
let directory = 'My Cabinet/AFolder/BFolder/CFolder/DFolder/CurrentFolder';

let documents = [
	{ name:'Document#1', labels:[['F', 'red'], ['P', 'orange']], tier:'Tier 1', out: 'in'},
	{ name:'Document#2', labels:[['C', 'green']], tier:'Tier 1', out: 'other'},
	{ name:'Document#3', labels: [['D', 'purple']], tier: 'Tier 2', out: 'in'},
	{ name:'Document#4', labels: [], tier: 'Tier 1', out: 'you'},
	{ name:'Document#5', labels: [['F', 'red']], tier: 'Tier 1', out: 'in'},
	{ name:'Document#6', labels: [], tier: 'Tier 2', out: 'in'},
	{ name:'Document#7', labels: [['D', 'purple']], tier: 'Tier 2', out: 'in'},
	{ name:'Document#8', labels: [['C', 'green']], tier: 'Tier 1', out: 'other'},
	{ name:'Document#9', labels: [], tier: 'Tier 1', out: 'in'},
];

let folders = [
	{ name:'Folder#1', labels: [['P', 'orange']], tier:['Tier 1', 'Tier 2']},
	{ name:'Folder#2', labels: [], tier:['Tier 1']},
	{ name:'Folder#3', labels: [], tier:['Tier 1']}
];

let screenData = {
	directory: directory,
	documents: documents,
	folders: folders
};

// DOCUMENTSSCREEN For Display of testing. Comment out later
//application.add(new DocumentsScreen(screenData));

var data = {
	documents: {
		"3e6f5707": {
			name: 'Document#1',
			labels: [
				"0e063425",
			],
			tier: "3b2aa2c6",
			out: 'in',
			locker: "936420de",
			history: [
				"ae97a999",
			]
		}
	},
	folders: {
		"8294fdef": {
			name: "Folder#1",
			labels: [
				"0e063425",
			]
		}
	},
	fileSystem: {
		"root": {
			directory: '/',
			documents: [
				"3e6f5707",
			],
			folders: [

			]
		}
	},
	users: {
		"46efacaf": {
			fullName: "Gabrielle Glasner",
			givenName: "Gabrielle",
			familyName: "Glasner",
			avatarColor: "green",
			avatarInitials: "GG",
			tier: "3b2aa2c6",
		}
	},
	tiers: {
		"3b2aa2c6": {
			name: "Tier 1",
		}
	},
	events: {
		"ae97a999": {
			type: "document",
			document: "3e6f5707",
			action: "out",
			date: new Date("Tue Nov 08 2016 02:11:30 GMT-0800 (PST)"),
			user: "46efacaf",
		}
	},
	labels: {
		"0e063425": {
			name: "Finished",
			initials: "F",
			color: "red",
		}
	},
	lockers: {},
}

var screens = {
	"documentsScreen" : new DocumentsScreen(screenData),
	"documentHistoryScreen" : new DocumentHistoryScreen({ document: "3e6f5707", data: data }),
	"test" : new Container({
		left: 0, right: 0, top: 0, bottom: 0,
		skin: new Skin({ fill: "white" }),
		contents: [
			new Container({
				left: 10, top: 10, width: 50, height: 50, skin: new Skin({ fill: "blue" }), active: true,
				Behavior: class extends common.ButtonBehavior {
					onTap(content) {
						application.distribute("showMenu");
					}
				}
			}),
			new Container({
				left: 10, top: 100, width: 50, height: 50, skin: new Skin({ fill: "red" }), active: true,
				Behavior: class extends common.ButtonBehavior {
					onTap(content) {
						application.distribute("dispatch", "documentsScreen");
					}
				}
			}),
		]
	})
}

var dispatcher = new common.Dispatcher({ menuHolder: new common.MenuHolder({ menu: new Menu() }), screens: screens });
application.add(dispatcher);
application.distribute("dispatch", "test");
