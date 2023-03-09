import { checkContainsOnly } from '../check-contains-only';


describe('checkContainsOnly', () => {
  const test = jest.fn();
  const error = 'Does not only contain.';
  const runCheckForValue = array => () => checkContainsOnly(array, test, error);

  it('should not throw an error if all items of the provided array pass the provided test', () => {
    test.mockReturnValue(true);
    expect(runCheckForValue(['mock item'])).not.toThrow();
  });

  it('should throw the provided error if some items of the provided array do not pass the provided test', () => {
    test.mockReturnValue(false);
    expect(runCheckForValue(['mock item'])).toThrow(error);
  });

  it('should not throw an error if the privided array is empty', () => {
    test.mockReturnValue(false);
    expect(runCheckForValue([])).not.toThrow();
  });
});
