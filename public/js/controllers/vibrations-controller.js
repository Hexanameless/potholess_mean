angular.module('potholess')
.controller("VibrationsController", function(vibrations, $scope, Vibrations) {
    $scope.vibrations = vibrations.data;
    // gestion vibration ici
    var exampleVibration = {
            0: {
                date: 0,
                lat: 0,
                lng: 0,
                val: 0
            },
            1: {
                date: 1,
                lat: 1,
                lng: 1,
                val: 1
            }
        };

    $scope.createVibration = function() {
        Vibrations.createVibration(exampleVibration).then(function(doc) {
            console.log(doc);
            $scope.vibrations.push(doc.data);
        }, function(response) {
            alert(response);
        });
    };

    $scope.deleteVibrations = function(contactId) {
        Vibrations.deleteVibrations().then(function(doc) {
            console.log(doc);
        }, function(response) {
            alert(response);
        });
    };
});
