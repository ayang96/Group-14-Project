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

// Note: While working, be sure to clear cache before compiling as follows:
// rm -r ~/Library/Preferences/fsk/1/Kinoma\ Code/com.marvell.kinoma.project.*

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
import { CabinetsScreen } from "cabinets";
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


var data = sampleData;
data.setState({ folder: 'root' });

var screens2 = {
// 	"documentsScreen" : new screenWithMenubar({screen: [new DocumentsScreen(screenData)], data: data}),
// 	"documentsScreen2" : new screenWithMenubar({screen: [new DocumentsScreen(screenData2)], data: data}),
	"documentsScreen" : new screenWithMenubar({screen: [new DocumentsScreen(data)], data: data}),
	"documentInfoScreen" : new FileScreenTemplate({ data: data }),
	"documentHistoryScreen" : new FileHistoryTemplate({ data: data}),

	"userProfileScreen": new UserProfileScreen({ data: data }),
	"usersScreen": new UsersScreen({ data: data }),
	"newUserScreen": new NewUserScreen({ data: data }),

	//"plusDocScreen": addDoc, // Commented out due to merge conflict. Missing addDoc variable
	"plusDocScreen": new screenWithMenubar({screen: [new AddDocScreen()]}), //is this what was meant??
	//"newDocScreen": sampleDocNew,  // Commented out due to merge conflict
	//"TestDocScreen": TestDoc, // Commented out due to merge conflict
	
	"cabinetsScreen" : new screenWithMenubar({screen: [new CabinetsScreen(data)]})
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
	
	"cabinetsScreen" : "root:cabinets" //Hopefully works?? Can't access this to check
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
		application.add(new DocumentHistoryScreen({ document: "3e6f5707", data: data }));

		// DOCUMENTSSCREEN For Display of testing. Comment out if necessary

		// Comment out any below and your screen here to application for testing display

		// DOCUMENTSHISTORYSCREEN
		//application.add(new DocumentHistoryScreen({ document: "3e6f5707", data: data }));

		// DOCUMENTSSCREEN
		//application.add(new screenWithMenubar({screen: [new DocumentsScreen(screenData)]}));

		// USERSSCREEN
		//application.add(new screenWithMenubar({screen: [new UsersScreen(usersData)]}));
		
		
		// CABINETSSCREEN
		//application.add(new screenWithMenubar({screen: [new CabinetsScreen(data)]}));
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
