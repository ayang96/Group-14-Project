import * as common from "common";

var menubox= new Skin({fill: "#666666"});
var menufont = new Style({ font: "15px Roboto Medium", color: "white" })
var TabType = "documents";
var selectionbox = Container.template($ =>({
 top: $.offset,height:35, left: 0, right: 0, active: true,
    skin: menubox,
    contents:[
    	$.icon,
    	 new Label({ top: 0, left: $.left,height:35 ,
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
            		style: new Style({ font: "15px Roboto Medium", color: "#cdcbcd" }), 
            		string: $.string })
            ]
}));
var whiteDocIcon = new Picture({height:15,left: 12,url:"assets/icon_document_32x32White.png"});
var whiteCabinetIcon = new Picture({height:15,left: 12,url:"assets/icon_cabinet_32x32White.png"});
var whiteUsersIcon = new Picture({height:20,left: 12,url:"assets/icon_users_32x32White.png"});
var Screen1Template = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 90, active: true,
    skin: new Skin({fill: "#595959"}),
    contents: [
        new Container({ top: 0, height: 70, left: 0, right: 0,  skin: menubox,
			contents:[
			new Picture({height:60,left:-40, url: "assets/UserProfileIcon.png"}),			
			new Label({ top: 15, right: 63,height:22 ,
            		style: new Style({ font: "16px Roboto Medium", color: "white" }), 
            		string: "Allison Rory" }),
            new Label({ top: 35, right: 35,height:22 ,
            		style: new Style({ font: "13px Roboto Medium", color: "#cdcbcd" }), 
            		string: "Access Tier    Admin" })
            ] }),
       new subtitlebox({height:22,string: "Tabs"}),
       new selectionbox({offset:1,icon:whiteDocIcon,left:45,string: "Document Explorer", screenName: "documentsScreen"}),
       new selectionbox({offset:1,icon:whiteUsersIcon,left:45,string: "Users", screenName: "usersScreen"}),
       new selectionbox({offset:1,icon:whiteCabinetIcon,left:45,string: "Cabinet Manager"}),
	   new subtitlebox({height:22,string: "Other"}),
       new selectionbox({offset:1,left:20,string: "Password Settings"}),
       new selectionbox({offset:1,left:20,string: "Help"}),
       new selectionbox({offset:1,left:20,string: "Log Out"}),
       new Container({top:1,height:200,left:0,right:0,skin:menubox})
            
    ]
}));

export var Menu = Screen1Template;

//var currentScreen = new Screen1Template();
//application.add(currentScreen);
