import { describe, expect, it } from 'vitest';
import { decodeEntities } from './decodeEntities';

describe('decodeEntities', () => {
  it('decodes numeric entities', () => {
    expect(decodeEntities('It&#39;s easy')).toBe("It's easy");
  });

  it('decodes named entities', () => {
    expect(decodeEntities('a &amp; b &lt; c')).toBe('a & b < c');
  });

  it('leaves plain text untouched', () => {
    expect(decodeEntities('hello world')).toBe('hello world');
  });

  it('decodes markup to inert text rather than executing it', () => {
    expect(decodeEntities('&lt;img src=x&gt;')).toBe('<img src=x>');
  });
});
