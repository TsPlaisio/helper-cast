import * as chai from 'chai';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {describe, it} from 'mocha';
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const toManFloatTests = [
  {args: [1.1, Math.PI] as any, expected: 1.1 as any},
  {args: [null, Math.PI], expected: Math.PI}
];

describe('toManFloat() with valid values and with default value', function ()
{
  toManFloatTests.forEach(function (test)
  {
    it(dump(test.args[0]) + ' ' + dump(test.args[1]), function ()
    {
      const res2 = Cast.toManFloat(test.args[0], test.args[1]);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const toManFloatInclusiveTests = toManFloatTests.map((x) => x);
toManFloatInclusiveTests.push({args: [Number.POSITIVE_INFINITY, null], expected: Number.POSITIVE_INFINITY});
toManFloatInclusiveTests.push({args: [Number.NEGATIVE_INFINITY, null], expected: Number.NEGATIVE_INFINITY});
toManFloatInclusiveTests.push({args: [null, Number.POSITIVE_INFINITY], expected: Number.POSITIVE_INFINITY});
toManFloatInclusiveTests.push({args: [null, Number.NEGATIVE_INFINITY], expected: Number.NEGATIVE_INFINITY});

describe('toManFloatInclusive() with valid values and with default value', function ()
{
  toManFloatInclusiveTests.forEach(function (test)
  {
    it(dump(test.args[0]) + ' ' + dump(test.args[1]), function ()
    {
      const res2 = Cast.toManFloatInclusive(test.args[0], test.args[1]);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optFloatTests = toManFloatTests.map((x) => x);
optFloatTests.push({args: [null, null], expected: null});
optFloatTests.push({args: [null, undefined], expected: null});
optFloatTests.push({args: [undefined, null], expected: null});
optFloatTests.push({args: [undefined, undefined], expected: null});

describe('(is|man)OptFloat() with valid values and with default value', function ()
{
  optFloatTests.forEach(function (test)
  {
    it(dump(test.args[0]) + ' ' + dump(test.args[1]), function ()
    {
      const res1 = Cast.isOptFloat(test.args[0]);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toOptFloat(test.args[0], test.args[1]);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optFloatInclusiveTests = optFloatTests.map((x) => x);
optFloatInclusiveTests.push({args: [Number.POSITIVE_INFINITY, null], expected: Number.POSITIVE_INFINITY});
optFloatInclusiveTests.push({args: [Number.NEGATIVE_INFINITY, null], expected: Number.NEGATIVE_INFINITY});

describe('(is|man)OptFloatInclusive() with valid values and with default value', function ()
{
  optFloatInclusiveTests.forEach(function (test)
  {
    it(dump(test.args[0]) + ' ' + dump(test.args[1]), function ()
    {
      const res1 = Cast.isOptFloatInclusive(test.args[0]);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toOptFloatInclusive(test.args[0], test.args[1]);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
