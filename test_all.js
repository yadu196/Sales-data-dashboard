/**
 * Comprehensive Test Suite for International SIM Sales Dashboard
 * Run with: node test_all.js (or npm test)
 */

const fs = require("fs");
const path = require("path");
const assert = require("assert");

console.log("\n=========================================");
console.log("🧪 STARTING DASHBOARD TEST SUITE");
console.log("=========================================\n");

let passedTests = 0;
let totalTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } catch (error) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${error.message}\n`);
  }
}

// ---------------------------------------------------------
// 1. File Structure & Integrity Tests
// ---------------------------------------------------------
console.log("📁 1. Checking Project File Integrity...");

const requiredFiles = [
  "public/index.html",
  "public/style.css",
  "public/script.js",
  "api/sales.js",
  "server.js",
  "package.json",
  "package-lock.json",
  "vercel.json",
  ".gitignore",
  "README.md"
];

requiredFiles.forEach((file) => {
  runTest(`Required file exists: ${file}`, () => {
    const fullPath = path.join(__dirname, file);
    assert.strictEqual(fs.existsSync(fullPath), true, `File ${file} does not exist`);
  });
});

// ---------------------------------------------------------
// 2. Vercel Configuration Tests
// ---------------------------------------------------------
console.log("\n⚡ 2. Verifying Vercel Configuration...");

runTest("vercel.json is valid JSON and has no invalid 'public' key", () => {
  const vercelJsonPath = path.join(__dirname, "vercel.json");
  const content = JSON.parse(fs.readFileSync(vercelJsonPath, "utf8"));
  assert.strictEqual(content.public, undefined, "'public' property should NOT exist in vercel.json");
  assert.ok(Array.isArray(content.rewrites), "vercel.json should have a rewrites array");
});

// ---------------------------------------------------------
// 3. API Handler Unit Tests
// ---------------------------------------------------------
console.log("\n📡 3. Testing API Handler (api/sales.js)...");

const salesHandler = require("./api/sales");

function mockApiCall(query = {}, method = "GET") {
  let statusCode = 200;
  let responseData = null;
  const headers = {};

  const req = {
    method,
    query
  };

  const res = {
    setHeader: (k, v) => {
      headers[k] = v;
    },
    status: (code) => {
      statusCode = code;
      return res;
    },
    json: (data) => {
      responseData = data;
      return res;
    },
    end: () => res
  };

  salesHandler(req, res);
  return { statusCode, responseData, headers };
}

runTest("GET /api/sales?report_date=2026-06-30 returns correct Saudi Arabia metrics", () => {
  const res = mockApiCall({ report_date: "2026-06-30" });
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.responseData.top_country, "Saudi Arabia");
  assert.strictEqual(res.responseData.total_units_sold, 1400);
  assert.strictEqual(res.responseData.total_revenue, 910000);
  assert.strictEqual(res.responseData.activation_success_rate, 93.1);
});

runTest("GET /api/sales?report_date=2026-06-27 returns Thailand metrics", () => {
  const res = mockApiCall({ report_date: "2026-06-27" });
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.responseData.top_country, "Thailand");
  assert.strictEqual(res.responseData.total_units_sold, 950);
});

runTest("GET /api/sales?report_date=2026-06-28 returns Singapore metrics", () => {
  const res = mockApiCall({ report_date: "2026-06-28" });
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.responseData.top_country, "Singapore");
  assert.strictEqual(res.responseData.total_units_sold, 1120);
});

runTest("GET /api/sales?report_date=2026-06-29 returns UAE metrics", () => {
  const res = mockApiCall({ report_date: "2026-06-29" });
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.responseData.top_country, "UAE");
  assert.strictEqual(res.responseData.total_units_sold, 1280);
});

runTest("GET /api/sales without report_date returns 400 Bad Request", () => {
  const res = mockApiCall({});
  assert.strictEqual(res.statusCode, 400);
  assert.ok(res.responseData.error.includes("report_date"));
});

runTest("GET /api/sales with invalid date format returns 400 Bad Request", () => {
  const res = mockApiCall({ report_date: "2026/06/30" });
  assert.strictEqual(res.statusCode, 400);
  assert.ok(res.responseData.error.includes("Invalid date format"));
});

runTest("GET /api/sales with non-existent report_date returns 404 Not Found", () => {
  const res = mockApiCall({ report_date: "2026-12-31" });
  assert.strictEqual(res.statusCode, 404);
  assert.ok(res.responseData.error.includes("No sales data found"));
});

runTest("OPTIONS preflight request returns 200 with CORS headers", () => {
  const res = mockApiCall({}, "OPTIONS");
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.headers["Access-Control-Allow-Origin"], "*");
});

// ---------------------------------------------------------
// 4. Summary
// ---------------------------------------------------------
console.log("\n=========================================");
console.log(`📊 TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
console.log("=========================================\n");

if (passedTests === totalTests) {
  console.log("🎉 ALL TESTS PASSED! Ready for deployment.");
  process.exit(0);
} else {
  console.error("⚠️ Some tests failed. Please review errors above.");
  process.exit(1);
}
