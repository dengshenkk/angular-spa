
  var app = angular.module('serviceM', []);


  //配置基本url
  app.value('baseUrl', 'https://api.douban.com/v2/movie/');

  //====================================================================
  app.service('myHttp', ['$window', function ($window) {
    this.jsonp = function (url, params, callback) {
      //声明一个方法 , 添加一个script 设置url
      var callbackName = 'callback' + new Date().getTime();
      //callback123131313

      $window[callbackName] = function (res) {
        callback(res)
        $window.document.body.removeChild(newScript)
      };
      //创建一个标签
      var newScript = $window.document.createElement('script');

      // 格式化参数
      var queryString = '';

      for (var k in params) {
        queryString += k + '=' + params[k] + '&';
      }
      queryString += 'callback=' + callbackName;
      //name=jack&age=12&callback=calback12321313

      url += '?apiKey=0b2bdeda43b5688921839c8ecb20399b&' + queryString;
      //url?key=12313&name=jack&age=12&callback=calback12321313
      console.log(url);
      newScript.src = url
      //插入标签
      $window.document.body.appendChild(newScript)
    }
  }])

