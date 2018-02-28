(function () {
    angular.module('fagronTest').factory('profissaoService', ['$http', 'ngAuthSettings', '$q',
        function ($http, ngAuthSettings, $q) {

            var serviceBase = ngAuthSettings.apiServiceBaseUri + "Profissao/";
            var deferred = $q.defer();

            return {
                listar: listar,
                inserir: inserir,
                alterar: alterar,
                obter: obter,
                excluir: excluir
            };

            function listar(paginaAtual, totalPagina) {
                return $http({
                    method: 'GET',
                    url: serviceBase + "Listar"
                });
            }

            function inserir(objeto) {
                return $http.post(serviceBase, objeto);
            }

            function alterar(id, objeto) {
                return $http.put(serviceBase + id, objeto);
            }

            function obter(id) {
                return $http.get(serviceBase + id);
            }

            function excluir(id) {
                return $http.delete(serviceBase + id);
            }
        }
    ]);
})();
