import utils from "../utils/index";
import { clear } from '../draw/index';
export class Slide {
  public angle = 0;
  public shaps:ShapInstance[] = [];
  private swing = 160;
  private start = 300;
  constructor(shaps:ShapInstance[]){
    this.shaps = shaps.slice();
  }
  move(ctx:CanvasRenderingContext2D){
    window.requestAnimationFrame(_=>{
      let {shaps,angle,swing} = this;
      
      clear(ctx);
      for(let i =0;i<shaps.length;i++){
        let shap:ShapInstance = shaps[i];
        shap.x = Math.sin(utils.toRad(angle)) * swing + this.start;
        shap.render(ctx);
      }
      this.angle += 0.5;
      this.move(ctx);
    })
  }
}