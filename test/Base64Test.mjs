import {Assert} from "//es.parts/ess/0.0.1/";

import * as Base64 from "../src/Base64.mjs";

export {testEncode};
export {testDecode};

function testEncode() {
    const result = Base64.encode([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10], 16);
    Assert.equal(result, "..CA.uOD/eaGAOmJB.yMBu");
}

function testDecode() {
    const result = Base64.decode("..CA.uOD/eaGAOmJB.yMBv.", 16);
    Assert.deepEqual(result, [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10]);
}