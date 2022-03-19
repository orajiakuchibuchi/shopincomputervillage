import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../module/models/index';
import { BehaviorSubject, Subject } from 'rxjs';
import { ClientError } from '../module/classes/errors/ClientError';
import { roundedToFixed } from '../module/classes/DomUtils';
import { object } from 'underscore';
import { ABI } from 'src/ethereum/deploy/abi';
import { CONTRACT_ADDRESS } from 'src/ethereum/deploy/contractAddress';
const {getEthPriceNow,getEthPriceHistorical}= require('get-eth-price');

const convert = require('ether-converter')

declare const Moralis: any;

@Injectable({
  providedIn: 'root'
})

export class BlockchainService {
  serverUrl = "https://lcavnmdmqx03.usemoralis.com:2053/server";
  Appid = "cCdYaKHIWzE8F5FsggaSwNmXe1G15M3d9gCKsWuJ";
  // Make _userSource private so it's not accessible from the outside,
  // expose it as user$ observable (read-only) instead.
  // Write to _userSource only through specified store methods below.
  private readonly _userSource = new BehaviorSubject<User>(new User());

  // Exposed observable (read-only).
  public readonly user$ = this._userSource.asObservable();

  public _accountOptions = {
    chain: environment.chain,
  }

  constructor() {
    User.serverState().then(user => {
      this._setuser(user)
    });
  }


  // Get last value without subscribing to the user$ observable (synchronously).
  getuser(): User {
    return this._userSource.getValue();
  }
  async listenToUpdates(callback:Function){
    try {
      await Moralis.enableWeb3();
      let query = new Moralis.Query('EthTransactions');

      let subscription = await query.subscribe();
      subscription.on("create", (object:any)=>{
        console.log("Landing");
        console.log(object);
        return callback(object);
      });
    } catch (error) {
      ClientError.handleMoralisError(error);
    }

  }
  async getUserBalance(){
    // get mainnet native balance for the current user
    try {
      const balance = await Moralis.Web3API.account.getNativeBalance(this._accountOptions);
      const _4digit  = parseFloat(Moralis.Units.FromWei(balance.balance));
      return roundedToFixed(_4digit, 4);
    } catch (error) {
      return -1;
    }
  }
  async getBalanceOf(address:string, _chain:string = this._accountOptions.chain){
    const _accountOptions = {
      chain: _chain,
      address: address
    }
    try {
      const balance = await Moralis.Web3API.account.getNativeBalance(_accountOptions);
      const _4digit  = parseFloat(Moralis.Units.FromWei(balance.balance));
      return roundedToFixed(_4digit, 4);
    } catch (error) {
      return -1;
    }
  }

  async getEthPriceNow(_in:string = 'USD'){
    const price  = await getEthPriceNow();
    let convertedprice = 0;
    Object.keys(price).forEach((key) => {
      convertedprice = price[key].ETH[_in.toUpperCase()];
    });
    return convertedprice;
  }
  get authstatus(){
    return this._userSource.asObservable();
  }
  _setuser(user: User): void {
    this._userSource.next(user);
  }
  removeUser(_user: User): void {
    const user = this.getuser().filter((u:User) => {u.address !== _user.address});
    this._setuser(user);
  }

  // adoptPuppy(puppy: User): void {
  //   const user = this.getuser().map(p =>
  //     // p.id === puppy.id ? new User({ ...p, ...{ adopted: true } }) : p
  //   );
  //   this._setuser(user);
  // }
  initalize(serverUrl=this.serverUrl, Appid=this.Appid){
    Moralis.start(
      {
        serverUrl: serverUrl,
        appId: Appid,
      }
    );
  }
  async loginByUsername(email:string, password:string){
    let user = Moralis.User.current();
    if (!user) {
      // try {
      //   user = await Moralis.User.logIn(email, password, { usePost: true });
      //   await Moralis.enableWeb3();
      // } catch (error) {
      //   console.log(error)
      // }
      const user = new User();
      user.set("username", email);
      user.set("password", password);
      user.set("email", email);

      // other fields can be set just like with Moralis.Object
      // user.set("phone", "415-392-0202");
      try {
        const newUser = await user.signUp();
        const _authuser = await Moralis.User.logIn(email, password);
        return _authuser;
        // Hooray! Let them use the app now.
      } catch (error:any) {
        // Show the error message somewhere and let the user try again.
        const _authuser = await Moralis.User.logIn(email, password);
        return _authuser;
      }
    }
    return user;
  }
  async login() {
    let user = Moralis.User.current();
    if (!user) {
      try {
        user = await Moralis.authenticate({signingMessage:"Authenticate EstateDap"});
        await Moralis.enableWeb3();
      } catch (error) {
        ClientError.handleMoralisError(error);
      }
    }
    return user;
  }

  async logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }
  static async invest(amount:any) {
    let options = {
      contractAddress: CONTRACT_ADDRESS,
      functionName: "invest",
      abi: ABI,
      params:{
        note: "Thanks for your work bro. saving life"
      },
      msgValue: Moralis.Units.ETH(amount)
    }
    await Moralis.enableWeb3();
    const result = await Moralis.executeFunction(options);
    return result;
  }
  async invest(amount:any) {
    const _weiAmount = convert(amount, 'ether');
    let options = {
      contractAddress: CONTRACT_ADDRESS,
      functionName: "invest",
      abi: ABI,
      params:{
        note: "Thanks for your work bro. saving life"
      },
      msgValue: Moralis.Units.ETH(_weiAmount.wei)
    }
    await Moralis.enableWeb3();
    await Moralis.executeFunction(options);
  }
  async contractBalance() {
    // console.log(ABI)
    let options = {
      chain: environment.chain,
      contractAddress: CONTRACT_ADDRESS,
      function_name: "investorCount",
      abi: ABI,
      // params:{
      //   address: "0x67ADf16A4fAf5702fd204FaFAAb4403fdDA3871B"
      // },
    }
    // await Moralis.enableWeb3();
    // return await Moralis.executeFunction(options);
    return await Moralis.Web3API.native.runContractFunction(options);
  }

  async currentUser(){
    console.log(this.getuser());
    return Moralis.User.currentAsync().then((result:any) => {
      return result;
    }).catch((err:any) => {
      ClientError.handleMoralisError(err);
    });;
  }

}
