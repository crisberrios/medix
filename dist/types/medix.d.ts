export interface IHandler {
    handle(command: IConstructable): IConstructable;
}
export interface IRegisterHandler {
    commandConstructor: Function;
    responseConstructor: Function;
    handler: IHandler;
}
export interface IMediator {
    register(data: IRegisterHandler): void;
    send<T>(t: IConstructable, r: INewInstance<T>): T;
}
export interface IConstructable {
    constructor: Function;
}
export interface INewInstance<T> extends IConstructable {
    new (): T;
}
export default class Mediator implements IMediator {
    private registry;
    register(data: IRegisterHandler): void;
    send<T>(command: IConstructable, responseType: INewInstance<T>): T;
}
