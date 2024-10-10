import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    constructor(private router: Router) {}

    public isHomePage: boolean = false;

    ngOnInit(): void {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
        ).subscribe(() => {
                console.log('this.activatedRoute', this.router.url);
                this.isHomePage = this.router.url === '/';
        });
    }

}
