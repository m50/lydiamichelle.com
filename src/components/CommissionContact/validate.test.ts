import validate from './validate';

describe('validate', () => {
  it('sets error if validation failed', async () => {
    const setError = jest.fn((v: boolean) => expect(v).toBe(true));
    const setMessage = jest.fn((v: string[]) => expect(v.length).toBeGreaterThan(0));

    const res = await validate({
      workSize: undefined,
      name: 'Marisa',
      email: 'not-an-email',
      valueOptions: [],
      extraInfo: '',
      totalPrice: 0,
    }, setError, setMessage);

    expect(res).toBe(false);
    expect(setError).toBeCalled();
    expect(setMessage).toBeCalled();
  });

  it('returns true if validation succeeds', async () => {
    const setError = jest.fn();
    const setMessage = jest.fn();

    const res = await validate({
      workSize: 'A4',
      name: 'Marisa',
      email: 'marisa@clardy.eu',
      valueOptions: ['One Person'],
      extraInfo: '',
      totalPrice: 200,
    }, setError, setMessage);

    expect(res).toBe(true);
    expect(setError).not.toBeCalled();
    expect(setMessage).not.toBeCalled();
  });
});
