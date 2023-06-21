// @ts-check

export default class Lol{
  constructor(boxA, boxB) {
    this.boxA = {
      size: this.convertSize(boxA.size),len: boxA.len};
    this.boxB = {
      size: this.convertSize(boxB.size),len: boxB.len};
    this.a = (this.boxA.len - this.boxB.len) / (this.boxA.size - this.boxB.size)
    this.b = -this.boxA.len * this.a + this.boxA.len
    
  }
  convertSize(box) {
    return box.bottom - box.top
  }
  getLen(size) {
    // x1,y1 x2,y2
    //a = (y1 - y2)/(x1 - x2)
    //b =  b = -x1*a +y1
    return this.a*size +this.b
  }
}
