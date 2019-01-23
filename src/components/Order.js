import React, { Component } from 'react';
import { formatPrice } from '../helpers';

class Order extends Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    if (!fish) return null;

    const count = this.props.order[key];
    const isAvailable = fish.status === 'available';

    if (!isAvailable) {
      return <li key={key}>Sorry {fish ? fish.name : 'fish'} is nolonger available</li>;
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button
          onClick={() => {
            this.props.deleteFromOrder(key);
          }}
        >
          <span>ⓧ</span>
        </button>
      </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((t, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return t + count * fish.price;
      } else {
        return t;
      }
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          Total: <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
