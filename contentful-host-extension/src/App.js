import React, { Component } from 'react';
import contentfulExtension from 'contentful-ui-extensions-sdk';
import SearchEmail from './SearchEmail';
import SearchId from './SearchId';
import HostLink from './HostLink';
import Profile from './Profile';

const EMAIL_TAB = 'EMAIL_TAB';
const LINK_TAB = 'LINK_TAB';
const USER_ID_TAB = 'USER_ID_TAB';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      fieldValue: null,
    };

    this.extension = null;
  }

  componentDidMount() {
    contentfulExtension.init((extension) => {
      this.extension = extension;

      extension.window.startAutoResizer();

      this.setState({
        isReady: true,
        fieldValue: extension.field.getValue(),
      });

      extension.field.onValueChanged((value) => {
        this.setState({
          fieldValue: value,
        });
      });
    });
  }

  render() {
    const { isReady, fieldValue } = this.state;
    const { apiKey } = this.props;

    const tabProps = {
      extension: this.extension,
      fieldValue: fieldValue,
      apiKey,
    };

    const getTabComponent = (tab) => {
      switch (tab) {
        case USER_ID_TAB: return SearchId;
        case EMAIL_TAB: return SearchEmail;
        case LINK_TAB: return HostLink;
        default: return () => null;
      }
    };

    const tabComponents = [
      EMAIL_TAB,
      LINK_TAB,
      USER_ID_TAB,
    ].map(tabName => getTabComponent(tabName));

    return (
      <main>
        { this.isReady ? (
          <div>
            { fieldValue ? <Profile userId={fieldValue} /> : null }
            { fieldValue ? <p>Update the host user</p> : <p>Set the host user</p> }
            { tabComponents }
          </div>
        ) : <p>Loading...</p> }
      </main>
    );
  }
}

export default App;
