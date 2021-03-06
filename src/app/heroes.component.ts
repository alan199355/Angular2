import { RouterModule, Router } from '@angular/router';
import { HeroService } from './hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})


export class HeroesComponent implements OnInit {
  title = 'app works!';
  selectedHero: Hero;
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private router: Router,
  ) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log(this.selectedHero)
  };
  getHeroes(): void {
    this.heroService.getHeros().then(heroes => this.heroes = heroes);
    //this.heroes = this.heroService.getHeroes();
  };
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  };
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      })
  };
  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null }
      })
  }
  ngOnInit(): void {
    this.getHeroes();
  }
}
