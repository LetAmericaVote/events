import React, { Component } from 'react';
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

    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    window.contentfulExtension.init((extension) => {
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

  setValue(value) {
    this.extension.field.setValue(value);

    this.setState({
      fieldValue: value,
    });
  }

  render() {
    const { isReady, fieldValue } = this.state;
    const { apiKey } = this.props;

    const tabProps = {
      setValue: this.setValue,
      sys: this.extension ? this.extension.entry.getSys() : {},
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
    ].map(tabName => {
      const TabComponent = getTabComponent(tabName);

      return (
        <TabComponent {...tabProps} />
      );
    });

    return (
      <main>
        { isReady ? (
          <div>
            { fieldValue ? <Profile userId={fieldValue} apiKey={apiKey} /> : null }
            { fieldValue ? <h1 style={{ marginTop: '32px' }}>Update the host user</h1> : <h1>Set the host user</h1> }
            { tabComponents }
          </div>
        ) : <p>Loading...</p> }
      </main>
    );
  }
}

export default App;
