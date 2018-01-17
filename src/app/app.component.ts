import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,

} from '@angular/material';
interface NewGroceryItem {
  groceryName: string;
  quantity: string;
  id: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit;
  public groceryLists = [
    { GroceryListId: 'My Vegetarian', item: ['apples', 'carrots'] },
    { GroceryListId: 'Cottage List' },
    { GroceryListId: 'Kids Lunches', viewValue: 'Tacos' }
  ];
  public name;
  public quantity;
  public shareable: boolean;
  public newGroceryItem: NewGroceryItem;
  public groceries = ['apples', 'oranges', 'steak', 'fish', 'cheese'];
  public selectedTab: string;
  public groceryList: any;
  public selectedGroceryList: any;
  private url = '';
  constructor(private http: Http, ) {
    this.newGroceryItem = {
      groceryName: 'as',
      quantity: '1',
      id: ''
    };
  }
  OnInit() {
  this.getGroceryAllLists();

  }

  tabChanged(event) {
    this.selectedTab = event.tab.textLabel;
    console.log('Clicked: ' + event.tab.textLabel);
    this.selectedGroceryList = this.getGroceryList(this.selectedTab);
  }
  deleteSelected(item) {
    console.log(item);
    this.deleteSelectedItem(item);
  }
  public save(newGroceryItem) {
    //this.newGroceryItem.groceryName = newGroceryItem.groceryName;
    //const id = Math.random().toString;
   // console.log(this.newGroceryItem);
    this.createNewItem(this.newGroceryItem);
  }
 /* public save() {
    this.newGroceryItem.groceryName = this.name;
    this.newGroceryItem.quantity = this.quantity;
    console.log(this.newGroceryItem);
    this.editItem(this.newGroceryItem, this.newGroceryItem.id);
  }*/
  public getGroceryList(userid: string) {
    const args = new RequestOptions({ method: 'Get' });
    return this.http.get(this.url + userid + '/', args)
      .map((res) => res.json() as any)
      .catch(this.handleErrorObservable)
      .subscribe((data) => {
        console.log(data);
      });
  }
  public getGroceryAllLists() {
    const args = new RequestOptions({ method: 'Get' });
    return this.http.get('http://localhost:65264/groceries' , args)
      .map((res) => res.json() as any)
      .catch(this.handleErrorObservable)
      .subscribe((data) => {
        this.groceryList  = data;
        console.log(data);
      });
  }
  public createNewItem(item: any) {
    return this.http.post('http://localhost:65264/newList', item)
        .map(this.extractData)
        .catch(this.handleErrorObservable)
        .subscribe((data) => {
          console.log(data);
        });
}
public editItem(item: any, id: any) {
  return this.http.put('http://localhost:65264/groceries/' + id + '/update', item)
      .map(this.extractData)
      .catch(this.handleErrorObservable)
      .subscribe((data) => {
        console.log(data);
      });
}
public deleteSelectedItem(id: string): Observable<any> {
  return this.http.delete('http://localhost:65264/groceries/' + id + '/delete')
      .map(this.extractData)
      .catch(this.handleErrorObservable);
}
  private extractData(res: Response) {
    const body = res.json();
    console.log(body);
    return body;
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}

