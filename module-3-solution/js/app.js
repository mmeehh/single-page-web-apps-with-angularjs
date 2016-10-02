(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);
        
    function FoundItems () {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true            
        }

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;

        list.itemsNotFound = function () {
            return list.foundItems.length === 0;
        }
    };

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = "";
        ctrl.found = [];

        ctrl.getMatchedMenuItems = function () {
            if(ctrl.searchTerm !== "") {
                MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                    .then(function (response) { ctrl.found = response; })
                    .catch(function (error) { console.log("Failed to query menu items!"); });
            } else {
                ctrl.found = [];
            }
        }

        ctrl.dontWantThisNow = function (index) {
            ctrl.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems = [];

                for(var i = 0 ; i < result.data.menu_items.length ; i++) {
                    var item = result.data.menu_items[i];
                    if(item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        foundItems.push(item);
                    }
                }

                // return processed items
                return foundItems;
            });
        }
    }
})();
