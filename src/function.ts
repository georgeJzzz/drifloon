import * as R from "rambda";

import { Option } from "./internals";

function _fmap(f: (...args: readonly any[]) => any, ...args: readonly any[]) {
	if (R.any(R.isNil, args)) {
		return null;
	}
	else {
		return f(...args);
	}
}

export const fmap = R.curryN(2, _fmap);
export const fmap2 = R.curryN(3, _fmap);
export const fmap3 = R.curryN(4, _fmap);

export const isJust: <T>(x: Option<T>) => boolean = R.complement(R.isNil);
