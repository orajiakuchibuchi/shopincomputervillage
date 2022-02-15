import { Console } from 'console';
import { FormModalComponent } from './../../../shared/form-modal/form-modal.component';
import { ErrorFormat } from './../../models/ErrorFormat';
declare const Moralis: any;

export class ClientError {
  static handleMoralisError(err:any) {
    console.log(err.code);
    switch (err.code) {
      case Moralis.Error.INVALID_SESSION_TOKEN:
        FormModalComponent.prompt('INVALID SESSION TOKEN', 'auth/login', 'error', ()=> {window.location.href = 'auth/login'}, 'Your session token has expired. Please Login again');
        Moralis.User.logOut();
        // If web browser, render a log in screen
        // If Express.js, redirect the user to the log in route
        break;
      case 4001:
        FormModalComponent.prompt('WALLET SIGNATURE DENIED', undefined, 'error', 'Close', err.message);
        break;
      case 'INSUFFICIENT_FUNDS':
        FormModalComponent.prompt('INSUFFICIENT WALLET BALANCE', undefined, 'error', 'Close', 'Insufficient funds for gas, price and value. Ensure to Have sufficient funds in your wallet for transaction');
        break;
      case -32002:
        FormModalComponent.prompt('PENDING WALLET REQUEST', undefined, 'error', 'Close', 'You have a pending request from your wallet. Sign request to use application.');
        break;
      // Other Moralis API errors that you want to explicitly handle
    }

  }
}

