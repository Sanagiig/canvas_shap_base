import { clear } from "../draw/index";
import utils from "../utils/index";
import { BaseAnimation } from "./base";

export class FlowAnimation extends BaseAnimation {
    protected shaps: ShapInstance[] = [];
    public x = 0;
    public y = 0;
    public speed = 3;
    constructor(option: any) {
        super(option);
        this.propertyInit(option);
    }
    move(ctx: CanvasRenderingContext2D) {
        window.requestAnimationFrame(_ => {
            let { shaps, x, y, speed } = this;
            clear(ctx);
            for (let i = 0; i < shaps.length; i++) {
                let s = shaps[i];
                let sx = s.x, sy = s.y;
                let dx = x - sx, dy = y - sy;
                let angle = Math.atan2(dy, dx);
                let xStep = speed * Math.cos(angle),
                    yStep = speed * Math.sin(angle);

                s.x =  Math.abs(xStep) > Math.abs(dx) ? x : sx + xStep;
                s.y =  Math.abs(yStep) > Math.abs(dy) ? y : sy + yStep;
                if(Math.abs(xStep) < Math.abs(dx) ){
                    s.rotation = angle;
                }
                s.render(ctx);
            }
            this.move(ctx);
        })
    }
}