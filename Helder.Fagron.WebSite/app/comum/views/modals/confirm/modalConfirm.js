(function () {
    angular.module('fagronTest').controller('comum.views.modals.confirm.modalConfirm', ['$scope', '$uibModalInstance', 'mensagemInfo',
    function ($scope, instanciaModal, mensagemInfo) {
        var vm = this;

        vm.mensagem = mensagemInfo;
        vm.fechar = function () {
            instanciaModal.close();
        };

    }]);
})();
