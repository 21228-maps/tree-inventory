import React, { Component } from 'react';
import GeoJSON from 'ol/format/geojson';
import Group from 'ol/layer/group';
import VectorLayer from 'ol/layer/vector';
import TileLayer from 'ol/layer/tile';
import Map from 'ol/map';
import proj from 'ol/proj';
import VectorSource from 'ol/source/vector';
import XYZSource from 'ol/source/xyz';
import Circle from 'ol/style/circle';
import Stroke from 'ol/style/stroke';
import Style from 'ol/style/style';
import View from 'ol/view';
import './App.css';
import 'ol/ol.css';

import LayerSwitcher from 'ol3-layerswitcher';
import './openlayers/ol3-layerswitcher.css';

class App extends Component {

  componentDidMount() {

    new Map({
      controls: [
        new LayerSwitcher()
      ],
      target: 'map-container',
      layers: [

        new Group({
          title: 'OSM',
          layers: [
            new TileLayer({
              source: new XYZSource({
                url: 'https://api.mapbox.com/styles/v1/eczajk1/cis9p0srk003k2xt64t8g3tu4/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWN6YWprMSIsImEiOiIzeVJsZENzIn0.qU3ya0uQmCvX5OyCxkKCuw'
              }),
              title: 'OSM',
              type: 'base',
            }),
          ],
        }),

        new Group({
          title: 'Trees',
          layers: [
            new VectorLayer({
              source: new VectorSource({
                format: new GeoJSON(),
                url: './spring_grove_tree_inventory.geojson',
              }),
              style: new Style({
                image: new Circle({
                  radius: 4,
                  fill: null,
                  stroke: new Stroke({
                    color: 'green'
                  })
                })
              }),
              title: 'Fulcrum Trees',
            }),
            new VectorLayer({
              source: new VectorSource({
                format: new GeoJSON(),
                url: './osm-trees.geojson',
              }),
              style: new Style({
                image: new Circle({
                  radius: 4,
                  fill: null,
                  stroke: new Stroke({
                    color: 'magenta'
                  })
                })
              }),
              title: 'OSM Trees',
            })
          ],
        }),
      ],
      view: new View({
        center: proj.fromLonLat([
          -76.738056,
          39.273889,
        ]),
        zoom: 14
      })
    });
  }

  render() {
    return (
      <div className="App">
        <div id="map-container"></div>
      </div>
    );
  }
}

export default App;
