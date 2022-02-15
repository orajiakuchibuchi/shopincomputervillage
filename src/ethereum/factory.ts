import * as web3 from "./web3";
import {Inv} from './build/Investment';
import {CONTRACT_ADDRESS} from './deploy/contractAddress';

let w:any = web3;
const investmentFactory = w.eth.Contract(
    JSON.parse(Inv.interface), CONTRACT_ADDRESS
);

export default investmentFactory;

