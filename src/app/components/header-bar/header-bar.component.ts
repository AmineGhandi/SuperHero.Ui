import { Component } from '@angular/core';
import { SuperHero } from '../../models/super-hero';
import { SuperHeroService } from '../../services/super-hero.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styles: ``,
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width:'212px',
      })),
      state('closed', style({
        width:'0px',
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    trigger('openCloseSideBar',[
      state('open', style({
        'margin-left':'212px',
      })),
      state('closed', style({
        'margin-left':'0px',
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class HeaderBarComponent {
  heroes: SuperHero[] = [];
  heroToEdit?: SuperHero;

  data: any;

  options: any;

  showMenu: boolean = true;

  constructor(private superHeroService: SuperHeroService) {}

  ngOnInit(): void {
   this.superHeroService.getSuperHeroes()
   .subscribe((result: SuperHero[]) => (this.heroes = result));

   this.initChartData();
   
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

  deleteHero(hero:SuperHero){
    this.superHeroService
    .deleteHero(hero)
    .subscribe((heroes: SuperHero[]) => this.heroes = heroes)
  }




  //Chart dummu Data

  initChartData(){

    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Dataset 1',
              fill: false,
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              yAxisID: 'y',
              tension: 0.4,
              data: [65, 59, 80, 81, 56, 55, 10]
          },
          {
              label: 'Dataset 2',
              fill: false,
              borderColor: documentStyle.getPropertyValue('--green-500'),
              yAxisID: 'y1',
              tension: 0.4,
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };
  
  this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder
              }
          },
          y1: {
              type: 'linear',
              display: true,
              position: 'right',
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  drawOnChartArea: false,
                  color: surfaceBorder
              }
          }
      }
  };

  }
}
