'use strict';

/* Directives */

angular.module('gastropostAngular.directives', [])
    .directive('columns', function () {
        return function (scope, elem, attrs) {
            if (scope.$last) {
                var container = elem.parent();

                var chunkSize = 3;

                var columnDivs = [];

                var columnDivHeights = [];

                for (var i = 0; i < chunkSize; i++) {
                    columnDivs.push(jQuery('<div class="span4"></div>'));
                    container.append(columnDivs[i]);
                }

                var kids = elem.parent().children();

                var kidGroups = jQuery.makeArray(kids).chunk(chunkSize);

                for (var i = 0; i < kidGroups.length; i++) {
                    var kidGroup = kidGroups[i];

                    for (var j = 0; j < chunkSize; j++) {
                        columnDivs[j].append(kidGroup[j]);
                    }
                }

//                for (var i = 0; i < chunkSize; i++) {
//                    columnDivHeights[i] = columnDivs[i].height();
//                }

//                console.dir(columnDivHeights);
            }
        };
    });
