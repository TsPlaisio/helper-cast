import * as chai from 'chai';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {describe, it} from 'mocha';
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const manTests = [
  {arg: false as any, expected: false as any},
  {arg: 0, expected: false},
  {arg: '0', expected: false},
  {arg: true, expected: true},
  {arg: 1, expected: true},
  {arg: '1', expected: true}];

describe('toManBool() with valid values and without default value', function ()
{
  manTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isManBool(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toManBool(test.arg);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optTests = manTests.map((x) => x);
optTests.push({arg: null, expected: null})

describe('toOptBool() with valid values and without default value', function ()
{
  optTests.forEach(function (test)
  {
    it(dump(test.arg), function ()
    {
      const res1 = Cast.isOptBool(test.arg);
      chai.assert.strictEqual(res1, true);

      const res2 = Cast.toOptBool(test.arg);
      chai.assert.strictEqual(res2, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
