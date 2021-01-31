import { BaseAnimation } from "./base";
import { clear } from "../draw/index";
export class VectorAnimation extends BaseAnimation {
    protected vectors: verctorInstance[] = [];
    protected shaps: ShapInstance[] = [];
    constructor(option: any) {
        super(option);
        this.propertyInit(option);
    }
    move(ctx: CanvasRenderingContext2D) {
        window.requestAnimationFrame(_ => {
            let { shaps, vectors } = this;
            clear(ctx);
            for (let i = 0; i < shaps.length; i++) {
                let shap = shaps[i];
                for (let j = 0; j < vectors.length; j++) {
                    let verctor = vectors[j];
                    shap.x += verctor.xStep;
                    shap.y += verctor.yStep;
                }
                shap.render(ctx);
            }
            this.move(ctx);
        })
    }
}