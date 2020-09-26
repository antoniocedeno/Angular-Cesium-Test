import { Component, Input } from '@angular/core';

@Component({
  selector: 'map',
  template: `
  <div style="height: 100vh">
    
      <boxes-layer-example></boxes-layer-example>
   
  </div>`,
})
export class MapComponent  {
  @Input() name: string;
}
