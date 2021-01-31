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
            this.shapsStates[i] = { vy: 0 };
        }
    }

    move(ctx: CanvasRenderingContext2D) {
        window.requestAnimationFrame(_ => {
            let { gravity, shaps, shapsStates } = this;

            clear(ctx);
            for (let i = 0; i < shaps.length; i++) {
                let s = shaps[i];
                let ss = shapsStates[i];

                s.y += ss.vy;
                ss.vy += gravity;
                if (s.y + s.r >= H) {
                    s.y =  H - s.r;
                    ss.vy *= -0.8;
                }
                s.render(ctx);
            }
            this.move(ctx);
        })
    }
}