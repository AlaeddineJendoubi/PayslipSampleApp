import {
  convertDateToReadableString,
  convertStringIsoDateToTimestamp,
} from '..';

describe('dateConverters', () => {
  describe('convertDateToReadableString', () => {
    it('should convert ISO date string to readable format', () => {
      const result = convertDateToReadableString('2024-01-15');
      expect(result).toMatch(/January 15, 2024/);
    });

    it('should handle different date formats', () => {
      const result = convertDateToReadableString('2023-12-25');
      expect(result).toMatch(/December 25, 2023/);
    });

    it('should return a string', () => {
      const result = convertDateToReadableString('2024-01-01');
      expect(typeof result).toBe('string');
    });
  });

  describe('convertStringIsoDateToTimestamp', () => {
    it('should convert ISO date string to timestamp', () => {
      const dateString = '2024-01-15T00:00:00Z';
      const result = convertStringIsoDateToTimestamp(dateString);
      expect(result).toBe(new Date(dateString).getTime());
    });

    it('should return a number', () => {
      const result = convertStringIsoDateToTimestamp('2024-01-01');
      expect(typeof result).toBe('number');
    });

    it('should handle different ISO date formats', () => {
      const result = convertStringIsoDateToTimestamp('2023-12-25T12:30:00Z');
      expect(result).toBeGreaterThan(0);
    });
  });
});
