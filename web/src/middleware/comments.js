import {
  FETCH_PAGINATED_USER_COMMENTS,
  FETCH_PAGINATED_EVENT_COMMENTS,
  FETCH_COMMENT,
  POST_COMMENT_TO_EVENT,
  API_REQUEST_SUCCEEDED,
  setApiActionMetaProperty,
  storeComment,
  storeComments,
  storeUsers,
  storeUser,
  storeEvent,
  storeEvents,
  getFromApi,
  postToApi,
} from '../actions';
import {
  selectApiMetaCustomProperty,
  selectAuthUserId,
} from '../selectors';
import processComment from '../processors/comment';

const META_START = 'start';

const commentOutgoingRequest = (store, action) => {
  switch (action.type) {
    case FETCH_PAGINATED_USER_COMMENTS: {
      const { sortByRecent } = action;
      const userId = selectAuthUserId(store.getState());
      const spaceName = `userId=${userId},sortByRecent=${sortByRecent}`;

      const start = selectApiMetaCustomProperty(
        FETCH_PAGINATED_USER_COMMENTS,
        spaceName,
        META_START,
        store.getState()
      );

      const query = { sortByRecent };

      if (start) {
        query.start = start;
      }

      store.dispatch(getFromApi(
        FETCH_PAGINATED_USER_COMMENTS, spaceName, '/v1/comments/user', query,
      ));
      break;
    }

    case FETCH_PAGINATED_EVENT_COMMENTS: {
      const { eventId, sortByRecent, inReplyTo } = action;
      const spaceName = `eventId=${eventId},sortByRecent=${sortByRecent},inReplyTo=${inReplyTo}`;

      const start = selectApiMetaCustomProperty(
        FETCH_PAGINATED_EVENT_COMMENTS,
        spaceName,
        META_START,
        store.getState()
      );

      const query = { sortByRecent };

      if (start) {
        query.start = start;
      }

      if (typeof inReplyTo !== 'undefined') {
        query.inReplyTo = inReplyTo;
      }

      const endpoint = `/v1/comments/event/${eventId}`;
      store.dispatch(getFromApi(
        FETCH_PAGINATED_EVENT_COMMENTS, spaceName, endpoint, query,
      ));
      break;
    }

    case FETCH_COMMENT: {
      const { eventId, commentId } = action;

      const endpoint = `/v1/comments/id/${commentId}/event/${eventId}`;
      store.dispatch(getFromApi(
        FETCH_COMMENT, 'id', endpoint,
      ));

      break;
    }

    case POST_COMMENT_TO_EVENT: {
      const { eventId, message, inReplyTo } = action;
      const payload = { eventId, message, inReplyTo };

      const endpoint = `/v1/comments/event/${eventId}`;
      store.dispatch(postToApi(
        POST_COMMENT_TO_EVENT, 'update', endpoint, payload,
      ));

      break;
    }

    default: break;
  }
};

const commentsIncomingRequest = (store, action) => {
  const { metaAction, space } = action;

  switch (metaAction) {
    case FETCH_COMMENT:
    case POST_COMMENT_TO_EVENT: {
      const { data } = action;
      const { comment } = data;

      if (! comment) {
        break;
      }

      const processedItem = processComment(comment);
      store.dispatch(storeComment(processedItem.comment));

      if (!!processedItem.user) {
        store.dispatch(storeUser(processedItem.user));
      }

      if (!!processedItem.event) {
        store.dispatch(storeEvent(processedItem.event));
      }

      break;
    }

    case FETCH_PAGINATED_EVENT_COMMENTS:
    case FETCH_PAGINATED_USER_COMMENTS: {
      const { data } = action;
      const { comments } = data;

      if (! comments || ! comments.length) {
        break;
      }

      const processedData = comments.reduce((acc, comment) => {
        const processedItem = processComment(comment);

        acc.comments.push(processedItem.comment);

        if (!!processedItem.user) {
          acc.users.push(processedItem.user);
        }

        if (!!processedItem.event) {
          acc.events.push(processedItem.event);
        }

        if (!!processedItem.parentComment) {
          acc.comments.push(processedItem.parentComment);
        }

        return acc;
      }, {
        comments: [],
        events: [],
        users: [],
      });

      const lastComment = processedData.comments[processedData.comments.length - 1];

      store.dispatch(setApiActionMetaProperty(
        metaAction, space, META_START, lastComment.id,
      ));

      if (processedData.comments.length) {
        store.dispatch(storeComments(processedData.comments));
      }

      if (processedData.events.length) {
        store.dispatch(storeEvents(processedData.events));
      }

      if (processedData.users.length) {
        store.dispatch(storeUsers(processedData.users));
      }

      break;
    }

    default: break;
  }
};

const events = store => next => action => {
  if (action.type === API_REQUEST_SUCCEEDED) {
    commentsIncomingRequest(store, action);
  } else {
    commentOutgoingRequest(store, action);
  }

  return next(action);
};

export default events;
