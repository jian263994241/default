//多版本维护
(function() {
  /**
   * 版本比较 VersionCompare
   * @param {String} currVer 当前版本.
   * @param {String} promoteVer 比较版本.
   * @return {Boolean} false 当前版本小于比较版本返回 true.
   *
   * 使用
   * VersionCompare("6.3","5.2.5"); // false.
   * VersionCompare("6.1", "6.1"); // false.
   * VersionCompare("6.1.5", "6.2"); // true.
   */
  var VersionCompare = function(currVer, promoteVer) {
    currVer = currVer || "0.0.0";
    promoteVer = promoteVer || "0.0.0";
    if (currVer == promoteVer) return false;
    var currVerArr = currVer.split(".");
    var promoteVerArr = promoteVer.split(".");
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
      var proVal = ~~promoteVerArr[i],
        curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return false;
      } else if (proVal > curVal) {
        return true;
      }
    }
    return false;
  };

  var ua = navigator.userAgent.toLowerCase();

  var env = function() {
    return {
      Weixin: ua.match(/MicroMessenger/i) == 'micromessenger',
      IOS: ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1,
      Android: ua.indexOf('android') > -1,
      KQ: ua.indexOf('kuaiqianbao') > -1,
      FeiFan: ua.indexOf('feifan') > -1
    };
  }();

  //所在快钱包版本
  var appVersion = function() {
    if (env.KQ) {
      ua.match(/kuaiqianbao\/([1-9.]+)/)
      return RegExp.$1;
    } else {
      return null;
    }
  }();

  var initVersion = function(version) {
    var href = location.href;
    href = href.replace(/default\.html/, version + '/default.html');
    location.replace(href);
  };

  var versions = ['1.0.0'];
  //2.9.3 以前 用 1.0.0  不包含2.9.3
  var appVersionTag = {
    '2.9.3': '1.0.0'
  }

  if (appVersion) {
    for (var appV in appVersionTag) {
      if (VersionCompare(appVersion, appV)) {
        initVersion(appVersionTag[appV]);
      } else {
        initVersion(versions[versions.length - 1]);
      }
    }
  } else {
    //默认加载最后一个版本
    initVersion(versions[versions.length - 1]);
  }

})();
