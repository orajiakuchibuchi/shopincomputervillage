import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loginRoute: any = {
    name: 'Login',
    url: 'auth/login'
  };
  width = 100;
  perfData = window.performance.timing;// The PerformanceTiming interface represents timing-related performance information for the given page.
  EstimatedTime = -(this.perfData.loadEventEnd - this.perfData.navigationStart);
  time = (this.EstimatedTime/1000%60)*100;

  // Percentage Increment Animation
  PercentageID = $("#percent1");
  start = 0;
  end = 100;
  // @Input() durataion = this.time;

  @Input() durataion:number = this.time;
  @Input() image:string = '../assets/vendors/images/logo-icon.png';
  @Input() message:string = 'Loading. Please wait....';
  constructor(private authService :AuthService) { }

  ngOnInit(): void {
    // Fading Out Loadbar on Finised
    setTimeout(function(){
      $('.pre-loader').fadeOut(300);
      }, this.time);
      this.durataion = this.durataion * 1000;
      this.animateValue(this.PercentageID, this.start, this.end, this.durataion);
  }

  animateValue(id:any, start:any, end:any, duration:any) {

    var range = end - start,
        current = start,
        increment = end > start? 1 : -1,
        stepTime = Math.abs(Math.floor(duration / range)),
        obj = $(id);

    var timer = setInterval(function() {
      current += increment;
      $(obj).text(current + "%");
      $("#bar1").css('width', current+"%");
        //obj.innerHTML = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
  static show(duration: number = 2000){
    (<HTMLInputElement>document.getElementById("preLoader")).style.display = "flex";
    const end = 100;
    const start = 0;
    var range = end - start,
        current = start,
        increment = end > start? 1 : -1,
        stepTime = Math.abs(Math.floor(duration / range)),
        obj = $("percent1");

    var timer = setInterval(function() {
      current += increment;
      $(obj).text(current + "%");
      $("#bar1").css('width', current+"%");
        //obj.innerHTML = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
  static hide(){
    (<HTMLInputElement>document.getElementById("preLoader")).style.display = "None";
  }

}
