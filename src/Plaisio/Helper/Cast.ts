/**
 * Utility class for casting safely any values to bool, number (float or integer), or string.
 */
export class Cast
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns true if and only if a value can be casted to a boolean. Otherwise returns false.
   *
   * @param value The value.
   */
  public static isManBool(value: any): boolean
  {
    return (value === false || value === true || value === 0 || value === 1 || value === '0' || value === '1');
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns true if and only if a value can be casted to a finite float. Otherwise returns false.
   *
   * @param value The value.
   */
  public static isManFiniteFloat(value: any): boolean
  {
    switch (typeof value)
    {
      case 'number':
        return Number.isFinite(value);

      case 'boolean':
        return true;

      case 'string':
        const re = new RegExp('^[-+]?(0?|[1-9][0-9]*)\\.?[0-9]+([eE][-+]?[0-9]+)?$');

        return (re.exec(value) !== null);

      default:
        return false;
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns true if and only if a value can be casted to a float. Otherwise returns false.
   *
   * @param value The value.
   */
  public static isManFloat(value: any): boolean
  {
    switch (typeof value)
    {
      case 'number':
      case 'boolean':
        return true;

      case 'string':
        const re = new RegExp('^[-+]?(0?|[1-9][0-9]*)\\.?[0-9]+([eE][-+]?[0-9]+)?$');

        if (re.exec(value) !== null)
        {
          return true;
        }

        const val = value.toUpperCase();

        return (val === 'NAN' || val === 'INF' || val === '-INF');

      default:
        return false;
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns true if and only if a value can be casted to an integer. Otherwise returns false.
   *
   * @param value The value.
   */
  public static isManInt(value: any): boolean
  {
    switch (typeof value)
    {
      case 'boolean':
        return true;

      case 'number':
        return Number.isInteger(value);

      case 'string':
        const re = new RegExp('^[-+]?(0|[1-9][0-9]*)(\.0+)?$');

        return (re.exec(value) !== null);

      default:
        return false;
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns true if and only if a value can be casted to a string. Otherwise returns false.
   *
   * @param value The value.
   */
  public static isManString(value: any): boolean
  {
    switch (typeof value)
    {
      case 'boolean':
      case 'number':
      case 'string':
        return true;

      default:
        return false;
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns true if and only if a value is null, undefined or can be casted to a boolean, otherwise return false.
   *
   * @param value The value.
   */
  public static isOptBool(value: any): boolean
  {
    return (value == null || Cast.isManBool(value));
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns true if and only if a value is null, undefined or can be casted to a finite float, otherwise return false.
   *
   * @param value The value.
   */
  public static isOptFiniteFloat(value: any): boolean
  {
    return (value == null || Cast.isManFiniteFloat(value));
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns true if and only if a value is null, undefined or can be casted to a float, otherwise return false.
   *
   * @param value The value.
   */
  public static isOptFloat(value: any): boolean
  {
    return (value == null || Cast.isManFloat(value));
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns true if and only if a value is null, undefined or can be casted to an integer, otherwise return false.
   *
   * @param value The value.
   */
  public static isOptInt(value: any): boolean
  {
    return (value == null || Cast.isManInt(value));
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns true if and only if a value is null, undefined or can be casted to a string, otherwise return false.
   *
   * @param value The value.
   */
  public static isOptString(value: any): boolean
  {
    return (value == null || Cast.isManString(value));
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Converts a value to a boolean. If the value can not be safely casted to a boolean throws an exception.
   *
   * @param value        The value.
   * @param defaultValue The default value. If the value is null or undefined and the default is not null and defined
   *                     the default value will be returned.
   */
  public static toManBool(value: any, defaultValue: boolean | null = null): boolean
  {
    if (value == null)
    {
      if (typeof defaultValue !== 'boolean')
      {
        throw new Error('Value can not be converted to a boolean');
      }

      return defaultValue;
    }

    if (value === true || value === 1 || value === '1')
    {
      return true;
    }

    if (value === false || value === 0 || value === '0')
    {
      return false;
    }

    throw new Error('Value can not be converted to a boolean');
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Converts a value to a finite float. If the value can not be safely casted to a finite float throws an exception.
   *
   * @param value        The value.
   * @param defaultValue The default value. If the value is null or undefined and the default is not null and defined
   *                     the default value will be returned.
   */
  public static toManFiniteFloat(value: any, defaultValue: number | null = null): number
  {
    if (value == null)
    {
      if ((typeof defaultValue !== 'number') || !Number.isFinite(defaultValue))
      {
        throw new Error('Value can not be converted to a finite float');
      }

      return defaultValue;
    }

    if (!Cast.isManFiniteFloat(value))
    {
      throw new Error('Value can not be converted to a finite float');
    }

    return Number(value);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Converts a value to a float. If the value can not be safely casted to a float throws an exception.
   *
   * @param value        The value.
   * @param defaultValue The default value. If the value is null or undefined and the default is not null and defined
   *                     the default value will be returned.
   */
  public static toManFloat(value: any, defaultValue: number | null = null): number
  {
    if (value == null)
    {
      if (typeof defaultValue !== 'number')
      {
        throw new Error('Value can not be converted to a float');
      }

      return defaultValue;
    }

    if (!Cast.isManFloat(value))
    {
      throw new Error('Value can not be converted to a float');
    }

    if (typeof value === 'string')
    {
      switch (value.toUpperCase())
      {
        case 'NAN':
          return Number.NaN;

        case 'INF':
          return Number.POSITIVE_INFINITY;

        case '-INF':
          return Number.NEGATIVE_INFINITY;
      }
    }

    return Number(value);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Converts a value to an integer. If the value can not be safely casted to an integer throws an exception.
   *
   * @param value        The value.
   * @param defaultValue The default value. If the value is null or undefined and the default is not null and defined
   *                     the default value will be returned.
   */
  public static toManInt(value: any, defaultValue: number | null = null): number
  {
    if (value == null && defaultValue != null)
    {
      if ((typeof defaultValue !== 'number') || !Number.isInteger(defaultValue))
      {
        throw new Error('Value can not be converted to an integer');
      }

      return defaultValue;
    }

    if (!Cast.isManInt(value))
    {
      throw new Error('Value can not be converted to an integer');
    }

    return Number(value);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Converts a value to a string. If the value can not be safely casted to a string throws an exception.
   *
   * @param value        The value.
   * @param defaultValue The default value. If the value is null or undefined and the default is not null and defined
   *                     the default value will be returned.
   */
  public static toManString(value: any, defaultValue: string | null = null): string
  {
    if (value == null)
    {
      if (typeof defaultValue !== 'string')
      {
        throw new Error('Value can not be converted to a string');
      }

      return defaultValue;
    }

    if (!Cast.isManString(value))
    {
      throw new Error('Value can not be converted to a string');
    }

    switch (true)
    {
      case  (value === false):
        return '0';

      case (value === true):
        return '1';

      case (value === Number.NEGATIVE_INFINITY):
        return '-INF';

      case (value === Number.POSITIVE_INFINITY):
        return 'INF';

      default:
        return String(value);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Converts a value to a boolean. If the value can not be safely casted to a boolean throws an exception.
   *
   * @param value        The value.
   * @param defaultValue The default value. If the value is null or undefined and the default is not null and defined
   *                     the default value will be returned.
   */
  public static toOptBool(value: any, defaultValue: boolean | null = null): boolean | null
  {
    if (value == null)
    {
      if (defaultValue !== null && (typeof defaultValue !== 'boolean'))
      {
        throw new Error('Value can not be converted to a boolean');
      }

      return defaultValue;
    }

    return Cast.toManBool(value);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Converts a value to a finite float. If the value can not be safely casted to a finite float throws an exception.
   *
   * @param value        The value.
   * @param defaultValue The default value. If the value is null or undefined and the default is not null and defined
   *                     the default value will be returned.
   */
  public static toOptFiniteFloat(value: any, defaultValue: number | null = null): number | null
  {
    if (value == null)
    {
      if (defaultValue !== null && !Number.isFinite(defaultValue))
      {
        throw new Error('Value can not be converted to a finite float');
      }

      return defaultValue;
    }

    return Cast.toManFiniteFloat(value);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Converts a value to a float. If the value can not be safely casted to a float throws an exception.
   *
   * @param value        The value.
   * @param defaultValue The default value. If the value is null or undefined and the default is not null and defined
   *                     the default value will be returned.
   */
  public static toOptFloat(value: any, defaultValue: number | null = null): number | null
  {
    if (value == null)
    {
      if (defaultValue !== null && (typeof defaultValue !== 'number'))
      {
        throw new Error('Value can not be converted to a float');
      }

      return defaultValue;
    }

    return Cast.toManFloat(value);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Converts a value to an integer. If the value can not be safely casted to an integer throws an exception.
   *
   * @param value        The value.
   * @param defaultValue The default value. If the value is null or undefined and the default is not null and defined
   *                     the default value will be returned.
   */
  public static toOptInt(value: any, defaultValue: number | null = null): number | null
  {
    if (value == null)
    {
      if (defaultValue !== null && !Number.isInteger(defaultValue))
      {
        throw new Error('Value can not be converted to an integer');
      }

      return defaultValue;
    }

    return Cast.toManInt(value);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Converts a value to a string. If the value can not be safely casted to a string throws an exception.
   *
   * @param value        The value.
   * @param defaultValue The default value. If the value is null or undefined and the default is not null and defined
   *                     the default value will be returned.
   */
  public static toOptString(value: any, defaultValue: string | null = null): string | null
  {
    if (value == null)
    {
      if (defaultValue !== null && (typeof defaultValue !== 'string'))
      {
        throw new Error('Value can not be converted to a string');
      }

      return defaultValue;
    }

    return Cast.toManString(value);
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
