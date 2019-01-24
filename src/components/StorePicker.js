import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // ES6 Binding
  // constructor() {
  //   super();
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  static propTypes = {
    history: PropTypes.object
  };

  storeNameInput = React.createRef();

  handleSubmit = e => {
    // 1. Stop Form from Submitting
    e.preventDefault();
    // 2. get text from input
    const storeName = this.storeNameInput.current.value;
    // 3. Change the uri to /store/what-it-says
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.handleSubmit}>
        <h2>Please Enter A Store</h2>
        <input ref={this.storeNameInput} type="text" required placeholder="Store Name" defaultValue={getFunName()} />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;
