import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Subject } from 'rxjs/Subject';
import { HeroSearchService } from './hero-search.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>()
  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) { }
  search(term: string): void {
    this.searchTerms.next(term);
  };
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      })
  };
  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
