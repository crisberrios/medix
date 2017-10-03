import Mediator from "../src/medix"

describe("Core functionality", () => {
  it("Should handle constructables/classes", () => {
    class HomeQuery {
      public message: string

      constructor(message: string) {
        this.message = message
      }
    }

    // tslint:disable-next-line:max-classes-per-file
    class HomeResponse {
      public welcomeText: string
      constructor(message?: string) {
        this.welcomeText = message ? message : "Hello World!"
      }
    }

    // tslint:disable-next-line:max-classes-per-file
    class HomeController {
      public handle(command: HomeQuery) {
        return new HomeResponse(command.message)
      }
    }

    const mediator = new Mediator()

    mediator.register({
      commandConstructor: HomeQuery,
      handler: new HomeController(),
      responseConstructor: HomeResponse
    })

    const response = mediator.send(new HomeQuery("I'm back!"), HomeResponse)

    expect(response).toBeInstanceOf(HomeResponse)
  })

  it("Should handle primitives", () => {
    // tslint:disable-next-line:max-classes-per-file
    class HomeQuery {
      public message: string

      constructor(message: string) {
        this.message = message
      }
    }

    // tslint:disable-next-line:max-classes-per-file
    class HomeStringController {
      public handle(command: HomeQuery) {
        return command.message
      }
    }

    const mediator = new Mediator()

    mediator.register({
      commandConstructor: HomeQuery,
      handler: new HomeStringController(),
      responseConstructor: String
    })

    const response = mediator.send(new HomeQuery("Response is correct"), String)

    expect(typeof response).toEqual("string")
  })
})
