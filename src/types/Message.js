// @flow

export interface Message {
  _id: string,
  userId: string,
  chatId: string,
  message: string,
  createdOn: Date,
}
