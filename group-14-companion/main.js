/*
* 	Main Screen 
*	Runs everything at start
*	Simulate on iap140: 640x960 / 2 (iPhone 4)
*   Sections Organization:
* 	1) Imports- import each screen
*	2) Assets- common stuff from Figma and our own icons
*	3) Behaviors
*	4) Templates
*	5) Application and Application Data- application, example data here
*	6) Testing Code- display and testing
*/

/***************** 1) IMPORTS *******************************************/
import { DocumentsScreen } from "documents";
import { UsersScreen } from "users";
import { DocumentHistoryScreen } from "documenthistory";
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

let usersData = {
	users: [
		{name:'Allison Rory', tier:'Admin', color:'red'},
		{name:'Brian Chen', tier:'Tier 1', color:'green'},
		{name:'Dominique Yano', tier:'Tier 2', color:'blue'},
		{name:'Ellen van Hurst', tier:'Supervisor', color:'yellow'},
		{name:'Gabrielle Glasner', tier:'Tier 1', color:'blue'},
		{name:'Hector Smith', tier:'Tier 2', color:'pending'},
	]
};


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

/***************** 6) TESTING CODE *************************************/
// Comment out any below and your screen here to application for testing display

// DOCUMENTSHISTORYSCREEN
//application.add(new DocumentHistoryScreen({ document: "3e6f5707", data: data }));

// DOCUMENTSSCREEN
application.add(new screenWithMenubar({screen: [new DocumentsScreen(screenData)]}));

// USERSSCREEN
application.add(new screenWithMenubar({screen: [new UsersScreen(usersData)]}));
