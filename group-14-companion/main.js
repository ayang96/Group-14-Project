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
application.add(new screenWithMenubar({screen: [new DocumentsScreen(screenData)]}));