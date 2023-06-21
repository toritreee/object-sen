// @ts-check

import { Cam, Scan } from "./index.js"

export default class Hosei {
  onexit = (box, len) => { }
  constructor(rgb) {
    this.main = document.getElementById("hosei")
    this.errText = this.main?.querySelector(".Id-err")
    this.videoPreview = this.main?.querySelector(".Id-main")
    this.nextButton = this.main?.querySelector(".Id-next")
    this.rgb = rgb
    this.camera = new Cam()
    this.stopCode = 0
    this.len = this.main?.querySelector(".Id-len")
    this.nextButton.onclick = this.clickNextButton.bind(this)
  }
  start() {
    this.main?.classList.add("open")
    this.camera.start()
    this.videoPreview?.lastChild?.remove()
    this.stopCode = setInterval(this.mainLoop.bind(this), 1000)
  }
  mainLoop() {
    const sc = new Scan(this.camera.video)
    const box = sc.scan(this.rgb, { x: 0, y: 0, width: this.camera.video.width, height: this.camera.video.height })
    this.videoPreview?.lastChild?.remove()
    this.videoPreview?.appendChild(sc.canvas)
    sc.context.strokeStyle = "white"
    sc.context.lineWidth = 5
    console.log(box)
    sc.context.strokeRect(box.left, box.top, box.right - box.left, box.bottom - box.top)
  }

  clickNextButton() {
    clearInterval(this.stopCode)
    this.main?.classList.remove("open")
    this.main?.classList.add("close")
    const sc = new Scan(this.camera.video)
    const box = sc.scan(this.rgb, { x: 0, y: 0, width: this.camera.video.width, height: this.camera.video.height })
    this.onexit(box, this.len.value)
  }
}