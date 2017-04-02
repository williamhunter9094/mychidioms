export const htmlTemplate = `
  <div *ngIf="chidiom">
    <h2>{{chidiom.name}} details!</h2>
    <div>
        <label>id: </label>{{chidiom.id}}
    </div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="chidiom.name" placeholder="name"/>
    </div>
    <button (click)="goBack()">Back</button>
    <button (click)="save()">Save</button>
  </div>
`;
