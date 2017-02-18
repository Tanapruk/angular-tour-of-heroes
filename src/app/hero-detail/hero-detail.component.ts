import {Component, OnInit, Input} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location}                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    @Input()
    hero: Hero;
    selectedHero: Hero;

    constructor(private heroService: HeroService,
                private route: ActivatedRoute,
                private location: Location) {


    }

    save() {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }

    ngOnInit() {
        //switchMap get the 'id' from params and put it in heroService.getHero()
        this.route.params
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => this.hero = hero);
    }

    goBack() {
        this.location.back();
    }


}
