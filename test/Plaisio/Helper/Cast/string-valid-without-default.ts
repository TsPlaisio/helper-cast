import * as chai from 'chai';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {describe, it} from 'mocha';
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const manTests = [
  {arg: 'Hello, world' as any, expected: 'Hello, world' as any},
  {arg: '0', expected: '0'},
  {arg: '', expected: ''},

  // Integer test cases.
  {arg: -123, expected: '-123'},
  {arg: 0, expected: '0'},
  {arg: 123, expected: '123'},

  // Float test cases.
  {arg: 123.0, expected: '123'},
  {arg: Number.POSITIVE_INFINITY, expected: 'INF'},
  {arg: Number.NEGATIVE_INFINITY, expected: '-INF'},
  {arg: Number.NaN, expected: 'NaN'},

  // Boolean test cases.
  {arg: false, expected: '0'},
  {arg: true, expected: '1'}
];

describe('toManString() with valid values and without default value', function ()
{
  manTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isManString(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toManString(test.arg);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optTests = manTests.map((x) => x);
optTests.push({arg: null, expected: null})
optTests.push({arg: undefined, expected: null})

describe('toOptString() with valid values and without default value', function ()
{
  optTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isOptString(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toOptString(test.arg);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
