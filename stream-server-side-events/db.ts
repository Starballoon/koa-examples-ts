import {Readable, ReadableOptions} from 'stream';

/**
 * Returns a new subscription event event.
 * Real APIs would care about the `event`.
 */

namespace db {
  export class Subscription extends Readable {
    value: number;

    constructor(opts?: ReadableOptions) {
      super(opts);
      this.value = 0;
    }

    _read() {
      while (this.push(String(this.value++))) {
      }
    }
  }
}

export = db;
