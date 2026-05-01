import { i as __toESM, r as __require, t as __commonJSMin } from "../rolldown-runtime.mjs";
import { spawn } from "child_process";
import path from "path";
import os from "os";
import { stripVTControlCharacters } from "node:util";
import y, { stdin, stdout } from "node:process";
import * as g from "node:readline";
import O from "node:readline";
import { Writable } from "node:stream";
import { Buffer as Buffer$1 } from "node:buffer";
import { normalize as normalize$1 } from "node:path";
import { EventEmitter } from "node:events";
var require_src$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const ESC = "\x1B";
	const CSI = `${ESC}[`;
	const beep = "\x07";
	const cursor = {
		to(x, y) {
			if (!y) return `${CSI}${x + 1}G`;
			return `${CSI}${y + 1};${x + 1}H`;
		},
		move(x, y) {
			let ret = "";
			if (x < 0) ret += `${CSI}${-x}D`;
			else if (x > 0) ret += `${CSI}${x}C`;
			if (y < 0) ret += `${CSI}${-y}A`;
			else if (y > 0) ret += `${CSI}${y}B`;
			return ret;
		},
		up: (count = 1) => `${CSI}${count}A`,
		down: (count = 1) => `${CSI}${count}B`,
		forward: (count = 1) => `${CSI}${count}C`,
		backward: (count = 1) => `${CSI}${count}D`,
		nextLine: (count = 1) => `${CSI}E`.repeat(count),
		prevLine: (count = 1) => `${CSI}F`.repeat(count),
		left: `${CSI}G`,
		hide: `${CSI}?25l`,
		show: `${CSI}?25h`,
		save: `${ESC}7`,
		restore: `${ESC}8`
	};
	module.exports = {
		cursor,
		scroll: {
			up: (count = 1) => `${CSI}S`.repeat(count),
			down: (count = 1) => `${CSI}T`.repeat(count)
		},
		erase: {
			screen: `${CSI}2J`,
			up: (count = 1) => `${CSI}1J`.repeat(count),
			down: (count = 1) => `${CSI}J`.repeat(count),
			line: `${CSI}2K`,
			lineEnd: `${CSI}K`,
			lineStart: `${CSI}1K`,
			lines(count) {
				let clear = "";
				for (let i = 0; i < count; i++) clear += this.line + (i < count - 1 ? cursor.up() : "");
				if (count) clear += cursor.left;
				return clear;
			}
		},
		beep
	};
}));
var require_picocolors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let p = process || {}, argv = p.argv || [], env = p.env || {};
	let isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
	let formatter = (open, close, replace = open) => (input) => {
		let string = "" + input, index = string.indexOf(close, open.length);
		return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
	};
	let replaceClose = (string, close, replace, index) => {
		let result = "", cursor = 0;
		do {
			result += string.substring(cursor, index) + replace;
			cursor = index + close.length;
			index = string.indexOf(close, cursor);
		} while (~index);
		return result + string.substring(cursor);
	};
	let createColors = (enabled = isColorSupported) => {
		let f = enabled ? formatter : () => String;
		return {
			isColorSupported: enabled,
			reset: f("\x1B[0m", "\x1B[0m"),
			bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
			dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
			italic: f("\x1B[3m", "\x1B[23m"),
			underline: f("\x1B[4m", "\x1B[24m"),
			inverse: f("\x1B[7m", "\x1B[27m"),
			hidden: f("\x1B[8m", "\x1B[28m"),
			strikethrough: f("\x1B[9m", "\x1B[29m"),
			black: f("\x1B[30m", "\x1B[39m"),
			red: f("\x1B[31m", "\x1B[39m"),
			green: f("\x1B[32m", "\x1B[39m"),
			yellow: f("\x1B[33m", "\x1B[39m"),
			blue: f("\x1B[34m", "\x1B[39m"),
			magenta: f("\x1B[35m", "\x1B[39m"),
			cyan: f("\x1B[36m", "\x1B[39m"),
			white: f("\x1B[37m", "\x1B[39m"),
			gray: f("\x1B[90m", "\x1B[39m"),
			bgBlack: f("\x1B[40m", "\x1B[49m"),
			bgRed: f("\x1B[41m", "\x1B[49m"),
			bgGreen: f("\x1B[42m", "\x1B[49m"),
			bgYellow: f("\x1B[43m", "\x1B[49m"),
			bgBlue: f("\x1B[44m", "\x1B[49m"),
			bgMagenta: f("\x1B[45m", "\x1B[49m"),
			bgCyan: f("\x1B[46m", "\x1B[49m"),
			bgWhite: f("\x1B[47m", "\x1B[49m"),
			blackBright: f("\x1B[90m", "\x1B[39m"),
			redBright: f("\x1B[91m", "\x1B[39m"),
			greenBright: f("\x1B[92m", "\x1B[39m"),
			yellowBright: f("\x1B[93m", "\x1B[39m"),
			blueBright: f("\x1B[94m", "\x1B[39m"),
			magentaBright: f("\x1B[95m", "\x1B[39m"),
			cyanBright: f("\x1B[96m", "\x1B[39m"),
			whiteBright: f("\x1B[97m", "\x1B[39m"),
			bgBlackBright: f("\x1B[100m", "\x1B[49m"),
			bgRedBright: f("\x1B[101m", "\x1B[49m"),
			bgGreenBright: f("\x1B[102m", "\x1B[49m"),
			bgYellowBright: f("\x1B[103m", "\x1B[49m"),
			bgBlueBright: f("\x1B[104m", "\x1B[49m"),
			bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
			bgCyanBright: f("\x1B[106m", "\x1B[49m"),
			bgWhiteBright: f("\x1B[107m", "\x1B[49m")
		};
	};
	module.exports = createColors();
	module.exports.createColors = createColors;
}));
var import_src$1 = require_src$2();
var import_picocolors = /* @__PURE__ */ __toESM(require_picocolors(), 1);
function DD({ onlyFirst: e = !1 } = {}) {
	const t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
	return new RegExp(t, e ? void 0 : "g");
}
const uD = DD();
function P$1(e) {
	if (typeof e != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
	return e.replace(uD, "");
}
function L$1(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var W$1 = { exports: {} };
(function(e) {
	var u = {};
	e.exports = u, u.eastAsianWidth = function(F) {
		var s = F.charCodeAt(0), i = F.length == 2 ? F.charCodeAt(1) : 0, D = s;
		return 55296 <= s && s <= 56319 && 56320 <= i && i <= 57343 && (s &= 1023, i &= 1023, D = s << 10 | i, D += 65536), D == 12288 || 65281 <= D && D <= 65376 || 65504 <= D && D <= 65510 ? "F" : D == 8361 || 65377 <= D && D <= 65470 || 65474 <= D && D <= 65479 || 65482 <= D && D <= 65487 || 65490 <= D && D <= 65495 || 65498 <= D && D <= 65500 || 65512 <= D && D <= 65518 ? "H" : 4352 <= D && D <= 4447 || 4515 <= D && D <= 4519 || 4602 <= D && D <= 4607 || 9001 <= D && D <= 9002 || 11904 <= D && D <= 11929 || 11931 <= D && D <= 12019 || 12032 <= D && D <= 12245 || 12272 <= D && D <= 12283 || 12289 <= D && D <= 12350 || 12353 <= D && D <= 12438 || 12441 <= D && D <= 12543 || 12549 <= D && D <= 12589 || 12593 <= D && D <= 12686 || 12688 <= D && D <= 12730 || 12736 <= D && D <= 12771 || 12784 <= D && D <= 12830 || 12832 <= D && D <= 12871 || 12880 <= D && D <= 13054 || 13056 <= D && D <= 19903 || 19968 <= D && D <= 42124 || 42128 <= D && D <= 42182 || 43360 <= D && D <= 43388 || 44032 <= D && D <= 55203 || 55216 <= D && D <= 55238 || 55243 <= D && D <= 55291 || 63744 <= D && D <= 64255 || 65040 <= D && D <= 65049 || 65072 <= D && D <= 65106 || 65108 <= D && D <= 65126 || 65128 <= D && D <= 65131 || 110592 <= D && D <= 110593 || 127488 <= D && D <= 127490 || 127504 <= D && D <= 127546 || 127552 <= D && D <= 127560 || 127568 <= D && D <= 127569 || 131072 <= D && D <= 194367 || 177984 <= D && D <= 196605 || 196608 <= D && D <= 262141 ? "W" : 32 <= D && D <= 126 || 162 <= D && D <= 163 || 165 <= D && D <= 166 || D == 172 || D == 175 || 10214 <= D && D <= 10221 || 10629 <= D && D <= 10630 ? "Na" : D == 161 || D == 164 || 167 <= D && D <= 168 || D == 170 || 173 <= D && D <= 174 || 176 <= D && D <= 180 || 182 <= D && D <= 186 || 188 <= D && D <= 191 || D == 198 || D == 208 || 215 <= D && D <= 216 || 222 <= D && D <= 225 || D == 230 || 232 <= D && D <= 234 || 236 <= D && D <= 237 || D == 240 || 242 <= D && D <= 243 || 247 <= D && D <= 250 || D == 252 || D == 254 || D == 257 || D == 273 || D == 275 || D == 283 || 294 <= D && D <= 295 || D == 299 || 305 <= D && D <= 307 || D == 312 || 319 <= D && D <= 322 || D == 324 || 328 <= D && D <= 331 || D == 333 || 338 <= D && D <= 339 || 358 <= D && D <= 359 || D == 363 || D == 462 || D == 464 || D == 466 || D == 468 || D == 470 || D == 472 || D == 474 || D == 476 || D == 593 || D == 609 || D == 708 || D == 711 || 713 <= D && D <= 715 || D == 717 || D == 720 || 728 <= D && D <= 731 || D == 733 || D == 735 || 768 <= D && D <= 879 || 913 <= D && D <= 929 || 931 <= D && D <= 937 || 945 <= D && D <= 961 || 963 <= D && D <= 969 || D == 1025 || 1040 <= D && D <= 1103 || D == 1105 || D == 8208 || 8211 <= D && D <= 8214 || 8216 <= D && D <= 8217 || 8220 <= D && D <= 8221 || 8224 <= D && D <= 8226 || 8228 <= D && D <= 8231 || D == 8240 || 8242 <= D && D <= 8243 || D == 8245 || D == 8251 || D == 8254 || D == 8308 || D == 8319 || 8321 <= D && D <= 8324 || D == 8364 || D == 8451 || D == 8453 || D == 8457 || D == 8467 || D == 8470 || 8481 <= D && D <= 8482 || D == 8486 || D == 8491 || 8531 <= D && D <= 8532 || 8539 <= D && D <= 8542 || 8544 <= D && D <= 8555 || 8560 <= D && D <= 8569 || D == 8585 || 8592 <= D && D <= 8601 || 8632 <= D && D <= 8633 || D == 8658 || D == 8660 || D == 8679 || D == 8704 || 8706 <= D && D <= 8707 || 8711 <= D && D <= 8712 || D == 8715 || D == 8719 || D == 8721 || D == 8725 || D == 8730 || 8733 <= D && D <= 8736 || D == 8739 || D == 8741 || 8743 <= D && D <= 8748 || D == 8750 || 8756 <= D && D <= 8759 || 8764 <= D && D <= 8765 || D == 8776 || D == 8780 || D == 8786 || 8800 <= D && D <= 8801 || 8804 <= D && D <= 8807 || 8810 <= D && D <= 8811 || 8814 <= D && D <= 8815 || 8834 <= D && D <= 8835 || 8838 <= D && D <= 8839 || D == 8853 || D == 8857 || D == 8869 || D == 8895 || D == 8978 || 9312 <= D && D <= 9449 || 9451 <= D && D <= 9547 || 9552 <= D && D <= 9587 || 9600 <= D && D <= 9615 || 9618 <= D && D <= 9621 || 9632 <= D && D <= 9633 || 9635 <= D && D <= 9641 || 9650 <= D && D <= 9651 || 9654 <= D && D <= 9655 || 9660 <= D && D <= 9661 || 9664 <= D && D <= 9665 || 9670 <= D && D <= 9672 || D == 9675 || 9678 <= D && D <= 9681 || 9698 <= D && D <= 9701 || D == 9711 || 9733 <= D && D <= 9734 || D == 9737 || 9742 <= D && D <= 9743 || 9748 <= D && D <= 9749 || D == 9756 || D == 9758 || D == 9792 || D == 9794 || 9824 <= D && D <= 9825 || 9827 <= D && D <= 9829 || 9831 <= D && D <= 9834 || 9836 <= D && D <= 9837 || D == 9839 || 9886 <= D && D <= 9887 || 9918 <= D && D <= 9919 || 9924 <= D && D <= 9933 || 9935 <= D && D <= 9953 || D == 9955 || 9960 <= D && D <= 9983 || D == 10045 || D == 10071 || 10102 <= D && D <= 10111 || 11093 <= D && D <= 11097 || 12872 <= D && D <= 12879 || 57344 <= D && D <= 63743 || 65024 <= D && D <= 65039 || D == 65533 || 127232 <= D && D <= 127242 || 127248 <= D && D <= 127277 || 127280 <= D && D <= 127337 || 127344 <= D && D <= 127386 || 917760 <= D && D <= 917999 || 983040 <= D && D <= 1048573 || 1048576 <= D && D <= 1114109 ? "A" : "N";
	}, u.characterLength = function(F) {
		var s = this.eastAsianWidth(F);
		return s == "F" || s == "W" || s == "A" ? 2 : 1;
	};
	function t(F) {
		return F.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
	}
	u.length = function(F) {
		for (var s = t(F), i = 0, D = 0; D < s.length; D++) i = i + this.characterLength(s[D]);
		return i;
	}, u.slice = function(F, s, i) {
		textLen = u.length(F), s = s || 0, i = i || 1, s < 0 && (s = textLen + s), i < 0 && (i = textLen + i);
		for (var D = "", C = 0, n = t(F), E = 0; E < n.length; E++) {
			var a = n[E], o = u.length(a);
			if (C >= s - (o == 2 ? 1 : 0)) if (C + o <= i) D += a;
			else break;
			C += o;
		}
		return D;
	};
})(W$1);
var tD = W$1.exports;
const eD = L$1(tD);
var FD = function() {
	return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const sD = L$1(FD);
function p(e, u = {}) {
	if (typeof e != "string" || e.length === 0 || (u = {
		ambiguousIsNarrow: !0,
		...u
	}, e = P$1(e), e.length === 0)) return 0;
	e = e.replace(sD(), "  ");
	const t = u.ambiguousIsNarrow ? 1 : 2;
	let F = 0;
	for (const s of e) {
		const i = s.codePointAt(0);
		if (i <= 31 || i >= 127 && i <= 159 || i >= 768 && i <= 879) continue;
		switch (eD.eastAsianWidth(s)) {
			case "F":
			case "W":
				F += 2;
				break;
			case "A":
				F += t;
				break;
			default: F += 1;
		}
	}
	return F;
}
const w = 10, N = (e = 0) => (u) => `\x1B[${u + e}m`, I = (e = 0) => (u) => `\x1B[${38 + e};5;${u}m`, R = (e = 0) => (u, t, F) => `\x1B[${38 + e};2;${u};${t};${F}m`, r = {
	modifier: {
		reset: [0, 0],
		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		overline: [53, 55],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29]
	},
	color: {
		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],
		blackBright: [90, 39],
		gray: [90, 39],
		grey: [90, 39],
		redBright: [91, 39],
		greenBright: [92, 39],
		yellowBright: [93, 39],
		blueBright: [94, 39],
		magentaBright: [95, 39],
		cyanBright: [96, 39],
		whiteBright: [97, 39]
	},
	bgColor: {
		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49],
		bgBlackBright: [100, 49],
		bgGray: [100, 49],
		bgGrey: [100, 49],
		bgRedBright: [101, 49],
		bgGreenBright: [102, 49],
		bgYellowBright: [103, 49],
		bgBlueBright: [104, 49],
		bgMagentaBright: [105, 49],
		bgCyanBright: [106, 49],
		bgWhiteBright: [107, 49]
	}
};
Object.keys(r.modifier);
const iD = Object.keys(r.color), CD = Object.keys(r.bgColor);
[...iD, ...CD];
function rD() {
	const e = /* @__PURE__ */ new Map();
	for (const [u, t] of Object.entries(r)) {
		for (const [F, s] of Object.entries(t)) r[F] = {
			open: `\x1B[${s[0]}m`,
			close: `\x1B[${s[1]}m`
		}, t[F] = r[F], e.set(s[0], s[1]);
		Object.defineProperty(r, u, {
			value: t,
			enumerable: !1
		});
	}
	return Object.defineProperty(r, "codes", {
		value: e,
		enumerable: !1
	}), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = N(), r.color.ansi256 = I(), r.color.ansi16m = R(), r.bgColor.ansi = N(w), r.bgColor.ansi256 = I(w), r.bgColor.ansi16m = R(w), Object.defineProperties(r, {
		rgbToAnsi256: {
			value: (u, t, F) => u === t && t === F ? u < 8 ? 16 : u > 248 ? 231 : Math.round((u - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u / 255 * 5) + 6 * Math.round(t / 255 * 5) + Math.round(F / 255 * 5),
			enumerable: !1
		},
		hexToRgb: {
			value: (u) => {
				const t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));
				if (!t) return [
					0,
					0,
					0
				];
				let [F] = t;
				F.length === 3 && (F = [...F].map((i) => i + i).join(""));
				const s = Number.parseInt(F, 16);
				return [
					s >> 16 & 255,
					s >> 8 & 255,
					s & 255
				];
			},
			enumerable: !1
		},
		hexToAnsi256: {
			value: (u) => r.rgbToAnsi256(...r.hexToRgb(u)),
			enumerable: !1
		},
		ansi256ToAnsi: {
			value: (u) => {
				if (u < 8) return 30 + u;
				if (u < 16) return 90 + (u - 8);
				let t, F, s;
				if (u >= 232) t = ((u - 232) * 10 + 8) / 255, F = t, s = t;
				else {
					u -= 16;
					const C = u % 36;
					t = Math.floor(u / 36) / 5, F = Math.floor(C / 6) / 5, s = C % 6 / 5;
				}
				const i = Math.max(t, F, s) * 2;
				if (i === 0) return 30;
				let D = 30 + (Math.round(s) << 2 | Math.round(F) << 1 | Math.round(t));
				return i === 2 && (D += 60), D;
			},
			enumerable: !1
		},
		rgbToAnsi: {
			value: (u, t, F) => r.ansi256ToAnsi(r.rgbToAnsi256(u, t, F)),
			enumerable: !1
		},
		hexToAnsi: {
			value: (u) => r.ansi256ToAnsi(r.hexToAnsi256(u)),
			enumerable: !1
		}
	}), r;
}
const ED = rD(), d$1 = new Set(["\x1B", ""]), oD = 39, y$1 = "\x07", V$1 = "[", nD = "]", G$1 = "m", _$1 = `${nD}8;;`, z = (e) => `${d$1.values().next().value}${V$1}${e}${G$1}`, K$1 = (e) => `${d$1.values().next().value}${_$1}${e}${y$1}`, aD = (e) => e.split(" ").map((u) => p(u)), k$1 = (e, u, t) => {
	const F = [...u];
	let s = !1, i = !1, D = p(P$1(e[e.length - 1]));
	for (const [C, n] of F.entries()) {
		const E = p(n);
		if (D + E <= t ? e[e.length - 1] += n : (e.push(n), D = 0), d$1.has(n) && (s = !0, i = F.slice(C + 1).join("").startsWith(_$1)), s) {
			i ? n === y$1 && (s = !1, i = !1) : n === G$1 && (s = !1);
			continue;
		}
		D += E, D === t && C < F.length - 1 && (e.push(""), D = 0);
	}
	!D && e[e.length - 1].length > 0 && e.length > 1 && (e[e.length - 2] += e.pop());
}, hD = (e) => {
	const u = e.split(" ");
	let t = u.length;
	for (; t > 0 && !(p(u[t - 1]) > 0);) t--;
	return t === u.length ? e : u.slice(0, t).join(" ") + u.slice(t).join("");
}, lD = (e, u, t = {}) => {
	if (t.trim !== !1 && e.trim() === "") return "";
	let F = "", s, i;
	const D = aD(e);
	let C = [""];
	for (const [E, a] of e.split(" ").entries()) {
		t.trim !== !1 && (C[C.length - 1] = C[C.length - 1].trimStart());
		let o = p(C[C.length - 1]);
		if (E !== 0 && (o >= u && (t.wordWrap === !1 || t.trim === !1) && (C.push(""), o = 0), (o > 0 || t.trim === !1) && (C[C.length - 1] += " ", o++)), t.hard && D[E] > u) {
			const c = u - o, f = 1 + Math.floor((D[E] - c - 1) / u);
			Math.floor((D[E] - 1) / u) < f && C.push(""), k$1(C, a, u);
			continue;
		}
		if (o + D[E] > u && o > 0 && D[E] > 0) {
			if (t.wordWrap === !1 && o < u) {
				k$1(C, a, u);
				continue;
			}
			C.push("");
		}
		if (o + D[E] > u && t.wordWrap === !1) {
			k$1(C, a, u);
			continue;
		}
		C[C.length - 1] += a;
	}
	t.trim !== !1 && (C = C.map((E) => hD(E)));
	const n = [...C.join(`
`)];
	for (const [E, a] of n.entries()) {
		if (F += a, d$1.has(a)) {
			const { groups: c } = new RegExp(`(?:\\${V$1}(?<code>\\d+)m|\\${_$1}(?<uri>.*)${y$1})`).exec(n.slice(E).join("")) || { groups: {} };
			if (c.code !== void 0) {
				const f = Number.parseFloat(c.code);
				s = f === oD ? void 0 : f;
			} else c.uri !== void 0 && (i = c.uri.length === 0 ? void 0 : c.uri);
		}
		const o = ED.codes.get(Number(s));
		n[E + 1] === `
` ? (i && (F += K$1("")), s && o && (F += z(o))) : a === `
` && (s && o && (F += z(s)), i && (F += K$1(i)));
	}
	return F;
};
function Y$1(e, u, t) {
	return String(e).normalize().replace(/\r\n/g, `
`).split(`
`).map((F) => lD(F, u, t)).join(`
`);
}
const B = {
	actions: new Set([
		"up",
		"down",
		"left",
		"right",
		"space",
		"enter",
		"cancel"
	]),
	aliases: new Map([
		["k", "up"],
		["j", "down"],
		["h", "left"],
		["l", "right"],
		["", "cancel"],
		["escape", "cancel"]
	])
};
function $(e, u) {
	if (typeof e == "string") return B.aliases.get(e) === u;
	for (const t of e) if (t !== void 0 && $(t, u)) return !0;
	return !1;
}
function BD(e, u) {
	if (e === u) return;
	const t = e.split(`
`), F = u.split(`
`), s = [];
	for (let i = 0; i < Math.max(t.length, F.length); i++) t[i] !== F[i] && s.push(i);
	return s;
}
const AD = globalThis.process.platform.startsWith("win"), S = Symbol("clack:cancel");
function pD(e) {
	return e === S;
}
function m(e, u) {
	const t = e;
	t.isTTY && t.setRawMode(u);
}
function fD({ input: e = stdin, output: u = stdout, overwrite: t = !0, hideCursor: F = !0 } = {}) {
	const s = g.createInterface({
		input: e,
		output: u,
		prompt: "",
		tabSize: 1
	});
	g.emitKeypressEvents(e, s), e.isTTY && e.setRawMode(!0);
	const i = (D, { name: C, sequence: n }) => {
		if ($([
			String(D),
			C,
			n
		], "cancel")) {
			F && u.write(import_src$1.cursor.show), process.exit(0);
			return;
		}
		if (!t) return;
		const a = C === "return" ? 0 : -1, o = C === "return" ? -1 : 0;
		g.moveCursor(u, a, o, () => {
			g.clearLine(u, 1, () => {
				e.once("keypress", i);
			});
		});
	};
	return F && u.write(import_src$1.cursor.hide), e.once("keypress", i), () => {
		e.off("keypress", i), F && u.write(import_src$1.cursor.show), e.isTTY && !AD && e.setRawMode(!1), s.terminal = !1, s.close();
	};
}
var gD = Object.defineProperty, vD = (e, u, t) => u in e ? gD(e, u, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e[u] = t, h = (e, u, t) => (vD(e, typeof u != "symbol" ? u + "" : u, t), t);
var x$1 = class {
	constructor(u, t = !0) {
		h(this, "input"), h(this, "output"), h(this, "_abortSignal"), h(this, "rl"), h(this, "opts"), h(this, "_render"), h(this, "_track", !1), h(this, "_prevFrame", ""), h(this, "_subscribers", /* @__PURE__ */ new Map()), h(this, "_cursor", 0), h(this, "state", "initial"), h(this, "error", ""), h(this, "value");
		const { input: F = stdin, output: s = stdout, render: i, signal: D, ...C } = u;
		this.opts = C, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = i.bind(this), this._track = t, this._abortSignal = D, this.input = F, this.output = s;
	}
	unsubscribe() {
		this._subscribers.clear();
	}
	setSubscriber(u, t) {
		const F = this._subscribers.get(u) ?? [];
		F.push(t), this._subscribers.set(u, F);
	}
	on(u, t) {
		this.setSubscriber(u, { cb: t });
	}
	once(u, t) {
		this.setSubscriber(u, {
			cb: t,
			once: !0
		});
	}
	emit(u, ...t) {
		const F = this._subscribers.get(u) ?? [], s = [];
		for (const i of F) i.cb(...t), i.once && s.push(() => F.splice(F.indexOf(i), 1));
		for (const i of s) i();
	}
	prompt() {
		return new Promise((u, t) => {
			if (this._abortSignal) {
				if (this._abortSignal.aborted) return this.state = "cancel", this.close(), u(S);
				this._abortSignal.addEventListener("abort", () => {
					this.state = "cancel", this.close();
				}, { once: !0 });
			}
			const F = new Writable();
			F._write = (s, i, D) => {
				this._track && (this.value = this.rl?.line.replace(/\t/g, ""), this._cursor = this.rl?.cursor ?? 0, this.emit("value", this.value)), D();
			}, this.input.pipe(F), this.rl = O.createInterface({
				input: this.input,
				output: F,
				tabSize: 2,
				prompt: "",
				escapeCodeTimeout: 50,
				terminal: !0
			}), O.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), m(this.input, !0), this.output.on("resize", this.render), this.render(), this.once("submit", () => {
				this.output.write(import_src$1.cursor.show), this.output.off("resize", this.render), m(this.input, !1), u(this.value);
			}), this.once("cancel", () => {
				this.output.write(import_src$1.cursor.show), this.output.off("resize", this.render), m(this.input, !1), u(S);
			});
		});
	}
	onKeypress(u, t) {
		if (this.state === "error" && (this.state = "active"), t?.name && (!this._track && B.aliases.has(t.name) && this.emit("cursor", B.aliases.get(t.name)), B.actions.has(t.name) && this.emit("cursor", t.name)), u && (u.toLowerCase() === "y" || u.toLowerCase() === "n") && this.emit("confirm", u.toLowerCase() === "y"), u === "	" && this.opts.placeholder && (this.value || (this.rl?.write(this.opts.placeholder), this.emit("value", this.opts.placeholder))), u && this.emit("key", u.toLowerCase()), t?.name === "return") {
			if (this.opts.validate) {
				const F = this.opts.validate(this.value);
				F && (this.error = F instanceof Error ? F.message : F, this.state = "error", this.rl?.write(this.value));
			}
			this.state !== "error" && (this.state = "submit");
		}
		$([
			u,
			t?.name,
			t?.sequence
		], "cancel") && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
	}
	close() {
		this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), m(this.input, !1), this.rl?.close(), this.rl = void 0, this.emit(`${this.state}`, this.value), this.unsubscribe();
	}
	restoreCursor() {
		const u = Y$1(this._prevFrame, process.stdout.columns, { hard: !0 }).split(`
`).length - 1;
		this.output.write(import_src$1.cursor.move(-999, u * -1));
	}
	render() {
		const u = Y$1(this._render(this) ?? "", process.stdout.columns, { hard: !0 });
		if (u !== this._prevFrame) {
			if (this.state === "initial") this.output.write(import_src$1.cursor.hide);
			else {
				const t = BD(this._prevFrame, u);
				if (this.restoreCursor(), t && t?.length === 1) {
					const F = t[0];
					this.output.write(import_src$1.cursor.move(0, F)), this.output.write(import_src$1.erase.lines(1));
					const s = u.split(`
`);
					this.output.write(s[F]), this._prevFrame = u, this.output.write(import_src$1.cursor.move(0, s.length - F - 1));
					return;
				}
				if (t && t?.length > 1) {
					const F = t[0];
					this.output.write(import_src$1.cursor.move(0, F)), this.output.write(import_src$1.erase.down());
					const s = u.split(`
`).slice(F);
					this.output.write(s.join(`
`)), this._prevFrame = u;
					return;
				}
				this.output.write(import_src$1.erase.down());
			}
			this.output.write(u), this.state === "initial" && (this.state = "active"), this._prevFrame = u;
		}
	}
};
var dD = class extends x$1 {
	get cursor() {
		return this.value ? 0 : 1;
	}
	get _value() {
		return this.cursor === 0;
	}
	constructor(u) {
		super(u, !1), this.value = !!u.initialValue, this.on("value", () => {
			this.value = this._value;
		}), this.on("confirm", (t) => {
			this.output.write(import_src$1.cursor.move(0, -1)), this.value = t, this.state = "submit", this.close();
		}), this.on("cursor", () => {
			this.value = !this.value;
		});
	}
};
var mD = Object.defineProperty, bD = (e, u, t) => u in e ? mD(e, u, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e[u] = t, Z = (e, u, t) => (bD(e, typeof u != "symbol" ? u + "" : u, t), t), q$1 = (e, u, t) => {
	if (!u.has(e)) throw TypeError("Cannot " + t);
}, T$1 = (e, u, t) => (q$1(e, u, "read from private field"), t ? t.call(e) : u.get(e)), wD = (e, u, t) => {
	if (u.has(e)) throw TypeError("Cannot add the same private member more than once");
	u instanceof WeakSet ? u.add(e) : u.set(e, t);
}, yD = (e, u, t, F) => (q$1(e, u, "write to private field"), F ? F.call(e, t) : u.set(e, t), t), A$1;
let _D = class extends x$1 {
	constructor(u) {
		super(u, !1), Z(this, "options"), Z(this, "cursor", 0), wD(this, A$1, void 0);
		const { options: t } = u;
		yD(this, A$1, u.selectableGroups !== !1), this.options = Object.entries(t).flatMap(([F, s]) => [{
			value: F,
			group: !0,
			label: F
		}, ...s.map((i) => ({
			...i,
			group: F
		}))]), this.value = [...u.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: F }) => F === u.cursorAt), T$1(this, A$1) ? 0 : 1), this.on("cursor", (F) => {
			switch (F) {
				case "left":
				case "up": {
					this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
					const s = this.options[this.cursor]?.group === !0;
					!T$1(this, A$1) && s && (this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1);
					break;
				}
				case "down":
				case "right": {
					this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
					const s = this.options[this.cursor]?.group === !0;
					!T$1(this, A$1) && s && (this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1);
					break;
				}
				case "space":
					this.toggleValue();
					break;
			}
		});
	}
	getGroupItems(u) {
		return this.options.filter((t) => t.group === u);
	}
	isGroupSelected(u) {
		return this.getGroupItems(u).every((t) => this.value.includes(t.value));
	}
	toggleValue() {
		const u = this.options[this.cursor];
		if (u.group === !0) {
			const t = u.value, F = this.getGroupItems(t);
			this.isGroupSelected(t) ? this.value = this.value.filter((s) => F.findIndex((i) => i.value === s) === -1) : this.value = [...this.value, ...F.map((s) => s.value)], this.value = Array.from(new Set(this.value));
		} else this.value = this.value.includes(u.value) ? this.value.filter((F) => F !== u.value) : [...this.value, u.value];
	}
};
A$1 = /* @__PURE__ */ new WeakMap();
var kD = Object.defineProperty, $D = (e, u, t) => u in e ? kD(e, u, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e[u] = t, H = (e, u, t) => ($D(e, typeof u != "symbol" ? u + "" : u, t), t);
let SD = class extends x$1 {
	constructor(u) {
		super(u, !1), H(this, "options"), H(this, "cursor", 0), this.options = u.options, this.value = [...u.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: t }) => t === u.cursorAt), 0), this.on("key", (t) => {
			t === "a" && this.toggleAll();
		}), this.on("cursor", (t) => {
			switch (t) {
				case "left":
				case "up":
					this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
					break;
				case "down":
				case "right":
					this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
					break;
				case "space":
					this.toggleValue();
					break;
			}
		});
	}
	get _value() {
		return this.options[this.cursor].value;
	}
	toggleAll() {
		this.value = this.value.length === this.options.length ? [] : this.options.map((t) => t.value);
	}
	toggleValue() {
		this.value = this.value.includes(this._value) ? this.value.filter((t) => t !== this._value) : [...this.value, this._value];
	}
};
Object.defineProperty;
var OD = Object.defineProperty, PD = (e, u, t) => u in e ? OD(e, u, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e[u] = t, J$1 = (e, u, t) => (PD(e, typeof u != "symbol" ? u + "" : u, t), t), LD = class extends x$1 {
	constructor(u) {
		super(u, !1), J$1(this, "options"), J$1(this, "cursor", 0), this.options = u.options, this.cursor = this.options.findIndex(({ value: t }) => t === u.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (t) => {
			switch (t) {
				case "left":
				case "up":
					this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
					break;
				case "down":
				case "right":
					this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
					break;
			}
			this.changeValue();
		});
	}
	get _value() {
		return this.options[this.cursor];
	}
	changeValue() {
		this.value = this._value.value;
	}
};
Object.defineProperty;
var RD = class extends x$1 {
	get valueWithCursor() {
		if (this.state === "submit") return this.value;
		if (this.cursor >= this.value.length) return `${this.value}\u2588`;
		const u = this.value.slice(0, this.cursor), [t, ...F] = this.value.slice(this.cursor);
		return `${u}${import_picocolors.default.inverse(t)}${F.join("")}`;
	}
	get cursor() {
		return this._cursor;
	}
	constructor(u) {
		super(u), this.on("finalize", () => {
			this.value || (this.value = u.defaultValue);
		});
	}
};
function ce() {
	return y.platform !== "win32" ? y.env.TERM !== "linux" : !!y.env.CI || !!y.env.WT_SESSION || !!y.env.TERMINUS_SUBLIME || y.env.ConEmuTask === "{cmd::Cmder}" || y.env.TERM_PROGRAM === "Terminus-Sublime" || y.env.TERM_PROGRAM === "vscode" || y.env.TERM === "xterm-256color" || y.env.TERM === "alacritty" || y.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
const V = ce(), u = (t, n) => V ? t : n, le = u("◆", "*"), L = u("■", "x"), W = u("▲", "x"), C = u("◇", "o"), ue = u("┌", "T"), o = u("│", "|"), d = u("└", "—"), k = u("●", ">"), P = u("○", " "), A = u("◻", "[•]"), T = u("◼", "[+]"), F = u("◻", "[ ]");
u("▪", "•");
const _ = u("─", "-"), me = u("╮", "+"), de = u("├", "+"), pe = u("╯", "+"), q = u("●", "•"), D = u("◆", "*"), U = u("▲", "!"), K = u("■", "x"), b = (t) => {
	switch (t) {
		case "initial":
		case "active": return import_picocolors.default.cyan(le);
		case "cancel": return import_picocolors.default.red(L);
		case "error": return import_picocolors.default.yellow(W);
		case "submit": return import_picocolors.default.green(C);
	}
}, G = (t) => {
	const { cursor: n, options: r, style: i } = t, s = t.maxItems ?? Number.POSITIVE_INFINITY, c = Math.max(process.stdout.rows - 4, 0), a = Math.min(c, Math.max(s, 5));
	let l = 0;
	n >= l + a - 3 ? l = Math.max(Math.min(n - a + 3, r.length - a), 0) : n < l + 2 && (l = Math.max(n - 2, 0));
	const $ = a < r.length && l > 0, g = a < r.length && l + a < r.length;
	return r.slice(l, l + a).map((p, v, f) => {
		const j = v === 0 && $, E = v === f.length - 1 && g;
		return j || E ? import_picocolors.default.dim("...") : i(p, v + l === n);
	});
}, he = (t) => new RD({
	validate: t.validate,
	placeholder: t.placeholder,
	defaultValue: t.defaultValue,
	initialValue: t.initialValue,
	render() {
		const n = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`, r = t.placeholder ? import_picocolors.default.inverse(t.placeholder[0]) + import_picocolors.default.dim(t.placeholder.slice(1)) : import_picocolors.default.inverse(import_picocolors.default.hidden("_")), i = this.value ? this.valueWithCursor : r;
		switch (this.state) {
			case "error": return `${n.trim()}
${import_picocolors.default.yellow(o)}  ${i}
${import_picocolors.default.yellow(d)}  ${import_picocolors.default.yellow(this.error)}
`;
			case "submit": return `${n}${import_picocolors.default.gray(o)}  ${import_picocolors.default.dim(this.value || t.placeholder)}`;
			case "cancel": return `${n}${import_picocolors.default.gray(o)}  ${import_picocolors.default.strikethrough(import_picocolors.default.dim(this.value ?? ""))}${this.value?.trim() ? `
${import_picocolors.default.gray(o)}` : ""}`;
			default: return `${n}${import_picocolors.default.cyan(o)}  ${i}
${import_picocolors.default.cyan(d)}
`;
		}
	}
}).prompt(), ye = (t) => {
	const n = t.active ?? "Yes", r = t.inactive ?? "No";
	return new dD({
		active: n,
		inactive: r,
		initialValue: t.initialValue ?? !0,
		render() {
			const i = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`, s = this.value ? n : r;
			switch (this.state) {
				case "submit": return `${i}${import_picocolors.default.gray(o)}  ${import_picocolors.default.dim(s)}`;
				case "cancel": return `${i}${import_picocolors.default.gray(o)}  ${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}
${import_picocolors.default.gray(o)}`;
				default: return `${i}${import_picocolors.default.cyan(o)}  ${this.value ? `${import_picocolors.default.green(k)} ${n}` : `${import_picocolors.default.dim(P)} ${import_picocolors.default.dim(n)}`} ${import_picocolors.default.dim("/")} ${this.value ? `${import_picocolors.default.dim(P)} ${import_picocolors.default.dim(r)}` : `${import_picocolors.default.green(k)} ${r}`}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, ve = (t) => {
	const n = (r, i) => {
		const s = r.label ?? String(r.value);
		switch (i) {
			case "selected": return `${import_picocolors.default.dim(s)}`;
			case "active": return `${import_picocolors.default.green(k)} ${s} ${r.hint ? import_picocolors.default.dim(`(${r.hint})`) : ""}`;
			case "cancelled": return `${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}`;
			default: return `${import_picocolors.default.dim(P)} ${import_picocolors.default.dim(s)}`;
		}
	};
	return new LD({
		options: t.options,
		initialValue: t.initialValue,
		render() {
			const r = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`;
			switch (this.state) {
				case "submit": return `${r}${import_picocolors.default.gray(o)}  ${n(this.options[this.cursor], "selected")}`;
				case "cancel": return `${r}${import_picocolors.default.gray(o)}  ${n(this.options[this.cursor], "cancelled")}
${import_picocolors.default.gray(o)}`;
				default: return `${r}${import_picocolors.default.cyan(o)}  ${G({
					cursor: this.cursor,
					options: this.options,
					maxItems: t.maxItems,
					style: (i, s) => n(i, s ? "active" : "inactive")
				}).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, fe = (t) => {
	const n = (r, i) => {
		const s = r.label ?? String(r.value);
		return i === "active" ? `${import_picocolors.default.cyan(A)} ${s} ${r.hint ? import_picocolors.default.dim(`(${r.hint})`) : ""}` : i === "selected" ? `${import_picocolors.default.green(T)} ${import_picocolors.default.dim(s)} ${r.hint ? import_picocolors.default.dim(`(${r.hint})`) : ""}` : i === "cancelled" ? `${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}` : i === "active-selected" ? `${import_picocolors.default.green(T)} ${s} ${r.hint ? import_picocolors.default.dim(`(${r.hint})`) : ""}` : i === "submitted" ? `${import_picocolors.default.dim(s)}` : `${import_picocolors.default.dim(F)} ${import_picocolors.default.dim(s)}`;
	};
	return new SD({
		options: t.options,
		initialValues: t.initialValues,
		required: t.required ?? !0,
		cursorAt: t.cursorAt,
		validate(r) {
			if (this.required && r.length === 0) return `Please select at least one option.
${import_picocolors.default.reset(import_picocolors.default.dim(`Press ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" space ")))} to select, ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" enter ")))} to submit`))}`;
		},
		render() {
			const r = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`, i = (s, c) => {
				const a = this.value.includes(s.value);
				return c && a ? n(s, "active-selected") : a ? n(s, "selected") : n(s, c ? "active" : "inactive");
			};
			switch (this.state) {
				case "submit": return `${r}${import_picocolors.default.gray(o)}  ${this.options.filter(({ value: s }) => this.value.includes(s)).map((s) => n(s, "submitted")).join(import_picocolors.default.dim(", ")) || import_picocolors.default.dim("none")}`;
				case "cancel": {
					const s = this.options.filter(({ value: c }) => this.value.includes(c)).map((c) => n(c, "cancelled")).join(import_picocolors.default.dim(", "));
					return `${r}${import_picocolors.default.gray(o)}  ${s.trim() ? `${s}
${import_picocolors.default.gray(o)}` : ""}`;
				}
				case "error": {
					const s = this.error.split(`
`).map((c, a) => a === 0 ? `${import_picocolors.default.yellow(d)}  ${import_picocolors.default.yellow(c)}` : `   ${c}`).join(`
`);
					return `${r + import_picocolors.default.yellow(o)}  ${G({
						options: this.options,
						cursor: this.cursor,
						maxItems: t.maxItems,
						style: i
					}).join(`
${import_picocolors.default.yellow(o)}  `)}
${s}
`;
				}
				default: return `${r}${import_picocolors.default.cyan(o)}  ${G({
					options: this.options,
					cursor: this.cursor,
					maxItems: t.maxItems,
					style: i
				}).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, be = (t) => {
	const { selectableGroups: n = !0 } = t, r = (i, s, c = []) => {
		const a = i.label ?? String(i.value), l = typeof i.group == "string", $ = l && (c[c.indexOf(i) + 1] ?? { group: !0 }), g = l && $.group === !0, p = l ? n ? `${g ? d : o} ` : "  " : "";
		if (s === "active") return `${import_picocolors.default.dim(p)}${import_picocolors.default.cyan(A)} ${a} ${i.hint ? import_picocolors.default.dim(`(${i.hint})`) : ""}`;
		if (s === "group-active") return `${p}${import_picocolors.default.cyan(A)} ${import_picocolors.default.dim(a)}`;
		if (s === "group-active-selected") return `${p}${import_picocolors.default.green(T)} ${import_picocolors.default.dim(a)}`;
		if (s === "selected") {
			const f = l || n ? import_picocolors.default.green(T) : "";
			return `${import_picocolors.default.dim(p)}${f} ${import_picocolors.default.dim(a)} ${i.hint ? import_picocolors.default.dim(`(${i.hint})`) : ""}`;
		}
		if (s === "cancelled") return `${import_picocolors.default.strikethrough(import_picocolors.default.dim(a))}`;
		if (s === "active-selected") return `${import_picocolors.default.dim(p)}${import_picocolors.default.green(T)} ${a} ${i.hint ? import_picocolors.default.dim(`(${i.hint})`) : ""}`;
		if (s === "submitted") return `${import_picocolors.default.dim(a)}`;
		const v = l || n ? import_picocolors.default.dim(F) : "";
		return `${import_picocolors.default.dim(p)}${v} ${import_picocolors.default.dim(a)}`;
	};
	return new _D({
		options: t.options,
		initialValues: t.initialValues,
		required: t.required ?? !0,
		cursorAt: t.cursorAt,
		selectableGroups: n,
		validate(i) {
			if (this.required && i.length === 0) return `Please select at least one option.
${import_picocolors.default.reset(import_picocolors.default.dim(`Press ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" space ")))} to select, ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" enter ")))} to submit`))}`;
		},
		render() {
			const i = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`;
			switch (this.state) {
				case "submit": return `${i}${import_picocolors.default.gray(o)}  ${this.options.filter(({ value: s }) => this.value.includes(s)).map((s) => r(s, "submitted")).join(import_picocolors.default.dim(", "))}`;
				case "cancel": {
					const s = this.options.filter(({ value: c }) => this.value.includes(c)).map((c) => r(c, "cancelled")).join(import_picocolors.default.dim(", "));
					return `${i}${import_picocolors.default.gray(o)}  ${s.trim() ? `${s}
${import_picocolors.default.gray(o)}` : ""}`;
				}
				case "error": {
					const s = this.error.split(`
`).map((c, a) => a === 0 ? `${import_picocolors.default.yellow(d)}  ${import_picocolors.default.yellow(c)}` : `   ${c}`).join(`
`);
					return `${i}${import_picocolors.default.yellow(o)}  ${this.options.map((c, a, l) => {
						const $ = this.value.includes(c.value) || c.group === !0 && this.isGroupSelected(`${c.value}`), g = a === this.cursor;
						return !g && typeof c.group == "string" && this.options[this.cursor].value === c.group ? r(c, $ ? "group-active-selected" : "group-active", l) : g && $ ? r(c, "active-selected", l) : $ ? r(c, "selected", l) : r(c, g ? "active" : "inactive", l);
					}).join(`
${import_picocolors.default.yellow(o)}  `)}
${s}
`;
				}
				default: return `${i}${import_picocolors.default.cyan(o)}  ${this.options.map((s, c, a) => {
					const l = this.value.includes(s.value) || s.group === !0 && this.isGroupSelected(`${s.value}`), $ = c === this.cursor;
					return !$ && typeof s.group == "string" && this.options[this.cursor].value === s.group ? r(s, l ? "group-active-selected" : "group-active", a) : $ && l ? r(s, "active-selected", a) : l ? r(s, "selected", a) : r(s, $ ? "active" : "inactive", a);
				}).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, Me = (t = "", n = "") => {
	const r = `
${t}
`.split(`
`), i = stripVTControlCharacters(n).length, s = Math.max(r.reduce((a, l) => {
		const $ = stripVTControlCharacters(l);
		return $.length > a ? $.length : a;
	}, 0), i) + 2, c = r.map((a) => `${import_picocolors.default.gray(o)}  ${import_picocolors.default.dim(a)}${" ".repeat(s - stripVTControlCharacters(a).length)}${import_picocolors.default.gray(o)}`).join(`
`);
	process.stdout.write(`${import_picocolors.default.gray(o)}
${import_picocolors.default.green(C)}  ${import_picocolors.default.reset(n)} ${import_picocolors.default.gray(_.repeat(Math.max(s - i - 1, 1)) + me)}
${c}
${import_picocolors.default.gray(de + _.repeat(s + 2) + pe)}
`);
}, xe = (t = "") => {
	process.stdout.write(`${import_picocolors.default.gray(d)}  ${import_picocolors.default.red(t)}

`);
}, Ie = (t = "") => {
	process.stdout.write(`${import_picocolors.default.gray(ue)}  ${t}
`);
}, Se = (t = "") => {
	process.stdout.write(`${import_picocolors.default.gray(o)}
${import_picocolors.default.gray(d)}  ${t}

`);
}, M = {
	message: (t = "", { symbol: n = import_picocolors.default.gray(o) } = {}) => {
		const r = [`${import_picocolors.default.gray(o)}`];
		if (t) {
			const [i, ...s] = t.split(`
`);
			r.push(`${n}  ${i}`, ...s.map((c) => `${import_picocolors.default.gray(o)}  ${c}`));
		}
		process.stdout.write(`${r.join(`
`)}
`);
	},
	info: (t) => {
		M.message(t, { symbol: import_picocolors.default.blue(q) });
	},
	success: (t) => {
		M.message(t, { symbol: import_picocolors.default.green(D) });
	},
	step: (t) => {
		M.message(t, { symbol: import_picocolors.default.green(C) });
	},
	warn: (t) => {
		M.message(t, { symbol: import_picocolors.default.yellow(U) });
	},
	warning: (t) => {
		M.warn(t);
	},
	error: (t) => {
		M.message(t, { symbol: import_picocolors.default.red(K) });
	}
}, J = `${import_picocolors.default.gray(o)}  `, x = {
	message: async (t, { symbol: n = import_picocolors.default.gray(o) } = {}) => {
		process.stdout.write(`${import_picocolors.default.gray(o)}
${n}  `);
		let r = 3;
		for await (let i of t) {
			i = i.replace(/\n/g, `
${J}`), i.includes(`
`) && (r = 3 + stripVTControlCharacters(i.slice(i.lastIndexOf(`
`))).length);
			const s = stripVTControlCharacters(i).length;
			r + s < process.stdout.columns ? (r += s, process.stdout.write(i)) : (process.stdout.write(`
${J}${i.trimStart()}`), r = 3 + stripVTControlCharacters(i.trimStart()).length);
		}
		process.stdout.write(`
`);
	},
	info: (t) => x.message(t, { symbol: import_picocolors.default.blue(q) }),
	success: (t) => x.message(t, { symbol: import_picocolors.default.green(D) }),
	step: (t) => x.message(t, { symbol: import_picocolors.default.green(C) }),
	warn: (t) => x.message(t, { symbol: import_picocolors.default.yellow(U) }),
	warning: (t) => x.warn(t),
	error: (t) => x.message(t, { symbol: import_picocolors.default.red(K) })
}, Y = ({ indicator: t = "dots" } = {}) => {
	const n = V ? [
		"◒",
		"◐",
		"◓",
		"◑"
	] : [
		"•",
		"o",
		"O",
		"0"
	], r = V ? 80 : 120, i = process.env.CI === "true";
	let s, c, a = !1, l = "", $, g = performance.now();
	const p = (m) => {
		a && N(m > 1 ? "Something went wrong" : "Canceled", m);
	}, v = () => p(2), f = () => p(1), j = () => {
		process.on("uncaughtExceptionMonitor", v), process.on("unhandledRejection", v), process.on("SIGINT", f), process.on("SIGTERM", f), process.on("exit", p);
	}, E = () => {
		process.removeListener("uncaughtExceptionMonitor", v), process.removeListener("unhandledRejection", v), process.removeListener("SIGINT", f), process.removeListener("SIGTERM", f), process.removeListener("exit", p);
	}, B = () => {
		if ($ === void 0) return;
		i && process.stdout.write(`
`);
		const m = $.split(`
`);
		process.stdout.write(import_src$1.cursor.move(-999, m.length - 1)), process.stdout.write(import_src$1.erase.down(m.length));
	}, R = (m) => m.replace(/\.+$/, ""), O = (m) => {
		const h = (performance.now() - m) / 1e3, w = Math.floor(h / 60), I = Math.floor(h % 60);
		return w > 0 ? `[${w}m ${I}s]` : `[${I}s]`;
	}, H = (m = "") => {
		a = !0, s = fD(), l = R(m), g = performance.now(), process.stdout.write(`${import_picocolors.default.gray(o)}
`);
		let h = 0, w = 0;
		j(), c = setInterval(() => {
			if (i && l === $) return;
			B(), $ = l;
			const I = import_picocolors.default.magenta(n[h]);
			if (i) process.stdout.write(`${I}  ${l}...`);
			else if (t === "timer") process.stdout.write(`${I}  ${l} ${O(g)}`);
			else {
				const z = ".".repeat(Math.floor(w)).slice(0, 3);
				process.stdout.write(`${I}  ${l}${z}`);
			}
			h = h + 1 < n.length ? h + 1 : 0, w = w < n.length ? w + .125 : 0;
		}, r);
	}, N = (m = "", h = 0) => {
		a = !1, clearInterval(c), B();
		const w = h === 0 ? import_picocolors.default.green(C) : h === 1 ? import_picocolors.default.red(L) : import_picocolors.default.red(W);
		l = R(m ?? l), t === "timer" ? process.stdout.write(`${w}  ${l} ${O(g)}
`) : process.stdout.write(`${w}  ${l}
`), E(), s();
	};
	return {
		start: H,
		stop: N,
		message: (m = "") => {
			l = R(m ?? l);
		}
	};
};
var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var s = 1e3;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;
	module.exports = function(val, options) {
		options = options || {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		else if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	function parse(str) {
		str = String(str);
		if (str.length > 100) return;
		var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
		if (!match) return;
		var n = parseFloat(match[1]);
		switch ((match[2] || "ms").toLowerCase()) {
			case "years":
			case "year":
			case "yrs":
			case "yr":
			case "y": return n * y;
			case "weeks":
			case "week":
			case "w": return n * w;
			case "days":
			case "day":
			case "d": return n * d;
			case "hours":
			case "hour":
			case "hrs":
			case "hr":
			case "h": return n * h;
			case "minutes":
			case "minute":
			case "mins":
			case "min":
			case "m": return n * m;
			case "seconds":
			case "second":
			case "secs":
			case "sec":
			case "s": return n * s;
			case "milliseconds":
			case "millisecond":
			case "msecs":
			case "msec":
			case "ms": return n;
			default: return;
		}
	}
	function fmtShort(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return Math.round(ms / d) + "d";
		if (msAbs >= h) return Math.round(ms / h) + "h";
		if (msAbs >= m) return Math.round(ms / m) + "m";
		if (msAbs >= s) return Math.round(ms / s) + "s";
		return ms + "ms";
	}
	function fmtLong(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return plural(ms, msAbs, d, "day");
		if (msAbs >= h) return plural(ms, msAbs, h, "hour");
		if (msAbs >= m) return plural(ms, msAbs, m, "minute");
		if (msAbs >= s) return plural(ms, msAbs, s, "second");
		return ms + " ms";
	}
	function plural(ms, msAbs, n, name) {
		var isPlural = msAbs >= n * 1.5;
		return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
	}
}));
var require_common = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = require_ms();
		createDebug.destroy = destroy;
		Object.keys(env).forEach((key) => {
			createDebug[key] = env[key];
		});
		createDebug.names = [];
		createDebug.skips = [];
		createDebug.formatters = {};
		function selectColor(namespace) {
			let hash = 0;
			for (let i = 0; i < namespace.length; i++) {
				hash = (hash << 5) - hash + namespace.charCodeAt(i);
				hash |= 0;
			}
			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;
			function debug(...args) {
				if (!debug.enabled) return;
				const self = debug;
				const curr = Number(/* @__PURE__ */ new Date());
				self.diff = curr - (prevTime || curr);
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;
				args[0] = createDebug.coerce(args[0]);
				if (typeof args[0] !== "string") args.unshift("%O");
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					if (match === "%%") return "%";
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === "function") {
						const val = args[index];
						match = formatter.call(self, val);
						args.splice(index, 1);
						index--;
					}
					return match;
				});
				createDebug.formatArgs.call(self, args);
				(self.log || createDebug.log).apply(self, args);
			}
			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy;
			Object.defineProperty(debug, "enabled", {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) return enableOverride;
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}
					return enabledCache;
				},
				set: (v) => {
					enableOverride = v;
				}
			});
			if (typeof createDebug.init === "function") createDebug.init(debug);
			return debug;
		}
		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;
			createDebug.names = [];
			createDebug.skips = [];
			const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
			for (const ns of split) if (ns[0] === "-") createDebug.skips.push(ns.slice(1));
			else createDebug.names.push(ns);
		}
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;
			while (searchIndex < search.length) if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) if (template[templateIndex] === "*") {
				starIndex = templateIndex;
				matchIndex = searchIndex;
				templateIndex++;
			} else {
				searchIndex++;
				templateIndex++;
			}
			else if (starIndex !== -1) {
				templateIndex = starIndex + 1;
				matchIndex++;
				searchIndex = matchIndex;
			} else return false;
			while (templateIndex < template.length && template[templateIndex] === "*") templateIndex++;
			return templateIndex === template.length;
		}
		function disable() {
			const namespaces = [...createDebug.names, ...createDebug.skips.map((namespace) => "-" + namespace)].join(",");
			createDebug.enable("");
			return namespaces;
		}
		function enabled(name) {
			for (const skip of createDebug.skips) if (matchesTemplate(name, skip)) return false;
			for (const ns of createDebug.names) if (matchesTemplate(name, ns)) return true;
			return false;
		}
		function coerce(val) {
			if (val instanceof Error) return val.stack || val.message;
			return val;
		}
		function destroy() {
			console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
		}
		createDebug.enable(createDebug.load());
		return createDebug;
	}
	module.exports = setup;
}));
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = localstorage();
	exports.destroy = (() => {
		let warned = false;
		return () => {
			if (!warned) {
				warned = true;
				console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
			}
		};
	})();
	exports.colors = [
		"#0000CC",
		"#0000FF",
		"#0033CC",
		"#0033FF",
		"#0066CC",
		"#0066FF",
		"#0099CC",
		"#0099FF",
		"#00CC00",
		"#00CC33",
		"#00CC66",
		"#00CC99",
		"#00CCCC",
		"#00CCFF",
		"#3300CC",
		"#3300FF",
		"#3333CC",
		"#3333FF",
		"#3366CC",
		"#3366FF",
		"#3399CC",
		"#3399FF",
		"#33CC00",
		"#33CC33",
		"#33CC66",
		"#33CC99",
		"#33CCCC",
		"#33CCFF",
		"#6600CC",
		"#6600FF",
		"#6633CC",
		"#6633FF",
		"#66CC00",
		"#66CC33",
		"#9900CC",
		"#9900FF",
		"#9933CC",
		"#9933FF",
		"#99CC00",
		"#99CC33",
		"#CC0000",
		"#CC0033",
		"#CC0066",
		"#CC0099",
		"#CC00CC",
		"#CC00FF",
		"#CC3300",
		"#CC3333",
		"#CC3366",
		"#CC3399",
		"#CC33CC",
		"#CC33FF",
		"#CC6600",
		"#CC6633",
		"#CC9900",
		"#CC9933",
		"#CCCC00",
		"#CCCC33",
		"#FF0000",
		"#FF0033",
		"#FF0066",
		"#FF0099",
		"#FF00CC",
		"#FF00FF",
		"#FF3300",
		"#FF3333",
		"#FF3366",
		"#FF3399",
		"#FF33CC",
		"#FF33FF",
		"#FF6600",
		"#FF6633",
		"#FF9900",
		"#FF9933",
		"#FFCC00",
		"#FFCC33"
	];
	function useColors() {
		if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
		if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
		let m;
		return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	function formatArgs(args) {
		args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
		if (!this.useColors) return;
		const c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		let index = 0;
		let lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, (match) => {
			if (match === "%%") return;
			index++;
			if (match === "%c") lastC = index;
		});
		args.splice(lastC, 0, c);
	}
	exports.log = console.debug || console.log || (() => {});
	function save(namespaces) {
		try {
			if (namespaces) exports.storage.setItem("debug", namespaces);
			else exports.storage.removeItem("debug");
		} catch (error) {}
	}
	function load() {
		let r;
		try {
			r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
		} catch (error) {}
		if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
		return r;
	}
	function localstorage() {
		try {
			return localStorage;
		} catch (error) {}
	}
	module.exports = require_common()(exports);
	const { formatters } = module.exports;
	formatters.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return "[UnexpectedJSONParseError]: " + error.message;
		}
	};
}));
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const tty = __require("tty");
	const util = __require("util");
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.destroy = util.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
	exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	try {
		const supportsColor = __require("supports-color");
		if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	} catch (error) {}
	exports.inspectOpts = Object.keys(process.env).filter((key) => {
		return /^debug_/i.test(key);
	}).reduce((obj, key) => {
		const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});
		let val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
		else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
		else if (val === "null") val = null;
		else val = Number(val);
		obj[prop] = val;
		return obj;
	}, {});
	function useColors() {
		return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
	}
	function formatArgs(args) {
		const { namespace: name, useColors } = this;
		if (useColors) {
			const c = this.color;
			const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
			const prefix = `  ${colorCode};1m${name} \u001B[0m`;
			args[0] = prefix + args[0].split("\n").join("\n" + prefix);
			args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = getDate() + name + " " + args[0];
	}
	function getDate() {
		if (exports.inspectOpts.hideDate) return "";
		return (/* @__PURE__ */ new Date()).toISOString() + " ";
	}
	function log(...args) {
		return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
	}
	function save(namespaces) {
		if (namespaces) process.env.DEBUG = namespaces;
		else delete process.env.DEBUG;
	}
	function load() {
		return process.env.DEBUG;
	}
	function init(debug) {
		debug.inspectOpts = {};
		const keys = Object.keys(exports.inspectOpts);
		for (let i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	module.exports = require_common()(exports);
	const { formatters } = module.exports;
	formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
	};
	formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts);
	};
}));
var require_src$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = require_browser();
	else module.exports = require_node();
}));
var require_src = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const fs_1 = __require("fs");
	const log = __importDefault(require_src$1()).default("@kwsites/file-exists");
	function check(path, isFile, isDirectory) {
		log(`checking %s`, path);
		try {
			const stat = fs_1.statSync(path);
			if (stat.isFile() && isFile) {
				log(`[OK] path represents a file`);
				return true;
			}
			if (stat.isDirectory() && isDirectory) {
				log(`[OK] path represents a directory`);
				return true;
			}
			log(`[FAIL] path represents something other than a file or directory`);
			return false;
		} catch (e) {
			if (e.code === "ENOENT") {
				log(`[FAIL] path is not accessible: %o`, e);
				return false;
			}
			log(`[FATAL] %o`, e);
			throw e;
		}
	}
	function exists(path, type = exports.READABLE) {
		return check(path, (type & exports.FILE) > 0, (type & exports.FOLDER) > 0);
	}
	exports.exists = exists;
	exports.FILE = 1;
	exports.FOLDER = 2;
	exports.READABLE = exports.FILE + exports.FOLDER;
}));
var require_dist$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(require_src());
}));
var require_dist$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createDeferred = exports.deferred = void 0;
	function deferred() {
		let done;
		let fail;
		let status = "pending";
		return {
			promise: new Promise((_done, _fail) => {
				done = _done;
				fail = _fail;
			}),
			done(result) {
				if (status === "pending") {
					status = "resolved";
					done(result);
				}
			},
			fail(error) {
				if (status === "pending") {
					status = "rejected";
					fail(error);
				}
			},
			get fulfilled() {
				return status !== "pending";
			},
			get status() {
				return status;
			}
		};
	}
	exports.deferred = deferred;
	exports.createDeferred = deferred;
}));
var import_dist = require_dist$2();
var import_src = /* @__PURE__ */ __toESM(require_src$1(), 1);
var import_dist$1 = require_dist$1();
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
	return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
function pathspec(...paths) {
	const key = new String(paths);
	cache.set(key, paths);
	return key;
}
function isPathSpec(path) {
	return path instanceof String && cache.has(path);
}
function toPaths(pathSpec) {
	return cache.get(pathSpec) || [];
}
var cache;
var init_pathspec = __esm({ "src/lib/args/pathspec.ts"() {
	"use strict";
	cache = /* @__PURE__ */ new WeakMap();
} });
var GitError;
var init_git_error = __esm({ "src/lib/errors/git-error.ts"() {
	"use strict";
	GitError = class extends Error {
		constructor(task, message) {
			super(message);
			this.task = task;
			Object.setPrototypeOf(this, new.target.prototype);
		}
	};
} });
var GitResponseError;
var init_git_response_error = __esm({ "src/lib/errors/git-response-error.ts"() {
	"use strict";
	init_git_error();
	GitResponseError = class extends GitError {
		constructor(git, message) {
			super(void 0, message || String(git));
			this.git = git;
		}
	};
} });
var TaskConfigurationError;
var init_task_configuration_error = __esm({ "src/lib/errors/task-configuration-error.ts"() {
	"use strict";
	init_git_error();
	TaskConfigurationError = class extends GitError {
		constructor(message) {
			super(void 0, message);
		}
	};
} });
function asFunction(source) {
	if (typeof source !== "function") return NOOP;
	return source;
}
function isUserFunction(source) {
	return typeof source === "function" && source !== NOOP;
}
function splitOn(input, char) {
	const index = input.indexOf(char);
	if (index <= 0) return [input, ""];
	return [input.substr(0, index), input.substr(index + 1)];
}
function first(input, offset = 0) {
	return isArrayLike(input) && input.length > offset ? input[offset] : void 0;
}
function last(input, offset = 0) {
	if (isArrayLike(input) && input.length > offset) return input[input.length - 1 - offset];
}
function isArrayLike(input) {
	return filterHasLength(input);
}
function toLinesWithContent(input = "", trimmed2 = true, separator = "\n") {
	return input.split(separator).reduce((output, line) => {
		const lineContent = trimmed2 ? line.trim() : line;
		if (lineContent) output.push(lineContent);
		return output;
	}, []);
}
function forEachLineWithContent(input, callback) {
	return toLinesWithContent(input, true).map((line) => callback(line));
}
function folderExists(path) {
	return (0, import_dist.exists)(path, import_dist.FOLDER);
}
function append(target, item) {
	if (Array.isArray(target)) {
		if (!target.includes(item)) target.push(item);
	} else target.add(item);
	return item;
}
function including(target, item) {
	if (Array.isArray(target) && !target.includes(item)) target.push(item);
	return target;
}
function remove(target, item) {
	if (Array.isArray(target)) {
		const index = target.indexOf(item);
		if (index >= 0) target.splice(index, 1);
	} else target.delete(item);
	return item;
}
function asArray(source) {
	return Array.isArray(source) ? source : [source];
}
function asCamelCase(str) {
	return str.replace(/[\s-]+(.)/g, (_all, chr) => {
		return chr.toUpperCase();
	});
}
function asStringArray(source) {
	return asArray(source).map((item) => {
		return item instanceof String ? item : String(item);
	});
}
function asNumber(source, onNaN = 0) {
	if (source == null) return onNaN;
	const num = parseInt(source, 10);
	return Number.isNaN(num) ? onNaN : num;
}
function prefixedArray(input, prefix) {
	const output = [];
	for (let i = 0, max = input.length; i < max; i++) output.push(prefix, input[i]);
	return output;
}
function bufferToString(input) {
	return (Array.isArray(input) ? Buffer$1.concat(input) : input).toString("utf-8");
}
function pick(source, properties) {
	const out = {};
	properties.forEach((key) => {
		if (source[key] !== void 0) out[key] = source[key];
	});
	return out;
}
function delay(duration = 0) {
	return new Promise((done) => setTimeout(done, duration));
}
function orVoid(input) {
	if (input === false) return;
	return input;
}
var NULL, NOOP, objectToString;
var init_util = __esm({ "src/lib/utils/util.ts"() {
	"use strict";
	init_argument_filters();
	NULL = "\0";
	NOOP = () => {};
	objectToString = Object.prototype.toString.call.bind(Object.prototype.toString);
} });
function filterType(input, filter, def) {
	if (filter(input)) return input;
	return arguments.length > 2 ? def : void 0;
}
function filterPrimitives(input, omit) {
	const type = isPathSpec(input) ? "string" : typeof input;
	return /number|string|boolean/.test(type) && (!omit || !omit.includes(type));
}
function filterPlainObject(input) {
	return !!input && objectToString(input) === "[object Object]";
}
function filterFunction(input) {
	return typeof input === "function";
}
var filterArray, filterNumber, filterString, filterStringOrStringArray, filterHasLength;
var init_argument_filters = __esm({ "src/lib/utils/argument-filters.ts"() {
	"use strict";
	init_pathspec();
	init_util();
	filterArray = (input) => {
		return Array.isArray(input);
	};
	filterNumber = (input) => {
		return typeof input === "number";
	};
	filterString = (input) => {
		return typeof input === "string";
	};
	filterStringOrStringArray = (input) => {
		return filterString(input) || Array.isArray(input) && input.every(filterString);
	};
	filterHasLength = (input) => {
		if (input == null || "number|boolean|function".includes(typeof input)) return false;
		return typeof input.length === "number";
	};
} });
var ExitCodes;
var init_exit_codes = __esm({ "src/lib/utils/exit-codes.ts"() {
	"use strict";
	ExitCodes = /* @__PURE__ */ ((ExitCodes2) => {
		ExitCodes2[ExitCodes2["SUCCESS"] = 0] = "SUCCESS";
		ExitCodes2[ExitCodes2["ERROR"] = 1] = "ERROR";
		ExitCodes2[ExitCodes2["NOT_FOUND"] = -2] = "NOT_FOUND";
		ExitCodes2[ExitCodes2["UNCLEAN"] = 128] = "UNCLEAN";
		return ExitCodes2;
	})(ExitCodes || {});
} });
var GitOutputStreams;
var init_git_output_streams = __esm({ "src/lib/utils/git-output-streams.ts"() {
	"use strict";
	GitOutputStreams = class _GitOutputStreams {
		constructor(stdOut, stdErr) {
			this.stdOut = stdOut;
			this.stdErr = stdErr;
		}
		asStrings() {
			return new _GitOutputStreams(this.stdOut.toString("utf8"), this.stdErr.toString("utf8"));
		}
	};
} });
function useMatchesDefault() {
	throw new Error(`LineParser:useMatches not implemented`);
}
var LineParser, RemoteLineParser;
var init_line_parser = __esm({ "src/lib/utils/line-parser.ts"() {
	"use strict";
	LineParser = class {
		constructor(regExp, useMatches) {
			this.matches = [];
			this.useMatches = useMatchesDefault;
			this.parse = (line, target) => {
				this.resetMatches();
				if (!this._regExp.every((reg, index) => this.addMatch(reg, index, line(index)))) return false;
				return this.useMatches(target, this.prepareMatches()) !== false;
			};
			this._regExp = Array.isArray(regExp) ? regExp : [regExp];
			if (useMatches) this.useMatches = useMatches;
		}
		resetMatches() {
			this.matches.length = 0;
		}
		prepareMatches() {
			return this.matches;
		}
		addMatch(reg, index, line) {
			const matched = line && reg.exec(line);
			if (matched) this.pushMatch(index, matched);
			return !!matched;
		}
		pushMatch(_index, matched) {
			this.matches.push(...matched.slice(1));
		}
	};
	RemoteLineParser = class extends LineParser {
		addMatch(reg, index, line) {
			return /^remote:\s/.test(String(line)) && super.addMatch(reg, index, line);
		}
		pushMatch(index, matched) {
			if (index > 0 || matched.length > 1) super.pushMatch(index, matched);
		}
	};
} });
function createInstanceConfig(...options) {
	const baseDir = process.cwd();
	const config = Object.assign({
		baseDir,
		...defaultOptions
	}, ...options.filter((o) => typeof o === "object" && o));
	config.baseDir = config.baseDir || baseDir;
	config.trimmed = config.trimmed === true;
	return config;
}
var defaultOptions;
var init_simple_git_options = __esm({ "src/lib/utils/simple-git-options.ts"() {
	"use strict";
	defaultOptions = {
		binary: "git",
		maxConcurrentProcesses: 5,
		config: [],
		trimmed: false
	};
} });
function appendTaskOptions(options, commands = []) {
	if (!filterPlainObject(options)) return commands;
	return Object.keys(options).reduce((commands2, key) => {
		const value = options[key];
		if (isPathSpec(value)) commands2.push(value);
		else if (filterPrimitives(value, ["boolean"])) commands2.push(key + "=" + value);
		else if (Array.isArray(value)) {
			for (const v of value) if (!filterPrimitives(v, ["string", "number"])) commands2.push(key + "=" + v);
		} else commands2.push(key);
		return commands2;
	}, commands);
}
function getTrailingOptions(args, initialPrimitive = 0, objectOnly = false) {
	const command = [];
	for (let i = 0, max = initialPrimitive < 0 ? args.length : initialPrimitive; i < max; i++) if ("string|number".includes(typeof args[i])) command.push(String(args[i]));
	appendTaskOptions(trailingOptionsArgument(args), command);
	if (!objectOnly) command.push(...trailingArrayArgument(args));
	return command;
}
function trailingArrayArgument(args) {
	return asStringArray(filterType(last(args, typeof last(args) === "function" ? 1 : 0), filterArray, []));
}
function trailingOptionsArgument(args) {
	return filterType(last(args, filterFunction(last(args)) ? 1 : 0), filterPlainObject);
}
function trailingFunctionArgument(args, includeNoop = true) {
	const callback = asFunction(last(args));
	return includeNoop || isUserFunction(callback) ? callback : void 0;
}
var init_task_options = __esm({ "src/lib/utils/task-options.ts"() {
	"use strict";
	init_argument_filters();
	init_util();
	init_pathspec();
} });
function callTaskParser(parser4, streams) {
	return parser4(streams.stdOut, streams.stdErr);
}
function parseStringResponse(result, parsers12, texts, trim = true) {
	asArray(texts).forEach((text) => {
		for (let lines = toLinesWithContent(text, trim), i = 0, max = lines.length; i < max; i++) {
			const line = (offset = 0) => {
				if (i + offset >= max) return;
				return lines[i + offset];
			};
			parsers12.some(({ parse }) => parse(line, result));
		}
	});
	return result;
}
var init_task_parser = __esm({ "src/lib/utils/task-parser.ts"() {
	"use strict";
	init_util();
} });
var utils_exports = {};
__export(utils_exports, {
	ExitCodes: () => ExitCodes,
	GitOutputStreams: () => GitOutputStreams,
	LineParser: () => LineParser,
	NOOP: () => NOOP,
	NULL: () => NULL,
	RemoteLineParser: () => RemoteLineParser,
	append: () => append,
	appendTaskOptions: () => appendTaskOptions,
	asArray: () => asArray,
	asCamelCase: () => asCamelCase,
	asFunction: () => asFunction,
	asNumber: () => asNumber,
	asStringArray: () => asStringArray,
	bufferToString: () => bufferToString,
	callTaskParser: () => callTaskParser,
	createInstanceConfig: () => createInstanceConfig,
	delay: () => delay,
	filterArray: () => filterArray,
	filterFunction: () => filterFunction,
	filterHasLength: () => filterHasLength,
	filterNumber: () => filterNumber,
	filterPlainObject: () => filterPlainObject,
	filterPrimitives: () => filterPrimitives,
	filterString: () => filterString,
	filterStringOrStringArray: () => filterStringOrStringArray,
	filterType: () => filterType,
	first: () => first,
	folderExists: () => folderExists,
	forEachLineWithContent: () => forEachLineWithContent,
	getTrailingOptions: () => getTrailingOptions,
	including: () => including,
	isUserFunction: () => isUserFunction,
	last: () => last,
	objectToString: () => objectToString,
	orVoid: () => orVoid,
	parseStringResponse: () => parseStringResponse,
	pick: () => pick,
	prefixedArray: () => prefixedArray,
	remove: () => remove,
	splitOn: () => splitOn,
	toLinesWithContent: () => toLinesWithContent,
	trailingFunctionArgument: () => trailingFunctionArgument,
	trailingOptionsArgument: () => trailingOptionsArgument
});
var init_utils = __esm({ "src/lib/utils/index.ts"() {
	"use strict";
	init_argument_filters();
	init_exit_codes();
	init_git_output_streams();
	init_line_parser();
	init_simple_git_options();
	init_task_options();
	init_task_parser();
	init_util();
} });
var check_is_repo_exports = {};
__export(check_is_repo_exports, {
	CheckRepoActions: () => CheckRepoActions,
	checkIsBareRepoTask: () => checkIsBareRepoTask,
	checkIsRepoRootTask: () => checkIsRepoRootTask,
	checkIsRepoTask: () => checkIsRepoTask
});
function checkIsRepoTask(action) {
	switch (action) {
		case "bare": return checkIsBareRepoTask();
		case "root": return checkIsRepoRootTask();
	}
	return {
		commands: ["rev-parse", "--is-inside-work-tree"],
		format: "utf-8",
		onError,
		parser
	};
}
function checkIsRepoRootTask() {
	return {
		commands: ["rev-parse", "--git-dir"],
		format: "utf-8",
		onError,
		parser(path) {
			return /^\.(git)?$/.test(path.trim());
		}
	};
}
function checkIsBareRepoTask() {
	return {
		commands: ["rev-parse", "--is-bare-repository"],
		format: "utf-8",
		onError,
		parser
	};
}
function isNotRepoMessage(error) {
	return /(Not a git repository|Kein Git-Repository)/i.test(String(error));
}
var CheckRepoActions, onError, parser;
var init_check_is_repo = __esm({ "src/lib/tasks/check-is-repo.ts"() {
	"use strict";
	init_utils();
	CheckRepoActions = /* @__PURE__ */ ((CheckRepoActions2) => {
		CheckRepoActions2["BARE"] = "bare";
		CheckRepoActions2["IN_TREE"] = "tree";
		CheckRepoActions2["IS_REPO_ROOT"] = "root";
		return CheckRepoActions2;
	})(CheckRepoActions || {});
	onError = ({ exitCode }, error, done, fail) => {
		if (exitCode === 128 && isNotRepoMessage(error)) return done(Buffer.from("false"));
		fail(error);
	};
	parser = (text) => {
		return text.trim() === "true";
	};
} });
function cleanSummaryParser(dryRun, text) {
	const summary = new CleanResponse(dryRun);
	const regexp = dryRun ? dryRunRemovalRegexp : removalRegexp;
	toLinesWithContent(text).forEach((line) => {
		const removed = line.replace(regexp, "");
		summary.paths.push(removed);
		(isFolderRegexp.test(removed) ? summary.folders : summary.files).push(removed);
	});
	return summary;
}
var CleanResponse, removalRegexp, dryRunRemovalRegexp, isFolderRegexp;
var init_CleanSummary = __esm({ "src/lib/responses/CleanSummary.ts"() {
	"use strict";
	init_utils();
	CleanResponse = class {
		constructor(dryRun) {
			this.dryRun = dryRun;
			this.paths = [];
			this.files = [];
			this.folders = [];
		}
	};
	removalRegexp = /^[a-z]+\s*/i;
	dryRunRemovalRegexp = /^[a-z]+\s+[a-z]+\s*/i;
	isFolderRegexp = /\/$/;
} });
var task_exports = {};
__export(task_exports, {
	EMPTY_COMMANDS: () => EMPTY_COMMANDS,
	adhocExecTask: () => adhocExecTask,
	configurationErrorTask: () => configurationErrorTask,
	isBufferTask: () => isBufferTask,
	isEmptyTask: () => isEmptyTask,
	straightThroughBufferTask: () => straightThroughBufferTask,
	straightThroughStringTask: () => straightThroughStringTask
});
function adhocExecTask(parser4) {
	return {
		commands: EMPTY_COMMANDS,
		format: "empty",
		parser: parser4
	};
}
function configurationErrorTask(error) {
	return {
		commands: EMPTY_COMMANDS,
		format: "empty",
		parser() {
			throw typeof error === "string" ? new TaskConfigurationError(error) : error;
		}
	};
}
function straightThroughStringTask(commands, trimmed2 = false) {
	return {
		commands,
		format: "utf-8",
		parser(text) {
			return trimmed2 ? String(text).trim() : text;
		}
	};
}
function straightThroughBufferTask(commands) {
	return {
		commands,
		format: "buffer",
		parser(buffer) {
			return buffer;
		}
	};
}
function isBufferTask(task) {
	return task.format === "buffer";
}
function isEmptyTask(task) {
	return task.format === "empty" || !task.commands.length;
}
var EMPTY_COMMANDS;
var init_task = __esm({ "src/lib/tasks/task.ts"() {
	"use strict";
	init_task_configuration_error();
	EMPTY_COMMANDS = [];
} });
var clean_exports = {};
__export(clean_exports, {
	CONFIG_ERROR_INTERACTIVE_MODE: () => CONFIG_ERROR_INTERACTIVE_MODE,
	CONFIG_ERROR_MODE_REQUIRED: () => CONFIG_ERROR_MODE_REQUIRED,
	CONFIG_ERROR_UNKNOWN_OPTION: () => CONFIG_ERROR_UNKNOWN_OPTION,
	CleanOptions: () => CleanOptions,
	cleanTask: () => cleanTask,
	cleanWithOptionsTask: () => cleanWithOptionsTask,
	isCleanOptionsArray: () => isCleanOptionsArray
});
function cleanWithOptionsTask(mode, customArgs) {
	const { cleanMode, options, valid } = getCleanOptions(mode);
	if (!cleanMode) return configurationErrorTask(CONFIG_ERROR_MODE_REQUIRED);
	if (!valid.options) return configurationErrorTask(CONFIG_ERROR_UNKNOWN_OPTION + JSON.stringify(mode));
	options.push(...customArgs);
	if (options.some(isInteractiveMode)) return configurationErrorTask(CONFIG_ERROR_INTERACTIVE_MODE);
	return cleanTask(cleanMode, options);
}
function cleanTask(mode, customArgs) {
	return {
		commands: [
			"clean",
			`-${mode}`,
			...customArgs
		],
		format: "utf-8",
		parser(text) {
			return cleanSummaryParser(mode === "n", text);
		}
	};
}
function isCleanOptionsArray(input) {
	return Array.isArray(input) && input.every((test) => CleanOptionValues.has(test));
}
function getCleanOptions(input) {
	let cleanMode;
	let options = [];
	let valid = {
		cleanMode: false,
		options: true
	};
	input.replace(/[^a-z]i/g, "").split("").forEach((char) => {
		if (isCleanMode(char)) {
			cleanMode = char;
			valid.cleanMode = true;
		} else valid.options = valid.options && isKnownOption(options[options.length] = `-${char}`);
	});
	return {
		cleanMode,
		options,
		valid
	};
}
function isCleanMode(cleanMode) {
	return cleanMode === "f" || cleanMode === "n";
}
function isKnownOption(option) {
	return /^-[a-z]$/i.test(option) && CleanOptionValues.has(option.charAt(1));
}
function isInteractiveMode(option) {
	if (/^-[^\-]/.test(option)) return option.indexOf("i") > 0;
	return option === "--interactive";
}
var CONFIG_ERROR_INTERACTIVE_MODE, CONFIG_ERROR_MODE_REQUIRED, CONFIG_ERROR_UNKNOWN_OPTION, CleanOptions, CleanOptionValues;
var init_clean = __esm({ "src/lib/tasks/clean.ts"() {
	"use strict";
	init_CleanSummary();
	init_utils();
	init_task();
	CONFIG_ERROR_INTERACTIVE_MODE = "Git clean interactive mode is not supported";
	CONFIG_ERROR_MODE_REQUIRED = "Git clean mode parameter (\"n\" or \"f\") is required";
	CONFIG_ERROR_UNKNOWN_OPTION = "Git clean unknown option found in: ";
	CleanOptions = /* @__PURE__ */ ((CleanOptions2) => {
		CleanOptions2["DRY_RUN"] = "n";
		CleanOptions2["FORCE"] = "f";
		CleanOptions2["IGNORED_INCLUDED"] = "x";
		CleanOptions2["IGNORED_ONLY"] = "X";
		CleanOptions2["EXCLUDING"] = "e";
		CleanOptions2["QUIET"] = "q";
		CleanOptions2["RECURSIVE"] = "d";
		return CleanOptions2;
	})(CleanOptions || {});
	CleanOptionValues = /* @__PURE__ */ new Set(["i", ...asStringArray(Object.values(CleanOptions))]);
} });
function configListParser(text) {
	const config = new ConfigList();
	for (const item of configParser(text)) config.addValue(item.file, String(item.key), item.value);
	return config;
}
function configGetParser(text, key) {
	let value = null;
	const values = [];
	const scopes = /* @__PURE__ */ new Map();
	for (const item of configParser(text, key)) {
		if (item.key !== key) continue;
		values.push(value = item.value);
		if (!scopes.has(item.file)) scopes.set(item.file, []);
		scopes.get(item.file).push(value);
	}
	return {
		key,
		paths: Array.from(scopes.keys()),
		scopes,
		value,
		values
	};
}
function configFilePath(filePath) {
	return filePath.replace(/^(file):/, "");
}
function* configParser(text, requestedKey = null) {
	const lines = text.split("\0");
	for (let i = 0, max = lines.length - 1; i < max;) {
		const file = configFilePath(lines[i++]);
		let value = lines[i++];
		let key = requestedKey;
		if (value.includes("\n")) {
			const line = splitOn(value, "\n");
			key = line[0];
			value = line[1];
		}
		yield {
			file,
			key,
			value
		};
	}
}
var ConfigList;
var init_ConfigList = __esm({ "src/lib/responses/ConfigList.ts"() {
	"use strict";
	init_utils();
	ConfigList = class {
		constructor() {
			this.files = [];
			this.values = /* @__PURE__ */ Object.create(null);
		}
		get all() {
			if (!this._all) this._all = this.files.reduce((all, file) => {
				return Object.assign(all, this.values[file]);
			}, {});
			return this._all;
		}
		addFile(file) {
			if (!(file in this.values)) {
				const latest = last(this.files);
				this.values[file] = latest ? Object.create(this.values[latest]) : {};
				this.files.push(file);
			}
			return this.values[file];
		}
		addValue(file, key, value) {
			const values = this.addFile(file);
			if (!Object.hasOwn(values, key)) values[key] = value;
			else if (Array.isArray(values[key])) values[key].push(value);
			else values[key] = [values[key], value];
			this._all = void 0;
		}
	};
} });
function asConfigScope(scope, fallback) {
	if (typeof scope === "string" && Object.hasOwn(GitConfigScope, scope)) return scope;
	return fallback;
}
function addConfigTask(key, value, append2, scope) {
	const commands = ["config", `--${scope}`];
	if (append2) commands.push("--add");
	commands.push(key, value);
	return {
		commands,
		format: "utf-8",
		parser(text) {
			return text;
		}
	};
}
function getConfigTask(key, scope) {
	const commands = [
		"config",
		"--null",
		"--show-origin",
		"--get-all",
		key
	];
	if (scope) commands.splice(1, 0, `--${scope}`);
	return {
		commands,
		format: "utf-8",
		parser(text) {
			return configGetParser(text, key);
		}
	};
}
function listConfigTask(scope) {
	const commands = [
		"config",
		"--list",
		"--show-origin",
		"--null"
	];
	if (scope) commands.push(`--${scope}`);
	return {
		commands,
		format: "utf-8",
		parser(text) {
			return configListParser(text);
		}
	};
}
function config_default() {
	return {
		addConfig(key, value, ...rest) {
			return this._runTask(addConfigTask(key, value, rest[0] === true, asConfigScope(rest[1], "local")), trailingFunctionArgument(arguments));
		},
		getConfig(key, scope) {
			return this._runTask(getConfigTask(key, asConfigScope(scope, void 0)), trailingFunctionArgument(arguments));
		},
		listConfig(...rest) {
			return this._runTask(listConfigTask(asConfigScope(rest[0], void 0)), trailingFunctionArgument(arguments));
		}
	};
}
var GitConfigScope;
var init_config = __esm({ "src/lib/tasks/config.ts"() {
	"use strict";
	init_ConfigList();
	init_utils();
	GitConfigScope = /* @__PURE__ */ ((GitConfigScope2) => {
		GitConfigScope2["system"] = "system";
		GitConfigScope2["global"] = "global";
		GitConfigScope2["local"] = "local";
		GitConfigScope2["worktree"] = "worktree";
		return GitConfigScope2;
	})(GitConfigScope || {});
} });
function isDiffNameStatus(input) {
	return diffNameStatus.has(input);
}
var DiffNameStatus, diffNameStatus;
var init_diff_name_status = __esm({ "src/lib/tasks/diff-name-status.ts"() {
	"use strict";
	DiffNameStatus = /* @__PURE__ */ ((DiffNameStatus2) => {
		DiffNameStatus2["ADDED"] = "A";
		DiffNameStatus2["COPIED"] = "C";
		DiffNameStatus2["DELETED"] = "D";
		DiffNameStatus2["MODIFIED"] = "M";
		DiffNameStatus2["RENAMED"] = "R";
		DiffNameStatus2["CHANGED"] = "T";
		DiffNameStatus2["UNMERGED"] = "U";
		DiffNameStatus2["UNKNOWN"] = "X";
		DiffNameStatus2["BROKEN"] = "B";
		return DiffNameStatus2;
	})(DiffNameStatus || {});
	diffNameStatus = new Set(Object.values(DiffNameStatus));
} });
function grepQueryBuilder(...params) {
	return new GrepQuery().param(...params);
}
function parseGrep(grep) {
	const paths = /* @__PURE__ */ new Set();
	const results = {};
	forEachLineWithContent(grep, (input) => {
		const [path, line, preview] = input.split(NULL);
		paths.add(path);
		(results[path] = results[path] || []).push({
			line: asNumber(line),
			path,
			preview
		});
	});
	return {
		paths,
		results
	};
}
function grep_default() {
	return { grep(searchTerm) {
		const then = trailingFunctionArgument(arguments);
		const options = getTrailingOptions(arguments);
		for (const option of disallowedOptions) if (options.includes(option)) return this._runTask(configurationErrorTask(`git.grep: use of "${option}" is not supported.`), then);
		if (typeof searchTerm === "string") searchTerm = grepQueryBuilder().param(searchTerm);
		const commands = [
			"grep",
			"--null",
			"-n",
			"--full-name",
			...options,
			...searchTerm
		];
		return this._runTask({
			commands,
			format: "utf-8",
			parser(stdOut) {
				return parseGrep(stdOut);
			}
		}, then);
	} };
}
var disallowedOptions, Query, _a, GrepQuery;
var init_grep = __esm({ "src/lib/tasks/grep.ts"() {
	"use strict";
	init_utils();
	init_task();
	disallowedOptions = ["-h"];
	Query = Symbol("grepQuery");
	GrepQuery = class {
		constructor() {
			this[_a] = [];
		}
		*[(_a = Query, Symbol.iterator)]() {
			for (const query of this[Query]) yield query;
		}
		and(...and) {
			and.length && this[Query].push("--and", "(", ...prefixedArray(and, "-e"), ")");
			return this;
		}
		param(...param) {
			this[Query].push(...prefixedArray(param, "-e"));
			return this;
		}
	};
} });
var reset_exports = {};
__export(reset_exports, {
	ResetMode: () => ResetMode,
	getResetMode: () => getResetMode,
	resetTask: () => resetTask
});
function resetTask(mode, customArgs) {
	const commands = ["reset"];
	if (isValidResetMode(mode)) commands.push(`--${mode}`);
	commands.push(...customArgs);
	return straightThroughStringTask(commands);
}
function getResetMode(mode) {
	if (isValidResetMode(mode)) return mode;
	switch (typeof mode) {
		case "string":
		case "undefined": return "soft";
	}
}
function isValidResetMode(mode) {
	return typeof mode === "string" && validResetModes.includes(mode);
}
var ResetMode, validResetModes;
var init_reset = __esm({ "src/lib/tasks/reset.ts"() {
	"use strict";
	init_utils();
	init_task();
	ResetMode = /* @__PURE__ */ ((ResetMode2) => {
		ResetMode2["MIXED"] = "mixed";
		ResetMode2["SOFT"] = "soft";
		ResetMode2["HARD"] = "hard";
		ResetMode2["MERGE"] = "merge";
		ResetMode2["KEEP"] = "keep";
		return ResetMode2;
	})(ResetMode || {});
	validResetModes = asStringArray(Object.values(ResetMode));
} });
function createLog() {
	return (0, import_src.default)("simple-git");
}
function prefixedLogger(to, prefix, forward) {
	if (!prefix || !String(prefix).replace(/\s*/, "")) return !forward ? to : (message, ...args) => {
		to(message, ...args);
		forward(message, ...args);
	};
	return (message, ...args) => {
		to(`%s ${message}`, prefix, ...args);
		if (forward) forward(message, ...args);
	};
}
function childLoggerName(name, childDebugger, { namespace: parentNamespace }) {
	if (typeof name === "string") return name;
	const childNamespace = childDebugger && childDebugger.namespace || "";
	if (childNamespace.startsWith(parentNamespace)) return childNamespace.substr(parentNamespace.length + 1);
	return childNamespace || parentNamespace;
}
function createLogger(label, verbose, initialStep, infoDebugger = createLog()) {
	const labelPrefix = label && `[${label}]` || "";
	const spawned = [];
	const debugDebugger = typeof verbose === "string" ? infoDebugger.extend(verbose) : verbose;
	const key = childLoggerName(filterType(verbose, filterString), debugDebugger, infoDebugger);
	return step(initialStep);
	function sibling(name, initial) {
		return append(spawned, createLogger(label, key.replace(/^[^:]+/, name), initial, infoDebugger));
	}
	function step(phase) {
		const stepPrefix = phase && `[${phase}]` || "";
		const debug2 = debugDebugger && prefixedLogger(debugDebugger, stepPrefix) || NOOP;
		const info = prefixedLogger(infoDebugger, `${labelPrefix} ${stepPrefix}`, debug2);
		return Object.assign(debugDebugger ? debug2 : info, {
			label,
			sibling,
			info,
			step
		});
	}
}
var init_git_logger = __esm({ "src/lib/git-logger.ts"() {
	"use strict";
	init_utils();
	import_src.default.formatters.L = (value) => String(filterHasLength(value) ? value.length : "-");
	import_src.default.formatters.B = (value) => {
		if (Buffer.isBuffer(value)) return value.toString("utf8");
		return objectToString(value);
	};
} });
var TasksPendingQueue;
var init_tasks_pending_queue = __esm({ "src/lib/runners/tasks-pending-queue.ts"() {
	"use strict";
	init_git_error();
	init_git_logger();
	TasksPendingQueue = class _TasksPendingQueue {
		constructor(logLabel = "GitExecutor") {
			this.logLabel = logLabel;
			this._queue = /* @__PURE__ */ new Map();
		}
		withProgress(task) {
			return this._queue.get(task);
		}
		createProgress(task) {
			const name = _TasksPendingQueue.getName(task.commands[0]);
			return {
				task,
				logger: createLogger(this.logLabel, name),
				name
			};
		}
		push(task) {
			const progress = this.createProgress(task);
			progress.logger("Adding task to the queue, commands = %o", task.commands);
			this._queue.set(task, progress);
			return progress;
		}
		fatal(err) {
			for (const [task, { logger }] of Array.from(this._queue.entries())) {
				if (task === err.task) {
					logger.info(`Failed %o`, err);
					logger(`Fatal exception, any as-yet un-started tasks run through this executor will not be attempted`);
				} else logger.info(`A fatal exception occurred in a previous task, the queue has been purged: %o`, err.message);
				this.complete(task);
			}
			if (this._queue.size !== 0) throw new Error(`Queue size should be zero after fatal: ${this._queue.size}`);
		}
		complete(task) {
			if (this.withProgress(task)) this._queue.delete(task);
		}
		attempt(task) {
			const progress = this.withProgress(task);
			if (!progress) throw new GitError(void 0, "TasksPendingQueue: attempt called for an unknown task");
			progress.logger("Starting task");
			return progress;
		}
		static getName(name = "empty") {
			return `task:${name}:${++_TasksPendingQueue.counter}`;
		}
		static {
			this.counter = 0;
		}
	};
} });
function pluginContext(task, commands) {
	return {
		method: first(task.commands) || "",
		commands
	};
}
function onErrorReceived(target, logger) {
	return (err) => {
		logger(`[ERROR] child process exception %o`, err);
		target.push(Buffer.from(String(err.stack), "ascii"));
	};
}
function onDataReceived(target, name, logger, output) {
	return (buffer) => {
		logger(`%s received %L bytes`, name, buffer);
		output(`%B`, buffer);
		target.push(buffer);
	};
}
var GitExecutorChain;
var init_git_executor_chain = __esm({ "src/lib/runners/git-executor-chain.ts"() {
	"use strict";
	init_git_error();
	init_task();
	init_utils();
	init_tasks_pending_queue();
	GitExecutorChain = class {
		constructor(_executor, _scheduler, _plugins) {
			this._executor = _executor;
			this._scheduler = _scheduler;
			this._plugins = _plugins;
			this._chain = Promise.resolve();
			this._queue = new TasksPendingQueue();
		}
		get cwd() {
			return this._cwd || this._executor.cwd;
		}
		set cwd(cwd) {
			this._cwd = cwd;
		}
		get env() {
			return this._executor.env;
		}
		get outputHandler() {
			return this._executor.outputHandler;
		}
		chain() {
			return this;
		}
		push(task) {
			this._queue.push(task);
			return this._chain = this._chain.then(() => this.attemptTask(task));
		}
		async attemptTask(task) {
			const onScheduleComplete = await this._scheduler.next();
			const onQueueComplete = () => this._queue.complete(task);
			try {
				const { logger } = this._queue.attempt(task);
				return await (isEmptyTask(task) ? this.attemptEmptyTask(task, logger) : this.attemptRemoteTask(task, logger));
			} catch (e) {
				throw this.onFatalException(task, e);
			} finally {
				onQueueComplete();
				onScheduleComplete();
			}
		}
		onFatalException(task, e) {
			const gitError = e instanceof GitError ? Object.assign(e, { task }) : new GitError(task, e && String(e));
			this._chain = Promise.resolve();
			this._queue.fatal(gitError);
			return gitError;
		}
		async attemptRemoteTask(task, logger) {
			const binary = this._plugins.exec("spawn.binary", "", pluginContext(task, task.commands));
			const args = this._plugins.exec("spawn.args", [...task.commands], pluginContext(task, task.commands));
			const raw = await this.gitResponse(task, binary, args, this.outputHandler, logger.step("SPAWN"));
			const outputStreams = await this.handleTaskData(task, args, raw, logger.step("HANDLE"));
			logger(`passing response to task's parser as a %s`, task.format);
			if (isBufferTask(task)) return callTaskParser(task.parser, outputStreams);
			return callTaskParser(task.parser, outputStreams.asStrings());
		}
		async attemptEmptyTask(task, logger) {
			logger(`empty task bypassing child process to call to task's parser`);
			return task.parser(this);
		}
		handleTaskData(task, args, result, logger) {
			const { exitCode, rejection, stdOut, stdErr } = result;
			return new Promise((done, fail) => {
				logger(`Preparing to handle process response exitCode=%d stdOut=`, exitCode);
				const { error } = this._plugins.exec("task.error", { error: rejection }, {
					...pluginContext(task, args),
					...result
				});
				if (error && task.onError) {
					logger.info(`exitCode=%s handling with custom error handler`);
					return task.onError(result, error, (newStdOut) => {
						logger.info(`custom error handler treated as success`);
						logger(`custom error returned a %s`, objectToString(newStdOut));
						done(new GitOutputStreams(Array.isArray(newStdOut) ? Buffer.concat(newStdOut) : newStdOut, Buffer.concat(stdErr)));
					}, fail);
				}
				if (error) {
					logger.info(`handling as error: exitCode=%s stdErr=%s rejection=%o`, exitCode, stdErr.length, rejection);
					return fail(error);
				}
				logger.info(`retrieving task output complete`);
				done(new GitOutputStreams(Buffer.concat(stdOut), Buffer.concat(stdErr)));
			});
		}
		async gitResponse(task, command, args, outputHandler, logger) {
			const outputLogger = logger.sibling("output");
			const spawnOptions = this._plugins.exec("spawn.options", {
				cwd: this.cwd,
				env: this.env,
				windowsHide: true
			}, pluginContext(task, task.commands));
			return new Promise((done) => {
				const stdOut = [];
				const stdErr = [];
				logger.info(`%s %o`, command, args);
				logger("%O", spawnOptions);
				let rejection = this._beforeSpawn(task, args);
				if (rejection) return done({
					stdOut,
					stdErr,
					exitCode: 9901,
					rejection
				});
				this._plugins.exec("spawn.before", void 0, {
					...pluginContext(task, args),
					kill(reason) {
						rejection = reason || rejection;
					}
				});
				const spawned = spawn(command, args, spawnOptions);
				spawned.stdout.on("data", onDataReceived(stdOut, "stdOut", logger, outputLogger.step("stdOut")));
				spawned.stderr.on("data", onDataReceived(stdErr, "stdErr", logger, outputLogger.step("stdErr")));
				spawned.on("error", onErrorReceived(stdErr, logger));
				if (outputHandler) {
					logger(`Passing child process stdOut/stdErr to custom outputHandler`);
					outputHandler(command, spawned.stdout, spawned.stderr, [...args]);
				}
				this._plugins.exec("spawn.after", void 0, {
					...pluginContext(task, args),
					spawned,
					close(exitCode, reason) {
						done({
							stdOut,
							stdErr,
							exitCode,
							rejection: rejection || reason
						});
					},
					kill(reason) {
						if (spawned.killed) return;
						rejection = reason;
						spawned.kill("SIGINT");
					}
				});
			});
		}
		_beforeSpawn(task, args) {
			let rejection;
			this._plugins.exec("spawn.before", void 0, {
				...pluginContext(task, args),
				kill(reason) {
					rejection = reason || rejection;
				}
			});
			return rejection;
		}
	};
} });
var git_executor_exports = {};
__export(git_executor_exports, { GitExecutor: () => GitExecutor });
var GitExecutor;
var init_git_executor = __esm({ "src/lib/runners/git-executor.ts"() {
	"use strict";
	init_git_executor_chain();
	GitExecutor = class {
		constructor(cwd, _scheduler, _plugins) {
			this.cwd = cwd;
			this._scheduler = _scheduler;
			this._plugins = _plugins;
			this._chain = new GitExecutorChain(this, this._scheduler, this._plugins);
		}
		chain() {
			return new GitExecutorChain(this, this._scheduler, this._plugins);
		}
		push(task) {
			return this._chain.push(task);
		}
	};
} });
function taskCallback(task, response, callback = NOOP) {
	const onSuccess = (data) => {
		callback(null, data);
	};
	const onError2 = (err) => {
		if (err?.task === task) callback(err instanceof GitResponseError ? addDeprecationNoticeToError(err) : err, void 0);
	};
	response.then(onSuccess, onError2);
}
function addDeprecationNoticeToError(err) {
	let log = (name) => {
		console.warn(`simple-git deprecation notice: accessing GitResponseError.${name} should be GitResponseError.git.${name}, this will no longer be available in version 3`);
		log = NOOP;
	};
	return Object.create(err, Object.getOwnPropertyNames(err.git).reduce(descriptorReducer, {}));
	function descriptorReducer(all, name) {
		if (name in err) return all;
		all[name] = {
			enumerable: false,
			configurable: false,
			get() {
				log(name);
				return err.git[name];
			}
		};
		return all;
	}
}
var init_task_callback = __esm({ "src/lib/task-callback.ts"() {
	"use strict";
	init_git_response_error();
	init_utils();
} });
function changeWorkingDirectoryTask(directory, root) {
	return adhocExecTask((instance) => {
		if (!folderExists(directory)) throw new Error(`Git.cwd: cannot change to non-directory "${directory}"`);
		return (root || instance).cwd = directory;
	});
}
var init_change_working_directory = __esm({ "src/lib/tasks/change-working-directory.ts"() {
	"use strict";
	init_utils();
	init_task();
} });
function checkoutTask(args) {
	const commands = ["checkout", ...args];
	if (commands[1] === "-b" && commands.includes("-B")) commands[1] = remove(commands, "-B");
	return straightThroughStringTask(commands);
}
function checkout_default() {
	return {
		checkout() {
			return this._runTask(checkoutTask(getTrailingOptions(arguments, 1)), trailingFunctionArgument(arguments));
		},
		checkoutBranch(branchName, startPoint) {
			return this._runTask(checkoutTask([
				"-b",
				branchName,
				startPoint,
				...getTrailingOptions(arguments)
			]), trailingFunctionArgument(arguments));
		},
		checkoutLocalBranch(branchName) {
			return this._runTask(checkoutTask([
				"-b",
				branchName,
				...getTrailingOptions(arguments)
			]), trailingFunctionArgument(arguments));
		}
	};
}
var init_checkout = __esm({ "src/lib/tasks/checkout.ts"() {
	"use strict";
	init_utils();
	init_task();
} });
function countObjectsResponse() {
	return {
		count: 0,
		garbage: 0,
		inPack: 0,
		packs: 0,
		prunePackable: 0,
		size: 0,
		sizeGarbage: 0,
		sizePack: 0
	};
}
function count_objects_default() {
	return { countObjects() {
		return this._runTask({
			commands: ["count-objects", "--verbose"],
			format: "utf-8",
			parser(stdOut) {
				return parseStringResponse(countObjectsResponse(), [parser2], stdOut);
			}
		});
	} };
}
var parser2;
var init_count_objects = __esm({ "src/lib/tasks/count-objects.ts"() {
	"use strict";
	init_utils();
	parser2 = new LineParser(/([a-z-]+): (\d+)$/, (result, [key, value]) => {
		const property = asCamelCase(key);
		if (Object.hasOwn(result, property)) result[property] = asNumber(value);
	});
} });
function parseCommitResult(stdOut) {
	return parseStringResponse({
		author: null,
		branch: "",
		commit: "",
		root: false,
		summary: {
			changes: 0,
			insertions: 0,
			deletions: 0
		}
	}, parsers, stdOut);
}
var parsers;
var init_parse_commit = __esm({ "src/lib/parsers/parse-commit.ts"() {
	"use strict";
	init_utils();
	parsers = [
		new LineParser(/^\[([^\s]+)( \([^)]+\))? ([^\]]+)/, (result, [branch, root, commit]) => {
			result.branch = branch;
			result.commit = commit;
			result.root = !!root;
		}),
		new LineParser(/\s*Author:\s(.+)/i, (result, [author]) => {
			const parts = author.split("<");
			const email = parts.pop();
			if (!email || !email.includes("@")) return;
			result.author = {
				email: email.substr(0, email.length - 1),
				name: parts.join("<").trim()
			};
		}),
		new LineParser(/(\d+)[^,]*(?:,\s*(\d+)[^,]*)(?:,\s*(\d+))/g, (result, [changes, insertions, deletions]) => {
			result.summary.changes = parseInt(changes, 10) || 0;
			result.summary.insertions = parseInt(insertions, 10) || 0;
			result.summary.deletions = parseInt(deletions, 10) || 0;
		}),
		new LineParser(/^(\d+)[^,]*(?:,\s*(\d+)[^(]+\(([+-]))?/, (result, [changes, lines, direction]) => {
			result.summary.changes = parseInt(changes, 10) || 0;
			const count = parseInt(lines, 10) || 0;
			if (direction === "-") result.summary.deletions = count;
			else if (direction === "+") result.summary.insertions = count;
		})
	];
} });
function commitTask(message, files, customArgs) {
	return {
		commands: [
			"-c",
			"core.abbrev=40",
			"commit",
			...prefixedArray(message, "-m"),
			...files,
			...customArgs
		],
		format: "utf-8",
		parser: parseCommitResult
	};
}
function commit_default() {
	return { commit(message, ...rest) {
		const next = trailingFunctionArgument(arguments);
		const task = rejectDeprecatedSignatures(message) || commitTask(asArray(message), asArray(filterType(rest[0], filterStringOrStringArray, [])), [...asStringArray(filterType(rest[1], filterArray, [])), ...getTrailingOptions(arguments, 0, true)]);
		return this._runTask(task, next);
	} };
	function rejectDeprecatedSignatures(message) {
		return !filterStringOrStringArray(message) && configurationErrorTask(`git.commit: requires the commit message to be supplied as a string/string[]`);
	}
}
var init_commit = __esm({ "src/lib/tasks/commit.ts"() {
	"use strict";
	init_parse_commit();
	init_utils();
	init_task();
} });
function first_commit_default() {
	return { firstCommit() {
		return this._runTask(straightThroughStringTask([
			"rev-list",
			"--max-parents=0",
			"HEAD"
		], true), trailingFunctionArgument(arguments));
	} };
}
var init_first_commit = __esm({ "src/lib/tasks/first-commit.ts"() {
	"use strict";
	init_utils();
	init_task();
} });
function hashObjectTask(filePath, write) {
	const commands = ["hash-object", filePath];
	if (write) commands.push("-w");
	return straightThroughStringTask(commands, true);
}
var init_hash_object = __esm({ "src/lib/tasks/hash-object.ts"() {
	"use strict";
	init_task();
} });
function parseInit(bare, path, text) {
	const response = String(text).trim();
	let result;
	if (result = initResponseRegex.exec(response)) return new InitSummary(bare, path, false, result[1]);
	if (result = reInitResponseRegex.exec(response)) return new InitSummary(bare, path, true, result[1]);
	let gitDir = "";
	const tokens = response.split(" ");
	while (tokens.length) if (tokens.shift() === "in") {
		gitDir = tokens.join(" ");
		break;
	}
	return new InitSummary(bare, path, /^re/i.test(response), gitDir);
}
var InitSummary, initResponseRegex, reInitResponseRegex;
var init_InitSummary = __esm({ "src/lib/responses/InitSummary.ts"() {
	"use strict";
	InitSummary = class {
		constructor(bare, path, existing, gitDir) {
			this.bare = bare;
			this.path = path;
			this.existing = existing;
			this.gitDir = gitDir;
		}
	};
	initResponseRegex = /^Init.+ repository in (.+)$/;
	reInitResponseRegex = /^Rein.+ in (.+)$/;
} });
function hasBareCommand(command) {
	return command.includes(bareCommand);
}
function initTask(bare = false, path, customArgs) {
	const commands = ["init", ...customArgs];
	if (bare && !hasBareCommand(commands)) commands.splice(1, 0, bareCommand);
	return {
		commands,
		format: "utf-8",
		parser(text) {
			return parseInit(commands.includes("--bare"), path, text);
		}
	};
}
var bareCommand;
var init_init = __esm({ "src/lib/tasks/init.ts"() {
	"use strict";
	init_InitSummary();
	bareCommand = "--bare";
} });
function logFormatFromCommand(customArgs) {
	for (let i = 0; i < customArgs.length; i++) {
		const format = logFormatRegex.exec(customArgs[i]);
		if (format) return `--${format[1]}`;
	}
	return "";
}
function isLogFormat(customArg) {
	return logFormatRegex.test(customArg);
}
var logFormatRegex;
var init_log_format = __esm({ "src/lib/args/log-format.ts"() {
	"use strict";
	logFormatRegex = /^--(stat|numstat|name-only|name-status)(=|$)/;
} });
var DiffSummary;
var init_DiffSummary = __esm({ "src/lib/responses/DiffSummary.ts"() {
	"use strict";
	DiffSummary = class {
		constructor() {
			this.changed = 0;
			this.deletions = 0;
			this.insertions = 0;
			this.files = [];
		}
	};
} });
function getDiffParser(format = "") {
	const parser4 = diffSummaryParsers[format];
	return (stdOut) => parseStringResponse(new DiffSummary(), parser4, stdOut, false);
}
var statParser, numStatParser, nameOnlyParser, nameStatusParser, diffSummaryParsers;
var init_parse_diff_summary = __esm({ "src/lib/parsers/parse-diff-summary.ts"() {
	"use strict";
	init_log_format();
	init_DiffSummary();
	init_diff_name_status();
	init_utils();
	statParser = [
		new LineParser(/^(.+)\s+\|\s+(\d+)(\s+[+\-]+)?$/, (result, [file, changes, alterations = ""]) => {
			result.files.push({
				file: file.trim(),
				changes: asNumber(changes),
				insertions: alterations.replace(/[^+]/g, "").length,
				deletions: alterations.replace(/[^-]/g, "").length,
				binary: false
			});
		}),
		new LineParser(/^(.+) \|\s+Bin ([0-9.]+) -> ([0-9.]+) ([a-z]+)/, (result, [file, before, after]) => {
			result.files.push({
				file: file.trim(),
				before: asNumber(before),
				after: asNumber(after),
				binary: true
			});
		}),
		new LineParser(/(\d+) files? changed\s*((?:, \d+ [^,]+){0,2})/, (result, [changed, summary]) => {
			const inserted = /(\d+) i/.exec(summary);
			const deleted = /(\d+) d/.exec(summary);
			result.changed = asNumber(changed);
			result.insertions = asNumber(inserted?.[1]);
			result.deletions = asNumber(deleted?.[1]);
		})
	];
	numStatParser = [new LineParser(/(\d+)\t(\d+)\t(.+)$/, (result, [changesInsert, changesDelete, file]) => {
		const insertions = asNumber(changesInsert);
		const deletions = asNumber(changesDelete);
		result.changed++;
		result.insertions += insertions;
		result.deletions += deletions;
		result.files.push({
			file,
			changes: insertions + deletions,
			insertions,
			deletions,
			binary: false
		});
	}), new LineParser(/-\t-\t(.+)$/, (result, [file]) => {
		result.changed++;
		result.files.push({
			file,
			after: 0,
			before: 0,
			binary: true
		});
	})];
	nameOnlyParser = [new LineParser(/(.+)$/, (result, [file]) => {
		result.changed++;
		result.files.push({
			file,
			changes: 0,
			insertions: 0,
			deletions: 0,
			binary: false
		});
	})];
	nameStatusParser = [new LineParser(/([ACDMRTUXB])([0-9]{0,3})\t(.[^\t]*)(\t(.[^\t]*))?$/, (result, [status, similarity, from, _to, to]) => {
		result.changed++;
		result.files.push({
			file: to ?? from,
			changes: 0,
			insertions: 0,
			deletions: 0,
			binary: false,
			status: orVoid(isDiffNameStatus(status) && status),
			from: orVoid(!!to && from !== to && from),
			similarity: asNumber(similarity)
		});
	})];
	diffSummaryParsers = {
		[""]: statParser,
		["--stat"]: statParser,
		["--numstat"]: numStatParser,
		["--name-status"]: nameStatusParser,
		["--name-only"]: nameOnlyParser
	};
} });
function lineBuilder(tokens, fields) {
	return fields.reduce((line, field, index) => {
		line[field] = tokens[index] || "";
		return line;
	}, /* @__PURE__ */ Object.create({ diff: null }));
}
function createListLogSummaryParser(splitter = SPLITTER, fields = defaultFieldNames, logFormat = "") {
	const parseDiffResult = getDiffParser(logFormat);
	return function(stdOut) {
		const all = toLinesWithContent(stdOut.trim(), false, START_BOUNDARY).map(function(item) {
			const lineDetail = item.split(COMMIT_BOUNDARY);
			const listLogLine = lineBuilder(lineDetail[0].split(splitter), fields);
			if (lineDetail.length > 1 && !!lineDetail[1].trim()) listLogLine.diff = parseDiffResult(lineDetail[1]);
			return listLogLine;
		});
		return {
			all,
			latest: all.length && all[0] || null,
			total: all.length
		};
	};
}
var START_BOUNDARY, COMMIT_BOUNDARY, SPLITTER, defaultFieldNames;
var init_parse_list_log_summary = __esm({ "src/lib/parsers/parse-list-log-summary.ts"() {
	"use strict";
	init_utils();
	init_parse_diff_summary();
	init_log_format();
	START_BOUNDARY = "òòòòòò ";
	COMMIT_BOUNDARY = " òò";
	SPLITTER = " ò ";
	defaultFieldNames = [
		"hash",
		"date",
		"message",
		"refs",
		"author_name",
		"author_email"
	];
} });
var diff_exports = {};
__export(diff_exports, {
	diffSummaryTask: () => diffSummaryTask,
	validateLogFormatConfig: () => validateLogFormatConfig
});
function diffSummaryTask(customArgs) {
	let logFormat = logFormatFromCommand(customArgs);
	const commands = ["diff"];
	if (logFormat === "") {
		logFormat = "--stat";
		commands.push("--stat=4096");
	}
	commands.push(...customArgs);
	return validateLogFormatConfig(commands) || {
		commands,
		format: "utf-8",
		parser: getDiffParser(logFormat)
	};
}
function validateLogFormatConfig(customArgs) {
	const flags = customArgs.filter(isLogFormat);
	if (flags.length > 1) return configurationErrorTask(`Summary flags are mutually exclusive - pick one of ${flags.join(",")}`);
	if (flags.length && customArgs.includes("-z")) return configurationErrorTask(`Summary flag ${flags} parsing is not compatible with null termination option '-z'`);
}
var init_diff = __esm({ "src/lib/tasks/diff.ts"() {
	"use strict";
	init_log_format();
	init_parse_diff_summary();
	init_task();
} });
function prettyFormat(format, splitter) {
	const fields = [];
	const formatStr = [];
	Object.keys(format).forEach((field) => {
		fields.push(field);
		formatStr.push(String(format[field]));
	});
	return [fields, formatStr.join(splitter)];
}
function userOptions(input) {
	return Object.keys(input).reduce((out, key) => {
		if (!(key in excludeOptions)) out[key] = input[key];
		return out;
	}, {});
}
function parseLogOptions(opt = {}, customArgs = []) {
	const splitter = filterType(opt.splitter, filterString, SPLITTER);
	const [fields, formatStr] = prettyFormat(filterPlainObject(opt.format) ? opt.format : {
		hash: "%H",
		date: opt.strictDate === false ? "%ai" : "%aI",
		message: "%s",
		refs: "%D",
		body: opt.multiLine ? "%B" : "%b",
		author_name: opt.mailMap !== false ? "%aN" : "%an",
		author_email: opt.mailMap !== false ? "%aE" : "%ae"
	}, splitter);
	const suffix = [];
	const command = [`--pretty=format:${START_BOUNDARY}${formatStr}${COMMIT_BOUNDARY}`, ...customArgs];
	const maxCount = opt.n || opt["max-count"] || opt.maxCount;
	if (maxCount) command.push(`--max-count=${maxCount}`);
	if (opt.from || opt.to) {
		const rangeOperator = opt.symmetric !== false ? "..." : "..";
		suffix.push(`${opt.from || ""}${rangeOperator}${opt.to || ""}`);
	}
	if (filterString(opt.file)) command.push("--follow", pathspec(opt.file));
	appendTaskOptions(userOptions(opt), command);
	return {
		fields,
		splitter,
		commands: [...command, ...suffix]
	};
}
function logTask(splitter, fields, customArgs) {
	const parser4 = createListLogSummaryParser(splitter, fields, logFormatFromCommand(customArgs));
	return {
		commands: ["log", ...customArgs],
		format: "utf-8",
		parser: parser4
	};
}
function log_default() {
	return { log(...rest) {
		const next = trailingFunctionArgument(arguments);
		const options = parseLogOptions(trailingOptionsArgument(arguments), asStringArray(filterType(arguments[0], filterArray, [])));
		const task = rejectDeprecatedSignatures(...rest) || validateLogFormatConfig(options.commands) || createLogTask(options);
		return this._runTask(task, next);
	} };
	function createLogTask(options) {
		return logTask(options.splitter, options.fields, options.commands);
	}
	function rejectDeprecatedSignatures(from, to) {
		return filterString(from) && filterString(to) && configurationErrorTask(`git.log(string, string) should be replaced with git.log({ from: string, to: string })`);
	}
}
var excludeOptions;
var init_log = __esm({ "src/lib/tasks/log.ts"() {
	"use strict";
	init_log_format();
	init_pathspec();
	init_parse_list_log_summary();
	init_utils();
	init_task();
	init_diff();
	excludeOptions = /* @__PURE__ */ ((excludeOptions2) => {
		excludeOptions2[excludeOptions2["--pretty"] = 0] = "--pretty";
		excludeOptions2[excludeOptions2["max-count"] = 1] = "max-count";
		excludeOptions2[excludeOptions2["maxCount"] = 2] = "maxCount";
		excludeOptions2[excludeOptions2["n"] = 3] = "n";
		excludeOptions2[excludeOptions2["file"] = 4] = "file";
		excludeOptions2[excludeOptions2["format"] = 5] = "format";
		excludeOptions2[excludeOptions2["from"] = 6] = "from";
		excludeOptions2[excludeOptions2["to"] = 7] = "to";
		excludeOptions2[excludeOptions2["splitter"] = 8] = "splitter";
		excludeOptions2[excludeOptions2["symmetric"] = 9] = "symmetric";
		excludeOptions2[excludeOptions2["mailMap"] = 10] = "mailMap";
		excludeOptions2[excludeOptions2["multiLine"] = 11] = "multiLine";
		excludeOptions2[excludeOptions2["strictDate"] = 12] = "strictDate";
		return excludeOptions2;
	})(excludeOptions || {});
} });
var MergeSummaryConflict, MergeSummaryDetail;
var init_MergeSummary = __esm({ "src/lib/responses/MergeSummary.ts"() {
	"use strict";
	MergeSummaryConflict = class {
		constructor(reason, file = null, meta) {
			this.reason = reason;
			this.file = file;
			this.meta = meta;
		}
		toString() {
			return `${this.file}:${this.reason}`;
		}
	};
	MergeSummaryDetail = class {
		constructor() {
			this.conflicts = [];
			this.merges = [];
			this.result = "success";
		}
		get failed() {
			return this.conflicts.length > 0;
		}
		get reason() {
			return this.result;
		}
		toString() {
			if (this.conflicts.length) return `CONFLICTS: ${this.conflicts.join(", ")}`;
			return "OK";
		}
	};
} });
var PullSummary, PullFailedSummary;
var init_PullSummary = __esm({ "src/lib/responses/PullSummary.ts"() {
	"use strict";
	PullSummary = class {
		constructor() {
			this.remoteMessages = { all: [] };
			this.created = [];
			this.deleted = [];
			this.files = [];
			this.deletions = {};
			this.insertions = {};
			this.summary = {
				changes: 0,
				deletions: 0,
				insertions: 0
			};
		}
	};
	PullFailedSummary = class {
		constructor() {
			this.remote = "";
			this.hash = {
				local: "",
				remote: ""
			};
			this.branch = {
				local: "",
				remote: ""
			};
			this.message = "";
		}
		toString() {
			return this.message;
		}
	};
} });
function objectEnumerationResult(remoteMessages) {
	return remoteMessages.objects = remoteMessages.objects || {
		compressing: 0,
		counting: 0,
		enumerating: 0,
		packReused: 0,
		reused: {
			count: 0,
			delta: 0
		},
		total: {
			count: 0,
			delta: 0
		}
	};
}
function asObjectCount(source) {
	const count = /^\s*(\d+)/.exec(source);
	const delta = /delta (\d+)/i.exec(source);
	return {
		count: asNumber(count && count[1] || "0"),
		delta: asNumber(delta && delta[1] || "0")
	};
}
var remoteMessagesObjectParsers;
var init_parse_remote_objects = __esm({ "src/lib/parsers/parse-remote-objects.ts"() {
	"use strict";
	init_utils();
	remoteMessagesObjectParsers = [
		new RemoteLineParser(/^remote:\s*(enumerating|counting|compressing) objects: (\d+),/i, (result, [action, count]) => {
			const key = action.toLowerCase();
			const enumeration = objectEnumerationResult(result.remoteMessages);
			Object.assign(enumeration, { [key]: asNumber(count) });
		}),
		new RemoteLineParser(/^remote:\s*(enumerating|counting|compressing) objects: \d+% \(\d+\/(\d+)\),/i, (result, [action, count]) => {
			const key = action.toLowerCase();
			const enumeration = objectEnumerationResult(result.remoteMessages);
			Object.assign(enumeration, { [key]: asNumber(count) });
		}),
		new RemoteLineParser(/total ([^,]+), reused ([^,]+), pack-reused (\d+)/i, (result, [total, reused, packReused]) => {
			const objects = objectEnumerationResult(result.remoteMessages);
			objects.total = asObjectCount(total);
			objects.reused = asObjectCount(reused);
			objects.packReused = asNumber(packReused);
		})
	];
} });
function parseRemoteMessages(_stdOut, stdErr) {
	return parseStringResponse({ remoteMessages: new RemoteMessageSummary() }, parsers2, stdErr);
}
var parsers2, RemoteMessageSummary;
var init_parse_remote_messages = __esm({ "src/lib/parsers/parse-remote-messages.ts"() {
	"use strict";
	init_utils();
	init_parse_remote_objects();
	parsers2 = [
		new RemoteLineParser(/^remote:\s*(.+)$/, (result, [text]) => {
			result.remoteMessages.all.push(text.trim());
			return false;
		}),
		...remoteMessagesObjectParsers,
		new RemoteLineParser([/create a (?:pull|merge) request/i, /\s(https?:\/\/\S+)$/], (result, [pullRequestUrl]) => {
			result.remoteMessages.pullRequestUrl = pullRequestUrl;
		}),
		new RemoteLineParser([/found (\d+) vulnerabilities.+\(([^)]+)\)/i, /\s(https?:\/\/\S+)$/], (result, [count, summary, url]) => {
			result.remoteMessages.vulnerabilities = {
				count: asNumber(count),
				summary,
				url
			};
		})
	];
	RemoteMessageSummary = class {
		constructor() {
			this.all = [];
		}
	};
} });
function parsePullErrorResult(stdOut, stdErr) {
	const pullError = parseStringResponse(new PullFailedSummary(), errorParsers, [stdOut, stdErr]);
	return pullError.message && pullError;
}
var FILE_UPDATE_REGEX, SUMMARY_REGEX, ACTION_REGEX, parsers3, errorParsers, parsePullDetail, parsePullResult;
var init_parse_pull = __esm({ "src/lib/parsers/parse-pull.ts"() {
	"use strict";
	init_PullSummary();
	init_utils();
	init_parse_remote_messages();
	FILE_UPDATE_REGEX = /^\s*(.+?)\s+\|\s+\d+\s*(\+*)(-*)/;
	SUMMARY_REGEX = /(\d+)\D+((\d+)\D+\(\+\))?(\D+(\d+)\D+\(-\))?/;
	ACTION_REGEX = /^(create|delete) mode \d+ (.+)/;
	parsers3 = [
		new LineParser(FILE_UPDATE_REGEX, (result, [file, insertions, deletions]) => {
			result.files.push(file);
			if (insertions) result.insertions[file] = insertions.length;
			if (deletions) result.deletions[file] = deletions.length;
		}),
		new LineParser(SUMMARY_REGEX, (result, [changes, , insertions, , deletions]) => {
			if (insertions !== void 0 || deletions !== void 0) {
				result.summary.changes = +changes || 0;
				result.summary.insertions = +insertions || 0;
				result.summary.deletions = +deletions || 0;
				return true;
			}
			return false;
		}),
		new LineParser(ACTION_REGEX, (result, [action, file]) => {
			append(result.files, file);
			append(action === "create" ? result.created : result.deleted, file);
		})
	];
	errorParsers = [
		new LineParser(/^from\s(.+)$/i, (result, [remote]) => void (result.remote = remote)),
		new LineParser(/^fatal:\s(.+)$/, (result, [message]) => void (result.message = message)),
		new LineParser(/([a-z0-9]+)\.\.([a-z0-9]+)\s+(\S+)\s+->\s+(\S+)$/, (result, [hashLocal, hashRemote, branchLocal, branchRemote]) => {
			result.branch.local = branchLocal;
			result.hash.local = hashLocal;
			result.branch.remote = branchRemote;
			result.hash.remote = hashRemote;
		})
	];
	parsePullDetail = (stdOut, stdErr) => {
		return parseStringResponse(new PullSummary(), parsers3, [stdOut, stdErr]);
	};
	parsePullResult = (stdOut, stdErr) => {
		return Object.assign(new PullSummary(), parsePullDetail(stdOut, stdErr), parseRemoteMessages(stdOut, stdErr));
	};
} });
var parsers4, parseMergeResult, parseMergeDetail;
var init_parse_merge = __esm({ "src/lib/parsers/parse-merge.ts"() {
	"use strict";
	init_MergeSummary();
	init_utils();
	init_parse_pull();
	parsers4 = [
		new LineParser(/^Auto-merging\s+(.+)$/, (summary, [autoMerge]) => {
			summary.merges.push(autoMerge);
		}),
		new LineParser(/^CONFLICT\s+\((.+)\): Merge conflict in (.+)$/, (summary, [reason, file]) => {
			summary.conflicts.push(new MergeSummaryConflict(reason, file));
		}),
		new LineParser(/^CONFLICT\s+\((.+\/delete)\): (.+) deleted in (.+) and/, (summary, [reason, file, deleteRef]) => {
			summary.conflicts.push(new MergeSummaryConflict(reason, file, { deleteRef }));
		}),
		new LineParser(/^CONFLICT\s+\((.+)\):/, (summary, [reason]) => {
			summary.conflicts.push(new MergeSummaryConflict(reason, null));
		}),
		new LineParser(/^Automatic merge failed;\s+(.+)$/, (summary, [result]) => {
			summary.result = result;
		})
	];
	parseMergeResult = (stdOut, stdErr) => {
		return Object.assign(parseMergeDetail(stdOut, stdErr), parsePullResult(stdOut, stdErr));
	};
	parseMergeDetail = (stdOut) => {
		return parseStringResponse(new MergeSummaryDetail(), parsers4, stdOut);
	};
} });
function mergeTask(customArgs) {
	if (!customArgs.length) return configurationErrorTask("Git.merge requires at least one option");
	return {
		commands: ["merge", ...customArgs],
		format: "utf-8",
		parser(stdOut, stdErr) {
			const merge = parseMergeResult(stdOut, stdErr);
			if (merge.failed) throw new GitResponseError(merge);
			return merge;
		}
	};
}
var init_merge = __esm({ "src/lib/tasks/merge.ts"() {
	"use strict";
	init_git_response_error();
	init_parse_merge();
	init_task();
} });
function pushResultPushedItem(local, remote, status) {
	const deleted = status.includes("deleted");
	const tag = status.includes("tag") || /^refs\/tags/.test(local);
	const alreadyUpdated = !status.includes("new");
	return {
		deleted,
		tag,
		branch: !tag,
		new: !alreadyUpdated,
		alreadyUpdated,
		local,
		remote
	};
}
var parsers5, parsePushResult, parsePushDetail;
var init_parse_push = __esm({ "src/lib/parsers/parse-push.ts"() {
	"use strict";
	init_utils();
	init_parse_remote_messages();
	parsers5 = [
		new LineParser(/^Pushing to (.+)$/, (result, [repo]) => {
			result.repo = repo;
		}),
		new LineParser(/^updating local tracking ref '(.+)'/, (result, [local]) => {
			result.ref = {
				...result.ref || {},
				local
			};
		}),
		new LineParser(/^[=*-]\s+([^:]+):(\S+)\s+\[(.+)]$/, (result, [local, remote, type]) => {
			result.pushed.push(pushResultPushedItem(local, remote, type));
		}),
		new LineParser(/^Branch '([^']+)' set up to track remote branch '([^']+)' from '([^']+)'/, (result, [local, remote, remoteName]) => {
			result.branch = {
				...result.branch || {},
				local,
				remote,
				remoteName
			};
		}),
		new LineParser(/^([^:]+):(\S+)\s+([a-z0-9]+)\.\.([a-z0-9]+)$/, (result, [local, remote, from, to]) => {
			result.update = {
				head: {
					local,
					remote
				},
				hash: {
					from,
					to
				}
			};
		})
	];
	parsePushResult = (stdOut, stdErr) => {
		const pushDetail = parsePushDetail(stdOut, stdErr);
		const responseDetail = parseRemoteMessages(stdOut, stdErr);
		return {
			...pushDetail,
			...responseDetail
		};
	};
	parsePushDetail = (stdOut, stdErr) => {
		return parseStringResponse({ pushed: [] }, parsers5, [stdOut, stdErr]);
	};
} });
var push_exports = {};
__export(push_exports, {
	pushTagsTask: () => pushTagsTask,
	pushTask: () => pushTask
});
function pushTagsTask(ref = {}, customArgs) {
	append(customArgs, "--tags");
	return pushTask(ref, customArgs);
}
function pushTask(ref = {}, customArgs) {
	const commands = ["push", ...customArgs];
	if (ref.branch) commands.splice(1, 0, ref.branch);
	if (ref.remote) commands.splice(1, 0, ref.remote);
	remove(commands, "-v");
	append(commands, "--verbose");
	append(commands, "--porcelain");
	return {
		commands,
		format: "utf-8",
		parser: parsePushResult
	};
}
var init_push = __esm({ "src/lib/tasks/push.ts"() {
	"use strict";
	init_parse_push();
	init_utils();
} });
function show_default() {
	return {
		showBuffer() {
			const commands = ["show", ...getTrailingOptions(arguments, 1)];
			if (!commands.includes("--binary")) commands.splice(1, 0, "--binary");
			return this._runTask(straightThroughBufferTask(commands), trailingFunctionArgument(arguments));
		},
		show() {
			const commands = ["show", ...getTrailingOptions(arguments, 1)];
			return this._runTask(straightThroughStringTask(commands), trailingFunctionArgument(arguments));
		}
	};
}
var init_show = __esm({ "src/lib/tasks/show.ts"() {
	"use strict";
	init_utils();
	init_task();
} });
var fromPathRegex, FileStatusSummary;
var init_FileStatusSummary = __esm({ "src/lib/responses/FileStatusSummary.ts"() {
	"use strict";
	fromPathRegex = /^(.+)\0(.+)$/;
	FileStatusSummary = class {
		constructor(path, index, working_dir) {
			this.path = path;
			this.index = index;
			this.working_dir = working_dir;
			if (index === "R" || working_dir === "R") {
				const detail = fromPathRegex.exec(path) || [
					null,
					path,
					path
				];
				this.from = detail[2] || "";
				this.path = detail[1] || "";
			}
		}
	};
} });
function renamedFile(line) {
	const [to, from] = line.split(NULL);
	return {
		from: from || to,
		to
	};
}
function parser3(indexX, indexY, handler) {
	return [`${indexX}${indexY}`, handler];
}
function conflicts(indexX, ...indexY) {
	return indexY.map((y) => parser3(indexX, y, (result, file) => append(result.conflicted, file)));
}
function splitLine(result, lineStr) {
	const trimmed2 = lineStr.trim();
	switch (" ") {
		case trimmed2.charAt(2): return data(trimmed2.charAt(0), trimmed2.charAt(1), trimmed2.substr(3));
		case trimmed2.charAt(1): return data(" ", trimmed2.charAt(0), trimmed2.substr(2));
		default: return;
	}
	function data(index, workingDir, path) {
		const raw = `${index}${workingDir}`;
		const handler = parsers6.get(raw);
		if (handler) handler(result, path);
		if (raw !== "##" && raw !== "!!") result.files.push(new FileStatusSummary(path, index, workingDir));
	}
}
var StatusSummary, parsers6, parseStatusSummary;
var init_StatusSummary = __esm({ "src/lib/responses/StatusSummary.ts"() {
	"use strict";
	init_utils();
	init_FileStatusSummary();
	StatusSummary = class {
		constructor() {
			this.not_added = [];
			this.conflicted = [];
			this.created = [];
			this.deleted = [];
			this.ignored = void 0;
			this.modified = [];
			this.renamed = [];
			this.files = [];
			this.staged = [];
			this.ahead = 0;
			this.behind = 0;
			this.current = null;
			this.tracking = null;
			this.detached = false;
			this.isClean = () => {
				return !this.files.length;
			};
		}
	};
	parsers6 = new Map([
		parser3(" ", "A", (result, file) => append(result.created, file)),
		parser3(" ", "D", (result, file) => append(result.deleted, file)),
		parser3(" ", "M", (result, file) => append(result.modified, file)),
		parser3("A", " ", (result, file) => append(result.created, file) && append(result.staged, file)),
		parser3("A", "M", (result, file) => append(result.created, file) && append(result.staged, file) && append(result.modified, file)),
		parser3("D", " ", (result, file) => append(result.deleted, file) && append(result.staged, file)),
		parser3("M", " ", (result, file) => append(result.modified, file) && append(result.staged, file)),
		parser3("M", "M", (result, file) => append(result.modified, file) && append(result.staged, file)),
		parser3("R", " ", (result, file) => {
			append(result.renamed, renamedFile(file));
		}),
		parser3("R", "M", (result, file) => {
			const renamed = renamedFile(file);
			append(result.renamed, renamed);
			append(result.modified, renamed.to);
		}),
		parser3("!", "!", (_result, _file) => {
			append(_result.ignored = _result.ignored || [], _file);
		}),
		parser3("?", "?", (result, file) => append(result.not_added, file)),
		...conflicts("A", "A", "U"),
		...conflicts("D", "D", "U"),
		...conflicts("U", "A", "D", "U"),
		["##", (result, line) => {
			const aheadReg = /ahead (\d+)/;
			const behindReg = /behind (\d+)/;
			const currentReg = /^(.+?(?=(?:\.{3}|\s|$)))/;
			const trackingReg = /\.{3}(\S*)/;
			const onEmptyBranchReg = /\son\s(\S+?)(?=\.{3}|$)/;
			let regexResult = aheadReg.exec(line);
			result.ahead = regexResult && +regexResult[1] || 0;
			regexResult = behindReg.exec(line);
			result.behind = regexResult && +regexResult[1] || 0;
			regexResult = currentReg.exec(line);
			result.current = filterType(regexResult?.[1], filterString, null);
			regexResult = trackingReg.exec(line);
			result.tracking = filterType(regexResult?.[1], filterString, null);
			regexResult = onEmptyBranchReg.exec(line);
			if (regexResult) result.current = filterType(regexResult?.[1], filterString, result.current);
			result.detached = /\(no branch\)/.test(line);
		}]
	]);
	parseStatusSummary = function(text) {
		const lines = text.split(NULL);
		const status = new StatusSummary();
		for (let i = 0, l = lines.length; i < l;) {
			let line = lines[i++].trim();
			if (!line) continue;
			if (line.charAt(0) === "R") line += NULL + (lines[i++] || "");
			splitLine(status, line);
		}
		return status;
	};
} });
function statusTask(customArgs) {
	return {
		format: "utf-8",
		commands: [
			"status",
			"--porcelain",
			"-b",
			"-u",
			"--null",
			...customArgs.filter((arg) => !ignoredOptions.includes(arg))
		],
		parser(text) {
			return parseStatusSummary(text);
		}
	};
}
var ignoredOptions;
var init_status = __esm({ "src/lib/tasks/status.ts"() {
	"use strict";
	init_StatusSummary();
	ignoredOptions = ["--null", "-z"];
} });
function versionResponse(major = 0, minor = 0, patch = 0, agent = "", installed = true) {
	return Object.defineProperty({
		major,
		minor,
		patch,
		agent,
		installed
	}, "toString", {
		value() {
			return `${this.major}.${this.minor}.${this.patch}`;
		},
		configurable: false,
		enumerable: false
	});
}
function notInstalledResponse() {
	return versionResponse(0, 0, 0, "", false);
}
function version_default() {
	return { version() {
		return this._runTask({
			commands: ["--version"],
			format: "utf-8",
			parser: versionParser,
			onError(result, error, done, fail) {
				if (result.exitCode === -2) return done(Buffer.from(NOT_INSTALLED));
				fail(error);
			}
		});
	} };
}
function versionParser(stdOut) {
	if (stdOut === NOT_INSTALLED) return notInstalledResponse();
	return parseStringResponse(versionResponse(0, 0, 0, stdOut), parsers7, stdOut);
}
var NOT_INSTALLED, parsers7;
var init_version = __esm({ "src/lib/tasks/version.ts"() {
	"use strict";
	init_utils();
	NOT_INSTALLED = "installed=false";
	parsers7 = [new LineParser(/version (\d+)\.(\d+)\.(\d+)(?:\s*\((.+)\))?/, (result, [major, minor, patch, agent = ""]) => {
		Object.assign(result, versionResponse(asNumber(major), asNumber(minor), asNumber(patch), agent));
	}), new LineParser(/version (\d+)\.(\d+)\.(\D+)(.+)?$/, (result, [major, minor, patch, agent = ""]) => {
		Object.assign(result, versionResponse(asNumber(major), asNumber(minor), patch, agent));
	})];
} });
var simple_git_api_exports = {};
__export(simple_git_api_exports, { SimpleGitApi: () => SimpleGitApi });
var SimpleGitApi;
var init_simple_git_api = __esm({ "src/lib/simple-git-api.ts"() {
	"use strict";
	init_task_callback();
	init_change_working_directory();
	init_checkout();
	init_count_objects();
	init_commit();
	init_config();
	init_first_commit();
	init_grep();
	init_hash_object();
	init_init();
	init_log();
	init_merge();
	init_push();
	init_show();
	init_status();
	init_task();
	init_version();
	init_utils();
	SimpleGitApi = class {
		constructor(_executor) {
			this._executor = _executor;
		}
		_runTask(task, then) {
			const chain = this._executor.chain();
			const promise = chain.push(task);
			if (then) taskCallback(task, promise, then);
			return Object.create(this, {
				then: { value: promise.then.bind(promise) },
				catch: { value: promise.catch.bind(promise) },
				_executor: { value: chain }
			});
		}
		add(files) {
			return this._runTask(straightThroughStringTask(["add", ...asArray(files)]), trailingFunctionArgument(arguments));
		}
		cwd(directory) {
			const next = trailingFunctionArgument(arguments);
			if (typeof directory === "string") return this._runTask(changeWorkingDirectoryTask(directory, this._executor), next);
			if (typeof directory?.path === "string") return this._runTask(changeWorkingDirectoryTask(directory.path, directory.root && this._executor || void 0), next);
			return this._runTask(configurationErrorTask("Git.cwd: workingDirectory must be supplied as a string"), next);
		}
		hashObject(path, write) {
			return this._runTask(hashObjectTask(path, write === true), trailingFunctionArgument(arguments));
		}
		init(bare) {
			return this._runTask(initTask(bare === true, this._executor.cwd, getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
		}
		merge() {
			return this._runTask(mergeTask(getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
		}
		mergeFromTo(remote, branch) {
			if (!(filterString(remote) && filterString(branch))) return this._runTask(configurationErrorTask(`Git.mergeFromTo requires that the 'remote' and 'branch' arguments are supplied as strings`));
			return this._runTask(mergeTask([
				remote,
				branch,
				...getTrailingOptions(arguments)
			]), trailingFunctionArgument(arguments, false));
		}
		outputHandler(handler) {
			this._executor.outputHandler = handler;
			return this;
		}
		push() {
			const task = pushTask({
				remote: filterType(arguments[0], filterString),
				branch: filterType(arguments[1], filterString)
			}, getTrailingOptions(arguments));
			return this._runTask(task, trailingFunctionArgument(arguments));
		}
		stash() {
			return this._runTask(straightThroughStringTask(["stash", ...getTrailingOptions(arguments)]), trailingFunctionArgument(arguments));
		}
		status() {
			return this._runTask(statusTask(getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
		}
	};
	Object.assign(SimpleGitApi.prototype, checkout_default(), commit_default(), config_default(), count_objects_default(), first_commit_default(), grep_default(), log_default(), show_default(), version_default());
} });
var scheduler_exports = {};
__export(scheduler_exports, { Scheduler: () => Scheduler });
var createScheduledTask, Scheduler;
var init_scheduler = __esm({ "src/lib/runners/scheduler.ts"() {
	"use strict";
	init_utils();
	init_git_logger();
	createScheduledTask = /* @__PURE__ */ (() => {
		let id = 0;
		return () => {
			id++;
			const { promise, done } = (0, import_dist$1.createDeferred)();
			return {
				promise,
				done,
				id
			};
		};
	})();
	Scheduler = class {
		constructor(concurrency = 2) {
			this.concurrency = concurrency;
			this.logger = createLogger("", "scheduler");
			this.pending = [];
			this.running = [];
			this.logger(`Constructed, concurrency=%s`, concurrency);
		}
		schedule() {
			if (!this.pending.length || this.running.length >= this.concurrency) {
				this.logger(`Schedule attempt ignored, pending=%s running=%s concurrency=%s`, this.pending.length, this.running.length, this.concurrency);
				return;
			}
			const task = append(this.running, this.pending.shift());
			this.logger(`Attempting id=%s`, task.id);
			task.done(() => {
				this.logger(`Completing id=`, task.id);
				remove(this.running, task);
				this.schedule();
			});
		}
		next() {
			const { promise, id } = append(this.pending, createScheduledTask());
			this.logger(`Scheduling id=%s`, id);
			this.schedule();
			return promise;
		}
	};
} });
var apply_patch_exports = {};
__export(apply_patch_exports, { applyPatchTask: () => applyPatchTask });
function applyPatchTask(patches, customArgs) {
	return straightThroughStringTask([
		"apply",
		...customArgs,
		...patches
	]);
}
var init_apply_patch = __esm({ "src/lib/tasks/apply-patch.ts"() {
	"use strict";
	init_task();
} });
function branchDeletionSuccess(branch, hash) {
	return {
		branch,
		hash,
		success: true
	};
}
function branchDeletionFailure(branch) {
	return {
		branch,
		hash: null,
		success: false
	};
}
var BranchDeletionBatch;
var init_BranchDeleteSummary = __esm({ "src/lib/responses/BranchDeleteSummary.ts"() {
	"use strict";
	BranchDeletionBatch = class {
		constructor() {
			this.all = [];
			this.branches = {};
			this.errors = [];
		}
		get success() {
			return !this.errors.length;
		}
	};
} });
function hasBranchDeletionError(data, processExitCode) {
	return processExitCode === 1 && deleteErrorRegex.test(data);
}
var deleteSuccessRegex, deleteErrorRegex, parsers8, parseBranchDeletions;
var init_parse_branch_delete = __esm({ "src/lib/parsers/parse-branch-delete.ts"() {
	"use strict";
	init_BranchDeleteSummary();
	init_utils();
	deleteSuccessRegex = /(\S+)\s+\(\S+\s([^)]+)\)/;
	deleteErrorRegex = /^error[^']+'([^']+)'/m;
	parsers8 = [new LineParser(deleteSuccessRegex, (result, [branch, hash]) => {
		const deletion = branchDeletionSuccess(branch, hash);
		result.all.push(deletion);
		result.branches[branch] = deletion;
	}), new LineParser(deleteErrorRegex, (result, [branch]) => {
		const deletion = branchDeletionFailure(branch);
		result.errors.push(deletion);
		result.all.push(deletion);
		result.branches[branch] = deletion;
	})];
	parseBranchDeletions = (stdOut, stdErr) => {
		return parseStringResponse(new BranchDeletionBatch(), parsers8, [stdOut, stdErr]);
	};
} });
var BranchSummaryResult;
var init_BranchSummary = __esm({ "src/lib/responses/BranchSummary.ts"() {
	"use strict";
	BranchSummaryResult = class {
		constructor() {
			this.all = [];
			this.branches = {};
			this.current = "";
			this.detached = false;
		}
		push(status, detached, name, commit, label) {
			if (status === "*") {
				this.detached = detached;
				this.current = name;
			}
			this.all.push(name);
			this.branches[name] = {
				current: status === "*",
				linkedWorkTree: status === "+",
				name,
				commit,
				label
			};
		}
	};
} });
function branchStatus(input) {
	return input ? input.charAt(0) : "";
}
function parseBranchSummary(stdOut, currentOnly = false) {
	return parseStringResponse(new BranchSummaryResult(), currentOnly ? [currentBranchParser] : parsers9, stdOut);
}
var parsers9, currentBranchParser;
var init_parse_branch = __esm({ "src/lib/parsers/parse-branch.ts"() {
	"use strict";
	init_BranchSummary();
	init_utils();
	parsers9 = [new LineParser(/^([*+]\s)?\((?:HEAD )?detached (?:from|at) (\S+)\)\s+([a-z0-9]+)\s(.*)$/, (result, [current, name, commit, label]) => {
		result.push(branchStatus(current), true, name, commit, label);
	}), new LineParser(/^([*+]\s)?(\S+)\s+([a-z0-9]+)\s?(.*)$/s, (result, [current, name, commit, label]) => {
		result.push(branchStatus(current), false, name, commit, label);
	})];
	currentBranchParser = new LineParser(/^(\S+)$/s, (result, [name]) => {
		result.push("*", false, name, "", "");
	});
} });
var branch_exports = {};
__export(branch_exports, {
	branchLocalTask: () => branchLocalTask,
	branchTask: () => branchTask,
	containsDeleteBranchCommand: () => containsDeleteBranchCommand,
	deleteBranchTask: () => deleteBranchTask,
	deleteBranchesTask: () => deleteBranchesTask
});
function containsDeleteBranchCommand(commands) {
	const deleteCommands = [
		"-d",
		"-D",
		"--delete"
	];
	return commands.some((command) => deleteCommands.includes(command));
}
function branchTask(customArgs) {
	const isDelete = containsDeleteBranchCommand(customArgs);
	const isCurrentOnly = customArgs.includes("--show-current");
	const commands = ["branch", ...customArgs];
	if (commands.length === 1) commands.push("-a");
	if (!commands.includes("-v")) commands.splice(1, 0, "-v");
	return {
		format: "utf-8",
		commands,
		parser(stdOut, stdErr) {
			if (isDelete) return parseBranchDeletions(stdOut, stdErr).all[0];
			return parseBranchSummary(stdOut, isCurrentOnly);
		}
	};
}
function branchLocalTask() {
	return {
		format: "utf-8",
		commands: ["branch", "-v"],
		parser(stdOut) {
			return parseBranchSummary(stdOut);
		}
	};
}
function deleteBranchesTask(branches, forceDelete = false) {
	return {
		format: "utf-8",
		commands: [
			"branch",
			"-v",
			forceDelete ? "-D" : "-d",
			...branches
		],
		parser(stdOut, stdErr) {
			return parseBranchDeletions(stdOut, stdErr);
		},
		onError({ exitCode, stdOut }, error, done, fail) {
			if (!hasBranchDeletionError(String(error), exitCode)) return fail(error);
			done(stdOut);
		}
	};
}
function deleteBranchTask(branch, forceDelete = false) {
	const task = {
		format: "utf-8",
		commands: [
			"branch",
			"-v",
			forceDelete ? "-D" : "-d",
			branch
		],
		parser(stdOut, stdErr) {
			return parseBranchDeletions(stdOut, stdErr).branches[branch];
		},
		onError({ exitCode, stdErr, stdOut }, error, _, fail) {
			if (!hasBranchDeletionError(String(error), exitCode)) return fail(error);
			throw new GitResponseError(task.parser(bufferToString(stdOut), bufferToString(stdErr)), String(error));
		}
	};
	return task;
}
var init_branch = __esm({ "src/lib/tasks/branch.ts"() {
	"use strict";
	init_git_response_error();
	init_parse_branch_delete();
	init_parse_branch();
	init_utils();
} });
function toPath(input) {
	const path = input.trim().replace(/^["']|["']$/g, "");
	return path && normalize$1(path);
}
var parseCheckIgnore;
var init_CheckIgnore = __esm({ "src/lib/responses/CheckIgnore.ts"() {
	"use strict";
	parseCheckIgnore = (text) => {
		return text.split(/\n/g).map(toPath).filter(Boolean);
	};
} });
var check_ignore_exports = {};
__export(check_ignore_exports, { checkIgnoreTask: () => checkIgnoreTask });
function checkIgnoreTask(paths) {
	return {
		commands: ["check-ignore", ...paths],
		format: "utf-8",
		parser: parseCheckIgnore
	};
}
var init_check_ignore = __esm({ "src/lib/tasks/check-ignore.ts"() {
	"use strict";
	init_CheckIgnore();
} });
var clone_exports = {};
__export(clone_exports, {
	cloneMirrorTask: () => cloneMirrorTask,
	cloneTask: () => cloneTask
});
function disallowedCommand(command) {
	return /^--upload-pack(=|$)/.test(command);
}
function cloneTask(repo, directory, customArgs) {
	const commands = ["clone", ...customArgs];
	filterString(repo) && commands.push(repo);
	filterString(directory) && commands.push(directory);
	if (commands.find(disallowedCommand)) return configurationErrorTask(`git.fetch: potential exploit argument blocked.`);
	return straightThroughStringTask(commands);
}
function cloneMirrorTask(repo, directory, customArgs) {
	append(customArgs, "--mirror");
	return cloneTask(repo, directory, customArgs);
}
var init_clone = __esm({ "src/lib/tasks/clone.ts"() {
	"use strict";
	init_task();
	init_utils();
} });
function parseFetchResult(stdOut, stdErr) {
	return parseStringResponse({
		raw: stdOut,
		remote: null,
		branches: [],
		tags: [],
		updated: [],
		deleted: []
	}, parsers10, [stdOut, stdErr]);
}
var parsers10;
var init_parse_fetch = __esm({ "src/lib/parsers/parse-fetch.ts"() {
	"use strict";
	init_utils();
	parsers10 = [
		new LineParser(/From (.+)$/, (result, [remote]) => {
			result.remote = remote;
		}),
		new LineParser(/\* \[new branch]\s+(\S+)\s*-> (.+)$/, (result, [name, tracking]) => {
			result.branches.push({
				name,
				tracking
			});
		}),
		new LineParser(/\* \[new tag]\s+(\S+)\s*-> (.+)$/, (result, [name, tracking]) => {
			result.tags.push({
				name,
				tracking
			});
		}),
		new LineParser(/- \[deleted]\s+\S+\s*-> (.+)$/, (result, [tracking]) => {
			result.deleted.push({ tracking });
		}),
		new LineParser(/\s*([^.]+)\.\.(\S+)\s+(\S+)\s*-> (.+)$/, (result, [from, to, name, tracking]) => {
			result.updated.push({
				name,
				tracking,
				to,
				from
			});
		})
	];
} });
var fetch_exports = {};
__export(fetch_exports, { fetchTask: () => fetchTask });
function disallowedCommand2(command) {
	return /^--upload-pack(=|$)/.test(command);
}
function fetchTask(remote, branch, customArgs) {
	const commands = ["fetch", ...customArgs];
	if (remote && branch) commands.push(remote, branch);
	if (commands.find(disallowedCommand2)) return configurationErrorTask(`git.fetch: potential exploit argument blocked.`);
	return {
		commands,
		format: "utf-8",
		parser: parseFetchResult
	};
}
var init_fetch = __esm({ "src/lib/tasks/fetch.ts"() {
	"use strict";
	init_parse_fetch();
	init_task();
} });
function parseMoveResult(stdOut) {
	return parseStringResponse({ moves: [] }, parsers11, stdOut);
}
var parsers11;
var init_parse_move = __esm({ "src/lib/parsers/parse-move.ts"() {
	"use strict";
	init_utils();
	parsers11 = [new LineParser(/^Renaming (.+) to (.+)$/, (result, [from, to]) => {
		result.moves.push({
			from,
			to
		});
	})];
} });
var move_exports = {};
__export(move_exports, { moveTask: () => moveTask });
function moveTask(from, to) {
	return {
		commands: [
			"mv",
			"-v",
			...asArray(from),
			to
		],
		format: "utf-8",
		parser: parseMoveResult
	};
}
var init_move = __esm({ "src/lib/tasks/move.ts"() {
	"use strict";
	init_parse_move();
	init_utils();
} });
var pull_exports = {};
__export(pull_exports, { pullTask: () => pullTask });
function pullTask(remote, branch, customArgs) {
	const commands = ["pull", ...customArgs];
	if (remote && branch) commands.splice(1, 0, remote, branch);
	return {
		commands,
		format: "utf-8",
		parser(stdOut, stdErr) {
			return parsePullResult(stdOut, stdErr);
		},
		onError(result, _error, _done, fail) {
			const pullError = parsePullErrorResult(bufferToString(result.stdOut), bufferToString(result.stdErr));
			if (pullError) return fail(new GitResponseError(pullError));
			fail(_error);
		}
	};
}
var init_pull = __esm({ "src/lib/tasks/pull.ts"() {
	"use strict";
	init_git_response_error();
	init_parse_pull();
	init_utils();
} });
function parseGetRemotes(text) {
	const remotes = {};
	forEach(text, ([name]) => remotes[name] = { name });
	return Object.values(remotes);
}
function parseGetRemotesVerbose(text) {
	const remotes = {};
	forEach(text, ([name, url, purpose]) => {
		if (!Object.hasOwn(remotes, name)) remotes[name] = {
			name,
			refs: {
				fetch: "",
				push: ""
			}
		};
		if (purpose && url) remotes[name].refs[purpose.replace(/[^a-z]/g, "")] = url;
	});
	return Object.values(remotes);
}
function forEach(text, handler) {
	forEachLineWithContent(text, (line) => handler(line.split(/\s+/)));
}
var init_GetRemoteSummary = __esm({ "src/lib/responses/GetRemoteSummary.ts"() {
	"use strict";
	init_utils();
} });
var remote_exports = {};
__export(remote_exports, {
	addRemoteTask: () => addRemoteTask,
	getRemotesTask: () => getRemotesTask,
	listRemotesTask: () => listRemotesTask,
	remoteTask: () => remoteTask,
	removeRemoteTask: () => removeRemoteTask
});
function addRemoteTask(remoteName, remoteRepo, customArgs) {
	return straightThroughStringTask([
		"remote",
		"add",
		...customArgs,
		remoteName,
		remoteRepo
	]);
}
function getRemotesTask(verbose) {
	const commands = ["remote"];
	if (verbose) commands.push("-v");
	return {
		commands,
		format: "utf-8",
		parser: verbose ? parseGetRemotesVerbose : parseGetRemotes
	};
}
function listRemotesTask(customArgs) {
	const commands = [...customArgs];
	if (commands[0] !== "ls-remote") commands.unshift("ls-remote");
	return straightThroughStringTask(commands);
}
function remoteTask(customArgs) {
	const commands = [...customArgs];
	if (commands[0] !== "remote") commands.unshift("remote");
	return straightThroughStringTask(commands);
}
function removeRemoteTask(remoteName) {
	return straightThroughStringTask([
		"remote",
		"remove",
		remoteName
	]);
}
var init_remote = __esm({ "src/lib/tasks/remote.ts"() {
	"use strict";
	init_GetRemoteSummary();
	init_task();
} });
var stash_list_exports = {};
__export(stash_list_exports, { stashListTask: () => stashListTask });
function stashListTask(opt = {}, customArgs) {
	const options = parseLogOptions(opt);
	const commands = [
		"stash",
		"list",
		...options.commands,
		...customArgs
	];
	const parser4 = createListLogSummaryParser(options.splitter, options.fields, logFormatFromCommand(commands));
	return validateLogFormatConfig(commands) || {
		commands,
		format: "utf-8",
		parser: parser4
	};
}
var init_stash_list = __esm({ "src/lib/tasks/stash-list.ts"() {
	"use strict";
	init_log_format();
	init_parse_list_log_summary();
	init_diff();
	init_log();
} });
var sub_module_exports = {};
__export(sub_module_exports, {
	addSubModuleTask: () => addSubModuleTask,
	initSubModuleTask: () => initSubModuleTask,
	subModuleTask: () => subModuleTask,
	updateSubModuleTask: () => updateSubModuleTask
});
function addSubModuleTask(repo, path) {
	return subModuleTask([
		"add",
		repo,
		path
	]);
}
function initSubModuleTask(customArgs) {
	return subModuleTask(["init", ...customArgs]);
}
function subModuleTask(customArgs) {
	const commands = [...customArgs];
	if (commands[0] !== "submodule") commands.unshift("submodule");
	return straightThroughStringTask(commands);
}
function updateSubModuleTask(customArgs) {
	return subModuleTask(["update", ...customArgs]);
}
var init_sub_module = __esm({ "src/lib/tasks/sub-module.ts"() {
	"use strict";
	init_task();
} });
function singleSorted(a, b) {
	const aIsNum = Number.isNaN(a);
	if (aIsNum !== Number.isNaN(b)) return aIsNum ? 1 : -1;
	return aIsNum ? sorted(a, b) : 0;
}
function sorted(a, b) {
	return a === b ? 0 : a > b ? 1 : -1;
}
function trimmed(input) {
	return input.trim();
}
function toNumber(input) {
	if (typeof input === "string") return parseInt(input.replace(/^\D+/g, ""), 10) || 0;
	return 0;
}
var TagList, parseTagList;
var init_TagList = __esm({ "src/lib/responses/TagList.ts"() {
	"use strict";
	TagList = class {
		constructor(all, latest) {
			this.all = all;
			this.latest = latest;
		}
	};
	parseTagList = function(data, customSort = false) {
		const tags = data.split("\n").map(trimmed).filter(Boolean);
		if (!customSort) tags.sort(function(tagA, tagB) {
			const partsA = tagA.split(".");
			const partsB = tagB.split(".");
			if (partsA.length === 1 || partsB.length === 1) return singleSorted(toNumber(partsA[0]), toNumber(partsB[0]));
			for (let i = 0, l = Math.max(partsA.length, partsB.length); i < l; i++) {
				const diff = sorted(toNumber(partsA[i]), toNumber(partsB[i]));
				if (diff) return diff;
			}
			return 0;
		});
		const latest = customSort ? tags[0] : [...tags].reverse().find((tag) => tag.indexOf(".") >= 0);
		return new TagList(tags, latest);
	};
} });
var tag_exports = {};
__export(tag_exports, {
	addAnnotatedTagTask: () => addAnnotatedTagTask,
	addTagTask: () => addTagTask,
	tagListTask: () => tagListTask
});
function tagListTask(customArgs = []) {
	const hasCustomSort = customArgs.some((option) => /^--sort=/.test(option));
	return {
		format: "utf-8",
		commands: [
			"tag",
			"-l",
			...customArgs
		],
		parser(text) {
			return parseTagList(text, hasCustomSort);
		}
	};
}
function addTagTask(name) {
	return {
		format: "utf-8",
		commands: ["tag", name],
		parser() {
			return { name };
		}
	};
}
function addAnnotatedTagTask(name, tagMessage) {
	return {
		format: "utf-8",
		commands: [
			"tag",
			"-a",
			"-m",
			tagMessage,
			name
		],
		parser() {
			return { name };
		}
	};
}
var init_tag = __esm({ "src/lib/tasks/tag.ts"() {
	"use strict";
	init_TagList();
} });
var require_git = __commonJS({ "src/git.js"(exports, module) {
	"use strict";
	var { GitExecutor: GitExecutor2 } = (init_git_executor(), __toCommonJS(git_executor_exports));
	var { SimpleGitApi: SimpleGitApi2 } = (init_simple_git_api(), __toCommonJS(simple_git_api_exports));
	var { Scheduler: Scheduler2 } = (init_scheduler(), __toCommonJS(scheduler_exports));
	var { configurationErrorTask: configurationErrorTask2 } = (init_task(), __toCommonJS(task_exports));
	var { asArray: asArray2, filterArray: filterArray2, filterPrimitives: filterPrimitives2, filterString: filterString2, filterStringOrStringArray: filterStringOrStringArray2, filterType: filterType2, getTrailingOptions: getTrailingOptions2, trailingFunctionArgument: trailingFunctionArgument2, trailingOptionsArgument: trailingOptionsArgument2 } = (init_utils(), __toCommonJS(utils_exports));
	var { applyPatchTask: applyPatchTask2 } = (init_apply_patch(), __toCommonJS(apply_patch_exports));
	var { branchTask: branchTask2, branchLocalTask: branchLocalTask2, deleteBranchesTask: deleteBranchesTask2, deleteBranchTask: deleteBranchTask2 } = (init_branch(), __toCommonJS(branch_exports));
	var { checkIgnoreTask: checkIgnoreTask2 } = (init_check_ignore(), __toCommonJS(check_ignore_exports));
	var { checkIsRepoTask: checkIsRepoTask2 } = (init_check_is_repo(), __toCommonJS(check_is_repo_exports));
	var { cloneTask: cloneTask2, cloneMirrorTask: cloneMirrorTask2 } = (init_clone(), __toCommonJS(clone_exports));
	var { cleanWithOptionsTask: cleanWithOptionsTask2, isCleanOptionsArray: isCleanOptionsArray2 } = (init_clean(), __toCommonJS(clean_exports));
	var { diffSummaryTask: diffSummaryTask2 } = (init_diff(), __toCommonJS(diff_exports));
	var { fetchTask: fetchTask2 } = (init_fetch(), __toCommonJS(fetch_exports));
	var { moveTask: moveTask2 } = (init_move(), __toCommonJS(move_exports));
	var { pullTask: pullTask2 } = (init_pull(), __toCommonJS(pull_exports));
	var { pushTagsTask: pushTagsTask2 } = (init_push(), __toCommonJS(push_exports));
	var { addRemoteTask: addRemoteTask2, getRemotesTask: getRemotesTask2, listRemotesTask: listRemotesTask2, remoteTask: remoteTask2, removeRemoteTask: removeRemoteTask2 } = (init_remote(), __toCommonJS(remote_exports));
	var { getResetMode: getResetMode2, resetTask: resetTask2 } = (init_reset(), __toCommonJS(reset_exports));
	var { stashListTask: stashListTask2 } = (init_stash_list(), __toCommonJS(stash_list_exports));
	var { addSubModuleTask: addSubModuleTask2, initSubModuleTask: initSubModuleTask2, subModuleTask: subModuleTask2, updateSubModuleTask: updateSubModuleTask2 } = (init_sub_module(), __toCommonJS(sub_module_exports));
	var { addAnnotatedTagTask: addAnnotatedTagTask2, addTagTask: addTagTask2, tagListTask: tagListTask2 } = (init_tag(), __toCommonJS(tag_exports));
	var { straightThroughBufferTask: straightThroughBufferTask2, straightThroughStringTask: straightThroughStringTask2 } = (init_task(), __toCommonJS(task_exports));
	function Git2(options, plugins) {
		this._plugins = plugins;
		this._executor = new GitExecutor2(options.baseDir, new Scheduler2(options.maxConcurrentProcesses), plugins);
		this._trimmed = options.trimmed;
	}
	(Git2.prototype = Object.create(SimpleGitApi2.prototype)).constructor = Git2;
	Git2.prototype.customBinary = function(command) {
		this._plugins.reconfigure("binary", command);
		return this;
	};
	Git2.prototype.env = function(name, value) {
		if (arguments.length === 1 && typeof name === "object") this._executor.env = name;
		else (this._executor.env = this._executor.env || {})[name] = value;
		return this;
	};
	Git2.prototype.stashList = function(options) {
		return this._runTask(stashListTask2(trailingOptionsArgument2(arguments) || {}, filterArray2(options) && options || []), trailingFunctionArgument2(arguments));
	};
	function createCloneTask(api, task, repoPath, localPath) {
		if (typeof repoPath !== "string") return configurationErrorTask2(`git.${api}() requires a string 'repoPath'`);
		return task(repoPath, filterType2(localPath, filterString2), getTrailingOptions2(arguments));
	}
	Git2.prototype.clone = function() {
		return this._runTask(createCloneTask("clone", cloneTask2, ...arguments), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.mirror = function() {
		return this._runTask(createCloneTask("mirror", cloneMirrorTask2, ...arguments), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.mv = function(from, to) {
		return this._runTask(moveTask2(from, to), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.checkoutLatestTag = function(then) {
		var git = this;
		return this.pull(function() {
			git.tags(function(err, tags) {
				git.checkout(tags.latest, then);
			});
		});
	};
	Git2.prototype.pull = function(remote, branch, options, then) {
		return this._runTask(pullTask2(filterType2(remote, filterString2), filterType2(branch, filterString2), getTrailingOptions2(arguments)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.fetch = function(remote, branch) {
		return this._runTask(fetchTask2(filterType2(remote, filterString2), filterType2(branch, filterString2), getTrailingOptions2(arguments)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.silent = function(silence) {
		console.warn("simple-git deprecation notice: git.silent: logging should be configured using the `debug` library / `DEBUG` environment variable, this will be an error in version 3");
		return this;
	};
	Git2.prototype.tags = function(options, then) {
		return this._runTask(tagListTask2(getTrailingOptions2(arguments)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.rebase = function() {
		return this._runTask(straightThroughStringTask2(["rebase", ...getTrailingOptions2(arguments)]), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.reset = function(mode) {
		return this._runTask(resetTask2(getResetMode2(mode), getTrailingOptions2(arguments)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.revert = function(commit) {
		const next = trailingFunctionArgument2(arguments);
		if (typeof commit !== "string") return this._runTask(configurationErrorTask2("Commit must be a string"), next);
		return this._runTask(straightThroughStringTask2([
			"revert",
			...getTrailingOptions2(arguments, 0, true),
			commit
		]), next);
	};
	Git2.prototype.addTag = function(name) {
		const task = typeof name === "string" ? addTagTask2(name) : configurationErrorTask2("Git.addTag requires a tag name");
		return this._runTask(task, trailingFunctionArgument2(arguments));
	};
	Git2.prototype.addAnnotatedTag = function(tagName, tagMessage) {
		return this._runTask(addAnnotatedTagTask2(tagName, tagMessage), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.deleteLocalBranch = function(branchName, forceDelete, then) {
		return this._runTask(deleteBranchTask2(branchName, typeof forceDelete === "boolean" ? forceDelete : false), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.deleteLocalBranches = function(branchNames, forceDelete, then) {
		return this._runTask(deleteBranchesTask2(branchNames, typeof forceDelete === "boolean" ? forceDelete : false), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.branch = function(options, then) {
		return this._runTask(branchTask2(getTrailingOptions2(arguments)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.branchLocal = function(then) {
		return this._runTask(branchLocalTask2(), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.raw = function(commands) {
		const createRestCommands = !Array.isArray(commands);
		const command = [].slice.call(createRestCommands ? arguments : commands, 0);
		for (let i = 0; i < command.length && createRestCommands; i++) if (!filterPrimitives2(command[i])) {
			command.splice(i, command.length - i);
			break;
		}
		command.push(...getTrailingOptions2(arguments, 0, true));
		var next = trailingFunctionArgument2(arguments);
		if (!command.length) return this._runTask(configurationErrorTask2("Raw: must supply one or more command to execute"), next);
		return this._runTask(straightThroughStringTask2(command, this._trimmed), next);
	};
	Git2.prototype.submoduleAdd = function(repo, path, then) {
		return this._runTask(addSubModuleTask2(repo, path), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.submoduleUpdate = function(args, then) {
		return this._runTask(updateSubModuleTask2(getTrailingOptions2(arguments, true)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.submoduleInit = function(args, then) {
		return this._runTask(initSubModuleTask2(getTrailingOptions2(arguments, true)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.subModule = function(options, then) {
		return this._runTask(subModuleTask2(getTrailingOptions2(arguments)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.listRemote = function() {
		return this._runTask(listRemotesTask2(getTrailingOptions2(arguments)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.addRemote = function(remoteName, remoteRepo, then) {
		return this._runTask(addRemoteTask2(remoteName, remoteRepo, getTrailingOptions2(arguments)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.removeRemote = function(remoteName, then) {
		return this._runTask(removeRemoteTask2(remoteName), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.getRemotes = function(verbose, then) {
		return this._runTask(getRemotesTask2(verbose === true), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.remote = function(options, then) {
		return this._runTask(remoteTask2(getTrailingOptions2(arguments)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.tag = function(options, then) {
		const command = getTrailingOptions2(arguments);
		if (command[0] !== "tag") command.unshift("tag");
		return this._runTask(straightThroughStringTask2(command), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.updateServerInfo = function(then) {
		return this._runTask(straightThroughStringTask2(["update-server-info"]), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.pushTags = function(remote, then) {
		const task = pushTagsTask2({ remote: filterType2(remote, filterString2) }, getTrailingOptions2(arguments));
		return this._runTask(task, trailingFunctionArgument2(arguments));
	};
	Git2.prototype.rm = function(files) {
		return this._runTask(straightThroughStringTask2([
			"rm",
			"-f",
			...asArray2(files)
		]), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.rmKeepLocal = function(files) {
		return this._runTask(straightThroughStringTask2([
			"rm",
			"--cached",
			...asArray2(files)
		]), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.catFile = function(options, then) {
		return this._catFile("utf-8", arguments);
	};
	Git2.prototype.binaryCatFile = function() {
		return this._catFile("buffer", arguments);
	};
	Git2.prototype._catFile = function(format, args) {
		var handler = trailingFunctionArgument2(args);
		var command = ["cat-file"];
		var options = args[0];
		if (typeof options === "string") return this._runTask(configurationErrorTask2("Git.catFile: options must be supplied as an array of strings"), handler);
		if (Array.isArray(options)) command.push.apply(command, options);
		const task = format === "buffer" ? straightThroughBufferTask2(command) : straightThroughStringTask2(command);
		return this._runTask(task, handler);
	};
	Git2.prototype.diff = function(options, then) {
		const task = filterString2(options) ? configurationErrorTask2("git.diff: supplying options as a single string is no longer supported, switch to an array of strings") : straightThroughStringTask2(["diff", ...getTrailingOptions2(arguments)]);
		return this._runTask(task, trailingFunctionArgument2(arguments));
	};
	Git2.prototype.diffSummary = function() {
		return this._runTask(diffSummaryTask2(getTrailingOptions2(arguments, 1)), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.applyPatch = function(patches) {
		const task = !filterStringOrStringArray2(patches) ? configurationErrorTask2(`git.applyPatch requires one or more string patches as the first argument`) : applyPatchTask2(asArray2(patches), getTrailingOptions2([].slice.call(arguments, 1)));
		return this._runTask(task, trailingFunctionArgument2(arguments));
	};
	Git2.prototype.revparse = function() {
		const commands = ["rev-parse", ...getTrailingOptions2(arguments, true)];
		return this._runTask(straightThroughStringTask2(commands, true), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.clean = function(mode, options, then) {
		const usingCleanOptionsArray = isCleanOptionsArray2(mode);
		const cleanMode = usingCleanOptionsArray && mode.join("") || filterType2(mode, filterString2) || "";
		const customArgs = getTrailingOptions2([].slice.call(arguments, usingCleanOptionsArray ? 1 : 0));
		return this._runTask(cleanWithOptionsTask2(cleanMode, customArgs), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.exec = function(then) {
		return this._runTask({
			commands: [],
			format: "utf-8",
			parser() {
				if (typeof then === "function") then();
			}
		});
	};
	Git2.prototype.clearQueue = function() {
		return this;
	};
	Git2.prototype.checkIgnore = function(pathnames, then) {
		return this._runTask(checkIgnoreTask2(asArray2(filterType2(pathnames, filterStringOrStringArray2, []))), trailingFunctionArgument2(arguments));
	};
	Git2.prototype.checkIsRepo = function(checkType, then) {
		return this._runTask(checkIsRepoTask2(filterType2(checkType, filterString2)), trailingFunctionArgument2(arguments));
	};
	module.exports = Git2;
} });
init_pathspec();
init_git_error();
var GitConstructError = class extends GitError {
	constructor(config, message) {
		super(void 0, message);
		this.config = config;
	}
};
init_git_error();
init_git_error();
var GitPluginError = class extends GitError {
	constructor(task, plugin, message) {
		super(task, message);
		this.task = task;
		this.plugin = plugin;
		Object.setPrototypeOf(this, new.target.prototype);
	}
};
init_git_response_error();
init_task_configuration_error();
init_check_is_repo();
init_clean();
init_config();
init_diff_name_status();
init_grep();
init_reset();
function abortPlugin(signal) {
	if (!signal) return;
	return [{
		type: "spawn.before",
		action(_data, context) {
			if (signal.aborted) context.kill(new GitPluginError(void 0, "abort", "Abort already signaled"));
		}
	}, {
		type: "spawn.after",
		action(_data, context) {
			function kill() {
				context.kill(new GitPluginError(void 0, "abort", "Abort signal received"));
			}
			signal.addEventListener("abort", kill);
			context.spawned.on("close", () => signal.removeEventListener("abort", kill));
		}
	}];
}
function isConfigSwitch(arg) {
	return typeof arg === "string" && arg.trim().toLowerCase() === "-c";
}
function preventProtocolOverride(arg, next) {
	if (!isConfigSwitch(arg)) return;
	if (!/^\s*protocol(.[a-z]+)?.allow/.test(next)) return;
	throw new GitPluginError(void 0, "unsafe", "Configuring protocol.allow is not permitted without enabling allowUnsafeExtProtocol");
}
function preventUploadPack(arg, method) {
	if (/^\s*--(upload|receive)-pack/.test(arg)) throw new GitPluginError(void 0, "unsafe", `Use of --upload-pack or --receive-pack is not permitted without enabling allowUnsafePack`);
	if (method === "clone" && /^\s*-u\b/.test(arg)) throw new GitPluginError(void 0, "unsafe", `Use of clone with option -u is not permitted without enabling allowUnsafePack`);
	if (method === "push" && /^\s*--exec\b/.test(arg)) throw new GitPluginError(void 0, "unsafe", `Use of push with option --exec is not permitted without enabling allowUnsafePack`);
}
function blockUnsafeOperationsPlugin({ allowUnsafeProtocolOverride = false, allowUnsafePack = false } = {}) {
	return {
		type: "spawn.args",
		action(args, context) {
			args.forEach((current, index) => {
				const next = index < args.length ? args[index + 1] : "";
				allowUnsafeProtocolOverride || preventProtocolOverride(current, next);
				allowUnsafePack || preventUploadPack(current, context.method);
			});
			return args;
		}
	};
}
init_utils();
function commandConfigPrefixingPlugin(configuration) {
	const prefix = prefixedArray(configuration, "-c");
	return {
		type: "spawn.args",
		action(data) {
			return [...prefix, ...data];
		}
	};
}
init_utils();
var never = (0, import_dist$1.deferred)().promise;
function completionDetectionPlugin({ onClose = true, onExit = 50 } = {}) {
	function createEvents() {
		let exitCode = -1;
		const events = {
			close: (0, import_dist$1.deferred)(),
			closeTimeout: (0, import_dist$1.deferred)(),
			exit: (0, import_dist$1.deferred)(),
			exitTimeout: (0, import_dist$1.deferred)()
		};
		const result = Promise.race([onClose === false ? never : events.closeTimeout.promise, onExit === false ? never : events.exitTimeout.promise]);
		configureTimeout(onClose, events.close, events.closeTimeout);
		configureTimeout(onExit, events.exit, events.exitTimeout);
		return {
			close(code) {
				exitCode = code;
				events.close.done();
			},
			exit(code) {
				exitCode = code;
				events.exit.done();
			},
			get exitCode() {
				return exitCode;
			},
			result
		};
	}
	function configureTimeout(flag, event, timeout) {
		if (flag === false) return;
		(flag === true ? event.promise : event.promise.then(() => delay(flag))).then(timeout.done);
	}
	return {
		type: "spawn.after",
		async action(_data, { spawned, close }) {
			const events = createEvents();
			let deferClose = true;
			let quickClose = () => void (deferClose = false);
			spawned.stdout?.on("data", quickClose);
			spawned.stderr?.on("data", quickClose);
			spawned.on("error", quickClose);
			spawned.on("close", (code) => events.close(code));
			spawned.on("exit", (code) => events.exit(code));
			try {
				await events.result;
				if (deferClose) await delay(50);
				close(events.exitCode);
			} catch (err) {
				close(events.exitCode, err);
			}
		}
	};
}
init_utils();
var WRONG_NUMBER_ERR = `Invalid value supplied for custom binary, requires a single string or an array containing either one or two strings`;
var WRONG_CHARS_ERR = `Invalid value supplied for custom binary, restricted characters must be removed or supply the unsafe.allowUnsafeCustomBinary option`;
function isBadArgument(arg) {
	return !arg || !/^([a-z]:)?([a-z0-9/.\\_-]+)$/i.test(arg);
}
function toBinaryConfig(input, allowUnsafe) {
	if (input.length < 1 || input.length > 2) throw new GitPluginError(void 0, "binary", WRONG_NUMBER_ERR);
	if (input.some(isBadArgument)) if (allowUnsafe) console.warn(WRONG_CHARS_ERR);
	else throw new GitPluginError(void 0, "binary", WRONG_CHARS_ERR);
	const [binary, prefix] = input;
	return {
		binary,
		prefix
	};
}
function customBinaryPlugin(plugins, input = ["git"], allowUnsafe = false) {
	let config = toBinaryConfig(asArray(input), allowUnsafe);
	plugins.on("binary", (input2) => {
		config = toBinaryConfig(asArray(input2), allowUnsafe);
	});
	plugins.append("spawn.binary", () => {
		return config.binary;
	});
	plugins.append("spawn.args", (data) => {
		return config.prefix ? [config.prefix, ...data] : data;
	});
}
init_git_error();
function isTaskError(result) {
	return !!(result.exitCode && result.stdErr.length);
}
function getErrorMessage(result) {
	return Buffer.concat([...result.stdOut, ...result.stdErr]);
}
function errorDetectionHandler(overwrite = false, isError = isTaskError, errorMessage = getErrorMessage) {
	return (error, result) => {
		if (!overwrite && error || !isError(result)) return error;
		return errorMessage(result);
	};
}
function errorDetectionPlugin(config) {
	return {
		type: "task.error",
		action(data, context) {
			const error = config(data.error, {
				stdErr: context.stdErr,
				stdOut: context.stdOut,
				exitCode: context.exitCode
			});
			if (Buffer.isBuffer(error)) return { error: new GitError(void 0, error.toString("utf-8")) };
			return { error };
		}
	};
}
init_utils();
var PluginStore = class {
	constructor() {
		this.plugins = /* @__PURE__ */ new Set();
		this.events = new EventEmitter();
	}
	on(type, listener) {
		this.events.on(type, listener);
	}
	reconfigure(type, data) {
		this.events.emit(type, data);
	}
	append(type, action) {
		const plugin = append(this.plugins, {
			type,
			action
		});
		return () => this.plugins.delete(plugin);
	}
	add(plugin) {
		const plugins = [];
		asArray(plugin).forEach((plugin2) => plugin2 && this.plugins.add(append(plugins, plugin2)));
		return () => {
			plugins.forEach((plugin2) => this.plugins.delete(plugin2));
		};
	}
	exec(type, data, context) {
		let output = data;
		const contextual = Object.freeze(Object.create(context));
		for (const plugin of this.plugins) if (plugin.type === type) output = plugin.action(output, contextual);
		return output;
	}
};
init_utils();
function progressMonitorPlugin(progress) {
	const progressCommand = "--progress";
	const progressMethods = [
		"checkout",
		"clone",
		"fetch",
		"pull",
		"push"
	];
	return [{
		type: "spawn.args",
		action(args, context) {
			if (!progressMethods.includes(context.method)) return args;
			return including(args, progressCommand);
		}
	}, {
		type: "spawn.after",
		action(_data, context) {
			if (!context.commands.includes(progressCommand)) return;
			context.spawned.stderr?.on("data", (chunk) => {
				const message = /^([\s\S]+?):\s*(\d+)% \((\d+)\/(\d+)\)/.exec(chunk.toString("utf8"));
				if (!message) return;
				progress({
					method: context.method,
					stage: progressEventStage(message[1]),
					progress: asNumber(message[2]),
					processed: asNumber(message[3]),
					total: asNumber(message[4])
				});
			});
		}
	}];
}
function progressEventStage(input) {
	return String(input.toLowerCase().split(" ", 1)) || "unknown";
}
init_utils();
function spawnOptionsPlugin(spawnOptions) {
	const options = pick(spawnOptions, ["uid", "gid"]);
	return {
		type: "spawn.options",
		action(data) {
			return {
				...options,
				...data
			};
		}
	};
}
function timeoutPlugin({ block, stdErr = true, stdOut = true }) {
	if (block > 0) return {
		type: "spawn.after",
		action(_data, context) {
			let timeout;
			function wait() {
				timeout && clearTimeout(timeout);
				timeout = setTimeout(kill, block);
			}
			function stop() {
				context.spawned.stdout?.off("data", wait);
				context.spawned.stderr?.off("data", wait);
				context.spawned.off("exit", stop);
				context.spawned.off("close", stop);
				timeout && clearTimeout(timeout);
			}
			function kill() {
				stop();
				context.kill(new GitPluginError(void 0, "timeout", `block timeout reached`));
			}
			stdOut && context.spawned.stdout?.on("data", wait);
			stdErr && context.spawned.stderr?.on("data", wait);
			context.spawned.on("exit", stop);
			context.spawned.on("close", stop);
			wait();
		}
	};
}
init_pathspec();
function suffixPathsPlugin() {
	return {
		type: "spawn.args",
		action(data) {
			const prefix = [];
			let suffix;
			function append2(args) {
				(suffix = suffix || []).push(...args);
			}
			for (let i = 0; i < data.length; i++) {
				const param = data[i];
				if (isPathSpec(param)) {
					append2(toPaths(param));
					continue;
				}
				if (param === "--") {
					append2(data.slice(i + 1).flatMap((item) => isPathSpec(item) && toPaths(item) || item));
					break;
				}
				prefix.push(param);
			}
			return !suffix ? prefix : [
				...prefix,
				"--",
				...suffix.map(String)
			];
		}
	};
}
init_utils();
var Git = require_git();
function gitInstanceFactory(baseDir, options) {
	const plugins = new PluginStore();
	const config = createInstanceConfig(baseDir && (typeof baseDir === "string" ? { baseDir } : baseDir) || {}, options);
	if (!folderExists(config.baseDir)) throw new GitConstructError(config, `Cannot use simple-git on a directory that does not exist`);
	if (Array.isArray(config.config)) plugins.add(commandConfigPrefixingPlugin(config.config));
	plugins.add(blockUnsafeOperationsPlugin(config.unsafe));
	plugins.add(suffixPathsPlugin());
	plugins.add(completionDetectionPlugin(config.completion));
	config.abort && plugins.add(abortPlugin(config.abort));
	config.progress && plugins.add(progressMonitorPlugin(config.progress));
	config.timeout && plugins.add(timeoutPlugin(config.timeout));
	config.spawnOptions && plugins.add(spawnOptionsPlugin(config.spawnOptions));
	plugins.add(errorDetectionPlugin(errorDetectionHandler(true)));
	config.errors && plugins.add(errorDetectionPlugin(config.errors));
	customBinaryPlugin(plugins, config.binary, config.unsafe?.allowUnsafeCustomBinary);
	return new Git(config, plugins);
}
init_git_response_error();
var esm_default = gitInstanceFactory;
var require_identity = /* @__PURE__ */ __commonJSMin(((exports) => {
	const ALIAS = Symbol.for("yaml.alias");
	const DOC = Symbol.for("yaml.document");
	const MAP = Symbol.for("yaml.map");
	const PAIR = Symbol.for("yaml.pair");
	const SCALAR = Symbol.for("yaml.scalar");
	const SEQ = Symbol.for("yaml.seq");
	const NODE_TYPE = Symbol.for("yaml.node.type");
	const isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
	const isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
	const isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
	const isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
	const isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
	const isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
	function isCollection(node) {
		if (node && typeof node === "object") switch (node[NODE_TYPE]) {
			case MAP:
			case SEQ: return true;
		}
		return false;
	}
	function isNode(node) {
		if (node && typeof node === "object") switch (node[NODE_TYPE]) {
			case ALIAS:
			case MAP:
			case SCALAR:
			case SEQ: return true;
		}
		return false;
	}
	const hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
	exports.ALIAS = ALIAS;
	exports.DOC = DOC;
	exports.MAP = MAP;
	exports.NODE_TYPE = NODE_TYPE;
	exports.PAIR = PAIR;
	exports.SCALAR = SCALAR;
	exports.SEQ = SEQ;
	exports.hasAnchor = hasAnchor;
	exports.isAlias = isAlias;
	exports.isCollection = isCollection;
	exports.isDocument = isDocument;
	exports.isMap = isMap;
	exports.isNode = isNode;
	exports.isPair = isPair;
	exports.isScalar = isScalar;
	exports.isSeq = isSeq;
}));
var require_visit = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	const BREAK = Symbol("break visit");
	const SKIP = Symbol("skip children");
	const REMOVE = Symbol("remove node");
	function visit(node, visitor) {
		const visitor_ = initVisitor(visitor);
		if (identity.isDocument(node)) {
			if (visit_(null, node.contents, visitor_, Object.freeze([node])) === REMOVE) node.contents = null;
		} else visit_(null, node, visitor_, Object.freeze([]));
	}
	visit.BREAK = BREAK;
	visit.SKIP = SKIP;
	visit.REMOVE = REMOVE;
	function visit_(key, node, visitor, path) {
		const ctrl = callVisitor(key, node, visitor, path);
		if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
			replaceNode(key, path, ctrl);
			return visit_(key, ctrl, visitor, path);
		}
		if (typeof ctrl !== "symbol") {
			if (identity.isCollection(node)) {
				path = Object.freeze(path.concat(node));
				for (let i = 0; i < node.items.length; ++i) {
					const ci = visit_(i, node.items[i], visitor, path);
					if (typeof ci === "number") i = ci - 1;
					else if (ci === BREAK) return BREAK;
					else if (ci === REMOVE) {
						node.items.splice(i, 1);
						i -= 1;
					}
				}
			} else if (identity.isPair(node)) {
				path = Object.freeze(path.concat(node));
				const ck = visit_("key", node.key, visitor, path);
				if (ck === BREAK) return BREAK;
				else if (ck === REMOVE) node.key = null;
				const cv = visit_("value", node.value, visitor, path);
				if (cv === BREAK) return BREAK;
				else if (cv === REMOVE) node.value = null;
			}
		}
		return ctrl;
	}
	async function visitAsync(node, visitor) {
		const visitor_ = initVisitor(visitor);
		if (identity.isDocument(node)) {
			if (await visitAsync_(null, node.contents, visitor_, Object.freeze([node])) === REMOVE) node.contents = null;
		} else await visitAsync_(null, node, visitor_, Object.freeze([]));
	}
	visitAsync.BREAK = BREAK;
	visitAsync.SKIP = SKIP;
	visitAsync.REMOVE = REMOVE;
	async function visitAsync_(key, node, visitor, path) {
		const ctrl = await callVisitor(key, node, visitor, path);
		if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
			replaceNode(key, path, ctrl);
			return visitAsync_(key, ctrl, visitor, path);
		}
		if (typeof ctrl !== "symbol") {
			if (identity.isCollection(node)) {
				path = Object.freeze(path.concat(node));
				for (let i = 0; i < node.items.length; ++i) {
					const ci = await visitAsync_(i, node.items[i], visitor, path);
					if (typeof ci === "number") i = ci - 1;
					else if (ci === BREAK) return BREAK;
					else if (ci === REMOVE) {
						node.items.splice(i, 1);
						i -= 1;
					}
				}
			} else if (identity.isPair(node)) {
				path = Object.freeze(path.concat(node));
				const ck = await visitAsync_("key", node.key, visitor, path);
				if (ck === BREAK) return BREAK;
				else if (ck === REMOVE) node.key = null;
				const cv = await visitAsync_("value", node.value, visitor, path);
				if (cv === BREAK) return BREAK;
				else if (cv === REMOVE) node.value = null;
			}
		}
		return ctrl;
	}
	function initVisitor(visitor) {
		if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) return Object.assign({
			Alias: visitor.Node,
			Map: visitor.Node,
			Scalar: visitor.Node,
			Seq: visitor.Node
		}, visitor.Value && {
			Map: visitor.Value,
			Scalar: visitor.Value,
			Seq: visitor.Value
		}, visitor.Collection && {
			Map: visitor.Collection,
			Seq: visitor.Collection
		}, visitor);
		return visitor;
	}
	function callVisitor(key, node, visitor, path) {
		if (typeof visitor === "function") return visitor(key, node, path);
		if (identity.isMap(node)) return visitor.Map?.(key, node, path);
		if (identity.isSeq(node)) return visitor.Seq?.(key, node, path);
		if (identity.isPair(node)) return visitor.Pair?.(key, node, path);
		if (identity.isScalar(node)) return visitor.Scalar?.(key, node, path);
		if (identity.isAlias(node)) return visitor.Alias?.(key, node, path);
	}
	function replaceNode(key, path, node) {
		const parent = path[path.length - 1];
		if (identity.isCollection(parent)) parent.items[key] = node;
		else if (identity.isPair(parent)) if (key === "key") parent.key = node;
		else parent.value = node;
		else if (identity.isDocument(parent)) parent.contents = node;
		else {
			const pt = identity.isAlias(parent) ? "alias" : "scalar";
			throw new Error(`Cannot replace node with ${pt} parent`);
		}
	}
	exports.visit = visit;
	exports.visitAsync = visitAsync;
}));
var require_directives = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var visit = require_visit();
	const escapeChars = {
		"!": "%21",
		",": "%2C",
		"[": "%5B",
		"]": "%5D",
		"{": "%7B",
		"}": "%7D"
	};
	const escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
	var Directives = class Directives {
		constructor(yaml, tags) {
			this.docStart = null;
			this.docEnd = false;
			this.yaml = Object.assign({}, Directives.defaultYaml, yaml);
			this.tags = Object.assign({}, Directives.defaultTags, tags);
		}
		clone() {
			const copy = new Directives(this.yaml, this.tags);
			copy.docStart = this.docStart;
			return copy;
		}
		atDocument() {
			const res = new Directives(this.yaml, this.tags);
			switch (this.yaml.version) {
				case "1.1":
					this.atNextDocument = true;
					break;
				case "1.2":
					this.atNextDocument = false;
					this.yaml = {
						explicit: Directives.defaultYaml.explicit,
						version: "1.2"
					};
					this.tags = Object.assign({}, Directives.defaultTags);
					break;
			}
			return res;
		}
		add(line, onError) {
			if (this.atNextDocument) {
				this.yaml = {
					explicit: Directives.defaultYaml.explicit,
					version: "1.1"
				};
				this.tags = Object.assign({}, Directives.defaultTags);
				this.atNextDocument = false;
			}
			const parts = line.trim().split(/[ \t]+/);
			const name = parts.shift();
			switch (name) {
				case "%TAG": {
					if (parts.length !== 2) {
						onError(0, "%TAG directive should contain exactly two parts");
						if (parts.length < 2) return false;
					}
					const [handle, prefix] = parts;
					this.tags[handle] = prefix;
					return true;
				}
				case "%YAML": {
					this.yaml.explicit = true;
					if (parts.length !== 1) {
						onError(0, "%YAML directive should contain exactly one part");
						return false;
					}
					const [version] = parts;
					if (version === "1.1" || version === "1.2") {
						this.yaml.version = version;
						return true;
					} else {
						const isValid = /^\d+\.\d+$/.test(version);
						onError(6, `Unsupported YAML version ${version}`, isValid);
						return false;
					}
				}
				default:
					onError(0, `Unknown directive ${name}`, true);
					return false;
			}
		}
		tagName(source, onError) {
			if (source === "!") return "!";
			if (source[0] !== "!") {
				onError(`Not a valid tag: ${source}`);
				return null;
			}
			if (source[1] === "<") {
				const verbatim = source.slice(2, -1);
				if (verbatim === "!" || verbatim === "!!") {
					onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
					return null;
				}
				if (source[source.length - 1] !== ">") onError("Verbatim tags must end with a >");
				return verbatim;
			}
			const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
			if (!suffix) onError(`The ${source} tag has no suffix`);
			const prefix = this.tags[handle];
			if (prefix) try {
				return prefix + decodeURIComponent(suffix);
			} catch (error) {
				onError(String(error));
				return null;
			}
			if (handle === "!") return source;
			onError(`Could not resolve tag: ${source}`);
			return null;
		}
		tagString(tag) {
			for (const [handle, prefix] of Object.entries(this.tags)) if (tag.startsWith(prefix)) return handle + escapeTagName(tag.substring(prefix.length));
			return tag[0] === "!" ? tag : `!<${tag}>`;
		}
		toString(doc) {
			const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
			const tagEntries = Object.entries(this.tags);
			let tagNames;
			if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
				const tags = {};
				visit.visit(doc.contents, (_key, node) => {
					if (identity.isNode(node) && node.tag) tags[node.tag] = true;
				});
				tagNames = Object.keys(tags);
			} else tagNames = [];
			for (const [handle, prefix] of tagEntries) {
				if (handle === "!!" && prefix === "tag:yaml.org,2002:") continue;
				if (!doc || tagNames.some((tn) => tn.startsWith(prefix))) lines.push(`%TAG ${handle} ${prefix}`);
			}
			return lines.join("\n");
		}
	};
	Directives.defaultYaml = {
		explicit: false,
		version: "1.2"
	};
	Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
	exports.Directives = Directives;
}));
var require_anchors = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var visit = require_visit();
	function anchorIsValid(anchor) {
		if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
			const msg = `Anchor must not contain whitespace or control characters: ${JSON.stringify(anchor)}`;
			throw new Error(msg);
		}
		return true;
	}
	function anchorNames(root) {
		const anchors = /* @__PURE__ */ new Set();
		visit.visit(root, { Value(_key, node) {
			if (node.anchor) anchors.add(node.anchor);
		} });
		return anchors;
	}
	function findNewAnchor(prefix, exclude) {
		for (let i = 1;; ++i) {
			const name = `${prefix}${i}`;
			if (!exclude.has(name)) return name;
		}
	}
	function createNodeAnchors(doc, prefix) {
		const aliasObjects = [];
		const sourceObjects = /* @__PURE__ */ new Map();
		let prevAnchors = null;
		return {
			onAnchor: (source) => {
				aliasObjects.push(source);
				prevAnchors ?? (prevAnchors = anchorNames(doc));
				const anchor = findNewAnchor(prefix, prevAnchors);
				prevAnchors.add(anchor);
				return anchor;
			},
			setAnchors: () => {
				for (const source of aliasObjects) {
					const ref = sourceObjects.get(source);
					if (typeof ref === "object" && ref.anchor && (identity.isScalar(ref.node) || identity.isCollection(ref.node))) ref.node.anchor = ref.anchor;
					else {
						const error = /* @__PURE__ */ new Error("Failed to resolve repeated object (this should not happen)");
						error.source = source;
						throw error;
					}
				}
			},
			sourceObjects
		};
	}
	exports.anchorIsValid = anchorIsValid;
	exports.anchorNames = anchorNames;
	exports.createNodeAnchors = createNodeAnchors;
	exports.findNewAnchor = findNewAnchor;
}));
var require_applyReviver = /* @__PURE__ */ __commonJSMin(((exports) => {
	function applyReviver(reviver, obj, key, val) {
		if (val && typeof val === "object") if (Array.isArray(val)) for (let i = 0, len = val.length; i < len; ++i) {
			const v0 = val[i];
			const v1 = applyReviver(reviver, val, String(i), v0);
			if (v1 === void 0) delete val[i];
			else if (v1 !== v0) val[i] = v1;
		}
		else if (val instanceof Map) for (const k of Array.from(val.keys())) {
			const v0 = val.get(k);
			const v1 = applyReviver(reviver, val, k, v0);
			if (v1 === void 0) val.delete(k);
			else if (v1 !== v0) val.set(k, v1);
		}
		else if (val instanceof Set) for (const v0 of Array.from(val)) {
			const v1 = applyReviver(reviver, val, v0, v0);
			if (v1 === void 0) val.delete(v0);
			else if (v1 !== v0) {
				val.delete(v0);
				val.add(v1);
			}
		}
		else for (const [k, v0] of Object.entries(val)) {
			const v1 = applyReviver(reviver, val, k, v0);
			if (v1 === void 0) delete val[k];
			else if (v1 !== v0) val[k] = v1;
		}
		return reviver.call(obj, key, val);
	}
	exports.applyReviver = applyReviver;
}));
var require_toJS = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	function toJS(value, arg, ctx) {
		if (Array.isArray(value)) return value.map((v, i) => toJS(v, String(i), ctx));
		if (value && typeof value.toJSON === "function") {
			if (!ctx || !identity.hasAnchor(value)) return value.toJSON(arg, ctx);
			const data = {
				aliasCount: 0,
				count: 1,
				res: void 0
			};
			ctx.anchors.set(value, data);
			ctx.onCreate = (res) => {
				data.res = res;
				delete ctx.onCreate;
			};
			const res = value.toJSON(arg, ctx);
			if (ctx.onCreate) ctx.onCreate(res);
			return res;
		}
		if (typeof value === "bigint" && !ctx?.keep) return Number(value);
		return value;
	}
	exports.toJS = toJS;
}));
var require_Node = /* @__PURE__ */ __commonJSMin(((exports) => {
	var applyReviver = require_applyReviver();
	var identity = require_identity();
	var toJS = require_toJS();
	var NodeBase = class {
		constructor(type) {
			Object.defineProperty(this, identity.NODE_TYPE, { value: type });
		}
		clone() {
			const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
			if (this.range) copy.range = this.range.slice();
			return copy;
		}
		toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
			if (!identity.isDocument(doc)) throw new TypeError("A document argument is required");
			const ctx = {
				anchors: /* @__PURE__ */ new Map(),
				doc,
				keep: true,
				mapAsMap: mapAsMap === true,
				mapKeyWarned: false,
				maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
			};
			const res = toJS.toJS(this, "", ctx);
			if (typeof onAnchor === "function") for (const { count, res } of ctx.anchors.values()) onAnchor(res, count);
			return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
		}
	};
	exports.NodeBase = NodeBase;
}));
var require_Alias = /* @__PURE__ */ __commonJSMin(((exports) => {
	var anchors = require_anchors();
	var visit = require_visit();
	var identity = require_identity();
	var Node = require_Node();
	var toJS = require_toJS();
	var Alias = class extends Node.NodeBase {
		constructor(source) {
			super(identity.ALIAS);
			this.source = source;
			Object.defineProperty(this, "tag", { set() {
				throw new Error("Alias nodes cannot have tags");
			} });
		}
		resolve(doc, ctx) {
			let nodes;
			if (ctx?.aliasResolveCache) nodes = ctx.aliasResolveCache;
			else {
				nodes = [];
				visit.visit(doc, { Node: (_key, node) => {
					if (identity.isAlias(node) || identity.hasAnchor(node)) nodes.push(node);
				} });
				if (ctx) ctx.aliasResolveCache = nodes;
			}
			let found = void 0;
			for (const node of nodes) {
				if (node === this) break;
				if (node.anchor === this.source) found = node;
			}
			return found;
		}
		toJSON(_arg, ctx) {
			if (!ctx) return { source: this.source };
			const { anchors, doc, maxAliasCount } = ctx;
			const source = this.resolve(doc, ctx);
			if (!source) {
				const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
				throw new ReferenceError(msg);
			}
			let data = anchors.get(source);
			if (!data) {
				toJS.toJS(source, null, ctx);
				data = anchors.get(source);
			}
			/* istanbul ignore if */
			if (data?.res === void 0) throw new ReferenceError("This should not happen: Alias anchor was not resolved?");
			if (maxAliasCount >= 0) {
				data.count += 1;
				if (data.aliasCount === 0) data.aliasCount = getAliasCount(doc, source, anchors);
				if (data.count * data.aliasCount > maxAliasCount) throw new ReferenceError("Excessive alias count indicates a resource exhaustion attack");
			}
			return data.res;
		}
		toString(ctx, _onComment, _onChompKeep) {
			const src = `*${this.source}`;
			if (ctx) {
				anchors.anchorIsValid(this.source);
				if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
					const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
					throw new Error(msg);
				}
				if (ctx.implicitKey) return `${src} `;
			}
			return src;
		}
	};
	function getAliasCount(doc, node, anchors) {
		if (identity.isAlias(node)) {
			const source = node.resolve(doc);
			const anchor = anchors && source && anchors.get(source);
			return anchor ? anchor.count * anchor.aliasCount : 0;
		} else if (identity.isCollection(node)) {
			let count = 0;
			for (const item of node.items) {
				const c = getAliasCount(doc, item, anchors);
				if (c > count) count = c;
			}
			return count;
		} else if (identity.isPair(node)) {
			const kc = getAliasCount(doc, node.key, anchors);
			const vc = getAliasCount(doc, node.value, anchors);
			return Math.max(kc, vc);
		}
		return 1;
	}
	exports.Alias = Alias;
}));
var require_Scalar = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var Node = require_Node();
	var toJS = require_toJS();
	const isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
	var Scalar = class extends Node.NodeBase {
		constructor(value) {
			super(identity.SCALAR);
			this.value = value;
		}
		toJSON(arg, ctx) {
			return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
		}
		toString() {
			return String(this.value);
		}
	};
	Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
	Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
	Scalar.PLAIN = "PLAIN";
	Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
	Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
	exports.Scalar = Scalar;
	exports.isScalarValue = isScalarValue;
}));
var require_createNode = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Alias = require_Alias();
	var identity = require_identity();
	var Scalar = require_Scalar();
	const defaultTagPrefix = "tag:yaml.org,2002:";
	function findTagObject(value, tagName, tags) {
		if (tagName) {
			const match = tags.filter((t) => t.tag === tagName);
			const tagObj = match.find((t) => !t.format) ?? match[0];
			if (!tagObj) throw new Error(`Tag ${tagName} not found`);
			return tagObj;
		}
		return tags.find((t) => t.identify?.(value) && !t.format);
	}
	function createNode(value, tagName, ctx) {
		if (identity.isDocument(value)) value = value.contents;
		if (identity.isNode(value)) return value;
		if (identity.isPair(value)) {
			const map = ctx.schema[identity.MAP].createNode?.(ctx.schema, null, ctx);
			map.items.push(value);
			return map;
		}
		if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) value = value.valueOf();
		const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
		let ref = void 0;
		if (aliasDuplicateObjects && value && typeof value === "object") {
			ref = sourceObjects.get(value);
			if (ref) {
				ref.anchor ?? (ref.anchor = onAnchor(value));
				return new Alias.Alias(ref.anchor);
			} else {
				ref = {
					anchor: null,
					node: null
				};
				sourceObjects.set(value, ref);
			}
		}
		if (tagName?.startsWith("!!")) tagName = defaultTagPrefix + tagName.slice(2);
		let tagObj = findTagObject(value, tagName, schema.tags);
		if (!tagObj) {
			if (value && typeof value.toJSON === "function") value = value.toJSON();
			if (!value || typeof value !== "object") {
				const node = new Scalar.Scalar(value);
				if (ref) ref.node = node;
				return node;
			}
			tagObj = value instanceof Map ? schema[identity.MAP] : Symbol.iterator in Object(value) ? schema[identity.SEQ] : schema[identity.MAP];
		}
		if (onTagObj) {
			onTagObj(tagObj);
			delete ctx.onTagObj;
		}
		const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
		if (tagName) node.tag = tagName;
		else if (!tagObj.default) node.tag = tagObj.tag;
		if (ref) ref.node = node;
		return node;
	}
	exports.createNode = createNode;
}));
var require_Collection = /* @__PURE__ */ __commonJSMin(((exports) => {
	var createNode = require_createNode();
	var identity = require_identity();
	var Node = require_Node();
	function collectionFromPath(schema, path, value) {
		let v = value;
		for (let i = path.length - 1; i >= 0; --i) {
			const k = path[i];
			if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
				const a = [];
				a[k] = v;
				v = a;
			} else v = new Map([[k, v]]);
		}
		return createNode.createNode(v, void 0, {
			aliasDuplicateObjects: false,
			keepUndefined: false,
			onAnchor: () => {
				throw new Error("This should not happen, please report a bug.");
			},
			schema,
			sourceObjects: /* @__PURE__ */ new Map()
		});
	}
	const isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
	var Collection = class extends Node.NodeBase {
		constructor(type, schema) {
			super(type);
			Object.defineProperty(this, "schema", {
				value: schema,
				configurable: true,
				enumerable: false,
				writable: true
			});
		}
		clone(schema) {
			const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
			if (schema) copy.schema = schema;
			copy.items = copy.items.map((it) => identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it);
			if (this.range) copy.range = this.range.slice();
			return copy;
		}
		addIn(path, value) {
			if (isEmptyPath(path)) this.add(value);
			else {
				const [key, ...rest] = path;
				const node = this.get(key, true);
				if (identity.isCollection(node)) node.addIn(rest, value);
				else if (node === void 0 && this.schema) this.set(key, collectionFromPath(this.schema, rest, value));
				else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
			}
		}
		deleteIn(path) {
			const [key, ...rest] = path;
			if (rest.length === 0) return this.delete(key);
			const node = this.get(key, true);
			if (identity.isCollection(node)) return node.deleteIn(rest);
			else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
		}
		getIn(path, keepScalar) {
			const [key, ...rest] = path;
			const node = this.get(key, true);
			if (rest.length === 0) return !keepScalar && identity.isScalar(node) ? node.value : node;
			else return identity.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
		}
		hasAllNullValues(allowScalar) {
			return this.items.every((node) => {
				if (!identity.isPair(node)) return false;
				const n = node.value;
				return n == null || allowScalar && identity.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
			});
		}
		hasIn(path) {
			const [key, ...rest] = path;
			if (rest.length === 0) return this.has(key);
			const node = this.get(key, true);
			return identity.isCollection(node) ? node.hasIn(rest) : false;
		}
		setIn(path, value) {
			const [key, ...rest] = path;
			if (rest.length === 0) this.set(key, value);
			else {
				const node = this.get(key, true);
				if (identity.isCollection(node)) node.setIn(rest, value);
				else if (node === void 0 && this.schema) this.set(key, collectionFromPath(this.schema, rest, value));
				else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
			}
		}
	};
	exports.Collection = Collection;
	exports.collectionFromPath = collectionFromPath;
	exports.isEmptyPath = isEmptyPath;
}));
var require_stringifyComment = /* @__PURE__ */ __commonJSMin(((exports) => {
	const stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
	function indentComment(comment, indent) {
		if (/^\n+$/.test(comment)) return comment.substring(1);
		return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
	}
	const lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;
	exports.indentComment = indentComment;
	exports.lineComment = lineComment;
	exports.stringifyComment = stringifyComment;
}));
var require_foldFlowLines = /* @__PURE__ */ __commonJSMin(((exports) => {
	const FOLD_FLOW = "flow";
	const FOLD_BLOCK = "block";
	const FOLD_QUOTED = "quoted";
	function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
		if (!lineWidth || lineWidth < 0) return text;
		if (lineWidth < minContentWidth) minContentWidth = 0;
		const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
		if (text.length <= endStep) return text;
		const folds = [];
		const escapedFolds = {};
		let end = lineWidth - indent.length;
		if (typeof indentAtStart === "number") if (indentAtStart > lineWidth - Math.max(2, minContentWidth)) folds.push(0);
		else end = lineWidth - indentAtStart;
		let split = void 0;
		let prev = void 0;
		let overflow = false;
		let i = -1;
		let escStart = -1;
		let escEnd = -1;
		if (mode === FOLD_BLOCK) {
			i = consumeMoreIndentedLines(text, i, indent.length);
			if (i !== -1) end = i + endStep;
		}
		for (let ch; ch = text[i += 1];) {
			if (mode === FOLD_QUOTED && ch === "\\") {
				escStart = i;
				switch (text[i + 1]) {
					case "x":
						i += 3;
						break;
					case "u":
						i += 5;
						break;
					case "U":
						i += 9;
						break;
					default: i += 1;
				}
				escEnd = i;
			}
			if (ch === "\n") {
				if (mode === FOLD_BLOCK) i = consumeMoreIndentedLines(text, i, indent.length);
				end = i + indent.length + endStep;
				split = void 0;
			} else {
				if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
					const next = text[i + 1];
					if (next && next !== " " && next !== "\n" && next !== "	") split = i;
				}
				if (i >= end) if (split) {
					folds.push(split);
					end = split + endStep;
					split = void 0;
				} else if (mode === FOLD_QUOTED) {
					while (prev === " " || prev === "	") {
						prev = ch;
						ch = text[i += 1];
						overflow = true;
					}
					const j = i > escEnd + 1 ? i - 2 : escStart - 1;
					if (escapedFolds[j]) return text;
					folds.push(j);
					escapedFolds[j] = true;
					end = j + endStep;
					split = void 0;
				} else overflow = true;
			}
			prev = ch;
		}
		if (overflow && onOverflow) onOverflow();
		if (folds.length === 0) return text;
		if (onFold) onFold();
		let res = text.slice(0, folds[0]);
		for (let i = 0; i < folds.length; ++i) {
			const fold = folds[i];
			const end = folds[i + 1] || text.length;
			if (fold === 0) res = `\n${indent}${text.slice(0, end)}`;
			else {
				if (mode === FOLD_QUOTED && escapedFolds[fold]) res += `${text[fold]}\\`;
				res += `\n${indent}${text.slice(fold + 1, end)}`;
			}
		}
		return res;
	}
	function consumeMoreIndentedLines(text, i, indent) {
		let end = i;
		let start = i + 1;
		let ch = text[start];
		while (ch === " " || ch === "	") if (i < start + indent) ch = text[++i];
		else {
			do
				ch = text[++i];
			while (ch && ch !== "\n");
			end = i;
			start = i + 1;
			ch = text[start];
		}
		return end;
	}
	exports.FOLD_BLOCK = FOLD_BLOCK;
	exports.FOLD_FLOW = FOLD_FLOW;
	exports.FOLD_QUOTED = FOLD_QUOTED;
	exports.foldFlowLines = foldFlowLines;
}));
var require_stringifyString = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scalar = require_Scalar();
	var foldFlowLines = require_foldFlowLines();
	const getFoldOptions = (ctx, isBlock) => ({
		indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
		lineWidth: ctx.options.lineWidth,
		minContentWidth: ctx.options.minContentWidth
	});
	const containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
	function lineLengthOverLimit(str, lineWidth, indentLength) {
		if (!lineWidth || lineWidth < 0) return false;
		const limit = lineWidth - indentLength;
		const strLen = str.length;
		if (strLen <= limit) return false;
		for (let i = 0, start = 0; i < strLen; ++i) if (str[i] === "\n") {
			if (i - start > limit) return true;
			start = i + 1;
			if (strLen - start <= limit) return false;
		}
		return true;
	}
	function doubleQuotedString(value, ctx) {
		const json = JSON.stringify(value);
		if (ctx.options.doubleQuotedAsJSON) return json;
		const { implicitKey } = ctx;
		const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
		const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
		let str = "";
		let start = 0;
		for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
			if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
				str += json.slice(start, i) + "\\ ";
				i += 1;
				start = i;
				ch = "\\";
			}
			if (ch === "\\") switch (json[i + 1]) {
				case "u":
					{
						str += json.slice(start, i);
						const code = json.substr(i + 2, 4);
						switch (code) {
							case "0000":
								str += "\\0";
								break;
							case "0007":
								str += "\\a";
								break;
							case "000b":
								str += "\\v";
								break;
							case "001b":
								str += "\\e";
								break;
							case "0085":
								str += "\\N";
								break;
							case "00a0":
								str += "\\_";
								break;
							case "2028":
								str += "\\L";
								break;
							case "2029":
								str += "\\P";
								break;
							default: if (code.substr(0, 2) === "00") str += "\\x" + code.substr(2);
							else str += json.substr(i, 6);
						}
						i += 5;
						start = i + 1;
					}
					break;
				case "n":
					if (implicitKey || json[i + 2] === "\"" || json.length < minMultiLineLength) i += 1;
					else {
						str += json.slice(start, i) + "\n\n";
						while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== "\"") {
							str += "\n";
							i += 2;
						}
						str += indent;
						if (json[i + 2] === " ") str += "\\";
						i += 1;
						start = i + 1;
					}
					break;
				default: i += 1;
			}
		}
		str = start ? str + json.slice(start) : json;
		return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
	}
	function singleQuotedString(value, ctx) {
		if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value)) return doubleQuotedString(value, ctx);
		const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
		const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&\n${indent}`) + "'";
		return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
	}
	function quotedString(value, ctx) {
		const { singleQuote } = ctx.options;
		let qs;
		if (singleQuote === false) qs = doubleQuotedString;
		else {
			const hasDouble = value.includes("\"");
			const hasSingle = value.includes("'");
			if (hasDouble && !hasSingle) qs = singleQuotedString;
			else if (hasSingle && !hasDouble) qs = doubleQuotedString;
			else qs = singleQuote ? singleQuotedString : doubleQuotedString;
		}
		return qs(value, ctx);
	}
	let blockEndNewlines;
	try {
		blockEndNewlines = /* @__PURE__ */ new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
	} catch {
		blockEndNewlines = /\n+(?!\n|$)/g;
	}
	function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
		const { blockQuote, commentString, lineWidth } = ctx.options;
		if (!blockQuote || /\n[\t ]+$/.test(value)) return quotedString(value, ctx);
		const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
		const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
		if (!value) return literal ? "|\n" : ">\n";
		let chomp;
		let endStart;
		for (endStart = value.length; endStart > 0; --endStart) {
			const ch = value[endStart - 1];
			if (ch !== "\n" && ch !== "	" && ch !== " ") break;
		}
		let end = value.substring(endStart);
		const endNlPos = end.indexOf("\n");
		if (endNlPos === -1) chomp = "-";
		else if (value === end || endNlPos !== end.length - 1) {
			chomp = "+";
			if (onChompKeep) onChompKeep();
		} else chomp = "";
		if (end) {
			value = value.slice(0, -end.length);
			if (end[end.length - 1] === "\n") end = end.slice(0, -1);
			end = end.replace(blockEndNewlines, `$&${indent}`);
		}
		let startWithSpace = false;
		let startEnd;
		let startNlPos = -1;
		for (startEnd = 0; startEnd < value.length; ++startEnd) {
			const ch = value[startEnd];
			if (ch === " ") startWithSpace = true;
			else if (ch === "\n") startNlPos = startEnd;
			else break;
		}
		let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
		if (start) {
			value = value.substring(start.length);
			start = start.replace(/\n+/g, `$&${indent}`);
		}
		let header = (startWithSpace ? indent ? "2" : "1" : "") + chomp;
		if (comment) {
			header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
			if (onComment) onComment();
		}
		if (!literal) {
			const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
			let literalFallback = false;
			const foldOptions = getFoldOptions(ctx, true);
			if (blockQuote !== "folded" && type !== Scalar.Scalar.BLOCK_FOLDED) foldOptions.onOverflow = () => {
				literalFallback = true;
			};
			const body = foldFlowLines.foldFlowLines(`${start}${foldedValue}${end}`, indent, foldFlowLines.FOLD_BLOCK, foldOptions);
			if (!literalFallback) return `>${header}\n${indent}${body}`;
		}
		value = value.replace(/\n+/g, `$&${indent}`);
		return `|${header}\n${indent}${start}${value}${end}`;
	}
	function plainString(item, ctx, onComment, onChompKeep) {
		const { type, value } = item;
		const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
		if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) return quotedString(value, ctx);
		if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
		if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) return blockString(item, ctx, onComment, onChompKeep);
		if (containsDocumentMarker(value)) {
			if (indent === "") {
				ctx.forceBlockIndent = true;
				return blockString(item, ctx, onComment, onChompKeep);
			} else if (implicitKey && indent === indentStep) return quotedString(value, ctx);
		}
		const str = value.replace(/\n+/g, `$&\n${indent}`);
		if (actualString) {
			const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
			const { compat, tags } = ctx.doc.schema;
			if (tags.some(test) || compat?.some(test)) return quotedString(value, ctx);
		}
		return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
	}
	function stringifyString(item, ctx, onComment, onChompKeep) {
		const { implicitKey, inFlow } = ctx;
		const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
		let { type } = item;
		if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
			if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value)) type = Scalar.Scalar.QUOTE_DOUBLE;
		}
		const _stringify = (_type) => {
			switch (_type) {
				case Scalar.Scalar.BLOCK_FOLDED:
				case Scalar.Scalar.BLOCK_LITERAL: return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
				case Scalar.Scalar.QUOTE_DOUBLE: return doubleQuotedString(ss.value, ctx);
				case Scalar.Scalar.QUOTE_SINGLE: return singleQuotedString(ss.value, ctx);
				case Scalar.Scalar.PLAIN: return plainString(ss, ctx, onComment, onChompKeep);
				default: return null;
			}
		};
		let res = _stringify(type);
		if (res === null) {
			const { defaultKeyType, defaultStringType } = ctx.options;
			const t = implicitKey && defaultKeyType || defaultStringType;
			res = _stringify(t);
			if (res === null) throw new Error(`Unsupported default string type ${t}`);
		}
		return res;
	}
	exports.stringifyString = stringifyString;
}));
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports) => {
	var anchors = require_anchors();
	var identity = require_identity();
	var stringifyComment = require_stringifyComment();
	var stringifyString = require_stringifyString();
	function createStringifyContext(doc, options) {
		const opt = Object.assign({
			blockQuote: true,
			commentString: stringifyComment.stringifyComment,
			defaultKeyType: null,
			defaultStringType: "PLAIN",
			directives: null,
			doubleQuotedAsJSON: false,
			doubleQuotedMinMultiLineLength: 40,
			falseStr: "false",
			flowCollectionPadding: true,
			indentSeq: true,
			lineWidth: 80,
			minContentWidth: 20,
			nullStr: "null",
			simpleKeys: false,
			singleQuote: null,
			trailingComma: false,
			trueStr: "true",
			verifyAliasOrder: true
		}, doc.schema.toStringOptions, options);
		let inFlow;
		switch (opt.collectionStyle) {
			case "block":
				inFlow = false;
				break;
			case "flow":
				inFlow = true;
				break;
			default: inFlow = null;
		}
		return {
			anchors: /* @__PURE__ */ new Set(),
			doc,
			flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
			indent: "",
			indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
			inFlow,
			options: opt
		};
	}
	function getTagObject(tags, item) {
		if (item.tag) {
			const match = tags.filter((t) => t.tag === item.tag);
			if (match.length > 0) return match.find((t) => t.format === item.format) ?? match[0];
		}
		let tagObj = void 0;
		let obj;
		if (identity.isScalar(item)) {
			obj = item.value;
			let match = tags.filter((t) => t.identify?.(obj));
			if (match.length > 1) {
				const testMatch = match.filter((t) => t.test);
				if (testMatch.length > 0) match = testMatch;
			}
			tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
		} else {
			obj = item;
			tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
		}
		if (!tagObj) {
			const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
			throw new Error(`Tag not resolved for ${name} value`);
		}
		return tagObj;
	}
	function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
		if (!doc.directives) return "";
		const props = [];
		const anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
		if (anchor && anchors.anchorIsValid(anchor)) {
			anchors$1.add(anchor);
			props.push(`&${anchor}`);
		}
		const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
		if (tag) props.push(doc.directives.tagString(tag));
		return props.join(" ");
	}
	function stringify(item, ctx, onComment, onChompKeep) {
		if (identity.isPair(item)) return item.toString(ctx, onComment, onChompKeep);
		if (identity.isAlias(item)) {
			if (ctx.doc.directives) return item.toString(ctx);
			if (ctx.resolvedAliases?.has(item)) throw new TypeError(`Cannot stringify circular structure without alias nodes`);
			else {
				if (ctx.resolvedAliases) ctx.resolvedAliases.add(item);
				else ctx.resolvedAliases = new Set([item]);
				item = item.resolve(ctx.doc);
			}
		}
		let tagObj = void 0;
		const node = identity.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
		tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
		const props = stringifyProps(node, tagObj, ctx);
		if (props.length > 0) ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
		const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
		if (!props) return str;
		return identity.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}\n${ctx.indent}${str}`;
	}
	exports.createStringifyContext = createStringifyContext;
	exports.stringify = stringify;
}));
var require_stringifyPair = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var Scalar = require_Scalar();
	var stringify = require_stringify();
	var stringifyComment = require_stringifyComment();
	function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
		const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
		let keyComment = identity.isNode(key) && key.comment || null;
		if (simpleKeys) {
			if (keyComment) throw new Error("With simple keys, key nodes cannot have comments");
			if (identity.isCollection(key) || !identity.isNode(key) && typeof key === "object") throw new Error("With simple keys, collection cannot be used as a key value");
		}
		let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity.isCollection(key) || (identity.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
		ctx = Object.assign({}, ctx, {
			allNullValues: false,
			implicitKey: !explicitKey && (simpleKeys || !allNullValues),
			indent: indent + indentStep
		});
		let keyCommentDone = false;
		let chompKeep = false;
		let str = stringify.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
		if (!explicitKey && !ctx.inFlow && str.length > 1024) {
			if (simpleKeys) throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
			explicitKey = true;
		}
		if (ctx.inFlow) {
			if (allNullValues || value == null) {
				if (keyCommentDone && onComment) onComment();
				return str === "" ? "?" : explicitKey ? `? ${str}` : str;
			}
		} else if (allNullValues && !simpleKeys || value == null && explicitKey) {
			str = `? ${str}`;
			if (keyComment && !keyCommentDone) str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
			else if (chompKeep && onChompKeep) onChompKeep();
			return str;
		}
		if (keyCommentDone) keyComment = null;
		if (explicitKey) {
			if (keyComment) str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
			str = `? ${str}\n${indent}:`;
		} else {
			str = `${str}:`;
			if (keyComment) str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
		}
		let vsb, vcb, valueComment;
		if (identity.isNode(value)) {
			vsb = !!value.spaceBefore;
			vcb = value.commentBefore;
			valueComment = value.comment;
		} else {
			vsb = false;
			vcb = null;
			valueComment = null;
			if (value && typeof value === "object") value = doc.createNode(value);
		}
		ctx.implicitKey = false;
		if (!explicitKey && !keyComment && identity.isScalar(value)) ctx.indentAtStart = str.length + 1;
		chompKeep = false;
		if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity.isSeq(value) && !value.flow && !value.tag && !value.anchor) ctx.indent = ctx.indent.substring(2);
		let valueCommentDone = false;
		const valueStr = stringify.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
		let ws = " ";
		if (keyComment || vsb || vcb) {
			ws = vsb ? "\n" : "";
			if (vcb) {
				const cs = commentString(vcb);
				ws += `\n${stringifyComment.indentComment(cs, ctx.indent)}`;
			}
			if (valueStr === "" && !ctx.inFlow) {
				if (ws === "\n" && valueComment) ws = "\n\n";
			} else ws += `\n${ctx.indent}`;
		} else if (!explicitKey && identity.isCollection(value)) {
			const vs0 = valueStr[0];
			const nl0 = valueStr.indexOf("\n");
			const hasNewline = nl0 !== -1;
			const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
			if (hasNewline || !flow) {
				let hasPropsLine = false;
				if (hasNewline && (vs0 === "&" || vs0 === "!")) {
					let sp0 = valueStr.indexOf(" ");
					if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") sp0 = valueStr.indexOf(" ", sp0 + 1);
					if (sp0 === -1 || nl0 < sp0) hasPropsLine = true;
				}
				if (!hasPropsLine) ws = `\n${ctx.indent}`;
			}
		} else if (valueStr === "" || valueStr[0] === "\n") ws = "";
		str += ws + valueStr;
		if (ctx.inFlow) {
			if (valueCommentDone && onComment) onComment();
		} else if (valueComment && !valueCommentDone) str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
		else if (chompKeep && onChompKeep) onChompKeep();
		return str;
	}
	exports.stringifyPair = stringifyPair;
}));
var require_log = /* @__PURE__ */ __commonJSMin(((exports) => {
	var node_process$2 = __require("process");
	function debug(logLevel, ...messages) {
		if (logLevel === "debug") console.log(...messages);
	}
	function warn(logLevel, warning) {
		if (logLevel === "debug" || logLevel === "warn") if (typeof node_process$2.emitWarning === "function") node_process$2.emitWarning(warning);
		else console.warn(warning);
	}
	exports.debug = debug;
	exports.warn = warn;
}));
var require_merge = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var Scalar = require_Scalar();
	const MERGE_KEY = "<<";
	const merge = {
		identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
		default: "key",
		tag: "tag:yaml.org,2002:merge",
		test: /^<<$/,
		resolve: () => Object.assign(new Scalar.Scalar(Symbol(MERGE_KEY)), { addToJSMap: addMergeToJSMap }),
		stringify: () => MERGE_KEY
	};
	const isMergeKey = (ctx, key) => (merge.identify(key) || identity.isScalar(key) && (!key.type || key.type === Scalar.Scalar.PLAIN) && merge.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default);
	function addMergeToJSMap(ctx, map, value) {
		value = ctx && identity.isAlias(value) ? value.resolve(ctx.doc) : value;
		if (identity.isSeq(value)) for (const it of value.items) mergeValue(ctx, map, it);
		else if (Array.isArray(value)) for (const it of value) mergeValue(ctx, map, it);
		else mergeValue(ctx, map, value);
	}
	function mergeValue(ctx, map, value) {
		const source = ctx && identity.isAlias(value) ? value.resolve(ctx.doc) : value;
		if (!identity.isMap(source)) throw new Error("Merge sources must be maps or map aliases");
		const srcMap = source.toJSON(null, ctx, Map);
		for (const [key, value] of srcMap) if (map instanceof Map) {
			if (!map.has(key)) map.set(key, value);
		} else if (map instanceof Set) map.add(key);
		else if (!Object.prototype.hasOwnProperty.call(map, key)) Object.defineProperty(map, key, {
			value,
			writable: true,
			enumerable: true,
			configurable: true
		});
		return map;
	}
	exports.addMergeToJSMap = addMergeToJSMap;
	exports.isMergeKey = isMergeKey;
	exports.merge = merge;
}));
var require_addPairToJSMap = /* @__PURE__ */ __commonJSMin(((exports) => {
	var log = require_log();
	var merge = require_merge();
	var stringify = require_stringify();
	var identity = require_identity();
	var toJS = require_toJS();
	function addPairToJSMap(ctx, map, { key, value }) {
		if (identity.isNode(key) && key.addToJSMap) key.addToJSMap(ctx, map, value);
		else if (merge.isMergeKey(ctx, key)) merge.addMergeToJSMap(ctx, map, value);
		else {
			const jsKey = toJS.toJS(key, "", ctx);
			if (map instanceof Map) map.set(jsKey, toJS.toJS(value, jsKey, ctx));
			else if (map instanceof Set) map.add(jsKey);
			else {
				const stringKey = stringifyKey(key, jsKey, ctx);
				const jsValue = toJS.toJS(value, stringKey, ctx);
				if (stringKey in map) Object.defineProperty(map, stringKey, {
					value: jsValue,
					writable: true,
					enumerable: true,
					configurable: true
				});
				else map[stringKey] = jsValue;
			}
		}
		return map;
	}
	function stringifyKey(key, jsKey, ctx) {
		if (jsKey === null) return "";
		if (typeof jsKey !== "object") return String(jsKey);
		if (identity.isNode(key) && ctx?.doc) {
			const strCtx = stringify.createStringifyContext(ctx.doc, {});
			strCtx.anchors = /* @__PURE__ */ new Set();
			for (const node of ctx.anchors.keys()) strCtx.anchors.add(node.anchor);
			strCtx.inFlow = true;
			strCtx.inStringifyKey = true;
			const strKey = key.toString(strCtx);
			if (!ctx.mapKeyWarned) {
				let jsonStr = JSON.stringify(strKey);
				if (jsonStr.length > 40) jsonStr = jsonStr.substring(0, 36) + "...\"";
				log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
				ctx.mapKeyWarned = true;
			}
			return strKey;
		}
		return JSON.stringify(jsKey);
	}
	exports.addPairToJSMap = addPairToJSMap;
}));
var require_Pair = /* @__PURE__ */ __commonJSMin(((exports) => {
	var createNode = require_createNode();
	var stringifyPair = require_stringifyPair();
	var addPairToJSMap = require_addPairToJSMap();
	var identity = require_identity();
	function createPair(key, value, ctx) {
		return new Pair(createNode.createNode(key, void 0, ctx), createNode.createNode(value, void 0, ctx));
	}
	var Pair = class Pair {
		constructor(key, value = null) {
			Object.defineProperty(this, identity.NODE_TYPE, { value: identity.PAIR });
			this.key = key;
			this.value = value;
		}
		clone(schema) {
			let { key, value } = this;
			if (identity.isNode(key)) key = key.clone(schema);
			if (identity.isNode(value)) value = value.clone(schema);
			return new Pair(key, value);
		}
		toJSON(_, ctx) {
			const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
			return addPairToJSMap.addPairToJSMap(ctx, pair, this);
		}
		toString(ctx, onComment, onChompKeep) {
			return ctx?.doc ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
		}
	};
	exports.Pair = Pair;
	exports.createPair = createPair;
}));
var require_stringifyCollection = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var stringify = require_stringify();
	var stringifyComment = require_stringifyComment();
	function stringifyCollection(collection, ctx, options) {
		return (ctx.inFlow ?? collection.flow ? stringifyFlowCollection : stringifyBlockCollection)(collection, ctx, options);
	}
	function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
		const { indent, options: { commentString } } = ctx;
		const itemCtx = Object.assign({}, ctx, {
			indent: itemIndent,
			type: null
		});
		let chompKeep = false;
		const lines = [];
		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			let comment = null;
			if (identity.isNode(item)) {
				if (!chompKeep && item.spaceBefore) lines.push("");
				addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
				if (item.comment) comment = item.comment;
			} else if (identity.isPair(item)) {
				const ik = identity.isNode(item.key) ? item.key : null;
				if (ik) {
					if (!chompKeep && ik.spaceBefore) lines.push("");
					addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
				}
			}
			chompKeep = false;
			let str = stringify.stringify(item, itemCtx, () => comment = null, () => chompKeep = true);
			if (comment) str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
			if (chompKeep && comment) chompKeep = false;
			lines.push(blockItemPrefix + str);
		}
		let str;
		if (lines.length === 0) str = flowChars.start + flowChars.end;
		else {
			str = lines[0];
			for (let i = 1; i < lines.length; ++i) {
				const line = lines[i];
				str += line ? `\n${indent}${line}` : "\n";
			}
		}
		if (comment) {
			str += "\n" + stringifyComment.indentComment(commentString(comment), indent);
			if (onComment) onComment();
		} else if (chompKeep && onChompKeep) onChompKeep();
		return str;
	}
	function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
		const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
		itemIndent += indentStep;
		const itemCtx = Object.assign({}, ctx, {
			indent: itemIndent,
			inFlow: true,
			type: null
		});
		let reqNewline = false;
		let linesAtValue = 0;
		const lines = [];
		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			let comment = null;
			if (identity.isNode(item)) {
				if (item.spaceBefore) lines.push("");
				addCommentBefore(ctx, lines, item.commentBefore, false);
				if (item.comment) comment = item.comment;
			} else if (identity.isPair(item)) {
				const ik = identity.isNode(item.key) ? item.key : null;
				if (ik) {
					if (ik.spaceBefore) lines.push("");
					addCommentBefore(ctx, lines, ik.commentBefore, false);
					if (ik.comment) reqNewline = true;
				}
				const iv = identity.isNode(item.value) ? item.value : null;
				if (iv) {
					if (iv.comment) comment = iv.comment;
					if (iv.commentBefore) reqNewline = true;
				} else if (item.value == null && ik?.comment) comment = ik.comment;
			}
			if (comment) reqNewline = true;
			let str = stringify.stringify(item, itemCtx, () => comment = null);
			reqNewline || (reqNewline = lines.length > linesAtValue || str.includes("\n"));
			if (i < items.length - 1) str += ",";
			else if (ctx.options.trailingComma) {
				if (ctx.options.lineWidth > 0) reqNewline || (reqNewline = lines.reduce((sum, line) => sum + line.length + 2, 2) + (str.length + 2) > ctx.options.lineWidth);
				if (reqNewline) str += ",";
			}
			if (comment) str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
			lines.push(str);
			linesAtValue = lines.length;
		}
		const { start, end } = flowChars;
		if (lines.length === 0) return start + end;
		else {
			if (!reqNewline) {
				const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
				reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
			}
			if (reqNewline) {
				let str = start;
				for (const line of lines) str += line ? `\n${indentStep}${indent}${line}` : "\n";
				return `${str}\n${indent}${end}`;
			} else return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
		}
	}
	function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
		if (comment && chompKeep) comment = comment.replace(/^\n+/, "");
		if (comment) {
			const ic = stringifyComment.indentComment(commentString(comment), indent);
			lines.push(ic.trimStart());
		}
	}
	exports.stringifyCollection = stringifyCollection;
}));
var require_YAMLMap = /* @__PURE__ */ __commonJSMin(((exports) => {
	var stringifyCollection = require_stringifyCollection();
	var addPairToJSMap = require_addPairToJSMap();
	var Collection = require_Collection();
	var identity = require_identity();
	var Pair = require_Pair();
	var Scalar = require_Scalar();
	function findPair(items, key) {
		const k = identity.isScalar(key) ? key.value : key;
		for (const it of items) if (identity.isPair(it)) {
			if (it.key === key || it.key === k) return it;
			if (identity.isScalar(it.key) && it.key.value === k) return it;
		}
	}
	var YAMLMap = class extends Collection.Collection {
		static get tagName() {
			return "tag:yaml.org,2002:map";
		}
		constructor(schema) {
			super(identity.MAP, schema);
			this.items = [];
		}
		static from(schema, obj, ctx) {
			const { keepUndefined, replacer } = ctx;
			const map = new this(schema);
			const add = (key, value) => {
				if (typeof replacer === "function") value = replacer.call(obj, key, value);
				else if (Array.isArray(replacer) && !replacer.includes(key)) return;
				if (value !== void 0 || keepUndefined) map.items.push(Pair.createPair(key, value, ctx));
			};
			if (obj instanceof Map) for (const [key, value] of obj) add(key, value);
			else if (obj && typeof obj === "object") for (const key of Object.keys(obj)) add(key, obj[key]);
			if (typeof schema.sortMapEntries === "function") map.items.sort(schema.sortMapEntries);
			return map;
		}
		add(pair, overwrite) {
			let _pair;
			if (identity.isPair(pair)) _pair = pair;
			else if (!pair || typeof pair !== "object" || !("key" in pair)) _pair = new Pair.Pair(pair, pair?.value);
			else _pair = new Pair.Pair(pair.key, pair.value);
			const prev = findPair(this.items, _pair.key);
			const sortEntries = this.schema?.sortMapEntries;
			if (prev) {
				if (!overwrite) throw new Error(`Key ${_pair.key} already set`);
				if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value)) prev.value.value = _pair.value;
				else prev.value = _pair.value;
			} else if (sortEntries) {
				const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
				if (i === -1) this.items.push(_pair);
				else this.items.splice(i, 0, _pair);
			} else this.items.push(_pair);
		}
		delete(key) {
			const it = findPair(this.items, key);
			if (!it) return false;
			return this.items.splice(this.items.indexOf(it), 1).length > 0;
		}
		get(key, keepScalar) {
			const node = findPair(this.items, key)?.value;
			return (!keepScalar && identity.isScalar(node) ? node.value : node) ?? void 0;
		}
		has(key) {
			return !!findPair(this.items, key);
		}
		set(key, value) {
			this.add(new Pair.Pair(key, value), true);
		}
		toJSON(_, ctx, Type) {
			const map = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
			if (ctx?.onCreate) ctx.onCreate(map);
			for (const item of this.items) addPairToJSMap.addPairToJSMap(ctx, map, item);
			return map;
		}
		toString(ctx, onComment, onChompKeep) {
			if (!ctx) return JSON.stringify(this);
			for (const item of this.items) if (!identity.isPair(item)) throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
			if (!ctx.allNullValues && this.hasAllNullValues(false)) ctx = Object.assign({}, ctx, { allNullValues: true });
			return stringifyCollection.stringifyCollection(this, ctx, {
				blockItemPrefix: "",
				flowChars: {
					start: "{",
					end: "}"
				},
				itemIndent: ctx.indent || "",
				onChompKeep,
				onComment
			});
		}
	};
	exports.YAMLMap = YAMLMap;
	exports.findPair = findPair;
}));
var require_map = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var YAMLMap = require_YAMLMap();
	exports.map = {
		collection: "map",
		default: true,
		nodeClass: YAMLMap.YAMLMap,
		tag: "tag:yaml.org,2002:map",
		resolve(map, onError) {
			if (!identity.isMap(map)) onError("Expected a mapping for this tag");
			return map;
		},
		createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx)
	};
}));
var require_YAMLSeq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var createNode = require_createNode();
	var stringifyCollection = require_stringifyCollection();
	var Collection = require_Collection();
	var identity = require_identity();
	var Scalar = require_Scalar();
	var toJS = require_toJS();
	var YAMLSeq = class extends Collection.Collection {
		static get tagName() {
			return "tag:yaml.org,2002:seq";
		}
		constructor(schema) {
			super(identity.SEQ, schema);
			this.items = [];
		}
		add(value) {
			this.items.push(value);
		}
		delete(key) {
			const idx = asItemIndex(key);
			if (typeof idx !== "number") return false;
			return this.items.splice(idx, 1).length > 0;
		}
		get(key, keepScalar) {
			const idx = asItemIndex(key);
			if (typeof idx !== "number") return void 0;
			const it = this.items[idx];
			return !keepScalar && identity.isScalar(it) ? it.value : it;
		}
		has(key) {
			const idx = asItemIndex(key);
			return typeof idx === "number" && idx < this.items.length;
		}
		set(key, value) {
			const idx = asItemIndex(key);
			if (typeof idx !== "number") throw new Error(`Expected a valid index, not ${key}.`);
			const prev = this.items[idx];
			if (identity.isScalar(prev) && Scalar.isScalarValue(value)) prev.value = value;
			else this.items[idx] = value;
		}
		toJSON(_, ctx) {
			const seq = [];
			if (ctx?.onCreate) ctx.onCreate(seq);
			let i = 0;
			for (const item of this.items) seq.push(toJS.toJS(item, String(i++), ctx));
			return seq;
		}
		toString(ctx, onComment, onChompKeep) {
			if (!ctx) return JSON.stringify(this);
			return stringifyCollection.stringifyCollection(this, ctx, {
				blockItemPrefix: "- ",
				flowChars: {
					start: "[",
					end: "]"
				},
				itemIndent: (ctx.indent || "") + "  ",
				onChompKeep,
				onComment
			});
		}
		static from(schema, obj, ctx) {
			const { replacer } = ctx;
			const seq = new this(schema);
			if (obj && Symbol.iterator in Object(obj)) {
				let i = 0;
				for (let it of obj) {
					if (typeof replacer === "function") {
						const key = obj instanceof Set ? it : String(i++);
						it = replacer.call(obj, key, it);
					}
					seq.items.push(createNode.createNode(it, void 0, ctx));
				}
			}
			return seq;
		}
	};
	function asItemIndex(key) {
		let idx = identity.isScalar(key) ? key.value : key;
		if (idx && typeof idx === "string") idx = Number(idx);
		return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
	}
	exports.YAMLSeq = YAMLSeq;
}));
var require_seq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var YAMLSeq = require_YAMLSeq();
	exports.seq = {
		collection: "seq",
		default: true,
		nodeClass: YAMLSeq.YAMLSeq,
		tag: "tag:yaml.org,2002:seq",
		resolve(seq, onError) {
			if (!identity.isSeq(seq)) onError("Expected a sequence for this tag");
			return seq;
		},
		createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx)
	};
}));
var require_string = /* @__PURE__ */ __commonJSMin(((exports) => {
	var stringifyString = require_stringifyString();
	exports.string = {
		identify: (value) => typeof value === "string",
		default: true,
		tag: "tag:yaml.org,2002:str",
		resolve: (str) => str,
		stringify(item, ctx, onComment, onChompKeep) {
			ctx = Object.assign({ actualString: true }, ctx);
			return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
		}
	};
}));
var require_null = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scalar = require_Scalar();
	const nullTag = {
		identify: (value) => value == null,
		createNode: () => new Scalar.Scalar(null),
		default: true,
		tag: "tag:yaml.org,2002:null",
		test: /^(?:~|[Nn]ull|NULL)?$/,
		resolve: () => new Scalar.Scalar(null),
		stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
	};
	exports.nullTag = nullTag;
}));
var require_bool$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scalar = require_Scalar();
	const boolTag = {
		identify: (value) => typeof value === "boolean",
		default: true,
		tag: "tag:yaml.org,2002:bool",
		test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
		resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
		stringify({ source, value }, ctx) {
			if (source && boolTag.test.test(source)) {
				if (value === (source[0] === "t" || source[0] === "T")) return source;
			}
			return value ? ctx.options.trueStr : ctx.options.falseStr;
		}
	};
	exports.boolTag = boolTag;
}));
var require_stringifyNumber = /* @__PURE__ */ __commonJSMin(((exports) => {
	function stringifyNumber({ format, minFractionDigits, tag, value }) {
		if (typeof value === "bigint") return String(value);
		const num = typeof value === "number" ? value : Number(value);
		if (!isFinite(num)) return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
		let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
		if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
			let i = n.indexOf(".");
			if (i < 0) {
				i = n.length;
				n += ".";
			}
			let d = minFractionDigits - (n.length - i - 1);
			while (d-- > 0) n += "0";
		}
		return n;
	}
	exports.stringifyNumber = stringifyNumber;
}));
var require_float$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scalar = require_Scalar();
	var stringifyNumber = require_stringifyNumber();
	const floatNaN = {
		identify: (value) => typeof value === "number",
		default: true,
		tag: "tag:yaml.org,2002:float",
		test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
		resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
		stringify: stringifyNumber.stringifyNumber
	};
	const floatExp = {
		identify: (value) => typeof value === "number",
		default: true,
		tag: "tag:yaml.org,2002:float",
		format: "EXP",
		test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
		resolve: (str) => parseFloat(str),
		stringify(node) {
			const num = Number(node.value);
			return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
		}
	};
	exports.float = {
		identify: (value) => typeof value === "number",
		default: true,
		tag: "tag:yaml.org,2002:float",
		test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
		resolve(str) {
			const node = new Scalar.Scalar(parseFloat(str));
			const dot = str.indexOf(".");
			if (dot !== -1 && str[str.length - 1] === "0") node.minFractionDigits = str.length - dot - 1;
			return node;
		},
		stringify: stringifyNumber.stringifyNumber
	};
	exports.floatExp = floatExp;
	exports.floatNaN = floatNaN;
}));
var require_int$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var stringifyNumber = require_stringifyNumber();
	const intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
	const intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
	function intStringify(node, radix, prefix) {
		const { value } = node;
		if (intIdentify(value) && value >= 0) return prefix + value.toString(radix);
		return stringifyNumber.stringifyNumber(node);
	}
	const intOct = {
		identify: (value) => intIdentify(value) && value >= 0,
		default: true,
		tag: "tag:yaml.org,2002:int",
		format: "OCT",
		test: /^0o[0-7]+$/,
		resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
		stringify: (node) => intStringify(node, 8, "0o")
	};
	const int = {
		identify: intIdentify,
		default: true,
		tag: "tag:yaml.org,2002:int",
		test: /^[-+]?[0-9]+$/,
		resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
		stringify: stringifyNumber.stringifyNumber
	};
	const intHex = {
		identify: (value) => intIdentify(value) && value >= 0,
		default: true,
		tag: "tag:yaml.org,2002:int",
		format: "HEX",
		test: /^0x[0-9a-fA-F]+$/,
		resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
		stringify: (node) => intStringify(node, 16, "0x")
	};
	exports.int = int;
	exports.intHex = intHex;
	exports.intOct = intOct;
}));
var require_schema$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var map = require_map();
	var _null = require_null();
	var seq = require_seq();
	var string = require_string();
	var bool = require_bool$1();
	var float = require_float$1();
	var int = require_int$1();
	exports.schema = [
		map.map,
		seq.seq,
		string.string,
		_null.nullTag,
		bool.boolTag,
		int.intOct,
		int.int,
		int.intHex,
		float.floatNaN,
		float.floatExp,
		float.float
	];
}));
var require_schema$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scalar = require_Scalar();
	var map = require_map();
	var seq = require_seq();
	function intIdentify(value) {
		return typeof value === "bigint" || Number.isInteger(value);
	}
	const stringifyJSON = ({ value }) => JSON.stringify(value);
	const jsonScalars = [
		{
			identify: (value) => typeof value === "string",
			default: true,
			tag: "tag:yaml.org,2002:str",
			resolve: (str) => str,
			stringify: stringifyJSON
		},
		{
			identify: (value) => value == null,
			createNode: () => new Scalar.Scalar(null),
			default: true,
			tag: "tag:yaml.org,2002:null",
			test: /^null$/,
			resolve: () => null,
			stringify: stringifyJSON
		},
		{
			identify: (value) => typeof value === "boolean",
			default: true,
			tag: "tag:yaml.org,2002:bool",
			test: /^true$|^false$/,
			resolve: (str) => str === "true",
			stringify: stringifyJSON
		},
		{
			identify: intIdentify,
			default: true,
			tag: "tag:yaml.org,2002:int",
			test: /^-?(?:0|[1-9][0-9]*)$/,
			resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
			stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
		},
		{
			identify: (value) => typeof value === "number",
			default: true,
			tag: "tag:yaml.org,2002:float",
			test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
			resolve: (str) => parseFloat(str),
			stringify: stringifyJSON
		}
	];
	exports.schema = [map.map, seq.seq].concat(jsonScalars, {
		default: true,
		tag: "",
		test: /^/,
		resolve(str, onError) {
			onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
			return str;
		}
	});
}));
var require_binary = /* @__PURE__ */ __commonJSMin(((exports) => {
	var node_buffer = __require("buffer");
	var Scalar = require_Scalar();
	var stringifyString = require_stringifyString();
	exports.binary = {
		identify: (value) => value instanceof Uint8Array,
		default: false,
		tag: "tag:yaml.org,2002:binary",
		resolve(src, onError) {
			if (typeof node_buffer.Buffer === "function") return node_buffer.Buffer.from(src, "base64");
			else if (typeof atob === "function") {
				const str = atob(src.replace(/[\n\r]/g, ""));
				const buffer = new Uint8Array(str.length);
				for (let i = 0; i < str.length; ++i) buffer[i] = str.charCodeAt(i);
				return buffer;
			} else {
				onError("This environment does not support reading binary tags; either Buffer or atob is required");
				return src;
			}
		},
		stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
			if (!value) return "";
			const buf = value;
			let str;
			if (typeof node_buffer.Buffer === "function") str = buf instanceof node_buffer.Buffer ? buf.toString("base64") : node_buffer.Buffer.from(buf.buffer).toString("base64");
			else if (typeof btoa === "function") {
				let s = "";
				for (let i = 0; i < buf.length; ++i) s += String.fromCharCode(buf[i]);
				str = btoa(s);
			} else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
			type ?? (type = Scalar.Scalar.BLOCK_LITERAL);
			if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
				const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
				const n = Math.ceil(str.length / lineWidth);
				const lines = new Array(n);
				for (let i = 0, o = 0; i < n; ++i, o += lineWidth) lines[i] = str.substr(o, lineWidth);
				str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
			}
			return stringifyString.stringifyString({
				comment,
				type,
				value: str
			}, ctx, onComment, onChompKeep);
		}
	};
}));
var require_pairs = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var Pair = require_Pair();
	var Scalar = require_Scalar();
	var YAMLSeq = require_YAMLSeq();
	function resolvePairs(seq, onError) {
		if (identity.isSeq(seq)) for (let i = 0; i < seq.items.length; ++i) {
			let item = seq.items[i];
			if (identity.isPair(item)) continue;
			else if (identity.isMap(item)) {
				if (item.items.length > 1) onError("Each pair must have its own sequence indicator");
				const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
				if (item.commentBefore) pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}\n${pair.key.commentBefore}` : item.commentBefore;
				if (item.comment) {
					const cn = pair.value ?? pair.key;
					cn.comment = cn.comment ? `${item.comment}\n${cn.comment}` : item.comment;
				}
				item = pair;
			}
			seq.items[i] = identity.isPair(item) ? item : new Pair.Pair(item);
		}
		else onError("Expected a sequence for this tag");
		return seq;
	}
	function createPairs(schema, iterable, ctx) {
		const { replacer } = ctx;
		const pairs = new YAMLSeq.YAMLSeq(schema);
		pairs.tag = "tag:yaml.org,2002:pairs";
		let i = 0;
		if (iterable && Symbol.iterator in Object(iterable)) for (let it of iterable) {
			if (typeof replacer === "function") it = replacer.call(iterable, String(i++), it);
			let key, value;
			if (Array.isArray(it)) if (it.length === 2) {
				key = it[0];
				value = it[1];
			} else throw new TypeError(`Expected [key, value] tuple: ${it}`);
			else if (it && it instanceof Object) {
				const keys = Object.keys(it);
				if (keys.length === 1) {
					key = keys[0];
					value = it[key];
				} else throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
			} else key = it;
			pairs.items.push(Pair.createPair(key, value, ctx));
		}
		return pairs;
	}
	const pairs = {
		collection: "seq",
		default: false,
		tag: "tag:yaml.org,2002:pairs",
		resolve: resolvePairs,
		createNode: createPairs
	};
	exports.createPairs = createPairs;
	exports.pairs = pairs;
	exports.resolvePairs = resolvePairs;
}));
var require_omap = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var toJS = require_toJS();
	var YAMLMap = require_YAMLMap();
	var YAMLSeq = require_YAMLSeq();
	var pairs = require_pairs();
	var YAMLOMap = class YAMLOMap extends YAMLSeq.YAMLSeq {
		constructor() {
			super();
			this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
			this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
			this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
			this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
			this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
			this.tag = YAMLOMap.tag;
		}
		toJSON(_, ctx) {
			if (!ctx) return super.toJSON(_);
			const map = /* @__PURE__ */ new Map();
			if (ctx?.onCreate) ctx.onCreate(map);
			for (const pair of this.items) {
				let key, value;
				if (identity.isPair(pair)) {
					key = toJS.toJS(pair.key, "", ctx);
					value = toJS.toJS(pair.value, key, ctx);
				} else key = toJS.toJS(pair, "", ctx);
				if (map.has(key)) throw new Error("Ordered maps must not include duplicate keys");
				map.set(key, value);
			}
			return map;
		}
		static from(schema, iterable, ctx) {
			const pairs$1 = pairs.createPairs(schema, iterable, ctx);
			const omap = new this();
			omap.items = pairs$1.items;
			return omap;
		}
	};
	YAMLOMap.tag = "tag:yaml.org,2002:omap";
	const omap = {
		collection: "seq",
		identify: (value) => value instanceof Map,
		nodeClass: YAMLOMap,
		default: false,
		tag: "tag:yaml.org,2002:omap",
		resolve(seq, onError) {
			const pairs$1 = pairs.resolvePairs(seq, onError);
			const seenKeys = [];
			for (const { key } of pairs$1.items) if (identity.isScalar(key)) if (seenKeys.includes(key.value)) onError(`Ordered maps must not include duplicate keys: ${key.value}`);
			else seenKeys.push(key.value);
			return Object.assign(new YAMLOMap(), pairs$1);
		},
		createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
	};
	exports.YAMLOMap = YAMLOMap;
	exports.omap = omap;
}));
var require_bool = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scalar = require_Scalar();
	function boolStringify({ value, source }, ctx) {
		if (source && (value ? trueTag : falseTag).test.test(source)) return source;
		return value ? ctx.options.trueStr : ctx.options.falseStr;
	}
	const trueTag = {
		identify: (value) => value === true,
		default: true,
		tag: "tag:yaml.org,2002:bool",
		test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
		resolve: () => new Scalar.Scalar(true),
		stringify: boolStringify
	};
	const falseTag = {
		identify: (value) => value === false,
		default: true,
		tag: "tag:yaml.org,2002:bool",
		test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
		resolve: () => new Scalar.Scalar(false),
		stringify: boolStringify
	};
	exports.falseTag = falseTag;
	exports.trueTag = trueTag;
}));
var require_float = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scalar = require_Scalar();
	var stringifyNumber = require_stringifyNumber();
	const floatNaN = {
		identify: (value) => typeof value === "number",
		default: true,
		tag: "tag:yaml.org,2002:float",
		test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
		resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
		stringify: stringifyNumber.stringifyNumber
	};
	const floatExp = {
		identify: (value) => typeof value === "number",
		default: true,
		tag: "tag:yaml.org,2002:float",
		format: "EXP",
		test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
		resolve: (str) => parseFloat(str.replace(/_/g, "")),
		stringify(node) {
			const num = Number(node.value);
			return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
		}
	};
	exports.float = {
		identify: (value) => typeof value === "number",
		default: true,
		tag: "tag:yaml.org,2002:float",
		test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
		resolve(str) {
			const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
			const dot = str.indexOf(".");
			if (dot !== -1) {
				const f = str.substring(dot + 1).replace(/_/g, "");
				if (f[f.length - 1] === "0") node.minFractionDigits = f.length;
			}
			return node;
		},
		stringify: stringifyNumber.stringifyNumber
	};
	exports.floatExp = floatExp;
	exports.floatNaN = floatNaN;
}));
var require_int = /* @__PURE__ */ __commonJSMin(((exports) => {
	var stringifyNumber = require_stringifyNumber();
	const intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
	function intResolve(str, offset, radix, { intAsBigInt }) {
		const sign = str[0];
		if (sign === "-" || sign === "+") offset += 1;
		str = str.substring(offset).replace(/_/g, "");
		if (intAsBigInt) {
			switch (radix) {
				case 2:
					str = `0b${str}`;
					break;
				case 8:
					str = `0o${str}`;
					break;
				case 16:
					str = `0x${str}`;
					break;
			}
			const n = BigInt(str);
			return sign === "-" ? BigInt(-1) * n : n;
		}
		const n = parseInt(str, radix);
		return sign === "-" ? -1 * n : n;
	}
	function intStringify(node, radix, prefix) {
		const { value } = node;
		if (intIdentify(value)) {
			const str = value.toString(radix);
			return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
		}
		return stringifyNumber.stringifyNumber(node);
	}
	const intBin = {
		identify: intIdentify,
		default: true,
		tag: "tag:yaml.org,2002:int",
		format: "BIN",
		test: /^[-+]?0b[0-1_]+$/,
		resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
		stringify: (node) => intStringify(node, 2, "0b")
	};
	const intOct = {
		identify: intIdentify,
		default: true,
		tag: "tag:yaml.org,2002:int",
		format: "OCT",
		test: /^[-+]?0[0-7_]+$/,
		resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
		stringify: (node) => intStringify(node, 8, "0")
	};
	const int = {
		identify: intIdentify,
		default: true,
		tag: "tag:yaml.org,2002:int",
		test: /^[-+]?[0-9][0-9_]*$/,
		resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
		stringify: stringifyNumber.stringifyNumber
	};
	const intHex = {
		identify: intIdentify,
		default: true,
		tag: "tag:yaml.org,2002:int",
		format: "HEX",
		test: /^[-+]?0x[0-9a-fA-F_]+$/,
		resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
		stringify: (node) => intStringify(node, 16, "0x")
	};
	exports.int = int;
	exports.intBin = intBin;
	exports.intHex = intHex;
	exports.intOct = intOct;
}));
var require_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var Pair = require_Pair();
	var YAMLMap = require_YAMLMap();
	var YAMLSet = class YAMLSet extends YAMLMap.YAMLMap {
		constructor(schema) {
			super(schema);
			this.tag = YAMLSet.tag;
		}
		add(key) {
			let pair;
			if (identity.isPair(key)) pair = key;
			else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null) pair = new Pair.Pair(key.key, null);
			else pair = new Pair.Pair(key, null);
			if (!YAMLMap.findPair(this.items, pair.key)) this.items.push(pair);
		}
		get(key, keepPair) {
			const pair = YAMLMap.findPair(this.items, key);
			return !keepPair && identity.isPair(pair) ? identity.isScalar(pair.key) ? pair.key.value : pair.key : pair;
		}
		set(key, value) {
			if (typeof value !== "boolean") throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
			const prev = YAMLMap.findPair(this.items, key);
			if (prev && !value) this.items.splice(this.items.indexOf(prev), 1);
			else if (!prev && value) this.items.push(new Pair.Pair(key));
		}
		toJSON(_, ctx) {
			return super.toJSON(_, ctx, Set);
		}
		toString(ctx, onComment, onChompKeep) {
			if (!ctx) return JSON.stringify(this);
			if (this.hasAllNullValues(true)) return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
			else throw new Error("Set items must all have null values");
		}
		static from(schema, iterable, ctx) {
			const { replacer } = ctx;
			const set = new this(schema);
			if (iterable && Symbol.iterator in Object(iterable)) for (let value of iterable) {
				if (typeof replacer === "function") value = replacer.call(iterable, value, value);
				set.items.push(Pair.createPair(value, null, ctx));
			}
			return set;
		}
	};
	YAMLSet.tag = "tag:yaml.org,2002:set";
	const set = {
		collection: "map",
		identify: (value) => value instanceof Set,
		nodeClass: YAMLSet,
		default: false,
		tag: "tag:yaml.org,2002:set",
		createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
		resolve(map, onError) {
			if (identity.isMap(map)) if (map.hasAllNullValues(true)) return Object.assign(new YAMLSet(), map);
			else onError("Set items must all have null values");
			else onError("Expected a mapping for this tag");
			return map;
		}
	};
	exports.YAMLSet = YAMLSet;
	exports.set = set;
}));
var require_timestamp = /* @__PURE__ */ __commonJSMin(((exports) => {
	var stringifyNumber = require_stringifyNumber();
	function parseSexagesimal(str, asBigInt) {
		const sign = str[0];
		const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
		const num = (n) => asBigInt ? BigInt(n) : Number(n);
		const res = parts.replace(/_/g, "").split(":").reduce((res, p) => res * num(60) + num(p), num(0));
		return sign === "-" ? num(-1) * res : res;
	}
	function stringifySexagesimal(node) {
		let { value } = node;
		let num = (n) => n;
		if (typeof value === "bigint") num = (n) => BigInt(n);
		else if (isNaN(value) || !isFinite(value)) return stringifyNumber.stringifyNumber(node);
		let sign = "";
		if (value < 0) {
			sign = "-";
			value *= num(-1);
		}
		const _60 = num(60);
		const parts = [value % _60];
		if (value < 60) parts.unshift(0);
		else {
			value = (value - parts[0]) / _60;
			parts.unshift(value % _60);
			if (value >= 60) {
				value = (value - parts[0]) / _60;
				parts.unshift(value);
			}
		}
		return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
	}
	const intTime = {
		identify: (value) => typeof value === "bigint" || Number.isInteger(value),
		default: true,
		tag: "tag:yaml.org,2002:int",
		format: "TIME",
		test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
		resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
		stringify: stringifySexagesimal
	};
	const floatTime = {
		identify: (value) => typeof value === "number",
		default: true,
		tag: "tag:yaml.org,2002:float",
		format: "TIME",
		test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
		resolve: (str) => parseSexagesimal(str, false),
		stringify: stringifySexagesimal
	};
	const timestamp = {
		identify: (value) => value instanceof Date,
		default: true,
		tag: "tag:yaml.org,2002:timestamp",
		test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
		resolve(str) {
			const match = str.match(timestamp.test);
			if (!match) throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
			const [, year, month, day, hour, minute, second] = match.map(Number);
			const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
			let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
			const tz = match[8];
			if (tz && tz !== "Z") {
				let d = parseSexagesimal(tz, false);
				if (Math.abs(d) < 30) d *= 60;
				date -= 6e4 * d;
			}
			return new Date(date);
		},
		stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
	};
	exports.floatTime = floatTime;
	exports.intTime = intTime;
	exports.timestamp = timestamp;
}));
var require_schema = /* @__PURE__ */ __commonJSMin(((exports) => {
	var map = require_map();
	var _null = require_null();
	var seq = require_seq();
	var string = require_string();
	var binary = require_binary();
	var bool = require_bool();
	var float = require_float();
	var int = require_int();
	var merge = require_merge();
	var omap = require_omap();
	var pairs = require_pairs();
	var set = require_set();
	var timestamp = require_timestamp();
	exports.schema = [
		map.map,
		seq.seq,
		string.string,
		_null.nullTag,
		bool.trueTag,
		bool.falseTag,
		int.intBin,
		int.intOct,
		int.int,
		int.intHex,
		float.floatNaN,
		float.floatExp,
		float.float,
		binary.binary,
		merge.merge,
		omap.omap,
		pairs.pairs,
		set.set,
		timestamp.intTime,
		timestamp.floatTime,
		timestamp.timestamp
	];
}));
var require_tags = /* @__PURE__ */ __commonJSMin(((exports) => {
	var map = require_map();
	var _null = require_null();
	var seq = require_seq();
	var string = require_string();
	var bool = require_bool$1();
	var float = require_float$1();
	var int = require_int$1();
	var schema = require_schema$2();
	var schema$1 = require_schema$1();
	var binary = require_binary();
	var merge = require_merge();
	var omap = require_omap();
	var pairs = require_pairs();
	var schema$2 = require_schema();
	var set = require_set();
	var timestamp = require_timestamp();
	const schemas = new Map([
		["core", schema.schema],
		["failsafe", [
			map.map,
			seq.seq,
			string.string
		]],
		["json", schema$1.schema],
		["yaml11", schema$2.schema],
		["yaml-1.1", schema$2.schema]
	]);
	const tagsByName = {
		binary: binary.binary,
		bool: bool.boolTag,
		float: float.float,
		floatExp: float.floatExp,
		floatNaN: float.floatNaN,
		floatTime: timestamp.floatTime,
		int: int.int,
		intHex: int.intHex,
		intOct: int.intOct,
		intTime: timestamp.intTime,
		map: map.map,
		merge: merge.merge,
		null: _null.nullTag,
		omap: omap.omap,
		pairs: pairs.pairs,
		seq: seq.seq,
		set: set.set,
		timestamp: timestamp.timestamp
	};
	const coreKnownTags = {
		"tag:yaml.org,2002:binary": binary.binary,
		"tag:yaml.org,2002:merge": merge.merge,
		"tag:yaml.org,2002:omap": omap.omap,
		"tag:yaml.org,2002:pairs": pairs.pairs,
		"tag:yaml.org,2002:set": set.set,
		"tag:yaml.org,2002:timestamp": timestamp.timestamp
	};
	function getTags(customTags, schemaName, addMergeTag) {
		const schemaTags = schemas.get(schemaName);
		if (schemaTags && !customTags) return addMergeTag && !schemaTags.includes(merge.merge) ? schemaTags.concat(merge.merge) : schemaTags.slice();
		let tags = schemaTags;
		if (!tags) if (Array.isArray(customTags)) tags = [];
		else {
			const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
			throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
		}
		if (Array.isArray(customTags)) for (const tag of customTags) tags = tags.concat(tag);
		else if (typeof customTags === "function") tags = customTags(tags.slice());
		if (addMergeTag) tags = tags.concat(merge.merge);
		return tags.reduce((tags, tag) => {
			const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
			if (!tagObj) {
				const tagName = JSON.stringify(tag);
				const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
				throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
			}
			if (!tags.includes(tagObj)) tags.push(tagObj);
			return tags;
		}, []);
	}
	exports.coreKnownTags = coreKnownTags;
	exports.getTags = getTags;
}));
var require_Schema = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var map = require_map();
	var seq = require_seq();
	var string = require_string();
	var tags = require_tags();
	const sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
	exports.Schema = class Schema {
		constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
			this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
			this.name = typeof schema === "string" && schema || "core";
			this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
			this.tags = tags.getTags(customTags, this.name, merge);
			this.toStringOptions = toStringDefaults ?? null;
			Object.defineProperty(this, identity.MAP, { value: map.map });
			Object.defineProperty(this, identity.SCALAR, { value: string.string });
			Object.defineProperty(this, identity.SEQ, { value: seq.seq });
			this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
		}
		clone() {
			const copy = Object.create(Schema.prototype, Object.getOwnPropertyDescriptors(this));
			copy.tags = this.tags.slice();
			return copy;
		}
	};
}));
var require_stringifyDocument = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var stringify = require_stringify();
	var stringifyComment = require_stringifyComment();
	function stringifyDocument(doc, options) {
		const lines = [];
		let hasDirectives = options.directives === true;
		if (options.directives !== false && doc.directives) {
			const dir = doc.directives.toString(doc);
			if (dir) {
				lines.push(dir);
				hasDirectives = true;
			} else if (doc.directives.docStart) hasDirectives = true;
		}
		if (hasDirectives) lines.push("---");
		const ctx = stringify.createStringifyContext(doc, options);
		const { commentString } = ctx.options;
		if (doc.commentBefore) {
			if (lines.length !== 1) lines.unshift("");
			const cs = commentString(doc.commentBefore);
			lines.unshift(stringifyComment.indentComment(cs, ""));
		}
		let chompKeep = false;
		let contentComment = null;
		if (doc.contents) {
			if (identity.isNode(doc.contents)) {
				if (doc.contents.spaceBefore && hasDirectives) lines.push("");
				if (doc.contents.commentBefore) {
					const cs = commentString(doc.contents.commentBefore);
					lines.push(stringifyComment.indentComment(cs, ""));
				}
				ctx.forceBlockIndent = !!doc.comment;
				contentComment = doc.contents.comment;
			}
			const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
			let body = stringify.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
			if (contentComment) body += stringifyComment.lineComment(body, "", commentString(contentComment));
			if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") lines[lines.length - 1] = `--- ${body}`;
			else lines.push(body);
		} else lines.push(stringify.stringify(doc.contents, ctx));
		if (doc.directives?.docEnd) if (doc.comment) {
			const cs = commentString(doc.comment);
			if (cs.includes("\n")) {
				lines.push("...");
				lines.push(stringifyComment.indentComment(cs, ""));
			} else lines.push(`... ${cs}`);
		} else lines.push("...");
		else {
			let dc = doc.comment;
			if (dc && chompKeep) dc = dc.replace(/^\n+/, "");
			if (dc) {
				if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "") lines.push("");
				lines.push(stringifyComment.indentComment(commentString(dc), ""));
			}
		}
		return lines.join("\n") + "\n";
	}
	exports.stringifyDocument = stringifyDocument;
}));
var require_Document = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Alias = require_Alias();
	var Collection = require_Collection();
	var identity = require_identity();
	var Pair = require_Pair();
	var toJS = require_toJS();
	var Schema = require_Schema();
	var stringifyDocument = require_stringifyDocument();
	var anchors = require_anchors();
	var applyReviver = require_applyReviver();
	var createNode = require_createNode();
	var directives = require_directives();
	var Document = class Document {
		constructor(value, replacer, options) {
			this.commentBefore = null;
			this.comment = null;
			this.errors = [];
			this.warnings = [];
			Object.defineProperty(this, identity.NODE_TYPE, { value: identity.DOC });
			let _replacer = null;
			if (typeof replacer === "function" || Array.isArray(replacer)) _replacer = replacer;
			else if (options === void 0 && replacer) {
				options = replacer;
				replacer = void 0;
			}
			const opt = Object.assign({
				intAsBigInt: false,
				keepSourceTokens: false,
				logLevel: "warn",
				prettyErrors: true,
				strict: true,
				stringKeys: false,
				uniqueKeys: true,
				version: "1.2"
			}, options);
			this.options = opt;
			let { version } = opt;
			if (options?._directives) {
				this.directives = options._directives.atDocument();
				if (this.directives.yaml.explicit) version = this.directives.yaml.version;
			} else this.directives = new directives.Directives({ version });
			this.setSchema(version, options);
			this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
		}
		clone() {
			const copy = Object.create(Document.prototype, { [identity.NODE_TYPE]: { value: identity.DOC } });
			copy.commentBefore = this.commentBefore;
			copy.comment = this.comment;
			copy.errors = this.errors.slice();
			copy.warnings = this.warnings.slice();
			copy.options = Object.assign({}, this.options);
			if (this.directives) copy.directives = this.directives.clone();
			copy.schema = this.schema.clone();
			copy.contents = identity.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
			if (this.range) copy.range = this.range.slice();
			return copy;
		}
		add(value) {
			if (assertCollection(this.contents)) this.contents.add(value);
		}
		addIn(path, value) {
			if (assertCollection(this.contents)) this.contents.addIn(path, value);
		}
		createAlias(node, name) {
			if (!node.anchor) {
				const prev = anchors.anchorNames(this);
				node.anchor = !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
			}
			return new Alias.Alias(node.anchor);
		}
		createNode(value, replacer, options) {
			let _replacer = void 0;
			if (typeof replacer === "function") {
				value = replacer.call({ "": value }, "", value);
				_replacer = replacer;
			} else if (Array.isArray(replacer)) {
				const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
				const asStr = replacer.filter(keyToStr).map(String);
				if (asStr.length > 0) replacer = replacer.concat(asStr);
				_replacer = replacer;
			} else if (options === void 0 && replacer) {
				options = replacer;
				replacer = void 0;
			}
			const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
			const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(this, anchorPrefix || "a");
			const ctx = {
				aliasDuplicateObjects: aliasDuplicateObjects ?? true,
				keepUndefined: keepUndefined ?? false,
				onAnchor,
				onTagObj,
				replacer: _replacer,
				schema: this.schema,
				sourceObjects
			};
			const node = createNode.createNode(value, tag, ctx);
			if (flow && identity.isCollection(node)) node.flow = true;
			setAnchors();
			return node;
		}
		createPair(key, value, options = {}) {
			const k = this.createNode(key, null, options);
			const v = this.createNode(value, null, options);
			return new Pair.Pair(k, v);
		}
		delete(key) {
			return assertCollection(this.contents) ? this.contents.delete(key) : false;
		}
		deleteIn(path) {
			if (Collection.isEmptyPath(path)) {
				if (this.contents == null) return false;
				this.contents = null;
				return true;
			}
			return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
		}
		get(key, keepScalar) {
			return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
		}
		getIn(path, keepScalar) {
			if (Collection.isEmptyPath(path)) return !keepScalar && identity.isScalar(this.contents) ? this.contents.value : this.contents;
			return identity.isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
		}
		has(key) {
			return identity.isCollection(this.contents) ? this.contents.has(key) : false;
		}
		hasIn(path) {
			if (Collection.isEmptyPath(path)) return this.contents !== void 0;
			return identity.isCollection(this.contents) ? this.contents.hasIn(path) : false;
		}
		set(key, value) {
			if (this.contents == null) this.contents = Collection.collectionFromPath(this.schema, [key], value);
			else if (assertCollection(this.contents)) this.contents.set(key, value);
		}
		setIn(path, value) {
			if (Collection.isEmptyPath(path)) this.contents = value;
			else if (this.contents == null) this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
			else if (assertCollection(this.contents)) this.contents.setIn(path, value);
		}
		setSchema(version, options = {}) {
			if (typeof version === "number") version = String(version);
			let opt;
			switch (version) {
				case "1.1":
					if (this.directives) this.directives.yaml.version = "1.1";
					else this.directives = new directives.Directives({ version: "1.1" });
					opt = {
						resolveKnownTags: false,
						schema: "yaml-1.1"
					};
					break;
				case "1.2":
				case "next":
					if (this.directives) this.directives.yaml.version = version;
					else this.directives = new directives.Directives({ version });
					opt = {
						resolveKnownTags: true,
						schema: "core"
					};
					break;
				case null:
					if (this.directives) delete this.directives;
					opt = null;
					break;
				default: {
					const sv = JSON.stringify(version);
					throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
				}
			}
			if (options.schema instanceof Object) this.schema = options.schema;
			else if (opt) this.schema = new Schema.Schema(Object.assign(opt, options));
			else throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
		}
		toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
			const ctx = {
				anchors: /* @__PURE__ */ new Map(),
				doc: this,
				keep: !json,
				mapAsMap: mapAsMap === true,
				mapKeyWarned: false,
				maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
			};
			const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
			if (typeof onAnchor === "function") for (const { count, res } of ctx.anchors.values()) onAnchor(res, count);
			return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
		}
		toJSON(jsonArg, onAnchor) {
			return this.toJS({
				json: true,
				jsonArg,
				mapAsMap: false,
				onAnchor
			});
		}
		toString(options = {}) {
			if (this.errors.length > 0) throw new Error("Document with errors cannot be stringified");
			if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
				const s = JSON.stringify(options.indent);
				throw new Error(`"indent" option must be a positive integer, not ${s}`);
			}
			return stringifyDocument.stringifyDocument(this, options);
		}
	};
	function assertCollection(contents) {
		if (identity.isCollection(contents)) return true;
		throw new Error("Expected a YAML collection as document contents");
	}
	exports.Document = Document;
}));
var require_errors = /* @__PURE__ */ __commonJSMin(((exports) => {
	var YAMLError = class extends Error {
		constructor(name, pos, code, message) {
			super();
			this.name = name;
			this.code = code;
			this.message = message;
			this.pos = pos;
		}
	};
	var YAMLParseError = class extends YAMLError {
		constructor(pos, code, message) {
			super("YAMLParseError", pos, code, message);
		}
	};
	var YAMLWarning = class extends YAMLError {
		constructor(pos, code, message) {
			super("YAMLWarning", pos, code, message);
		}
	};
	const prettifyError = (src, lc) => (error) => {
		if (error.pos[0] === -1) return;
		error.linePos = error.pos.map((pos) => lc.linePos(pos));
		const { line, col } = error.linePos[0];
		error.message += ` at line ${line}, column ${col}`;
		let ci = col - 1;
		let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
		if (ci >= 60 && lineStr.length > 80) {
			const trimStart = Math.min(ci - 39, lineStr.length - 79);
			lineStr = "…" + lineStr.substring(trimStart);
			ci -= trimStart - 1;
		}
		if (lineStr.length > 80) lineStr = lineStr.substring(0, 79) + "…";
		if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
			let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
			if (prev.length > 80) prev = prev.substring(0, 79) + "…\n";
			lineStr = prev + lineStr;
		}
		if (/[^ ]/.test(lineStr)) {
			let count = 1;
			const end = error.linePos[1];
			if (end?.line === line && end.col > col) count = Math.max(1, Math.min(end.col - col, 80 - ci));
			const pointer = " ".repeat(ci) + "^".repeat(count);
			error.message += `:\n\n${lineStr}\n${pointer}\n`;
		}
	};
	exports.YAMLError = YAMLError;
	exports.YAMLParseError = YAMLParseError;
	exports.YAMLWarning = YAMLWarning;
	exports.prettifyError = prettifyError;
}));
var require_resolve_props = /* @__PURE__ */ __commonJSMin(((exports) => {
	function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
		let spaceBefore = false;
		let atNewline = startOnNewline;
		let hasSpace = startOnNewline;
		let comment = "";
		let commentSep = "";
		let hasNewline = false;
		let reqSpace = false;
		let tab = null;
		let anchor = null;
		let tag = null;
		let newlineAfterProp = null;
		let comma = null;
		let found = null;
		let start = null;
		for (const token of tokens) {
			if (reqSpace) {
				if (token.type !== "space" && token.type !== "newline" && token.type !== "comma") onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
				reqSpace = false;
			}
			if (tab) {
				if (atNewline && token.type !== "comment" && token.type !== "newline") onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
				tab = null;
			}
			switch (token.type) {
				case "space":
					if (!flow && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) tab = token;
					hasSpace = true;
					break;
				case "comment": {
					if (!hasSpace) onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
					const cb = token.source.substring(1) || " ";
					if (!comment) comment = cb;
					else comment += commentSep + cb;
					commentSep = "";
					atNewline = false;
					break;
				}
				case "newline":
					if (atNewline) {
						if (comment) comment += token.source;
						else if (!found || indicator !== "seq-item-ind") spaceBefore = true;
					} else commentSep += token.source;
					atNewline = true;
					hasNewline = true;
					if (anchor || tag) newlineAfterProp = token;
					hasSpace = true;
					break;
				case "anchor":
					if (anchor) onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
					if (token.source.endsWith(":")) onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
					anchor = token;
					start ?? (start = token.offset);
					atNewline = false;
					hasSpace = false;
					reqSpace = true;
					break;
				case "tag":
					if (tag) onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
					tag = token;
					start ?? (start = token.offset);
					atNewline = false;
					hasSpace = false;
					reqSpace = true;
					break;
				case indicator:
					if (anchor || tag) onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
					if (found) onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
					found = token;
					atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
					hasSpace = false;
					break;
				case "comma": if (flow) {
					if (comma) onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
					comma = token;
					atNewline = false;
					hasSpace = false;
					break;
				}
				default:
					onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
					atNewline = false;
					hasSpace = false;
			}
		}
		const last = tokens[tokens.length - 1];
		const end = last ? last.offset + last.source.length : offset;
		if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
		if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq")) onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
		return {
			comma,
			found,
			spaceBefore,
			comment,
			hasNewline,
			anchor,
			tag,
			newlineAfterProp,
			end,
			start: start ?? end
		};
	}
	exports.resolveProps = resolveProps;
}));
var require_util_contains_newline = /* @__PURE__ */ __commonJSMin(((exports) => {
	function containsNewline(key) {
		if (!key) return null;
		switch (key.type) {
			case "alias":
			case "scalar":
			case "double-quoted-scalar":
			case "single-quoted-scalar":
				if (key.source.includes("\n")) return true;
				if (key.end) {
					for (const st of key.end) if (st.type === "newline") return true;
				}
				return false;
			case "flow-collection":
				for (const it of key.items) {
					for (const st of it.start) if (st.type === "newline") return true;
					if (it.sep) {
						for (const st of it.sep) if (st.type === "newline") return true;
					}
					if (containsNewline(it.key) || containsNewline(it.value)) return true;
				}
				return false;
			default: return true;
		}
	}
	exports.containsNewline = containsNewline;
}));
var require_util_flow_indent_check = /* @__PURE__ */ __commonJSMin(((exports) => {
	var utilContainsNewline = require_util_contains_newline();
	function flowIndentCheck(indent, fc, onError) {
		if (fc?.type === "flow-collection") {
			const end = fc.end[0];
			if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) onError(end, "BAD_INDENT", "Flow end indicator should be more indented than parent", true);
		}
	}
	exports.flowIndentCheck = flowIndentCheck;
}));
var require_util_map_includes = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	function mapIncludes(ctx, items, search) {
		const { uniqueKeys } = ctx.options;
		if (uniqueKeys === false) return false;
		const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || identity.isScalar(a) && identity.isScalar(b) && a.value === b.value;
		return items.some((pair) => isEqual(pair.key, search));
	}
	exports.mapIncludes = mapIncludes;
}));
var require_resolve_block_map = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Pair = require_Pair();
	var YAMLMap = require_YAMLMap();
	var resolveProps = require_resolve_props();
	var utilContainsNewline = require_util_contains_newline();
	var utilFlowIndentCheck = require_util_flow_indent_check();
	var utilMapIncludes = require_util_map_includes();
	const startColMsg = "All mapping items must start at the same column";
	function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
		const map = new (tag?.nodeClass ?? YAMLMap.YAMLMap)(ctx.schema);
		if (ctx.atRoot) ctx.atRoot = false;
		let offset = bm.offset;
		let commentEnd = null;
		for (const collItem of bm.items) {
			const { start, key, sep, value } = collItem;
			const keyProps = resolveProps.resolveProps(start, {
				indicator: "explicit-key-ind",
				next: key ?? sep?.[0],
				offset,
				onError,
				parentIndent: bm.indent,
				startOnNewline: true
			});
			const implicitKey = !keyProps.found;
			if (implicitKey) {
				if (key) {
					if (key.type === "block-seq") onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
					else if ("indent" in key && key.indent !== bm.indent) onError(offset, "BAD_INDENT", startColMsg);
				}
				if (!keyProps.anchor && !keyProps.tag && !sep) {
					commentEnd = keyProps.end;
					if (keyProps.comment) if (map.comment) map.comment += "\n" + keyProps.comment;
					else map.comment = keyProps.comment;
					continue;
				}
				if (keyProps.newlineAfterProp || utilContainsNewline.containsNewline(key)) onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
			} else if (keyProps.found?.indent !== bm.indent) onError(offset, "BAD_INDENT", startColMsg);
			ctx.atKey = true;
			const keyStart = keyProps.end;
			const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
			if (ctx.schema.compat) utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
			ctx.atKey = false;
			if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode)) onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
			const valueProps = resolveProps.resolveProps(sep ?? [], {
				indicator: "map-value-ind",
				next: value,
				offset: keyNode.range[2],
				onError,
				parentIndent: bm.indent,
				startOnNewline: !key || key.type === "block-scalar"
			});
			offset = valueProps.end;
			if (valueProps.found) {
				if (implicitKey) {
					if (value?.type === "block-map" && !valueProps.hasNewline) onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
					if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024) onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
				}
				const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
				if (ctx.schema.compat) utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
				offset = valueNode.range[2];
				const pair = new Pair.Pair(keyNode, valueNode);
				if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
				map.items.push(pair);
			} else {
				if (implicitKey) onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
				if (valueProps.comment) if (keyNode.comment) keyNode.comment += "\n" + valueProps.comment;
				else keyNode.comment = valueProps.comment;
				const pair = new Pair.Pair(keyNode);
				if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
				map.items.push(pair);
			}
		}
		if (commentEnd && commentEnd < offset) onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
		map.range = [
			bm.offset,
			offset,
			commentEnd ?? offset
		];
		return map;
	}
	exports.resolveBlockMap = resolveBlockMap;
}));
var require_resolve_block_seq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var YAMLSeq = require_YAMLSeq();
	var resolveProps = require_resolve_props();
	var utilFlowIndentCheck = require_util_flow_indent_check();
	function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
		const seq = new (tag?.nodeClass ?? YAMLSeq.YAMLSeq)(ctx.schema);
		if (ctx.atRoot) ctx.atRoot = false;
		if (ctx.atKey) ctx.atKey = false;
		let offset = bs.offset;
		let commentEnd = null;
		for (const { start, value } of bs.items) {
			const props = resolveProps.resolveProps(start, {
				indicator: "seq-item-ind",
				next: value,
				offset,
				onError,
				parentIndent: bs.indent,
				startOnNewline: true
			});
			if (!props.found) if (props.anchor || props.tag || value) if (value?.type === "block-seq") onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
			else onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
			else {
				commentEnd = props.end;
				if (props.comment) seq.comment = props.comment;
				continue;
			}
			const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
			if (ctx.schema.compat) utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
			offset = node.range[2];
			seq.items.push(node);
		}
		seq.range = [
			bs.offset,
			offset,
			commentEnd ?? offset
		];
		return seq;
	}
	exports.resolveBlockSeq = resolveBlockSeq;
}));
var require_resolve_end = /* @__PURE__ */ __commonJSMin(((exports) => {
	function resolveEnd(end, offset, reqSpace, onError) {
		let comment = "";
		if (end) {
			let hasSpace = false;
			let sep = "";
			for (const token of end) {
				const { source, type } = token;
				switch (type) {
					case "space":
						hasSpace = true;
						break;
					case "comment": {
						if (reqSpace && !hasSpace) onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
						const cb = source.substring(1) || " ";
						if (!comment) comment = cb;
						else comment += sep + cb;
						sep = "";
						break;
					}
					case "newline":
						if (comment) sep += source;
						hasSpace = true;
						break;
					default: onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
				}
				offset += source.length;
			}
		}
		return {
			comment,
			offset
		};
	}
	exports.resolveEnd = resolveEnd;
}));
var require_resolve_flow_collection = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var Pair = require_Pair();
	var YAMLMap = require_YAMLMap();
	var YAMLSeq = require_YAMLSeq();
	var resolveEnd = require_resolve_end();
	var resolveProps = require_resolve_props();
	var utilContainsNewline = require_util_contains_newline();
	var utilMapIncludes = require_util_map_includes();
	const blockMsg = "Block collections are not allowed within flow collections";
	const isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
	function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
		const isMap = fc.start.source === "{";
		const fcName = isMap ? "flow map" : "flow sequence";
		const coll = new (tag?.nodeClass ?? (isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq))(ctx.schema);
		coll.flow = true;
		const atRoot = ctx.atRoot;
		if (atRoot) ctx.atRoot = false;
		if (ctx.atKey) ctx.atKey = false;
		let offset = fc.offset + fc.start.source.length;
		for (let i = 0; i < fc.items.length; ++i) {
			const collItem = fc.items[i];
			const { start, key, sep, value } = collItem;
			const props = resolveProps.resolveProps(start, {
				flow: fcName,
				indicator: "explicit-key-ind",
				next: key ?? sep?.[0],
				offset,
				onError,
				parentIndent: fc.indent,
				startOnNewline: false
			});
			if (!props.found) {
				if (!props.anchor && !props.tag && !sep && !value) {
					if (i === 0 && props.comma) onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
					else if (i < fc.items.length - 1) onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
					if (props.comment) if (coll.comment) coll.comment += "\n" + props.comment;
					else coll.comment = props.comment;
					offset = props.end;
					continue;
				}
				if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key)) onError(key, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
			}
			if (i === 0) {
				if (props.comma) onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
			} else {
				if (!props.comma) onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
				if (props.comment) {
					let prevItemComment = "";
					loop: for (const st of start) switch (st.type) {
						case "comma":
						case "space": break;
						case "comment":
							prevItemComment = st.source.substring(1);
							break loop;
						default: break loop;
					}
					if (prevItemComment) {
						let prev = coll.items[coll.items.length - 1];
						if (identity.isPair(prev)) prev = prev.value ?? prev.key;
						if (prev.comment) prev.comment += "\n" + prevItemComment;
						else prev.comment = prevItemComment;
						props.comment = props.comment.substring(prevItemComment.length + 1);
					}
				}
			}
			if (!isMap && !sep && !props.found) {
				const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
				coll.items.push(valueNode);
				offset = valueNode.range[2];
				if (isBlock(value)) onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
			} else {
				ctx.atKey = true;
				const keyStart = props.end;
				const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
				if (isBlock(key)) onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
				ctx.atKey = false;
				const valueProps = resolveProps.resolveProps(sep ?? [], {
					flow: fcName,
					indicator: "map-value-ind",
					next: value,
					offset: keyNode.range[2],
					onError,
					parentIndent: fc.indent,
					startOnNewline: false
				});
				if (valueProps.found) {
					if (!isMap && !props.found && ctx.options.strict) {
						if (sep) for (const st of sep) {
							if (st === valueProps.found) break;
							if (st.type === "newline") {
								onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
								break;
							}
						}
						if (props.start < valueProps.found.offset - 1024) onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
					}
				} else if (value) if ("source" in value && value.source?.[0] === ":") onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
				else onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
				const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
				if (valueNode) {
					if (isBlock(value)) onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
				} else if (valueProps.comment) if (keyNode.comment) keyNode.comment += "\n" + valueProps.comment;
				else keyNode.comment = valueProps.comment;
				const pair = new Pair.Pair(keyNode, valueNode);
				if (ctx.options.keepSourceTokens) pair.srcToken = collItem;
				if (isMap) {
					const map = coll;
					if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode)) onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
					map.items.push(pair);
				} else {
					const map = new YAMLMap.YAMLMap(ctx.schema);
					map.flow = true;
					map.items.push(pair);
					const endRange = (valueNode ?? keyNode).range;
					map.range = [
						keyNode.range[0],
						endRange[1],
						endRange[2]
					];
					coll.items.push(map);
				}
				offset = valueNode ? valueNode.range[2] : valueProps.end;
			}
		}
		const expectedEnd = isMap ? "}" : "]";
		const [ce, ...ee] = fc.end;
		let cePos = offset;
		if (ce?.source === expectedEnd) cePos = ce.offset + ce.source.length;
		else {
			const name = fcName[0].toUpperCase() + fcName.substring(1);
			const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
			onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
			if (ce && ce.source.length !== 1) ee.unshift(ce);
		}
		if (ee.length > 0) {
			const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
			if (end.comment) if (coll.comment) coll.comment += "\n" + end.comment;
			else coll.comment = end.comment;
			coll.range = [
				fc.offset,
				cePos,
				end.offset
			];
		} else coll.range = [
			fc.offset,
			cePos,
			cePos
		];
		return coll;
	}
	exports.resolveFlowCollection = resolveFlowCollection;
}));
var require_compose_collection = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var Scalar = require_Scalar();
	var YAMLMap = require_YAMLMap();
	var YAMLSeq = require_YAMLSeq();
	var resolveBlockMap = require_resolve_block_map();
	var resolveBlockSeq = require_resolve_block_seq();
	var resolveFlowCollection = require_resolve_flow_collection();
	function resolveCollection(CN, ctx, token, onError, tagName, tag) {
		const coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
		const Coll = coll.constructor;
		if (tagName === "!" || tagName === Coll.tagName) {
			coll.tag = Coll.tagName;
			return coll;
		}
		if (tagName) coll.tag = tagName;
		return coll;
	}
	function composeCollection(CN, ctx, token, props, onError) {
		const tagToken = props.tag;
		const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
		if (token.type === "block-seq") {
			const { anchor, newlineAfterProp: nl } = props;
			const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
			if (lastProp && (!nl || nl.offset < lastProp.offset)) onError(lastProp, "MISSING_CHAR", "Missing newline after block sequence props");
		}
		const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
		if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq") return resolveCollection(CN, ctx, token, onError, tagName);
		let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
		if (!tag) {
			const kt = ctx.schema.knownTags[tagName];
			if (kt?.collection === expType) {
				ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
				tag = kt;
			} else {
				if (kt) onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
				else onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
				return resolveCollection(CN, ctx, token, onError, tagName);
			}
		}
		const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
		const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
		const node = identity.isNode(res) ? res : new Scalar.Scalar(res);
		node.range = coll.range;
		node.tag = tagName;
		if (tag?.format) node.format = tag.format;
		return node;
	}
	exports.composeCollection = composeCollection;
}));
var require_resolve_block_scalar = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scalar = require_Scalar();
	function resolveBlockScalar(ctx, scalar, onError) {
		const start = scalar.offset;
		const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
		if (!header) return {
			value: "",
			type: null,
			comment: "",
			range: [
				start,
				start,
				start
			]
		};
		const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
		const lines = scalar.source ? splitLines(scalar.source) : [];
		let chompStart = lines.length;
		for (let i = lines.length - 1; i >= 0; --i) {
			const content = lines[i][1];
			if (content === "" || content === "\r") chompStart = i;
			else break;
		}
		if (chompStart === 0) {
			const value = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
			let end = start + header.length;
			if (scalar.source) end += scalar.source.length;
			return {
				value,
				type,
				comment: header.comment,
				range: [
					start,
					end,
					end
				]
			};
		}
		let trimIndent = scalar.indent + header.indent;
		let offset = scalar.offset + header.length;
		let contentStart = 0;
		for (let i = 0; i < chompStart; ++i) {
			const [indent, content] = lines[i];
			if (content === "" || content === "\r") {
				if (header.indent === 0 && indent.length > trimIndent) trimIndent = indent.length;
			} else {
				if (indent.length < trimIndent) onError(offset + indent.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator");
				if (header.indent === 0) trimIndent = indent.length;
				contentStart = i;
				if (trimIndent === 0 && !ctx.atRoot) onError(offset, "BAD_INDENT", "Block scalar values in collections must be indented");
				break;
			}
			offset += indent.length + content.length + 1;
		}
		for (let i = lines.length - 1; i >= chompStart; --i) if (lines[i][0].length > trimIndent) chompStart = i + 1;
		let value = "";
		let sep = "";
		let prevMoreIndented = false;
		for (let i = 0; i < contentStart; ++i) value += lines[i][0].slice(trimIndent) + "\n";
		for (let i = contentStart; i < chompStart; ++i) {
			let [indent, content] = lines[i];
			offset += indent.length + content.length + 1;
			const crlf = content[content.length - 1] === "\r";
			if (crlf) content = content.slice(0, -1);
			/* istanbul ignore if already caught in lexer */
			if (content && indent.length < trimIndent) {
				const message = `Block scalar lines must not be less indented than their ${header.indent ? "explicit indentation indicator" : "first line"}`;
				onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
				indent = "";
			}
			if (type === Scalar.Scalar.BLOCK_LITERAL) {
				value += sep + indent.slice(trimIndent) + content;
				sep = "\n";
			} else if (indent.length > trimIndent || content[0] === "	") {
				if (sep === " ") sep = "\n";
				else if (!prevMoreIndented && sep === "\n") sep = "\n\n";
				value += sep + indent.slice(trimIndent) + content;
				sep = "\n";
				prevMoreIndented = true;
			} else if (content === "") if (sep === "\n") value += "\n";
			else sep = "\n";
			else {
				value += sep + content;
				sep = " ";
				prevMoreIndented = false;
			}
		}
		switch (header.chomp) {
			case "-": break;
			case "+":
				for (let i = chompStart; i < lines.length; ++i) value += "\n" + lines[i][0].slice(trimIndent);
				if (value[value.length - 1] !== "\n") value += "\n";
				break;
			default: value += "\n";
		}
		const end = start + header.length + scalar.source.length;
		return {
			value,
			type,
			comment: header.comment,
			range: [
				start,
				end,
				end
			]
		};
	}
	function parseBlockScalarHeader({ offset, props }, strict, onError) {
		/* istanbul ignore if should not happen */
		if (props[0].type !== "block-scalar-header") {
			onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
			return null;
		}
		const { source } = props[0];
		const mode = source[0];
		let indent = 0;
		let chomp = "";
		let error = -1;
		for (let i = 1; i < source.length; ++i) {
			const ch = source[i];
			if (!chomp && (ch === "-" || ch === "+")) chomp = ch;
			else {
				const n = Number(ch);
				if (!indent && n) indent = n;
				else if (error === -1) error = offset + i;
			}
		}
		if (error !== -1) onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
		let hasSpace = false;
		let comment = "";
		let length = source.length;
		for (let i = 1; i < props.length; ++i) {
			const token = props[i];
			switch (token.type) {
				case "space": hasSpace = true;
				case "newline":
					length += token.source.length;
					break;
				case "comment":
					if (strict && !hasSpace) onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
					length += token.source.length;
					comment = token.source.substring(1);
					break;
				case "error":
					onError(token, "UNEXPECTED_TOKEN", token.message);
					length += token.source.length;
					break;
				default: {
					onError(token, "UNEXPECTED_TOKEN", `Unexpected token in block scalar header: ${token.type}`);
					const ts = token.source;
					if (ts && typeof ts === "string") length += ts.length;
				}
			}
		}
		return {
			mode,
			indent,
			chomp,
			comment,
			length
		};
	}
	function splitLines(source) {
		const split = source.split(/\n( *)/);
		const first = split[0];
		const m = first.match(/^( *)/);
		const lines = [m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first]];
		for (let i = 1; i < split.length; i += 2) lines.push([split[i], split[i + 1]]);
		return lines;
	}
	exports.resolveBlockScalar = resolveBlockScalar;
}));
var require_resolve_flow_scalar = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scalar = require_Scalar();
	var resolveEnd = require_resolve_end();
	function resolveFlowScalar(scalar, strict, onError) {
		const { offset, type, source, end } = scalar;
		let _type;
		let value;
		const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
		switch (type) {
			case "scalar":
				_type = Scalar.Scalar.PLAIN;
				value = plainValue(source, _onError);
				break;
			case "single-quoted-scalar":
				_type = Scalar.Scalar.QUOTE_SINGLE;
				value = singleQuotedValue(source, _onError);
				break;
			case "double-quoted-scalar":
				_type = Scalar.Scalar.QUOTE_DOUBLE;
				value = doubleQuotedValue(source, _onError);
				break;
			default:
				onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
				return {
					value: "",
					type: null,
					comment: "",
					range: [
						offset,
						offset + source.length,
						offset + source.length
					]
				};
		}
		const valueEnd = offset + source.length;
		const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
		return {
			value,
			type: _type,
			comment: re.comment,
			range: [
				offset,
				valueEnd,
				re.offset
			]
		};
	}
	function plainValue(source, onError) {
		let badChar = "";
		switch (source[0]) {
			case "	":
				badChar = "a tab character";
				break;
			case ",":
				badChar = "flow indicator character ,";
				break;
			case "%":
				badChar = "directive indicator character %";
				break;
			case "|":
			case ">":
				badChar = `block scalar indicator ${source[0]}`;
				break;
			case "@":
			case "`":
				badChar = `reserved character ${source[0]}`;
				break;
		}
		if (badChar) onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
		return foldLines(source);
	}
	function singleQuotedValue(source, onError) {
		if (source[source.length - 1] !== "'" || source.length === 1) onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
		return foldLines(source.slice(1, -1)).replace(/''/g, "'");
	}
	function foldLines(source) {
		let first, line;
		try {
			first = /* @__PURE__ */ new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
			line = /* @__PURE__ */ new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
		} catch {
			first = /(.*?)[ \t]*\r?\n/sy;
			line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
		}
		let match = first.exec(source);
		if (!match) return source;
		let res = match[1];
		let sep = " ";
		let pos = first.lastIndex;
		line.lastIndex = pos;
		while (match = line.exec(source)) {
			if (match[1] === "") if (sep === "\n") res += sep;
			else sep = "\n";
			else {
				res += sep + match[1];
				sep = " ";
			}
			pos = line.lastIndex;
		}
		const last = /[ \t]*(.*)/sy;
		last.lastIndex = pos;
		match = last.exec(source);
		return res + sep + (match?.[1] ?? "");
	}
	function doubleQuotedValue(source, onError) {
		let res = "";
		for (let i = 1; i < source.length - 1; ++i) {
			const ch = source[i];
			if (ch === "\r" && source[i + 1] === "\n") continue;
			if (ch === "\n") {
				const { fold, offset } = foldNewline(source, i);
				res += fold;
				i = offset;
			} else if (ch === "\\") {
				let next = source[++i];
				const cc = escapeCodes[next];
				if (cc) res += cc;
				else if (next === "\n") {
					next = source[i + 1];
					while (next === " " || next === "	") next = source[++i + 1];
				} else if (next === "\r" && source[i + 1] === "\n") {
					next = source[++i + 1];
					while (next === " " || next === "	") next = source[++i + 1];
				} else if (next === "x" || next === "u" || next === "U") {
					const length = {
						x: 2,
						u: 4,
						U: 8
					}[next];
					res += parseCharCode(source, i + 1, length, onError);
					i += length;
				} else {
					const raw = source.substr(i - 1, 2);
					onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
					res += raw;
				}
			} else if (ch === " " || ch === "	") {
				const wsStart = i;
				let next = source[i + 1];
				while (next === " " || next === "	") next = source[++i + 1];
				if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n")) res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
			} else res += ch;
		}
		if (source[source.length - 1] !== "\"" || source.length === 1) onError(source.length, "MISSING_CHAR", "Missing closing \"quote");
		return res;
	}
	function foldNewline(source, offset) {
		let fold = "";
		let ch = source[offset + 1];
		while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
			if (ch === "\r" && source[offset + 2] !== "\n") break;
			if (ch === "\n") fold += "\n";
			offset += 1;
			ch = source[offset + 1];
		}
		if (!fold) fold = " ";
		return {
			fold,
			offset
		};
	}
	const escapeCodes = {
		"0": "\0",
		a: "\x07",
		b: "\b",
		e: "\x1B",
		f: "\f",
		n: "\n",
		r: "\r",
		t: "	",
		v: "\v",
		N: "",
		_: "\xA0",
		L: "\u2028",
		P: "\u2029",
		" ": " ",
		"\"": "\"",
		"/": "/",
		"\\": "\\",
		"	": "	"
	};
	function parseCharCode(source, offset, length, onError) {
		const cc = source.substr(offset, length);
		const code = cc.length === length && /^[0-9a-fA-F]+$/.test(cc) ? parseInt(cc, 16) : NaN;
		if (isNaN(code)) {
			const raw = source.substr(offset - 2, length + 2);
			onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
			return raw;
		}
		return String.fromCodePoint(code);
	}
	exports.resolveFlowScalar = resolveFlowScalar;
}));
var require_compose_scalar = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identity = require_identity();
	var Scalar = require_Scalar();
	var resolveBlockScalar = require_resolve_block_scalar();
	var resolveFlowScalar = require_resolve_flow_scalar();
	function composeScalar(ctx, token, tagToken, onError) {
		const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(ctx, token, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
		const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
		let tag;
		if (ctx.options.stringKeys && ctx.atKey) tag = ctx.schema[identity.SCALAR];
		else if (tagName) tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
		else if (token.type === "scalar") tag = findScalarTagByTest(ctx, value, token, onError);
		else tag = ctx.schema[identity.SCALAR];
		let scalar;
		try {
			const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
			scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
			scalar = new Scalar.Scalar(value);
		}
		scalar.range = range;
		scalar.source = value;
		if (type) scalar.type = type;
		if (tagName) scalar.tag = tagName;
		if (tag.format) scalar.format = tag.format;
		if (comment) scalar.comment = comment;
		return scalar;
	}
	function findScalarTagByName(schema, value, tagName, tagToken, onError) {
		if (tagName === "!") return schema[identity.SCALAR];
		const matchWithTest = [];
		for (const tag of schema.tags) if (!tag.collection && tag.tag === tagName) if (tag.default && tag.test) matchWithTest.push(tag);
		else return tag;
		for (const tag of matchWithTest) if (tag.test?.test(value)) return tag;
		const kt = schema.knownTags[tagName];
		if (kt && !kt.collection) {
			schema.tags.push(Object.assign({}, kt, {
				default: false,
				test: void 0
			}));
			return kt;
		}
		onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
		return schema[identity.SCALAR];
	}
	function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
		const tag = schema.tags.find((tag) => (tag.default === true || atKey && tag.default === "key") && tag.test?.test(value)) || schema[identity.SCALAR];
		if (schema.compat) {
			const compat = schema.compat.find((tag) => tag.default && tag.test?.test(value)) ?? schema[identity.SCALAR];
			if (tag.tag !== compat.tag) onError(token, "TAG_RESOLVE_FAILED", `Value may be parsed as either ${directives.tagString(tag.tag)} or ${directives.tagString(compat.tag)}`, true);
		}
		return tag;
	}
	exports.composeScalar = composeScalar;
}));
var require_util_empty_scalar_position = /* @__PURE__ */ __commonJSMin(((exports) => {
	function emptyScalarPosition(offset, before, pos) {
		if (before) {
			pos ?? (pos = before.length);
			for (let i = pos - 1; i >= 0; --i) {
				let st = before[i];
				switch (st.type) {
					case "space":
					case "comment":
					case "newline":
						offset -= st.source.length;
						continue;
				}
				st = before[++i];
				while (st?.type === "space") {
					offset += st.source.length;
					st = before[++i];
				}
				break;
			}
		}
		return offset;
	}
	exports.emptyScalarPosition = emptyScalarPosition;
}));
var require_compose_node = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Alias = require_Alias();
	var identity = require_identity();
	var composeCollection = require_compose_collection();
	var composeScalar = require_compose_scalar();
	var resolveEnd = require_resolve_end();
	var utilEmptyScalarPosition = require_util_empty_scalar_position();
	const CN = {
		composeNode,
		composeEmptyNode
	};
	function composeNode(ctx, token, props, onError) {
		const atKey = ctx.atKey;
		const { spaceBefore, comment, anchor, tag } = props;
		let node;
		let isSrcToken = true;
		switch (token.type) {
			case "alias":
				node = composeAlias(ctx, token, onError);
				if (anchor || tag) onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
				break;
			case "scalar":
			case "single-quoted-scalar":
			case "double-quoted-scalar":
			case "block-scalar":
				node = composeScalar.composeScalar(ctx, token, tag, onError);
				if (anchor) node.anchor = anchor.source.substring(1);
				break;
			case "block-map":
			case "block-seq":
			case "flow-collection":
				try {
					node = composeCollection.composeCollection(CN, ctx, token, props, onError);
					if (anchor) node.anchor = anchor.source.substring(1);
				} catch (error) {
					onError(token, "RESOURCE_EXHAUSTION", error instanceof Error ? error.message : String(error));
				}
				break;
			default:
				onError(token, "UNEXPECTED_TOKEN", token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`);
				isSrcToken = false;
		}
		node ?? (node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError));
		if (anchor && node.anchor === "") onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
		if (atKey && ctx.options.stringKeys && (!identity.isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) onError(tag ?? token, "NON_STRING_KEY", "With stringKeys, all keys must be strings");
		if (spaceBefore) node.spaceBefore = true;
		if (comment) if (token.type === "scalar" && token.source === "") node.comment = comment;
		else node.commentBefore = comment;
		if (ctx.options.keepSourceTokens && isSrcToken) node.srcToken = token;
		return node;
	}
	function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
		const token = {
			type: "scalar",
			offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
			indent: -1,
			source: ""
		};
		const node = composeScalar.composeScalar(ctx, token, tag, onError);
		if (anchor) {
			node.anchor = anchor.source.substring(1);
			if (node.anchor === "") onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
		}
		if (spaceBefore) node.spaceBefore = true;
		if (comment) {
			node.comment = comment;
			node.range[2] = end;
		}
		return node;
	}
	function composeAlias({ options }, { offset, source, end }, onError) {
		const alias = new Alias.Alias(source.substring(1));
		if (alias.source === "") onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
		if (alias.source.endsWith(":")) onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
		const valueEnd = offset + source.length;
		const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
		alias.range = [
			offset,
			valueEnd,
			re.offset
		];
		if (re.comment) alias.comment = re.comment;
		return alias;
	}
	exports.composeEmptyNode = composeEmptyNode;
	exports.composeNode = composeNode;
}));
var require_compose_doc = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Document = require_Document();
	var composeNode = require_compose_node();
	var resolveEnd = require_resolve_end();
	var resolveProps = require_resolve_props();
	function composeDoc(options, directives, { offset, start, value, end }, onError) {
		const opts = Object.assign({ _directives: directives }, options);
		const doc = new Document.Document(void 0, opts);
		const ctx = {
			atKey: false,
			atRoot: true,
			directives: doc.directives,
			options: doc.options,
			schema: doc.schema
		};
		const props = resolveProps.resolveProps(start, {
			indicator: "doc-start",
			next: value ?? end?.[0],
			offset,
			onError,
			parentIndent: 0,
			startOnNewline: true
		});
		if (props.found) {
			doc.directives.docStart = true;
			if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline) onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
		}
		doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
		const contentEnd = doc.contents.range[2];
		const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
		if (re.comment) doc.comment = re.comment;
		doc.range = [
			offset,
			contentEnd,
			re.offset
		];
		return doc;
	}
	exports.composeDoc = composeDoc;
}));
var require_composer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var node_process$1 = __require("process");
	var directives = require_directives();
	var Document = require_Document();
	var errors = require_errors();
	var identity = require_identity();
	var composeDoc = require_compose_doc();
	var resolveEnd = require_resolve_end();
	function getErrorPos(src) {
		if (typeof src === "number") return [src, src + 1];
		if (Array.isArray(src)) return src.length === 2 ? src : [src[0], src[1]];
		const { offset, source } = src;
		return [offset, offset + (typeof source === "string" ? source.length : 1)];
	}
	function parsePrelude(prelude) {
		let comment = "";
		let atComment = false;
		let afterEmptyLine = false;
		for (let i = 0; i < prelude.length; ++i) {
			const source = prelude[i];
			switch (source[0]) {
				case "#":
					comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
					atComment = true;
					afterEmptyLine = false;
					break;
				case "%":
					if (prelude[i + 1]?.[0] !== "#") i += 1;
					atComment = false;
					break;
				default:
					if (!atComment) afterEmptyLine = true;
					atComment = false;
			}
		}
		return {
			comment,
			afterEmptyLine
		};
	}
	var Composer = class {
		constructor(options = {}) {
			this.doc = null;
			this.atDirectives = false;
			this.prelude = [];
			this.errors = [];
			this.warnings = [];
			this.onError = (source, code, message, warning) => {
				const pos = getErrorPos(source);
				if (warning) this.warnings.push(new errors.YAMLWarning(pos, code, message));
				else this.errors.push(new errors.YAMLParseError(pos, code, message));
			};
			this.directives = new directives.Directives({ version: options.version || "1.2" });
			this.options = options;
		}
		decorate(doc, afterDoc) {
			const { comment, afterEmptyLine } = parsePrelude(this.prelude);
			if (comment) {
				const dc = doc.contents;
				if (afterDoc) doc.comment = doc.comment ? `${doc.comment}\n${comment}` : comment;
				else if (afterEmptyLine || doc.directives.docStart || !dc) doc.commentBefore = comment;
				else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
					let it = dc.items[0];
					if (identity.isPair(it)) it = it.key;
					const cb = it.commentBefore;
					it.commentBefore = cb ? `${comment}\n${cb}` : comment;
				} else {
					const cb = dc.commentBefore;
					dc.commentBefore = cb ? `${comment}\n${cb}` : comment;
				}
			}
			if (afterDoc) {
				Array.prototype.push.apply(doc.errors, this.errors);
				Array.prototype.push.apply(doc.warnings, this.warnings);
			} else {
				doc.errors = this.errors;
				doc.warnings = this.warnings;
			}
			this.prelude = [];
			this.errors = [];
			this.warnings = [];
		}
		streamInfo() {
			return {
				comment: parsePrelude(this.prelude).comment,
				directives: this.directives,
				errors: this.errors,
				warnings: this.warnings
			};
		}
		*compose(tokens, forceDoc = false, endOffset = -1) {
			for (const token of tokens) yield* this.next(token);
			yield* this.end(forceDoc, endOffset);
		}
		*next(token) {
			if (node_process$1.env.LOG_STREAM) console.dir(token, { depth: null });
			switch (token.type) {
				case "directive":
					this.directives.add(token.source, (offset, message, warning) => {
						const pos = getErrorPos(token);
						pos[0] += offset;
						this.onError(pos, "BAD_DIRECTIVE", message, warning);
					});
					this.prelude.push(token.source);
					this.atDirectives = true;
					break;
				case "document": {
					const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
					if (this.atDirectives && !doc.directives.docStart) this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
					this.decorate(doc, false);
					if (this.doc) yield this.doc;
					this.doc = doc;
					this.atDirectives = false;
					break;
				}
				case "byte-order-mark":
				case "space": break;
				case "comment":
				case "newline":
					this.prelude.push(token.source);
					break;
				case "error": {
					const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
					const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
					if (this.atDirectives || !this.doc) this.errors.push(error);
					else this.doc.errors.push(error);
					break;
				}
				case "doc-end": {
					if (!this.doc) {
						this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", "Unexpected doc-end without preceding document"));
						break;
					}
					this.doc.directives.docEnd = true;
					const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
					this.decorate(this.doc, true);
					if (end.comment) {
						const dc = this.doc.comment;
						this.doc.comment = dc ? `${dc}\n${end.comment}` : end.comment;
					}
					this.doc.range[2] = end.offset;
					break;
				}
				default: this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
			}
		}
		*end(forceDoc = false, endOffset = -1) {
			if (this.doc) {
				this.decorate(this.doc, true);
				yield this.doc;
				this.doc = null;
			} else if (forceDoc) {
				const opts = Object.assign({ _directives: this.directives }, this.options);
				const doc = new Document.Document(void 0, opts);
				if (this.atDirectives) this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
				doc.range = [
					0,
					endOffset,
					endOffset
				];
				this.decorate(doc, false);
				yield doc;
			}
		}
	};
	exports.Composer = Composer;
}));
var require_cst_scalar = /* @__PURE__ */ __commonJSMin(((exports) => {
	var resolveBlockScalar = require_resolve_block_scalar();
	var resolveFlowScalar = require_resolve_flow_scalar();
	var errors = require_errors();
	var stringifyString = require_stringifyString();
	function resolveAsScalar(token, strict = true, onError) {
		if (token) {
			const _onError = (pos, code, message) => {
				const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
				if (onError) onError(offset, code, message);
				else throw new errors.YAMLParseError([offset, offset + 1], code, message);
			};
			switch (token.type) {
				case "scalar":
				case "single-quoted-scalar":
				case "double-quoted-scalar": return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
				case "block-scalar": return resolveBlockScalar.resolveBlockScalar({ options: { strict } }, token, _onError);
			}
		}
		return null;
	}
	function createScalarToken(value, context) {
		const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
		const source = stringifyString.stringifyString({
			type,
			value
		}, {
			implicitKey,
			indent: indent > 0 ? " ".repeat(indent) : "",
			inFlow,
			options: {
				blockQuote: true,
				lineWidth: -1
			}
		});
		const end = context.end ?? [{
			type: "newline",
			offset: -1,
			indent,
			source: "\n"
		}];
		switch (source[0]) {
			case "|":
			case ">": {
				const he = source.indexOf("\n");
				const head = source.substring(0, he);
				const body = source.substring(he + 1) + "\n";
				const props = [{
					type: "block-scalar-header",
					offset,
					indent,
					source: head
				}];
				if (!addEndtoBlockProps(props, end)) props.push({
					type: "newline",
					offset: -1,
					indent,
					source: "\n"
				});
				return {
					type: "block-scalar",
					offset,
					indent,
					props,
					source: body
				};
			}
			case "\"": return {
				type: "double-quoted-scalar",
				offset,
				indent,
				source,
				end
			};
			case "'": return {
				type: "single-quoted-scalar",
				offset,
				indent,
				source,
				end
			};
			default: return {
				type: "scalar",
				offset,
				indent,
				source,
				end
			};
		}
	}
	function setScalarValue(token, value, context = {}) {
		let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
		let indent = "indent" in token ? token.indent : null;
		if (afterKey && typeof indent === "number") indent += 2;
		if (!type) switch (token.type) {
			case "single-quoted-scalar":
				type = "QUOTE_SINGLE";
				break;
			case "double-quoted-scalar":
				type = "QUOTE_DOUBLE";
				break;
			case "block-scalar": {
				const header = token.props[0];
				if (header.type !== "block-scalar-header") throw new Error("Invalid block scalar header");
				type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
				break;
			}
			default: type = "PLAIN";
		}
		const source = stringifyString.stringifyString({
			type,
			value
		}, {
			implicitKey: implicitKey || indent === null,
			indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
			inFlow,
			options: {
				blockQuote: true,
				lineWidth: -1
			}
		});
		switch (source[0]) {
			case "|":
			case ">":
				setBlockScalarValue(token, source);
				break;
			case "\"":
				setFlowScalarValue(token, source, "double-quoted-scalar");
				break;
			case "'":
				setFlowScalarValue(token, source, "single-quoted-scalar");
				break;
			default: setFlowScalarValue(token, source, "scalar");
		}
	}
	function setBlockScalarValue(token, source) {
		const he = source.indexOf("\n");
		const head = source.substring(0, he);
		const body = source.substring(he + 1) + "\n";
		if (token.type === "block-scalar") {
			const header = token.props[0];
			if (header.type !== "block-scalar-header") throw new Error("Invalid block scalar header");
			header.source = head;
			token.source = body;
		} else {
			const { offset } = token;
			const indent = "indent" in token ? token.indent : -1;
			const props = [{
				type: "block-scalar-header",
				offset,
				indent,
				source: head
			}];
			if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0)) props.push({
				type: "newline",
				offset: -1,
				indent,
				source: "\n"
			});
			for (const key of Object.keys(token)) if (key !== "type" && key !== "offset") delete token[key];
			Object.assign(token, {
				type: "block-scalar",
				indent,
				props,
				source: body
			});
		}
	}
	function addEndtoBlockProps(props, end) {
		if (end) for (const st of end) switch (st.type) {
			case "space":
			case "comment":
				props.push(st);
				break;
			case "newline":
				props.push(st);
				return true;
		}
		return false;
	}
	function setFlowScalarValue(token, source, type) {
		switch (token.type) {
			case "scalar":
			case "double-quoted-scalar":
			case "single-quoted-scalar":
				token.type = type;
				token.source = source;
				break;
			case "block-scalar": {
				const end = token.props.slice(1);
				let oa = source.length;
				if (token.props[0].type === "block-scalar-header") oa -= token.props[0].source.length;
				for (const tok of end) tok.offset += oa;
				delete token.props;
				Object.assign(token, {
					type,
					source,
					end
				});
				break;
			}
			case "block-map":
			case "block-seq": {
				const nl = {
					type: "newline",
					offset: token.offset + source.length,
					indent: token.indent,
					source: "\n"
				};
				delete token.items;
				Object.assign(token, {
					type,
					source,
					end: [nl]
				});
				break;
			}
			default: {
				const indent = "indent" in token ? token.indent : -1;
				const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
				for (const key of Object.keys(token)) if (key !== "type" && key !== "offset") delete token[key];
				Object.assign(token, {
					type,
					indent,
					source,
					end
				});
			}
		}
	}
	exports.createScalarToken = createScalarToken;
	exports.resolveAsScalar = resolveAsScalar;
	exports.setScalarValue = setScalarValue;
}));
var require_cst_stringify = /* @__PURE__ */ __commonJSMin(((exports) => {
	const stringify = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
	function stringifyToken(token) {
		switch (token.type) {
			case "block-scalar": {
				let res = "";
				for (const tok of token.props) res += stringifyToken(tok);
				return res + token.source;
			}
			case "block-map":
			case "block-seq": {
				let res = "";
				for (const item of token.items) res += stringifyItem(item);
				return res;
			}
			case "flow-collection": {
				let res = token.start.source;
				for (const item of token.items) res += stringifyItem(item);
				for (const st of token.end) res += st.source;
				return res;
			}
			case "document": {
				let res = stringifyItem(token);
				if (token.end) for (const st of token.end) res += st.source;
				return res;
			}
			default: {
				let res = token.source;
				if ("end" in token && token.end) for (const st of token.end) res += st.source;
				return res;
			}
		}
	}
	function stringifyItem({ start, key, sep, value }) {
		let res = "";
		for (const st of start) res += st.source;
		if (key) res += stringifyToken(key);
		if (sep) for (const st of sep) res += st.source;
		if (value) res += stringifyToken(value);
		return res;
	}
	exports.stringify = stringify;
}));
var require_cst_visit = /* @__PURE__ */ __commonJSMin(((exports) => {
	const BREAK = Symbol("break visit");
	const SKIP = Symbol("skip children");
	const REMOVE = Symbol("remove item");
	function visit(cst, visitor) {
		if ("type" in cst && cst.type === "document") cst = {
			start: cst.start,
			value: cst.value
		};
		_visit(Object.freeze([]), cst, visitor);
	}
	visit.BREAK = BREAK;
	visit.SKIP = SKIP;
	visit.REMOVE = REMOVE;
	visit.itemAtPath = (cst, path) => {
		let item = cst;
		for (const [field, index] of path) {
			const tok = item?.[field];
			if (tok && "items" in tok) item = tok.items[index];
			else return void 0;
		}
		return item;
	};
	visit.parentCollection = (cst, path) => {
		const parent = visit.itemAtPath(cst, path.slice(0, -1));
		const field = path[path.length - 1][0];
		const coll = parent?.[field];
		if (coll && "items" in coll) return coll;
		throw new Error("Parent collection not found");
	};
	function _visit(path, item, visitor) {
		let ctrl = visitor(item, path);
		if (typeof ctrl === "symbol") return ctrl;
		for (const field of ["key", "value"]) {
			const token = item[field];
			if (token && "items" in token) {
				for (let i = 0; i < token.items.length; ++i) {
					const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
					if (typeof ci === "number") i = ci - 1;
					else if (ci === BREAK) return BREAK;
					else if (ci === REMOVE) {
						token.items.splice(i, 1);
						i -= 1;
					}
				}
				if (typeof ctrl === "function" && field === "key") ctrl = ctrl(item, path);
			}
		}
		return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
	}
	exports.visit = visit;
}));
var require_cst = /* @__PURE__ */ __commonJSMin(((exports) => {
	var cstScalar = require_cst_scalar();
	var cstStringify = require_cst_stringify();
	var cstVisit = require_cst_visit();
	const BOM = "﻿";
	const DOCUMENT = "";
	const FLOW_END = "";
	const SCALAR = "";
	const isCollection = (token) => !!token && "items" in token;
	const isScalar = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
	/* istanbul ignore next */
	function prettyToken(token) {
		switch (token) {
			case BOM: return "<BOM>";
			case DOCUMENT: return "<DOC>";
			case FLOW_END: return "<FLOW_END>";
			case SCALAR: return "<SCALAR>";
			default: return JSON.stringify(token);
		}
	}
	function tokenType(source) {
		switch (source) {
			case BOM: return "byte-order-mark";
			case DOCUMENT: return "doc-mode";
			case FLOW_END: return "flow-error-end";
			case SCALAR: return "scalar";
			case "---": return "doc-start";
			case "...": return "doc-end";
			case "":
			case "\n":
			case "\r\n": return "newline";
			case "-": return "seq-item-ind";
			case "?": return "explicit-key-ind";
			case ":": return "map-value-ind";
			case "{": return "flow-map-start";
			case "}": return "flow-map-end";
			case "[": return "flow-seq-start";
			case "]": return "flow-seq-end";
			case ",": return "comma";
		}
		switch (source[0]) {
			case " ":
			case "	": return "space";
			case "#": return "comment";
			case "%": return "directive-line";
			case "*": return "alias";
			case "&": return "anchor";
			case "!": return "tag";
			case "'": return "single-quoted-scalar";
			case "\"": return "double-quoted-scalar";
			case "|":
			case ">": return "block-scalar-header";
		}
		return null;
	}
	exports.createScalarToken = cstScalar.createScalarToken;
	exports.resolveAsScalar = cstScalar.resolveAsScalar;
	exports.setScalarValue = cstScalar.setScalarValue;
	exports.stringify = cstStringify.stringify;
	exports.visit = cstVisit.visit;
	exports.BOM = BOM;
	exports.DOCUMENT = DOCUMENT;
	exports.FLOW_END = FLOW_END;
	exports.SCALAR = SCALAR;
	exports.isCollection = isCollection;
	exports.isScalar = isScalar;
	exports.prettyToken = prettyToken;
	exports.tokenType = tokenType;
}));
var require_lexer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var cst = require_cst();
	function isEmpty(ch) {
		switch (ch) {
			case void 0:
			case " ":
			case "\n":
			case "\r":
			case "	": return true;
			default: return false;
		}
	}
	const hexDigits = /* @__PURE__ */ new Set("0123456789ABCDEFabcdef");
	const tagChars = /* @__PURE__ */ new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
	const flowIndicatorChars = /* @__PURE__ */ new Set(",[]{}");
	const invalidAnchorChars = /* @__PURE__ */ new Set(" ,[]{}\n\r	");
	const isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
	var Lexer = class {
		constructor() {
			this.atEnd = false;
			this.blockScalarIndent = -1;
			this.blockScalarKeep = false;
			this.buffer = "";
			this.flowKey = false;
			this.flowLevel = 0;
			this.indentNext = 0;
			this.indentValue = 0;
			this.lineEndPos = null;
			this.next = null;
			this.pos = 0;
		}
		*lex(source, incomplete = false) {
			if (source) {
				if (typeof source !== "string") throw TypeError("source is not a string");
				this.buffer = this.buffer ? this.buffer + source : source;
				this.lineEndPos = null;
			}
			this.atEnd = !incomplete;
			let next = this.next ?? "stream";
			while (next && (incomplete || this.hasChars(1))) next = yield* this.parseNext(next);
		}
		atLineEnd() {
			let i = this.pos;
			let ch = this.buffer[i];
			while (ch === " " || ch === "	") ch = this.buffer[++i];
			if (!ch || ch === "#" || ch === "\n") return true;
			if (ch === "\r") return this.buffer[i + 1] === "\n";
			return false;
		}
		charAt(n) {
			return this.buffer[this.pos + n];
		}
		continueScalar(offset) {
			let ch = this.buffer[offset];
			if (this.indentNext > 0) {
				let indent = 0;
				while (ch === " ") ch = this.buffer[++indent + offset];
				if (ch === "\r") {
					const next = this.buffer[indent + offset + 1];
					if (next === "\n" || !next && !this.atEnd) return offset + indent + 1;
				}
				return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
			}
			if (ch === "-" || ch === ".") {
				const dt = this.buffer.substr(offset, 3);
				if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3])) return -1;
			}
			return offset;
		}
		getLine() {
			let end = this.lineEndPos;
			if (typeof end !== "number" || end !== -1 && end < this.pos) {
				end = this.buffer.indexOf("\n", this.pos);
				this.lineEndPos = end;
			}
			if (end === -1) return this.atEnd ? this.buffer.substring(this.pos) : null;
			if (this.buffer[end - 1] === "\r") end -= 1;
			return this.buffer.substring(this.pos, end);
		}
		hasChars(n) {
			return this.pos + n <= this.buffer.length;
		}
		setNext(state) {
			this.buffer = this.buffer.substring(this.pos);
			this.pos = 0;
			this.lineEndPos = null;
			this.next = state;
			return null;
		}
		peek(n) {
			return this.buffer.substr(this.pos, n);
		}
		*parseNext(next) {
			switch (next) {
				case "stream": return yield* this.parseStream();
				case "line-start": return yield* this.parseLineStart();
				case "block-start": return yield* this.parseBlockStart();
				case "doc": return yield* this.parseDocument();
				case "flow": return yield* this.parseFlowCollection();
				case "quoted-scalar": return yield* this.parseQuotedScalar();
				case "block-scalar": return yield* this.parseBlockScalar();
				case "plain-scalar": return yield* this.parsePlainScalar();
			}
		}
		*parseStream() {
			let line = this.getLine();
			if (line === null) return this.setNext("stream");
			if (line[0] === cst.BOM) {
				yield* this.pushCount(1);
				line = line.substring(1);
			}
			if (line[0] === "%") {
				let dirEnd = line.length;
				let cs = line.indexOf("#");
				while (cs !== -1) {
					const ch = line[cs - 1];
					if (ch === " " || ch === "	") {
						dirEnd = cs - 1;
						break;
					} else cs = line.indexOf("#", cs + 1);
				}
				while (true) {
					const ch = line[dirEnd - 1];
					if (ch === " " || ch === "	") dirEnd -= 1;
					else break;
				}
				const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
				yield* this.pushCount(line.length - n);
				this.pushNewline();
				return "stream";
			}
			if (this.atLineEnd()) {
				const sp = yield* this.pushSpaces(true);
				yield* this.pushCount(line.length - sp);
				yield* this.pushNewline();
				return "stream";
			}
			yield cst.DOCUMENT;
			return yield* this.parseLineStart();
		}
		*parseLineStart() {
			const ch = this.charAt(0);
			if (!ch && !this.atEnd) return this.setNext("line-start");
			if (ch === "-" || ch === ".") {
				if (!this.atEnd && !this.hasChars(4)) return this.setNext("line-start");
				const s = this.peek(3);
				if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
					yield* this.pushCount(3);
					this.indentValue = 0;
					this.indentNext = 0;
					return s === "---" ? "doc" : "stream";
				}
			}
			this.indentValue = yield* this.pushSpaces(false);
			if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1))) this.indentNext = this.indentValue;
			return yield* this.parseBlockStart();
		}
		*parseBlockStart() {
			const [ch0, ch1] = this.peek(2);
			if (!ch1 && !this.atEnd) return this.setNext("block-start");
			if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
				const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
				this.indentNext = this.indentValue + 1;
				this.indentValue += n;
				return yield* this.parseBlockStart();
			}
			return "doc";
		}
		*parseDocument() {
			yield* this.pushSpaces(true);
			const line = this.getLine();
			if (line === null) return this.setNext("doc");
			let n = yield* this.pushIndicators();
			switch (line[n]) {
				case "#": yield* this.pushCount(line.length - n);
				case void 0:
					yield* this.pushNewline();
					return yield* this.parseLineStart();
				case "{":
				case "[":
					yield* this.pushCount(1);
					this.flowKey = false;
					this.flowLevel = 1;
					return "flow";
				case "}":
				case "]":
					yield* this.pushCount(1);
					return "doc";
				case "*":
					yield* this.pushUntil(isNotAnchorChar);
					return "doc";
				case "\"":
				case "'": return yield* this.parseQuotedScalar();
				case "|":
				case ">":
					n += yield* this.parseBlockScalarHeader();
					n += yield* this.pushSpaces(true);
					yield* this.pushCount(line.length - n);
					yield* this.pushNewline();
					return yield* this.parseBlockScalar();
				default: return yield* this.parsePlainScalar();
			}
		}
		*parseFlowCollection() {
			let nl, sp;
			let indent = -1;
			do {
				nl = yield* this.pushNewline();
				if (nl > 0) {
					sp = yield* this.pushSpaces(false);
					this.indentValue = indent = sp;
				} else sp = 0;
				sp += yield* this.pushSpaces(true);
			} while (nl + sp > 0);
			const line = this.getLine();
			if (line === null) return this.setNext("flow");
			if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
				if (!(indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}"))) {
					this.flowLevel = 0;
					yield cst.FLOW_END;
					return yield* this.parseLineStart();
				}
			}
			let n = 0;
			while (line[n] === ",") {
				n += yield* this.pushCount(1);
				n += yield* this.pushSpaces(true);
				this.flowKey = false;
			}
			n += yield* this.pushIndicators();
			switch (line[n]) {
				case void 0: return "flow";
				case "#":
					yield* this.pushCount(line.length - n);
					return "flow";
				case "{":
				case "[":
					yield* this.pushCount(1);
					this.flowKey = false;
					this.flowLevel += 1;
					return "flow";
				case "}":
				case "]":
					yield* this.pushCount(1);
					this.flowKey = true;
					this.flowLevel -= 1;
					return this.flowLevel ? "flow" : "doc";
				case "*":
					yield* this.pushUntil(isNotAnchorChar);
					return "flow";
				case "\"":
				case "'":
					this.flowKey = true;
					return yield* this.parseQuotedScalar();
				case ":": {
					const next = this.charAt(1);
					if (this.flowKey || isEmpty(next) || next === ",") {
						this.flowKey = false;
						yield* this.pushCount(1);
						yield* this.pushSpaces(true);
						return "flow";
					}
				}
				default:
					this.flowKey = false;
					return yield* this.parsePlainScalar();
			}
		}
		*parseQuotedScalar() {
			const quote = this.charAt(0);
			let end = this.buffer.indexOf(quote, this.pos + 1);
			if (quote === "'") while (end !== -1 && this.buffer[end + 1] === "'") end = this.buffer.indexOf("'", end + 2);
			else while (end !== -1) {
				let n = 0;
				while (this.buffer[end - 1 - n] === "\\") n += 1;
				if (n % 2 === 0) break;
				end = this.buffer.indexOf("\"", end + 1);
			}
			const qb = this.buffer.substring(0, end);
			let nl = qb.indexOf("\n", this.pos);
			if (nl !== -1) {
				while (nl !== -1) {
					const cs = this.continueScalar(nl + 1);
					if (cs === -1) break;
					nl = qb.indexOf("\n", cs);
				}
				if (nl !== -1) end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
			}
			if (end === -1) {
				if (!this.atEnd) return this.setNext("quoted-scalar");
				end = this.buffer.length;
			}
			yield* this.pushToIndex(end + 1, false);
			return this.flowLevel ? "flow" : "doc";
		}
		*parseBlockScalarHeader() {
			this.blockScalarIndent = -1;
			this.blockScalarKeep = false;
			let i = this.pos;
			while (true) {
				const ch = this.buffer[++i];
				if (ch === "+") this.blockScalarKeep = true;
				else if (ch > "0" && ch <= "9") this.blockScalarIndent = Number(ch) - 1;
				else if (ch !== "-") break;
			}
			return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
		}
		*parseBlockScalar() {
			let nl = this.pos - 1;
			let indent = 0;
			let ch;
			loop: for (let i = this.pos; ch = this.buffer[i]; ++i) switch (ch) {
				case " ":
					indent += 1;
					break;
				case "\n":
					nl = i;
					indent = 0;
					break;
				case "\r": {
					const next = this.buffer[i + 1];
					if (!next && !this.atEnd) return this.setNext("block-scalar");
					if (next === "\n") break;
				}
				default: break loop;
			}
			if (!ch && !this.atEnd) return this.setNext("block-scalar");
			if (indent >= this.indentNext) {
				if (this.blockScalarIndent === -1) this.indentNext = indent;
				else this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
				do {
					const cs = this.continueScalar(nl + 1);
					if (cs === -1) break;
					nl = this.buffer.indexOf("\n", cs);
				} while (nl !== -1);
				if (nl === -1) {
					if (!this.atEnd) return this.setNext("block-scalar");
					nl = this.buffer.length;
				}
			}
			let i = nl + 1;
			ch = this.buffer[i];
			while (ch === " ") ch = this.buffer[++i];
			if (ch === "	") {
				while (ch === "	" || ch === " " || ch === "\r" || ch === "\n") ch = this.buffer[++i];
				nl = i - 1;
			} else if (!this.blockScalarKeep) do {
				let i = nl - 1;
				let ch = this.buffer[i];
				if (ch === "\r") ch = this.buffer[--i];
				const lastChar = i;
				while (ch === " ") ch = this.buffer[--i];
				if (ch === "\n" && i >= this.pos && i + 1 + indent > lastChar) nl = i;
				else break;
			} while (true);
			yield cst.SCALAR;
			yield* this.pushToIndex(nl + 1, true);
			return yield* this.parseLineStart();
		}
		*parsePlainScalar() {
			const inFlow = this.flowLevel > 0;
			let end = this.pos - 1;
			let i = this.pos - 1;
			let ch;
			while (ch = this.buffer[++i]) if (ch === ":") {
				const next = this.buffer[i + 1];
				if (isEmpty(next) || inFlow && flowIndicatorChars.has(next)) break;
				end = i;
			} else if (isEmpty(ch)) {
				let next = this.buffer[i + 1];
				if (ch === "\r") if (next === "\n") {
					i += 1;
					ch = "\n";
					next = this.buffer[i + 1];
				} else end = i;
				if (next === "#" || inFlow && flowIndicatorChars.has(next)) break;
				if (ch === "\n") {
					const cs = this.continueScalar(i + 1);
					if (cs === -1) break;
					i = Math.max(i, cs - 2);
				}
			} else {
				if (inFlow && flowIndicatorChars.has(ch)) break;
				end = i;
			}
			if (!ch && !this.atEnd) return this.setNext("plain-scalar");
			yield cst.SCALAR;
			yield* this.pushToIndex(end + 1, true);
			return inFlow ? "flow" : "doc";
		}
		*pushCount(n) {
			if (n > 0) {
				yield this.buffer.substr(this.pos, n);
				this.pos += n;
				return n;
			}
			return 0;
		}
		*pushToIndex(i, allowEmpty) {
			const s = this.buffer.slice(this.pos, i);
			if (s) {
				yield s;
				this.pos += s.length;
				return s.length;
			} else if (allowEmpty) yield "";
			return 0;
		}
		*pushIndicators() {
			switch (this.charAt(0)) {
				case "!": return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
				case "&": return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
				case "-":
				case "?":
				case ":": {
					const inFlow = this.flowLevel > 0;
					const ch1 = this.charAt(1);
					if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
						if (!inFlow) this.indentNext = this.indentValue + 1;
						else if (this.flowKey) this.flowKey = false;
						return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
					}
				}
			}
			return 0;
		}
		*pushTag() {
			if (this.charAt(1) === "<") {
				let i = this.pos + 2;
				let ch = this.buffer[i];
				while (!isEmpty(ch) && ch !== ">") ch = this.buffer[++i];
				return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
			} else {
				let i = this.pos + 1;
				let ch = this.buffer[i];
				while (ch) if (tagChars.has(ch)) ch = this.buffer[++i];
				else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) ch = this.buffer[i += 3];
				else break;
				return yield* this.pushToIndex(i, false);
			}
		}
		*pushNewline() {
			const ch = this.buffer[this.pos];
			if (ch === "\n") return yield* this.pushCount(1);
			else if (ch === "\r" && this.charAt(1) === "\n") return yield* this.pushCount(2);
			else return 0;
		}
		*pushSpaces(allowTabs) {
			let i = this.pos - 1;
			let ch;
			do
				ch = this.buffer[++i];
			while (ch === " " || allowTabs && ch === "	");
			const n = i - this.pos;
			if (n > 0) {
				yield this.buffer.substr(this.pos, n);
				this.pos = i;
			}
			return n;
		}
		*pushUntil(test) {
			let i = this.pos;
			let ch = this.buffer[i];
			while (!test(ch)) ch = this.buffer[++i];
			return yield* this.pushToIndex(i, false);
		}
	};
	exports.Lexer = Lexer;
}));
var require_line_counter = /* @__PURE__ */ __commonJSMin(((exports) => {
	var LineCounter = class {
		constructor() {
			this.lineStarts = [];
			this.addNewLine = (offset) => this.lineStarts.push(offset);
			this.linePos = (offset) => {
				let low = 0;
				let high = this.lineStarts.length;
				while (low < high) {
					const mid = low + high >> 1;
					if (this.lineStarts[mid] < offset) low = mid + 1;
					else high = mid;
				}
				if (this.lineStarts[low] === offset) return {
					line: low + 1,
					col: 1
				};
				if (low === 0) return {
					line: 0,
					col: offset
				};
				const start = this.lineStarts[low - 1];
				return {
					line: low,
					col: offset - start + 1
				};
			};
		}
	};
	exports.LineCounter = LineCounter;
}));
var require_parser = /* @__PURE__ */ __commonJSMin(((exports) => {
	var node_process = __require("process");
	var cst = require_cst();
	var lexer = require_lexer();
	function includesToken(list, type) {
		for (let i = 0; i < list.length; ++i) if (list[i].type === type) return true;
		return false;
	}
	function findNonEmptyIndex(list) {
		for (let i = 0; i < list.length; ++i) switch (list[i].type) {
			case "space":
			case "comment":
			case "newline": break;
			default: return i;
		}
		return -1;
	}
	function isFlowToken(token) {
		switch (token?.type) {
			case "alias":
			case "scalar":
			case "single-quoted-scalar":
			case "double-quoted-scalar":
			case "flow-collection": return true;
			default: return false;
		}
	}
	function getPrevProps(parent) {
		switch (parent.type) {
			case "document": return parent.start;
			case "block-map": {
				const it = parent.items[parent.items.length - 1];
				return it.sep ?? it.start;
			}
			case "block-seq": return parent.items[parent.items.length - 1].start;
			default: return [];
		}
	}
	function getFirstKeyStartProps(prev) {
		if (prev.length === 0) return [];
		let i = prev.length;
		loop: while (--i >= 0) switch (prev[i].type) {
			case "doc-start":
			case "explicit-key-ind":
			case "map-value-ind":
			case "seq-item-ind":
			case "newline": break loop;
		}
		while (prev[++i]?.type === "space");
		return prev.splice(i, prev.length);
	}
	function fixFlowSeqItems(fc) {
		if (fc.start.type === "flow-seq-start") {
			for (const it of fc.items) if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
				if (it.key) it.value = it.key;
				delete it.key;
				if (isFlowToken(it.value)) if (it.value.end) Array.prototype.push.apply(it.value.end, it.sep);
				else it.value.end = it.sep;
				else Array.prototype.push.apply(it.start, it.sep);
				delete it.sep;
			}
		}
	}
	var Parser = class {
		constructor(onNewLine) {
			this.atNewLine = true;
			this.atScalar = false;
			this.indent = 0;
			this.offset = 0;
			this.onKeyLine = false;
			this.stack = [];
			this.source = "";
			this.type = "";
			this.lexer = new lexer.Lexer();
			this.onNewLine = onNewLine;
		}
		*parse(source, incomplete = false) {
			if (this.onNewLine && this.offset === 0) this.onNewLine(0);
			for (const lexeme of this.lexer.lex(source, incomplete)) yield* this.next(lexeme);
			if (!incomplete) yield* this.end();
		}
		*next(source) {
			this.source = source;
			if (node_process.env.LOG_TOKENS) console.log("|", cst.prettyToken(source));
			if (this.atScalar) {
				this.atScalar = false;
				yield* this.step();
				this.offset += source.length;
				return;
			}
			const type = cst.tokenType(source);
			if (!type) {
				const message = `Not a YAML token: ${source}`;
				yield* this.pop({
					type: "error",
					offset: this.offset,
					message,
					source
				});
				this.offset += source.length;
			} else if (type === "scalar") {
				this.atNewLine = false;
				this.atScalar = true;
				this.type = "scalar";
			} else {
				this.type = type;
				yield* this.step();
				switch (type) {
					case "newline":
						this.atNewLine = true;
						this.indent = 0;
						if (this.onNewLine) this.onNewLine(this.offset + source.length);
						break;
					case "space":
						if (this.atNewLine && source[0] === " ") this.indent += source.length;
						break;
					case "explicit-key-ind":
					case "map-value-ind":
					case "seq-item-ind":
						if (this.atNewLine) this.indent += source.length;
						break;
					case "doc-mode":
					case "flow-error-end": return;
					default: this.atNewLine = false;
				}
				this.offset += source.length;
			}
		}
		*end() {
			while (this.stack.length > 0) yield* this.pop();
		}
		get sourceToken() {
			return {
				type: this.type,
				offset: this.offset,
				indent: this.indent,
				source: this.source
			};
		}
		*step() {
			const top = this.peek(1);
			if (this.type === "doc-end" && top?.type !== "doc-end") {
				while (this.stack.length > 0) yield* this.pop();
				this.stack.push({
					type: "doc-end",
					offset: this.offset,
					source: this.source
				});
				return;
			}
			if (!top) return yield* this.stream();
			switch (top.type) {
				case "document": return yield* this.document(top);
				case "alias":
				case "scalar":
				case "single-quoted-scalar":
				case "double-quoted-scalar": return yield* this.scalar(top);
				case "block-scalar": return yield* this.blockScalar(top);
				case "block-map": return yield* this.blockMap(top);
				case "block-seq": return yield* this.blockSequence(top);
				case "flow-collection": return yield* this.flowCollection(top);
				case "doc-end": return yield* this.documentEnd(top);
			}
			/* istanbul ignore next should not happen */
			yield* this.pop();
		}
		peek(n) {
			return this.stack[this.stack.length - n];
		}
		*pop(error) {
			const token = error ?? this.stack.pop();
			/* istanbul ignore if should not happen */
			if (!token) yield {
				type: "error",
				offset: this.offset,
				source: "",
				message: "Tried to pop an empty stack"
			};
			else if (this.stack.length === 0) yield token;
			else {
				const top = this.peek(1);
				if (token.type === "block-scalar") token.indent = "indent" in top ? top.indent : 0;
				else if (token.type === "flow-collection" && top.type === "document") token.indent = 0;
				if (token.type === "flow-collection") fixFlowSeqItems(token);
				switch (top.type) {
					case "document":
						top.value = token;
						break;
					case "block-scalar":
						top.props.push(token);
						break;
					case "block-map": {
						const it = top.items[top.items.length - 1];
						if (it.value) {
							top.items.push({
								start: [],
								key: token,
								sep: []
							});
							this.onKeyLine = true;
							return;
						} else if (it.sep) it.value = token;
						else {
							Object.assign(it, {
								key: token,
								sep: []
							});
							this.onKeyLine = !it.explicitKey;
							return;
						}
						break;
					}
					case "block-seq": {
						const it = top.items[top.items.length - 1];
						if (it.value) top.items.push({
							start: [],
							value: token
						});
						else it.value = token;
						break;
					}
					case "flow-collection": {
						const it = top.items[top.items.length - 1];
						if (!it || it.value) top.items.push({
							start: [],
							key: token,
							sep: []
						});
						else if (it.sep) it.value = token;
						else Object.assign(it, {
							key: token,
							sep: []
						});
						return;
					}
					default:
						yield* this.pop();
						yield* this.pop(token);
				}
				if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
					const last = token.items[token.items.length - 1];
					if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
						if (top.type === "document") top.end = last.start;
						else top.items.push({ start: last.start });
						token.items.splice(-1, 1);
					}
				}
			}
		}
		*stream() {
			switch (this.type) {
				case "directive-line":
					yield {
						type: "directive",
						offset: this.offset,
						source: this.source
					};
					return;
				case "byte-order-mark":
				case "space":
				case "comment":
				case "newline":
					yield this.sourceToken;
					return;
				case "doc-mode":
				case "doc-start": {
					const doc = {
						type: "document",
						offset: this.offset,
						start: []
					};
					if (this.type === "doc-start") doc.start.push(this.sourceToken);
					this.stack.push(doc);
					return;
				}
			}
			yield {
				type: "error",
				offset: this.offset,
				message: `Unexpected ${this.type} token in YAML stream`,
				source: this.source
			};
		}
		*document(doc) {
			if (doc.value) return yield* this.lineEnd(doc);
			switch (this.type) {
				case "doc-start":
					if (findNonEmptyIndex(doc.start) !== -1) {
						yield* this.pop();
						yield* this.step();
					} else doc.start.push(this.sourceToken);
					return;
				case "anchor":
				case "tag":
				case "space":
				case "comment":
				case "newline":
					doc.start.push(this.sourceToken);
					return;
			}
			const bv = this.startBlockValue(doc);
			if (bv) this.stack.push(bv);
			else yield {
				type: "error",
				offset: this.offset,
				message: `Unexpected ${this.type} token in YAML document`,
				source: this.source
			};
		}
		*scalar(scalar) {
			if (this.type === "map-value-ind") {
				const start = getFirstKeyStartProps(getPrevProps(this.peek(2)));
				let sep;
				if (scalar.end) {
					sep = scalar.end;
					sep.push(this.sourceToken);
					delete scalar.end;
				} else sep = [this.sourceToken];
				const map = {
					type: "block-map",
					offset: scalar.offset,
					indent: scalar.indent,
					items: [{
						start,
						key: scalar,
						sep
					}]
				};
				this.onKeyLine = true;
				this.stack[this.stack.length - 1] = map;
			} else yield* this.lineEnd(scalar);
		}
		*blockScalar(scalar) {
			switch (this.type) {
				case "space":
				case "comment":
				case "newline":
					scalar.props.push(this.sourceToken);
					return;
				case "scalar":
					scalar.source = this.source;
					this.atNewLine = true;
					this.indent = 0;
					if (this.onNewLine) {
						let nl = this.source.indexOf("\n") + 1;
						while (nl !== 0) {
							this.onNewLine(this.offset + nl);
							nl = this.source.indexOf("\n", nl) + 1;
						}
					}
					yield* this.pop();
					break;
				default:
					yield* this.pop();
					yield* this.step();
			}
		}
		*blockMap(map) {
			const it = map.items[map.items.length - 1];
			switch (this.type) {
				case "newline":
					this.onKeyLine = false;
					if (it.value) {
						const end = "end" in it.value ? it.value.end : void 0;
						if ((Array.isArray(end) ? end[end.length - 1] : void 0)?.type === "comment") end?.push(this.sourceToken);
						else map.items.push({ start: [this.sourceToken] });
					} else if (it.sep) it.sep.push(this.sourceToken);
					else it.start.push(this.sourceToken);
					return;
				case "space":
				case "comment":
					if (it.value) map.items.push({ start: [this.sourceToken] });
					else if (it.sep) it.sep.push(this.sourceToken);
					else {
						if (this.atIndentedComment(it.start, map.indent)) {
							const end = map.items[map.items.length - 2]?.value?.end;
							if (Array.isArray(end)) {
								Array.prototype.push.apply(end, it.start);
								end.push(this.sourceToken);
								map.items.pop();
								return;
							}
						}
						it.start.push(this.sourceToken);
					}
					return;
			}
			if (this.indent >= map.indent) {
				const atMapIndent = !this.onKeyLine && this.indent === map.indent;
				const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
				let start = [];
				if (atNextItem && it.sep && !it.value) {
					const nl = [];
					for (let i = 0; i < it.sep.length; ++i) {
						const st = it.sep[i];
						switch (st.type) {
							case "newline":
								nl.push(i);
								break;
							case "space": break;
							case "comment":
								if (st.indent > map.indent) nl.length = 0;
								break;
							default: nl.length = 0;
						}
					}
					if (nl.length >= 2) start = it.sep.splice(nl[1]);
				}
				switch (this.type) {
					case "anchor":
					case "tag":
						if (atNextItem || it.value) {
							start.push(this.sourceToken);
							map.items.push({ start });
							this.onKeyLine = true;
						} else if (it.sep) it.sep.push(this.sourceToken);
						else it.start.push(this.sourceToken);
						return;
					case "explicit-key-ind":
						if (!it.sep && !it.explicitKey) {
							it.start.push(this.sourceToken);
							it.explicitKey = true;
						} else if (atNextItem || it.value) {
							start.push(this.sourceToken);
							map.items.push({
								start,
								explicitKey: true
							});
						} else this.stack.push({
							type: "block-map",
							offset: this.offset,
							indent: this.indent,
							items: [{
								start: [this.sourceToken],
								explicitKey: true
							}]
						});
						this.onKeyLine = true;
						return;
					case "map-value-ind":
						if (it.explicitKey) if (!it.sep) if (includesToken(it.start, "newline")) Object.assign(it, {
							key: null,
							sep: [this.sourceToken]
						});
						else {
							const start = getFirstKeyStartProps(it.start);
							this.stack.push({
								type: "block-map",
								offset: this.offset,
								indent: this.indent,
								items: [{
									start,
									key: null,
									sep: [this.sourceToken]
								}]
							});
						}
						else if (it.value) map.items.push({
							start: [],
							key: null,
							sep: [this.sourceToken]
						});
						else if (includesToken(it.sep, "map-value-ind")) this.stack.push({
							type: "block-map",
							offset: this.offset,
							indent: this.indent,
							items: [{
								start,
								key: null,
								sep: [this.sourceToken]
							}]
						});
						else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
							const start = getFirstKeyStartProps(it.start);
							const key = it.key;
							const sep = it.sep;
							sep.push(this.sourceToken);
							delete it.key;
							delete it.sep;
							this.stack.push({
								type: "block-map",
								offset: this.offset,
								indent: this.indent,
								items: [{
									start,
									key,
									sep
								}]
							});
						} else if (start.length > 0) it.sep = it.sep.concat(start, this.sourceToken);
						else it.sep.push(this.sourceToken);
						else if (!it.sep) Object.assign(it, {
							key: null,
							sep: [this.sourceToken]
						});
						else if (it.value || atNextItem) map.items.push({
							start,
							key: null,
							sep: [this.sourceToken]
						});
						else if (includesToken(it.sep, "map-value-ind")) this.stack.push({
							type: "block-map",
							offset: this.offset,
							indent: this.indent,
							items: [{
								start: [],
								key: null,
								sep: [this.sourceToken]
							}]
						});
						else it.sep.push(this.sourceToken);
						this.onKeyLine = true;
						return;
					case "alias":
					case "scalar":
					case "single-quoted-scalar":
					case "double-quoted-scalar": {
						const fs = this.flowScalar(this.type);
						if (atNextItem || it.value) {
							map.items.push({
								start,
								key: fs,
								sep: []
							});
							this.onKeyLine = true;
						} else if (it.sep) this.stack.push(fs);
						else {
							Object.assign(it, {
								key: fs,
								sep: []
							});
							this.onKeyLine = true;
						}
						return;
					}
					default: {
						const bv = this.startBlockValue(map);
						if (bv) {
							if (bv.type === "block-seq") {
								if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
									yield* this.pop({
										type: "error",
										offset: this.offset,
										message: "Unexpected block-seq-ind on same line with key",
										source: this.source
									});
									return;
								}
							} else if (atMapIndent) map.items.push({ start });
							this.stack.push(bv);
							return;
						}
					}
				}
			}
			yield* this.pop();
			yield* this.step();
		}
		*blockSequence(seq) {
			const it = seq.items[seq.items.length - 1];
			switch (this.type) {
				case "newline":
					if (it.value) {
						const end = "end" in it.value ? it.value.end : void 0;
						if ((Array.isArray(end) ? end[end.length - 1] : void 0)?.type === "comment") end?.push(this.sourceToken);
						else seq.items.push({ start: [this.sourceToken] });
					} else it.start.push(this.sourceToken);
					return;
				case "space":
				case "comment":
					if (it.value) seq.items.push({ start: [this.sourceToken] });
					else {
						if (this.atIndentedComment(it.start, seq.indent)) {
							const end = seq.items[seq.items.length - 2]?.value?.end;
							if (Array.isArray(end)) {
								Array.prototype.push.apply(end, it.start);
								end.push(this.sourceToken);
								seq.items.pop();
								return;
							}
						}
						it.start.push(this.sourceToken);
					}
					return;
				case "anchor":
				case "tag":
					if (it.value || this.indent <= seq.indent) break;
					it.start.push(this.sourceToken);
					return;
				case "seq-item-ind":
					if (this.indent !== seq.indent) break;
					if (it.value || includesToken(it.start, "seq-item-ind")) seq.items.push({ start: [this.sourceToken] });
					else it.start.push(this.sourceToken);
					return;
			}
			if (this.indent > seq.indent) {
				const bv = this.startBlockValue(seq);
				if (bv) {
					this.stack.push(bv);
					return;
				}
			}
			yield* this.pop();
			yield* this.step();
		}
		*flowCollection(fc) {
			const it = fc.items[fc.items.length - 1];
			if (this.type === "flow-error-end") {
				let top;
				do {
					yield* this.pop();
					top = this.peek(1);
				} while (top?.type === "flow-collection");
			} else if (fc.end.length === 0) {
				switch (this.type) {
					case "comma":
					case "explicit-key-ind":
						if (!it || it.sep) fc.items.push({ start: [this.sourceToken] });
						else it.start.push(this.sourceToken);
						return;
					case "map-value-ind":
						if (!it || it.value) fc.items.push({
							start: [],
							key: null,
							sep: [this.sourceToken]
						});
						else if (it.sep) it.sep.push(this.sourceToken);
						else Object.assign(it, {
							key: null,
							sep: [this.sourceToken]
						});
						return;
					case "space":
					case "comment":
					case "newline":
					case "anchor":
					case "tag":
						if (!it || it.value) fc.items.push({ start: [this.sourceToken] });
						else if (it.sep) it.sep.push(this.sourceToken);
						else it.start.push(this.sourceToken);
						return;
					case "alias":
					case "scalar":
					case "single-quoted-scalar":
					case "double-quoted-scalar": {
						const fs = this.flowScalar(this.type);
						if (!it || it.value) fc.items.push({
							start: [],
							key: fs,
							sep: []
						});
						else if (it.sep) this.stack.push(fs);
						else Object.assign(it, {
							key: fs,
							sep: []
						});
						return;
					}
					case "flow-map-end":
					case "flow-seq-end":
						fc.end.push(this.sourceToken);
						return;
				}
				const bv = this.startBlockValue(fc);
				/* istanbul ignore else should not happen */
				if (bv) this.stack.push(bv);
				else {
					yield* this.pop();
					yield* this.step();
				}
			} else {
				const parent = this.peek(2);
				if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
					yield* this.pop();
					yield* this.step();
				} else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
					const start = getFirstKeyStartProps(getPrevProps(parent));
					fixFlowSeqItems(fc);
					const sep = fc.end.splice(1, fc.end.length);
					sep.push(this.sourceToken);
					const map = {
						type: "block-map",
						offset: fc.offset,
						indent: fc.indent,
						items: [{
							start,
							key: fc,
							sep
						}]
					};
					this.onKeyLine = true;
					this.stack[this.stack.length - 1] = map;
				} else yield* this.lineEnd(fc);
			}
		}
		flowScalar(type) {
			if (this.onNewLine) {
				let nl = this.source.indexOf("\n") + 1;
				while (nl !== 0) {
					this.onNewLine(this.offset + nl);
					nl = this.source.indexOf("\n", nl) + 1;
				}
			}
			return {
				type,
				offset: this.offset,
				indent: this.indent,
				source: this.source
			};
		}
		startBlockValue(parent) {
			switch (this.type) {
				case "alias":
				case "scalar":
				case "single-quoted-scalar":
				case "double-quoted-scalar": return this.flowScalar(this.type);
				case "block-scalar-header": return {
					type: "block-scalar",
					offset: this.offset,
					indent: this.indent,
					props: [this.sourceToken],
					source: ""
				};
				case "flow-map-start":
				case "flow-seq-start": return {
					type: "flow-collection",
					offset: this.offset,
					indent: this.indent,
					start: this.sourceToken,
					items: [],
					end: []
				};
				case "seq-item-ind": return {
					type: "block-seq",
					offset: this.offset,
					indent: this.indent,
					items: [{ start: [this.sourceToken] }]
				};
				case "explicit-key-ind": {
					this.onKeyLine = true;
					const start = getFirstKeyStartProps(getPrevProps(parent));
					start.push(this.sourceToken);
					return {
						type: "block-map",
						offset: this.offset,
						indent: this.indent,
						items: [{
							start,
							explicitKey: true
						}]
					};
				}
				case "map-value-ind": {
					this.onKeyLine = true;
					const start = getFirstKeyStartProps(getPrevProps(parent));
					return {
						type: "block-map",
						offset: this.offset,
						indent: this.indent,
						items: [{
							start,
							key: null,
							sep: [this.sourceToken]
						}]
					};
				}
			}
			return null;
		}
		atIndentedComment(start, indent) {
			if (this.type !== "comment") return false;
			if (this.indent <= indent) return false;
			return start.every((st) => st.type === "newline" || st.type === "space");
		}
		*documentEnd(docEnd) {
			if (this.type !== "doc-mode") {
				if (docEnd.end) docEnd.end.push(this.sourceToken);
				else docEnd.end = [this.sourceToken];
				if (this.type === "newline") yield* this.pop();
			}
		}
		*lineEnd(token) {
			switch (this.type) {
				case "comma":
				case "doc-start":
				case "doc-end":
				case "flow-seq-end":
				case "flow-map-end":
				case "map-value-ind":
					yield* this.pop();
					yield* this.step();
					break;
				case "newline": this.onKeyLine = false;
				default:
					if (token.end) token.end.push(this.sourceToken);
					else token.end = [this.sourceToken];
					if (this.type === "newline") yield* this.pop();
			}
		}
	};
	exports.Parser = Parser;
}));
var require_public_api = /* @__PURE__ */ __commonJSMin(((exports) => {
	var composer = require_composer();
	var Document = require_Document();
	var errors = require_errors();
	var log = require_log();
	var identity = require_identity();
	var lineCounter = require_line_counter();
	var parser = require_parser();
	function parseOptions(options) {
		const prettyErrors = options.prettyErrors !== false;
		return {
			lineCounter: options.lineCounter || prettyErrors && new lineCounter.LineCounter() || null,
			prettyErrors
		};
	}
	function parseAllDocuments(source, options = {}) {
		const { lineCounter, prettyErrors } = parseOptions(options);
		const parser$1 = new parser.Parser(lineCounter?.addNewLine);
		const composer$1 = new composer.Composer(options);
		const docs = Array.from(composer$1.compose(parser$1.parse(source)));
		if (prettyErrors && lineCounter) for (const doc of docs) {
			doc.errors.forEach(errors.prettifyError(source, lineCounter));
			doc.warnings.forEach(errors.prettifyError(source, lineCounter));
		}
		if (docs.length > 0) return docs;
		return Object.assign([], { empty: true }, composer$1.streamInfo());
	}
	function parseDocument(source, options = {}) {
		const { lineCounter, prettyErrors } = parseOptions(options);
		const parser$1 = new parser.Parser(lineCounter?.addNewLine);
		const composer$1 = new composer.Composer(options);
		let doc = null;
		for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) if (!doc) doc = _doc;
		else if (doc.options.logLevel !== "silent") {
			doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
			break;
		}
		if (prettyErrors && lineCounter) {
			doc.errors.forEach(errors.prettifyError(source, lineCounter));
			doc.warnings.forEach(errors.prettifyError(source, lineCounter));
		}
		return doc;
	}
	function parse(src, reviver, options) {
		let _reviver = void 0;
		if (typeof reviver === "function") _reviver = reviver;
		else if (options === void 0 && reviver && typeof reviver === "object") options = reviver;
		const doc = parseDocument(src, options);
		if (!doc) return null;
		doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
		if (doc.errors.length > 0) if (doc.options.logLevel !== "silent") throw doc.errors[0];
		else doc.errors = [];
		return doc.toJS(Object.assign({ reviver: _reviver }, options));
	}
	function stringify(value, replacer, options) {
		let _replacer = null;
		if (typeof replacer === "function" || Array.isArray(replacer)) _replacer = replacer;
		else if (options === void 0 && replacer) options = replacer;
		if (typeof options === "string") options = options.length;
		if (typeof options === "number") {
			const indent = Math.round(options);
			options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
		}
		if (value === void 0) {
			const { keepUndefined } = options ?? replacer ?? {};
			if (!keepUndefined) return void 0;
		}
		if (identity.isDocument(value) && !_replacer) return value.toString(options);
		return new Document.Document(value, _replacer, options).toString(options);
	}
	exports.parse = parse;
	exports.parseAllDocuments = parseAllDocuments;
	exports.parseDocument = parseDocument;
	exports.stringify = stringify;
}));
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	var composer = require_composer();
	var Document = require_Document();
	var Schema = require_Schema();
	var errors = require_errors();
	var Alias = require_Alias();
	var identity = require_identity();
	var Pair = require_Pair();
	var Scalar = require_Scalar();
	var YAMLMap = require_YAMLMap();
	var YAMLSeq = require_YAMLSeq();
	require_cst();
	var lexer = require_lexer();
	var lineCounter = require_line_counter();
	var parser = require_parser();
	var publicApi = require_public_api();
	var visit = require_visit();
	exports.Composer = composer.Composer;
	exports.Document = Document.Document;
	exports.Schema = Schema.Schema;
	exports.YAMLError = errors.YAMLError;
	exports.YAMLParseError = errors.YAMLParseError;
	exports.YAMLWarning = errors.YAMLWarning;
	exports.Alias = Alias.Alias;
	exports.isAlias = identity.isAlias;
	exports.isCollection = identity.isCollection;
	exports.isDocument = identity.isDocument;
	exports.isMap = identity.isMap;
	exports.isNode = identity.isNode;
	exports.isPair = identity.isPair;
	exports.isScalar = identity.isScalar;
	exports.isSeq = identity.isSeq;
	exports.Pair = Pair.Pair;
	exports.Scalar = Scalar.Scalar;
	exports.YAMLMap = YAMLMap.YAMLMap;
	exports.YAMLSeq = YAMLSeq.YAMLSeq;
	exports.Lexer = lexer.Lexer;
	exports.LineCounter = lineCounter.LineCounter;
	exports.Parser = parser.Parser;
	exports.parse = publicApi.parse;
	exports.parseAllDocuments = publicApi.parseAllDocuments;
	exports.parseDocument = publicApi.parseDocument;
	exports.stringify = publicApi.stringify;
	exports.visit = visit.visit;
	exports.visitAsync = visit.visitAsync;
}));
const homeDirectory = os.homedir();
const { env } = process;
const xdgData = env.XDG_DATA_HOME || (homeDirectory ? path.join(homeDirectory, ".local", "share") : void 0);
const xdgConfig = env.XDG_CONFIG_HOME || (homeDirectory ? path.join(homeDirectory, ".config") : void 0);
env.XDG_STATE_HOME || homeDirectory && path.join(homeDirectory, ".local", "state");
env.XDG_CACHE_HOME || homeDirectory && path.join(homeDirectory, ".cache");
env.XDG_RUNTIME_DIR;
const xdgDataDirectories = (env.XDG_DATA_DIRS || "/usr/local/share/:/usr/share/").split(":");
if (xdgData) xdgDataDirectories.unshift(xdgData);
const xdgConfigDirectories = (env.XDG_CONFIG_DIRS || "/etc/xdg").split(":");
if (xdgConfig) xdgConfigDirectories.unshift(xdgConfig);
export { M as a, Y as c, he as d, ve as f, require_picocolors as g, pD as h, Ie as i, be as l, ye as m, require_dist as n, Me as o, xe as p, esm_default as r, Se as s, xdgConfig as t, fe as u };
