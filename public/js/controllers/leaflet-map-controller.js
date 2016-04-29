angular.module('potholess')
.controller("MapController", function(vibrations, $scope) {

    //centre la map sur Lyon
    angular.extend($scope, {
        center: {
            lat: 45.759722,
            lng: 4.84222,
            zoom: 13
        }
    });

    //récupère la liste des vibrations de la bd
    $scope.vibrations = vibrations.data;

    $scope.addPoints = function() {
        L.circle([45.779072,4.841700], 3, {
  			color: 'red',
  			fillColor: '#f03',
  			fillOpacity: 0.5
  		}).addTo(document.getElementById('mapid'));
    };
});
