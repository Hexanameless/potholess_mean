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
    this.findVibrations = function(data) {
        return $http.post("/vibrations/find", data).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding corresponding vibrations.");
            });
    };
});
