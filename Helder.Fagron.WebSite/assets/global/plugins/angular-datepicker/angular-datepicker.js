(function () {
    var picker;

    picker = angular.module('angularDatepicker', []);



    picker.directive('picker', ['$locale', function ($locale) {


        return {
            restrict: 'A',
            scope: {
                ngModel: "=ngModel",
                ngModelDate: '=ngModelDate',
                startDate: '=startDate'
            },
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModelCtrl) {
                picker.defaults = { format: $locale.DATETIME_FORMATS.shortDate.toLowerCase().replace('yy', 'yyyy'), language: $locale.id, orientation: "left", autoclose: true };

                var config = $scope.$parent.vm && $scope.$parent.vm.configuracao ? $scope.$parent.vm.configuracao : picker.defaults;
                config.startDate = $scope.startDate;

                var pickerElem = element.datepicker(config);
                pickerElem.on('changeDate', function (ev) {
                    $scope.$apply(function () {
                        $scope.ngModelDate = ev.date;
                    });
                });

                ngModelCtrl.$render = function () {
                    var newValue = ngModelCtrl.$viewValue;
                    if (newValue !== undefined && newValue !== NaN && newValue !== null) {
                        element.datepicker("update", newValue);
                    }
                    else {
                        if (element.context != null && element.context != undefined) element.context.value = "";
                    }
                };

            }
        };
    }]);

}).call(this);
