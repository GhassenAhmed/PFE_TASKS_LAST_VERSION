import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  OpenedSideBar:Boolean=true;
  current = this.router.url;
  constructor(private router: Router) {
      this.current = this.router.url;
      console.log(this.current);

  }
  ngOnInit(): void {

  }
}
