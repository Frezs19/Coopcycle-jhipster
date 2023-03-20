import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'magasin',
        data: { pageTitle: 'blogApp.magasin.home.title' },
        loadChildren: () => import('./magasin/magasin.module').then(m => m.MagasinModule),
      },
      {
        path: 'cooperative',
        data: { pageTitle: 'blogApp.cooperative.home.title' },
        loadChildren: () => import('./cooperative/cooperative.module').then(m => m.CooperativeModule),
      },
      {
        path: 'produit',
        data: { pageTitle: 'blogApp.produit.home.title' },
        loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
