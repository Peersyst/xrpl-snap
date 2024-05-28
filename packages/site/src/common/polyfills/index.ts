import "./BigNumber";
import "./Math";
import "./String";

const TextEncodingPolyfill = require("text-encoding");
global.TextEncoder = TextEncodingPolyfill.TextEncoder;
global.TextDecoder = TextEncodingPolyfill.TextDecoder;
