// @flow

import { type ElementType, type Element, type ComponentType } from 'react';

declare module 'react-test-renderer' {
  declare interface TestInstance<Props> {
    instance: ComponentType<Props> | null,
    type: ElementType,
    props: Props,
    parent: TestInstance<{}>,
    children: $ReadOnlyArray<string | TestInstance<{}>>,

    find(test: (instance: TestInstance<{}>) => boolean): TestInstance<{}>,
    findByType(type: ElementType): TestInstance<{}>,
    findByProps<P>(props: P): TestInstance<P>,
    findAll(test: (instance: TestInstance<{}>) => boolean): $ReadOnlyArray<TestInstance<{}>>,
    findAllByType(type: ElementType): $ReadOnlyArray<TestInstance<{}>>,
    findAllByProps<P: {}>(props: P): $ReadOnlyArray<TestInstance<P>>,
  }

  declare class TestRenderer<E: Element<ElementType>, Props> {
    toJSON(): {},
    toTree(): {},
    update(elem: E): void,
    unmount(): void,
    getInstance(): ComponentType<Props> | null,
    root: TestInstance<Props>,
  }

  declare export default {
    create<E: Element<ElementType>, Props>(elem: E): TestRenderer<E, Props>,
  };
}
