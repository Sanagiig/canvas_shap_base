import { clear, H, W } from "../draw/index"
import utils, { isInBox, boxBounce, eventRegister } from '../utils/index';
export default class Throw {
  shaps: BallInstance[] = [];
  shapsStates: any[] = [];
  bounce: number = 0.8;
  friction: number = 0.01;
  gravity: number = 0.1;
  isMouseDown: boolean = false;
  isStop: boolean = false;
  canvas: HTMLElement;
  eventMap: ClsEventMap;

  private mouseDownPos: any;
  constructor(shaps: BallInstance[], canvas: HTMLElement) {
    this.canvas = canvas;
    this.shaps = shaps.slice();
    this.eventMap = {
      mousedown: this.handleMouseDown.bind(this),
      mouseup: this.handleMouseUp.bind(this),
      mousemove: this.handleMouseMove.bind(this),
    };
    this.shapsStates = shaps.map(s => {
      let ram = Math.random();
      let bx = 10;
      let by = 10;
      return {
        vx: ram > 0.5 ? bx * ram : bx * ram * -1,
        vy: ram > 0.5 ? by * ram : by * ram * -1,
        gravity: this.gravity,
        friction: this.friction,
        bounce: this.bounce,
        isSelected: false,
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
    let hasSel = false;
    console.log(pos)
    this.shaps.forEach((s, i) => {
      let { x, y, r } = s;
      let clickR = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
      console.log(pos, clickR)
      if (clickR < r && !hasSel) {
        this.mouseDownPos = { x: pos.x, y: pos.y };
        this.isMouseDown = true;
        this.shapsStates[i].isSelected = true;
        hasSel = true;
      }
    })
  }

  handleMouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      let { shapsStates, mouseDownPos,shaps } = this;
      let pos = utils.getOffset(event);
      let offset = [pos.x - mouseDownPos.x, pos.y - mouseDownPos.y];
      shapsStates.forEach((ss, i) => {
        if (ss.isSelected) {
          let s = this.shaps[i];
          s.x += offset[0];
          s.y += offset[1];
          ss.vx = (pos.x - mouseDownPos.x) * 4;
          ss.vy = (pos.y - mouseDownPos.y) * 4;
          mouseDownPos.x = pos.x;
          mouseDownPos.y = pos.y;
        }
      })
    }
  }

  handleMouseUp(event: MouseEvent) {
    let { shapsStates } = this;
    let i = this.shapsStates.length;
    this.isMouseDown = false;
    while (--i >= 0) {
      let ss = shapsStates[i];
      if (ss.isSelected) {
        ss.isSelected = false;
        break;
      }
    }
  }

  move(ctx: CanvasRenderingContext2D) {
    if (this.isStop) return;

    window.requestAnimationFrame(_ => {
      let { shaps, shapsStates } = this;
      clear(ctx);

      shaps.forEach((shap, i) => {
        let ss = shapsStates[i];
        let { isSelected, vx, vy, gravity, friction } = ss;

        if (!isSelected) {
          shap.x += vx;
          shap.y += vy;
          ss.vx += (vx > 0 ? -friction * 0.2 : friction * 0.2);
          ss.vy += gravity;
          ss.vy += (vy > 0 ? -friction : friction);
          boxBounce(shap, ss, W, H);
        }

        shap.render(ctx);
      })
      this.move(ctx);
    })
  }
}