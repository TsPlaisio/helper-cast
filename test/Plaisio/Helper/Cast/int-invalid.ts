import * as chai from 'chai';
import {describe, it} from 'mocha';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const optTests = [
  '' as any,
  '00',
  '01',
  '123.456',
  123.456,
  new Cast()];

describe('toOptInt() with invalid values', function ()
{
  optTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isOptInt(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toOptInt.bind(Cast, test)).to.throw('Value can not be converted to an int');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manTests = optTests.map((x) => x);
manTests.push(null);
manTests.push(undefined);

describe('toManInt() with invalid values', function ()
{
  manTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isManInt(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toManInt.bind(Cast, test)).to.throw('Value can not be converted to an int');
    });
  });

  it(dump(null) + ' ' + dump(null), function ()
  {
    // When value and default is null an exception must be thrown.
    chai.expect(Cast.toManInt.bind(Cast, null, null)).to.throw('Value can not be converted to an int');
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optDefaultTests = [
  '' as any,
  '0',
  '123.456',
  123.456,
  new Cast()];

describe('toOptInt() with invalid values', function ()
{
  optDefaultTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      chai.expect(Cast.toOptInt.bind(Cast, null, test)).to.throw('Value can not be converted to an int');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manDefaultTests = optDefaultTests.map((x) => x);
manTests.push(null);
manTests.push(undefined);

describe('toManInt() with invalid values', function ()
{
  manDefaultTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      chai.expect(Cast.toManInt.bind(Cast, null, test)).to.throw('Value can not be converted to an int');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
