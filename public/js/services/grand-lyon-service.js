angular.module('potholess')
.service("GrandLyon", function($http, $rootScope) {
	this.getTravaux = function() {
		//$http.get("https://download.data.grandlyon.com/ws/grandlyon/pvo_patrimoine_voirie.pvochantierperturbant/all.json")
		$http.get("https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&maxfeatures=30&request=GetFeature&typename=pvo_patrimoine_voirie.pvochantierperturbant&SRSNAME=urn:ogc:def:crs:EPSG::4171")
			.then(function(response) {
				console.log(response);
				$rootScope.$broadcast("Travaux_OK", response.data);
            }, function(response) {
                alert("Error services GrandLyon.");
            });
	};
});