import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func
  };

  handleChange = e => {
    //update fish in State
    // 1.CopyFish
    const updatedFish = { ...this.props.fish, [e.currentTarget.name]: e.currentTarget.value };
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    const fish = this.props.fish;
    return (
      <div className="fish-edit">
        <input name="name" onChange={this.handleChange} value={fish.name} type="text" placeholder="Name" />
        <input name="price" onChange={this.handleChange} value={fish.price} type="text" placeholder="Price" />
        <select name="status" onChange={this.handleChange} value={fish.status}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={fish.desc} placeholder="Desc" />
        <input name="image" onChange={this.handleChange} value={fish.image} type="text" placeholder="Image" />
        <button
          onClick={() => {
            this.props.deleteFish(this.props.index);
          }}
        >
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
