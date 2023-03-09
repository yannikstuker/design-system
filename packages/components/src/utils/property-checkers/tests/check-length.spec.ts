import { checkLength, LengthCondition } from '../check-length';


describe('checkLength', () => {
  let condition: LengthCondition;
  let error: string;
  const runCheckForValue = array => () => checkLength(array, condition, error);

  describe('fixed length', () => {
    beforeAll(() => {
      error = 'Incorrect length.';
      condition = 1;
    });

    it('should not throw an error if the provided array has the expected length', () => {
      expect(runCheckForValue(['only item'])).not.toThrow();
    });

    it('should throw the provided error if the provided array does not have the expected length', () => {
      [[], ['item 1', 'item 2']].forEach(incorrectArray => {
        expect(runCheckForValue(incorrectArray)).toThrow(error);
      });
    });
  });

  describe('min length', () => {
    beforeAll(() => {
      error = 'Too short.';
      condition = {min: 1};
    });

    it('should not throw an error if the provided array has a length greater than or equal to the expected one', () => {
      [['only item'], ['item 1', 'item 2']].forEach(correctArray => {
        expect(runCheckForValue(correctArray)).not.toThrow();
      });
    });

    it('should throw the provided error if the provided array has a length less than the expected one', () => {
      expect(runCheckForValue([])).toThrow(error);
    });
  });

  describe('max length', () => {
    beforeAll(() => {
      error = 'Too long.';
      condition = {max: 1};
    });

    it('should not throw an error if the provided array has a length less than or equal to the expected one', () => {
      [[], ['only item']].forEach(correctArray => {
        expect(runCheckForValue(correctArray)).not.toThrow();
      });
    });

    it('should throw the provided error if the provided array has a length greater than the expected one', () => {
      expect(runCheckForValue(['item 1', 'item 2'])).toThrow(error);
    });
  });

  describe('min and max length', () => {
    beforeAll(() => {
      error = 'Too short or too long.';
      condition = {min: 1, max: 2};
    });

    it('should not throw an error if the provided array has a length between the expected minimum and maximum', () => {
      [['only item'], ['item 1', 'item 2']].forEach(correctArray => {
        expect(runCheckForValue(correctArray)).not.toThrow();
      });
    });

    it('should throw the provided error if the provided array has a length outside the expected minimum and maximum', () => {
      [[], ['item 1', 'item 2', 'item 3']].forEach(correctArray => {
        expect(runCheckForValue(correctArray)).toThrow(error);
      });
    });
  });
});
