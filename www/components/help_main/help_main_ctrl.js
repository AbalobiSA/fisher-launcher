angular.module('app.controllers').controller('help_mainCtrl',
    function($scope, $http, $cordovaAppVersion, $location, $state, $translate) {

    $scope.issues = [
        'ISSUE_LOGGIN_CATCH',
        'ISSUE_ANALYTICS',
        'ISSUE_MESSAGING',
        'ISSUE_CALCULATOR',
        'ISSUE_WEATHER',
        'ISSUE_LOGBOOK',
        'ISSUE_OTHER',
    ];
    $scope.desc = {};
    $scope.selected = {};

    $scope.openfn = __secrets.urls.openfn;

    $scope.$on('$ionicView.enter', function() {
    	//Do some things when view is entered
    });

    $scope.sendIssue = function () {

        if ($scope.selected.text === undefined || $scope.selected.text.trim().length === 0) {
            alert('Please select an issue!');
        } else if ($scope.desc.text === undefined || $scope.desc.text.trim().length === 0) {
            alert('Please add a description.');
        } else {
            // console.log($scope.desc.text.trim());
            // console.log($scope.selected.text.trim());

            $http({
                method: 'POST',
                url: $scope.openfn,
                data: {
                    'issue_filter': 'fisher_app',
                    'type': $scope.selected.text === undefined ? '' : $scope.selected.text.trim(),
                    'desc': $scope.desc.text === undefined ? '' : $scope.desc.text.trim()
                }
            }).then(function (resp) {
                alert('Thank you! Your issue has been logged.');
                console.log('Your issue has been sent.');
            }, function (err) {
                alert('Your issue could not be sent!');
                console.log('Your issue has failed to send');
            });
        }
    }
});
