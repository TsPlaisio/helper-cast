import * as chai from 'chai';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {describe, it} from 'mocha';
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const optTests = [
  '' as any,
  'abc',
  '123.456'
];

describe('toOptBool() with invalid values', function ()
{
  optTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isOptBool(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toOptBool.bind(Cast, test)).to.throw('Value can not be converted to a boolean');
    });
  });

  it(dump(null) + ' ' + dump(null), function ()
  {
    // When value is null and default is not a boolean an exception must be thrown.
    chai.expect(Cast.toOptBool.bind(Cast, null, Math.PI as any)).to.throw('Value can not be converted to a boolean');
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manTests = optTests.map((x) => x);
manTests.push({arg: null});
manTests.push({arg: undefined});

describe('toManBool() with invalid values', function ()
{
  manTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isManBool(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toManBool.bind(Cast, test)).to.throw('Value can not be converted to a boolean');
    });
  });

  it(dump(null) + ' ' + dump(null), function ()
  {
    // When value and default is null an exception must be thrown.
    chai.expect(Cast.toManBool.bind(Cast, null, null)).to.throw('Value can not be converted to a boolean');
  });
});

//----------------------------------------------------------------------------------------------------------------------
