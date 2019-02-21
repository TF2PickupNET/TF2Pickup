import { createSelector } from 'reselect';
import { makeGetUserById } from '@webapp/store/users/selectors';
import { State } from '@webapp/store';

const getCurrentUserId = (state: State) => state.userId;

const getUserById = makeGetUserById();

const getCurrentUser = createSelector(
  (state: State) => state,
  getCurrentUserId,
  getUserById,
);

const makeIsCurrentUser = () => createSelector(
  getCurrentUserId,
  (_: State, userId: string) => userId,
  (currentUserId, userId) => currentUserId === userId,
);

const getCurrentRegion = createSelector(
  getCurrentUser,
  user => user === null ? 'eu' : user.region,
);

export {
  getCurrentUserId,
  getCurrentUser,
  makeIsCurrentUser,
  getCurrentRegion,
};
