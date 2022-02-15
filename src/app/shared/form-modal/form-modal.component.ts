import {CustomFileSystem} from "src/app/module/classes/custom-file-system";
import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { insertAfter, waitForElementToDisplay } from "src/app/module/classes/DomUtils";
declare var $: any;
export interface InputForm {
  type: string;
  class: string;
  name: string
  placeholder?: string;
  icon?: string;
}
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  @Input() modalData:any = {
    title: 'Form Submitted',
    fallbackUrl: undefined,
    type: 'success', // success, error, info,
    button: 'Done',
    message: ''
  };
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  static prompt(title: string='Form Submitted',
                fallbackUrl: any=undefined,
                type:string='success',
                button: string|Function='Done',
                message: string = 'You have successfully submitted form',
                timeout: number = 200) {
                waitForElementToDisplay(
                  'formModalTitle',
                  ()=>{
                    FormModalComponent.loadElemets(
                      title,fallbackUrl, type,button,
                      message, timeout)
                  },
                  1000, 10000);
  }
  static loadElemets(title: string='Form Submitted',
                fallbackUrl: any=undefined,
                type:string='success',
                button: string|Function = 'Close',
                message: string = 'You have successfully submitted form',
                timeout: number = 10000){
                      // Fetch all part of the modal from the DOM
                      const titleId =  (<HTMLInputElement>document.getElementById('formModalTitle'));
                      const formModalFallbackId =  (<HTMLLinkElement>document.getElementById('formModalFallbackId'));
                      const formModaltypeId = (<HTMLInputElement>document.getElementById('formModaltype'));
                      const formModalmessagekId = (<HTMLInputElement>document.getElementById('formModalmessageback'));
                      // Prompt modal after half a second
                      setTimeout(() => {
                        titleId.innerText = title;
                        // Locally store the modal click navigation path
                        localStorage.setItem('_tempFormClickUrl', fallbackUrl);
                        // note set the fallbackUrl to undefined if you wish to safely close modal on button click
                        // if not undefined assign it to route href
                        if(fallbackUrl !== undefined){
                          formModalFallbackId.href = fallbackUrl;
                        }
                        // Set button text
                        if(typeof button === 'function'){
                          formModalFallbackId.onclick = ()=>{return button()};
                        }else{
                          formModalFallbackId.innerText = button;
                        }
                        // Set modal icon
                        if(type.toLocaleLowerCase() === 'error') {
                          formModaltypeId.src = '../../../assets/vendors/images/cross.png';
                        }else if(type.toLocaleLowerCase() === 'caution'){
                          formModaltypeId.src = '../../../assets/vendors/images/caution-sign.png';
                        }else if(type.toLocaleLowerCase() === 'success'){
                          formModaltypeId.src = '../../../assets/vendors/images/success.png';
                        }
                        // Set modal message
                        formModalmessagekId.innerText = message;
                        // Prompt modal
                        $('#success-modal').modal('show');
                        // display.click();
                      }, timeout);
  }
  action(url: any){
    const formModalFallbackId =  (<HTMLLinkElement>document.getElementById('formModalFallbackId')).href;
    // If modal is undefined, or is equals to current page url, or url is null or "#".
    // Close modal
    if(formModalFallbackId.includes(this.router.url) ||
        formModalFallbackId === "#" || url === null ||
        url === undefined){
      FormModalComponent.close();
      return;
    }else{
      // Get fallback url from local storage
      url = localStorage.getItem('_tempFormClickUrl');
      // if valid url navigation is available
      if(url){
        // Remove item from storage
        localStorage.removeItem('_tempFormClickUrl')
      }
      // Navigate to fallback
      this.router.navigate([url]).catch( reason => {
        (<HTMLInputElement>document.getElementById('formModalTitle')).innerText = 'Route navigation error';
        (<HTMLLinkElement>document.getElementById('formModalFallbackId')).href = '#';
        (<HTMLLinkElement>document.getElementById('formModalFallbackId')).innerText = 'Back to safety';
        (<HTMLInputElement>document.getElementById('formModalmessageback')).innerText = 'Error in navigating to route link';
        (<HTMLInputElement>document.getElementById('formModaltype')).src = '../../../assets/vendors/images/caution-sign.png';
        setTimeout(()=>{
          this.action(null);
        }, 2000);
      });
    }
  }
  static close(timeout = 500){

    setTimeout(() => {
      $('#success-modal').modal('hide');
    }, timeout);
  }
  static closeInputForm(){
    (<HTMLInputElement>document.getElementById('formModal')).click();
  }
  static promptInputForm(title: string='Form Submitted',
                          buttonAction: string|Function='Done',
                          input:InputForm[],
                          buttonText: string,
                          extraBtn: string = '' ){
        const formModal = (<HTMLInputElement>document.getElementById('formModal'));
        const inpForm = (<HTMLInputElement>document.getElementById('inpForm'));
        const inputFormModalTitle = (<HTMLInputElement>document.getElementById('inputFormModalTitle'));
        let inputFormAction;
        inputFormModalTitle.innerText = title;
        if(typeof buttonAction === 'function'){
          inputFormAction = `
          <div class="row">
          <div class="col-sm-12">
            <div class="input-group mb-0">
              <a class="btn btn-primary btn-lg btn-block" style="color: #fff !important;" id="clickFurther" >${buttonText}</a>
              ${extraBtn}
              <a class="btn btn-primary btn-lg btn-block" style="color: #fff !important;" onclick="closeInputForm()">Close</a>
            </div>
          </div>
        </div>
          `;
        }else{
          inputFormAction = `
          <div class="row">
          <div class="col-sm-12">
            <div class="input-group mb-0">
              <a class="btn btn-primary btn-lg btn-block" style="color: #fff !important;">${buttonText}</a>
              <hr>
              ${extraBtn}
              <a class="btn btn-primary btn-lg btn-block" style="color: #fff !important;" onclick="closeInputForm()">Close</a>
            </div>
          </div>
        </div>
          `
        }
        let inputToDump = ``;
        input.forEach((inp, index) => {
          inputToDump+= `
          <div class="input-group custom">
            <input type="${inp.type}" class="${inp.class}" id="${inp.type}"
             placeholder="${inp.placeholder ? inp.placeholder : 'Enter value for '+inp.name}">
            <div class="input-group-append custom">
              <span class="input-group-text"><i class="${inp.icon}"></i></span>
            </div>
          </div>
          `
        });
        inputToDump+=inputFormAction;
        inpForm.innerHTML = inputToDump;
        formModal.click();
        if(typeof buttonAction === 'function'){
          (<HTMLInputElement>document.getElementById('clickFurther')).addEventListener('click', function(){
            const amount = (<HTMLInputElement>document.getElementById('text')).value;
            buttonAction(amount)
         });
        }
  }
}
