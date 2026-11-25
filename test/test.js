const request = require('supertest');
const app = require('../src/index.js');
const assert = require('assert');

async function runTests() {
    console.log("Running API Tests...");

    try {
        // Test 1: Successful API call
        const res1 = await request(app).get('/api/greet?name=DevOps');
        assert.strictEqual(res1.status, 200);
        assert.strictEqual(res1.body.message, 'Hello, DevOps! Welcome to the DevOps API.');
        console.log("✅ Test 1 Passed: Successful API call");

        // Test 2: Default guest behavior
        const res2 = await request(app).get('/api/greet');
        assert.strictEqual(res2.status, 200);
        assert.strictEqual(res2.body.message, 'Hello, Guest! Welcome to the DevOps API.');
        console.log("✅ Test 2 Passed: Default Guest behavior");

        // Test 3: Simulated Server Error (Pipeline Failure Test)
        const res3 = await request(app).get('/api/greet?name=error');
        assert.strictEqual(res3.status, 500);
        console.log("✅ Test 3 Passed: Handled server error correctly");

    } catch (error) {
        console.error("❌ Test Failed:", error.message);
        process.exit(1); // Fails the CI pipeline
    }
}

runTests();