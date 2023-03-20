import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MagasinComponent } from './list/magasin.component';
import { MagasinDetailComponent } from './detail/magasin-detail.component';
import { MagasinUpdateComponent } from './update/magasin-update.component';
import { MagasinDeleteDialogComponent } from './delete/magasin-delete-dialog.component';
import { MagasinRoutingModule } from './route/magasin-routing.module';

@NgModule({
  imports: [SharedModule, MagasinRoutingModule],
  declarations: [MagasinComponent, MagasinDetailComponent, MagasinUpdateComponent, MagasinDeleteDialogComponent],
})
export class MagasinModule {}
