import { from, Observable } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AcNotification, ActionType, ViewerConfiguration, AcMapComponent } from 'angular-cesium';
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

  @ViewChild(AcMapComponent, {static: false}) map: AcMapComponent;

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
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.boxes$ = from(this.entities).pipe(map(entity => ({
          id: entity.id,
          actionType: ActionType.ADD_UPDATE,
          entity
        }
    )));
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    const viewer = this.map.getCesiumService().getViewer();
    viewer.scene.globe.show = false;

    const tileset = new Cesium.Cesium3DTileset({
      url: 'http://test.blastreport.cl:8585/20200703_Esperanza_Cesium/Scene/20200703_Esperanza_Cesium.json',
      maximumScreenSpaceError: 2,
      maximumNumberOfLoadedTiles: 100000
    });

    tileset.readyPromise
    // tslint:disable-next-line: only-arrow-functions
    .then(function(tileset: { boundingSphere: { radius: number; }; }) {
      viewer.scene.primitives.add(tileset);
      viewer.zoomTo(
        tileset,
        new Cesium.HeadingPitchRange(
          0.0,
          -0.5,
          tileset.boundingSphere.radius * 2.0
        )
      );
    })
    // tslint:disable-next-line: only-arrow-functions
    .otherwise(function(error: any) {
      console.log(error);
    });

  }
}
