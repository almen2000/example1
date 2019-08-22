import web3 from './web3';
import Altoken from './build/Altoken.json';

const instance = new web3.eth.Contract(
  JSON.parse(Altoken.interface),
  '0x5117d71aFb8b3699354F21792563501BEe419D26'
);

export default instance;
