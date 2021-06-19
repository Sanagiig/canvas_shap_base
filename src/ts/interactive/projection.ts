import { clear, H, W, drawLine } from '../draw/index';
import utils, { isInBox, getDistance, eventRegister, getArrProxy } from '../utils/index';
import { Rect } from '../shap/rect';
export default class Projection {
  shap: BallInstance;
  shapsState: any = {};
  isMouseDown: boolean = false;
  isMove: boolean = false;
  canvas: HTMLElement;
  eventMap: ClsEventMap;
  rect: Rect;
  linePoint: Position;
  friction: number = 0.95;
  gravity: number = 0.3;
  easing: number = 0.3;
  lastX: number = 0;
  lastY: number = 0;

  constructor(shap: BallInstance, canvas: HTMLElement) {
    this.canvas = canvas;
    this.shap = shap;
    this.shapsState.vx = 0;
    this.shapsState.vy = 0;

    this.linePoint = { x: shap.x, y: shap.y };
    this.resetBall();
    this.rect = new Rect({
      x: 400, y: 400, width: 100, height: 50
    })
    this.eventMap = {
      mousedown: this.handleMouseDown.bind(this),
      mousemove: this.handleMouseMove.bind(this),
      mouseup: this.handleMouseUp.bind(this),
    };
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
    if (!this.isMove) {
      this.isMouseDown = true;
      this.lastX = this.shap.x;
      this.lastY = this.shap.y;
    }
  }
  handleMouseMove(event: MouseEvent) {
    let pos = utils.getOffset(event);
    if (this.isMouseDown) {
      this.linePoint = pos;
    }
  }

  handleMouseUp(event: MouseEvent) {
    let { shapsState, easing } = this;
    let pos = utils.getOffset(event);
    shapsState.vx = easing * (pos.x - this.shap.x);
    shapsState.vy = easing * (pos.y - this.shap.y);
    this.isMove = true;
    this.isMouseDown = false;
  }
  spingOther(ss: any) {

  }
  drawLine(ctx: CanvasRenderingContext2D) {
    let { shap, linePoint } = this;
    if (this.isMouseDown) {
      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.lineTo(linePoint.x, linePoint.y);
      ctx.lineTo(shap.x, shap.y);
      ctx.stroke();
      ctx.restore()
    }
  }
  resetBall() {
    this.shap.x = 100;
    this.shap.y = 500;
    this.isMove = false;
  }
  checkHit(): boolean {
    let { rect, shap, lastX, lastY } = this;
    let { x, y } = shap;
    let k1 = (y - lastY) / (x - lastX);
    let b1 = lastY - k1 * lastX;
    let k2 = 0, b2 = shap.y;
    let cx = (b2 - b1) / (k1 - k2);
    let cy = k1 * cx + b1;

    if (cx - shap.r / 2 > rect.x && cx + shap.r / 2 < rect.x + rect.width && cy - shap.r > rect.y) {
      return true;
    } else {
      return false;
    }
  }
  move(ctx: CanvasRenderingContext2D) {
    window.requestAnimationFrame(_ => {
      let { shap, shapsState, friction, gravity } = this;
      clear(ctx);

      if (this.isMove) {
        shapsState.vx *= friction;
        shapsState.vy *= friction;
        shapsState.vy += gravity;
        shap.x += shapsState.vx;
        shap.y += shapsState.vy;
      }

      if (!isInBox(shap, W, H) || this.checkHit()) {
        this.resetBall();
      }
      this.drawLine(ctx);
      this.rect.render(ctx);
      shap.render(ctx);
      this.move(ctx);
    })
  }
}
