/*
* 	Main Screen 
*	Runs everything at start
*	Simulate on iap140: 640x960 / 2 (iPhone 4)
*   Sections Organization:
* 	1) Imports- import each screen
*	2) Assets- common stuff from Figma and our own icons
*	3) Application and Application Data- display and testing, example data here
*/

/***************** 1) IMPORTS *******************************************/
import {
    DocumentsScreen
} from "documents";
import { DocumentHistoryScreen } from "documenthistory";
import * as common from "common";

/***************** 2) ASSETS ********************************************/

// Solid Fill Skins from Figma
let redSkin = new Skin({ fill:'#EB5757' }); 		// = "red"
let orangeSkin = new Skin({ fill:'#F2994A' }); 		// = "orange"
let yellowSkin = new Skin({ fill: '#F2C94C' }); 	// = "yellow"
let greenSkin = new Skin({ fill: '#219653' }); 		// = "green"
let skySkin = new Skin({ fill: '#56CCF2' });		// = "sky"
let blueSkin = new Skin({ fill: '#2F80ED' });		// = "blue"
let purpleSkin = new Skin({ fill: '#9B51E0'});		// = "purple"
let greySkin = new Skin({ fill: '#828282'});		// = "grey"


/***************** 3) APPLICATION AND APPLICATION DATA ******************/

// DOCUMENTSSCREEN For testing. Example data 
let directory = 'My Cabinet/';

let documents = [
	{ name:'Document#1', labels:[['F', 'red'], ['P', 'orange']], tier:'Tier 1', out: 'in'},
	{ name:'Document#2', labels:[['C', 'green']], tier:'Tier 1', out: 'other'},
	{ name:'Document#3', labels: [['D', 'purple']], tier: 'Tier 2', out: 'you'}
];

let folders = [
	{ name:'Folder#1', labels: [], tier:['Tier 1', 'Tier 2']}
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

application.add(new DocumentHistoryScreen({ document: "3e6f5707", data: data }));