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

    this.setState(prevState => {
      let transferFrom = Object.assign({}, prevState.transferFrom);
      transferFrom.loading = true;              
      return { transferFrom };
    });

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

    this.setState(prevState => {
      let transferFrom = Object.assign({}, prevState.transferFrom);
      transferFrom.addressFrom = '';
      transferFrom.addressTo = '';
      transferFrom.tokens = '';
      transferFrom.loading = false;              
      return { transferFrom };
    });
  };

  submitTrnasfer = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState(prevState => {
      let transfer = Object.assign({}, prevState.transfer);
      transfer.loading = true;              
      return { transfer };
    });

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

    this.setState(prevState => {
      let transfer = Object.assign({}, prevState.transfer);
      transfer.addressTo = '';
      transfer.tokens = '';
      transfer.loading = false;              
      return { transfer };
    });
  };

  submitApprove = async (event) => {
    event.preventDefault();
    this.updateAccountAddress();
    const accounts = await web3.eth.getAccounts();

    this.setState(prevState => {
      let approve = Object.assign({}, prevState.approve);
      approve.loading = true;              
      return { approve };
    });

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

    this.setState(prevState => {
      let approve = Object.assign({}, prevState.approve);
      approve.spenderAddress = '';
      approve.tokens = '';
      approve.loading = false;              
      return { approve };
    });
  };

  submitAllowance = async (event) => {
    event.preventDefault();

    this.setState(prevState => {
      let allowance = Object.assign({}, prevState.allowance);
      allowance.loading = true;              
      return { allowance };
    });

    try {
      const allowedTokensCount = await erc20.methods.allowance(this.state.allowance.tokenOwnerAddress, this.state.allowance.spenderAddress).call();
      alert(`Allowed tokens \nfrom ${this.state.allowance.tokenOwnerAddress} address\
      \nto ${this.state.allowance.spenderAddress} address \nare ${allowedTokensCount}(ALX)`);
    } catch (err) {
      alert(err.message);
    };

    this.setState(prevState => {
      let allowance = Object.assign({}, prevState.allowance);
      allowance.loading = false;
      allowance.tokenOwnerAddress = '';
      allowance.spenderAddress = '';              
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

    try {
      const balance = await erc20.methods.balanceOf(this.state.balanceOf.tokenOwnerAddress).call();
      alert(`Your balance is ${balance} ${this.state.tokenSymbol} tokens`);
    } catch (err) {
      alert(err.message);
    };

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

    try {
      const supply = await erc20.methods.totalSupply().call();
      alert(`Your token's total supply is ${supply}`);
    } catch (err) {
      alert(err.message);
    };

    this.setState(prevState => {
      let totalSupply = Object.assign({}, prevState.totalSupply);
      totalSupply.loading = false;
      return { totalSupply };
    })
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
            <Form.Button label='Click for submit' content='TrnasferFrom()' secondary loading={transferFrom.loading} />
            <Form.Input 
              label='Address From' 
              placeholder='Address From'
              value={transferFrom.addressFrom}
              onChange={event => {
                let value = event.target.value;
                this.setState(prevState => {
                let transferFrom = Object.assign({}, prevState.transferFrom);
                transferFrom.addressFrom = value;        
                return { transferFrom };
              })}}
            />
            <Form.Input 
              label='Address to' 
              placeholder='Address to'
              value={transferFrom.addressTo}
              onChange={event => {
                let value = event.target.value;
                this.setState(prevState => {
                let transferFrom = Object.assign({}, prevState.transferFrom);
                transferFrom.addressTo = value;        
                return { transferFrom };
              })}} 
            />
            <Form.Input 
              label='Tokens' 
              placeholder='Tokens'
              value={transferFrom.tokens}
              onChange={event => {
                let value = event.target.value;
                this.setState(prevState => {
                let transferFrom = Object.assign({}, prevState.transferFrom);
                transferFrom.tokens = value;        
                return { transferFrom };
              })}} 
            />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitTrnasfer}>
          <Form.Group>
            <Form.Button label='Click for submit' content='Transfer()' secondary loading={transfer.loading} />
            <Form.Input 
              label='Address to' 
              placeholder='Address to'
              value={transfer.addressTo} 
              onChange={event => {
                let value = event.target.value;
                this.setState(prevState => {
                let transfer = Object.assign({}, prevState.transfer);
                transfer.addressTo = value;        
                return { transfer };
              })}}
            />
            <Form.Input 
              label='Tokens' 
              placeholder='Tokens' 
              value={transfer.tokens}
              onChange={event => {
                let value = event.target.value;
                this.setState(prevState => {
                let transfer = Object.assign({}, prevState.transfer);
                transfer.tokens = value;        
                return { transfer };
              })}} 
            />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitApprove}>
          <Form.Group>
            <Form.Button label='Click for submit' content='Approve()' secondary loading={approve.loading} />
            <Form.Input 
              label='Spender address' 
              placeholder='Spender address'
              value={approve.spenderAddress} 
              onChange={event => {
                let value = event.target.value;
                this.setState(prevState => {
                let approve = Object.assign({}, prevState.approve);
                approve.spenderAddress = value;        
                return { approve };
              })}}
            />
            <Form.Input 
              label='Tokens' 
              placeholder='Tokens'
              value={approve.tokens}
              onChange={event => {
                let value = event.target.value;
                this.setState(prevState => {
                let approve = Object.assign({}, prevState.approve);
                approve.tokens = value;        
                return { approve };
              })}}  
            />
          </Form.Group>
        </Form>

        <Form onSubmit={this.submitAllowance}>
          <Form.Group>
            <Form.Button label='Click for submit' content='Allowance()' primary loading={allowance.loading} />
            <Form.Input
              label='Token owner address' 
              placeholder='Token owner address'  
              value={allowance.tokenOwnerAddress}
              onChange={event => {
                let value = event.target.value;
                this.setState(prevState => {
                let allowance = Object.assign({}, prevState.allowance);
                allowance.tokenOwnerAddress = value;        
                return { allowance };
              })}} 
            />
            <Form.Input 
              label='Spender address' 
              placeholder='Spender address' 
              value={allowance.spenderAddress}
              onChange={event => {
                let value = event.target.value;
                this.setState(prevState => {
                let allowance = Object.assign({}, prevState.allowance);
                allowance.spenderAddress = value;              
                return { allowance };
              })}}
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
              onChange={event => {
                let value = event.target.value; 
                this.setState(prevState => {
                let balanceOf = Object.assign({}, prevState.balanceOf);
                balanceOf.tokenOwnerAddress = value;             
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
