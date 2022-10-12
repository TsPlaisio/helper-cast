import * as chai from 'chai';
import {describe, it} from 'mocha';
import {Cast} from '../../../../src/Plaisio/Helper/Cast';
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const optFloatInclusiveTests = [
  '',
  'abc',
  '123 ',
  ' 123',
  '123a',
  '123.456 ',
  '0.0 ',
  '00.0',
  new Cast() as any];

describe('(is|man)OptFloatInclusive() with invalid values', function ()
{
  optFloatInclusiveTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isOptFloatInclusive(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toOptFloatInclusive.bind(Cast, test)).to.throw('Value can not be converted to a float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manFloatInclusiveTests = optFloatInclusiveTests.map((x) => x);
manFloatInclusiveTests.push(null);
manFloatInclusiveTests.push(undefined);

describe('(is|to)ManFloatInclusive() with invalid values', function ()
{
  manFloatInclusiveTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isManFloatInclusive(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toManFloatInclusive.bind(Cast, test)).to.throw('Value can not be converted to a float');
    });
  });

  it(dump(null) + ' ' + dump(null), function ()
  {
    // When value and default is null an exception must be thrown.
    chai.expect(Cast.toManFloatInclusive.bind(Cast, null, null)).to.throw('Value can not be converted to a float');
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optFloatTests = optFloatInclusiveTests.map((x) => x);
optFloatTests.push(Number.NEGATIVE_INFINITY);
optFloatTests.push(Number.POSITIVE_INFINITY);
optFloatTests.push(Number.NaN);
optFloatTests.push('-INF');
optFloatTests.push('INF');
optFloatTests.push('NaN');

describe('(is|to)OptFloat() with invalid values', function ()
{
  optFloatTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isOptFloat(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toOptFloat.bind(Cast, test)).to.throw('Value can not be converted to a finite float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manFloatTests = optFloatTests.map((x) => x);
manFloatTests.push(null);
manFloatTests.push(undefined);

describe('(is|to)ManFloat() with invalid values', function ()
{
  manFloatTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isManFloat(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toManFloat.bind(Cast, test)).to.throw('Value can not be converted to a finite float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const toOptFloatInclusiveTests = [
  '' as any,
  'abc',
  '123',
  true,
  false];

describe('toOptFloatInclusive() with invalid default values', function ()
{
  toOptFloatInclusiveTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      chai.expect(Cast.toOptFloatInclusive.bind(Cast, null, test)).to.throw('Value can not be converted to a float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const toManFloatInclusiveWithDefaultTests = toOptFloatInclusiveTests.map((x) => x);
toManFloatInclusiveWithDefaultTests.push(null);
toManFloatInclusiveWithDefaultTests.push(undefined);

describe('toManFloatInclusive() with invalid default values', function ()
{
  toManFloatInclusiveWithDefaultTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      chai.expect(Cast.toManFloatInclusive.bind(Cast, null, test)).to.throw('Value can not be converted to a float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const toOptFloatWithDefaultTests = toOptFloatInclusiveTests.map((x) => x);
toOptFloatWithDefaultTests.push(Number.NEGATIVE_INFINITY);
toOptFloatWithDefaultTests.push(Number.POSITIVE_INFINITY);
toOptFloatWithDefaultTests.push(Number.NaN);

describe('toOptFloat() with invalid default values', function ()
{
  toOptFloatWithDefaultTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      chai.expect(Cast.toOptFloat.bind(Cast, null, test)).to.throw('Value can not be converted to a finite float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const toManFloatWithDefaultTests = toOptFloatWithDefaultTests.map((x) => x);

describe('toManFloat() with invalid default values', function ()
{
  toManFloatWithDefaultTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      chai.expect(Cast.toManFloat.bind(Cast, null, test)).to.throw('Value can not be converted to a finite float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
