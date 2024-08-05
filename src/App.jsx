import './App.css'
import 'aframe'
import 'aframe-event-set-component'
import 'aframe-layout-component'
import 'aframe-template-component'
import 'aframe-proxy-event-component'
import { useEffect } from 'react'

const songInfo = {}
function App() {
  const getLink = async () => {
    const res = await fetch('https://mockapi.eolink.com/bMtTxnl025f64ed8a398ee6996df94322d93712abb6e586/getmusic')
    return await res.json()
  }
  const init = async () => {
    const result = await getLink()
    //TODO 多歌逻辑
    const songData = result.data.songs[0]

    // 替换封面图
    document.getElementById('cover-image').setAttribute('src', songData.coverImage)
    document.getElementById('audio').setAttribute('src', songData.audioUrl)
    // 通过 backgrounds 定时更新背景图片
    document.getElementById('city').setAttribute('src', songData.backgrounds[0].imageUrl)

    const audio = document.getElementById('audio')
    const changeBackground = () => {
      const currentTime = audio.currentTime
      console.log(currentTime)
      const background = songData.backgrounds.find((bg) => currentTime >= bg.time)
      if (background) {
        document.getElementById('city').setAttribute('src', background.imageUrl)
      }
    }
    audio.addEventListener('timeupdate', changeBackground)
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <a-scene>
        <a-assets>
          <img id="city" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg" />
          {/* 全景图 */}
          <img id="cover-image" src="/images/music01.jpg" />

          <audio id="audio" src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg" />
        </a-assets>

        <a-sky
          id="image-360"
          radius="10"
          src="#city"
          animation__fade="property: components.material.material.color; type: color; from: #FFF; to: #000; dur: 300; startEvents: fade"
          animation__fadeback="property: components.material.material.color; type: color; from: #000; to: #FFF; dur: 300; startEvents: animationcomplete__fade"></a-sky>
        <a-entity id="links" layout="type: line; margin: 1.5" position="0 -1 -4">
          <a-entity template="src: #link" data-src="#city" data-thumb="#cover-image"></a-entity>
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
