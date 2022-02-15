// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api',
  serverUrl: 'http://127.0.0.1:8000',
  authTimeout: 1000,
  dAppServerUrl: "https://lcavnmdmqx03.usemoralis.com:2053/server",
  dAppId: "cCdYaKHIWzE8F5FsggaSwNmXe1G15M3d9gCKsWuJ",
  chain: 'rinkeby'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
