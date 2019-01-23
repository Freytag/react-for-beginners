import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    //sync base
    const { params } = this.props.match;
    const storedOrder = localStorage.getItem(params.storeId);
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
    if (storedOrder) {
      this.setState({ order: JSON.parse(storedOrder) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    //unmount
    base.removeBinding(this.ref);
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. copy current state;
    const fishes = { ...this.state.fishes };
    // 2. update state
    fishes[key] = updatedFish;
    // 3. set new state;
    this.setState({
      fishes
    });
  };

  addToOrder = key => {
    // 1. copy existing state;
    const order = { ...this.state.order };
    // 2. add new key yo or or update exitising item;
    order[key] = order[key] + 1 || 1;
    // 3. set new state;
    this.setState({
      order
    });
  };

  addFish = fish => {
    // 1. copy existing state;
    const fishes = { ...this.state.fishes };
    // 2. add new fish to existing state
    fishes[`fish_${Date.now()}`] = fish;
    // 3. set new state;
    this.setState({
      fishes
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul>
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
        />
      </div>
    );
  }
}

export default App;
