import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import erc20 from '../ethereum/erc20';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';

class HomaPage extends Component {

  state = {
    tokenName: '',
    tokenSymbol: '',
    tokenContractAddress: '0x5117d71aFb8b3699354F21792563501BEe419D26',
    transferFrom: {
      addressFrom: '',
      addressTo: '',
      tokens: '',
      loading: false
    },
    approve: {
      spenderAddress: '',
      tokens: '',
      loading: false
    },
    transfer: {
      addressTo: '',
      tokens: '',
      loading: false
    },
    allowance: {
      tokenOwnerAddress: '',
      spenderAddress: '',
      loading: false
    },
    balanceOf: {
      tokenOwnerAddress: '',
      loading: false
    },
    totalSupply: {
      loading: false
    }
  };

  async componentDidMount() {
    const name = await erc20.methods.name().call();
    const symbol = await erc20.methods.symbol().call();
    this.setState({
      tokenName: name,
      tokenSymbol: symbol,
    });
  };

  changeState = (objectName, properties, values) => {
    this.setState(prevState => {
      const newObject = Object.assign({}, prevState[objectName]);
      for (let i = 0; i < properties.length; i++) {
        newObject[properties[i]] = values[i]; 
      }          
      return { [objectName]: newObject };
    })
  };

  getTokenName = () => {
    alert(`Your token name is ${this.state.tokenName}`);
  };

  getTokenSymbol = () => {
    alert(`Your token symbol is ${this.state.tokenSymbol}`);
  };

  getTokenContractAddress = () => {
    alert(`Your ERC20 token's contract address is ${this.state.tokenContractAddress}`);
  }

  submitTransferFrom = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.changeState('transferFrom', ['loading'], [true]);

    try {
      await erc20.methods.transferFrom(
        this.state.transferFrom.addressFrom,
        this.state.transferFrom.addressTo,
        this.state.transferFrom.tokens
      ).send({
        from: accounts[0]
      });
      alert(`You transfer \nfrom ${this.state.transferFrom.addressFrom} address\
      \nto ${this.state.transferFrom.addressTo} address \n${this.state.transferFrom.tokens} ALX tokens`);
    } catch (err) {
      alert(err.message);
    }

    this.changeState('transferFrom', ['loading', 'addressFrom', 'addressTo', 'tokens'], [false, '', '', '']);
  };

  submitTrnasfer = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.changeState('transfer', ['loading'], [true]);

    try {
      await erc20.methods.transfer(
        this.state.transfer.addressTo,
        this.state.transfer.tokens
      ).send({
        from: accounts[0]
      });
      alert(`You transfer \nfrom ${accounts[0]} address\
      \nto ${this.state.transfer.addressTo} address \n${this.state.transfer.tokens} ALX tokens`);
    } catch (err) {
      alert(err.message);
    }

    this.changeState('transfer', ['loading', 'addressTo', 'tokens'], [false, '', '']);
  };

  submitApprove = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.changeState('approve', ['loading'], [true]);

    try {
      await erc20.methods.approve(
        this.state.approve.spenderAddress,
        this.state.approve.tokens
      ).send({
        from: accounts[0]
      });
      alert(`You approve allowing \nfrom ${accounts[0]} address\
      \nto ${this.state.approve.spenderAddress} address \n${this.state.approve.tokens} ALX tokens`);
    } catch (err) {
      alert(err.message);
    }

    this.changeState('approve', ['loading', 'spenderAddress', 'tokens'], [false, '', '']);
  };

  submitAllowance = async (event) => {
    event.preventDefault();

    this.changeState('allowance', ['loading'], [true]);

    try {
      const allowedTokensCount = await erc20.methods.allowance(this.state.allowance.tokenOwnerAddress, this.state.allowance.spenderAddress).call();
      alert(`Allowed tokens \nfrom ${this.state.allowance.tokenOwnerAddress} address\
      \nto ${this.state.allowance.spenderAddress} address \nare ${allowedTokensCount}(ALX)`);
    } catch (err) {
      alert(err.message);
    };

    this.changeState('allowance', ['loading', 'tokenOwnerAddress', 'spenderAddress'], [false, '', '']);
  };

  submitBalanceOf = async (event) => {
    event.preventDefault();

    this.changeState('balanceOf', ['loading'], [true]);

    try {
      const balance = await erc20.methods.balanceOf(this.state.balanceOf.tokenOwnerAddress).call();
      alert(`Your balance is ${balance} ${this.state.tokenSymbol} tokens`);
    } catch (err) {
      alert(err.message);
    };

    this.changeState('balanceOf', ['loading', 'tokenOwnerAddress'], [false, '']);
  };

  submitTotalSupply = async (event) => {
    event.preventDefault();

    this.changeState('totalSupply', ['loading'], [true]);

    try {
      const supply = await erc20.methods.totalSupply().call();
      alert(`Your token's total supply is ${supply}`);
    } catch (err) {
      alert(err.message);
    };

    this.changeState('totalSupply', ['loading'], [false]);
  };

  render() {

    const { transferFrom, transfer, approve, allowance, balanceOf, totalSupply } = this.state;

    return (
      <Layout>
        <div>
          <h2>ERC20 Token</h2>
        </div>
        <Form>
          <Button onClick={this.getTokenName} positive>Get Token Name</Button>
          <Button onClick={this.getTokenSymbol} positive>Get Token Symbol</Button>
          <Button onClick={this.getTokenContractAddress} positive>Get Token Contract Address</Button>
        </Form>

        <Form onSubmit={this.submitTransferFrom}>
          <Form.Group>
            <Form.Button label='Click for submit' content='TrnasferFrom()' secondary loading={transferFrom.loading} disabled={transferFrom.loading} />
            <Form.Input 
              label='Address From' 
              placeholder='Address From'
              value={transferFrom.addressFrom}
              onChange={event => this.changeState('transferFrom', ['addressFrom'], [event.target.value])}
            />
            <Form.Input 
              label='Address to' 
              placeholder='Address to'
              value={transferFrom.addressTo}
              onChange={event => this.changeState('transferFrom', ['addressTo'], [event.target.value])}
            />
            <Form.Input 
              label='Tokens' 
              placeholder='Tokens'
              value={transferFrom.tokens}
              onChange={event => this.changeState('transferFrom', ['tokens'], [event.target.value])}
            />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitTrnasfer}>
          <Form.Group>
            <Form.Button label='Click for submit' content='Transfer()' secondary loading={transfer.loading} disabled={transfer.loading} />
            <Form.Input 
              label='Address to' 
              placeholder='Address to'
              value={transfer.addressTo} 
              onChange={event => this.changeState('transfer', ['addressTo'], [event.target.value])}
            />
            <Form.Input 
              label='Tokens' 
              placeholder='Tokens' 
              value={transfer.tokens}
              onChange={event => this.changeState('transfer', ['tokens'], [event.target.value])}
            />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitApprove}>
          <Form.Group>
            <Form.Button label='Click for submit' content='Approve()' secondary loading={approve.loading} disabled={approve.loading} />
            <Form.Input 
              label='Spender address' 
              placeholder='Spender address'
              value={approve.spenderAddress} 
              onChange={event => this.changeState('approve', ['spenderAddress'], [event.target.value])}
            />
            <Form.Input 
              label='Tokens' 
              placeholder='Tokens'
              value={approve.tokens}
              onChange={event => this.changeState('approve', ['tokens'], [event.target.value])}
            />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitAllowance}>
          <Form.Group>
            <Form.Button label='Click for submit' content='Allowance()' primary loading={allowance.loading} disabled={allowance.loading} />
            <Form.Input
              label='Token owner address' 
              placeholder='Token owner address'  
              value={allowance.tokenOwnerAddress}
              onChange={event => this.changeState('allowance', ['tokenOwnerAddress'], [event.target.value])}
            />
            <Form.Input 
              label='Spender address' 
              placeholder='Spender address' 
              value={allowance.spenderAddress}
              onChange={event => this.changeState('allowance', ['spenderAddress'], [event.target.value])}
            />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitBalanceOf}>
          <Form.Group>
            <Form.Button label='Click for submit' content='BalanceOf()' primary loading={balanceOf.loading} disabled={balanceOf.loading} />
            <Form.Input
              label='Token owner address' 
              placeholder='Token owner address'  
              value={balanceOf.tokenOwnerAddress}
              onChange={event => this.changeState('balanceOf', ['tokenOwnerAddress'], [event.target.value])}
            />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitTotalSupply}>
          <Form.Button label='Click for submit' content='TotalSupply()' primary loading={totalSupply.loading} disabled={totalSupply.loading} />
        </Form>

      </Layout>
    );
  }
}

export default HomaPage;
