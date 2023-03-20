import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMagasin } from '../magasin.model';
import { MagasinService } from '../service/magasin.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './magasin-delete-dialog.component.html',
})
export class MagasinDeleteDialogComponent {
  magasin?: IMagasin;

  constructor(protected magasinService: MagasinService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.magasinService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
