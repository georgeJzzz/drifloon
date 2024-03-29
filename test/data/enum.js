const { testProp, fc } = require("ava-fast-check");
const R = require("rambda");

const { Data: { Enum } } = require("../../main");

const fields = ["Done", "Polling", "Error"];

const T = Enum(...fields);

testProp(
	"Functor: fmap id = id",
	[fc.constantFrom(...fields), fc.integer()],
	(it, field, x) => {
		const f = R.identity;
		const g = T.fmap(R.identity);
		const v = T[field](x);

		it.deepEqual(f(v), g(v));
	}
);

testProp(
	"Functor: fmap (f . g) = fmap f . fmap g",
	[fc.constantFrom(...fields), fc.integer()],
	(it, field, x) => {
		const f = R.inc;
		const g = R.toString;

		const k = T.fmap(R.compose(g, f));
		const mk = R.compose(
			T.fmap(g),
			T.fmap(f)
		);

		const v = T[field](x);

		it.deepEqual(k(v), mk(v));
	}
);

testProp(
	"Monad: pure a >>= f = f a",
	[fc.integer()],
	(it, x) => {
		const f = T.fmap(R.inc);

		const left = R.pipe(
			T.pure,
			T.bind(f)
		)(x);

		const right = f(x);

		it.deepEqual(left, right);
	}
);

testProp(
	"Monad: ma >>= pure = ma",
	[fc.constantFrom(...fields), fc.integer()],
	(it, field, x) => {
		const ma = T[field](x);

		const left = T.bind(T.pure)(ma);

		it.deepEqual(ma, left);
	}
);

testProp(
	"Monad: (ma >>= f) >>= g = ma >>= (\\x -> f x >>= g)",
	[fc.constantFrom(...fields), fc.integer()],
	(it, field, x) => {
		const ma = T[field](x);

		const f = T.fmap(R.inc);
		const g = T.fmap(R.toString);

		const left = R.pipe(
			T.bind(f),
			T.bind(g)
		)(ma);

		const right = T.bind(
			R.compose(
				T.bind(g),
				f
			)
		)(ma);

		it.deepEqual(left, right);
	}
);
