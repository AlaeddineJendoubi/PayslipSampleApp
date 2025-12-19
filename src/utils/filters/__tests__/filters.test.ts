import {
  ascFromDateFilter,
  ascIdFilter,
  asctoDateFilter,
  descFromDateFilter,
  descIdFilter,
  desctoDateFilter,
  getFileType,
  globalSearchFilter,
  payslipSearchFilter,
  searchFilter,
} from '..';
import { PaySlips } from '../../../modules/payslips/types';
import {
  convertDateToReadableString,
  convertStringIsoDateToTimestamp,
} from '../../dateConverters';

jest.mock('../../dateConverters');

describe('Filter utilities', () => {
  describe('getFileType', () => {
    it('should return "PDF Document" for PDF files', () => {
      expect(getFileType('document.pdf')).toBe('PDF Document');
      expect(getFileType('file.PDF')).toBe('PDF Document');
    });

    it('should return "Image File" for image extensions', () => {
      expect(getFileType('photo.jpg')).toBe('Image File');
      expect(getFileType('image.jpeg')).toBe('Image File');
      expect(getFileType('picture.png')).toBe('Image File');
      expect(getFileType('graphic.gif')).toBe('Image File');
      expect(getFileType('bitmap.bmp')).toBe('Image File');
      expect(getFileType('modern.webp')).toBe('Image File');
      expect(getFileType('tiff.tiff')).toBe('Image File');
    });

    it('should return "other type" for unknown extensions', () => {
      expect(getFileType('document.doc')).toBe('other type');
      expect(getFileType('file')).toBe('other type');
    });
  });

  describe('descFromDateFilter', () => {
    it('should sort payslips by fromDate in descending order', () => {
      (convertStringIsoDateToTimestamp as jest.Mock)
        .mockReturnValueOnce(1677628800000)
        .mockReturnValueOnce(1672531200000);

      const items: PaySlips = [
        {
          id: '1',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'a.pdf',
        },
        {
          id: '2',
          fromDate: '2023-03-01',
          toDate: '2023-03-31',
          file: 'b.pdf',
        },
      ];

      const result = descFromDateFilter(items);
      expect(result[0].id).toBe('2');
      expect(result[1].id).toBe('1');
    });
  });

  describe('ascFromDateFilter', () => {
    it('should sort payslips by fromDate in ascending order', () => {
      (convertStringIsoDateToTimestamp as jest.Mock)
        .mockReturnValueOnce(1000)
        .mockReturnValueOnce(2000)
        .mockReturnValueOnce(2000)
        .mockReturnValueOnce(1000);

      const items: PaySlips = [
        {
          id: '1',
          fromDate: '2023-03-01',
          toDate: '2023-03-31',
          file: 'a.pdf',
        },
        {
          id: '2',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'b.pdf',
        },
      ];

      const result = ascFromDateFilter(items);
      expect(result[0].id).toBe('2');
      expect(result[1].id).toBe('1');
    });
  });

  describe('desctoDateFilter', () => {
    it('should sort payslips by toDate in descending order', () => {
      (convertStringIsoDateToTimestamp as jest.Mock)
        .mockReturnValueOnce(2000)
        .mockReturnValueOnce(1000)
        .mockReturnValueOnce(1000)
        .mockReturnValueOnce(2000);

      const items: PaySlips = [
        {
          id: '1',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'a.pdf',
        },
        {
          id: '2',
          fromDate: '2023-03-01',
          toDate: '2023-03-31',
          file: 'b.pdf',
        },
      ];

      const result = desctoDateFilter(items);
      expect(result[0].id).toBe('2');
      expect(result[1].id).toBe('1');
    });
  });

  describe('asctoDateFilter', () => {
    it('should sort payslips by toDate in ascending order', () => {
      (convertStringIsoDateToTimestamp as jest.Mock)
        .mockReturnValueOnce(1000)
        .mockReturnValueOnce(2000)
        .mockReturnValueOnce(2000)
        .mockReturnValueOnce(1000);

      const items: PaySlips = [
        {
          id: '1',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'a.pdf',
        },
        {
          id: '2',
          fromDate: '2023-03-01',
          toDate: '2023-03-31',
          file: 'b.pdf',
        },
      ];

      const result = asctoDateFilter(items);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
    });
  });

  describe('ascIdFilter', () => {
    it('should sort payslips by ID in ascending order', () => {
      const items: PaySlips = [
        {
          id: 'C',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'a.pdf',
        },
        {
          id: 'A',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'b.pdf',
        },
        {
          id: 'B',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'c.pdf',
        },
      ];

      const result = ascIdFilter(items);
      expect(result[0].id).toBe('A');
      expect(result[1].id).toBe('B');
      expect(result[2].id).toBe('C');
    });
  });

  describe('descIdFilter', () => {
    it('should sort payslips by ID in descending order', () => {
      const items: PaySlips = [
        {
          id: 'A',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'a.pdf',
        },
        {
          id: 'C',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'b.pdf',
        },
        {
          id: 'B',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'c.pdf',
        },
      ];

      const result = descIdFilter(items);
      expect(result[0].id).toBe('C');
      expect(result[1].id).toBe('B');
      expect(result[2].id).toBe('A');
    });
  });

  describe('globalSearchFilter', () => {
    it('should perform case-insensitive search', () => {
      expect(globalSearchFilter('Hello World', 'hello')).toBe(true);
      expect(globalSearchFilter('Hello World', 'WORLD')).toBe(true);
      expect(globalSearchFilter('Hello World', 'xyz')).toBe(false);
    });
  });

  describe('payslipSearchFilter', () => {
    beforeEach(() => {
      (convertDateToReadableString as jest.Mock).mockImplementation(
        date => date,
      );
    });

    it('should return all items when query is empty', () => {
      const items: PaySlips = [
        {
          id: '1',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'a.pdf',
        },
        {
          id: '2',
          fromDate: '2023-03-01',
          toDate: '2023-03-31',
          file: 'b.pdf',
        },
      ];

      expect(payslipSearchFilter(items, '')).toEqual(items);
    });

    it('should filter by ID', () => {
      const items: PaySlips = [
        {
          id: 'unique-1',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'a.pdf',
        },
        {
          id: 'unique2',
          fromDate: '2023-03-01',
          toDate: '2023-03-31',
          file: 'b.pdf',
        },
      ];

      const result = payslipSearchFilter(items, 'unique-1');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('unique-1');
    });

    it('should filter by file type', () => {
      const items: PaySlips = [
        {
          id: '1',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'a.pdf',
        },
        {
          id: '2',
          fromDate: '2023-03-01',
          toDate: '2023-03-31',
          file: 'b.jpg',
        },
      ];

      const result = payslipSearchFilter(items, 'image');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('should filter by filename', () => {
      const items: PaySlips = [
        {
          id: '1',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'report.pdf',
        },
        {
          id: '2',
          fromDate: '2023-03-01',
          toDate: '2023-03-31',
          file: 'other.pdf',
        },
      ];

      const result = payslipSearchFilter(items, 'report');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should filter by date values', () => {
      const items: PaySlips = [
        {
          id: '1',
          fromDate: '2023-01-01',
          toDate: '2023-01-31',
          file: 'a.pdf',
        },
        {
          id: '2',
          fromDate: '2023-03-01',
          toDate: '2023-03-31',
          file: 'b.pdf',
        },
      ];

      const result = payslipSearchFilter(items, '2023-01');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });
  });

  describe('searchFilter', () => {
    it('should filter items by key with case-insensitive search', () => {
      const items = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ];

      const result = searchFilter(items, 'name', 'john');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John');
    });

    it('should return empty array when no match found', () => {
      const items = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ];

      const result = searchFilter(items, 'name', 'xyz');
      expect(result).toHaveLength(0);
    });
  });
});
