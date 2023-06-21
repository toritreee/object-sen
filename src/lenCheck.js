import { Cam, Scan } from "./index.js";
import Lol from "./lol.js";

// @ts-check
export default class LenCheck {
  constructor(lenA, lenB,rgb) {
    this.lol = new Lol(lenA, lenB)
    this.cam = new Cam()
    this.cam.onerror = (err) => alert(err)
    document.getElementById("main").querySelector(".cv")?.appendChild(this.cam.video)
    this.log = document.getElementById("main").querySelector(".log")
    this.cam.start()
    setInterval(() => {
      this.check(100)
    }, 100)
    this.rgb = rgb
  }
  check() {
    const sc = new Scan(this.cam.video)
    const box = sc.scan(this.rgb, {x:0,y:0,width:this.cam.video.width,height:this.cam.video.height})
    document.getElementById("cav")?.lastChild?.remove()
    document.getElementById("cav")?.appendChild(sc.canvas)
    sc.canvas.getContext('2d').strokeStyle = "white"
    const len =  this.lol.getLen(this.lol.convertSize(box))
    this.log.textContent += "\n" + len+ ":size="+this.lol.convertSize(box)
    
    sc.canvas.getContext('2d').lineWidth = 5
    sc.canvas.getContext('2d')?.strokeRect(box.left, box.top, box.right - box.left, box.bottom - box.top)
  }
  
}