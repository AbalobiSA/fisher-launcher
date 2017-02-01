angular.module('app.services', [])

.service('Storage', [function($localStorage) {

    var app = {}
    app.store = function() {

        var confirm = window.confirm("Offline Store?")
        if (confirm == true) {
            // $localStorage.user = angular.copy(userinfo.getInfo());
            alert("Information has been stored")
        }
    }
    app.clear = function() {
        // $localStorage.$reset()
    }
    return app;
}])