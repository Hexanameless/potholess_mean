angular.module("potholess", ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/list.html",
            controller: "ListController",
            resolve: {
                contacts: function(Contacts) {
                    return Contacts.getContacts();
                }
            }
        })
        .when("/new/contact", {
            controller: "NewContactController",
            templateUrl: "views/contact-form.html"
        })
        .when("/contact/:contactId", {
            controller: "EditContactController",
            templateUrl: "views/contact.html"
        })
        .when("/vibrations", {
            templateUrl: "views/vibrations.html",
            controller: "VibrationsController",
            resolve: {
                vibrations: function(Vibrations) {
                    return Vibrations.getAllVibrations();
                }
            }
        })
        .when("/map", {
            templateUrl: "views/leaflet-map.html",
            controller: "MapController",
            resolve: {
                vibrations: function(Vibrations) {
                    return Vibrations.getAllVibrations();
                }
            }
        })
        .otherwise({
            redirectTo: "/"
        });
})


    .controller("ListController", function(contacts, $scope) {
        $scope.contacts = contacts.data;
    })

.controller("NewContactController", function($scope, $location, Contacts) {
    $scope.back = function() {
        $location.path("#/");
    }

    $scope.saveContact = function(contact) {
        Contacts.createContact(contact).then(function(doc) {
            var contactUrl = "/contact/" + doc.data._id;
            $location.path(contactUrl);
        }, function(response) {
            alert(response);
        });
    }
})
.controller("EditContactController", function($scope, $routeParams, Contacts) {
    Contacts.getContact($routeParams.contactId).then(function(doc) {
        $scope.contact = doc.data;
    }, function(response) {
        alert(response);
    });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.contactFormUrl = "contact-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.saveContact = function(contact) {
            Contacts.editContact(contact);
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.deleteContact = function(contactId) {
            Contacts.deleteContact(contactId);
        }
});
