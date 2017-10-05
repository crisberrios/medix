import { Mediator } from 'medix';
import * as counter from './counter/counter'

const mediator = new Mediator()

mediator.register({
    handler: counter.getIncrementCounter,
    commandConstructor: counter.CounterIncrementQuery,
    responseConstructor: counter.CounterIncrementResponse
})

mediator.register({
    handler: counter.getDecrementCounter,
    commandConstructor: counter.CounterDecrementQuery,
    responseConstructor: counter.CounterDecrementResponse
})

mediator.register({
    handler: counter.getDecrementCounter,
    commandConstructor: counter.CounterQuery,
    responseConstructor: counter.CounterDecrementResponse
})

export default mediator