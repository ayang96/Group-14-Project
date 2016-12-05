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

export var NewFileTemplate = Column.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0, active: true,
   skin: whiteSkin,
   contents: [],
   screenData: $.screenData,
   Behavior: screenBehavior,
}));

/*========================*/
/*Imports*/
/*========================*/

import * as common from "common";

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

let textStyle = common.bodyStyle;
let buttonStyle = common.buttonStyleWhite;
let WbuttonStyle = common.buttonStyleBlue;


/*========================*/
/*Buttons*/
/*========================*/

/*========================*/
/*Label Template*/
/*========================*/
let LabelTemp = Column.template($ =>({
   height: 40, width: 320, skin: whiteSkin, active: true,
   contents: [
      Line($, {height: 39, contents:[$[0], $[1]]}),
      new Container({height:1, width: 280, skin: blackSkin}),
   ], 
   Behavior: class extends Behavior {
      onTouchEnded(content) {
         application.distribute("dispatch", "TestDocScreen", "push");
      }
   }
}));

let LeftTitle = Label.template($ =>({
   height: 39, width: 80, left: 55, skin: whiteSkin, string: $, style: textStyle, active: true,
   Behavior: class extends Behavior {
      onTouchEnded(content) {
         application.distribute("dispatch", "TestDocScreen", "push");
      }
   }
}));

let RightTitle = Label.template($ =>({
   height: 39, width: 220, left: 20, horizontal:'left', skin: whiteSkin, string: $, style: textStyle, active: true,
   Behavior: class extends Behavior {
      onTouchEnded(content) {
         application.distribute("dispatch", "TestDocScreen", "push");
      }
   }
}));

let Description = Container.template($ => ({
   height: 85, bottom: 10, width: 280, skin: boraderSkin, active: true,
   contents:[
      Label($, {string: $, style: new Style({font: '15px', color: 'black',  horizontal:'left', align: 'top'})}),
   ],
   Behavior: class extends Behavior {
      onTouchEnded(content) {
         application.distribute("dispatch", "TestDocScreen", "push");
      }
   }
}));

/*========================*/
/*Scetions*/
/*========================*/

let Intro = Line.template($ => ({
   height: 80, width: 320, skin: whiteSkin, active: true,
   contents:[
      new Picture({height: 50, width: 80, align:'middle', url:'./assets/icon_document_in_ring_70x70.png'}),
      new Column({height: 80, width: 240, 
         contents:[
            //Label($, {height: 29, top: 25, width: 240, string: $[0], style: textStyle, skin:whiteSkin}),
            new Text({height: 29, top: 25, width: 240, left: 25, string: 'Document #1', style: textStyle}),
            new Container({height: 1, width: 200, align: 'middle', skin: blackSkin}),
         ]
      })
   ],
   Behavior: class extends Behavior {
      onTouchEnded(content) {
         application.distribute("dispatch", "TestDocScreen", "push");
      }
   }
}));



/*========================*/
/*Behavior*/
/*========================*/
class screenBehavior extends Behavior {
   onCreate(screen, data) {
      this.data = data;
      this.docName = data.docName;
      this.Tag = data.Tag;
      this.LastUsed = data.LastUsed;
      this.DateCreated = data.DateCreated;
      this.Description = data.Description;
      this.AccessTier = data.AccessTier;
      this.InOut = data.InOut;
      var iconPIC;
      

      let FileScreen = new Column({
         top: 0, left: 0, right: 0, bottom: 0, active: true,
         contents:[],
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
         height: 80, width: 320, skin: whiteSkin, active: true,
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
         height: 250, width: 320, skin: whiteSkin, active: true,
         contents:[
            FileTitle,
            LastUsed,
            DateCreated,
            AccessTier,
            Des,
            DetailDes,
            new Line({
               contents: [
               //SAVE BUTTON
               new common.NormalButton({
                  string: "SAVE",
                  Behavior: class extends common.ButtonBehavior {
                     onTap(content) {
                        application.distribute("dispatch", "documentsScreen2", "push");
                     }
                  }
               }), 
            ]}),],
      });


      FileScreen.add(new common.NavBar({contents: [new common.NavBackButton(),]}));
      FileScreen.add(DocIcon);
      FileScreen.add(FileContent);
      screen.add(FileScreen);
   }
   onTouchEnded(screen) {
      application.distribute("dispatch", "TestDocScreen", "push");
   }
};

