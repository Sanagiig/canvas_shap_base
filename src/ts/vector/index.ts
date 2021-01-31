import utils, { propertyInit } from "../utils/index";

export class Vector {
    public vx = 0;
    public vy = 0;
    public angle = 0;
    public xStep = 0;
    public yStep = 0;
    constructor(option: any) {
        propertyInit(this, option)
        this.computeStep();
    }
    computeStep() {
        let rad = utils.toRad(this.angle)
        this.xStep = this.vx * Math.cos(rad);
        this.yStep = this.vy * Math.sin(rad);
    }
}