import { PaySlips } from '../../modules/payslips/types';
import {
  convertDateToReadableString,
  convertStringIsoDateToTimestamp,
} from '../dateConverters';

/**
 * Determines the file type based on the filename extension.
 *
 * @param {string} filename - The name of the file, including its extension.
 * @returns {'PDF Document' | 'Image File' | 'other type'} - Returns the type of file:
 * - 'PDF Document' for `.pdf` files,
 * - 'Image File' for common image extensions (`jpg`, `jpeg`, `png`, `gif`, `bmp`, `webp`, `tiff`),
 * - 'other type' for all other file types.
 *
 * @example
 * getFileType('document.pdf'); // returns 'PDF Document'
 * getFileType('photo.jpeg');   // returns 'Image File'
 * getFileType('archive.zip');  // returns 'other type'
 */
export const getFileType = (
  filename: string,
): 'PDF Document' | 'Image File' | 'other type' => {
  const ext = filename.split('.').pop()?.toLowerCase() || '';

  if (ext === 'pdf') return 'PDF Document';

  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff'].includes(ext))
    return 'Image File';

  return 'other type';
};

/**
 * Sorts an array of payslips by `fromDate` in descending order (latest first).
 *
 * @param {PaySlips} items - Array of payslip objects.
 * @returns {PaySlips} - A new array sorted by `fromDate` descending.
 *
 * @example
 * descFromDateFilter([{fromDate: '2023-01-01'}, {fromDate: '2023-03-01'}])
 * // returns array with '2023-03-01' first
 */
export const descFromDateFilter = (items: PaySlips) => {
  return [...items].sort((a, b) => {
    const dateA = convertStringIsoDateToTimestamp(a.fromDate);
    const dateB = convertStringIsoDateToTimestamp(b.fromDate);
    return dateB - dateA;
  });
};

/**
 * Sorts an array of payslips by `fromDate` in ascending order (earliest first).
 *
 * @param {PaySlips} items - Array of payslip objects.
 * @returns {PaySlips} - A new array sorted by `fromDate` ascending.
 */
export const ascFromDateFilter = (items: PaySlips) => {
  return [...items].sort((a, b) => {
    const dateA = convertStringIsoDateToTimestamp(a.fromDate);
    const dateB = convertStringIsoDateToTimestamp(b.fromDate);
    return dateA - dateB;
  });
};

/**
 * Sorts an array of payslips by `toDate` in descending order (latest first).
 *
 * @param {PaySlips} items - Array of payslip objects.
 * @returns {PaySlips} - A new array sorted by `toDate` descending.
 */
export const desctoDateFilter = (items: PaySlips) => {
  return [...items].sort((a, b) => {
    const dateA = convertStringIsoDateToTimestamp(a.toDate);
    const dateB = convertStringIsoDateToTimestamp(b.toDate);
    return dateB - dateA;
  });
};

/**
 * Sorts an array of payslips by `toDate` in ascending order (earliest first).
 *
 * @param {PaySlips} items - Array of payslip objects.
 * @returns {PaySlips} - A new array sorted by `toDate` ascending.
 */
export const asctoDateFilter = (items: PaySlips) => {
  return [...items].sort((a, b) => {
    const dateA = convertStringIsoDateToTimestamp(a.toDate);
    const dateB = convertStringIsoDateToTimestamp(b.toDate);
    return dateA - dateB;
  });
};

/**
 * Sorts an array of payslips by `id` in ascending lexicographical order.
 *
 * @param {PaySlips} items - Array of payslip objects.
 * @returns {PaySlips} - A new array sorted by `id` ascending.
 */
export const ascIdFilter = (items: PaySlips) => {
  return [...items].sort((a, b) => a.id.localeCompare(b.id));
};

/**
 * Filters and sorts payslips in descending order by their ID.
 * @param items - The payslips collection to be sorted
 * @returns A new sorted array of payslips ordered by ID in descending order
 */
export const descIdFilter = (items: PaySlips) => {
  return [...items].sort((a, b) => b.id.localeCompare(a.id));
};

/**
 * Filters data by performing a case-insensitive global search.
 * @param data - The data string to search within.
 * @param query - The search query string to look for.
 * @returns True if the data contains the query (case-insensitive), false otherwise.
 */
export const globalSearchFilter = (data: string, query: string) => {
  return data.toLowerCase().includes(query.toLowerCase());
};

/**
 * Filters a collection of payslips based on a search query.
 *
 * @param items - The collection of payslips to filter
 * @param query - The search query string to match against payslip properties
 * @returns A filtered array of payslips that match the query. Returns all items if query is empty.
 *
 * @remarks
 * The filter matches against:
 * - Payslip ID
 * - File type (extracted from file name) and full file name
 * - Raw date values (fromDate and toDate)
 * - Human-readable formatted dates (fromDate and toDate)
 *
 * A payslip is included in results if it matches any of the above criteria.
 */
export const payslipSearchFilter = (items: PaySlips, query: string) => {
  if (!query) return items;
  return items.filter(item => {
    const matchesId = globalSearchFilter(item.id, query);
    const matchesFileType =
      globalSearchFilter(getFileType(item.file), query) ||
      globalSearchFilter(item.file, query);

    const matchesDate =
      globalSearchFilter(item.fromDate, query) ||
      globalSearchFilter(item.toDate, query);

    const matchesReadableDate =
      globalSearchFilter(convertDateToReadableString(item.fromDate), query) ||
      globalSearchFilter(convertDateToReadableString(item.toDate), query);

    return matchesId || matchesFileType || matchesDate || matchesReadableDate;
  });
};

export const searchFilter = (items: any[], key: string, query: string) => {
  return items.filter(item =>
    item[key].toLowerCase().includes(query.toLowerCase()),
  );
};
