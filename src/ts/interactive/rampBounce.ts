import { clear, H, W, drawLine } from '../draw/index';
import utils, { isInBorder, getDistance, eventRegister, getArrProxy } from '../utils/index';
import { Line } from '../shap/line';
import { boxBounce } from '../utils/index';
export default class RampBounce {
  friction: number = 0.95;
  gravity: number = 0.5;
  bounce: number = 0.7;
  shaps: BallInstance[] = [];
  lines: Line[] = [];
  shapsStates: any[] = [];
  isMouseDown: boolean = false;
  canvas: HTMLElement;
  eventMap: ClsEventMap;
  constructor(shaps: BallInstance[], canvas: HTMLElement) {
    this.canvas = canvas;
    this.shaps = shaps.slice();
    this.lines.push(new Line({ x: 100, y: 300, x2: 600, y2: 400 }))
    // this.lines.push(new Line({ x: 100, y: 300, x2: 600, y2: 300, rotation: utils.toRad(2) }))
    this.eventMap = {
      mousedown: this.handleMouseDown.bind(this),
      mousemove: this.handleMouseMove.bind(this),
      mouseup: this.handleMouseUp.bind(this),
    };
    this.shapsStates = shaps.map((s, i) => {
      return {
        vx: 0,
        vy: 0,
        offsetX: 0,
        offsetY: 0,
        bounce: this.bounce,
        isMouseDown: false,
        lastPos: { x: s.x, y: s.y }
      }
    })
    this.registerMouseEvent();
  }

  godie() {
    this.removeMouseEvent();
  }
  registerMouseEvent() {
    eventRegister(this.canvas, this.eventMap);
  }
  removeMouseEvent() {
    eventRegister(this.canvas, this.eventMap, true);
  }
  handleMouseDown(event: MouseEvent) {
    let pos = utils.getOffset(event);
    let i = this.shaps.length;
    while (--i >= 0) {
      let s = this.shaps[i];
      let ss = this.shapsStates[i];
      let distance = getDistance(pos.x, pos.y, s.x, s.y);
      if (distance <= s.r) {
        ss.vx = 0;
        ss.vy = 0;
        ss.isMouseDown = true;
        ss.offsetX = pos.x - s.x;
        ss.offsetY = pos.y - s.y;
        break;
      }
    }
    this.isMouseDown = true;
  }
  handleMouseMove(event: MouseEvent) {
    let { shaps, shapsStates, isMouseDown } = this;
    if (isMouseDown) {
      let pos = utils.getOffset(event);
      let selI = shapsStates.findIndex(ss => ss.isMouseDown);
      if (selI > -1) {
        const power = 5;
        let s = shaps[selI];
        let ss = shapsStates[selI];

        // ss.vx = (pos.x - ss.lastPos.x) * power;
        // ss.vy = (pos.y - ss.lastPos.y) * power;
        ss.lastPos = pos;
        s.x = pos.x - ss.offsetX;
        s.y = pos.y - ss.offsetY;

      }
    }
  }

  handleMouseUp(event: MouseEvent) {
    let { shapsStates } = this;
    let selI = shapsStates.findIndex(ss => ss.isMouseDown);
    let pos = utils.getOffset(event);
    if (selI > -1) {
      let ss = shapsStates[selI];
      ss.vy = 5;
      ss.isMouseDown = false;
    }
    this.isMouseDown = false;
  }
  spingOther(ss: any) {

  }
  drawLine(ctx: CanvasRenderingContext2D, shaps: BallInstance[]) {
    this.lines.forEach(l => l.render(ctx));
  }
  checkHitLine(s: BallInstance, ss: any): boolean {
    let line = this.lines[0];
    let lx = line.x, lx2 = line.x2, ly = line.y, ly2 = line.y2;
    let x = s.x - lx, y = s.y - ly;

    let lrad = Math.atan2(ly2 - ly, lx2 - lx);
    let lcos = Math.cos(lrad), lsin = Math.sin(lrad);

    let x1 = x * lcos + y * lsin, y1 = y * lcos - x * lsin;
    let vx1 = ss.vx * lcos + ss.vy * lsin,
      vy1 = ss.vy * lcos - ss.vx * lsin;

    let isOnline = (s.x + s.r >= lx && s.x - s.r <= lx2 && vy1 > y1)
    let res = false;

    if (y1 + s.r >= 0 && isOnline) {
      res = true;
      y1 = -s.r;
      vy1 *= -ss.bounce;
    }
    x = x1 * lcos - y1 * lsin;
    y = y1 * lcos + x1 * lsin;
    ss.vx = vx1 * lcos - vy1 * lsin;
    ss.vy = vy1 * lcos + vx1 * lsin;
    s.x = lx + x;
    s.y = ly + y;
    return res;
  }
  move(ctx: CanvasRenderingContext2D) {
    window.requestAnimationFrame(_ => {
      let { shaps, shapsStates, friction, gravity, bounce } = this;
      clear(ctx);
      this.drawLine(ctx, shaps);
      shaps.forEach((shap, i) => {
        let ss = shapsStates[i];
        this.checkHitLine(shap, ss)
        if (!ss.isMouseDown) {
          ss.vy += shap.y + shap.r < H ? gravity : 0;

          // ss.vx *= friction;
          // ss.vy *= friction;

          shap.x += ss.vx;
          shap.y += ss.vy;
          if (this.checkHitLine(shap, ss)) {
            // ss.vy -= gravity;
          } else if (isInBorder(shap, W, H)) {
            boxBounce(shap, ss, W, H);
            // console.log("isInBorder", ss.vx, ss.vy)
          }
        }
        shap.render(ctx);
      })

      this.move(ctx);
    })
  }
}
