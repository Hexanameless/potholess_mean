angular.module('potholess')
.service("OpenStreetMap", function($http) {
    this.reverseLocation = function(lat, lng) {
        var url = 'http://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+lng+'&zoom=18&addressdetails=1';
        
        return $http.get(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error services OpenStreetMap.");
            });
    };
});
