angular.module("contactsApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    contacts: function(Contacts) {
                        return Contacts.getContacts();
                    }
                }
            })
            .when("/new/contact", {
                controller: "NewContactController",
                templateUrl: "contact-form.html"
            })
            .when("/contact/:contactId", {
                controller: "EditContactController",
                templateUrl: "contact.html"
            })
            .when("/vibrations", {
                templateUrl: "vibrations.html",
                controller: "VibrationsController",
                resolve: {
                    vibrations: function(Vibrations) {
                        return Vibrations.getVibrations();
                    }
                }
            })
            .otherwise({
                redirectTo: "/"
            });
    })
    .service("Contacts", function($http) {
        this.getContacts = function() {
            return $http.get("/contacts").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding contacts.");
                });
        }
        this.createContact = function(contact) {
            return $http.post("/contacts", contact).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating contact.");
                });
        }
        this.getContact = function(contactId) {
            var url = "/contacts/" + contactId;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this contact.");
                });
        }
        this.editContact = function(contact) {
            var url = "/contacts/" + contact._id;
            console.log(contact._id);
            return $http.put(url, contact).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this contact.");
                    console.log(response);
                });
        }
        this.deleteContact = function(contactId) {
            var url = "/contacts/" + contactId;
            return $http.delete(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error deleting this contact.");
                    console.log(response);
                });
        };

    })
    .service("Vibrations", function($http) {
        this.getVibrations = function() {
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
    })
    .controller("VibrationsController", function(vibrations, $scope, $route, Vibrations) {
        $scope.vibrations = vibrations.data;

        var tabExampleVibration = [
                {
                    date: "2016-29-4",
                    lat: 0,
                    lng: 0,
                    val: 0
                },
                {
                    date: "2016-29-4",
                    lat: 1,
                    lng: 1,
                    val: 1
                }
            ];

        $scope.createVibration = function() {
            Vibrations.createVibration(tabExampleVibration).then(function(doc) {
                console.log(doc);
                $route.reload();
            }, function(response) {
                alert(response);
            });
        };

        $scope.deleteVibrations = function(contactId) {
            Vibrations.deleteVibrations().then(function(doc) {
                console.log(doc);
                $route.reload();
            }, function(response) {
                alert(response);
            });
        };
    });