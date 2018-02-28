(function () {
    angular.module('fagronTest').controller('cadastros.clientes.index', ['$scope', '$state', 'clienteService', 'uiGridConstants', 'vcalert', '$rootScope',
        function ($scope, $state, clienteService, uiGridConstants, vcalert, $rootScope) {
            var vm = this;

            vm.init = init;
            vm.listar = listar;
            vm.carregaGrid = carregaGrid;
            vm.excluir = excluir;

            vm.init();

            function init() {
                vm.carregaGrid();
                vm.listar();
            }

            function carregaGrid() {
                vm.userGridOptions = {
                    enableRowSelection: false,
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    enablePaginationControls: false,
                    noUnselect: true,
                    showGridFooter: false,
                    appScopeProvider: vm,
                    columnDefs: [
                        {
                            displayName: "Nome",
                            field: 'Nome',
                            enableColumnMenu: false,
                            width: 200,
                            minWidth: 200,
                        },
                        {
                            displayName: "Sobrenome",
                            field: 'Sobrenome',
                            enableColumnMenu: false,
                            width: 300,
                            minWidth: 300,
                        },
                        {
                            displayName: "Data Nascimento",
                            field: 'DataNascimento',
                            enableColumnMenu: false,
                            cellTemplate:
                                '<div style="margin-top: 5px; margin-left: 10px;">' +
                                '<span>{{row.entity.DataNascimento | date:"dd/MM/yyyy"}}</span>' +
                                '</div>',
                            width: 150,
                            minWidth: 150,
                        },
                        {
                            displayName: "Idade",
                            field: 'Idade',
                            enableColumnMenu: false,
                            width: 60,
                            minWidth: 60,
                        },
                        {
                            displayName: "Profissão",
                            field: 'Profissao',
                            enableColumnMenu: false
                        },
                        {
                            displayName: "Status",
                            field: 'Status',
                            enableColumnMenu: false,
                            width: 100,
                            minWidth: 100,
                            cellTemplate:
                                '<div style="margin-top: 5px; margin-left: 10px;">' +
                                '  <span ng-show="row.entity.Status" class="label label-sm label-success">' + "Ativo" + '</span>' +
                                '  <span ng-show="!row.entity.Status" class="label label-sm label-danger">' + "Inativo" + '</span>' +
                                '</div>'
                        },
                        {
                            name: "Ações",
                            enableColumnMenu: false,
                            width: 80,
                            minWidth: 50,
                            cellTemplate:
                                "<div class='btn-group'>" +
                                "<span class='dropdown-toggle' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'><a href='#'><i class='fa fa-ellipsis-v' aria-hidden='true'></i></a></span>" +
                                "<ul class='dropdown-menu' aria-labelledby='dropdownMenu1'>" +
                                "<li><a href='#' ui-sref='cadastros.clientes.alterar({id: row.entity.Id})'>Editar</a></li>" +
                                "<li role='separator' class ='divider' ></li>" +
                                "<li><a href='#' data-toggle='modal' data-target='.bs-example-modal-sm' ng-click='grid.appScope.excluir(row.entity.Id)' >Excluir</a></li>" +
                                "</ul>" +
                                "</div>"
                        }

                    ],
                    onRegisterApi: function (gridApi) {
                        vm.gridApi = gridApi;

                        vm.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                        });
                        vm.gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                            listar(vm.filtro, pageNumber, pageSize);
                        });

                    }
                };
            }

            function listar() {
                $rootScope.cgBusyPromises.push({
                    $promise: clienteService.listar()
                        .success(function (result) {
                            vm.userGridOptions.totalItems = result.length;
                            vm.userGridOptions.data = result;
                        })
                        .finally(function () {
                            vm.exibirPaginacao = true;
                        })
                });
            }

            function excluir(id) {
                vcalert.confirm(
                    "Confirma a exclusão do registro?",
                    function () {
                        $rootScope.cgBusyPromises.push({
                            $promise: clienteService.excluir(id).success(function () {
                                vcalert.alert("Registro excluído com sucesso.");
                                vm.listar();
                            }).error(function (result) {
                                vcalert.alert("Um erro ocorreu: " + result.message);
                            })
                        });
                    });
            }
        }]);
})();
