/**
 * Create a transform stream that converts a stream
 * to valid `data: <value>\n\n' events for SSE.
 */

import {Transform, TransformCallback} from 'stream';

namespace sse {
  export class SSE extends Transform {
    // a hack for eslint, type BufferEncoding is available as long as package '@types/node' in dependencies
    // eslint-disable-next-line no-undef
    _transform(data: any, enc: BufferEncoding, cb: TransformCallback) {
      this.push('data: ' + data.toString('utf8') + '\n\n');
      cb();
    };
  }
}

export = sse;
