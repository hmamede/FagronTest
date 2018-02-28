(function () {
    angular.module('fagronTest').controller('comum.views.modals.pergunta.modal', ['$scope', '$uibModalInstance', 'mensagemInfo',
    function ($scope, instanciaModal, mensagemInfo) {
        var vm = this;

       instanciaModal.result.decisao = false;
        vm.mensagem = mensagemInfo;
        vm.fechar = function () {
            instanciaModal.close();
        };
        vm.sim = function () {
           instanciaModal.result.decisao = true;
            vm.fechar();
        }

    }]);
})();
