import { UserinputService } from './../../services/userinput.service';
import { Component, OnInit } from '@angular/core';
import { ZoneService } from 'src/app/services/zone.service';
import { UserIdService } from 'src/app/services/userId.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  rooms: any = [];
  zones: any = [];
  takenZones: any = [];
  roomZones: any = [];
  assignedLocation = '';

  constructor(
    private zoneService: ZoneService,
    private userinputService: UserinputService,
    public userId: UserIdService
  ) {}

  ngOnInit() {
    this.userinputService.getAllUserInputs().subscribe((res) => {
      this.rooms = res;
      this.roomZones = Object.values(res).map((userinputs) => (userinputs.zoneId));
      console.log(this.roomZones)
    });

      this.userinputService.getAllUserInputs().subscribe((res) => {
        this.takenZones = Object.values(res).map((userinputs) => userinputs.zoneId);
        console.log(this.takenZones)

      this.getUniqueLocation();
    });
  }

  getUniqueLocation() {
    const freeZone = this.roomZones.find(
      (roomZone) => !this.takenZones.includes(roomZone)
    );

    if (freeZone >= 1 && freeZone <= 8) {
      this.assignedLocation = `Room D3.05, Zone ${freeZone}`;
    } else {
      this.assignedLocation = `Room D3.06, Zone ${freeZone}`;
    }
    console.log(this.assignedLocation)
    console.log(freeZone)
  }
}
