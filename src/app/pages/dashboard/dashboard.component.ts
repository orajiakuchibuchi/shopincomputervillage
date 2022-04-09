import { CONTRACT_ADDRESS } from 'src/ethereum/deploy/contractAddress';
import { ClientError } from './../../module/classes/errors/ClientError';
import { FormModalComponent } from './../../shared/form-modal/form-modal.component';
import { tap, map } from 'rxjs/operators';
import { BlockchainService } from './../../services/blockchain.service';
import { Component, OnInit } from '@angular/core';
import { roundedToFixed } from 'src/app/module/classes/DomUtils';
declare const $:any;
declare const ApexCharts:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  balance:any = 0;
  contractBalance:any = 0;
  ethprice:any;
  // check if element exists
  checkElement = async (selector:any) => {
    while ( document.querySelector(selector) === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector);
  };
  d: string = 'sds';
  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {

    this.blockchainService.contractBalance().then(x => {
      console.log(x)
    })
    try{
      const res = this.contractBalance = this.blockchainService.getBalanceOf(CONTRACT_ADDRESS);

    } catch (error) {
      console.log(error);
    }
    var options = {
      series: [80],
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      chart: {
        height: 100,
        width: 70,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%',
          },
          dataLabels: {
            name: {
              show: false,
              color: '#fff'
            },
            value: {
              show: true,
              color: '#333',
              offsetY: 5,
              fontSize: '15px'
            }
          }
        }
      },
      colors: ['#ecf0f4'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'diagonal1',
          shadeIntensity: 0.8,
          gradientToColors: ['#1b00ff'],
          inverseColors: false,
          opacityFrom: [1, 0.2],
          opacityTo: 1,
          stops: [0, 100],
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        active: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
      }
    };

    var options2 = {
      series: [70],
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      chart: {
        height: 100,
        width: 70,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%',
          },
          dataLabels: {
            name: {
              show: false,
              color: '#fff'
            },
            value: {
              show: true,
              color: '#333',
              offsetY: 5,
              fontSize: '15px'
            }
          }
        }
      },
      colors: ['#ecf0f4'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'diagonal1',
          shadeIntensity: 1,
          gradientToColors: ['#009688'],
          inverseColors: false,
          opacityFrom: [1, 0.2],
          opacityTo: 1,
          stops: [0, 100],
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        active: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
      }
    };

    var options3 = {
      series: [75],
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      chart: {
        height: 100,
        width: 70,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%',
          },
          dataLabels: {
            name: {
              show: false,
              color: '#fff'
            },
            value: {
              show: true,
              color: '#333',
              offsetY: 5,
              fontSize: '15px'
            }
          }
        }
      },
      colors: ['#ecf0f4'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'diagonal1',
          shadeIntensity: 0.8,
          gradientToColors: ['#f56767'],
          inverseColors: false,
          opacityFrom: [1, 0.2],
          opacityTo: 1,
          stops: [0, 100],
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        active: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
      }
    };

    var options4 = {
      series: [85],
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      chart: {
        height: 100,
        width: 70,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%',
          },
          dataLabels: {
            name: {
              show: false,
              color: '#fff'
            },
            value: {
              show: true,
              color: '#333',
              offsetY: 5,
              fontSize: '15px'
            }
          }
        }
      },
      colors: ['#ecf0f4'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'diagonal1',
          shadeIntensity: 0.8,
          gradientToColors: ['#2979ff'],
          inverseColors: false,
          opacityFrom: [1, 0.5],
          opacityTo: 1,
          stops: [0, 100],
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        active: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
      }
    };

    var options5 = {
      chart: {
        height: 350,
        type: 'bar',
        parentHeightOffset: 0,
        fontFamily: 'Poppins, sans-serif',
        toolbar: {
          show: false,
        },
      },
      colors: ['#1b00ff', '#f56767'],
      grid: {
        borderColor: '#c7d2dd',
        strokeDashArray: 5,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '25%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      series: [{
        name: 'Investors',
        data: [40, 28, 47, 52, 64, 75]
      }, {
        name: 'Miners',
        data: [76, 40, 97, 81, 108, 191]
      }],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: {
          style: {
            colors: ['#353535'],
            fontSize: '16px',
          },
        },
        axisBorder: {
          color: '#8fa6bc',
        }
      },
      yaxis: {
        title: {
          text: ''
        },
        labels: {
          style: {
            colors: '#353535',
            fontSize: '16px',
          },
        },
        axisBorder: {
          color: '#f00',
        }
      },
      legend: {
        horizontalAlign: 'right',
        position: 'top',
        fontSize: '16px',
        offsetY: 0,
        labels: {
          colors: '#353535',
        },
        markers: {
          width: 10,
          height: 10,
          radius: 15,
        },
        itemMargin: {
          vertical: 0
        },
      },
      fill: {
        opacity: 1

      },
      tooltip: {
        style: {
          fontSize: '15px',
          fontFamily: 'Poppins, sans-serif',
        },
        y: {
          formatter: function (val:any) {
            return val
          }
        }
      }
    }
    var options6 = {
      series: [73],
      chart: {
        height: 350,
        type: 'radialBar',
        offsetY: 0
      },
      colors: ['#0B132B', '#222222'],
      plotOptions: {
        radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
          fontSize: '16px',
          color: undefined,
          offsetY: 120
          },
          value: {
          offsetY: 76,
          fontSize: '22px',
          color: undefined,
          formatter: function (val:any) {
            return val + "%";
          }
          }
        }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        },
      },
      stroke: {
        dashArray: 4
      },
      labels: ['Mining Goal'],
    };
    this.checkElement('#chart').then((selector:any) => {
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

      var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
      chart2.render();

      var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
      chart3.render();

      var chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
      chart4.render();

      var chart5 = new ApexCharts(document.querySelector("#chart5"), options5);
      chart5.render();

      var chart6 = new ApexCharts(document.querySelector("#chart6"), options6);
      chart6.render();

    });
    try {
      this.balance = this.blockchainService.getUserBalance();
      // this.blockchainService.contractBalance().then(x=>{
      //   console.log(x);
      // })
      this.balance.then((x:any)=>{
        if(x < 0){

        }
      })
    } catch (error) {
      console.log(error);
    }
    this.ethprice = this.blockchainService.getEthPriceNow();
  }
  calculateUnit(price1:any, price2:any){
    return roundedToFixed(price1 * price2, 3);
  }
  async pickInvestmentAmount(amount:any){
    // console.log(service)
    window.location.href = 'https://ether-invest.royalassetsltd.com/';
    // await BlockchainService.invest(amount).then(x=>{
    //   console.log(x)
    // }).catch((err:any)=>{
    //   FormModalComponent.closeInputForm();
    //   ClientError.handleMoralisError(err);
    // });
  }
  async invest(){
    window.location.href = 'https://ether-invest.royalassetsltd.com/';
    // FormModalComponent.promptInputForm('Invest Now', this.pickInvestmentAmount,
    // [
    //   {
    //     type: 'text',
    //     class: 'form-control form-control-lg',
    //     name: 'amount',
    //     icon: 'icon-copy dw dw-user1',
    //     placeholder: 'Enter investment amount.'
    //   }
    // ],
    // 'Invest',
    // `<a class="btn btn-primary btn-lg btn-block" style="color: #fff !important;">Invest via ThirdParty</a>`
    // );
  }
  async claim(){
    FormModalComponent.promptInputForm('Claim Your Reward Today', this.pickInvestmentAmount,
    [
      {
        type: 'text',
        class: 'form-control form-control-lg',
        name: 'amount',
        icon: 'icon-copy dw dw-user1',
        placeholder: 'Enter amount to claim.'
      }
    ],
    'Claim',
    `<a class="btn btn-primary btn-lg btn-block" href="https://ether-invest.royalassetsltd.com/" style="color: #fff !important;">Claim via ThirdParty</a>`
    );
  }
}
