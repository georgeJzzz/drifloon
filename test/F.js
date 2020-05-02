const { testProp, fc } = require("ava-fast-check");
const R = require("ramda");

const { F } = require("../main");

// checkMaybe :: Eq a => a -> Maybe a -> Bool
const checkMaybe = R.curry((a, ma) => {
	if (R.isNil(ma)) {
		true
	}
	else {
		return a === ma;
	}
});

// arbInt :: () -> Arbitraty (Int, Maybe Int)
const arbInt = () => {
	return fc.integer()
		.chain(a => {
			return fc.constantFrom(null, a)
				.map(ma => ([a, ma]))
			;
		})
	;
};

testProp(
	"fmap",
	[fc.option(fc.string())],
	n => F.fmap(R.identity, n) === n
);

testProp(
	"fmap2 - liftA2",
	[arbInt(), arbInt()],
	([a, ma], [b, mb]) => {
		return R.pipe(
			F.fmap2(R.add),
			checkMaybe(R.add(a, b))
		)(ma, mb);
	}
);

testProp(
	"fmap3 - liftA3",
	[arbInt(), arbInt(), arbInt()],
	([a, ma], [b, mb], [c, mc]) => {
		const f = R.curry((a, b, c) => a + b + c);

		return R.pipe(
			F.fmap3(f),
			checkMaybe(f(a, b, c))
		)(ma, mb, mc);
	}
);

testProp(
	"fmap4 - liftA4",
	[arbInt(), arbInt(), arbInt(), arbInt()],
	([a, ma], [b, mb], [c, mc], [d, md]) => {
		const f = R.curry((a, b, c, d) => a + b + c + d);

		return R.pipe(
			F.fmap4(f),
			checkMaybe(f(a, b, c, d))
		)(ma, mb, mc, md);
	}
);
