const R = require("ramda");

// isAnyNil :: [Maybe a] -> Bool
const isAnyNil = R.any(R.isNil);

// fmap :: (a -> b) -> Maybe a -> Maybe b
const fmap = R.curry((f, a) => {
	if (R.isNil(a)) {
		return null;
	}

	return f(a);
});

// fmap2 :: (a -> b -> c) -> Maybe a -> Maybe b -> Maybe c
const fmap2 = R.curry((f, a, b) => {
	if (isAnyNil([a, b])) {
		return null;
	}

	return f(a, b);
});

// fmap3 :: (a -> b -> c -> d) -> Maybe a -> Maybe b -> Maybe c -> Maybe d
const fmap3 = R.curryN((f, a, b, c) => {
	if (isAnyNil([a, b, c])) {
		return null;
	}

	return f(a, b, c);
});

// fmap4 :: (a -> b -> c -> d -> e) -> Maybe a -> Maybe b -> Maybe c -> Maybe d -> Maybe e
const fmap4 = R.curry((f, a, b, c, d) => {
	if (isAnyNil([a, b, c, d])) {
		return null;
	}

	return f(a, b, c, d);
});

// fmap5 :: (a -> b -> c -> d -> e -> f) -> Maybe a -> Maybe b -> Maybe c -> Maybe d -> Maybe e -> Maybe f
const fmap5 = R.curry((f, a, b, c, d, e) => {
	if (isAnyNil([a, b, c, d, e])) {
		return null;
	}

	return f(a, b, c, d, e);
});

// traverse :: (a -> Maybe b) -> [a] -> Maybe [b]
const traverse = R.curry((f, xs) => {
	let r = [];

	for (const x of xs) {
		let a = f(x);

		if (R.isNil(a)) {
			return null;
		}
		else {
			r.push(a);
		}
	}

	return r;
});

const makeValue = v => {
	let innerValue = v;

	return (...args) => {
		if (!args.length) {
			return innerValue;
		}
		else {
			return innerValue = args[0];
		}
	};
};

const genValue = f => {
	const gen = makeValue(null);

	return () => {
		const v = gen();
		if (R.isNil(v)) {
			const value = f();
			gen(value);
			return value;
		}
		else {
			return v;
		}
	};
};

module.exports = {
	fmap,
	fmap2,
	fmap3,
	fmap4,
	fmap5,

	traverse,

	makeValue,
	genValue
};
