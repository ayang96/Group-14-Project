import * as common from "common";

var menubox= new Skin({fill: "#666666"});
var menufont = new Style({ font: "Roboto bold 12px", color: "white" })
var selectionbox = Container.template($ =>({
 top: $.offset,height:35, left: 0, right: 0, active: true,
    skin: menubox,
    contents:[
    	 new Label({ top: 0, left: 20,height:35 ,
            style: menufont, 
            string: $.string }),
    ],
    Behavior: class extends common.ButtonBehavior {
      onTap(content) {
        application.distribute("dispatch", $.screenName);
      }
    }
}));
var subtitlebox =  Container.template($=>({
       		top:0,height:$.height,left:0,right:0,skin:new Skin({fill: "#595959"}),
       		contents:[
       			new Label({ top: 0, left: 20,height:22 ,
            		style: new Style({ font: "Roboto bold 10px", color: "#cdcbcd" }), 
            		string: $.string })
            ]
}));
var Screen1Template = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 90, active: true,
    skin: new Skin({fill: "#595959"}),
    contents: [
        new Container({ top: 0, height: 70, left: 0, right: 0,  skin: menubox,
			contents:[
			new Picture({height:60,left:-40, url: "Assets/UserProfileIcon.png"}),			
			new Label({ top: 15, right: 64,height:22 ,
            		style: new Style({ font: "Roboto bold 13px", color: "white" }), 
            		string: "Allison Rory" }),
            new Label({ top: 35, right: 20,height:22 ,
            		style: new Style({ font: "Roboto bold 6px", color: "#cdcbcd" }), 
            		string: "Access Tier    Admin" })
            ] }),
       new subtitlebox({height:22,string: "Tabs"}),
       new selectionbox({offset:1,string: "Document Explorer", screenName: "documentsScreen"}),
       new selectionbox({offset:1,string: "Users", screenName: "userProfileScreen"}),
       new selectionbox({offset:1,string: "Cabinet Manager"}),
	   new subtitlebox({height:22,string: "Other"}),
       new selectionbox({offset:1,string: "Password Settings"}),
       new selectionbox({offset:1,string: "Help"}),
       new selectionbox({offset:1,string: "Log Out"}),
       new Container({top:1,height:200,left:0,right:0,skin:menubox})
            
    ]
}));

export var Menu = Screen1Template;

//var currentScreen = new Screen1Template();
//application.add(currentScreen);
