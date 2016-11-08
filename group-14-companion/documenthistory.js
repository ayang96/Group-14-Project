
/*
NOTE: The wierd "Container.template($={}) => Object.assign($, {"
		is so that you can assign left, right, width, skin, etc just
		as you would with a normal container.
*/

import * as common from "common";
import { VerticalScroller, VerticalScrollbar } from "src/scroller";

var documentHistoryItemSkin = new Skin({
	stroke: common.grey,
	borders: {bottom: 1},
});

var documentHistoryListSkin = new Skin({
	stroke: common.grey,
	borders: { left: 1, right: 1, top: 1, bottom: 1 }
});

var screenSkin = new Skin({ fill: "white" });

/* Data object structure:

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

*/
export var DocumentHistoryScreen = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, skin: screenSkin,
	contents: [
		new DocumentHistoryList({
			left: 10, right: 10, top: 200, bottom: 10, skin: documentHistoryListSkin,
			documentData: $.data.documents[$.document], data: $.data,
		})
	]
}));

var DocumentHistoryList = Container.template(($={}) => Object.assign($, {
	contents: [
		VerticalScroller($, {
			left: 0, right: 0, top: 0, bottom: 0, active: true,
			contents: [
				new Column({ left: 0, right: 0, top: 0 }),
				VerticalScrollbar(),
			]
		})
	],
	Behavior: class extends Behavior {
		onDisplayed(content) {
			this.update(content);
		}
		update(content) {
			let column = content.first.first;
			column.empty();
			for (let event of $.documentData.history) {
				let eventData = $.data.events[event];
				let userData = $.data.users[eventData.user];
				column.add(new DocumentHistoryItem({ eventData: eventData, userData: userData, data: $.data }));
			}
		}
	}
}));

var DocumentHistoryItem = Container.template($ => ({
	left: 0, right: 0, top: 0, height: 60, skin: documentHistoryItemSkin,
	contents: [
		new Label({
			left: 10, top: 10, style: common.smallLightStyle,
			string: common.formatDate($.eventData.date),
		}),
		new Container({
			left: 15, bottom: 15, width: 10, height: 10,
			skin: new Skin({ fill: common[$.userData.avatarColor] }),
		}),
		new Label({
			left: 30, bottom: 10, style: common.bodyBoldStyle,
			string: $.userData.fullName,
		}),
		new Label({
			right: 10, bottom: 10, style: common.smallLightStyle,
			string: "Document " + $.eventData.action,
		}),
	]
}));

