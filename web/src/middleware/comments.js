import {
  FETCH_PAGINATED_COMMENTS,
  FETCH_COMMENT,
  POST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  API_REQUEST_SUCCEEDED,
  setApiActionMetaProperty,
  storeComment,
  storeComments,
  storeUsers,
  storeUser,
  storeEvent,
  storeEvents,
  storeFlag,
  storeFlags,
  getFromApi,
  postToApi,
  putToApi,
  deleteFromApi,
} from '../actions';
import {
  selectApiMetaCustomProperty,
} from '../selectors';
import processComment from '../processors/comment';

const META_START = 'start';

const commentOutgoingRequest = (store, action) => {
  switch (action.type) {
    case FETCH_PAGINATED_COMMENTS: {
      const { sortByPosted, eventId, userId, inReplyTo } = action;
      const spaceName = `userId=${userId},sortByPosted=${sortByPosted},eventId=${eventId},inReplyTo=${inReplyTo}`;

      const start = selectApiMetaCustomProperty(
        FETCH_PAGINATED_COMMENTS,
        spaceName,
        META_START,
        store.getState()
      );

      const query = {};

      if (start) {
        query.start = start;
      }

      if (eventId) {
        query.eventId = eventId;
      }

      if (userId) {
        query.userId = userId;
      }

      if (sortByPosted !== null) {
        query.sortByPosted = sortByPosted;
      }

      if (inReplyTo) {
        query.inReplyTo = inReplyTo;
      }

      store.dispatch(getFromApi(
        FETCH_PAGINATED_COMMENTS, spaceName, '/v1/comments', query,
      ));

      break;
    }

    case FETCH_COMMENT: {
      const { commentId } = action;
      const spaceName = `commentId=${commentId}`;

      const endpoint = `/v1/comments/id/${commentId}`;
      store.dispatch(getFromApi(
        FETCH_COMMENT, spaceName, endpoint,
      ));

      break;
    }

    case POST_COMMENT: {
      const { eventId, message, inReplyTo } = action;
      const payload = { eventId, message, inReplyTo };
      const space = `eventId=${eventId},inReplyTo=${inReplyTo}`;

      const endpoint = `/v1/comments`;

      store.dispatch(postToApi(
        POST_COMMENT, space, endpoint, payload,
      ));

      break;
    }

    case UPDATE_COMMENT: {
      const { commentId, message } = action;
      const payload = { message };
      const space = `commentId=${commentId}`;

      const endpoint = `/v1/comments/id/${commentId}`;

      store.dispatch(putToApi(
        UPDATE_COMMENT, space, endpoint, payload,
      ));

      break;
    }

    case DELETE_COMMENT: {
      const { commentId } = action;
      const space = `commentId=${commentId}`;

      const endpoint = `/v1/comments/id/${commentId}`;

      store.dispatch(deleteFromApi(
        DELETE_COMMENT, space, endpoint,
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
    case UPDATE_COMMENT:
    case POST_COMMENT: {
      const { data } = action;
      const { comment } = data;

      if (! comment) {
        break;
      }

      const processedItem = processComment(comment);

      if (!!processedItem.user) {
        store.dispatch(storeUser(processedItem.user));
      }

      if (!!processedItem.event) {
        store.dispatch(storeEvent(processedItem.event));
      }

      if (!!processedItem.flag) {
        store.dispatch(storeFlag(processedItem.flag));
      }

      store.dispatch(storeComment(processedItem.comment));

      break;
    }

    case DELETE_COMMENT: {
      const { data } = action;
      const { ok, deleted } = data;

      if (! ok || ! deleted) {
        return;
      }

      const comment = { id: deleted, _delete: true };
      store.dispatch(storeComment(comment));

      break;
    }

    case FETCH_PAGINATED_COMMENTS: {
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

        if (!!processedItem.flag) {
          acc.flags.push(processedItem.flag);
        }

        return acc;
      }, {
        comments: [],
        events: [],
        users: [],
        flags: [],
      });

      const lastComment = processedData.comments[processedData.comments.length - 1];

      store.dispatch(setApiActionMetaProperty(
        metaAction, space, META_START, lastComment.id,
      ));

      if (processedData.users.length) {
        store.dispatch(storeUsers(processedData.users));
      }

      if (processedData.events.length) {
        store.dispatch(storeEvents(processedData.events));
      }

      if (processedData.flags.length) {
        store.dispatch(storeFlags(processedData.flags));
      }

      if (processedData.comments.length) {
        store.dispatch(storeComments(processedData.comments));
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
