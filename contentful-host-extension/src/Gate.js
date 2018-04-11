import React from 'react';
import App from './App';

class Gate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      isSubmitted: false,
      isLoading: false,
      isIncorrect: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { input } = this.state;

    const uri = `${process.env.REACT_APP_ROWBOAT_API_URI}/v1/contentful/verify`;
    const options = {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'X-Rowboat-Contentful-Key': input,
      }),
    };

    fetch(uri, options)
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            isSubmitted: false,
            isIncorrect: true,
            isLoading: false,
          });

          return false;
        }

        return res.json();
      })
      .then(res => {
        if (! res) {
          return;
        }

        const { ok } = res;

        if (! ok) {
          this.setState({
            isSubmitted: false,
            isIncorrect: true,
            isLoading: false,
          });

          return;
        }

        this.setState({
          isSubmitted: true,
          isLoading: false,
          isIncorrect: false,
        });
      });
  }

  render() {
    const { input, isLoading, isIncorrect, isSubmitted } = this.state;

    if (isSubmitted) {
      return (
        <App apiKey={input} />
      );
    }

    const showError = input && ! isLoading && isIncorrect;
    const buttonClass = `cf-btn-primary cf-block ${isLoading ? 'cf-is-loading' : ''}`;

    return (
      <div class="cf-form-field">
        <label>Enter edit-host password</label>
        <input
          type="text"
          value={input}
          class="cf-form-input"
          onChange={event => this.setState({ input: event.target.value })}
          disabled={isLoading}
          aria-invalid={showError}
        />
        { showError ? (
          <div class="cf-field-error">Incorrect password</div>
        ) : (
          <div class="cf-form-hint">
            Must enter password to edit host information
          </div>
        ) }
        <p>
          <button class={buttonClass} onClick={this.onSubmit}>{isLoading ? 'Authenticating' : 'Submit'}</button>
        </p>
      </div>
    );
  }
}

export default Gate;
