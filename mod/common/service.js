var baseUrl = 'http://192.168.47.40:8128/app-loan-website';

var contentType = 'application/json;chartset=UTF-8';

module.exports = {
  getData: function(data, callback) {
    var url = baseUrl + '/credit/hasPassed.htm';
    app.showIndicator();
    $$.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      data: data,
      success: function(data) {
        app.hideIndicator();
        callback(data);
      }
    });
  },
  postData: function(data, callback) {
    var url = baseUrl + '/credit/resendValidCode.htm';
    app.showIndicator();
    $$.ajax({
      url: url,
      method: 'GET',
      contentType: contentType,
      dataType: 'json',
      data: data,
      success: function(data) {
        app.hideIndicator();
        callback(data);
      }
    });
  }
}
