import { Component, OnInit } from '@angular/core';
import { ZoneService } from 'src/app/services/zone.service';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditRoomModalComponent } from 'src/app/components/editRoomModal/edit-room-modal/edit-room-modal.component';
@Component({
  selector: 'app-edit-rooms',
  templateUrl: './edit-rooms.page.html',
  styleUrls: ['./edit-rooms.page.scss'],
})
export class EditRoomsPage implements OnInit {
  entryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    zone: new FormControl('', [Validators.required]),
  });
  zones;
  isOpen = false;

  constructor(
    private zoneService: ZoneService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.zoneService.getAllZones().subscribe((res) => {
      this.zones = res;
      console.log(this.zones);
    });
  }

  async alertDeleteZoneEntry(zone) {
    console.log(zone.id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: `Are you sure you want to delete entry with zone ${zone.number}?`,
      buttons: [
        {
          text: 'Return',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Cancel delete');
          },
        },
        {
          text: 'Confirm',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteZoneEntry(zone.id);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteZoneEntry(zoneId) {
    this.zoneService.deleteZone(zoneId).subscribe(
      (res) => {
        console.log('SUCCESS ===', res);
        this.ngOnInit();
      },
      (error: any) => {
        console.log('ERROR ===', error);
      }
    );
  }

  async editZoneEntry(zone) {
    console.log(zone);
    const modal = await this.modalCtrl.create({
      component: EditRoomModalComponent,
      cssClass: 'edit-room-modal',
    });
    await modal.present();
  }

  async onSubmit() {
    console.warn(this.entryForm.value);
  }
}
