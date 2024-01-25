import { Component } from '@angular/core';
import { SuperHero } from './models/super-hero';
import { SuperHeroService } from './services/super-hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuperHero.Ui';

  heroes: SuperHero[] = [];
  heroToEdit?: SuperHero;

  constructor(private superHeroService: SuperHeroService) {}

  ngOnInit(): void {
   this.superHeroService.getSuperHeroes()
   .subscribe((result: SuperHero[]) => (this.heroes = result));
  }
  
  updateHeroList(heroes: SuperHero[]){
    this.heroes = heroes;
  }

  initNewHero() {
    this.heroToEdit = new SuperHero();
  }

  editHero(hero: SuperHero){
    this.heroToEdit = hero;
  }
}
