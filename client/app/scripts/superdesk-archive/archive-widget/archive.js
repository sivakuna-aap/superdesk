(function() {
    'use strict';

    angular.module('superdesk.widgets.archive', [
        'superdesk.widgets.base',
        'superdesk.authoring.widgets'
    ])
        .config(['dashboardWidgetsProvider', function(dashboardWidgets) {
            dashboardWidgets.addWidget('archive', {
                label: 'Content',
                multiple: true,
                icon: 'archive',
                max_sizex: 2,
                max_sizey: 2,
                sizex: 1,
                sizey: 2,
                thumbnail: 'scripts/superdesk-archive/archive-widget/thumbnail.svg',
                template: 'scripts/superdesk-archive/archive-widget/widget-archive.html',
                configurationTemplate: 'scripts/superdesk-archive/archive-widget/configuration.html',
                configuration: {maxItems: 10, savedSearch: null, updateInterval: 5},
                description: 'Content widget'
            });
        }])
        .controller('ArchiveController', ['$scope', 'api', 'BaseWidgetController', 'superdesk',
        function ($scope, api, BaseWidgetController, superdesk) {
            $scope.type = 'archiveWidget';
            $scope.itemListOptions = {
                endpoint: 'search',
                repo: 'archive',
                notStates: ['spiked'],
                types: ['text', 'picture', 'audio', 'video', 'composite'],
                page: 1
            };
            $scope.options = {
                pinEnabled: true,
                modeEnabled: true,
                searchEnabled: true,
                itemTypeEnabled: true,
                mode: 'basic',
                pinMode: 'archive',
                similar: false,
                itemTypes: ['text', 'picture', 'audio', 'video', 'composite']
            };
            $scope.actions = {
                open: {
                    title: 'Open',
                    method: function(item) {
                        superdesk.intent('edit', 'item', item);
                    },
                    'class': 'open',
                    icon: 'icon-pencil'
                }
            };

            BaseWidgetController.call(this, $scope);
        }]);
})();
