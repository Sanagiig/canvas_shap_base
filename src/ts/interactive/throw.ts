import { clear, H, W } from "../draw/index"
import utils, { isInBox, boxBounce } from '../utils/index';

export default class Throw {
  shaps: BallInstance[] = [];
  shapsStates: any[] = [];
  bounce: number = 0.8;
  friction: number = 0.01;
  gravity: number = 0.1;
  isMouseDown: boolean = false;
  isStop: boolean = false;
  canvas: HTMLElement;
  private mouseDownPos: any;
  constructor(shaps: BallInstance[], canvas: HTMLElement) {
    this.canvas = canvas;
    this.shaps = shaps.slice();
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
  }

  registerMouseEvent() {
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseDown(event: MouseEvent) {
    let pos = utils.getOffset(event);
    let hasSel = false;
    this.shaps.forEach((s, i) => {
      let { x, y, r } = s;
      let clickR = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
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
      let pos = utils.getOffset(event);
      let offset = [pos.x - this.mouseDownPos.x, pos.y - this.mouseDownPos.y];
      this.shapsStates.forEach((s, i) => {
        if (s.isSelected) {
          this.shaps[i].x += offset[0];
          this.shaps[i].y += offset[1];
        }
      })
    }
  }

  handleMouseUp(event: MouseEvent) {
    let i = this.shapsStates.length;
    this.isMouseDown = false;
    while (--i >= 0) {
      if (this.shapsStates[i].isSelected) {
        this.shapsStates[i].isSelected = false;
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
        let { isSelected ,vx,vy,gravity,friction} = ss;
        console.log("move",ss)
        if (!isSelected) {
          shap.x += vx;
          shap.y += vy;
          ss.vx += (vx > 0 ? -friction *0.2 : friction * 0.2);
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