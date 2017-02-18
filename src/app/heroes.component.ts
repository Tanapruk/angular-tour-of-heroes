import {Component, OnInit} from '@angular/core';
import {Hero} from "./hero";
import {HeroService} from "./hero.service";
import {Router} from "@angular/router";

@Component({
    selector: 'my-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['heroes.component.css'],
    providers: [HeroService]
})

export class HeroesComponent implements OnInit {
    ngOnInit(): void {
        this.getHeroes();
    }

    title = 'Tour of Heroes';
    selectedHero: Hero;
    heroes: Hero[];

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }


    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    constructor(private router: Router,
                private heroService: HeroService) {
    }

    gotoDetail() {
        //we accept [routerLink]="['/detail', hero.id] in DashboardComponent
        //to go there we use router and pass 2 parameters and navigate around
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }


}



