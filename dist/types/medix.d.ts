export interface IHandler {
    handle(command: IConstructable): IConstructable;
}
export interface IRegisterHandler {
    commandConstructor: Function;
    responseConstructor?: Function;
    handler: IHandler;
}
export interface IMediator {
    register(data: IRegisterHandler): void;
    send<T>(t: IConstructable, r: INewInstance<T>): T;
    send(t: IConstructable): void;
}
export interface IConstructable {
    constructor: Function;
}
export interface INewInstance<T> extends IConstructable {
    new (): T;
}
export interface IMediatorQuery<T> {
    getResponseType(): INewInstance<T>;
}
export declare class MediatorQuery<T> implements IMediatorQuery<T> {
    private responseType;
    constructor(responseType: INewInstance<T>);
    getResponseType(): INewInstance<T>;
}
export declare class Mediator implements IMediator {
    private registry;
    register(data: IRegisterHandler): void;
    send<T>(command: IMediatorQuery<T>): T;
    send<T>(command: IConstructable, responseType: INewInstance<T>): T;
    send(command: IConstructable): void;
}
