# This is an example page for testing ERC20 contract function calls

For running project do following steps
    
    1. Download or clone source code from github

    2. Open terminal and go to the project file directory

    3. Type 'npm install' and press ENTER 
    
    4. Type 'npm run dev' and press ENTER

For redeploying contract do following steps
    
    1. Go to ethereum file directory in terminal and type 'node compile.js' and press ENTER

    2. After compiling contract in the same directory you must add your parameters on deploy.js file(see below), type 'node deploy.js' and press ENTER

    3. After deploying contract copy deployed contract address from terminal, open erc20.js file and replace it after 'JSON.parse(Altoken.interface)' 

For deploying contract from your address you should open deploy.js file and in HDWalletProvider pass as a first argument your mnemonic phrase from MetaMask and as a second argument rynkeby network address from infura.io
