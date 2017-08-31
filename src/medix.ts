export interface IHandler {
  handle(command: IConstructable): IConstructable
}

export interface IRegisterHandler {
  commandConstructor: Function
  responseConstructor: Function
  handler: IHandler
}

export interface IMediator {
  register(data: IRegisterHandler): void
  send<T>(t: IConstructable, r: INewInstance<T>): T
}

export interface IConstructable {
  constructor: Function
}

export interface INewInstance<T> extends IConstructable {
  new (): T
}

export default class Mediator implements IMediator {
  private registry: Map<Function, Map<Function, IHandler>> = new Map()
  public register(data: IRegisterHandler) {
    const responseMap = this.registry.get(data.commandConstructor)
    if (responseMap) {
      responseMap.set(data.responseConstructor, data.handler)
      return
    }
    const newResponseMap = new Map()
    newResponseMap.set(data.responseConstructor, data.handler)
    this.registry.set(data.commandConstructor, newResponseMap)
  }
  public send<T>(command: IConstructable, responseType: INewInstance<T>): T {
    const responseMap = this.registry.get(command.constructor)
    if (responseMap) {
      const handler = responseMap.get(responseType)
      if (handler) {
        return handler.handle(command) as T
      }
      throw new Error("No handler exists for this response type")
    }
    throw new Error("No handler definitions for this command type")
  }
}
