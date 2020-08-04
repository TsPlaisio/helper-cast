import * as chai from 'chai';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {describe, it} from 'mocha';
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const manFiniteTests = [
  {args: [1.1, Math.PI] as any, expected: 1.1 as any},
  {args: [null, Math.PI], expected: Math.PI},
];

describe('toManFiniteFloat() with valid values and with default value', function ()
{
  manFiniteTests.forEach(function (test)
  {
    it(dump(test.args[0]) + ' ' + dump(test.args[1]), function ()
    {
      const res2 = Cast.toManFiniteFloat(test.args[0], test.args[1]);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manTests = manFiniteTests.map((x) => x);
manTests.push({args: [Number.POSITIVE_INFINITY, null], expected: Number.POSITIVE_INFINITY})
manTests.push({args: [Number.NEGATIVE_INFINITY, null], expected: Number.NEGATIVE_INFINITY})
manTests.push({args: [null, Number.POSITIVE_INFINITY], expected: Number.POSITIVE_INFINITY})
manTests.push({args: [null, Number.NEGATIVE_INFINITY], expected: Number.NEGATIVE_INFINITY})

describe('toManFloat() with valid values and with default value', function ()
{
  manTests.forEach(function (test)
  {
    it(dump(test.args[0]) + ' ' + dump(test.args[1]), function ()
    {
      const res2 = Cast.toManFloat(test.args[0], test.args[1]);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optFiniteTests = manFiniteTests.map((x) => x);
optFiniteTests.push({args: [null, null], expected: null})
optFiniteTests.push({args: [null, undefined], expected: null})
optFiniteTests.push({args: [undefined, null], expected: null})
optFiniteTests.push({args: [undefined, undefined], expected: null})

describe('toOptFiniteFloat() with valid values and with default value', function ()
{
  optFiniteTests.forEach(function (test)
  {
    it(dump(test.args[0]) + ' ' + dump(test.args[1]), function ()
    {
      const res1 = Cast.isOptFiniteFloat(test.args[0]);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toOptFiniteFloat(test.args[0], test.args[1]);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optTests = optFiniteTests.map((x) => x);
optTests.push({args: [Number.POSITIVE_INFINITY, null], expected: Number.POSITIVE_INFINITY})
optTests.push({args: [Number.NEGATIVE_INFINITY, null], expected: Number.NEGATIVE_INFINITY})

describe('toOptFloat() with valid values and with default value', function ()
{
  optTests.forEach(function (test)
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
