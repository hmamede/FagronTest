(function () {
    angular.module('fagronTest').factory('gridConfig', [
        function () {

            return {

                verificarUltimaLinha: verificarUltimaLinha
            };

            function verificarUltimaLinha() {
                var objeto = $("button[aria-expanded='true']").next();

                if (objeto.length > 0) {
                    $(objeto[0]).removeAttr('style');
                    var position = objeto[0].getBoundingClientRect().bottom;

                    if (position > 0) {
                        var dropdownMenu = $(objeto[0]);
                        var menuHeight = dropdownMenu.outerHeight(true);

                        var grid = $("button[aria-expanded='true']").parent().parent().parent().parent().parent().parent().parent();
                        var gridHeight = grid.height();
                        var posicaoLinhaBaixoGrid = grid[0].getBoundingClientRect().bottom
                        var posicaoLinhaCimaGrid = grid[0].getBoundingClientRect().top

                        if ((posicaoLinhaCimaGrid > position) || (posicaoLinhaBaixoGrid < position)) {
                            $(objeto[0]).css('border-bottom', '0');
                            $(objeto[0]).css('top', 'auto');
                            $(objeto[0]).css('bottom', '10px');

                            var positionTop = objeto[0].getBoundingClientRect().top;

                            if ((posicaoLinhaCimaGrid > positionTop)) {
                                $(objeto[0]).removeAttr('style');
                            }
                        }
                        else {
                            $(objeto[0]).removeAttr('style');
                        }
                    }
                }
            }
        }
    ]);
})();