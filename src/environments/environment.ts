// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:3000',
  jsonServer: "https://opensource.herokuapp.com",
  baseapi: 'laslas.org',
  PAYSTACK_PUBLIC_KEY:'pk_test_c5b021a06e30964fb81f372a4fa139dadea37c10',
  PAYSTACK_URL:'https://js.paystack.co/v1/inline.js',
  getapi: (mod:any)=>{
    return `https://${mod}.laslas.org`;
  },
  api: 'https://authentication.laslas.org',
  clientID: 'FhYOhoQSbkbpvKOs6tRIZWHDtId9TEJyFnhff3voaH0ezFUZNtwxYbfgtSX5fx0e6',
  google_client_id: '378767313164-ns13c0fu1cukqk8g79doilcvrhi39fn1.apps.googleusercontent.com',
  google_client_secret: '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',
  youverify: {
    key: 'c2nLx4Wd.3NBNkHheA9gU08hkyGjnRBof8yxvNnpuPBl3',
    url: 'https://api.youverify.co'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
