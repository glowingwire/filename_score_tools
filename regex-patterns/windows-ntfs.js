/**
 * Windows NTFS Filename Validation Regex and Helper Functions
 * 
 * These patterns validate filenames for compatibility with Windows NTFS filesystem.
 * NTFS has specific restrictions on valid characters, length, and reserved names.
 */

/**
 * Regex pattern to detect invalid NTFS characters
 * Invalid characters: < > : " / \ | ? *
 * Also rejects control characters (0x00-0x1F)
 */
const INVALID_CHARS_PATTERN = /[\x00-\x1F<>:"|?*\\\/]/;

/**
 * Regex pattern to detect reserved NTFS names (case-insensitive)
 * Reserved names: CON, PRN, AUX, NUL, COM1-9, LPT1-9
 */
const RESERVED_NAMES_PATTERN = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.[^.]*)?$/i;

/**
 * Regex pattern to detect trailing spaces or periods
 * Filenames cannot end with space or period in NTFS
 */
const TRAILING_SPACE_PERIOD_PATTERN = /[\s.]$/;

/**
 * Comprehensive NTFS filename validation regex
 * Returns true only if filename is valid for NTFS
 */
const NTFS_VALID_FILENAME_PATTERN = /^(?!.*[\x00-\x1F<>:"|?*\\\/])(?!.*[\s.]$)(?!^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.[^.]*)?)(.+)$/i;

/**
 * Check if a filename contains invalid NTFS characters
 * @param {string} filename - The filename to validate
 * @returns {boolean} - True if filename contains invalid characters
 */
function hasInvalidCharacters(filename) {
  return INVALID_CHARS_PATTERN.test(filename);
}

/**
 * Check if a filename is a reserved NTFS name
 * @param {string} filename - The filename to validate
 * @returns {boolean} - True if filename is a reserved name
 */
function isReservedName(filename) {
  // Extract name without extension for reserved name check
  const nameWithoutExtension = filename.split('.')[0];
  return RESERVED_NAMES_PATTERN.test(nameWithoutExtension);
}

/**
 * Check if a filename ends with space or period
 * @param {string} filename - The filename to validate
 * @returns {boolean} - True if filename ends with space or period
 */
function hasTrailingSpaceOrPeriod(filename) {
  return TRAILING_SPACE_PERIOD_PATTERN.test(filename);
}

/**
 * Check if a filename exceeds maximum length
 * @param {string} filename - The filename to validate
 * @returns {boolean} - True if filename is too long (> 255 characters)
 */
function isTooLong(filename) {
  return filename.length > 255;
}

/**
 * Comprehensive check if a filename is compatible with Windows NTFS
 * @param {string} filename - The filename to validate
 * @returns {boolean} - True if filename is valid for NTFS
 */
function isWindowsNTFSCompatible(filename) {
  if (!filename || typeof filename !== 'string') {
    return false;
  }

  return !hasInvalidCharacters(filename) &&
         !isReservedName(filename) &&
         !hasTrailingSpaceOrPeriod(filename) &&
         !isTooLong(filename) &&
         filename.length > 0;
}

/**
 * Get detailed validation report for a filename
 * @param {string} filename - The filename to validate
 * @returns {object} - Validation report with all checks
 */
function getValidationReport(filename) {
  return {
    filename,
    isValid: isWindowsNTFSCompatible(filename),
    hasInvalidCharacters: hasInvalidCharacters(filename),
    isReservedName: isReservedName(filename),
    hasTrailingSpaceOrPeriod: hasTrailingSpaceOrPeriod(filename),
    isTooLong: isTooLong(filename),
    isEmpty: !filename || filename.length === 0,
    length: filename ? filename.length : 0
  };
}

// Export for Node.js/CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    INVALID_CHARS_PATTERN,
    RESERVED_NAMES_PATTERN,
    TRAILING_SPACE_PERIOD_PATTERN,
    NTFS_VALID_FILENAME_PATTERN,
    hasInvalidCharacters,
    isReservedName,
    hasTrailingSpaceOrPeriod,
    isTooLong,
    isWindowsNTFSCompatible,
    getValidationReport
  };
}

// Export for ES6 modules
if (typeof exports !== 'undefined') {
  exports.INVALID_CHARS_PATTERN = INVALID_CHARS_PATTERN;
  exports.RESERVED_NAMES_PATTERN = RESERVED_NAMES_PATTERN;
  exports.TRAILING_SPACE_PERIOD_PATTERN = TRAILING_SPACE_PERIOD_PATTERN;
  exports.NTFS_VALID_FILENAME_PATTERN = NTFS_VALID_FILENAME_PATTERN;
  exports.hasInvalidCharacters = hasInvalidCharacters;
  exports.isReservedName = isReservedName;
  exports.hasTrailingSpaceOrPeriod = hasTrailingSpaceOrPeriod;
  exports.isTooLong = isTooLong;
  exports.isWindowsNTFSCompatible = isWindowsNTFSCompatible;
  exports.getValidationReport = getValidationReport;
}
