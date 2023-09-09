import { ChangeDetectorRef, Component } from '@angular/core';
import { DisplayService } from './Services/display.service';
import { Subject, takeUntil } from 'rxjs';

declare const gapi: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dubbizel_Angular';
  constructor(private displayService: DisplayService,private cdr: ChangeDetectorRef) {}
  
  showNavigation = true;

  private destroyed: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.displayService.showNavigation$
      .pipe(takeUntil(this.destroyed))
      .subscribe((visible: boolean) => {
        this.showNavigation = visible;
      });
  }
  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }
  ngOnDestroy(): void {
    this.destroyed.next();
  }

}
