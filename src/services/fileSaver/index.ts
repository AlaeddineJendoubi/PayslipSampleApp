import { NativeModules, Platform } from 'react-native';

const { FileSaver } = NativeModules;

if (!FileSaver) {
  console.error(
    'FileSaver native module is not linked. Did you rebuild the app after adding the native code?',
  );
}

/**
 * File Saver Module
 * Save bundled files to device storage
 */
const FileSaverManager = {
  /**
   * Save a bundled file to device storage
   * @param {string} fileName - Name of the file in the bundle
   * @param {string} destinationPath - Relative path where to save
   * @returns {Promise<string>} Absolute path where file was saved
   */
  saveBundledFile: async (fileName: string): Promise<string> => {
    if (!FileSaver) {
      throw new Error('FileSaver module not available');
    }

    if (!fileName) {
      throw new Error('File name not provided');
    }
    if (Platform.OS === 'ios') {
      try {
        const documentDirctory = await FileSaver.getDocumentsDirectory();

        const path = await FileSaver.saveFile(fileName, documentDirctory);

        return path;
      } catch (error) {
        throw error;
      }
    }

    try {
      const documentDirctory = await FileSaver.getDocumentsDirectory();
      const filePath = `${documentDirctory}/${fileName}`;

      const exists = await FileSaver.fileExists(filePath);

      if (!exists) {
        const path = await FileSaver.saveFile(fileName);

        return path;
      } else {
        throw new Error('File already saved');
      }
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get the documents directory path
   * @returns {Promise<string>} Documents directory path
   */
  getDocumentsDirectory: async (): Promise<string> => {
    if (!FileSaver) {
      throw new Error('FileSaver module not available');
    }

    return await FileSaver.getDocumentsDirectory();
  },

  /**
   * Check if a file exists
   * @param {string} filePath - Absolute path to check
   * @returns {Promise<boolean>} True if exists
   */
  fileExists: async (filePath: string): Promise<boolean> => {
    if (!FileSaver) {
      throw new Error('FileSaver module not available');
    }

    return await FileSaver.fileExists(filePath);
  },
};

export default FileSaverManager;
