import React from 'react';

class SearchEmail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      notFound: false,
      searchQuery: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { searchQuery } = this.state;

    const uri = `${process.env.REACT_APP_ROWBOAT_API_URI}/v1/contentful/user/email/${searchQuery}`;
    const options = {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'X-Rowboat-Contentful-Key': this.props.apiKey,
      }),
    };

    fetch(uri, options)
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            notFound: true,
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

        const { id } = res;

        this.setState({
          isLoading: false,
          notFound: false,
        });

        this.props.setValue(id);
      });
  }

  render() {
    const { isLoading, notFound, searchQuery } = this.state;

    const showError = searchQuery && ! isLoading && notFound;
    const buttonClass = `cf-btn-primary cf-block ${isLoading ? 'cf-is-loading' : ''}`;

    return (
      <div class="cf-form-field" style={{ marginTop: '32px' }}>
        <label>User Email</label>
        <input
          type="text"
          value={searchQuery}
          class="cf-form-input"
          onChange={event => this.setState({ searchQuery: event.target.value })}
          disabled={isLoading}
          aria-invalid={showError}
        />
        { showError ? (
          <div class="cf-field-error">User not found</div>
        ) : (
          <div class="cf-form-hint">
            Find a user by email
          </div>
        ) }
        <p>
          <button class={buttonClass} onClick={this.onSubmit}>{isLoading ? 'Searching' : 'Find user'}</button>
        </p>
      </div>
    );
  }
}

export default SearchEmail;
