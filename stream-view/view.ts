'use strict';

import {Readable} from 'stream';

// import co from 'co';

class View extends Readable {
  _read() {
  }

  async render() {
    // push the <head> immediately
    this.push('<!DOCTYPE html><html><head><title>Hello World</title></head>');

    // render the <body> on the next tick
    const body = await (async() => new Promise(resolve => {
      setImmediate(() => resolve('<p>Hello World</p>'));
    }))();

    this.push('<body>' + body + '</body>');

    // close the document
    this.push('</html>');

    // end the stream
    this.push(null);
  }
}

export = View;
