import { FormRow, FormLabel, FormValue, FormRightButton, FormField, FormSelect, TierSelect, LabelSelect, FormTextValue } from 'forms';
import * as common from 'common';

/************ EXPORT SCREEN **********************************************/
export var HelpScreen = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: common.screenSkin,
	Behavior: class extends Behavior {
		onDisplaying(content) {
			this.render(content);
		}
		update(content) {
			// no re-rendering because this make the user lose any
			// work in progress
		}
		render(content) {
			content.empty();
			content.add(
				new common.NavBar({ contents: [
					new common.NavMenuButton(),
					new common.NavTitleLeft({ string: 'Help' }),
				]})
			);

			content.add(
				new Text({
					left: common.screenPadding, right: common.screenPadding,
					top: common.screenPadding + common.navBarHeight,
					style: common.bodyStyle,
					string: "As a member of the Greek community and a part of one " + 
							"of these organizations this is highly offensive. " +
							"Sororities at UC Berkeley make it their goal to give " +
							"women a place to feel comfortable as well as better the " +
							"community. Comparing specific houses to characters from " +
							"a movie about bullying is absurd and beyond inaccurate. " +
							"Making the claim that sororities are cliques is demeaning " +
							"the sisterhood and values they are founded on. This clearly " +
							"is a stab at a community on campus that does nothing but " +
							"support the rest of the student body."
				})
			);
		}
	}
}));