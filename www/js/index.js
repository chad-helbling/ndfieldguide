/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready')
    this.setupMap()
  },

    // Update DOM on a Received Event
  receivedEvent: function (id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');
        //
        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id)
  },

  setupMap: function () {
    console.log('Setting up Map')

    require([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/MapImageLayer",
      "dojo/dom"
    ], function(Map, MapView, MapImageLayer, dom) {

      var map = new Map({
        basemap: 'streets'
      });

      var view = new MapView({
        container: 'mapDiv',  // Reference to the scene div created in step 5
        map: map,  // Reference to the map object created before the scene
        zoom: 6,  // Sets the zoom level based on level of detail (LOD)
        center: [-100.64208984358108, 47.489840647580756]  // Sets the center point of view in lon/lat
      });

      var layer = new MapImageLayer({
        url: 'http://ndgishub.nd.gov/arcgis/rest/services/Applications/GNF_PLOTSGuide_Cached/MapServer'
      });

      map.add(layer);  // adds the layer to the map

      //when the map is clicked create a buffer around the click point of the specified distance.
      view.on('click', function(event) {
        debugger;
        // Get the coordinates of the click on the view
        // around the decimals to 3 decimals
        var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

        view.popup.open({
            // Set the popup's title to the coordinates of the clicked location
            title: "Reverse geocode: [" + lon + ", " + lat + "]",
            location: event.mapPoint // Set the location of the popup to the clicked location
        });
      });



    });
  }

}

app.initialize()
