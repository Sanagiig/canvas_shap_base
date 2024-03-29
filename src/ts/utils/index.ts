export default {
  getOffset(event: MouseEvent) {
    return this.eventWraper(event);
  },
  eventWraper(event: MouseEvent): Position {
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
export function isInBorder(shap: BallInstance, w: number, h: number){
  let { x, y, r } = shap;
  return x - r < 0 || x + r > w || y - r < 0 || y + r > h
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

export function getDistance(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1, dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

type eventFn = 'addEventListener' | 'removeEventListener';
export function eventRegister(elm: HTMLElement, eventMap: ClsEventMap, isRemove?: boolean) {
  let disName: string = isRemove ? 'removeEventListener' : 'addEventListener';

  (<EventName[]>Object.keys(eventMap)).forEach(eName => {
    let fns: any = (<any>eventMap)[eName];
    if (fns instanceof Array) {
      fns.forEach(fn => {
        elm[<eventFn>disName](eName, fn);
      })
    } else {
      elm[<eventFn>disName](eName, fns);
    }
  })
}

export function getArrProxy(arr: any[]) {
  return new Proxy(arr, {
    get(target, index, receive) {
      let len = target.length;
      let idx_num = parseInt(index as string);
      let i: number = idx_num >= len
        ? idx_num % len
        : idx_num < 0
          ? len + idx_num
          : idx_num;

      return target[i];
    }
  })
}
