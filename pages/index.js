import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import erc20 from '../ethereum/erc20';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';

class HomaPage extends Component {

  state = {
    tokenName: '',
    tokenSymbol: '',
    addressFrom: '',
    addressTo: '',
    tokens: ''
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

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <Layout>
        <div>
          <h2>Home Page</h2>
        </div>
        <Form>
          <Button onClick={this.getTokenName}>Get Token Name</Button>
          <Button onClick={this.getTokenSymbol}>Get Token Symbol</Button>
        </Form>
        <Form onSubmit={this.submitTransferFrom}>
          <Form.Group>
            <Form.Input label='Address From' placeholder='Address From'  onChange={this.handleChange} />
            <Form.Input label='Address to' placeholder='Address to' onChange={this.handleChange} />
            <Form.Input label='Tokens' placeholder='Tokens' onChange={this.handleChange} />
            <Form.Button label='transferFrom()' content='Submit' secondary />
          </Form.Group>
        </Form>


      </Layout>
    );
  }

}

export default HomaPage;
