/*
* 	Main Screen 
*	For viewing documents filesystem
*   Sections Organization:
* 	1) Imports- import each screen
*	2) Assets- common stuff from Figma and our own icons
*	3) Application and Application Data- display and testing, example data here
*/

/***************** 1) IMPORTS *******************************************/
import {    DocumentsScreen} from "documents";

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


/***************** 3) APPLICATION AND APPLICATION DATA ******************/

// DOCUMENTSSCREEN For testing. Example data 
let directory = '/My Cabinet/';

let documents = [
	{ name:'Document#1', labels:[['F', 'red'], ['P', 'orange']], tier:'Tier 1', out: 'in'},	{ name:'Document#2', labels:[['C', 'green']], tier:'Tier 1', out: 'other'}];

let folders = [
	{ name:'Folder#1', labels: [], tier:['Tier 1', 'Tier 2']}
];

let screenData = {
	directory: directory,
	documents: documents,
	folders: folders
};

// DOCUMENTSSCREEN For Display of testing. Comment out laterapplication.add(new DocumentsScreen(screenData));