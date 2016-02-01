'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $ = require('jquery');

angular.module('angularSemanticUi').directive('semantic', function ($timeout, $state) {

    return {
        restrict: 'A',
        scope: {
            semantic: '=',
            ngModel: '='
        },
        link: function link($scope, $element, $attrs) {
            var options = $scope.semantic,
                semantic = new Semantic();

            $timeout(function () {
                return semantic.initialize($($element), $state, options);
            });
        }
    };
});

var Semantic = (function () {
    function Semantic() {
        _classCallCheck(this, Semantic);
    }

    _createClass(Semantic, [{
        key: 'initialize',
        value: function initialize($element, $state, options) {
            var is = function is(selector) {
                return $element.is(selector);
            };
            is('.ui.dropdown') && this.dropdown($element, options);
            is('.ui.checkbox') && this.checkbox($element, options);
            is('.ui.accordion') && this.accordion($element, options);
            is('.ui.modal') && this.modal($element, $state, options);
            is('.file.input') && this.fileInput($element, options);
            is('[data-content]') && this.popup($element, options);
        }
    }, {
        key: 'dropdown',
        value: function dropdown($element) {
            $element.dropdown();
        }
    }, {
        key: 'accordion',
        value: function accordion($element, options) {
            $element.accordion(_.defaults(options, {
                exclusive: false
            }));
        }
    }, {
        key: 'popup',
        value: function popup($element, options) {
            $element.popup(_.defaults(options, {}));
        }
    }, {
        key: 'modal',
        value: function modal($element, $state, options) {
            $element.modal('setting', _.defaults(options, {
                onHidden: function onHidden() {
                    return $state.go('^', {}, { reload: true });
                },
                blurring: true,
                observeChanges: true
            })).modal('show').modal('refresh');

            var interval = setInterval(function () {
                return $element.modal('refresh');
            }, 100);
            setTimeout(function () {
                return clearInterval(interval);
            }, 2000);
        }
    }, {
        key: 'checkbox',
        value: function checkbox($element, options) {
            $element.checkbox(_.defaults(options, {
                onChange: function onChange() {
                    return angular.element($element.find('input')).triggerHandler('click');
                }
            }));
        }
    }, {
        key: 'fileInput',
        value: function fileInput($element) {
            $element.find('[type="text"], .button').click(function () {
                return $element.find('[type="file"]').click();
            });
            $element.find('[type="file"]').change(function (e) {
                $element.find('[type="text"]').val(e.target.files[0].name).change();
            });
        }
    }]);

    return Semantic;
})();