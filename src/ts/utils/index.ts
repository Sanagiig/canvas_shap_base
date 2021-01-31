export default {
  getOffset(event: MouseEvent) {
    return this.eventWraper(event);
  },
  eventWraper(event: MouseEvent) {
    let { pageX, pageY, target } = event;
    let { left, top } = (<Element>target).getBoundingClientRect();
    return { x: pageX - left, y: pageY - top };
  },
  toRad(angle: number) {
    return angle * Math.PI / 180;
  },
  toAng(rand: number) {
    return rand * 180 / Math.PI;
  },
}

export function propertyInit(target: any, option: any) {
  let keys = Object.keys(target);
  let key: any;
  console.log(target,option,keys)
  for (key in option) {
    if (keys.indexOf(key) > -1) {
      let val = option[key];
      if (val instanceof Array) {
        target[key] = val.slice();
      } else {
        target[key] = val;
      }
    }
  }
}