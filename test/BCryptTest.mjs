import {Assert} from "//es.parts/ess/0.0.1/";

import * as BCrypt from "../src/BCrypt.mjs";

export {testGenerateSaltSync};
export {testGenerateSalt};
export {testHashSync};
export {testCompareSync};


function testGenerateSaltSync() {
    const salt = BCrypt.generateSaltSync(10);
    Assert.ok(salt);
    Assert.ok(typeof salt == "string");
    Assert.ok(salt.length > 0);
}

async function testGenerateSalt() {
    const salt = await BCrypt.generateSalt(10);
    Assert.ok(salt);
    Assert.ok(typeof salt == 'string');
    Assert.ok(salt.length > 0);
}

async function testHashSync() {
    BCrypt.hashSync("hello", 10);
    Assert.doesNotThrow(() => {
        BCrypt.hashSync("hello", 10);
    });
    Assert.notEqual(BCrypt.hashSync("hello", 10), BCrypt.hashSync("hello", 10));
}

async function testCompareSync() {
    const salt1 = BCrypt.generateSaltSync();
    const hash1 = BCrypt.hashSync("hello", salt1); // $2a$
    const salt2 = BCrypt.generateSaltSync().replace(/\$2a\$/, "$2y$");
    const hash2 = BCrypt.hashSync("world", salt2);
    const salt3 = BCrypt.generateSaltSync().replace(/\$2a\$/, "$2b$");
    const hash3 = BCrypt.hashSync("hello world", salt3);

    Assert.strictEqual(hash1.substring(0,4), "$2a$");
    Assert.ok(BCrypt.compareSync("hello", hash1));
    Assert.ok(!BCrypt.compareSync("hello", hash2));
    Assert.ok(!BCrypt.compareSync("hello", hash3));

    Assert.strictEqual(hash2.substring(0,4), "$2y$");
    Assert.ok(BCrypt.compareSync("world", hash2));
    Assert.ok(!BCrypt.compareSync("world", hash1));
    Assert.ok(!BCrypt.compareSync("world", hash3));

    Assert.strictEqual(hash3.substring(0,4), "$2b$");
    Assert.ok(BCrypt.compareSync("hello world", hash3));
    Assert.ok(!BCrypt.compareSync("hello world", hash1));
    Assert.ok(!BCrypt.compareSync("hello world", hash2));
}
