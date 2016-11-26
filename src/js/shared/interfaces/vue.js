// @flow
'use strict';

export interface VueServerRendererCreator {
  createRenderer(): VueServerRenderer;
}

export interface VueServerRenderer {
  renderToString(app: Vue, cb: (err: Object, html: string) => void): void;
}

export interface Vue {

}
