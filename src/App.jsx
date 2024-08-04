import { useState } from 'react'
import './App.css'
import 'aframe'
import VideoPlayer from './components/VideoPlayer'

function App() {
  var zerod = 0
  var images = [
    'https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg',
    'https://aframe.io/aframe/examples/showcase/composite/lake.jpg',
    'https://l13.alamy.com/360/PWNBM9/testing-new-cameralens-combination-in-my-garden-in-aarhus-denmark-PWNBM9.jpg'
  ]

  function goNext() {
    zerod = zerod < images.length - 1 ? ++zerod : 0
    document.getElementById('sky').setAttribute('src', images[zerod])
  }

  function goBack() {
    zerod = zerod != 0 ? --zerod : images.length - 1
    console.log(zerod)
    document.getElementById('sky').setAttribute('src', images[zerod])
  }
  return (
    <>
      <div className="absolute z-10 block left-5 bottom-5">
        <VideoPlayer />
      </div>
      <a-scene image-toggle vr-mode-ui="enabled: false">
        <a-assets>
          <img id="skybox" src="https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg" />
        </a-assets>

        <a-sky id="sky" src="#skybox"></a-sky>
        <a-camera id="camera" look-controls="pointerLockEnabled: false"></a-camera>
      </a-scene>
    </>
  )
}

export default App
