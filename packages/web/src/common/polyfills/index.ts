import "./BigNumber";
import "./Math";
import "./String";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TextEncodingPolyfill = require("text-encoding");
global.TextEncoder = TextEncodingPolyfill.TextEncoder;
global.TextDecoder = TextEncodingPolyfill.TextDecoder;
