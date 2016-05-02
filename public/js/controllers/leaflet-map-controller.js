angular.module('potholess')
.controller("MapController", function(vibrations, Vibrations, $scope, $routeParams, $filter) {

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
    var circles;

    //définition des couleurs
    couleurs = ['green', 'yellow', 'orange', 'red', 'black'];
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery ? <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
    addPoints();

    //slider
    $scope.formMap = {};
    $scope.formMap.val = 1;
    $scope.$watch('formMap.sliderValue', function() {
        $scope.couleurSlider = {color : couleurs[Math.round($scope.formMap.val)-1] };
    });


    //ajoute les points de $scope.vibrations à la map
    function addPoints() {
        circles = L.layerGroup();

        for (var i = 0; i < $scope.vibrations.length; i++) {
            var colorVal = couleurs[Math.round($scope.vibrations[i].val) - 1];
            var circle = L.circle([$scope.vibrations[i].lat, $scope.vibrations[i].lng], 3, {
                color: colorVal,
                fillOpacity: 0.8
            }).addTo(circles);
        }
        circles.addTo(mymap);
    };

    //get vibrations selon le formulaire
    $scope.getVibrations = function(filters) {
        Vibrations.getVibrations(filters.val, $filter('date')(filters.minDate, 'yyyy-MM-dd'), $filter('date')(filters.maxDate, 'yyyy-MM-dd')).then(function(doc) {
            $scope.vibrations = doc.data;
            mymap.removeLayer(circles);
            addPoints();
        }, function(response) {
            alert(response);
        });
    };
});
