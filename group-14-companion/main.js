/*
* 	Main Screen 
*	For viewing documents filesystem
*   Sections Organization:
* 	1) Imports- import each screen
*	2) Application and Application Data- display and testing, example data here
*/

/***************** 1) IMPORTS *******************************************/
import {

/***************** 2) APPLICATION AND APPLICATION DATA ******************/

// DOCUMENTSSCREEN For testing. Example data 
let directory = '/My Cabinet/';

let documents = [
	{ name:'Document#1', labels:[('F', 'red'), ('P', 'orange')], tier:'Tier 1', out: 'in'},

let folders = [
	{ name:'Folder#1', labels: [], tier:['Tier 1', 'Tier 2']}
];

let screenData = {
	directory: directory,
	documents: documents,
	folders: folders
};

// DOCUMENTSSCREEN For Display of testing. Comment out later