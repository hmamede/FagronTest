
import rotas from './app.rotas';
import constants from './app.constants';
import authInterceptor from './app.interceptors';
import layout from './app.layout';

function requireAll(r) {
    r.keys().forEach(r);
}

requireAll(require.context('../assets/global/plugins/angular-datepicker', true, /\.js$/));
requireAll(require.context('../assets/global/plugins/bootstrap-select', true, /\.js$/));
requireAll(require.context('../assets/global/plugins/angular-busy', true, /\.js$/));
requireAll(require.context('../assets/global/plugins/angular-input-mask', true, /\.js$/));
requireAll(require.context('../assets/global/plugins/jquery-debounce', true, /\.js$/));

var appModule = angular.module("fagronTest", [
    'ui.router',
    'ngCookies',
    'ngMessages',
    'ngSanitize',
    'cgBusy',
    'angular-jwt',
    'tmh.dynamicLocale',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.pagination',
    'ngTouch',
    'angularDatepicker',
    'ui.utils.masks'
]);


requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./services', true, /\.js$/));
requireAll(require.context('./autenticacao', true, /\.js$/));
requireAll(require.context('./comum', true, /\.js$/));
requireAll(require.context('./cadastros', true, /\.js$/));

constants.config(appModule);
appModule.config(rotas);
appModule.config(authInterceptor);
layout.config(appModule);




angular.module('fagronTest').factory('vcalert', ['$uibModal', function (modal) {
    return {
        confirm: confirm,
        alert: alert
    };

    function alert(mensagem) {
        var modalInstance = modal.open({
            templateUrl: 'app/comum/views/modals/confirm/modalConfirm.html',
            controller: 'comum.views.modals.confirm.modalConfirm as vm',
            backdrop: 'static',
            size: 'sm',
            windowClass: 'modal-action',
            resolve: {
                mensagemInfo: function () {
                    return mensagem;
                }
            }
        });
    }

    function confirm(mensagem, sim, nao) {
        var modalInstance = modal.open({
            templateUrl: 'app/comum/views/modals/pergunta/modal.html',
            controller: 'comum.views.modals.pergunta.modal as vm',
            backdrop: 'static',
            size: 'sm',
            windowClass: 'modal-action',
            resolve: {
                mensagemInfo: function () {
                    return mensagem;
                }
            }
        });

        modalInstance.result.then(function () {
            if (modalInstance.result.decisao) {
                if (sim)
                    sim();
            }
            else if (nao) {
                nao();
            }
        });

    }
}]);

angular.module('fagronTest').value('cgBusyDefaults', {
    templateUrl: './app/comum/loader/loader.html',
    delay: 500
});