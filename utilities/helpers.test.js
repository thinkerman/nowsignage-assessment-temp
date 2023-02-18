import * as React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';
import {get_url_extension} from './helpers';
import {act} from 'react-dom/test-utils';

//ensuiring 100% coverage with --coverage  on jest package.json
describe('Test helper functions', () => {
  afterEach(cleanup);

  it('test extension getter', () => {
    expect(
      get_url_extension(
        'http://www.adobe.com/products/flashplayer/include/marquee/design.swf',
      ),
    ).toBe('swf');
  });
});
