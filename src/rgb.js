// @ts-check

import { Cam, Scan } from "./index.js"

export default class RGB{
  onexit = (rgb)=>{}
  constructor() {
    console.log("ok")
    this.main = document.getElementById("rgb")
    this.videoPreview = this.main?.querySelector(".Id-main")
    
    const red = this.main?.querySelector(".Id-red")
    const green = this.main?.querySelector(".Id-green")
    const blue = this.main?.querySelector(".Id-blue")

    this.red = {
      under: red?.querySelector(".Id-under"),
      over: red?.querySelector(".Id-over"),
    }
    this.green = {
      under: green?.querySelector(".Id-under"),
      over: green?.querySelector(".Id-over"),
    }
    this.blue = {
      under: blue?.querySelector(".Id-under"),
      over: blue?.querySelector(".Id-over"),
    }
    console.log("Hi")
    this.nextButton = this.main?.querySelector(".Id-next")
    this.nextButton?.addEventListener("click", () => {
      this.main?.classList.remove("open")
      clearInterval(this.stopCode)
      this.onexit(this.getRGB())
    })
    this.camera = new Cam()
    this.stopCode = 0
  }
  start() {
    this.main?.classList.add("open")
    this.camera.start()
    this.videoPreview?.lastChild?.remove()
    this.stopCode = setInterval(this.mainLoop.bind(this), 1000)
  }
  getRGB() {
    return {
      r: {
        un: Number(this.red.under.value),
        up: Number(this.red.over.value)
      },
      g: {
        un: Number(this.green.under.value),
        up: Number(this.green.over.value)
      },
      b: {
        un: Number(this.blue.under.value),
        up: Number(this.blue.over.value)
      
      }
    }
  }
  mainLoop() {

    const sc = new Scan(this.camera.video)
    const box = sc.scan(this.getRGB(), {x:0,y:0,width:this.camera.video.width,height:this.camera.video.height})
    this.videoPreview?.lastChild?.remove()
    this.videoPreview?.appendChild(sc.canvas)
    sc.context.strokeStyle = "white"

    sc.context.lineWidth = 5
    console.log(box)
    sc.context.strokeRect(box.left, box.top, box.right - box.left, box.bottom - box.top)
  }
}