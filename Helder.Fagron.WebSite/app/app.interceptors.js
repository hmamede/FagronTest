authInterceptor.$inject =['$httpProvider'];

//Configuração do Serviço para API e InterceptorhttpProvider
export default function authInterceptor($httpProvider){
    $httpProvider.interceptors.push('authInterceptorService');
}
