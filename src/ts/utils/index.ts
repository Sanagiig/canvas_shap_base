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

export function isInBox(shap: BallInstance, w: number, h: number): boolean {
  let { x, y, r } = shap;
  return x + r > 0 && x - r <= w && y + r > 0 && y - r <= h
}

export function boxBounce(shap: BallInstance, state: ShapState, w: number, h: number): void {
  let { x, y, r } = shap;
  let { vx, vy, bounce } = state;
  function xBounce() {
    state.vx *= -bounce;
  }
  function yBounce() {
    state.vy *= -bounce;
  }
  if (x - r <= 0) {
    if (vx < 0) xBounce();
  } else if (x + r >= w) {
    if (vx > 0) xBounce();
  } else if (y + r >= h) {
    if (vy > 0) yBounce();
  } else if (y - r <= 0) {
    if (vy < 0) yBounce();
  }
}