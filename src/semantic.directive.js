'use strict';

angular.module('app.infrastructure')
    .directive('semantic', function($timeout, $state) {

        return {
            restrict: 'A',
            scope: {
                semantic: '=',
                ngModel: '='
            },
            link: function($scope, $element, $attrs) {
                var options = $scope.semantic,
                    semantic = new Semantic;

                $timeout(() => semantic.initialize($element, $state, options));
            }
        };
    });

class Semantic {
    initialize($element, $state, options) {
        var is = (selector) => $element.is(selector);
        is('.ui.dropdown') && this.dropdown($element, options);
        is('.ui.checkbox') && this.checkbox($element, options);
        is('.ui.accordion') && this.accordion($element, options);
        is('.ui.modal') && this.modal($element, $state, options);
        is('.file.input') && this.fileInput($element, options);
        is('[data-content]') && this.popup($element, options);
    }

    dropdown($element) {
        $element.dropdown();
    }

    accordion($element, options) {
        $element.accordion(_.defaults(
            options,
            {
                exclusive: false
            }
        ));
    }

    popup($element, options) {
        $element.popup(_.defaults(
            options,
            {}
        ));
    }

    modal($element, $state, options) {
        $element
            .modal('setting', _.defaults(
                options,
                {
                    onHidden: () => $state.go('^', {}, {reload: true}),
                blurring: true,
            observeChanges: true
    }
    ))
    .modal('show')
            .modal('refresh');

        var interval = setInterval(() => $element.modal('refresh'), 100);
        setTimeout(() => clearInterval(interval), 2000);
    }

    checkbox($element, options) {
        $element.checkbox(_.defaults(
            options,
            {
                onChange: () => angular.element($element.find('input')).triggerHandler('click')
    }
    ));
    }

    fileInput($element) {
        $element.find('[type="text"], .button').click(() => $element.find('[type="file"]').click());
        $element.find('[type="file"]').change(function(e) {
            $element.find('[type="text"]').val(e.target.files[0].name).change();
        });
    }
}