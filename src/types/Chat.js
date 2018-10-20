// @flow

export interface Chat {
  id: string,
  type: 'global' | 'pickup',
  pickupId?: number,
}
