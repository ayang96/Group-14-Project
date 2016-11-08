
/*========================*/
/*Exports*/
/*========================*/

export var FileHistoryTemplate = Column.template($ => ({
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
import { VerticalScroller, VerticalScrollbar } from "src/scroller";

/*========================*/
/*Skins and Styles*/
/*========================*/

let whiteSkin = new Skin ({fill: 'white'});
let blackSkin = new Skin ({fill: 'black'});
let blue = '#2F80ED';
let blueSkin = new Skin ({fill: blue});
let boraderSkin = new Skin ({fill: 'white', stroke:'black', left: 1, right: 1, top: 1, bottom: 1});

let textStyle = common.bodyStyle;
let buttonStyle = common.buttonStyleWhite;
let WbuttonStyle = common.buttonStyleBlue;


var documentHistoryItemSkin = new Skin({
   stroke: common.grey,
   borders: {bottom: 1},
});

var documentHistoryListSkin = new Skin({
   stroke: common.grey,
   borders: { left: 1, right: 1, top: 1, bottom: 1 }
});

var screenSkin = new Skin({ fill: "white" });

/*========================*/
/*Buttons*/
/*========================*/

let BackButton = new Line({
   height: 39, width: 50, right:  270,
   contents: [
      new Picture({height: 20, align:'middle', url:'./assets/left.png'}),
      new Label({height:39, left: 5, align:'middle', string:'Back', style: buttonStyle, skin: whiteSkin})
   ]
});

/*==================*/
/*Scetions*/
/*========================*/
let TopNavi = Column.template($ => ({
   height: 50, width: 320, skin: whiteSkin,
   contents:[
      new Container({height:10, width: 320, skin:whiteSkin}),
      new Line({height: 39, contents:[BackButton]}),
      new Container({height:1, width: 320, skin:blackSkin})
   ]
}));

let LabelTemp = Column.template($ =>({
   height: 40, width: 320, skin: whiteSkin,
   contents: [
      Line($, {height: 39, contents:[$[0], $[1]]}),
   ]
}));

let LeftTitle = Label.template($ =>({
   height: 39, width: 80, left: 30, skin: whiteSkin, string: $, style: textStyle,
}));

let RightTitle = Label.template($ =>({
   height: 39, width: 220, left: 20, horizontal:'left', skin: whiteSkin, string: $, style: textStyle,
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


/*========================*/
/*Behavior*/
/*========================*/
class screenBehavior extends Behavior {
   onCreate(screen, data) {
      this.data = data;
      this.docName = data.docName;
      this.docData = data.docData;

      let findingDoc = this.docData.documents[this.docName];

      let FileScreen = new Column({
         top: 0, left: 0, right: 0, bottom: 0,
         contents:[]
      });

      let Des = new LabelTemp([new LeftTitle('File History'), 
                                    new RightTitle('')]);

      let DocIcon = new Line({
         height: 80, width: 320, skin: whiteSkin,
         contents:[
            new Picture({height: 50, width: 80, align:'middle', url:'./assets/icon_document_out_other_ring_70x70.png'}),
            new Column({height: 80, width: 240, 
               contents:[
                  //Label($, {height: 29, top: 25, width: 240, string: $[0], style: textStyle, skin:whiteSkin}),
                  new Text({height: 29, top: 25, width: 240, left: 25, string: findingDoc.name, style: textStyle}),
                  new Container({height: 1, width: 200, align: 'middle', skin: blackSkin}),
               ]
            })
         ]
      });

      let His = new DocumentHistoryList({
         left: 10, right: 10, top: 0, bottom: 10, skin: documentHistoryListSkin,
         documentData: this.docData.documents[this.docName], data: this.docData,
      });

      FileScreen.add(TopNavi());
      FileScreen.add(DocIcon);
      FileScreen.add(Des);
      FileScreen.add(His);
      screen.add(FileScreen);
   }
};

