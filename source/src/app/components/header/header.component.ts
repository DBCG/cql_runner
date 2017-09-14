import { Component } from '@angular/core';

@Component ({
  selector: "cql-header",
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  resources = false;

  toggleResources () {
    this.resources = !this.resources;
  }
}
