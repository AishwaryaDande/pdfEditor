import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CaarierserviceService } from './caarierservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap, NavigationExtras} from '@angular/router';

export interface CardCarriers {
  "carrierId": string;
  "catalogId": string;
  "carrierTitle": string;
  "modifiedDate": string
  "modifiedBy": string;
  "version": string;
  "currentState": string;
  "lock": boolean;
}

@Component({
  selector: 'app-carriers',
  templateUrl: './carriers.component.html',
  styleUrls: ['./carriers.component.css']
})



export class CarriersComponent implements OnInit {
  isImageLoading = false;
  isFetching: boolean = false;
  selectedRowIndex = 'carrierId1'
  carrierList = [];
  length: number;
  loading: boolean = false;
  dataSource = new MatTableDataSource<CardCarriers>([])
  displayedColumns: string[] = ['carrierTitle', 'modifiedDate', 'modifiedBy', 'version', 'currentState'];
  constructor(private carrier: CaarierserviceService, private _snackBar: MatSnackBar, private router: Router) {

  }

  ngOnInit() {

    this.loading = true;
    setTimeout(() => {
      this.loading = false
      this.getCarriersList();

    }, 1000);
    this.isFetching = false;

  }
  getRecord(row: any) {

    console.log(row)
    this.selectedRowIndex = row.carrierId;
    console.log(row);

  }
  getCarriersList() {
    this.isFetching = true
    // this.showNotification();
    const data = this.carrier.getCarriers() as any;

    this.dataSource = data.card_carriers;
    this.isFetching = false;
  }
  sendId(id: any) {
    const sendPDFInfo: NavigationExtras = {
      state: {
        recordInfo : id
      }
    };

    this.router.navigate(['/pdfImage'], sendPDFInfo)
    .then(success => console.log('navigation success?' , success))
    .catch(console.error);
  }

  showNotification() {
    this._snackBar.open('data fetched successfully', 'Ok', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

}
