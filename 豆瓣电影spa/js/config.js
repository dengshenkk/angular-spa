var app = angular.module('configM', []);

//配置电影路由
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/movie/:type', {
        templateUrl: 'movie.html',
        controller: 'MovieController',
    }).when('/detail/:id', {
        //详情页面
        templateUrl: 'movie_detail_tpl.html',
        controller: 'DetailController'
    }).otherwise({
        redirectTo: '/movie/in_theaters',
    })
}]);

//配置音乐路由
// app.config(['$routeProvider', function ($routeProvider) {
//   $routeProvider.when('/music/:type', {
//     templateUrl: 'movie.html',
//     controller: 'MusicController'
//   }).otherwise({
//     redirectTo: '/music/'
//   })
// }])


//设置白名单
app.config(['$sceDelegateProvider', function ($secDelegateProvider) {
    $secDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.douban.com/**'
    ]);
}]);


