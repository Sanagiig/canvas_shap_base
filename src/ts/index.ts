import utils from "./utils/index";
import { H, W } from "./draw/index"
import * as draw from "./draw/index";
import Arrow from "./shap/arrow";
import { Ball } from './shap/ball';
import { Slide } from './animation/slide';
import { Circle } from './animation/circle';
import { Oval } from './animation/oval';
import { VectorAnimation } from './animation/vectorAnimation';
import { Vector } from "./vector/index"
import { FlowAnimation } from "./animation/flow";
import { GravityAnimation } from "./animation/gravity";
import { FountainAnimation } from './animation/fountain';
import { EaseAnimation } from './animation/ease';
import { SpringAnimation } from './animation/spring';
import Throw from './interactive/throw';
import Spring from './interactive/spring';
import Struct from './interactive/struct';
import Projection from './interactive/projection';
import { AdvanceTranslate } from './animation/advanceTranslate';
import RampBounce from './interactive/rampBounce';
export default function init(e: Event) {
  let canvas = <HTMLCanvasElement>document.getElementById("canvas");
  let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
  let arrow = new Arrow({ x: draw.W / 2, y: draw.H / 6 });
  let balls = new Array(120);
  for (let i = 0; i < balls.length; i++) {
    balls[i] = new Ball({ x: draw.W * Math.random(), y: draw.H * Math.random(), r: 30 });
  }
  // let ease = new EaseAnimation([balls[0]], [W / 2, H / 2]);
  // let spring = new SpringAnimation([balls[2]], [W / 2, H / 2]);
  // let springInt = new Spring([balls[0]], canvas);
  // let structIns = new Struct(balls.slice(0, 10), canvas);
  // let projection = new Projection(balls[0],canvas);
  // let adt = new AdvanceTranslate(balls.slice(0,5));
  let ramBounce = new RampBounce(balls.slice(0,1),canvas);
  // let throwIns = new Throw([balls[0]],canvas);
  // let slide = new Slide([ball]);
  // let circle = new Circle([ball, arrow]);
  // let oval = new Oval([ball, arrow]);
  // let vec = new VectorAnimation({
  //   shaps: [ball],
  //   vectors: [new Vector({
  //     vx: 0.5,
  //     vy: 0.5,
  //     angle: 1
  //   })]
  // })
  // let flow = new FlowAnimation({ shaps: [arrow] });
  // let gravity = new GravityAnimation({ shaps:balls });
  // let foutain = new FountainAnimation({shaps:balls});
  // canvas?.addEventListener("mousemove", function (e) {
  //   let pos = utils.getOffset(e);
  //   let dx = pos.x - draw.W / 2;
  //   let dy = pos.y - draw.H / 2;
  //   let rad = Math.atan2(dy, dx)
  //   let angle = Math.atan(dy / dx) * 180 / Math.PI;
  //   let angle2 = Math.atan2(dy, dx) * 180 / Math.PI;
  //   let res = `x: ${dx} , y: ${dy}`
  //   let res2 = `angle : ${angle} `
  //   let res3 = `angle2 : ${angle2}`

  //   draw.clear(ctx);
  //   ctx.fillText(rad + `   dx:${dx}, dy:${dy}`, pos.x + 10, pos.y);
  //   ctx.fillText(res2, pos.x + 10, pos.y + 20);
  //   ctx.fillText(res3, pos.x + 10, pos.y + 40);
  //   flow.x = pos.x;
  //   flow.y = pos.y;

  //   draw.drawSystem(ctx);
  // })

  // canvas.addEventListener("click", e => {
  //   draw.clear(ctx);
  // })

  draw.initDraw(canvas);
  // slide.move(ctx);
  // circle.move(ctx);
  // oval.move(ctx);
  // vec.move(ctx);
  // flow.move(ctx);
  // gravity.move(ctx);
  // foutain.move(ctx);
  // throwIns.move(ctx);
  // ease.move(ctx);
  // spring.move(ctx);
  // springInt.move(ctx);
  // structIns.move(ctx);
  // projection.move(ctx);
  // adt.move(ctx);
  ramBounce.move(ctx);
}
