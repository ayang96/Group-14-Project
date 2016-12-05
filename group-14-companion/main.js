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
*	6) Launch Code
*/

/***************** 1) IMPORTS *******************************************/

import { DocumentsScreen } from "documents";
import { UsersScreen } from "users";
import { FileScreenTemplate } from "FileScreen";
import { UserProfileScreen } from "user_profile";
import { FileHistoryTemplate } from "FileHistory";
import { Menu } from "Menu";
import { Data, sampleData } from "model";
import { AddDocScreen } from "AddDoc";
import { NewFileTemplate } from "new_document";
import { NewUserScreen } from "new_user";
import * as common from "common";
import * as form from "forms";

/***************** 2) ASSETS ********************************************/
const applicationHeight = 480;
const menuBarHeight = 35;

/***************** 3) BEHAVIORS ********************************************/

/***************** 4) TEMPLATES ********************************************/

// Template for adding a menu bar placeholder above and on top of screen.
// Instantiate as new screenWithMenubar({screen: [ScreenObject]})
let screenWithMenubar = common.ScreenWithMenuBar;

/***************** 5) APPLICATION AND APPLICATION DATA ******************/


// DOCUMENTSSCREEN For testing. Example data 
let directory = 'My Cabinet/AFolder/BFolder/CFolder/DFolder/CurrentFolder';

let documents = [
	{ name:'Case #1', labels:[['P', 'orange']], tier:'Tier 1', out: 'other'},
	{ name:'Case #2', labels:[['C', 'green']], tier:'Tier 1', out: 'other'},
	{ name:'Case #3', labels: [['P', 'orange']], tier: 'Tier 2', out: 'in'},
	{ name:'Case #5', labels: [['F', 'red']], tier: 'Tier 1', out: 'in'},
];

let documents2 = [
	{ name:'Case #1', labels:[['P', 'orange']], tier:'Tier 1', out: 'other'},
	{ name:'Case #2', labels:[['C', 'green']], tier:'Tier 1', out: 'other'},
	{ name:'Case #3', labels: [['P', 'orange']], tier: 'Tier 2', out: 'in'},
	{ name:'Case #5', labels: [['F', 'red']], tier: 'Tier 1', out: 'in'},
	{ name:'TestFile', labels: [['T', 'orange']], tier: 'Tier 1', out: 'in'},
];

let folders = [
	{ name:'Asylum Apps', labels: [], tier:['Tier 1', 'Tier 2']},
];

let screenData = {
	directory: directory,
	documents: documents,
	folders: folders
};

let screenData2 = {
	directory: directory,
	documents: documents2,
	folders: folders
};

let usersData = {
	users: [
		{name:'Allison Rory', tier:'Tier 1', color:'red'},
		{name:'Brian Chen', tier:'Tier 2', color:'blue'},
		{name:'Dominique Yano', tier:'Tier 1', color:'blue'},
		{name:'Ellen van Hurst', tier:'Tier 1', color:'yellow'},
		{name:'Gabrielle Glasner', tier:'Tier 1', color:'green'},
		{name:'Hector Smith', tier:'Tier 2', color:'pending'},
	]
};


let FileData = {
   docName: 'Document#1',
   Tag: 'F, P',
   LastUsed: 'Nov 11th 2016 by Brian',
   DateCreated: 'Aug 21st 2016',
   Description: 'Important Financial Statement for Company X.',
   AccessTier: 'Tier 1',
   InOut: 'OUT',
};

let FileData2 = {
   docName: 'Document#2',
   Tag: 'C',
   LastUsed: 'Nov 11th 2016 by Brian',
   DateCreated: 'Aug 16th 2016',
   Description: 'Important Financial Statement for Company X.',
   AccessTier: 'Tier 1',
   InOut: 'OUT',
};

let FileData3 = {
   docName: 'Document#3',
   Tag: 'D',
   LastUsed: 'Nov 20th 2016 by Jessica',
   DateCreated: 'Aug 21st 2016',
   Description: 'Bank Confirmation for Company X',
   AccessTier: 'Tier 2',
   InOut: 'IN',
};


let EmptyFile = {
   docName: '',
   Tag: '',
   LastUsed: '',
   DateCreated: '',
   Description: '',
   AccessTier: '',
   InOut: '',
};

let TestFile = {
   docName: 'TestFile',
   Tag: 'T',
   LastUsed: '',
   DateCreated: 'Nov 21st 2016 by TestUser',
   Description: 'Test File for Usability Test',
   AccessTier: 'Tier 1',
   InOut: 'IN',
};



let PersonData = {
   firstName: 'Brain',
   lastName: 'Chen',
   Email: 'brain.c@gmail.com',
   AccessTier: 'Tier 2',
};


let PersonData2 = {
   firstName: 'Gabrielle',
   lastName: 'Glasner',
   Email: 'gabrielle.g@gmail.com',
   AccessTier: 'Tier 1',
};


var docName = "3e6f5707";
var docName2 = "4e6f5737";
var docName3 = "5e6f5749";

var docData = {
	documents: {
		"3e6f5707": {
			name: 'Document#1',
			labels: [
				"0e063425",
			],
			tier: "3b2aa2c6",
			out: 'out',
			locker: "936420de",
			history: [
				"ae97a999",
				"ae97a998",
				"ae97a997",
			]
		},
		"4e6f5737": {
			name: 'Document#2',
			labels: [
				"0e063425",
			],
			tier: "3b2aa2c6",
			out: 'out',
			locker: "936420df",
			history: [
				"ae97a999",
				"ae97a996",
				"ae97a995",
			]
		},
		"5e6f5749": {
			name: 'Document#3',
			labels: [
				"0e063425",
			],
			tier: "c80ogh19",
			out: 'in',
			locker: "936420dg",
			history: [
				//"ae97a999",
			]
		},		
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
		},
		"39uizopj": {
			fullName: "Brian Chen",
			givenName: "Brian",
			familyName: "Chen",
			avatarColor: "blue",
			avatarInitials: "BB",
			tier: "c80ogh19",
		},
		"28zjieqo": {
			fullName: "Dominique Yano",
			givenName: "Dominique",
			familyName: "Yano",
			avatarColor: "blue",
			avatarInitials: "BB",
			tier: "c80ogh19",
		}
	},
	tiers: {
		"3b2aa2c6": {
			name: "Tier 1",
		},
		"c80ogh19": {
			name: "Tier 2",
		}
	},
	events: {
		"ae97a999": {
			type: "document",
			document: "3e6f5707",
			action: "out",
			date: new Date("Tue Nov 11 2016 09:30:30 GMT-0800 (PST)"),
			user: "39uizopj",
		},
		"ae97a998": {
			type: "document",
			document: "3e6f5707",
			action: "in",
			date: new Date("Tue Nov 08 2016 08:11:30 GMT-0800 (PST)"),
			user: "46efacaf",
		},
		"ae97a997": {
			type: "document",
			document: "3e6f5707",
			action: "out",
			date: new Date("Tue Nov 08 2016 02:11:30 GMT-0800 (PST)"),
			user: "46efacaf",
		},
		"ae97a996": {
			type: "document",
			document: "4e6f5737",
			action: "in",
			date: new Date("Tue Nov 01 2016 10:11:30 GMT-0800 (PST)"),
			user: "28zjieqo",
		},
		"ae97a995": {
			type: "document",
			document: "4e6f5737",
			action: "out",
			date: new Date("Tue Nov 01 2016 01:11:30 GMT-0800 (PST)"),
			user: "28zjieqo",
		},			
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


let HistoryData = {
	docName: docName,
	docData: docData,
};

let HistoryData2 = {
	docName: docName2,
	docData: docData,
};

let HistoryData3 = {
	docName: docName3,
	docData: docData,
};








/*Testing Part*/
let sampleDocHis = new FileHistoryTemplate(HistoryData);
let sampleDoc = new FileScreenTemplate(FileData);

let sampleDocHis2 = new FileHistoryTemplate(HistoryData2);
let sampleDoc2 = new FileScreenTemplate(FileData2);

let sampleDocHis3 = new FileHistoryTemplate(HistoryData3);
let sampleDoc3 = new FileScreenTemplate(FileData3);

let addDoc = new AddDocScreen();
let sampleDocNew = new NewFileTemplate(EmptyFile);

let TestDoc = new NewFileTemplate(TestFile);

var data = sampleData;
data.setState({ folder: 'root' });
var docs = data.documents;

var screens2 = {
// <<<<<<< HEAD
// 	"documentsScreen" : new screenWithMenubar({screen: [new DocumentsScreen(screenData)], data: data}),
// 	"documentsScreen2" : new screenWithMenubar({screen: [new DocumentsScreen(screenData2)], data: data}),
// =======
	//"documentsScreen" : new screenWithMenubar({screen: [new DocumentsScreen(screenData)]}),
	//"documentsScreen2" : new screenWithMenubar({screen: [new DocumentsScreen(screenData2)]}),
	"documentsScreen" : new screenWithMenubar({screen: [new DocumentsScreen(data)], data: data}),

	"documentHistoryScreen" : sampleDocHis,
	"documentHistoryScreen2" : sampleDocHis2,
	"documentHistoryScreen3" : sampleDocHis3,
	"documentInfoScreen" : sampleDoc,
	"documentInfoScreen2" : sampleDoc2,
	"documentInfoScreen3" : sampleDoc3,
	"userProfileScreen": new UserProfileScreen({ data: data }),

	//"usersScreen": new UsersScreen({ data: data }),
	"usersScreen": new screenWithMenubar({screen: [new UsersScreen(usersData)]}), // temp pre-migration
	"newUserScreen": new NewUserScreen({ data: data }),

	"plusDocScreen": addDoc,
	"newDocScreen": sampleDocNew,
	"TestDocScreen": TestDoc,
}

var screenParents = {
	"documentsScreen" : "root:documents",
	"documentHistoryScreen" : "documentInfoScreen",
	"documentHistoryScreen2" : "documentInfoScreen",
	"documentHistoryScreen3" : "documentInfoScreen",
	"documentInfoScreen" : "documentsScreen",
	"documentInfoScreen2" : "documentsScreen",

	"documentInfoScreen3" : "documentsScreen",
	"userProfileScreen": "usersScreen",
	"userProfileScreen2": "usersScreen",
	"usersScreen": "root:users",
	"newUserScreen": "usersScreen",

	"plusDocScreen": "documentsScreen",
	"newDocScreen": "documentsScreen",
	"TestDocScreen": "documentsScreen2",
}

/***************** 6) LAUNCH CODE *************************************/

// T minus 3... 2... 1

var USE_TEST_CODE = false

/* All your test code should go in here */
class TestApplicationBehavior extends Behavior {
	onLaunch(application) {


		let formData = {
			label: '',
		}
		screens2['testFormScreen'] = new Column({
			skin: common.screenSkin,
			left: 0, right: 0, top: 0, bottom: 0, contents: [
				new form.FormRow({ contents: [
					new form.FormLabel({ string: 'Label' }),
					new form.LabelSelect({ data: data, formData: formData, name: 'label' }),
				]}),
				new common.Tag({ color: 'red', string: 'S' }),
			]
		});
		var dispatcher2 = new common.Dispatcher({ menu: new Menu(), screens: screens2, screenParents: screenParents });
		application.add(dispatcher2);
		application.distribute("dispatch", "testFormScreen");
		//application.add(new DocumentHistoryScreen({ document: "3e6f5707", data: data }));

		// DOCUMENTSSCREEN For Display of testing. Comment out if necessary

		// Comment out any below and your screen here to application for testing display

		// DOCUMENTSHISTORYSCREEN
		//application.add(new DocumentHistoryScreen({ document: "3e6f5707", data: data }));

		// DOCUMENTSSCREEN
		//application.add(new screenWithMenubar({screen: [new DocumentsScreen(screenData)]}));

		// USERSSCREEN
		//application.add(new screenWithMenubar({screen: [new UsersScreen(usersData)]}));
	}
}

//application.add(new FileScreenTemplate(data))

/* Actual launch code */
class ApplicationBehavior extends Behavior {
	onLaunch(application) {
		//var dispatcher = new common.Dispatcher({ menu: new Menu(), screens: screens2, screenParents: screenParents });
		var dispatcher2 = new common.Dispatcher({ menu: new Menu(), screens: screens2, screenParents: screenParents });
		application.add(dispatcher2);
		application.distribute("dispatch", "documentsScreen");
		// var dispatcher = new common.Dispatcher({ menu: new Menu(), screens: screens, screenParents: screenParents });
		// application.add(dispatcher);
		// application.distribute("dispatch", "documentsScreen");
	}
}

if (USE_TEST_CODE) {
	application.behavior = new TestApplicationBehavior();
} else {
	application.behavior = new ApplicationBehavior();
}
