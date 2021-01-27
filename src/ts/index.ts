import utils from "./utils/index";
import * as draw from "./draw/index";
import Arrow from "./shap/arrow";

export default function init(e:Event){
  let canvas = <HTMLCanvasElement>document.getElementById("canvas");
  let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
  let arrow = new Arrow(ctx,{x:draw.W / 2 , y:draw.H / 2});
  let arrow2 = new Arrow(ctx,{x:draw.W / 2 , y:draw.H / 2,rotation:30});
  let arrow3 = new Arrow(ctx,{x:draw.W / 2 , y:draw.H / 2,rotation:80});
  canvas?.addEventListener("mousemove",function(e){
    let pos = utils.getOffset(e);
    let dx = pos.x - draw.W /2;
    let dy = pos.y - draw.H /2;
    let rad = Math.atan2(dy,dx)
    let angle = Math.atan(dy/dx) * 180 / Math.PI;
    let angle2 = Math.atan2(dy,dx) * 180 / Math.PI;
    let res = `x: ${dx} , y: ${dy}`
    let res2 = `angle : ${angle} `
    let res3 = `angle2 : ${angle2}`
    
    draw.clear(ctx);
    draw.drawSystem(ctx);
    // draw.drawLine(ctx,pos);
    arrow.rotation = rad;
    arrow2.rotation = rad + 30;
    arrow3.rotation = rad + 70;
    arrow.render();
    arrow2.render();
    arrow3.render();
    ctx.fillText(rad + '',pos.x + 10,pos.y);
    ctx.fillText(res2,pos.x + 10,pos.y + 20);
    ctx.fillText(res3,pos.x + 10,pos.y + 40);
  })

  canvas?.addEventListener("click",function(e){
    let pos = utils.getOffset(e);
    let dx = pos.x - draw.W /2;
    let dy = pos.y - draw.H /2;
    let angle = Math.atan(dy/dx) * 180 / Math.PI;
    let angle2 = Math.atan2(dy,dx) * 180 / Math.PI;
    console.log(dx,dy)
    console.log("angle",angle);
    console.log("angle2",angle2);
  })
  draw.initDraw(canvas);
  console.log("canvas init");
}

