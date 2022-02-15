import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
declare const Moralis: any;
const serverUrl = "https://lcavnmdmqx03.usemoralis.com:2053/server";
const Appid = "cCdYaKHIWzE8F5FsggaSwNmXe1G15M3d9gCKsWuJ";
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(()=>{
  try {
    Moralis.start(
      {
        serverUrl: serverUrl,
        appId: Appid,
      }
    );
  } catch (error) {
    console.log('errr');
  }
})
  .catch(err => {
    console.error(err);
  });
