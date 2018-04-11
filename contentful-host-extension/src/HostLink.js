import React from 'react';

class HostLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      link: null,
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { sys } = this.props;
    const { id } = sys;

    const uri = `${process.env.REACT_APP_ROWBOAT_API_URI}/v1/contentful/${id}/host`;
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Rowboat-Contentful-Key': this.props.apiKey,
      }),
    };

    fetch(uri, options)
      .then(async res => {
        const json = await res.json();
        const { link } = json;

        this.setState({ link });
      });
  }

  render() {
    const { link, isLoading } = this.state;

    const buttonClass = `cf-btn-primary cf-block ${isLoading ? 'cf-is-loading' : ''}`;

    return (
      <div class="cf-form-field" style={{ marginTop: '32px' }}>
        { ! link || ! link.length ? (
          <p>
            <button class={buttonClass} onClick={this.onSubmit}>{isLoading ? 'Creating link' : 'Create one-time login link'}</button>
          </p>
        ) : (
          <div class="cf-form-field">
            <label>One-Time Login Link</label>
            <input type="text" aria-disabled="true" class="cf-form-input" value={link} />
            <p class="cf-text-dimmed">When a host uses this link, they will be prompted to signup and it will link their new account to this event.</p>
          </div>
        ) }
      </div>
    );
  }
}

export default HostLink;
