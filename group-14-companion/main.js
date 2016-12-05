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

/***************** 5) APPLICATION AND APPLICATION DATA ******************/


var data = sampleData;
data.setState({ folder: 'root' });

var screens = {
	"documentsScreen" : new DocumentsScreen(data),
	"documentInfoScreen" : new FileScreenTemplate({ data: data }),
	"userProfileScreen": new UserProfileScreen({ data: data }),
	"usersScreen": new UsersScreen({ data: data }),
	"newUserScreen": new NewUserScreen({ data: data }),
	"cabinetsScreen" : new CabinetsScreen(data),
}

var screenParents = {
	"documentsScreen" : "root:documents",
	"documentHistoryScreen" : "documentInfoScreen",
	"documentInfoScreen" : "documentsScreen",
	"userProfileScreen": "usersScreen",
	"usersScreen": "root:users",
	"newUserScreen": "usersScreen",
	"newDocumentScreen": "documentsScreen",
	"cabinetsScreen" : "root:cabinets",
}

class ApplicationBehavior extends Behavior {
	onLaunch(application) {
		var dispatcher = new common.Dispatcher({
			menu: new Menu(),
			screens: screens,
			screenParents: screenParents
		});
		application.add(dispatcher);
		application.distribute("dispatch", "documentsScreen");
	}
}


/* TOGGLE THIS true/false TO TEST YOUR OWN CODE */
let USE_TEST_CODE = false

if (USE_TEST_CODE) {

/***************** BEGIN TESTING AREA *************************************/


// put all test code here
// any code you write will execute if USE_TEST_CODE == true  */
// example
// application.add(new Container({ name: 'My Test Screen' }));





/***************** END TESTING AREA *************************************/

} else {
	application.behavior = new ApplicationBehavior();
}
