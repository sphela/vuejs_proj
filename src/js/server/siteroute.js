// @flow
'use strict';

const Rx = require('rxjs');

import { httpStatus } from './server';

import type { RxObservable, RxObserve } from '../shared/interfaces/rx';
import type { SiteRouteState } from '../shared/interfaces/siteroute';
import type { Server, ExpressRx } from '../shared/interfaces/server';
import type { File } from '../shared/interfaces/file';
import type { Vue } from '../shared/interfaces/vue';

export const APP_TEMPLATE_VAR_PATTERN = '{{{APP}}}';
export const INITIAL_DATA_TEMPLATE_VAR_PATTERN = '{{{INITIAL_DATA}}}';
export const CSS_SRC_PATH_VAR_PATTERN = '{{{CSS_SRC}}}';
export const JS_SRC_PATH_VAR_PATTERN = '{{{JS_SRC}}}';

export default class SiteRoute {

  _appCreator: () => RxObservable<Vue>;
  _compiledTemplate: string;
  _assets: Object;

  constructor (assets: Object, appCreator: () => RxObservable<Vue>) {
    this._assets = assets;
    this._appCreator = appCreator;
  }

  set compiledTemplate (template: string) {
    this._compiledTemplate = template;
  }

  get compiledTemplate (): string {
    return this._compiledTemplate;
  }

  render ({ req, res, renderer }: ExpressRx): RxObservable<SiteRouteState> {
    return this._appCreator(req.originalUrl)
      .mergeMap(app => Rx.Observable.create((observe: RxObserve<SiteRouteState>) => {
        renderer.renderToString(app, (error, html) => {
          if (error) {
            observe.error(error);
            return;
          }
          console.log('assets?', this._assets);
          const template = this.compiledTemplate
            .replace(CSS_SRC_PATH_VAR_PATTERN, this._assets['styles.css'])
            .replace(JS_SRC_PATH_VAR_PATTERN, this._assets['main.js'])
            .replace(APP_TEMPLATE_VAR_PATTERN, html)
            .replace(INITIAL_DATA_TEMPLATE_VAR_PATTERN, JSON.stringify(app.$store.state));
          observe.next({ req, res, template });
        });
      }));
  }

  serve (server: Server, path: string, template: File): RxObservable<SiteRouteState> {
    return template.get()
    .do(template => {
      this.compiledTemplate = template;
    })
    .mergeMap(() => server.get(path))
    .mergeMap((msg: ExpressRx) => this.render(msg))
    .share();
  }

  send ({ req, res, template }: SiteRouteState) {
    res.status(httpStatus.OK).send(template);
  }
}
