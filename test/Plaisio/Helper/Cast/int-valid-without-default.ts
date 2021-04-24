import * as chai from 'chai';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {describe, it} from 'mocha';
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const manTests = [
  // Integer test cases.
  {arg: '+123' as any, expected: 123 as any},
  {arg: 0, expected: 0},
  {arg: 123, expected: 123},

  // Float test cases.
  {arg: 123.0, expected: 123},
  {arg: -123.0, expected: -123},
  {arg: 0.0, expected: 0},

  // String test cases.
  {arg: '123', expected: 123},
  {arg: '123.0', expected: 123},
  {arg: '123.0000', expected: 123},
  {arg: '-123', expected: -123},
  {arg: '0', expected: 0},

  // Boolean test cases.
  {arg: false, expected: 0},
  {arg: true, expected: 1}
];

describe('toManInt() with valid values and without default value', function ()
{
  manTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isManInt(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toManInt(test.arg);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optTests = manTests.map((x) => x);
optTests.push({arg: null, expected: null})
optTests.push({arg: undefined, expected: null})

describe('toOptInt() with valid values and without default value', function ()
{
  optTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isOptInt(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toOptInt(test.arg);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
