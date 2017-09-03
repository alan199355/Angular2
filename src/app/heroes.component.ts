import { HeroService } from './hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'my-heroes',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeroService]
})


export class HeroesComponent implements OnInit {
  title = 'app works!';
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log(this.selectedHero)
  };
  getHeroes(): void {
    this.heroService.getHeros().then(heroes => this.heroes = heroes);
    //this.heroes = this.heroService.getHeroes();
  };
  ngOnInit(): void {
    this.getHeroes();
  }
}
