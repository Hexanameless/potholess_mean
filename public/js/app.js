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
            .when("/datas", {
                templateUrl: "datas.html",
                controller: "DatasController",
                resolve: {
                    datas: function(Datas) {
                        return Datas.getDatas();
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
    .service("Datas", function($http) {
        this.getDatas = function() {
            return $http.get("/datas").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding datas.");
                });
        };
        this.createData = function(data) {
            return $http.post("/datas", data).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating data.");
                });
        };
        this.deleteDatas = function() {
            return $http.delete("datas").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error deleting datas.");
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
    .controller("DatasController", function(datas, $scope, Datas) {
        $scope.datas = datas.data;

        var exampleData = {
                    latitude: 1,
                    longitude:2,
                    magnitude: 3
                };

        $scope.createData = function() {
            Datas.createData(exampleData).then(function(doc) {
                console.log(doc);
                $scope.datas.push(doc.data);
            }, function(response) {
                alert(response);
            });
        };

        $scope.deleteDatas = function(contactId) {
            Datas.deleteDatas().then(function(doc) {
                console.log(doc);
            }, function(response) {
                alert(response);
            });
        };
    });