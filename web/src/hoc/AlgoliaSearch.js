import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import Rivet from './Rivet';
import {
  setSearchResultOrder,
  setSearchQueryValue,
  setSearchIsPending,
  storeEvents,
  fetchEventById,
} from '../actions';
import {
  selectSearchQueryValue,
  selectEvents,
} from '../selectors';

function AlgoliaSearchHOC(InnerComponent) {
  class AlgoliaSearch extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isTyping: false,
        typingTimer: null,
      };

      const client = algoliasearch(
        process.env.REACT_APP_ALGOLIA_CLIENT_ID,
        process.env.REACT_APP_ALGOLIA_SEARCH_KEY
      );

      this.index = client.initIndex('events');

      this.onType = this.onType.bind(this);
      this.setTypingTimer = this.setTypingTimer.bind(this);
      this.clearWaitingTimer = this.clearWaitingTimer.bind(this);
    }

    setTypingTimer() {
      if (this.state.typingTimer) {
        clearTimeout(this.state.typingTimer);
      }

      const typingTimer = setTimeout(this.clearWaitingTimer, 250);
      this.setState({ typingTimer, isTyping: true });

      this.props.setSearchIsPending(true);
    }

    async clearWaitingTimer () {
      const {
        setSearchResultOrder,
        storeEvents,
        fetchEventById,
        setSearchIsPending,
      } = this.props;

      this.setState({
        isTyping: false,
        typingTimer: null,
      });

      try {
        const result = await this.index.search({ query: this.props.queryValue });
        if (! result || ! result.hits) {
          return;
        }

        if (! result.hits.length) {
          setSearchResultOrder([]);
          return;
        }

        const order = result.hits.map(event => event.objectID);
        const events = result.hits.map(event => ({
          id: event.objectID,
          city: event.city,
          state: event.state,
          streetAddress: event.streetAddress,
          title: event.title,
        }));

        setSearchResultOrder(order);
        storeEvents(events);

        events.forEach(event => {
          const storeEvent = this.props.events[event.id];

          if (! storeEvent || ! storeEvent.createdAt) {
            fetchEventById(event.id);
          }
        });

        setSearchIsPending(false);
      } catch (error) {
        console.error(error);
        setSearchIsPending(false);
      }
    }

    onType(value) {
      const { typingTimer } = this.state;

      if (! typingTimer) {
        this.setTypingTimer();
      }

      this.props.setSearchQueryValue(value);
    }

    render() {
      const { queryValue } = this.props;

      return (
        <InnerComponent
          onType={this.onType}
          queryValue={queryValue}
        />
      );
    }
  }

  AlgoliaSearch.mapStateToProps = (state) => ({
    queryValue: selectSearchQueryValue(state),
    events: selectEvents(state),
  });

  AlgoliaSearch.actionCreators = {
    setSearchResultOrder,
    setSearchQueryValue,
    setSearchIsPending,
    storeEvents,
    fetchEventById,
  };

  return Rivet(AlgoliaSearch);
}

export default AlgoliaSearchHOC;
