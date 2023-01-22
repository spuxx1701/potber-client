import { transformUser } from 'potber/services/api/transformers/user';
import { User } from 'potber/services/api/types/user';
import { setupTest } from 'potber/tests/helpers';
import { parseXmlString } from 'potber/tests/test-utils';
import { module, test } from 'qunit';
import mockData from './mock-data';

module('Unit | Service | API | Transformer | User', function (hooks) {
  setupTest(hooks);

  test('Transforms a user without group.', function (assert) {
    const actual = parseXmlString(mockData.withoutGroup).children[0] as Element;
    const expected: User = {
      id: '1100939',
      name: 'Icefeldt',
      groupId: undefined,
    };
    assert.propEqual(
      transformUser(actual),
      expected,
      'User without group is transformed properly.'
    );
  });

  test('Transforms a user with group.', function (assert) {
    const actual = parseXmlString(mockData.withGroup).children[0] as Element;
    const expected: User = {
      id: '1341645',
      name: 'Real_Futti',
      groupId: '3',
    };
    assert.propEqual(
      transformUser(actual),
      expected,
      'User with group is transformed properly.'
    );
  });
});
