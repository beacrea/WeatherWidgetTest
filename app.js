// App Decalaration
var app = angular.module('WeatherApp', []);

// Controllers
app.controller('WidgetCtrl', ['$scope', function($scope){
    $scope.message="Yo";
}]);