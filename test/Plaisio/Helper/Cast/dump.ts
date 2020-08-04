export function dump(value: any): string
{
  if (typeof value === 'undefined')
  {
    return 'undefined';
  }

  if (typeof value === 'number')
  {
    switch (true)
    {
      case Number.isNaN(value):
        return 'NaN';

      case value === Number.NEGATIVE_INFINITY:
      case value === Number.POSITIVE_INFINITY:
        return String(value);
    }
  }

  return JSON.stringify(value);
}
