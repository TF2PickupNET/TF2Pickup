// @flow

import React from 'react';
import Renderer from 'react-test-renderer';
import test from 'ava';

import DateDisplay from '.';

const date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));

test('should render a span element', (t) => {
  const { root } = Renderer.create(
    <DateDisplay date={date} />
  );

  t.deepEqual(root.children[0], root.findByType('span'));
});

test('should render the date', (t) => {
  const { root } = Renderer.create(
    <DateDisplay
      date={date}
      locale="en-US"
      timeZone="UTC"
    />
  );

  t.deepEqual(root.findByType('span').children[0], '3:00 AM');
});

test('should render the day, month and year', (t) => {
  const { root } = Renderer.create(
    <DateDisplay
      withDay
      date={date}
      locale="en-US"
      timeZone="UTC"
    />
  );
  const { children } = root.findByType('span');

  t.deepEqual(children[0], '12/12/2012');
  t.deepEqual(children[1], ' | ');
  t.deepEqual(children[2], '3:00 AM');
});
