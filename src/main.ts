import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
declare const Moralis: any;
const serverUrl = "https://ipk4su8wnyfk.usemoralis.com:2053/server";
const Appid = "8d3IxRwdmncjW04DwqnKqz1MiXZnEgwR84gJsQDA";
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(()=>{
  // try {
  //   Moralis.start(
  //     {
  //       serverUrl: serverUrl,
  //       appId: Appid,
  //     }
  //   );
  // } catch (error) {
  //   console.log('errr');
  // }
})
  .catch(err => {
    console.error(err);
  });
