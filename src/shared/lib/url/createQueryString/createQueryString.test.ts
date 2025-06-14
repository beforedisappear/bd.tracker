import { createQueryString } from './createQueryString';

describe('createQueryString', () => {
  it('should create query string from object', () => {
    const params = { a: '1', b: '2', c: ['3', '4'] };
    const result = createQueryString(params);
    expect(result).toBe('a=1&b=2&c=[3,4]');
  });

  it('should create query string from object without undefined and null values', () => {
    const params = { a: '1', b: '2', d: undefined, e: null };
    const result = createQueryString(params);
    expect(result).toBe('a=1&b=2');
  });

  it('should create query string from object with array of numbers', () => {
    const params = { a: '1', b: '2', c: [3, 4] };
    const result = createQueryString(params);
    expect(result).toBe('a=1&b=2&c=[3,4]');
  });

  it('should create query string from object with array of booleans', () => {
    const params = { a: '1', b: '2', c: [true, false] };
    const result = createQueryString(params);
    expect(result).toBe('a=1&b=2&c=[true,false]');
  });

  it('should create query string from object with object', () => {
    const params = { a: '1', b: '2', c: { d: '3', e: '4' } };
    const result = createQueryString(params);
    expect(result).toBe('a=1&b=2&c={"d":"3","e":"4"}');
  });
});
