var sessionStorage = window.sessionStorage || {};

var localStorage = window.localStorage || {};

function copy(o, sub) {
  var key, value;
  for (key in sub) {
    value = sub[key];
    if (typeof value === "function") {
      o.__proto__[key] = value;
    } else {
      o[key] = value;
    }
  }
  return o;
};

var storage = {
  set: function(key, value) {
    if (typeof value === "string") {
      this[key] = value;
    } else {
      this[key] = JSON.stringify(value);
    }
  },
  get: function(key, def) {
    try {
      var value = JSON.parse(this[key]);
    } catch (error) {
      value = this[key];
    }
    if (!value && def) {
      this.set(key, def);
      return def;
    };
    return value;
  },
  del: function(key) {
    return this.removeItem(key);
  }
};

module.exports = {
  session: copy(sessionStorage, storage),
  local: copy(localStorage, storage)
};
