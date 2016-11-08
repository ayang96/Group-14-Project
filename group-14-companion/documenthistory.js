
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
	left: 0, right: 0, top: 0, bottom: 0,
	contents: [
		new DocumentHistoryList({
			left: 10, right: 10, top: 200, bottom: 10,
			history: $.document.history, data: $.data
		})
	]
}));

var DocumentHistoryList = Container.template(($={}) => Object.assign($, {
	contents: [
		new VerticalScroller({
			left: 0, right: 0, top: 0, bottom: 0, active: true,
			contents: [
				new Column({ left: 0, right: 0, top: 0 }),
				VerticalScrollbar(),
			]
		})
	],
	Behavior: class extends Behavior {
		onCreate(content) {
			this.update();
		}
		update(content) {
			let column = content.first.first;
			column.clear();
			for (let event of $.history) {
				column.add(new DocumentHistoryItem({ event: event, data: $.data));
			}
		}
	}
}));

var DocumentHistoryItem = Container.template($ => ({
	left: 0, right: 0, top: 0, height: 20, skin: documentHistoryItemSkin,
	contents: [
		new Label({
			left: 5, top: 5, style: common.smallLightStyle,
			string: common.formatDate($.event.date),
		}),
		new Container({
			left: 5, bottom: 5, width 5, height: 5,
			skin: new Skin({ fill: common[$.data.users[$.event.userid].avatarColor] }),
		}),
		new Label({
			left: 5, bottom: 5, style: common.bodyBoldStyle,
			string: $.data.users[$.event.user].fullName,
		}),
		new Label({
			right: 5, bottom: 5, style: common.smallLightStyle,
			string: "Document " + $.event.action,
		}),
	]
}));

