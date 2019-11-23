/**
 * String utilities
 * @autor vutreras
 */

module.exports = {

  isEmpty(str) {
    return (!str || 0 === str.length);
  },

  isBlank(str) {
    return (!str || /^\s*$/.test(str));
  },

  deleteAllBlankSpaces(str) {
    if (str == undefined) {
      return str;
    }
    return str.toString().replace(/\s+/g, '');
  },

  formatNumber(num) {
    if (num == undefined) {
      return num;
    }
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  },

  isBoolean(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  },

  toBoolean(obj, defaultValue = undefined) {
    if (obj == undefined || this.isBlank(obj)) {
      return defaultValue;
    }
    if ('true' === obj.toString().trim().toLowerCase()) {
      return true;
    }
    if ('false' === obj.toString().trim().toLowerCase()) {
      return false;
    }
    return defaultValue;
  },

  toNumber(obj, defaultValue = undefined) {
    if (isNaN(obj) || this.isBlank(obj)) {
      return defaultValue;
    }
    return Number(obj);
  },

  toInt(obj, defaultValue = undefined) {
    if (isNaN(obj) || this.isBlank(obj)) {
      return defaultValue;
    }
    return parseInt(obj);
  }
};
