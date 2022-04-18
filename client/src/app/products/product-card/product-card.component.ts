/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { AddProductToPantryComponent } from '../add-product-to-pantry/add-product-to-pantry.component';
import { PantryService } from 'src/app/pantry/pantry.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  popup = false;

  constructor(private pantryService: PantryService, private snackBar: MatSnackBar, private dialog: MatDialog){ }

  ngOnInit(): void {
  }

  openAddDialog(givenProduct: Product) {
    const dialogRef = this.dialog.open(AddProductToPantryComponent, {data: givenProduct});
    dialogRef.afterClosed().subscribe(result => {
      this.pantryService.addPantryItem(result).subscribe(newPantryId => {
        if(newPantryId) {
          this.snackBar.open('Product successfully added to your pantry.');
        }
        else {
          this.snackBar.open('Something went wrong.  The product was not added to the pantry.');
        }
      });
    });
  }
}
