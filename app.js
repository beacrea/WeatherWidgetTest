// App Decalaration
var app = angular.module('WeatherApp', ['ngResource']);

// Factories
app.factory('Forecast', function($resource) {
    return $resource('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22mclean%2Cva%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');
});

// Services
app.service('codeService', function() {
    var codeList = {
        '0' : 'tornado',
        '1' : 'day-storm-showers',
        '2' : 'hurricane',
        '3' : 'thunderstorm',
        '4' : 'thunderstorm',
        '5' : 'rain-mix',
        '6' : 'rain-mix',
        '7' : 'rain-mix',
        '8' : 'hail',
        '9' : 'showers',
        '10' : 'hail',
        '11' : 'showers',
        '12' : 'showers',
        '13' : 'snow',
        '14' : 'day-snow',
        '15' : 'snow-wind',
        '16' : 'snow',
        '17' : 'hail',
        '18' : 'rain-mix',
        '19' : 'dust',
        '20' : 'fog',
        '21' : 'windy',
        '22' : 'smoke',
        '23' : 'strong-wind',
        '24' : 'strong-wind',
        '25' : 'snowflake-cold',
        '26' : 'cloudy',
        '27' : 'night-cloudy',
        '28' : 'day-cloudy',
        '29' : 'night-cloudy',
        '30' : 'day-cloudy',
        '31' : 'night-clear',
        '32' : 'day-sunny',
        '33' : 'night-partly-cloudy',
        '34' : 'day-sunny-overcast',
        '35' : 'rain-mix',
        '36' : 'hot',
        '37' : 'day-storm-showers',
        '38' : 'day-storm-showers',
        '39' : 'day-storm-showers',
        '40' : 'showers',
        '41' : 'snow-wind',
        '42' : 'snow',
        '43' : 'snow-wind',
        '44' : 'day-sunny-overcast',
        '45' : 'day-storm-showers',
        '46' : 'snow',
        '47' : 'day-storm-showers',
        '3200' : 'stars'
    };

    this.matchCode = function(code) {
        return codeList[code];
    };
});

// Controllers
app.controller('WidgetCtrl', ['$scope', 'Forecast', 'codeService', function($scope, Forecast, codeService){
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
        $scope.icon = 'wi-' + codeService.matchCode(45);

        // Widget Ready Status
        $scope.widgetReady = true;
    }, function(error) {
        $scope.message = "Error retrieving forecast";
        console.log('There was an error with the weather endpoint');
    });
}]);