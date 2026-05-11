import { getID } from '../helpers';

describe('getID', () => {
  it('returns id from url with trailing slash', () => {
    expect(getID('https://swapi.py4e.com/api/people/1/')).toBe('1');
  });

  it('returns id from url without trailing slash', () => {
    expect(getID('https://swapi.py4e.com/api/people/1')).toBe('1');
  });

  it('returns empty string for empty url', () => {
    expect(getID('')).toBe('');
  });

  it('returns last segment for invalid url', () => {
    expect(getID('people/5')).toBe('5');
  });
});
