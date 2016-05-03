angular.module('potholess')
.service("Vibrations", function($http) {
    this.getAllVibrations = function() {
        return $http.get("/vibrations").
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding vibrations.");
            });
    };
    this.createVibration = function(data) {
        return $http.post("/vibrations", data).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error creating data.");
            });
    };
    this.deleteVibrations = function() {
        return $http.delete("vibrations").
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error deleting vibrations.");
                console.log(response);
            });
    };
    this.getVibrations = function(val, minDate, maxDate) {
        if(minDate != null && maxDate != null) {
            var url = "/vibrations/" + val + "/" + minDate + "/" + maxDate;
        } else {
            var url = "/vibrations/" + val;
        }

        return $http.get(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding vibrations.");
            });
    };
    this.getVibrationsFromLatLng = function(minLat,maxLat, minLng, maxLng) {
        var url = "/vibrations/"+minLat+"/"+minLng+"/"+maxLat+"/"+maxLng;
        return $http.get(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding vibrations.");
            });
    };
});
