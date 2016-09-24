(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.moveItem = function (index) {
            ShoppingListCheckOffService.moveItem(index);
        };
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var bought = this;
        bought.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        // Initialize the lists
        var toBuyItems = [
            { name:'Porche', quantity: 1 },
            { name:'Volvo', quantity: 2 },
            { name:'Dodge', quantity: 3 },
            { name:'Toyota', quantity: 4 },
            { name:'Lada', quantity: 5 }
        ];
        var boughtItems = [];

        service.moveItem = function (index) {
            // Remove the item from toBuyItems list
            var removedItems = toBuyItems.splice(index,1);
            // Add the item to boughtItems list
            if(removedItems.length > 0)
                boughtItems.push(removedItems[0]);
        };

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };        
    }

})();
