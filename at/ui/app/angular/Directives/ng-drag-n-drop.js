/*global angular, angularApp  */

//Pasar a berazategui  !!!
    'use strict';
angularApp.directive(
    'ngDragNDrop',
    function() {
        return {
            restrict: 'A',
            scope: {
                behavior: '@ngDrag',
                ngDraggable: '@',
                ngDroppable: '@',
                ngDragstart: '=',
                ngDragend: '=',
                ngEffectAllowed: '@',
                ngDragenter: '=',
                ngDragover: '=',
                ngDragleave: '=',
                ngDrop: '=',
                ngDropEffect: '@'
            },
            link: function(scope, element) {
                /* choose behavior */
                var draggable = scope.ngDraggable === 'true';
                var droppable = scope.ngDroppable === 'true';

                function makeItDraggable(scope, element) {
                    /* make it draggable */

                    element.css({
                        position: 'relative',
                    });

                    element.attr('draggable', true);

                    /* bind draggable event handlers */
                    element.on('dragstart', function(event) {
                        /* some posibilities for css */
                        var bEvent = scope.getMouseEvent(event);
                        element.addClass('ng-draggable-on-drag');

                        var effectAllowed = 'move';
                        if (angular.isDefined(scope.ngEffectAllowed)) {
                            effectAllowed = scope.ngEffectAllowed;
                        }
                        bEvent.effectAllowed = effectAllowed;

                        if (angular.isDefined(scope.ngDragstart)) {
                            if (angular.isArray(scope.ngDragstart)) {
                                var parameters = scope.ngDragstart.slice();
                                var handler = parameters.shift();
                                parameters.unshift(bEvent);
                                handler.apply(this, parameters);
                            } else {
                                scope.ngDragstart(bEvent);
                            }
                        }

                    });

                    element.on('dragend', function(event) {
                        /* some css */
                        element.removeClass('ng-draggable-on-drag');

                        var bEvent = scope.getMouseEvent(event);

                        if (angular.isDefined(scope.ngDragend)) {
                            if (angular.isArray(scope.ngDragend)) {
                                var parameters = scope.ngDragend.slice();
                                var handler = parameters.shift();
                                parameters.unshift(bEvent);
                                handler.apply(this, parameters);
                            } else {
                                scope.ngDragend(bEvent);
                            }
                        }
                    });
                }

                function makeItDroppable(scope, element) {

                    element.on('dragenter', function(event) {
                        
                        var bEvent = scope.getMouseEvent(event);
                        /* some css */
                        element.addClass('ng-droppable-on-sight');

                        if (angular.isDefined(scope.ngDragenter)) {
                            if (angular.isArray(scope.ngDragenter)) {
                                var parameters = scope.ngDragenter.slice();
                                var handler = parameters.shift();
                                parameters.unshift(bEvent);
                                handler.apply(this, parameters);
                            } else {
                                scope.ngDragenter(bEvent);
                            }
                        }
                    });

                    element.on('dragover', function(event) {

                        var dropEffect = 'move';
                        if (angular.isDefined(scope.ngDropEffect)) {
                            dropEffect = scope.ngDropEffect;
                        }

                        var bEvent = scope.getMouseEvent(event);

                        bEvent.dataTransfer.dropEffect = dropEffect;

                        if (angular.isDefined(scope.ngDragover)) {
                            if (angular.isArray(scope.ngDragover)) {
                                var parameters = scope.ngDragover.slice();
                                var handler = parameters.shift();
                                parameters.unshift(bEvent);
                                handler.apply(this, parameters);
                            } else {
                                scope.ngDragover(bEvent);
                            }
                        }
                    });

                    element.on('dragleave', function(event) {

                        var bEvent = scope.getMouseEvent(event);
                        /* some css */
                        element.removeClass('ng-droppable-on-sight');

                        if (angular.isDefined(scope.ngDragleave)) {
                            if (angular.isArray(scope.ngDragleave)) {
                                var parameters = scope.ngDragleave.slice();
                                var handler = parameters.shift();
                                parameters.unshift(bEvent);
                                handler.apply(this, parameters);
                            } else {
                                scope.ngDragleave(bEvent);
                            }
                        }
                    });

                    element.on('drop', function(event) {
                        /* some css */
                        var bEvent = scope.getMouseEvent(event);
                        element.removeClass('ng-droppable-on-sight');
                        if (angular.isDefined(scope.ngDrop)) {
                            if (angular.isArray(scope.ngDrop)) {
                                var parameters = scope.ngDrop.slice();
                                var handler = parameters.shift();
                                parameters.unshift(bEvent);
                                handler.apply(this, parameters);
                            } else {
                                scope.ngDrop(bEvent);
                            }
                        }
                    });
                }

                if (scope.behavior === 'all' || (draggable && droppable)) {

                    makeItDroppable(scope, element);
                    makeItDraggable(scope, element);

                } else if (scope.behavior === 'draggable' || draggable) {

                    makeItDraggable(scope, element);

                } else if (scope.behavior === 'droppable' || droppable) {

                    makeItDroppable(scope, element);

                }

                scope.getMouseEvent = function(event) {
                    var bEvent = event;
                    if (!(event instanceof MouseEvent) && angular.isDefined(event.originalEvent)) {
                        bEvent = event.originalEvent;
                    }
                    return bEvent;
                };
            }
        };
});