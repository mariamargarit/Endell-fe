import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  options = this._formBuilder.group({
    bottom: 0,
    fixed: true,
    top: 0,
  });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
