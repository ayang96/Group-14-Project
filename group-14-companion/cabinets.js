/*
* 	Cabinets Screen 
*	For viewing lockers and cabinets
*	Simulate on iap140: 640x960 / 2 (iPhone 4)
*   Sections Organization:
* 	1) Export Screen- this screen as a container template
*	2) Imports
*	3) Assets- format standard sizes, colors, images, text fonts
*	4) Behaviors
*	5) Templates
*/

/************ 1) EXPORT SCREEN **********************************************/
export var CabinetsScreen = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: lineSkin,
	contents: [],
	active: true,
	Behavior: screenBehavior
}));

/************ 2) IMPORTS *****************************************************/
import * as common from "common";

import {
    VerticalScroller,
    VerticalScrollbar,
    TopScrollerShadow,
    BottomScrollerShadow
} from 'src/scroller';

/************ 3) ASSETS ******************************************************/
const screenWidth = 320;		// width of screen / 2
const screenHeight = 480;		// height of screen / 2
const titleHeight = 24;		// height of a title text

let figmaScreen = Picture.template($ => ({		// prototype image of locker manager screen
	left: $.left, right: $.right, top: $.top, bottom: $.bottom,
	width: screenWidth, height: screenHeight,
	url: 'assets/figma_cabinetsScreen.png',
	aspect: 'fit'
}));

let lineSkin = new Skin({							//stroked skin of a document listing
		fill: 'white', 			
		stroke: 'silver',
		borders: {left: 0, right: 0, top: 1, bottom: 1}
});	

let addCabinetSkin = new Skin({
	width: 90, height: 90, aspect: 'fit',
	texture: new Texture('assets/icon_add_cabinet_45x45.png'),
	states: 90, variants: 90,
});

/************* 4) BEHAVIORS ****************************************************/
// Main screen behavior
class screenBehavior extends Behavior{
	onCreate(screen, data) {
		screen.active = true;
	}
	render(screen) {
		application.remove(screen);
		application.add(screen);
	}
	onDisplaying(screen) {
		// Add scroller 
		let contentToScrollVertically = new Column({
			top: 0, left: 0, right: 0,
			skin: common.skySkin, 
			contents: []});
		
		// Add screen title
		let screenTitle = new TitleLine({string: "Locker Manager"});
		
		// Add figma image simulation of lockers screen
		contentToScrollVertically.add(new figmaScreen({left: 0, right: 0, top: 0}));
		
		let mainScroller = new MainScroller({contentToScrollVertically});
		
		// Add plus button
		let plusButton = common.PlusButton({
			Behavior: class extends common.ButtonBehavior {
				onTap(content) {
					application.add(new common.ScreenCover({
						contents: [
							new Column({
								left: 0, right: 0, bottom: 0,
								contents: [
									new Line({
										left: 0, right: 0, bottom: 0,
										contents: [
											new Label({
												left: 0, right: 10, style: common.smallWhiteStyleRight,
												string: 'New Locker'
											}),
											new Container({
												right: 20, width: 45, height: 45, active: true,
												skin: addCabinetSkin, variant: 0, state: 0,
												Behavior: class extends common.ButtonBehavior {
													onTap(content) {
														content.bubble('exit');
														application.distribute("notify", 
														"Sorry, you do not have the access right to add a new cabinet. Please try again with Admin privileges.");
														//application.distribute('dispatch', 'newLockerScreen', 'new');
													}
												}
											}),
										]
									}),
									new common.CancelButton({
										Behavior: class extends common.ButtonBehavior {
											onTap(content) {
												content.bubble('exit');
											}
										}
									}),
								]
							})
						],
						Behavior: class extends Behavior {
							exit(content) {
								application.remove(content);
								return true;
							}
						}
					}));
				}
			}
		});
		
		// Add to screen
		let screenColumn = new Column({
			top: 0, left: 0, right: 0, bottom: 0,
			contents: []
		});
		screenColumn.add(new Container({left: 0, right:0, top: 0, height: titleHeight}));
		screenColumn.add(mainScroller);
		screen.add(screenColumn);
		screen.add(screenTitle);
		screen.add(plusButton);	
	
	}
};

/**************** 5) TEMPLATES *******************************************/
// Line on top for a title of screen. 
// When instantiating, call TitleLine({string: textHere})
let TitleLine = Line.template($ => ({
	height: titleHeight, width: screenWidth,
	top: 0, left: 0, right: 0,
	skin: new Skin({fill:"#e6e6e6"}),
	contents: [new Label({height: titleHeight, width: screenWidth, 
					style: common.titleBoldStyleCenter, string: $.string})]
}));


// Scroller template
let MainScroller = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, 
    contents: [
      VerticalScroller($, {
      	active: true,
      	top: 0, left: 0, right: 0,
      	contents: [ $.contentToScrollVertically,
      		VerticalScrollbar(), TopScrollerShadow(), BottomScrollerShadow(),
      	]
      }),  
    ]
}));
