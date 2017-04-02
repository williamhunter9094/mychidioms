export const htmlTemplate = `
  <h2>My chidioms</h2>
  <div>
      <label>chidiom name:</label> <input #chidiomName />
      <button (click)="add(chidiomName.value); chidiomName.value=''">Add</button>
  </div>
  <ul class="chidioms">
      <li *ngFor="let chidiom of chidioms" (click)="onSelect(chidiom)" [class.selected]="chidiom === selectedchidiom">
          <span class="badge">{{chidiom.id}}</span>
          <span>{{chidiom.name}}</span>
          <button class="delete" (click)="delete(chidiom, $event)">x</button>
      </li>
  </ul>
  <div *ngIf="selectedchidiom">
      <h2>{{selectedchidiom.name | uppercase}} is my chidiom</h2>
      <button (click)="gotoDetail()">View Details</button>
  </div>
`;
