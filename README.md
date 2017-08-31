# medix: Mediator implementation in TypeScript

This library implements the mediator pattern, in a similar fashion to MediatR library (C#). Given the language differences between .NET and JavaScript, there's some caveats, but the main goal remains: to decouple sending messages/commands from handling them.

## Example
```javascript
import Mediator from 'medix'
const mediator = new Mediator();

mediator.register({ commandConstructor: QueryClass, 
                    responseConstructor: ResponseClass, 
                    handler: handlerFunction });

const response = mediator.send(new QueryClass(), ResponseClass);                    
...
```

##Use cases

Paired with a state container, this can be used as a replacement of libraries such as Redux, which implements a non-typed version of the command pattern. No more switch statements: medix will call the right handler based on your strongly-typed command class.

Used in a server, medix will let you write ultra-thin controllers, and if used with a IoC container, it will make it easier to handle multiple configurations, such as testing.

Overall, using the mediator pattern, better yet if using TypeScript, will help you keep your app organized and more modular. 

##Roadmap

For now, the goal is to support commands, queries, notifications and events, for sync and async use cases. After that, the goal is to provide better documentation and real-world use cases.
