import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCdkx3TXxbf1xzZFRHalhWTnRaUj0eQnxTdEZjXn5XcndRQWJaVUN/Vg==');

// import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



  // const platform = platformBrowserDynamic();
  // platform.bootstrapModule(AppModule);