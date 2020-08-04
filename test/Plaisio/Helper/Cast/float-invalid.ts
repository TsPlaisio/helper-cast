import * as chai from 'chai';
import {describe, it} from 'mocha';
import {Cast} from "../../../../src/Plaisio/Helper/Cast";
import {dump} from './dump';

//----------------------------------------------------------------------------------------------------------------------
const optTests = [
  '',
  'abc',
  '123 ',
  ' 123',
  '123a',
  '123.456 ',
  '0.0 ',
  '00.0',
  new Cast() as any];

describe('toOptFloat() with invalid values', function ()
{
  optTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isOptFloat(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toOptFloat.bind(Cast, test)).to.throw('Value can not be converted to a float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manTests = optTests.map((x) => x);
manTests.push(null);
manTests.push(undefined);

describe('toManFloat() with invalid values', function ()
{
  manTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isManFloat(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toManFloat.bind(Cast, test)).to.throw('Value can not be converted to a float');
    });
  });

  it(dump(null) + ' ' + dump(null), function ()
  {
    // When value and default is null an exception must be thrown.
    chai.expect(Cast.toManFloat.bind(Cast, null, null)).to.throw('Value can not be converted to a float');
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optFiniteTests = optTests.map((x) => x);
optFiniteTests.push(Number.NEGATIVE_INFINITY);
optFiniteTests.push(Number.POSITIVE_INFINITY);
optFiniteTests.push(Number.NaN);
optFiniteTests.push('-INF');
optFiniteTests.push('INF');
optFiniteTests.push('NaN');

describe('toOptFiniteFloat() with invalid values', function ()
{
  optFiniteTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isOptFiniteFloat(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toOptFiniteFloat.bind(Cast, test)).to.throw('Value can not be converted to a finite float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manFiniteTests = optFiniteTests.map((x) => x);
manFiniteTests.push(null);
manFiniteTests.push(undefined);

describe('toManFiniteFloat() with invalid values', function ()
{
  manFiniteTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      const res = Cast.isManFiniteFloat(test);
      chai.assert.equal(res, false);

      chai.expect(Cast.toManFiniteFloat.bind(Cast, test)).to.throw('Value can not be converted to a finite float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optDefaultTests = [
  '' as any,
  'abc',
  '123',
  true,
  false];

describe('toOptFloat() with invalid default values', function ()
{
  optDefaultTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      chai.expect(Cast.toOptFloat.bind(Cast, null, test)).to.throw('Value can not be converted to a float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manDefaultTests = optDefaultTests.map((x) => x);
manDefaultTests.push(null);
manDefaultTests.push(undefined);

describe('toManFloat() with invalid default values', function ()
{
  manDefaultTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      chai.expect(Cast.toManFloat.bind(Cast, null, test)).to.throw('Value can not be converted to a float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const optFiniteDefaultTests = optDefaultTests.map((x) => x);
optFiniteDefaultTests.push(Number.NEGATIVE_INFINITY);
optFiniteDefaultTests.push(Number.POSITIVE_INFINITY);
optFiniteDefaultTests.push(Number.NaN);

describe('toOptFiniteFloat() with invalid default values', function ()
{
  optFiniteDefaultTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      chai.expect(Cast.toOptFiniteFloat.bind(Cast, null, test)).to.throw('Value can not be converted to a finite float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
const manFiniteDefaultTests = optFiniteDefaultTests.map((x) => x);

describe('toManFiniteFloat() with invalid default values', function ()
{
  manFiniteDefaultTests.forEach(function (test)
  {
    it(dump(test), function ()
    {
      chai.expect(Cast.toManFiniteFloat.bind(Cast, null, test)).to.throw('Value can not be converted to a finite float');
    });
  });
});

//----------------------------------------------------------------------------------------------------------------------
