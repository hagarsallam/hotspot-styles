/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Create viewer.
var viewer = new Marzipano.Viewer(document.getElementById('pano'));

// Create source.
var source = Marzipano.ImageUrlSource.fromString(
  "https://www.marzipano.net/media/furnace/{z}/{f}/{y}/{x}.jpg",
  { cubeMapPreviewUrl: "https://www.marzipano.net/media/furnace/preview.jpg" });

// Create geometry.
var geometry = new Marzipano.CubeGeometry([
    { tileSize: 256, size: 256, fallbackOnly: true },
    { size: 512, tileSize: 512 },
    { size: 1024, tileSize: 512 },
    { size: 2048, tileSize: 512 }
]);

// Create view.
var limiter = Marzipano.RectilinearView.limit.traditional(2048, 120*Math.PI/180);
var view = new Marzipano.RectilinearView(null, limiter);

// Create scene.
var scene = viewer.createScene({
  source: source,
  geometry: geometry,
  view: view,
  pinFirstLevel: true
});

var deviceOrientationControlMethod = new DeviceOrientationControlMethod();
var controls = viewer.controls();
controls.registerMethod('deviceOrientation', deviceOrientationControlMethod);

var enabled = false;

function enable() {
  deviceOrientationControlMethod.getPitch(function(err, pitch) {
    if (!err) {
      view.setPitch(pitch);
    }
  });
  controls.enableMethod('deviceOrientation');
  enabled = true;
}

// Display scene.
scene.switchTo({ transitionDuration: 0 });

enable();