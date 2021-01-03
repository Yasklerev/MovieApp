import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  search(search: string): void {
    search = search.trim(); // Validar que no haya sólo espacios en el input buscar.
    if (search.length === 0) {
      return;
    }
    this.router.navigateByUrl(`search/${search}`);
  }
}
