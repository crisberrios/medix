export interface IHandler {
  handle(command: IConstructable): IConstructable
}

export interface IRegisterHandler {
  commandConstructor: Function
  responseConstructor?: Function
  handler: IHandler
}

export interface IMediator {
  register(data: IRegisterHandler): void
  send<T>(t: IConstructable, r: INewInstance<T>): T
  send(t: IConstructable): void
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
    if (!responseMap) {
      const newResponseMap = new Map()
      newResponseMap.set(
        data.responseConstructor || data.commandConstructor,
        data.handler
      )
      this.registry.set(data.commandConstructor, newResponseMap)
      return
    }
    responseMap.set(
      data.responseConstructor || data.commandConstructor,
      data.handler
    )
    return
  }

  public send(command: IConstructable): void
  public send<T>(command: IConstructable, responseType: INewInstance<T>): T
  public send<T>(
    command: IConstructable,
    responseType?: INewInstance<T>
  ): T | void {
    const responseMap = this.registry.get(command.constructor)
    if (!responseMap) {
      throw new Error("No handler definitions for this command type")
    }
    if (!responseType) {
      const handler = responseMap.get(command.constructor)
      if (handler) {
        handler.handle(command)
      }
      return
    }
    if (responseType) {
      const handler = responseMap.get(responseType)
      if (handler) {
        return handler.handle(command) as T
      }
      throw new Error("No handler exists for this response type")
    }
  }
}
