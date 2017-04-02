export const htmlTemplate = `
    <h3>Top chidioms</h3>
    <div class="grid grid-pad">
        <div *ngFor="let chidiom of chidioms" (click)="gotoDetail(chidiom)" class="col-1-4">
            <div class="module chidiom">
                <h4>{{chidiom.name}}</h4>
            </div>
        </div>
    </div>
    <chidiom-search></chidiom-search>
`;
