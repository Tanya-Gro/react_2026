import { toBase64 } from 'helpers';

describe('toBase64', () => {
  it('should resolve with base64 string when file is read successfully', async () => {
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const result = await toBase64(file);

    expect(result).toMatch(/^data:text\/plain;base64,/);
    expect(result).toContain(btoa('hello'));
  });
});
