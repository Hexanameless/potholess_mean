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

    //récupère la map
    var mymap = L.map('mapid').setView([45.759722, 4.84222], 13);
    //définition des couleurs
    var couleurs = ['green', 'yellow', 'orange', 'red', 'black'];
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery ? <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
    addPoints();

    //ajoute les points de $scope.vibrations à la map
    function addPoints() {
        for (var i = 0; i < $scope.vibrations.length; i++) {
            var colorVal = couleurs[Math.round($scope.vibrations[i].val) - 1];
            var circle = L.circle([$scope.vibrations[i].lat, $scope.vibrations[i].lng], 3, {
                color: colorVal,
                fillOpacity: 0.8
            }).addTo(mymap);
        }
    };
});
