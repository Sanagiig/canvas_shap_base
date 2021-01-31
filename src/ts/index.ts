import utils from "./utils/index";
import * as draw from "./draw/index";
import Arrow from "./shap/arrow";
import { Ball } from './shap/ball';
import { Slide } from './animation/slide';
import { Circle } from './animation/circle';
import { Oval } from './animation/oval';

export default function init(e: Event) {
  let canvas = <HTMLCanvasElement>document.getElementById("canvas");
  let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
  let arrow = new Arrow({ x: draw.W / 2, y: draw.H / 6 });
  let ball = new Ball({ x: draw.W / 2, y: draw.H / 2, r: 30 })
  // let slide = new Slide([ball]);
  let circle = new Circle([ball,arrow]);
  let oval = new Oval([ball,arrow]);
  // canvas?.addEventListener("mousemove",function(e){
  //   let pos = utils.getOffset(e);
  //   let dx = pos.x - draw.W /2;
  //   let dy = pos.y - draw.H /2;
  //   let rad = Math.atan2(dy,dx)
  //   let angle = Math.atan(dy/dx) * 180 / Math.PI;
  //   let angle2 = Math.atan2(dy,dx) * 180 / Math.PI;
  //   let res = `x: ${dx} , y: ${dy}`
  //   let res2 = `angle : ${angle} `
  //   let res3 = `angle2 : ${angle2}`

  //   draw.clear(ctx);
  //   // draw.drawSystem(ctx);
  //   // draw.drawLine(ctx,pos);
  //   arrow.rotation = rad;
  //   ball.render(ctx);
  //   // arrow.render(ctx);
  //   ctx.fillText(rad + '',pos.x + 10,pos.y);
  //   ctx.fillText(res2,pos.x + 10,pos.y + 20);
  //   ctx.fillText(res3,pos.x + 10,pos.y + 40);
  // })

  canvas.addEventListener("click",e=>{
    draw.clear(ctx);
  })

  draw.initDraw(canvas);
  // slide.move(ctx);
  // circle.move(ctx);
  oval.move(ctx);

  console.log("canvas init");
}

