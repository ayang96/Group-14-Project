import * as common from "common";

var menuboxSkin= new Skin({fill: "#666666"});
var selectedboxSkin = new Skin({fill:"#333333"});
var menufont = new Style({ font: "15px Roboto Medium", color: "white" })

var selectionbox = Container.template($ =>({//A Button overlayed with a rectangle of the same color, rectangle changes if button is selected 
 name:$.name, top: $.offset,height:35, left: 0, right: 0, active: true,
    skin: menuboxSkin,
    contents:[
    	new Container({name:"selected",top:3,left:5,right:5,bottom:3,skin:$.color}),
    	$.icon,
    	 new Label({ top: 0, left: $.left,height:35 ,
            style: menufont, 
            string: $.string }),
    ],
    Behavior: class extends Behavior {
      /*onTap(content) {
        application.distribute("dispatch", $.screenName);
      }*/
      onTouchBegan(content){
            content.selected.skin = selectedboxSkin;
    }
      onTouchEnded(content){
      		content.selected.skin = menuboxSkin;
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
        new Container({ top: 0, height: 70, left: 0, right: 0,  skin: menuboxSkin,
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
       new selectionbox({offset:1,icon:whiteDocIcon,left:45,name: "documents", string: "Document Explorer", screenName: "documentsScreen",color:menuboxSkin}),
       new selectionbox({offset:1,icon:whiteUsersIcon,left:45,name:"users",string: "Users", screenName: "usersScreen",color:menuboxSkin}),
       new selectionbox({offset:1,icon:whiteCabinetIcon,left:45,name:"cabinets",string: "Cabinet Manager",color:menuboxSkin}),
	     new subtitlebox({height:22,string: "Other"}),
       new selectionbox({offset:1,left:20,string: "Password Settings",color:menuboxSkin}),
       new selectionbox({offset:1,left:20,string: "Help",color:menuboxSkin}),
       new selectionbox({offset:1,left:20,string: "Log Out",color:menuboxSkin}),
       new Container({top:1,height:200,left:0,right:0,skin:menuboxSkin})
            
    ],
    Behavior: class extends Behavior {e
      update(content) {//TabType = {documents,users,cabinets
        if(TabType ==="documents"){
        	content.documents.selected.skin=selectedboxSkin;
        	content.users.selected.skin = menuboxSkin;
        	content.cabinets.selected.skin = menuboxSkin;
        }
        if(TabType ==="users"){
        	content.documents.selected.skin=menuboxSkin;
        	content.users.selected.skin = selectedboxSkin;
        	content.cabinets.selected.skin = menuboxSkin;
        }
        if(TabType ==="cabinets"){
        	content.documents.selected.skin=menuboxSkin;
        	content.users.selected.skin = menuboxSkin;
        	content.cabinets.selected.skin = selectedboxSkin;
        }
      }
    }
}));

export var Menu = Screen1Template;

//var currentScreen = new Screen1Template();
//application.add(currentScreen);
