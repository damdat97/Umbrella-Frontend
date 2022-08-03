// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 firebaseConfig : {
   apiKey: "AIzaSyCRmRUfBSuLx1aG6VPPGte-Apzg3gsOdD8",
   authDomain: "ducthuan.firebaseapp.com",
   databaseURL:"https://ducthuan-default-rtdb.firebaseio.com/",
   projectId: "ducthuan",
   storageBucket: "ducthuan.appspot.com",
   messagingSenderId: "105940412277",
   appId: "1:105940412277:web:7db616fdaf23055245953c",
   measurementId: "G-312SC4N6W2"
 },
  apiUrl: 'http://localhost:8080'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
