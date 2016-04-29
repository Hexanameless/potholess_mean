angular.module('potholess')
.controller("MapController", [ '$scope', function($scope) {

    //centre la map sur Lyon
    angular.extend($scope, {
        center: {
            lat: 45.759722,
            lng: 4.84222,
            zoom: 13
        }
    });


}]);
