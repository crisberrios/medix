class Mediator {
    constructor() {
        this.registry = new Map();
    }
    register(data) {
        const responseMap = this.registry.get(data.commandConstructor);
        if (responseMap) {
            responseMap.set(data.responseConstructor, data.handler);
            return;
        }
        const newResponseMap = new Map();
        newResponseMap.set(data.responseConstructor, data.handler);
        this.registry.set(data.commandConstructor, newResponseMap);
    }
    send(command, responseType) {
        const responseMap = this.registry.get(command.constructor);
        if (responseMap) {
            const handler = responseMap.get(responseType);
            if (handler) {
                return handler.handle(command);
            }
            throw new Error("No handler exists for this response type");
        }
        throw new Error("No handler definitions for this command type");
    }
}

export default Mediator;
//# sourceMappingURL=medix.es5.js.map
