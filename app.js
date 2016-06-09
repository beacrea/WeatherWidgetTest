// App Decalaration
var app = angular.module('WeatherApp', ['ngResource']);

// Factories
app.factory('Forecast', function($resource) {
    return $resource('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22mclean%2Cva%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');
});

// Controllers
app.controller('WidgetCtrl', ['$scope', 'Forecast', function($scope, Forecast){
    // Widget Ready Status
    $scope.message = 'loading...';
    $scope.widgetReady = false;

    // Get Forecast
    Forecast.get(function(data) {
        // All Data
        var forecast = data.query.results.channel;

        // Location
        $scope.city = forecast.location.city;
        $scope.state = forecast.location.region;

        // Current Conditions
        $scope.currentTemp = forecast.item.condition.temp;

        // Widget Ready Status
        $scope.widgetReady = true;
    }, function(error) {
        $scope.message = "Error retrieving forecast";
        console.log('There was an error with the weather endpoint');
    });
}]);