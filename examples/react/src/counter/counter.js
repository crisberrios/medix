import {MediatorQuery} from 'medix'

let counter = 0
export const getIncrementCounter = {
  handle: () => {
    counter = counter + 1;
    return new CounterIncrementResponse(counter);
  }
}

export const getDecrementCounter = {
  handle: () => {
    counter = counter - 1;
    return new CounterDecrementResponse(counter);
  }
}

export class CounterIncrementResponse {
  counter
  constructor(counter) {
    this.counter = counter
  }
}

export class CounterDecrementResponse {
  counter
  constructor() {
    this.counter = counter
  }
}

export class CounterIncrementQuery extends MediatorQuery {
  constructor() {
    super(CounterIncrementResponse)
  }
}

export class CounterDecrementQuery extends MediatorQuery {
  constructor() {
    super(CounterDecrementResponse)
  }
}

export class CounterQuery { }
