import * as chai from 'chai';
import {describe, it} from 'mocha';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const optTests = [new Cast() as any];

describe('toOptString() with invalid values', function ()
{
  optTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isOptString(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toOptString.bind(Cast, test)).to.throw('Value can not be converted to a string');
    });
  });

  it(dump(null) + ' ' + dump(null), function ()
  {
    // When value is null and default is not an string an exception must be thrown.
    chai.expect(Cast.toOptString.bind(Cast, null, Math.PI as any)).to.throw('Value can not be converted to a string');
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manTests = optTests.map((x) => x);
manTests.push(null);
manTests.push(undefined);

describe('toManString() with invalid values', function ()
{
  manTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isManString(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toManString.bind(Cast, test)).to.throw('Value can not be converted to a string');
    });
  });

  it(dump(null) + ' ' + dump(null), function ()
  {
    // When value and default is null an exception must be thrown.
    chai.expect(Cast.toManString.bind(Cast, null, null)).to.throw('Value can not be converted to a string');
  });
});

//----------------------------------------------------------------------------------------------------------------------
