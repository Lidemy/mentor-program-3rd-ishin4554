const multiple = require('./multiple');

describe('multiple', () => {
  it('should return correct answer when a = 9999, b = 9999', () => {
    expect(multiple('9999', '9999')).toBe('99980001');
  });
  it('should return correct answer when a = 23, b = 45234', () => {
    expect(multiple('23', '45234')).toBe('1040382');
  });
  it('should return correct answer when a = 53451, b = 34', () => {
    expect(multiple('53451', '34')).toBe('1817334');
  });
});
