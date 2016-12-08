/*
*  Documents Screen 
*  For viewing documents filesystem
*  Simulate on iap140: 640x960 / 2 (iPhone 4)
*   Sections Organization:
*  1) Export Screen- this screen as a container template
*  2) Imports
*  3) Assets- format standard sizes, colors, images, text fonts
*  4) Behaviors
*  5) Templates
*/

/*========================*/
/*Exports*/
/*========================*/

export var FileScreenTemplate = Column.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	skin: whiteSkin,
	contents: [],
	screenData: $.screenData,
	Behavior: screenBehavior,
}));

/*========================*/
/*Imports*/
/*========================*/

import * as common from "common";
import { FormRow, FormLabel, FormValue, FormRightButton, FormField, FormSelect, TierSelect, LabelSelect, FormTextValue } from 'forms';

/*========================*/
/*Skins and Styles*/
/*========================*/

let whiteSkin = new Skin ({fill: 'white'});
let blackSkin = new Skin ({fill: 'black'});
let blue = '#2F80ED';
let blueSkin = new Skin ({fill: blue});

let textStyle = common.bodyStyle;
let buttonStyle = common.buttonStyleWhite;
let WbuttonStyle = common.buttonStyleBlue;



/*========================*/
/*Behavior*/
/*========================*/
class screenBehavior extends Behavior {

	onCreate(screen, data) {
		this.db = data.data;
	}
	onDisplaying(screen) {
		this.render(screen);
	}
	update(screen) {
		this.render(screen);
	}
	render(screen) {
		let docID = this.db.state.document;
		let docData = this.db.getDocumentData(docID);
		this._render(screen, docData, this.db);
	}
	_render(screen, data, db) {
		screen.empty();

		//TAKING IN DATA
		this.data = data;
		this.docName = data.name;
		
		if (data.history != null) {
			this.LastUsed = data.history[data.history.length - 1].user.fullName;
		} else {
			this.LastUsed = '';
		}

		if (data.tier != null) {
			this.AccessTier = data.tier.name;
		} else {
			this.AccessTier = '';
		}

		this.Description = data.description;
		this.DateCreated = common.formatDate(data.dateCreated);
		this.InOut = data.out;
		this.Locker = data.locker;
		//trace('LOCKER + ' + JSON.stringify(this.Locker) + '\n');


		//trace(JSON.stringify(this.InOut) + '\n');
		var iconPIC;
		var open_return;



		//CONSTRUCTING ELEMENTS INSIDE THE STUFF
		let FileScreen = new Column({
			top: 0, left: 0, right: 0, bottom: 0,
			contents:[]
		});

		let tags = new Line({ left: 0, right: 0 });
		for (let label of data.labels) {
			tags.add(new common.Tag({
				right: 2,
				color: label.color,
				string: label.abbreviation
			}));
		}

		let form = new Column({
			left: 0, right: 0, top: 0,
			contents: [
				new FormRow({ contents: [
					new FormLabel({ string: 'Tags' }),
					tags,
				]}),
				new FormRow({ contents: [
					new FormLabel({ string: 'Last Used' }),
					new FormValue({ string: this.LastUsed }),
				]}),
				new FormRow({ contents: [
					new FormLabel({ string: 'Date Created' }),
					new FormValue({ string: this.DateCreated }),
				]}),
				new FormRow({ contents: [
					new FormLabel({ string: 'Access Tier' }),
					new FormValue({ string: this.AccessTier }),
				]}),
				new ( FormRow.template($ => ({ skin: null })) )({ contents: [
					new FormLabel({ string: 'Description' })
				]}),
				new FormTextValue({
					string: this.Description
				}),
			]
		});

		if (this.InOut == "other"){
			iconPIC = new Picture({height: 50, width: 80, align:'middle', url:'./assets/icon_document_out_other_ring_70x70.png'});
			this.docName += '  [OUT]';
			open_return = new common.NormalButton({
						string: "RETURN",
						Behavior: class extends common.ButtonBehavior {
						onTap(content) {
							// IMPLEMENT OPENING LOCKER
							application.distribute("alert", {
							title: "Returning Item",
							message: "IMPORTANT: Please notice that this item is NOT originally taken out by YOU! \n \nLocker 05 of Cabinet A has been opened. You may now return the item. Your access will be logged.",
							options: [{ string: "OK", callback: function(){} }],
							});

							//trace(JSON.stringify(db) + '\n');
							//trace(JSON.stringify(db.state.document) + '\n');
							let boo = db.returnDocument(db.state.document);
							//trace(JSON.stringify(boo) + '\n');
							application.distribute("update");
						}},
			});
		} else if (this.InOut == "you"){
			//trace(JSON.stringify("TRUE") + '\n');
			this.docName += ' [OUT]';
			iconPIC = new Picture({height: 50, width: 50, align:'middle', url:'./assets/icon_document_out_you_ring_70x70.png'});
			open_return = new common.NormalButton({
						string: "RETURN",
						Behavior: class extends common.ButtonBehavior {
						onTap(content) {
							// IMPLEMENT OPENING LOCKER
							application.distribute("alert", {
							title: "Returning Item",
							message: "Locker 01 of Cabinet A has been opened. You may now return the item. Your access will be logged.",
							options: [{ string: "OK", callback: function(){} }],
							});

							//trace(JSON.stringify(db.state.document) + '\n');
							let boo = db.returnDocument(db.state.document);
							//trace(JSON.stringify(boo) + '\n');
							application.distribute("update");
						}},
			});
		} else {
			iconPIC = new Picture({height: 50, width: 50, align:'middle', url:'./assets/icon_document_in_ring_70x70_2.png'});
			open_return = new common.NormalButton({
						string: "RETRIEVE",
						Behavior: class extends common.ButtonBehavior {
						onTap(content) {
							// IMPLEMENT OPENING LOCKER
							application.distribute("alert", {
							title: "Retrieving Item",
							message: "Locker 03 of Cabinet A has been opened. You may now retrieve the item. Your access will be logged.",
							options: [{ string: "OK", callback: function(){} }],
							});

							let boo = db.retrieveDocument(db.state.document);
							//trace(JSON.stringify(boo) + '\n');
							application.distribute("update");                    
						}},
			});
		}


		let DocTop = new Line({
			left: 0, right: 0, top: 0,
			contents:[
				iconPIC,
				new FormRow({
					left: 20, right: 0,
					contents: [
						new FormValue({ string: this.docName })
					]
				})
			]
		});

		let FileContent = new Column({
			left: 0, right: 0, top: 0,
			contents:[
				DocTop,
				form,
			]
		});

		let buttons = new Line({
			bottom: 0,
			contents: [
				open_return,
				new common.NormalButton({
					left: 20,
					string: "HISTORY",
					Behavior: class extends common.ButtonBehavior {
						onTap(content) {
							application.distribute("dispatch", "documentHistoryScreen");
						}
					}
				}),
			]
		})

		let padding = new Container({
			left: common.screenPadding, right: common.screenPadding,
			top: common.screenPadding, bottom: common.screenPadding,
		});

		screen.add(FileScreen);
		FileScreen.add(new common.NavBar({contents: [new common.NavBackButton(),]}));
		FileScreen.add(padding);
		padding.add(FileContent);
		padding.add(buttons);
	}
};

