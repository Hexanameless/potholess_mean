angular.module('potholess')
.controller("VibrationsController", function(vibrations, $scope, $route, Vibrations) {
    $scope.vibrations = vibrations.data;

    var tabExampleVibration = [
            {
                date: "2016-29-4",
                lat: 45.782013333,
                lng: 4.872431667,
                val: 1.2
            },
            {
                date: "2016-29-4",
                lat: 45.78202,
                lng: 4.872432,
                val: 2.2
            },
            {
                date: "2016-29-4",
                lat: 45.7823,
                lng: 4.872431,
                val: 2.5
            },
            {
                date: "2016-29-4",
                lat: 45.78201,
                lng: 4.872431,
                val: 3.2
            },
            {
                date: "2016-29-4",
                lat: 45.7820134,
                lng: 4.8724319,
                val: 4.1
            },
            {
                date: "2016-29-4",
                lat: 45.7820105,
                lng: 4.87243105,
                val: 5
            }
        ];

    $scope.createVibration = function() {
        Vibrations.createVibration(tabExampleVibration).then(function(doc) {
            $route.reload();
        }, function(response) {
            alert(response);
        });
    };

    $scope.deleteVibrations = function() {
        Vibrations.deleteVibrations().then(function(doc) {
            $route.reload();
        }, function(response) {
            alert(response);
        });
    };

    $scope.findVibrations = function(vibration) {
        console.log("FRONT findVibrations", vibration);
        Vibrations.findVibrations(vibration).then(function(doc) {
            console.log(doc);
            $scope.vibrations = doc.data;
        }, function(response) {
            alert(response);
        });
    };
});