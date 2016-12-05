import * as common from "common";
import { FieldLabelBehavior, FieldScrollerBehavior } from 'src/field';
import { VerticalScroller, VerticalScrollbar } from 'src/scroller';
//form row
//form label
//formtextinput]
//formtextareaInput
//formselectInput
//
//
//
//
const FORM_LEFT_COLUMN_WIDTH = 115;


class LocalButtonBehavior extends Behavior {
    onTouchBegan(content) {
        content.state = 1;
    }
    onTouchEnded(content) {
        content.state = 0;
        content.delegate("onTap");
        content.focus();
    }
}


let formRowSkin = new Skin({
    stroke: common.systemLineColor,
    borders: { bottom: 1 },
});

let formSelectOptionSkin = new Skin({
    fill: ['white', 'silver'],
});

let formSelectTopOptionSkin = new Skin({
    stroke: common.systemLineColor,
    borders: { bottom: 1 },
});

let formSelectDropDownSkin = new Skin({
    fill: 'white',
    stroke: common.systemLineColor,
    borders: { left: 1, right: 1, top: 1, bottom: 1 },
})

/*
onCreate(content, $) {
            let row = new Line({
                left: 0, right: 0, top: 15, bottom: 8,
            });
            if ($.contents) {
                if ($.contents.length == 1) {
                    row.add(new Container({
                        left: 0, right: 0,
                        contents: $.contents[0],
                    }));
                } else if ($.contents.length == 2) {
                    row.add(new Container({
                        left: 0, width: $.leftColumnWidth || FORM_DEFAULT_LEFT_COLUMN_WIDTH,
                        contents: $.contents[0],
                    }));
                    row.add(new Container({
                        left: 0, right: 0,
                        contents: $.contents[1],
                    }));
                } else if ($.contents.length == 3) {
                    row.add(new Container({
                        left: 0, width: $.leftColumnWidth || FORM_DEFAULT_LEFT_COLUMN_WIDTH,
                        contents: $.contents[0],
                    }));
                    row.add(new Container({
                        left: 0, right: 0,
                        contents: $.contents[1],
                    }));
                    row.add(new Container({
                        right: 0,
                        contents: $.contents[2],
                    }))
                } else if ($.contents.length > 3) {
                    $.contents.forEach(item => row.add(item));
                }
            }
        }
 */

export var FormRow = Container.template($ => ({
    left: $.left || 0, right: $.right || 0, top: $.top, bottom: $.bottom, width: $.width, height: $.height,
    skin: formRowSkin,
    contents: new Line({
        left: 0, right: 0, top: 15, bottom: 8,
        contents: $.contents,
    }),
}));

export var FormLabel = Label.template($ => ({
    left: 0, width: FORM_LEFT_COLUMN_WIDTH, style: common.bodyStyle, string: $.string,
}));

export var FormValue = Label.template($ => ({
    left: 0, right: 0, style: common.bodyStyle, string: $.string,
}));

export var FormRightButton = Label.template($ => ({
    right: 0, style: common.bodyLinkStyleRight, string: $.string, active: true,
    Behavior: ($.Behavior ? $.Behavior : LocalButtonBehavior),
}))

/**
 * Single-line text input field. The way it works is that you
 * pass in a data object and a specific key that this field is
 * attached to. Edits to this field automatically change the value
 * in the data object. The initial value in the data object will
 * be the initial string in the field
 * 
 * params:
 * $.formData {Object} data object, one of it's keys should be $.name
 * $.name {String} the key in the data object that this field uses to
 *                 edit the value in the object. Also the name of the
 *                 container holding the field.
 * $.hintString {String} [optional] hint string, goes away when you
 *                 start editing
 */
export var FormField = Container.template($ => ({
    left: 0, right: 0, clip: true, name: $.name,
    contents: [
        new Scroller({
            left: 2, right: 2, active: true,
            Behavior: FieldScrollerBehavior,
            contents: [
                new Label({
                    left: 0,
                    style: common.bodyStyle,
                    editable: true, string: $.formData[$.name] || '',
                    Behavior: class extends FieldLabelBehavior {
                        onEdited(label) {
                            $.formData[$.name] = label.string;
                        }
                    },
                }),
                new Label({
                    left: 0, right: 0, style: common.bodyLightStyle,
                    visible: $.formData[$.name].length == 0,
                    string: $.hintString || '', name: "hint",
                }),
            ]
        })
    ]
}))

/**
 * Form drop down or select. The way it works is that you
 * pass in a data object and a specific key that this field is
 * attached to. Edits to this field automatically change the value
 * in the data object. The initial value in the data object will
 * be the initial selected option, or if the value is not in the
 * options, then the hint string is displayed.
 * 
 * params:
 * $.formData {Object} data object, one of it's keys should be $.name
 * $.name {String} the key in the data object that this field uses to
 *                 edit the value in the object. Also the name of the
 *                 container holding the field.
 * $.hintString {String} [optional] hint string, goes away when you
 *                 select anything
 * $.options {Object[]} list of options, where each option is in the form
 *                 {
 *                     value: '9823hf9dha', // this is used in the formData
 *                     string: 'Tier 1'     // this is displayed in the drop down
 *                     callback: function(content) // optional, called if defined
 *                     style: Style()       // optional, defaults to common.bodyStyle
 *                 }
 */
export var FormSelect = Container.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    active: true, name: $.name,
    contents: [
        new Label({ left: 0, right: 15, name: 'label' }),
        new Picture({ right: 0, width: 10, url: 'assets/arrow_down.png' }),
    ],
    Behavior: FormSelectBehavior,
}));

class FormSelectBehavior extends LocalButtonBehavior {
    onCreate(content, $) {
        this.formData = $.formData;
        this.name = $.name;
        this.options = $.options;
        this.hintString = $.hintString;
    }
    onDisplayed(content) {
        this.select(content, this.formData[this.name]);
    }
    select(content, value) {
        this.formData[this.name] = value;
        let option = this.options.find(opt => (opt.value === value));
        if (option) {
            content.label.string = option.string;
            content.label.style = common.bodyStyle;
        } else {
            content.label.string = this.hintString;
            content.label.style = common.bodyLightStyle;
        }
        if (content.dropDown) {
            content.remove(content.dropDown);
        }
        return true;
    }
    onTap(content) {
        content.add(new FormSelectDropDown({
            formData: this.formData,
            name: this.name,
            options: this.options,
            hintString: this.hintString,
        }));
    }
    onUnfocused(content) {
        if (content.dropDown) {
            content.remove(content.dropDown);
        }
    }
}

let FormSelectDropDown = Container.template($ => ({
    left: -10, right: -10, top: -10, name: 'dropDown', active: true,
    skin: formSelectDropDownSkin,
    contents: [
        new Column({
            left: 10, right: 10, top: 10, bottom: 10, name: 'main',
            contents: [
                new Container({
                    left: 0, right: 0, top: 0, bottom: 0, active: true,
                    skin: formSelectTopOptionSkin, name: 'topOption',
                    contents: [
                        new Label({ left: 0, right: 15, bottom: 8, name: 'label' }),
                        new Picture({ right: 0, width: 10, bottom: 8, url: 'assets/arrow_up.png' }),
                    ],
                    Behavior: class extends LocalButtonBehavior {
                        onTap(content) {
                            content.bubble('onUnfocused');
                        }
                    }
                }),
                new Container({
                    left: 0, right: 0, top: 0, bottom: 0, clip: true, name: 'options',
                })
            ]
        })
    ],
    Behavior: class extends Behavior {
        onCreate(content) {
            let currentValue = $.formData[$.name];
            let length = $.options.length;
            if ($.options.some(opt => (opt.value === currentValue))) {
                content.main.topOption.label.string = $.options.find(opt => (opt.value === currentValue)).string;
                content.main.topOption.label.style = common.bodyStyle;
                length -= 1;
            } else {
                content.main.topOption.label.string = $.hintString;
                content.main.topOption.label.style = common.bodyLightStyle;
            }
            let options = new Column({ left: 0, right: 0, top: 0 });
            for (let opt of $.options) {
                if (opt.value !== currentValue) {
                    options.add(new FormSelectOption(opt));
                }
            }
            if (length > 4) {
                options = VerticalScroller({}, {
                    left: 0, right: 0, top: 0, bottom: 0, height: 115,
                    active: true,
                    contents: [
                        options,
                        new VerticalScrollbar(),
                    ]
                });
            }
            content.main.options.add(options);
        }
    }
}));

let FormSelectOption = Container.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    skin: formSelectOptionSkin, active: true,
    contents: [
        new Container({ left: 0, right: 0, top: 8, bottom: 0, contents: [
            new Label({ left: 0, right: 0, style: $.style || common.bodyStyle, string: $.string })
        ]})
    ],
    Behavior: class extends LocalButtonBehavior {
        onTap(content) {
            if ($.callback) {
                $.callback(content);
            } else {
                content.bubble('select', $.value);
            }
        }
    }
}));

/**
 * Form drop down for selecting a tier
 * @params:
 * $.data {Data} - database
 * $.formData {Object} - form data dictionary, one of its keys should be $.name
 * $.name {String} - key in form data
 */
export var TierSelect = FormSelect.template($ => ({
    Behavior: TierSelectBehavior,
}));

class TierSelectBehavior extends FormSelectBehavior {
    onCreate(content, $) {
        this.formData = $.formData;
        this.name = $.name;
        this.options = this.getAllTiers($.data);
        this.options.push({
            string: '+ Create Tier',
            style: common.bodyLightStyle,
            callback: function(content) {
                application.distribute('dispatch', 'newTierScreen', 'new');
            }
        });
        this.hintString = 'Select Tier';
    }
    getAllTiers(data) {
        let tierIDs = Object.keys(data.tiers);
        let tierDatas = data.getTierListData(tierIDs);
        let tierOptions = tierDatas.map(tier => ({ value: tier.id, string: tier.name }));
        tierOptions.sort((a, b) => a.string.localeCompare(b.string));
        return tierOptions;
    }
}

/**
 * Form drop down for selecting a label
 * @params:
 * $.data {Data} - database
 * $.formData {Object} - form data dictionary, one of its keys should be $.name
 * $.name {String} - key in form data
 */
export var LabelSelect = FormSelect.template($ => ({
    Behavior: LabelSelectBehavior,
}));

class LabelSelectBehavior extends FormSelectBehavior {
    onCreate(content, $) {
        this.formData = $.formData;
        this.name = $.name;
        this.options = this.getAllLabels($.data);
        this.options.push({
            string: '+ Create Label',
            style: common.bodyLightStyle,
            callback: function(content) {
                application.distribute('dispatch', 'newLabelScreen', 'new');
            }
        });
        this.hintString = 'Select Label';
    }
    getAllLabels(data) {
        let labelIDs = Object.keys(data.labels);
        let labelDatas = data.getLabelListData(labelIDs);
        let labelOptions = labelDatas.map(label => ({ value: label.id, string: label.name }));
        labelOptions.sort((a, b) => a.string.localeCompare(b.string));
        return labelOptions;
    }
}
