rotas.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function rotas($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
    $stateProvider.state('login', {
        url: '/',
        templateUrl: 'app/autenticacao/views/login.html',
    })

    $stateProvider.state('inicio', {
        url: '/home',
        templateUrl: 'app/cadastros/clientes/index.html',
        controller: "cadastros.clientes.index",
        controllerAs: "vm"
    })

        //#region CADASTROS
        .state('cadastros', {
            'abstract': true,
            url: '/cadastros',
            template: '<div ui-view class="fade-in-up"></div>'
        })
        //#region CLIENTES
        .state('cadastros.clientes', {
            'abstract': true,
            url: '/clientes',
            template: '<div ui-view class="fade-in-up"></div>'

        })

        .state('cadastros.clientes.index', {
            url: '',
            templateUrl: 'app/cadastros/clientes/index.html',
            controller: "cadastros.clientes.index",
            controllerAs: "vm"
        })
        .state('cadastros.clientes.criar', {
            url: '/incluir',
            templateUrl: 'app/cadastros/clientes/criar.html',
            controller: "cadastros.clientes.criar",
            controllerAs: "vm"
        })
        .state('cadastros.clientes.alterar', {
            url: '/alterar/:id',
            templateUrl: 'app/cadastros/clientes/criar.html',
            controller: "cadastros.clientes.criar",
            controllerAs: "vm"
        })
        //#endregion
        ;
    //#endregion
};
