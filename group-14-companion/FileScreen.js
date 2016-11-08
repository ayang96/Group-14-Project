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

/*========================*/
/*Skins and Styles*/
/*========================*/

let whiteSkin = new Skin ({fill: 'white'});
let blackSkin = new Skin ({fill: 'black'});
let blue = '#2F80ED';
let blueSkin = new Skin ({fill: blue});
let boraderSkin = new Skin ({fill: 'white', stroke:'black', left: 1, right: 1, top: 1, bottom: 1});

// let buttonStyle = new Style({font: '15px', color: blue});
// let WbuttonStyle = new Style({font: '15px', color: 'white'});
//let textStyle = new Style({font: '15px', color: 'black',  horizontal:'left'});
let textStyle = common.bodyStyle;
let buttonStyle = common.buttonStyleWhite;
let WbuttonStyle = common.buttonStyleBlue;


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

let OpenButton = new Container({
   height: 30, width: 110, right: 5, top: 10, skin: blueSkin,
   contents :[
      new Label({string:'OPEN', align: 'middle', style: WbuttonStyle}),
   ]
});

let HistoryButton = new Container({
   height: 30, width: 110, left: 5, top: 10, skin: blueSkin,
   contents :[
      new Label({string:'FILE HISTORY', align: 'middle', style: WbuttonStyle}),
   ]
});

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
   height: 90, width: 200, skin: boraderSkin,
   contents:[
      Label($, {string: $, style: new Style({font: '15px', color: 'black',  horizontal:'left,top'})}),
   ]
}));

/*========================*/
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
      this.data = data;
      this.docName = data.docName;
      this.Tag = data.Tag;
      this.LastUsed = data.LastUsed;
      this.DateCreated = data.DateCreated;
      this.Description = data.Description;
      this.AccessTier = data.AccessTier;
      this.InOut = data.InOut;

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



      let DocIcon = new Line({
         height: 80, width: 320, skin: whiteSkin,
         contents:[
            new Picture({height: 50, width: 80, align:'middle', url:'./assets/icon_document_in_ring_70x70.png'}),
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
            new Line({contents: [OpenButton, HistoryButton]}),
         ]
      });


      FileScreen.add(TopNavi());
      FileScreen.add(DocIcon);
      FileScreen.add(FileContent);
      screen.add(FileScreen);
   }
};

