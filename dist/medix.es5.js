class MediatorQuery {
    constructor(responseType) {
        this.responseType = responseType;
    }
    getResponseType() {
        return this.responseType;
    }
}
// tslint:disable-next-line:max-classes-per-file
class Mediator {
    constructor() {
        this.registry = new Map();
    }
    register(data) {
        const responseMap = this.registry.get(data.commandConstructor);
        if (!responseMap) {
            const newResponseMap = new Map();
            newResponseMap.set(data.responseConstructor || data.commandConstructor, data.handler);
            this.registry.set(data.commandConstructor, newResponseMap);
            return;
        }
        responseMap.set(data.responseConstructor || data.commandConstructor, data.handler);
        return;
    }
    send(command, responseType) {
        const noHandler = (type = 'handler') => { throw new Error(`No handler exists for this ${type} type`); };
        const responseMap = this.registry.get(command.constructor);
        if (!responseMap) {
            noHandler('command');
            return;
        }
        if (!responseType && command.getResponseType) {
            const handler = responseMap.get(command.getResponseType());
            if (handler) {
                return handler.handle(command);
            }
            noHandler();
        }
        if (!responseType) {
            const handler = responseMap.get(command.constructor);
            if (handler) {
                handler.handle(command);
                return;
            }
            noHandler();
        }
        const responseHandler = responseMap.get(responseType);
        if (responseHandler) {
            return responseHandler.handle(command);
        }
        noHandler();
    }
}

export { MediatorQuery, Mediator };
//# sourceMappingURL=medix.es5.js.map
