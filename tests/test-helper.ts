import Application from 'potber-client/app';
import ENV from 'potber-client/config/environment';
import * as QUnit from 'qunit';
import {
  forceModulesToBeLoaded,
  sendCoverage,
} from 'ember-cli-code-coverage/test-support';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(ENV.APP as any));

QUnit.config.maxDepth = 12;
QUnit.dump.maxDepth = 12;

setup(QUnit.assert);

start();

QUnit.done(async function () {
  forceModulesToBeLoaded();
  await sendCoverage();
});
