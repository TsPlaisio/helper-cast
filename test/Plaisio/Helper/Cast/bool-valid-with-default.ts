import * as chai from 'chai';
import {describe, it} from 'mocha';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const manTests = [
  {args: [false, true] as any, expected: false as any},
  {args: [null, false], expected: false},
  {args: [null, true], expected: true}];

describe('toManBool() valid with default value', function ()
{
  manTests.forEach(function (test)
  {
    it(dump(test.args[0]) + ' ' + dump(test.args[1]), function ()
    {
      const res = Cast.toManBool(test.args[0], test.args[1]);
      chai.assert.strictEqual(res, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optTests = manTests.map((x) => x);
optTests.push({args: [null, null], expected: null})
optTests.push({args: [null, undefined], expected: null})
optTests.push({args: [undefined, null], expected: null})
optTests.push({args: [undefined, undefined], expected: null})

describe('toOptBool() valid with default value', function ()
{
  optTests.forEach(function (test)
  {
    it(dump(test.args[0]) + ' ' + dump(test.args[1]), function ()
    {
      const res = Cast.toOptBool(test.args[0], test.args[1]);
      chai.assert.strictEqual(res, test.expected);
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
