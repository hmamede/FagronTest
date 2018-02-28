//@ts-check
(function () {
    angular.module('fagronTest').controller('cadastros.clientes.criar', ['$scope', 'clienteService', '$stateParams', '$state', 'vcalert', '$rootScope', 'profissaoService',
        function ($scope, clienteService, $stateParams, $state, vcalert, $rootScope, profissaoService) {
            var vm = this;

            //configuração do DatePicker
            vm.configuracao = {
                "autoclose": true,
                format: "dd/mm/yyyy",
                language: "pt-BR",
                orientation: "left"
            };

            vm.init = init;
            vm.Salvar = salvar;
            vm.carregaCliente = carregaCliente;
            vm.loadComboProfissoes = loadComboProfissoes;

            vm.dataNascimento = new Date();

            vm.init();
            function init() {
                vm.cliente = {};
                vm.cliente.Status = true;

                vm.idCliente = $stateParams.id
                vm.isEditing = vm.idCliente > 0;
                vm.saving = false;

                vm.TituloPagina = vm.isEditing ? "Alterar Cliente" : "Adicionar Cliente";

                vm.listProfissoes = [];

                vm.loadComboProfissoes();
                vm.carregaCliente();
            }

            function salvar() {
                vm.saving = true;
                if (vm.isEditing)
                    alterar();
                else
                    inserir();
            }

            function inserir() {
                $rootScope.cgBusyPromises.push({
                    $promise: clienteService.inserir(vm.cliente)
                        .success(function () {
                            vcalert.alert("Registro cadastrado com sucesso.");
                            $state.go('cadastros.clientes.index');
                        })
                        .error(function (result) {
                            vcalert.alert("Um erro ocorreu: " + result.error);
                        }).finally(function () {
                            vm.saving = false;
                        })
                });
            }

            function alterar() {
                $rootScope.cgBusyPromises.push({
                    $promise: clienteService.alterar(vm.idCliente, vm.cliente)
                        .success(function () {
                            vcalert.alert("Registro alterado com sucesso.");
                            $state.go('cadastros.clientes.index');
                        })
                        .error(function (result) {
                            vcalert.alert("Um erro ocorreu: " + result.error);
                        }).finally(function () {
                            vm.saving = false;
                        })
                });
            }

            function carregaCliente() {
                if (!vm.isEditing)
                    return;

                $scope.$parent.vm.loading = clienteService.obter(vm.idCliente)
                    .success(function (result) {
                        vm.cliente.Nome = result.Nome;
                        vm.cliente.Sobrenome = result.Sobrenome;
                        vm.cliente.DataNascimento = result.DataNascimento;
                        vm.cliente.DataNascimentoStr = result.DataNascimentoStr;
                        vm.cliente.ProfissaoId = result.ProfissaoId;
                        vm.cliente.Status = result.Status;
                    })
                    .error(function (result) {
                        vcalert.alert("Um erro ocorreu: " + result.error);
                    }).finally(function () {
                        vm.saving = false;
                    });;
            }

            function loadComboProfissoes() {
                $scope.$parent.vm.loading = profissaoService.listar()
                    .success(function (result) {
                        vm.listProfissoes = result;
                    });
            }
        }
    ]);
})();