
/*
NOTE: The wierd "Container.template($={}) => Object.assign($, {"
		is so that you can assign left, right, width, skin, etc just
		as you would with a normal container.
*/

import * as common from "common";
import { VerticalScroller, VerticalScrollbar } from "src/scroller";

var fileHistoryItemSkin = new Skin({
	stroke: common.grey,
	borders: {bottom: 1},
});

var FileHistoryList = Container.template(($={}) => Object.assign($, {
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
				column.add(new FileHistoryItem({ event: event, data: $.data));
			}
		}
	}
}));

var FileHistoryItem = Container.template($ => ({
	left: 0, right: 0, top: 0, height: 20, skin: fileHistoryItemSkin,
	contents: [
		new Label({
			left: 5, top: 5, style: common.smallLightStyle,
			string: common.formatDate($.event.date),
		}),
		new Label({
			left: 5, bottom: 5, style: common.bodyBoldStyle,
			string: $.data.users[$.event.userid].fullName,
		}),
		new Label({
			right: 5, bottom: 5, style: common.smallLightStyle,
			string: "Document " + $.event.action,
		})
	]
}));

