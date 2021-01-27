var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("ts/utils/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        getOffset(event) {
            return this.eventWraper(event);
        },
        eventWraper(event) {
            let { pageX, pageY, target } = event;
            let { left, top } = target.getBoundingClientRect();
            return { x: pageX - left, y: pageY - top };
        },
        toRad(angle) {
            return angle * Math.PI / 180;
        },
        toAng(rand) {
            return rand * 180 / Math.PI;
        }
    };
});
define("ts/draw/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clear = exports.drawLine = exports.drawSystem = exports.initDraw = exports.H = exports.W = void 0;
    exports.W = 800;
    exports.H = 600;
    function initDraw(canvas) {
        canvas.width = exports.W;
        canvas.height = exports.H;
    }
    exports.initDraw = initDraw;
    function drawSystem(ctx) {
        ctx.save();
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, exports.H / 2);
        ctx.lineTo(exports.W, exports.H / 2);
        ctx.moveTo(exports.W / 2, 0);
        ctx.lineTo(exports.W / 2, exports.H);
        ctx.stroke();
        ctx.restore();
    }
    exports.drawSystem = drawSystem;
    function drawLine(ctx, pos) {
        ctx.beginPath();
        ctx.moveTo(exports.W / 2, exports.H / 2);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.restore();
    }
    exports.drawLine = drawLine;
    function clear(ctx) {
        ctx.clearRect(0, 0, exports.W, exports.H);
    }
    exports.clear = clear;
});
define("ts/shap/arrow", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Arrow {
        constructor(ctx, props) {
            this.x = 0;
            this.y = 0;
            this.width = 400;
            this.height = 100;
            this.rotation = 0;
            this.fillStyle = "rgba(57,119,224)";
            this.strokeStyle = "rgba(0,0,0)";
            this.points = [];
            this.ctx = ctx;
            Object.assign(this, props);
            this.computePoints();
        }
        // private computePoints() {
        //   const { points, x, y, width, height } = this;
        //   points.length = 0;
        //   // 左上
        //   points.push({ x: -width / 2 + x, y: -height / 2 + y });
        //   // 左下
        //   points.push({ x: -width / 2 + x, y: height / 2 + y });
        //   points.push({ x: width / 10 + x , y: height / 2 + y });
        //   // 右下
        //   points.push({ x: width / 10 + x , y: height + y });
        //   points.push({ x: width / 2 + x, y });
        //   // 右上
        //   points.push({ x: width / 10 + x, y: -height + y });
        //   points.push({ x: width / 10 + x, y: -height / 2 + y });
        // }
        computePoints() {
            const { points, x, y, width, height } = this;
            points.length = 0;
            // 左上
            points.push({ x: -width / 2, y: -height / 2 });
            // 左下
            points.push({ x: -width / 2, y: height / 2 });
            points.push({ x: width / 10, y: height / 2 });
            // 右下
            points.push({ x: width / 10, y: height });
            points.push({ x: width / 2, y: 0 });
            // 右上
            points.push({ x: width / 10, y: -height });
            points.push({ x: width / 10, y: -height / 2 });
        }
        createPath(ctx) {
            let { points } = this;
            ctx = ctx || this.ctx;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                let p = points[i];
                ctx.lineTo(p.x, p.y);
            }
            ctx.closePath();
            return this;
        }
        render(ctx) {
            let { fillStyle, strokeStyle, x, y, rotation } = this;
            ctx = ctx || this.ctx;
            ctx.save();
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.translate(x, y);
            ctx.rotate(rotation);
            this.createPath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();
            return this;
        }
    }
    exports.default = Arrow;
});
define("ts/index", ["require", "exports", "ts/utils/index", "ts/draw/index", "ts/shap/arrow"], function (require, exports, index_1, draw, arrow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1 = __importDefault(index_1);
    draw = __importStar(draw);
    arrow_1 = __importDefault(arrow_1);
    function init(e) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let arrow = new arrow_1.default(ctx, { x: draw.W / 2, y: draw.H / 2 });
        let arrow2 = new arrow_1.default(ctx, { x: draw.W / 2, y: draw.H / 2, rotation: 30 });
        let arrow3 = new arrow_1.default(ctx, { x: draw.W / 2, y: draw.H / 2, rotation: 80 });
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("mousemove", function (e) {
            let pos = index_1.default.getOffset(e);
            let dx = pos.x - draw.W / 2;
            let dy = pos.y - draw.H / 2;
            let rad = Math.atan2(dy, dx);
            let angle = Math.atan(dy / dx) * 180 / Math.PI;
            let angle2 = Math.atan2(dy, dx) * 180 / Math.PI;
            let res = `x: ${dx} , y: ${dy}`;
            let res2 = `angle : ${angle} `;
            let res3 = `angle2 : ${angle2}`;
            draw.clear(ctx);
            draw.drawSystem(ctx);
            // draw.drawLine(ctx,pos);
            arrow.rotation = rad;
            arrow2.rotation = rad + 30;
            arrow3.rotation = rad + 70;
            arrow.render();
            arrow2.render();
            arrow3.render();
            ctx.fillText(rad + '', pos.x + 10, pos.y);
            ctx.fillText(res2, pos.x + 10, pos.y + 20);
            ctx.fillText(res3, pos.x + 10, pos.y + 40);
        });
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("click", function (e) {
            let pos = index_1.default.getOffset(e);
            let dx = pos.x - draw.W / 2;
            let dy = pos.y - draw.H / 2;
            let angle = Math.atan(dy / dx) * 180 / Math.PI;
            let angle2 = Math.atan2(dy, dx) * 180 / Math.PI;
            console.log(dx, dy);
            console.log("angle", angle);
            console.log("angle2", angle2);
        });
        draw.initDraw(canvas);
        console.log("canvas init");
    }
    exports.default = init;
});
