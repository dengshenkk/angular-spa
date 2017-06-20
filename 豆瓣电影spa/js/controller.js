var app = angular.module('controllerM', []);

app.controller('AppController', ['$scope', function ($scope) {
    $scope.title = '豆瓣'
}])


//配置movie控制器
app.controller('MovieController', ['$scope', '$routeParams', 'baseUrl', 'myHttp', function ($scope, $routeParams, baseUrl, myHttp) {

    //获取点击时a标签的值
    var url = baseUrl + $routeParams.type;

    console.log($routeParams.type)
    //设置参数
    const params = {
        start: 0,
        count: 5,
    };
    $scope.isLoading = true;
    $scope.isOver = false;
    $scope.isNext = true;

    $scope.loadData = function (start) {
        var params = {
            start: start,
            count: 5,
        };
        myHttp.jsonp(url, params, function (res) {
            $scope.res = res;
            $scope.isLoading = false;
            $scope.totalPage = Math.ceil(res.total / $scope.count);
            //强制刷新
            $scope.$apply()
        });
    }

    //一进来手动调用一次
    $scope.loadData(0);

    $scope.curPage = 1;
    $scope.count = 5;
    $scope.page = function (type) {



        if (type) {
            $scope.curPage--;
        } else {
            $scope.curPage++;
        }
        ;
        $scope.isOver = $scope.curPage == 1 ? false : true;
        $scope.isNext = $scope.curPage == $scope.totalPage ? false : true;
        var start = ($scope.curPage - 1) * $scope.count;
        $scope.loadData(start)
    }

    //发送请求
    myHttp.jsonp(url, params, function (res) {
        $scope.isLoading = false;
        $scope.res = res;
        console.log(res);
        document.body.scrollTop = 0 + 'px';
        //强制更新界面;调用脏值检测方法
        $scope.$apply();
    })


}]);


//配置详情页面的控制器
app.controller('DetailController', ['$scope', 'myHttp', '$routeParams', function ($scope, myHttp, $routeParams) {

    //默认点击时是隐藏,当下面发送请求有返回值时显示
    $scope.isLoading1 = true;
    //获取点击的id
    var id = $routeParams.id;
    var url = "http://api.douban.com/v2/movie/subject/" + id;
    myHttp.jsonp(url, null, function (res) {
        $scope.isLoading1 = false;
        $scope.res = res;
        console.log(res);
        //强制刷新,强制脏值检测
        $scope.$apply();
    })
}])