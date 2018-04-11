import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      notFound: false,
      firstName: null,
      lastName: null,
      email: null,
      profilePhoto: null,
    };

    this.loadProfile = this.loadProfile.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;

    if (userId) {
      this.loadProfile(userId)
    }
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (userId !== prevProps.userId) {
      this.loadProfile(userId);
    }
  }

  loadProfile(id) {
    this.setState({ isLoading: true });

    const uri = `${process.env.REACT_APP_ROWBOAT_API_URI}/v1/contentful/user/id/${id}`;
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

        const { firstName, lastName, email, profilePhoto } = res;

        this.setState({
          isLoading: false,
          notFound: false,
          firstName,
          lastName,
          email,
          profilePhoto
        });
      });
  }

  render() {
    const {
      firstName, lastName, notFound,
      email, profilePhoto, isLoading,
    } = this.state;

    if (! this.props.userId) {
      return (
        <p><strong>no user selected</strong></p>
      );
    }

    if (isLoading) {
      return (
        <p>Loading...</p>
      );
    }

    if (notFound) {
      return (
        <p><strong>User not found</strong></p>
      );
    }

    return (
      <div>
        <div>
          <img src={profilePhoto} />
        </div>
        <div>
          <div>
            <p><strong>First Name: </strong>{firstName}</p>
            <p><strong>Last Name: </strong>{lastName}</p>
            <p><strong>Email: </strong>{email}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
