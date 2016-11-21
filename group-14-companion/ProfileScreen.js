/*========================*/
/*Exports*/
/*========================*/
export var ProfileScreenTemplate = Column.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0, active: true,
   skin: whiteSkin,
   contents: [],
   screenData: $.screenData,
   Behavior: screenBehavior,
}));

import * as common from "common";
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

var documentHistoryListSkin = new Skin({
   stroke: common.grey,
   borders: { left: 1, right: 1, top: 1, bottom: 1 }
});
var documentHistoryItemSkin = new Skin({
   stroke: common.grey,
   borders: {bottom: 1},
});


/*========================*/
/*Variables*/
/*========================*/
var AT;
var FN;
var LN;
var EMAIL;
var AccessTier;
var FileScreen = new Column({
         top: 0, left: 0, right: 0, bottom: 0, active: true,
         contents:[]
});
var FileContent = new Column({
   height: 250, width: 320, skin: whiteSkin, active: true,
   contents:[]
});
var EditMode;

/*========================*/
/*Buttons*/
/*========================*/
let EditButton = Line.template($ =>({
   height: 39, width: 20, active: true, 
   contents: [
      new Label({height:39, string:'Edit', style: buttonStyle, skin: whiteSkin})
   ],
   Behavior: class extends Behavior{
      onTouchEnded(container, id, x, y, ticks) {
         //trace('Hi it is working\n');
         application.distribute("EnterEditMode", {})

      }
   }
}));


let SaveButton = new Container({
   height: 30, width: 110, top: 10, skin: blueSkin, active: true,
   contents :[
      new Label({string:'SAVE', align: 'middle', style: WbuttonStyle}),
   ],
   Behavior: class extends Behavior{
      onTouchEnded(container, id, x, y, ticks) {
         //trace('Hi it is working\n');
         application.distribute("SaveChange", {})

      }
   }
});

/*========================*/
/*Label Template*/
/*========================*/
let LabelTemp = Column.template($ =>({
   height: 40, width: 320, skin: whiteSkin, active: true,
   contents: [
      Line($, {height: 39, contents:[$[0], $[1]]}),
      new Container({height:1, width: 280, skin: blackSkin}),
   ]
}));


var EditTemp = Column.template($ =>({
   height: 100, width: 320, skin: whiteSkin, right: 0,
   contents: [
      Line($, {contents:[$[0], $[1], $[2]]}),
      new Container({height:1, width: 280, skin: blackSkin}),
   ]
}));

var DropTemp = Column.template($ =>({
   height: 40, width: 320, skin: whiteSkin, active: true,
   contents: [
      Line($, {height: 39, contents:[$[0], $[1]]}),
      new Container({height:1, width: 100, skin: documentHistoryListSkin, left: 120}),
   ],
}));

let EditTempDrop = Column.template($ =>({
   height: 180, width: 320, skin: whiteSkin, active: true,
   contents: [
      Line($, {contents:[$[0], $[1]]}),
      $[2],
      $[3],
      $[4],
      new Container({height:1, width: 100, skin: blackSkin, left: 120}),
   ],
}));


let LeftTitle = Label.template($ =>({
   height: 39, width: 80, left: 55, skin: whiteSkin, string: $, style: textStyle, active: true,
}));

let RightTitle = Label.template($ =>({
   height: 39, width: 220,  left: 20, skin: whiteSkin, string: $, style: textStyle, active: true,
}));

let MotionTitle = Label.template($ =>({
   height: 39, width: 220,  left: 20, skin: whiteSkin, string: $, style: textStyle, active: true,
   Behavior: EditBehavior,
}));

let EditTitleL = Label.template($ =>({
   height: 39, width: 80, skin: whiteSkin, string: $, style: textStyle, active: true,
}));

let EditTitleR = Label.template($ =>({
   height: 39, width: 145, left: 20, horizontal:'left', skin: whiteSkin, string: $, style: textStyle, active: true,
}));


/*========================*/
/*Scetions*/
/*========================*/
let TopNavi = new common.NavBar({
   contents: [
      new common.NavBackButton(),
   ]
});


/*========================*/
/*Behavior*/
/*========================*/
class EditBehavior extends Behavior {
   onTouchEnded(container, id, x, y, ticks){
      AT = 'Tier 2';
      application.distribute("ChangeTier", {});
   }
}


class screenBehavior extends Behavior {
   onCreate(screen, data) {
      this.data = data;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.Email = data.Email;
      this.AccessTier = data.AccessTier;
      AT = this.AccessTier;

      FN = new LabelTemp([new LeftTitle('First Name'),  
                               new RightTitle(this.firstName)]);
      LN = new LabelTemp([new LeftTitle('Last Name'), 
                                    new RightTitle(this.lastName)]);
      EMAIL = new LabelTemp([new LeftTitle('E-mail'), 
                                    new RightTitle(this.Email)]);
      AccessTier = new EditTemp([new EditTitleL('Access Tier'), 
                                    new EditTitleR(this.AccessTier), new EditButton()]);

      var ProfileIcon = new Line({
         height: 80, width: 320, skin: whiteSkin, active: true,
         contents:[
            new Picture({height: 50, width: 80, align:'middle', url:'./assets/icon_user_ring_70x70.png'}),
         ]
      });

      FileContent.add(FN);
      FileContent.add(LN);
      FileContent.add(EMAIL);
      FileContent.add(AccessTier);

      FileScreen.add(TopNavi);
      FileScreen.add(ProfileIcon);
      FileScreen.add(FileContent);
      screen.add(FileScreen);
   }
   EnterEditMode() {
      EditMode = new EditTempDrop([
            new LeftTitle('Access Tier'),
            new RightTitle(AT),
            new DropTemp([new LeftTitle(''),new MotionTitle('Admin')]), 
            new DropTemp([new LeftTitle(''),new MotionTitle('Supervisor')]), 
            new DropTemp([new LeftTitle(''),new MotionTitle('Tier 2')]), 
            ]);
      FileContent.empty(3);
      FileContent.add(EditMode);
      FileContent.add(SaveButton);
   }
   ChangeTier() {
      AccessTier = new EditTemp([new EditTitleL('Access Tier'), new EditTitleR(AT), new EditButton()]);
      FileContent.empty(3);
      FileContent.add(AccessTier);
      FileContent.add(SaveButton);

   }
   SaveChange() {
      FileContent.remove(SaveButton);
   }
};

