var session;

session = window.sessionStorage || {};

module.exports = {
  set: function(key, value) {
    var e;
    try {
      return session[key] = JSON.stringify(value);
    } catch (_error) {
      e = _error;
      return session[key] = value;
    }
  },
  get: function(key, def) {
    var e, value;
    try {
      value = JSON.parse(session[key]);
    } catch (_error) {
      e = _error;
      value = session[key];
    }
    if (value === void 0 && def !== void 0) {
      this.set(key, def);
      return def;
    } else {
      return value;
    }
  }
};
