var MediatorQuery = (function () {
    function MediatorQuery(responseType) {
        this.responseType = responseType;
    }
    MediatorQuery.prototype.getResponseType = function () {
        return this.responseType;
    };
    return MediatorQuery;
}());
// tslint:disable-next-line:max-classes-per-file
var Mediator = (function () {
    function Mediator() {
        this.registry = new Map();
    }
    Mediator.prototype.register = function (data) {
        var responseMap = this.registry.get(data.commandConstructor);
        if (!responseMap) {
            var newResponseMap = new Map();
            newResponseMap.set(data.responseConstructor || data.commandConstructor, data.handler);
            this.registry.set(data.commandConstructor, newResponseMap);
            return;
        }
        responseMap.set(data.responseConstructor || data.commandConstructor, data.handler);
        return;
    };
    Mediator.prototype.send = function (command, responseType) {
        var noHandler = function (type) {
            if (type === void 0) { type = "handler"; }
            throw new Error("No handler exists for this " + type + " type");
        };
        var responseMap = this.registry.get(command.constructor);
        if (!responseMap) {
            noHandler("command");
            return;
        }
        if (!responseType && command.getResponseType) {
            var handler = responseMap.get(command.getResponseType());
            if (handler) {
                return handler.handle(command);
            }
            noHandler();
        }
        if (!responseType) {
            var handler = responseMap.get(command.constructor);
            if (handler) {
                handler.handle(command);
                return;
            }
            noHandler();
        }
        var responseHandler = responseMap.get(responseType);
        if (responseHandler) {
            return responseHandler.handle(command);
        }
        noHandler();
    };
    return Mediator;
}());

export { MediatorQuery, Mediator };
//# sourceMappingURL=medix.es5.js.map
