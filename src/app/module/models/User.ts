import { delay } from "../classes/DomUtils";

declare const Moralis: any;

export class User extends Moralis.User {
  private _id: string = '';
  private _icon: string = '';
  private _username: string = '';
  private _accounts: string[] = [];
  private _email: string = '';
  private _ACL: string[] = [];
  private _authData: Object = {};
  private _sessionToken: string = '';
  private _ethAddress: string | null = null;
  private _balance: string = '0';
  public get balance(): string {
    return this._balance;
  }
  public set balance(value: string) {
    this._balance = value;
  }
  public get ethAddress(): string | null {
    return this._ethAddress;
  }
  constructor() {
    // Pass the ClassName to the Moralis.Object constructor
    super('User');
    // All other initialization
    this.set("icon", 'assets/images/chat-img2.jpg');
    this.icon = 'assets/images/chat-img2.jpg';
    // this._set("icon", 'assets/images/chat-img2.jpg');
  }
  authenticate(obj = {
    id: this._id,
    icon: this._icon,
    username: this._username,
    accounts: this._getKeyValue('accounts'),
    // createdAt: this._createdAt,
    // updatedAt: this._updatedAt,
    sessionToken: this._sessionToken,
    email: this._email,
  }){
    this._id = obj.id;
    this._icon = obj.icon;
    this._username = obj.username;
    // this._accounts = this.getKeyValue('accounts');
    console.log(this.getKeyValue('accounts'))
    // this._createdAt = obj.createdAt;
    // this._updatedAt = obj.updatedAt;
    this._email = obj.email;
    this._sessionToken = obj.sessionToken;
    if(this._accounts.length > 0){
      this._ethAddress = this._accounts[0];
    }
  }
  logout(){
    Moralis.User.logOut()
  }
  public get icon(): string {
    return this._icon;
  }
  public set icon(value: string) {
    this._icon = value;
  }
  hasAttribute(key:string) {
    return Moralis.User.get(key) ? true : false ;
  }

  getKeyValue(key:string){
    return this.get(key);
  }

  static async serverState(){
    const _newUser = new User();
    const res:any = await delay(2000, ()=> {
      const _state:any = Moralis.User.current();
      if(_state !== null && _state.id){
        _newUser.id = _state.id;
        _newUser.username = _state.attributes.username;
        _newUser.accounts = _state.attributes.accounts;
        _newUser._email = _state.attributes._email;
        _newUser._sessionToken = _state.attributes.sessionToken;
        _newUser._ethAddress = _state.attributes.ethAddress;
        _newUser._ACL = _state.attributes.ACL;
        _newUser._authData = _state.attributes.authData;
      }
      return _newUser;
    })
    return res;
  }
  public set ethAddress(value: string | null) {
    this._ethAddress = value;
  }
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }
  public get accounts(): string[] {
    return this._accounts;
  }
  public set accounts(value: string[]) {
    this._accounts = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get sessionToken(): string {
    return this._sessionToken;
  }
  public set sessionToken(value: string) {
    this._sessionToken = value;
  }
    public get authData(): Object {
    return this._authData;
  }
  public set authData(value: Object) {
    this._authData = value;
  }
  public get ACL(): string[] {
    return this._ACL;
  }
  public set ACL(value: string[]) {
    this._ACL = value;
  }
}
