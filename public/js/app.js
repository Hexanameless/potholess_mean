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
                        return Vibrations.getAllVibrations();
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
        this.getAllVibrations = function() {
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
        this.findVibrations = function(data) {
            return $http.post("/vibrations/find", data).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding corresponding vibrations.");
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
                    date: "2016-28-04",
                    lat: 45.782013333,
                    lng: 4.872431667,
                    val: 1.2
                },
                {
                    date: "2016-29-04",
                    lat: 45.78202,
                    lng: 4.872432,
                    val: 2.2
                },
                {
                    date: "2016-30-04",
                    lat: 45.7823,
                    lng: 4.872431,
                    val: 2.5
                },
                {
                    date: "2016-01-05",
                    lat: 45.78201,
                    lng: 4.872431,
                    val: 3.2
                },
                {
                    date: "2016-02-05",
                    lat: 45.7820134,
                    lng: 4.8724319,
                    val: 4.1
                },
                {
                    date: "2016-03-05",
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
            Vibrations.findVibrations(vibration).then(function(doc) {
                console.log(doc);
                $scope.vibrations = doc.data;
            }, function(response) {
                alert(response);
            });
        };
    });