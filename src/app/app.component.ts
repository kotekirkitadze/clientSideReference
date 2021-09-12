import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-reference';

  constructor(private loadingService: LoadingService) {
  }

  loading$: Observable<boolean>;

  ngOnInit() {
    this.loading$ = this.loadingService.getLoading$;

  }

}
