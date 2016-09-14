(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    
    function LunchCheckController($scope) {

        $scope.checkLunch = function () {
            var lunch = $scope.myLunch;
            var itemCount = 0;

            if(lunch != null && lunch.trim().length > 0) {
                var items = lunch.split(',');

                for(var i = 0 ; i < items.length ; i++) {
                    if(items[i].trim().length > 0)
                        itemCount++;
                }
            }

            if(itemCount == 0 ) {
                $scope.message = "Please enter data first!"
                $scope.status = "dataNotOk";
            } else if (itemCount <= 3) {
                $scope.message = "Enjoy!"
                $scope.status = "dataOk";
            } else {
                $scope.message = "Too much!"
                $scope.status = "dataOk";
            }
        };

    }
})();
