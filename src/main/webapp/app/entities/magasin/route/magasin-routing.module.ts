import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MagasinComponent } from '../list/magasin.component';
import { MagasinDetailComponent } from '../detail/magasin-detail.component';
import { MagasinUpdateComponent } from '../update/magasin-update.component';
import { MagasinRoutingResolveService } from './magasin-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const magasinRoute: Routes = [
  {
    path: '',
    component: MagasinComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MagasinDetailComponent,
    resolve: {
      magasin: MagasinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MagasinUpdateComponent,
    resolve: {
      magasin: MagasinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MagasinUpdateComponent,
    resolve: {
      magasin: MagasinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(magasinRoute)],
  exports: [RouterModule],
})
export class MagasinRoutingModule {}
