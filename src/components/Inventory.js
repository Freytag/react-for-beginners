import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }).isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
  };

  state = {
    user: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    console.log(authData);
    // 1. look up current store in firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. clai it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, { data: authData.user.uid });
    }
    // 3. set the state of the current inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    console.log(provider);
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = (
      <button className="logout" onClick={this.logout}>
        logout
      </button>
    );
    // 1. check if user is logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2.check if user is not owner of store
    if (this.state.uid !== this.state.owner) {
      return <div>You are not the Owner {logout}</div>;
    }

    // 3. must be owner so display invbentory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {this.props.fishes && Object.keys(this.props.fishes).length === 0 ? (
          <button className="loadsample" onClick={this.props.loadSampleFishes}>
            Load Sample Fishes
          </button>
        ) : null}
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
      </div>
    );
  }
}

export default Inventory;
