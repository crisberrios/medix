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

export interface IMediatorQuery<T> {
  getResponseType(): INewInstance<T>
}

export class MediatorQuery<T> implements IMediatorQuery<T> {
  private responseType: INewInstance<T>
  constructor(responseType: INewInstance<T>) {
    this.responseType = responseType
  }
  public getResponseType() {
    return this.responseType
  }
}

// tslint:disable-next-line:max-classes-per-file
export class Mediator implements IMediator {
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

  public send<T>(command: IMediatorQuery<T>): T
  public send<T>(command: IConstructable, responseType: INewInstance<T>): T
  public send(command: IConstructable): void
  public send<T>(
    command: IConstructable,
    responseType?: INewInstance<T>
  ): T | void {
    const noHandler = (type: string = "handler") => {
      throw new Error(`No handler exists for this ${type} type`)
    }
    const responseMap = this.registry.get(command.constructor)
    if (!responseMap) {
      noHandler("command")
      return
    }
    if (!responseType && (command as IMediatorQuery<T>).getResponseType) {
      const handler = responseMap.get(
        (command as IMediatorQuery<T>).getResponseType()
      )
      if (handler) {
        return handler.handle(command) as T
      }
      noHandler()
    }
    if (!responseType) {
      const handler = responseMap.get(command.constructor)
      if (handler) {
        handler.handle(command)
        return
      }
      noHandler()
    }
    const responseHandler = responseMap.get(responseType as INewInstance<T>)
    if (responseHandler) {
      return responseHandler.handle(command) as T
    }
    noHandler()
  }
}
