import { HeroService } from './hero.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Hero } from './hero';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  hero: Hero;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.switchMap(
      (params: ParamMap) => this.heroService.getHero(+params.get('id'))
    ).subscribe(hero => this.hero = hero);
  };
  goBack(): void {
    this.location.back();
  };
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}
