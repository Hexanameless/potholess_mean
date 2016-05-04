angular.module('potholess')
.controller("MapController", function(vibrations, Vibrations, OpenStreetMap, GrandLyon, $timeout, $rootScope, $scope, $routeParams, $filter) {

    $scope.travauxLoaded = false;

    GrandLyon.getTravaux();
    $rootScope.$on('Travaux_OK', function(event, args) {
        $scope.travaux = args.features;
        $scope.travauxLoaded = true;
    });

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
    var polygons;

    //définition des couleurs
    couleurs = ['#FFB114', '#E86E0C', '#FF2F00', '#E8013C', 'black'];
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
    $scope.$watch('formMap.val', function() {
        $scope.couleurSlider = {color : couleurs[Math.round($scope.formMap.val)-1] };
    });


    $scope.texteValider = "Valider";
    $scope.vibrationsLoaded = true;

    //ajoute les points de $scope.vibrations à la map
    function addPoints() {

        $scope.texteValider = "Chargement";
        $scope.vibrationsLoaded = false;

        circles = L.layerGroup();

        for (var i = 0; i < $scope.vibrations.length; i++) {
            var colorVal = couleurs[Math.round($scope.vibrations[i].val) - 1];
            var circle = L.circle([$scope.vibrations[i].lat, $scope.vibrations[i].lng], 3, {
                color: colorVal,
                fillOpacity: 0.8
            }).addTo(circles);
            circle.bindPopup("<b>Date : </b>"+$filter('date')($scope.vibrations[i].date, 'dd/MM/yyyy') + "<br>"+"<b>Intensité : </b>"+$scope.vibrations[i].val + "<br>"+"<b>Vitesse : </b>" + $scope.vibrations[i].spd + " km/h");
        }
        circles.addTo(mymap);

        $scope.texteValider = "Valider";
        $scope.vibrationsLoaded = true;
    }

    var city, road;
    $scope.reverseLocation = function(lat, lng) {
        OpenStreetMap.reverseLocation(lat, lng).then(function(doc) {
            city = doc.data.address.city;
            road = doc.data.address.road;
        }, function(response) {
            alert(response);
        });
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

	 //Affiche satellite

    $scope.satAffiche = false;

    $scope.showSat = function() {
        $scope.satAffiche = !$scope.satAffiche;
        googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(mymap);
    }

    $scope.hideSat = function() {
        $scope.satAffiche = !$scope.satAffiche;
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery ? <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
    }

    //Gestion des travaux
    $scope.texteHide = "Masquer travaux";
    $scope.texteShow = "Afficher travaux";
    $scope.travauxAffiche = false;

    $scope.hideTravaux = function() {
        $scope.texteHide = "Chargement";
        $scope.travauxAffiche = !$scope.travauxAffiche;
        mymap.removeLayer(polygons);
        $scope.texteHide = "Masquer travaux";
    };

    $scope.showTravaux = function() {
        $scope.texteShow = "Chargement";
        $scope.travauxAffiche = !$scope.travauxAffiche;
        polygons = L.layerGroup();
        var chantier;
        var polygon;
        for(var i=0; i<$scope.travaux.length; i++) {
            chantier = [];
            for(var j=0; j<$scope.travaux[i].geometry.coordinates.length; j++) {
                for(var k=0; k<$scope.travaux[i].geometry.coordinates[j].length; k++) {
                    chantier.push([ $scope.travaux[i].geometry.coordinates[j][k][1] , $scope.travaux[i].geometry.coordinates[j][k][0] ]);
                }

            }
            polygon = L.polygon(chantier).addTo(polygons);
        }
        polygons.addTo(mymap);
        $scope.texteShow = "Afficher travaux";
    };
});
