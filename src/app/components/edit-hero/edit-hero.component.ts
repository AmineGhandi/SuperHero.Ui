import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SuperHero } from '../../models/super-hero';
import { SuperHeroService } from '../../services/super-hero.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrl: './edit-hero.component.css',
})
export class EditHeroComponent implements OnInit{
@Input() hero?: SuperHero;
@Output() heroesUpdated = new EventEmitter<SuperHero[]>();

constructor(private superHeroService: SuperHeroService) {}

ngOnInit(): void {
  
}

updateHero(hero:SuperHero){
  this.superHeroService
  .updateHero(hero)
  .subscribe((heroes: SuperHero[]) => this.heroesUpdated.emit(heroes));
  
  this.hero = undefined;
}

deleteHero(hero:SuperHero){
  this.superHeroService
  .deleteHero(hero)
  .subscribe((heroes: SuperHero[]) => this.heroesUpdated.emit(heroes))
}

createHero(hero:SuperHero){
  this.superHeroService
  .createHero(hero)
  .subscribe((heroes: SuperHero[]) => this.heroesUpdated.emit(heroes));

  this.hero = undefined;
}
cancelHero(hero:SuperHero){
  this.hero = undefined;
}
}
