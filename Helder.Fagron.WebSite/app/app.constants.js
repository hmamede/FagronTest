var constants = [];

    var serviceBase = 'http://localhost:51857/api/';

constants.push({
    key: 'ngAuthSettings', value: {
        apiServiceBaseUri: serviceBase
    }
});

var configuration = {
    config: function (appModule) {
        constants.forEach(function (constant) {
            appModule.constant(constant.key, constant.value);
        });
    }
};
export default configuration;