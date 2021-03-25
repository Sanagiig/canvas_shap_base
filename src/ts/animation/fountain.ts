import { BaseAnimation } from "./base"
import { clear, H, W } from "../draw/index"
import { isInBox } from '../utils/index';

export class FountainAnimation extends BaseAnimation {
    gravity = 0.2;
    shaps: ShapInstance[] = [];
    shapsStates: any[] = [];

    constructor(option: any) {
        super(option);
        this.propertyInit(option);
        this.shapsStates = Array(this.shaps.length);
        for (let i = 0; i < this.shaps.length; i++) {
            this.shapsStates[i] = {
                vx: Math.random() > 0.5 ? 5 * Math.random() : Math.random() * -5,
                vy: 20 * Math.random() + 10,
                isStop: false
            };
        }
        this.shaps.forEach(s => this.shapsInit(<BallInstance>s));
    }

    move(ctx: CanvasRenderingContext2D) {
        window.requestAnimationFrame(_ => {
            let { shaps, shapsStates } = this;

            clear(ctx);
            shaps.forEach((shap, i) => {
                let ss = shapsStates[i];
                if (isInBox(<BallInstance>shap, W, H) && !ss.isStop) {
                    shap.y -= ss.vy;
                    shap.x += ss.vx;
                } else {
                    this.shapsInit(<BallInstance>shap);
                    // ss.isStop = true;
                }
                shap.render(ctx);
            })
            this.move(ctx);
        })
    }

    shapsInit(shap:BallInstance) {
        shap.x = W / 2;
        shap.y = H + shap.r;
    }
}