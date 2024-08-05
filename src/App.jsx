import './App.css'
import 'aframe'
import 'aframe-event-set-component'
import 'aframe-layout-component'
import 'aframe-template-component'
import 'aframe-proxy-event-component'
function App() {
  return (
    <>
      <a-scene>
        <a-entity
          class="link"
          geometry="primitive: plane; height: 1; width: 1"
          material="shader: flat; src: ${thumb}"
          event-set__mouseenter="scale: 1.2 1.2 1"
          event-set__mouseleave="scale: 1 1 1"
          event-set__click="_target: #image-360; _delay: 300; material.src: ${src}"
          proxy-event="event: click; to: #image-360; as: fade"
          sound="on: click; src: #click-sound"></a-entity>
        <a-assets>
          <img id="city" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg" />
          <img id="city-thumb" src="/images/player.jpeg" />
          <img id="cubes-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg" />
          {/* <img id="sechelt-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg" /> */}
          <audio id="click-sound" src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg" />
          <img id="cubes" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg" />
          {/* <img id="sechelt" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg" /> */}
        </a-assets>

        <a-sky
          id="image-360"
          radius="10"
          src="#city"
          animation__fade="property: components.material.material.color; type: color; from: #FFF; to: #000; dur: 300; startEvents: fade"
          animation__fadeback="property: components.material.material.color; type: color; from: #000; to: #FFF; dur: 300; startEvents: animationcomplete__fade"></a-sky>

        <a-entity id="links" layout="type: line; margin: 1.5" position="0 -1 -4">
          <a-entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></a-entity>
          <a-entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></a-entity>
          {/* <a-entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></a-entity> */}
        </a-entity>

        <a-entity camera look-controls>
          <a-cursor
            id="cursor"
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
            animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
            event-set__mouseenter="_event: mouseenter; color: springgreen"
            event-set__mouseleave="_event: mouseleave; color: black"
            raycaster="objects: .link"></a-cursor>
        </a-entity>
      </a-scene>
    </>
  )
}

export default App
