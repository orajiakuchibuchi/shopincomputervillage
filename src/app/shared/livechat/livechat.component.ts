import { Component, OnInit } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {
  messages: Array<any> = [
    {
      id: 1,
      role: 'support',
      message: 'Hello, my name is kelechi. I am your support representative and will be glad to be of assistance to you',
    },
    {
      id: 2,
      role: 'user',
      message: 'Hello kelechi, please how can i change my password?',
    }
  ];
  sending:boolean = false;
  constructor() { }

  ngOnInit(): void {
    /* Whatsapp Chat Widget by www.idblanter.com */
    $(document).on("click", "#send-it", () => {
      var a:any = document.getElementById("chat-input");
      var b = $("#get-number").text(),
      c = (<HTMLTextAreaElement>document.getElementById("chat-input")).value;
      this.sendIt(a,b,c);
    }),
      $(document).on("click", ".informasi", ()=> {
        ((<HTMLElement>document.getElementById("get-number")).innerHTML = $(this)
          .children(".my-number")
          .text()),
          $(".start-chat,.get-new").addClass("show").removeClass("hide"),
          $(".home-chat,.head-home").addClass("hide").removeClass("show"),
          ((<HTMLElement>document.getElementById("get-nama")).innerHTML = $(this)
            .children(".info-chat")
            .children(".chat-nama")
            .text()),
          ((<HTMLElement>document.getElementById("get-label")).innerHTML = $(this)
            .children(".info-chat")
            .children(".chat-label")
            .text());
      }),
      $(document).on("click", ".close-chat", function () {
        $("#whatsapp-chat").addClass("hide").removeClass("show");
      }),
      $(document).on("click", ".blantershow-chat", function () {
        $("#whatsapp-chat").addClass("show").removeClass("hide");
      });
  }
  sendIt(first:any,second:any,value:any){
    this.sending = true;
    if(value){
      console.log(value)
      const message = this.messages;
      message.push(
        {
          id: this.messages.length+1,
          role: 'user',
          message: value,
        }
      );
      this.messages = message;
      setTimeout(() => {
        this.sending = false;
      }, 5000);
    }
  }
}
