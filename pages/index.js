import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import erc20 from '../ethereum/erc20';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';

class HomaPage extends Component {

  state = {
    tokenName: '',
    tokenSymbol: '',
    trnasferFrom: {
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

  submitTransferFrom = async () => {

  };

  submitApprove = async () => {

  };

  submitTrnasfer = async () => {

  };

  submitAllowance = async (event) => {
    event.preventDefault();

    this.setState(prevState => {
      let allowance = Object.assign({}, prevState.allowance);
      allowance.loading = true;              
      return { allowance };
    }); 

    const allowedTokensCount = await erc20.methods.allowance(this.state.allowance.tokenOwnerAddress, this.state.allowance.spenderAddress).call();
    alert(`Your allowed tokens count is ${allowedTokensCount}`);

    this.setState(prevState => {
      let allowance = Object.assign({}, prevState.allowance);
      allowance.loading = false;
      allowance.tokenOwnerAddress = '';
      allowance.spenderAddress= '';              
      return { allowance };
    });

  };

  submitBalanceOf = async (event) => {
    event.preventDefault();

    this.setState(prevState => {
      let balanceOf = Object.assign({}, prevState.balanceOf);
      balanceOf.loading = true;             
      return { balanceOf };
    });

    const balance = await erc20.methods.balanceOf(this.state.balanceOf.tokenOwnerAddress).call();
    alert(`Your balance is ${balance} ${this.state.tokenSymbol} tokens`);

    this.setState(prevState => {
      let balanceOf = Object.assign({}, prevState.balanceOf);
      balanceOf.loading = false;
      balanceOf.tokenOwnerAddress = '';             
      return { balanceOf };
    });

  };

  submitTotalSupply = async (event) => {
    event.preventDefault();

    this.setState(prevState => {
      let totalSupply = Object.assign({}, prevState.totalSupply);
      totalSupply.loading = true;
      return { totalSupply };
    });

    const supply = await erc20.methods.totalSupply().call();
    alert(`Your token's total supply is ${supply}`);

    this.setState(prevState => {
      let totalSupply = Object.assign({}, prevState.totalSupply);
      totalSupply.loading = false;
      return { totalSupply };
    })
  };

  render() {

    const { trnasferFrom, approve, transfer, allowance, balanceOf, totalSupply } = this.state;

    return (
      <Layout>
        <div>
          <h2>ERC20 Token</h2>
        </div>
        <Form>
          <Button onClick={this.getTokenName} positive>Get Token Name</Button>
          <Button onClick={this.getTokenSymbol} positive>Get Token Symbol</Button>
        </Form>

        <Form onSubmit={this.submitTransferFrom}>
          <Form.Group>
            <Form.Button label='Click for submit' content='TrnasferFrom()' secondary loading={trnasferFrom.loading} />
            <Form.Input label='Address From' placeholder='Address From'  onChange={this.handleChange} />
            <Form.Input label='Address to' placeholder='Address to' onChange={this.handleChange} />
            <Form.Input label='Tokens' placeholder='Tokens' onChange={this.handleChange} />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitTrnasfer}>
          <Form.Group>
            <Form.Button label='Click for submit' content='Transfer()' secondary loading={transfer.loading} />
            <Form.Input label='Address to' placeholder='Address to'  onChange={this.handleChange} />
            <Form.Input label='Tokens' placeholder='Tokens' onChange={this.handleChange} />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitApprove}>
          <Form.Group>
            <Form.Button label='Click for submit' content='Approve()' secondary loading={approve.loading} />
            <Form.Input label='Spender address' placeholder='Spender address'  onChange={this.handleChange} />
            <Form.Input label='Tokens' placeholder='Tokens' onChange={this.handleChange} />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitAllowance}>
          <Form.Group>
            <Form.Button label='Click for submit' content='Allowance()' primary loading={allowance.loading} />
            <Form.Input
              label='Token owner address' 
              placeholder='Token owner address'  
              value={allowance.tokenOwnerAddress}
              onChange={event => this.setState(prevState => {
                let allowance = Object.assign({}, prevState.allowance);
                allowance.tokenOwnerAddress = event.target.value;        
                return { allowance };
              })} 
            />
            <Form.Input 
              label='Spender address' 
              placeholder='Spender address' 
              value={allowance.spenderAddress}
              onChange={event => this.setState(prevState => {
                let allowance = Object.assign({}, prevState.allowance);
                allowance.spenderAddress = event.target.value;              
                return { allowance };
              })}
            />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitBalanceOf}>
          <Form.Group>
            <Form.Button label='Click for submit' content='BalanceOf()' primary loading={balanceOf.loading} />
            <Form.Input
              label='Token owner address' 
              placeholder='Token owner address'  
              value={balanceOf.tokenOwnerAddress}
              onChange={event =>{console.log(event);
               this.setState(prevState => {
                let balanceOf = Object.assign({}, prevState.balanceOf);
                console.log(event);
                
                balanceOf.tokenOwnerAddress = event.target.value;             
                return { balanceOf };
              })}}
            />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitTotalSupply}>
          <Form.Button label='Click for submit' content='TotalSupply()' primary loading={totalSupply.loading} />
        </Form>

      </Layout>
    );
  }
}

export default HomaPage;
