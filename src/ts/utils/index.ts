export default {
  getOffset(event: MouseEvent) {
    return this.eventWraper(event);
  },
  eventWraper(event: MouseEvent) {
    let { pageX, pageY, target } = event;
    let { left, top } = (<Element>target).getBoundingClientRect();
    return { x: pageX - left, y: pageY - top };
  },
  toRad(angle:number){
    return angle * Math.PI / 180;
  },
  toAng(rand:number){
    return rand * 180 / Math.PI;
  }
}