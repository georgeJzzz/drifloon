/** 事件绑定 */
const R = require("ramda");
const Rx = require("rxjs");
const Ro = require("rxjs/operators");

// toElement :: Stream Event -> Stream Element
const toElement = Ro.map(e => e.target);

// toValue :: Stream Event -> Stream String
const toValue = Ro.map(e => e.target.value.trim());

// debounceAction :: Stream a -> Stream a
const debounceAction = Ro.debounceTime(150);

// fromEvent :: String -> Maybe Element -> Stream Event
const fromEvent = R.curry((type, el) => {
	if (R.isNil(el)) {
		return Rx.NEVER;
	}
	else {
		return Rx.fromEvent(el, type);
	}
});

// fromClick :: Maybe Element -> Stream Event
const fromClick = fromEvent("click");

// fromClick_ :: Maybe Element -> Stream Event
const fromClick_ = R.compose(
	debounceAction,
	fromClick
);

// fromClickE :: Maye Element -> Stream Element
const fromClickE = R.compose(
	toElement,
	fromClick
);

// fromClickE_ :: Maybe Element -> Stream Element
const fromClickE_ = R.compose(
	debounceAction,
	fromClickE
);

// fromChange :: Maybe Element -> Stream Event
const fromChange = fromEvent("change");

// fromChange_  :: Maybe Element -> Stream Event
const fromChange_ = R.compose(
	debounceAction,
	fromChange
);

// fromChangeV :: Maybe Element -> Stream String
const fromChangeV = R.compose(
	toValue,
	fromChange
);

// fromChangeV_ :: Maybe Element -> Stream String
const fromChangeV_ = R.compose(
	debounceAction,
	fromChangeV
);

module.exports = {
	fromEvent,

	fromClick,
	fromClick_,
	fromClickE,
	fromClickE_,

	fromChange,
	fromChange_,
	fromChangeV,
	fromChangeV_
};