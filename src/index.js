// @ts-check
export class Cam{
  onerror = (err)=>{}

  constructor() {
    this.video = document.createElement("video")
  }

  start() {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: {
            ideal: "environment" },
        },
      })
      .then((stream) => {
        this.video.srcObject = stream
        this.video.autoplay = true;
        this.video.srcObject = stream;
        document.body.append(this.video);
        this.video.addEventListener("resize", () => {
          this.video.width = this.video.videoWidth;
          this.video.height = this.video.videoHeight;
        });
      })
  }
}

export class Scan{
  constructor(video) {
    this.video = video
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    if (this.context === null) {
      throw new Error("canvas.getContext('2d') return null");
    }

    this.canvas.width = video.videoWidth;
    this.canvas.height = video.videoHeight;
    this.context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
  }

  scan(rgb,mainPoint) {
    const image = this.context.getImageData(mainPoint.x, mainPoint.y, mainPoint.width + mainPoint.x, mainPoint.height + mainPoint.y)
    const box = {
      top: 2**10,
      left: 2**10,
      right: 0,
      bottom: 0
    }
    
    for (let y = 0; y != image.height; y+=4){
      for (let x = 0; x != image.width; x+=4){
        const pixel = [
          image.data[y * image.width * 4 + 4 * x],
          image.data[y * image.width * 4 + 4 * x +1],
          image.data[y * image.width * 4 + 4 * x +2]
        ]
        if(this.ufo(rgb.r.un, pixel[0], rgb.r.up) &&
          this.ufo(rgb.g.un, pixel[1], rgb.g.up) &&
          this.ufo(rgb.b.un, pixel[2], rgb.b.up)) {
          if (box.top > y)
            box.top = y
          if(box.left > x)
            box.left = x
          if(box.right < x)
            box.right = x
          if(box.bottom < y)
            box.bottom = y
        }
      }
    }
    console.log(box)
    return box
  }
  ufo(under, data, up) {
    return under < data && data < up
  }
}


class Main{
  rgb = { r: { un: 200, up: 255 }, g: { un: 0, up: 100 }, b: { un: 0, up: 100 } }
  constructor() {
    this.cam = new Cam()
    this.cam.onerror = (err) => alert(err)
    document.getElementById("main")?.appendChild(this.cam.video)
    this.cam.start()
    setInterval(() => {
      this.check(100)
    },500)
  }

  check(len) {
    const sc = new Scan(this.cam.video)
    const box = sc.scan(this.rgb, { "x": 0, "y": 0, "width": 640, "height": 480 })
    document.getElementById("cav")?.lastChild?.remove()
    document.getElementById("cav")?.appendChild(sc.canvas)
    sc.canvas.getContext('2d').strokeStyle = "white"

    sc.canvas.getContext('2d')?.lineWidth = 5
    sc.canvas.getContext('2d')?.strokeRect(box.left, box.top, box.right - box.left, box.bottom - box.top)
  }
}
window.onload = () => {
  new Main()
}