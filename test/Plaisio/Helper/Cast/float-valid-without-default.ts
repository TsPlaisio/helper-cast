import * as chai from 'chai';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {describe, it} from 'mocha';
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const manFiniteTests = [
  {arg: 123.45 as any, expected: 123.45 as any},
  {arg: 0, expected: 0.0},
  {arg: 1, expected: 1.0},

  // Boolean test cases
  {arg: false, expected: 0.0},
  {arg: true, expected: 1.0},

  // String test cases.
  {arg: '0', expected: 0.0},
  {arg: '0.0', expected: 0.0},
  {arg: '1', expected: 1.0},
  {arg: '0.1', expected: 0.1},
  {arg: '123.45', expected: 123.45},
  {arg: '75e-5', expected: 75e-5},
  {arg: '0.00075', expected: 75e-5},
  {arg: '31e+7', expected: 310000000.0},
  {arg: '31E+7', expected: 310000000.0}
];

describe('toManFiniteFloat() with valid values and without default value', function ()
{
  manFiniteTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isManFiniteFloat(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toManFiniteFloat(test.arg);
      if (Number.isNaN(test.expected))
      {
        chai.assert.isNaN(res2);
      }
      else
      {
        chai.assert.strictEqual(res2, test.expected);
      }
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manTests = manFiniteTests.map((x) => x);
// INF, -INF and NaN test cases.
manTests.push({arg: Number.POSITIVE_INFINITY, expected: Number.POSITIVE_INFINITY});
manTests.push({arg: Number.NEGATIVE_INFINITY, expected: Number.NEGATIVE_INFINITY});
manTests.push({arg: Number.NaN, expected: Number.NaN});
// INF, -INF and NaN test cases.
manTests.push({arg: 'INF', expected: Number.POSITIVE_INFINITY});
manTests.push({arg: '-INF', expected: Number.NEGATIVE_INFINITY});
manTests.push({arg: 'NaN', expected: Number.NaN});

describe('toManFloat() with valid values and without default value', function ()
{
  manTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isManFloat(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toManFloat(test.arg);
      if (Number.isNaN(test.expected))
      {
        chai.assert.isNaN(res2);
      }
      else
      {
        chai.assert.strictEqual(res2, test.expected);
      }
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optTests = manTests.map((x) => x);
optTests.push({arg: null, expected: null})
optTests.push({arg: undefined, expected: null})

describe('toOptFloat() with valid values and without default value', function ()
{
  optTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isOptFloat(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toOptFloat(test.arg);
      if (Number.isNaN(test.expected))
      {
        chai.assert.isNaN(res2);
      }
      else
      {
        chai.assert.strictEqual(res2, test.expected);
      }
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
