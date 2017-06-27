angular.module('app.controllers').controller('help_mainCtrl', function($scope, $http, $cordovaAppVersion, $location, $state, $translate) {

    $scope.issues = [
        'Issue 1',
        'Issue 2',
        'Issue 3',
        'Issue 4',
        'Issue 5',
        'Issue 6',
        'Issue 7',
        'Issue 8',
        'Other'
    ];
    $scope.desc = {};
    $scope.selected = {};

    $scope.$on('$ionicView.enter', function() {
    	//Do some things when view is entered
    });

    $scope.sendIssue = function () {

        if ($scope.selected.text === undefined || $scope.selected.text.trim().length === 0) {
            alert('Please select a issue');
        } else if ($scope.desc.text === undefined || $scope.desc.text.trim().length === 0) {
            alert('Please add a description');
        } else {
            // console.log($scope.desc.text.trim());
            // console.log($scope.selected.text.trim());

            $http({
                method: 'POST',
                url: 'https://www.openfn.org/inbox/3afab0f1-3937-4ca8-95a3-5491f6f32a4e',
                data: {
                    'issue_filter': 'fisher_app',
                    'type': $scope.selected.text === undefined ? '' : $scope.selected.text.trim(),
                    'desc': $scope.desc.text === undefined ? '' : $scope.desc.text.trim()
                }
            }).then(function (resp) {
                console.log('Your issue has been send');
            }, function (err) {
                console.log('Your issue has failed to send');
            });
        }
    }
});
