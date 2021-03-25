import { BaseAnimation } from "./base"
import { clear, H } from "../draw/index"

export class GravityAnimation extends BaseAnimation {
    gravity = 0.2;
    shaps: BallInstance[] = [];
    shapsStates: any[] = [];

    constructor(option: any) {
        super(option);
        this.propertyInit(option);
        this.shapsStates = Array(this.shaps.length);
        for (let i = 0; i < this.shaps.length; i++) {
            this.shapsStates[i] = { vy: 0, isStop: false };
        }
    }

    move(ctx: CanvasRenderingContext2D) {
        window.requestAnimationFrame(_ => {
            let { gravity, shaps, shapsStates } = this;

            clear(ctx);
            for (let i = 0; i < shaps.length; i++) {
                let s = shaps[i];
                let ss = shapsStates[i];
                if (!ss.isStop) {
                    s.y += ss.vy;
                    ss.vy += gravity;
                    if (s.y + s.r >= H) {
                        s.y = H - s.r - 1;
                        ss.vy *= -0.8;
                        if(i == 0) console.log(ss)
                        if(ss.vy < 0 && Math.abs(ss.vy) < 2){
                            ss.vy = 0;
                            ss.isStop = true;
                        }
                    }
                }
                s.render(ctx);
            }
            this.move(ctx);
        })
    }
}