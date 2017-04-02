export const htmlTemplate = `
  <div id="search-component">
      <h4>chidiom Search</h4>
      <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
      <div>
          <div *ngFor="let chidiom of chidioms | async" (click)="gotoDetail(chidiom)" class="search-result">
                {{chidiom.name}}
          </div>
      </div>
  </div>
`;
