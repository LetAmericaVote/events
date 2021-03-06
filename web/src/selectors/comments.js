import { selectUser } from './users';
import { selectEvent } from './events';

export const selectComments = (state) => state.comments;

export const selectCommentItems = (state) => selectComments(state).items;

export const selectCommentExists = (commentId, state) =>
  !!selectCommentItems(state)[commentId];

export const selectComment = (commentId, state) =>
  selectCommentExists(commentId, state) ? ({
    ...(selectCommentItems(state)[commentId]),
    user: selectUser(selectCommentItems(state)[commentId].user, state) ||
      selectCommentItems(state)[commentId].user || null,
    event: selectEvent(selectCommentItems(state)[commentId].event, state) ||
      selectCommentItems(state)[commentId].event || null,
    inReplyTo: selectCommentItems(state)[commentId].inReplyTo || null,
  }) : null;

export const selectCommentUserId = (commentId, state) =>
  selectCommentExists(commentId, state) ?
    ((selectComment(commentId, state).user || {}).id ||
    selectComment(commentId, state).user) : null;

export const selectCommentMessage = (commentId, state) =>
  selectCommentExists(commentId, state) ?
    selectComment(commentId, state).message || null : null;

export const selectCommentEventId = (commentId, state) =>
  selectCommentExists(commentId, state) ?
    selectCommentItems(state)[commentId].event || null : null;

export const selectCommentEdits = (commentId, state) =>
selectCommentExists(commentId, state) ?
  selectCommentItems(state)[commentId].edits || null : null;

export const selectIsCommentFlagged = (commentId, state) =>
  selectCommentExists(commentId, state) ?
    selectComment(commentId, state).isFlagged || false : false;

export const selectCommentCreatedAt = (commentId, state) =>
  selectCommentExists(commentId, state) ?
    selectComment(commentId, state).createdAt || null : null;

/**
 * Select if a comment is a reply.
 *
 * @param  {String} commentId Comment id
 * @param  {Object} state     Redux store
 * @return {Boolean}          True if reply
 */
export const selectIsCommentReply = (commentId, state) =>
  selectCommentExists(commentId, state) ?
    !!selectComment(commentId, state).inReplyTo || false : false;

export const selectRemainingRepliesForComment = (commentId, state) =>
  selectCommentExists(commentId, state) ?
    selectComment(commentId, state).remaining || 0 : 0;

export const selectCommentsAsArray = (state) =>
  Object.keys(selectCommentItems(state))
    .map(commentId => selectComment(commentId, state));

export const selectCommentsForEvent = (eventId, state) =>
  selectCommentsAsArray(state)
    .filter(comment => comment.event === eventId ||
      (comment.event && comment.event.id === eventId));

export const selectTopLevelCommentsForEvent = (eventId, state) =>
  selectCommentsForEvent(eventId, state)
    .filter(comment => ! comment.inReplyTo);

export const selectTopLevelCommentsForEventSortedByRecent = (eventId, state) =>
  selectTopLevelCommentsForEvent(eventId, state)
    .sort((commentA, commentB) => {
      if (! commentA.createdAt) {
        return 1;
      }

      if (! commentB.createdAt) {
        return -1;
      }

      const timeA = new Date(commentA.createdAt).getTime();
      const timeB = new Date(commentB.createdAt).getTime();

      return timeB - timeA;
    });

export const selectRepliesForComment = (commentId, state) =>
  selectCommentsAsArray(state)
    .filter(comment => comment.inReplyTo === commentId);

export const selectRepliesForCommentSortedByRecent = (commentId, state) =>
  selectRepliesForComment(commentId, state)
    .sort((commentA, commentB) => {
      if (! commentA.createdAt) {
        return 1;
      }

      if (! commentB.createdAt) {
        return -1;
      }

      const timeA = new Date(commentA.createdAt).getTime();
      const timeB = new Date(commentB.createdAt).getTime();

      return timeB - timeA;
    });
