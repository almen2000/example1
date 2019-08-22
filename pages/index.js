import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import erc20 from '../ethereum/erc20';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';

class HomaPage extends Component {

  state = {
    tokenName: '',
    tokenSymbol: ''
  };

  async componentWillMount() {
    const name = await erc20.methods.name().call();
    const symbol = await erc20.methods.symbol().call();
    this.setState({
      tokenName: name,
      tokenSymbol: symbol
    });
  };

  getTokenName = () => {
    alert(`Your token name is ${this.state.tokenName}`);
  };

  getTokenSymbol = () => {
    alert(`Your token symbol is ${this.state.tokenSymbol}`);
  };

  render() {
    return (
      <Layout>
        <div>
          <h2>Home Page</h2>
        </div>
        <Button onClick={this.getTokenName}>Get Token Name</Button>
        <Button onClick={this.getTokenSymbol}>Get Token Symbol</Button>
        <Form>
          <Form.Group widths='equal'>
              <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='First name'
                placeholder='First name'
              />
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Last name'
                placeholder='Last name'
              />
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Last name'
                placeholder='Last name'
              />
              <Form.Field
                id='form-input-control-last-name'
                control={Button}
              />
            </Form.Group>
        </Form>
      </Layout>
    );
  }

}

export default HomaPage;
