(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        $stateProvider
            // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/templates/home.template.html'
            })

            // Categories
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/templates/categories.template.html',
                controller: 'CategoriesController as categories',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })

            // Items
            .state('categories.item', {
                url: '/item/{itemId}',
                templateUrl: 'src/templates/item.template.html',
                controller: 'ItemsController as itemsCtrl',
                resolve: {
                    items: ['$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.itemId);
                    }]
                }
            });
    }
})();
