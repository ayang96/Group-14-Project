/*========================*/
/*Exports*/
/*========================*/
export var ProfileScreenTemplate = Column.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0,
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

let EditButton = new Line({
   height: 39, width: 20,
   contents: [
      new Label({height:39, string:'Edit', style: buttonStyle, skin: whiteSkin})
   ]
});

let SaveButton = new Container({
   height: 30, width: 110, right: 5, top: 10, skin: blueSkin,
   contents :[
      new Label({string:'SAVE', align: 'middle', style: WbuttonStyle}),
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

let EditTemp = Column.template($ =>({
   height: 40, width: 320, skin: whiteSkin, right: 0, 
   contents: [
      Line($, {height: 39, contents:[$[0], $[1], EditButton]}),
      new Container({height:1, width: 280, skin: blackSkin}),
   ]
}));

let LeftTitle = Label.template($ =>({
   height: 39, width: 80, left: 55, skin: whiteSkin, string: $, style: textStyle,
}));

let RightTitle = Label.template($ =>({
   height: 39, width: 220,  left: 20, horizontal:'left', skin: whiteSkin, string: $, style: textStyle,
}));

let EditTitleL = Label.template($ =>({
   height: 39, width: 80, skin: whiteSkin, string: $, style: textStyle,
}));

let EditTitleR = Label.template($ =>({
   height: 39, width: 145, left: 20, horizontal:'left', skin: whiteSkin, string: $, style: textStyle,
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


/*========================*/
/*Behavior*/
/*========================*/
class screenBehavior extends Behavior {
   onCreate(screen, data) {
      this.data = data;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.Email = data.Email;
      this.AccessTier = data.AccessTier;

      let FileScreen = new Column({
         top: 0, left: 0, right: 0, bottom: 0,
         contents:[]
      });

      let FN = new LabelTemp([new LeftTitle('First Name'),  
                               new RightTitle(this.firstName)]);
      let LN = new LabelTemp([new LeftTitle('Last Name'), 
                                    new RightTitle(this.lastName)]);
      let EMAIL = new LabelTemp([new LeftTitle('E-mail'), 
                                    new RightTitle(this.Email)]);
      let AccessTier = new EditTemp([new EditTitleL('Access Tier'), 
                                    new EditTitleR(this.AccessTier)]);


      let ProfileIcon = new Line({
         height: 80, width: 320, skin: whiteSkin,
         contents:[
            new Picture({height: 50, width: 80, align:'middle', url:'./assets/icon_user_ring_70x70.png'}),
         ]
      });

      let FileContent = new Column({
         height: 250, width: 320, skin: whiteSkin,
         contents:[
            FN,
            LN,
            EMAIL,
            AccessTier,
         ]
      });


      FileScreen.add(TopNavi());
      FileScreen.add(ProfileIcon);
      FileScreen.add(FileContent);
      screen.add(FileScreen);
   }
};

