import * as chai from 'chai';
import {Cast} from '../../../../src/Plaisio/Helper/Cast';
import {describe, it} from 'mocha';
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const manFloatTests = [
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

describe('(is|to)ManFloat() with valid values and without default value', function ()
{
  manFloatTests.forEach(function (test)
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
const manFloatInclusiveTests = manFloatTests.map((x) => x);
// INF, -INF and NaN test cases.
manFloatInclusiveTests.push({arg: Number.POSITIVE_INFINITY, expected: Number.POSITIVE_INFINITY});
manFloatInclusiveTests.push({arg: Number.NEGATIVE_INFINITY, expected: Number.NEGATIVE_INFINITY});
manFloatInclusiveTests.push({arg: Number.NaN, expected: Number.NaN});
// INF, -INF and NaN test cases.
manFloatInclusiveTests.push({arg: 'INF', expected: Number.POSITIVE_INFINITY});
manFloatInclusiveTests.push({arg: '-INF', expected: Number.NEGATIVE_INFINITY});
manFloatInclusiveTests.push({arg: 'NaN', expected: Number.NaN});

describe('(is|to)ManFloatInclusive() with valid values and without default value', function ()
{
  manFloatInclusiveTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isManFloatInclusive(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toManFloatInclusive(test.arg);
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
const optFloatInclusiveTests = manFloatInclusiveTests.map((x) => x);
optFloatInclusiveTests.push({arg: null, expected: null});
optFloatInclusiveTests.push({arg: undefined, expected: null});

describe('(is|man)OptFloatInclusive() with valid values and without default value', function ()
{
  optFloatInclusiveTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isOptFloatInclusive(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toOptFloatInclusive(test.arg);
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
