(function () {
'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['items'];
    function ItemsController(items) {
        var itemsCtrl = this;
        itemsCtrl.category = items.category.name;
        itemsCtrl.items = items.menu_items;
    }

})();
