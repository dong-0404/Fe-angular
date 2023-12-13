import { Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  
  constructor(private toasrt:ToastrService) {
  }

  showanimation() {
    console.log(1);
    this.toasrt.success("Success");
  }
}
