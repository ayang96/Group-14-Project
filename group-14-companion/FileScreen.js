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
import { Data, sampleData } from "model";

/*========================*/
/*Skins and Styles*/
/*========================*/

let whiteSkin = new Skin ({fill: 'white'});
let blackSkin = new Skin ({fill: 'black'});
let blue = '#2F80ED';
let blueSkin = new Skin ({fill: blue});
//let boraderSkin = new Skin ({fill: 'white', stroke:'black', left: 1, right: 1, top: 1, bottom: 1});

var boraderSkin = new Skin({
   stroke: common.grey,
   borders: { left: 1, right: 1, bottom: 1 }
});
// let buttonStyle = new Style({font: '15px', color: blue});
// let WbuttonStyle = new Style({font: '15px', color: 'white'});
//let textStyle = new Style({font: '15px', color: 'black',  horizontal:'left'});
let textStyle = common.bodyStyle;
let buttonStyle = common.buttonStyleWhite;
let WbuttonStyle = common.buttonStyleBlue;


/*========================*/
/*Buttons*/
/*========================*/

// let OpenButton = new common.NormalButton({
//    string: "OPEN",
//    Behavior: class extends common.ButtonBehavior {
//       onTap(content) {

//          // IMPLEMENT OPENING LOCKER

//          application.distribute("alert", {
//             title: "Opening Document",
//             message: "Locker 03 of Cabinet A has been opened. You may now retrieve the document. Your access will be logged.",
//             options: [{ string: "OK", callback: function(){} }],
//          })
//       }
//    }
// });

// let HistoryButton = new common.NormalButton({
//    left: 20,
//    string: "FILE HISTORY",
//    Behavior: class extends common.ButtonBehavior {
//       onTap(content) {
//          application.distribute("dispatch", "documentHistoryScreen", "push");
//       }
//    }
// })

/*========================*/
/*Label Template*/
/*========================*/
let LabelTemp = Column.template($ =>({
   height: 40, width: 320, skin: whiteSkin,
   contents: [
      Line($, {height: 39, contents:[$[0], $[1]]}),
      new Container({height:1, width: 280, skin: blackSkin}),
   ]
}));

let LeftTitle = Label.template($ =>({
   height: 39, width: 80, left: 55, skin: whiteSkin, string: $, style: textStyle,
}));

let RightTitle = Label.template($ =>({
   height: 39, width: 220, left: 20, horizontal:'left', skin: whiteSkin, string: $, style: textStyle,
}));

let Description = Container.template($ => ({
   height: 85, bottom: 10, width: 280, skin: boraderSkin,
   contents:[
      Label($, {string: $, style: new Style({font: '15px', color: 'black',  horizontal:'left', align: 'top'})}),
   ]
}));

/*========================*/
/*Scetions*/
/*========================*/
// let TopNavi = new common.NavBar({
//    contents: [
//       new common.NavBackButton(),
//    ]
// });

let Intro = Line.template($ => ({
   height: 80, width: 320, skin: whiteSkin,
   contents:[
      new Picture({height: 50, width: 80, align:'middle', url:'./assets/icon_document_in_ring_70x70.png'}),
      new Column({height: 80, width: 240, 
         contents:[
            //Label($, {height: 29, top: 25, width: 240, string: $[0], style: textStyle, skin:whiteSkin}),
            new Text({height: 29, top: 25, width: 240, left: 25, string: 'Document #1', style: textStyle}),
            new Container({height: 1, width: 200, align: 'middle', skin: blackSkin}),
         ]
      })
   ]
}));



/*========================*/
/*Behavior*/
/*========================*/
class screenBehavior extends Behavior {

   onCreate(screen, data) {
      this.db = data.data;
   }
   update(screen) {
      this.render(screen);
   }
   render(screen) {
      let docID = this.db.state.document;
      let docData = this.db.getDocumentData(docID);
      this._render(screen, docData);
   }
   _render(screen, data) {
   	  screen.empty();
      this.data = data;

      //OLD
      // this.docName = data.docName;
      // this.Tag = data.Tag;
      // this.LastUsed = data.LastUsed;
      // this.DateCreated = data.DateCreated;
      // this.Description = data.Description;
      // this.AccessTier = data.AccessTier;
      // this.InOut = data.InOut;

      this.docName = data.name;
      if (data.labels.length > 0) {
         this.Tag = data.labels[0].abbreviation + ' ';
         for (let i = 0; i < data.labels.length; i++) {
            this.Tag += data.labels[i].abbreviation + ' ';
         }
      } else {
         this.Tag = '';
      }

      if (data.history != null) {
         this.LastUsed = 'by ' + data.history[0].user.fullName + ' ' + data.history[0].date;
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
      var iconPIC;
      

      let FileScreen = new Column({
         top: 0, left: 0, right: 0, bottom: 0,
         contents:[]
      });

      let FileTitle = new LabelTemp([new LeftTitle('Tag'),  
                               new RightTitle(this.Tag)]);
      let LastUsed = new LabelTemp([new LeftTitle('Last Used'), 
                                    new RightTitle(this.LastUsed)]);
      let DateCreated = new LabelTemp([new LeftTitle('Date Created'), 
                                    new RightTitle(this.DateCreated)]);
      let AccessTier = new LabelTemp([new LeftTitle('Access Tier'), 
                                    new RightTitle(this.AccessTier)]);
      let Des = new LabelTemp([new LeftTitle('Description'), 
                                    new RightTitle('')]);
      let DetailDes = new Description(this.Description);

      if (this.InOut == "OUT"){
         iconPIC = new Picture({height: 50, width: 80, align:'middle', url:'./assets/icon_document_out_other_ring_70x70.png'});
      } else {
         iconPIC = new Picture({height: 50, width: 80, align:'middle', url:'./assets/icon_document_in_ring_70x70_2.png'});
      }


      let DocIcon = new Line({
         height: 80, width: 320, skin: whiteSkin,
         contents:[
            iconPIC,
            new Column({height: 80, width: 240, 
               contents:[
                  //Label($, {height: 29, top: 25, width: 240, string: $[0], style: textStyle, skin:whiteSkin}),
                  new Text({height: 29, top: 25, width: 240, left: 25, string: this.docName, style: textStyle}),
                  new Container({height: 1, width: 200, align: 'middle', skin: blackSkin}),
               ]
            })
         ]
      });

      let FileContent = new Column({
         height: 250, width: 320, skin: whiteSkin,
         contents:[
            FileTitle,
            LastUsed,
            DateCreated,
            AccessTier,
            Des,
            DetailDes,
            new Line({contents: [
               //OPEN BUTTON
               new common.NormalButton({
                  string: "OPEN",
                  Behavior: class extends common.ButtonBehavior {
                  onTap(content) {
                           // IMPLEMENT OPENING LOCKER
                     application.distribute("alert", {
                     title: "Opening Document",
                     message: "Locker 03 of Cabinet A has been opened. You may now retrieve the document. Your access will be logged.",
                     options: [{ string: "OK", callback: function(){} }],
                     })}}
                  }), 
               
               //FILE HISTORY BUTTON
               new common.NormalButton({
                  left: 20,
                  string: "FILE HISTORY",
                  Behavior: class extends common.ButtonBehavior {
                     onTap(content) {
                        switch (data.docName) {
                           case "Document#1":
                              application.distribute("dispatch", "documentHistoryScreen", "push");
                              break;
                           case "Document#2":
                              application.distribute("dispatch", "documentHistoryScreen2", "push");
                              break; 
                           case "Document#3":
                              application.distribute("dispatch", "documentHistoryScreen3", "push");
                              break;                           
                        }
                        //application.distribute("dispatch", "documentHistoryScreen", "push");
                     }
                  }
               })
            ]}),]
      });


      FileScreen.add(new common.NavBar({contents: [new common.NavBackButton(),]}));
      FileScreen.add(DocIcon);
      FileScreen.add(FileContent);
      screen.add(FileScreen);
   }
};

