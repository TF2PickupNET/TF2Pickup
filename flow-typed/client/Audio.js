// @flow

declare class Audio {
  constructor(url: string): this,

  volume: number,
  duration: number,

  play(): Promise<void>,
}
