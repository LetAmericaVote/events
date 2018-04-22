import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import Rivet from './Rivet';
import {
  setSearchResultOrder,
  setSearchQueryValue,
  setSearchIsPending,
  storeEvents,
} from '../actions';
import {
  selectSearchQueryValue,
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
        setSearchIsPending,
      } = this.props;

      this.setState({
        isTyping: false,
        typingTimer: null,
      });

      try {
        const result = await this.index.search({ query: this.props.queryValue });
        if (! result || ! result.hits) {
          setSearchResultOrder([]);
          setSearchIsPending(false);
          return;
        }

        if (! result.hits.length) {
          setSearchResultOrder([]);
          setSearchIsPending(false);
          return;
        }

        const order = result.hits.map(event => event.objectID);
        const events = result.hits.map(event => ({
          id: event.objectID,
          city: event.city,
          state: event.state,
          streetAddress: event.streetAddress,
          title: event.title,
          dateTime: event.dateTime,
        }));

        setSearchResultOrder(order);
        storeEvents(events);
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
  });

  AlgoliaSearch.actionCreators = {
    setSearchResultOrder,
    setSearchQueryValue,
    setSearchIsPending,
    storeEvents,
  };

  return Rivet(AlgoliaSearch);
}

export default AlgoliaSearchHOC;
