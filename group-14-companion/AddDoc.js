/************ 1) EXPORT SCREEN **********************************************/
export var AddDocScreen = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0, active: true,
	skin: fieldLabelSkin,
	contents: [],
	Behavior: screenBehavior,
}));



/************ 2) IMPORTS *****************************************************/
import * as common from "common";


/************ 3) ASSETS ******************************************************/
const docIconSize = 30;

let fieldLabelSkin = new Skin({ fill: "white"});

let docInIcon = Picture.template($ => ({			// icon for a in document
	left: 5, active: true,
	width: docIconSize, height: docIconSize,
	url: 'assets/icon_document.png',
	aspect: 'fit'
}));

let folderIcon = Picture.template($ => ({		// icon for folder
	left: 5, active: true,
	width: docIconSize, height: docIconSize,
	url: 'assets/icon_folder.png',
	aspect: 'fit'
}));


let PlusDoc = Line.template($ =>({
	//bottom: 90, left: 160, height: 40, width: 100,
	width: 150, left: 5, active: true,
	skin: new Skin({ fill: common.systemDarkerGrey}),
	contents: [
		new docInIcon(),
		new Label({
			string: "New Document",
			style: new Style({font: "16px Roboto", color: "white", horizontal: "center"}), 
		}),
	],
	Behavior: addDocBehavior,
}));

let PlusFolder = Line.template($ =>({
	//bottom: 90, right: 160, height: 40, width: 100,
	width: 150, right: 5, active: true,
	skin: new Skin({ fill: common.systemDarkerGrey}),
	contents: [
		new folderIcon(),
		new Label({
			string: "New Folder",
			style: new Style({font: "16px Roboto", color: "white", horizontal: "center"}), 
		}),
	],
}));

/************* 4) BEHAVIORS ****************************************************/
class screenBehavior extends Behavior {
	onCreate(screen) {
		let plusButton = common.PlusButton();

		let DocButton = new PlusDoc();
		let FodButton = new PlusFolder();
		let AddLine = new Line({
			bottom: 90, height: 60, active: true,
			contents: [FodButton, DocButton]
		});
		screen.add(AddLine);
		screen.add(plusButton);
	}
};


class addDocBehavior extends Behavior {
	onTouchEnded(content) {
		application.distribute("dispatch", "newDocScreen", "push");
	}
};