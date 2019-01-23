import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
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
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;
