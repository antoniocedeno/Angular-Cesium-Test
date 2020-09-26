import { from, Observable } from 'rxjs';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AcNotification, ActionType, ViewerConfiguration } from 'angular-cesium';
import { map } from 'rxjs/operators';

@Component({
  selector: 'boxes-layer-example',
  template: `
  <ac-map>
    <ac-layer acFor="let box of boxes$" [context]="this" [debug]="true">
      <ac-box-desc props="{
														position: box.position,
														dimensions: boxDimensions,
														material: Cesium.Color.fromRandom(),
														outline: true,
														outlineWidth: 8,
														outlineColor: Cesium.Color.BLACK
														}">
      </ac-box-desc>
    </ac-layer>
     </ac-map>
  `,
  providers: [ViewerConfiguration]
})
export class BoxesLayerComponent implements OnInit {

  entities = [
    {
      id: '0',
      position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 300000.0),
    },
    {
      id: '1',
      position: Cesium.Cartesian3.fromDegrees(-120.0, 40.0, 300000.0),
    }
  ];

  boxDimensions = new Cesium.Cartesian3(800000, 800000, 800000);
  boxes$: Observable<AcNotification>;
  Cesium = Cesium; 

  constructor(viewerConf: ViewerConfiguration) {
                    viewerConf.viewerOptions = {
                    selectionIndicator: false,
                    timeline: false,
                    // infoBox: false,
                    fullscreenButton: true,
                    baseLayerPicker: false,
                    animation: false,
                    homeButton: false,
                    geocoder: true,
                    navigationHelpButton: false,
                    navigationInstructionsInitiallyVisible: false,
                    mapMode2D: Cesium.MapMode2D.ROTATE,
                    scene3DOnly: true,
                    sceneModePicker: true,
                    imageryProvider : new Cesium.OpenStreetMapImageryProvider({
                      url : 'https://a.tile.openstreetmap.org/'
                  }),
                  };
  }
  ngOnInit() {
    this.boxes$ = from(this.entities).pipe(map(entity => ({
          id: entity.id,
          actionType: ActionType.ADD_UPDATE,
          entity: entity,
        }
    )));
  }
}
