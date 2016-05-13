var base, copy, localStorage, sessionStorage;

sessionStorage = window.sessionStorage || {};

localStorage = window.localStorage || {};

copy = function(o, sub) {
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

base = {
  set: function(key, value) {
    var e, error;
    try {
      return this[key] = JSON.stringify(value);
    } catch (error) {
      e = error;
      return this[key] = value;
    }
  },
  get: function(key, def) {
    var e, error, value;
    try {
      value = JSON.parse(this[key]);
    } catch (error) {
      e = error;
      value = this[key];
    }
    if (value === void 0 && def !== void 0) {
      this.set(key, def);
      return def;
    } else {
      return value;
    }
  },
  del: function(key) {
    return this.removeItem(key);
  }
};

module.exports = {
  session: copy(sessionStorage, base),
  local: copy(localStorage, base)
};

