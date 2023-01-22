import Application from 'potber/app';
import config from 'potber/config/environment';
import * as QUnit from 'qunit';
import {
  forceModulesToBeLoaded,
  sendCoverage,
} from 'ember-cli-code-coverage/test-support';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

QUnit.config.maxDepth = 12;
QUnit.dump.maxDepth = 12;

setup(QUnit.assert);

start();

QUnit.done(async function () {
  forceModulesToBeLoaded();
  await sendCoverage();
});
