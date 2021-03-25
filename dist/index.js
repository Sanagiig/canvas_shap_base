"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
define("ts/utils/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boxBounce = exports.isInBox = exports.propertyInit = void 0;
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
        },
    };
    function propertyInit(target, option) {
        let keys = Object.keys(target);
        let key;
        for (key in option) {
            if (keys.indexOf(key) > -1) {
                let val = option[key];
                if (val instanceof Array) {
                    target[key] = val.slice();
                }
                else {
                    target[key] = val;
                }
            }
        }
    }
    exports.propertyInit = propertyInit;
    function isInBox(shap, w, h) {
        let { x, y, r } = shap;
        return x + r > 0 && x - r <= w && y + r > 0 && y - r <= h;
    }
    exports.isInBox = isInBox;
    function boxBounce(shap, state, w, h) {
        let { x, y, r } = shap;
        let { vx, vy, bounce } = state;
        function xBounce() {
            state.vx *= -bounce;
        }
        function yBounce() {
            state.vy *= -bounce;
        }
        if (x - r <= 0) {
            if (vx < 0)
                xBounce();
        }
        else if (x + r >= w) {
            if (vx > 0)
                xBounce();
        }
        else if (y + r >= h) {
            if (vy > 0)
                yBounce();
        }
        else if (y - r <= 0) {
            if (vy < 0)
                yBounce();
        }
    }
    exports.boxBounce = boxBounce;
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
define("ts/shap/base", ["require", "exports", "ts/utils/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Shap = void 0;
    class Shap {
        constructor(option) {
            this.x = 0;
            this.y = 0;
            this.width = 400;
            this.height = 100;
            this.rotation = 0;
            this.fillStyle = "rgba(57,119,224)";
            this.strokeStyle = "rgba(0,0,0)";
            this.points = [];
            this.propertyInit(option);
        }
        propertyInit(option) {
            index_1.propertyInit(this, option);
        }
    }
    exports.Shap = Shap;
});
define("ts/shap/arrow", ["require", "exports", "ts/shap/base"], function (require, exports, base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Arrow extends base_1.Shap {
        constructor(props) {
            super(props);
            this.propertyInit(props);
            this.computePoints();
        }
        computePoints() {
            const { points, width, height } = this;
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
            ctx.save();
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.translate(x, y);
            ctx.rotate(rotation);
            this.createPath(ctx);
            ctx.stroke();
            ctx.fill();
            ctx.restore();
            return this;
        }
    }
    exports.default = Arrow;
});
define("ts/shap/ball", ["require", "exports", "ts/shap/base"], function (require, exports, base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ball = void 0;
    class Ball extends base_2.Shap {
        constructor(option) {
            super(option);
            this.scaleX = 1;
            this.scaleY = 1;
            this.r = 20;
            this.alpha = 1;
        }
        render(ctx) {
            let { fillStyle, strokeStyle, x, y, r, scaleX, scaleY, alpha } = this;
            ctx.save();
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.translate(x, y);
            ctx.scale(scaleX, scaleY);
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }
    exports.Ball = Ball;
});
define("ts/animation/slide", ["require", "exports", "ts/utils/index", "ts/draw/index"], function (require, exports, index_2, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Slide = void 0;
    index_2 = __importDefault(index_2);
    class Slide {
        constructor(shaps) {
            this.angle = 0;
            this.shaps = [];
            this.swing = 160;
            this.start = 300;
            this.shaps = shaps.slice();
        }
        move(ctx) {
            window.requestAnimationFrame(_ => {
                let { shaps, angle, swing } = this;
                index_3.clear(ctx);
                for (let i = 0; i < shaps.length; i++) {
                    let shap = shaps[i];
                    shap.x = Math.sin(index_2.default.toRad(angle)) * swing + this.start;
                    shap.render(ctx);
                }
                this.angle += 0.5;
                this.move(ctx);
            });
        }
    }
    exports.Slide = Slide;
});
define("ts/animation/circle", ["require", "exports", "ts/utils/index", "ts/draw/index"], function (require, exports, index_4, index_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Circle = void 0;
    index_4 = __importDefault(index_4);
    class Circle {
        constructor(shaps) {
            this.r = 50;
            this.points = [];
            this.angle = 0;
            this.shaps = [];
            this.shaps = shaps.slice();
            this.shaps.forEach(s => {
                this.points.push({ x: s.x, y: s.y });
            });
        }
        drawTrace(ctx) {
            let { shaps, points, r } = this;
            ctx.save();
            for (let i = 0; i < shaps.length; i++) {
                let s = shaps[i];
                let p = points[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.fillStyle = "rgb(255,0,0)";
                ctx.arc(s.x, s.y, 2, 0, 2 * Math.PI);
                ctx.fill();
            }
            ctx.restore();
        }
        move(ctx) {
            window.requestAnimationFrame(_ => {
                let { shaps, r, points } = this;
                let rad = index_4.default.toRad(this.angle);
                index_5.clear(ctx);
                for (let i = 0; i < shaps.length; i++) {
                    let p = points[i];
                    let s = shaps[i];
                    s.x = p.x + Math.cos(rad) * r;
                    s.y = p.y + Math.sin(rad) * r;
                    s.render(ctx);
                }
                this.angle = (this.angle + 1) % 360;
                this.drawTrace(ctx);
                this.move(ctx);
            });
        }
    }
    exports.Circle = Circle;
});
define("ts/animation/oval", ["require", "exports", "ts/utils/index", "ts/draw/index"], function (require, exports, index_6, index_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Oval = void 0;
    index_6 = __importDefault(index_6);
    class Oval {
        constructor(shaps) {
            this.ra = 150;
            this.rb = 50;
            this.points = [];
            this.angle = 0;
            this.shaps = [];
            this.shaps = shaps.slice();
            this.shaps.forEach(s => {
                this.points.push({ x: s.x, y: s.y });
            });
        }
        drawTrace(ctx) {
            let { shaps, points, ra, rb } = this;
            ctx.save();
            for (let i = 0; i < shaps.length; i++) {
                let s = shaps[i];
                let p = points[i];
                ctx.beginPath();
                ctx.ellipse(p.x, p.y, ra, rb, 0, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.fillStyle = "rgb(255,0,0)";
                ctx.arc(s.x, s.y, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
            ctx.restore();
        }
        move(ctx) {
            window.requestAnimationFrame(_ => {
                let { shaps, ra, rb, points } = this;
                let rad = index_6.default.toRad(this.angle);
                index_7.clear(ctx);
                for (let i = 0; i < shaps.length; i++) {
                    let p = points[i];
                    let s = shaps[i];
                    s.x = p.x + Math.cos(rad) * ra;
                    s.y = p.y + Math.sin(rad) * rb;
                    s.render(ctx);
                }
                this.angle = (this.angle + 1) % 360;
                this.drawTrace(ctx);
                this.move(ctx);
            });
        }
    }
    exports.Oval = Oval;
});
define("ts/animation/base", ["require", "exports", "ts/utils/index"], function (require, exports, index_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseAnimation = void 0;
    class BaseAnimation {
        constructor(option) {
        }
        propertyInit(option) {
            index_8.propertyInit(this, option);
        }
    }
    exports.BaseAnimation = BaseAnimation;
});
define("ts/animation/vectorAnimation", ["require", "exports", "ts/animation/base", "ts/draw/index"], function (require, exports, base_3, index_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VectorAnimation = void 0;
    class VectorAnimation extends base_3.BaseAnimation {
        constructor(option) {
            super(option);
            this.vectors = [];
            this.shaps = [];
            this.propertyInit(option);
        }
        move(ctx) {
            window.requestAnimationFrame(_ => {
                let { shaps, vectors } = this;
                index_9.clear(ctx);
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
            });
        }
    }
    exports.VectorAnimation = VectorAnimation;
});
define("ts/vector/index", ["require", "exports", "ts/utils/index"], function (require, exports, index_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Vector = void 0;
    index_10 = __importStar(index_10);
    class Vector {
        constructor(option) {
            this.vx = 0;
            this.vy = 0;
            this.angle = 0;
            this.xStep = 0;
            this.yStep = 0;
            index_10.propertyInit(this, option);
            this.computeStep();
        }
        computeStep() {
            let rad = index_10.default.toRad(this.angle);
            this.xStep = this.vx * Math.cos(rad);
            this.yStep = this.vy * Math.sin(rad);
        }
    }
    exports.Vector = Vector;
});
define("ts/animation/flow", ["require", "exports", "ts/draw/index", "ts/animation/base"], function (require, exports, index_11, base_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FlowAnimation = void 0;
    class FlowAnimation extends base_4.BaseAnimation {
        constructor(option) {
            super(option);
            this.shaps = [];
            this.x = 0;
            this.y = 0;
            this.speed = 3;
            this.propertyInit(option);
        }
        move(ctx) {
            window.requestAnimationFrame(_ => {
                let { shaps, x, y, speed } = this;
                index_11.clear(ctx);
                for (let i = 0; i < shaps.length; i++) {
                    let s = shaps[i];
                    let sx = s.x, sy = s.y;
                    let dx = x - sx, dy = y - sy;
                    let angle = Math.atan2(dy, dx);
                    let xStep = speed * Math.cos(angle), yStep = speed * Math.sin(angle);
                    s.x = Math.abs(xStep) > Math.abs(dx) ? x : sx + xStep;
                    s.y = Math.abs(yStep) > Math.abs(dy) ? y : sy + yStep;
                    if (Math.abs(xStep) < Math.abs(dx)) {
                        s.rotation = angle;
                    }
                    s.render(ctx);
                }
                this.move(ctx);
            });
        }
    }
    exports.FlowAnimation = FlowAnimation;
});
define("ts/animation/gravity", ["require", "exports", "ts/animation/base", "ts/draw/index"], function (require, exports, base_5, index_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GravityAnimation = void 0;
    class GravityAnimation extends base_5.BaseAnimation {
        constructor(option) {
            super(option);
            this.gravity = 0.2;
            this.shaps = [];
            this.shapsStates = [];
            this.propertyInit(option);
            this.shapsStates = Array(this.shaps.length);
            for (let i = 0; i < this.shaps.length; i++) {
                this.shapsStates[i] = { vy: 0, isStop: false };
            }
        }
        move(ctx) {
            window.requestAnimationFrame(_ => {
                let { gravity, shaps, shapsStates } = this;
                index_12.clear(ctx);
                for (let i = 0; i < shaps.length; i++) {
                    let s = shaps[i];
                    let ss = shapsStates[i];
                    if (!ss.isStop) {
                        s.y += ss.vy;
                        ss.vy += gravity;
                        if (s.y + s.r >= index_12.H) {
                            s.y = index_12.H - s.r - 1;
                            ss.vy *= -0.8;
                            if (i == 0)
                                console.log(ss);
                            if (ss.vy < 0 && Math.abs(ss.vy) < 2) {
                                ss.vy = 0;
                                ss.isStop = true;
                            }
                        }
                    }
                    s.render(ctx);
                }
                this.move(ctx);
            });
        }
    }
    exports.GravityAnimation = GravityAnimation;
});
define("ts/animation/fountain", ["require", "exports", "ts/animation/base", "ts/draw/index", "ts/utils/index"], function (require, exports, base_6, index_13, index_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FountainAnimation = void 0;
    class FountainAnimation extends base_6.BaseAnimation {
        constructor(option) {
            super(option);
            this.gravity = 0.2;
            this.shaps = [];
            this.shapsStates = [];
            this.propertyInit(option);
            this.shapsStates = Array(this.shaps.length);
            for (let i = 0; i < this.shaps.length; i++) {
                this.shapsStates[i] = {
                    vx: Math.random() > 0.5 ? 5 * Math.random() : Math.random() * -5,
                    vy: 20 * Math.random() + 10,
                    isStop: false
                };
            }
            this.shaps.forEach(s => this.shapsInit(s));
        }
        move(ctx) {
            window.requestAnimationFrame(_ => {
                let { shaps, shapsStates } = this;
                index_13.clear(ctx);
                shaps.forEach((shap, i) => {
                    let ss = shapsStates[i];
                    if (index_14.isInBox(shap, index_13.W, index_13.H) && !ss.isStop) {
                        shap.y -= ss.vy;
                        shap.x += ss.vx;
                    }
                    else {
                        this.shapsInit(shap);
                        // ss.isStop = true;
                    }
                    shap.render(ctx);
                });
                this.move(ctx);
            });
        }
        shapsInit(shap) {
            shap.x = index_13.W / 2;
            shap.y = index_13.H + shap.r;
        }
    }
    exports.FountainAnimation = FountainAnimation;
});
define("ts/interactive/throw", ["require", "exports", "ts/draw/index", "ts/utils/index"], function (require, exports, index_15, index_16) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_16 = __importStar(index_16);
    class Throw {
        constructor(shaps, canvas) {
            this.shaps = [];
            this.shapsStates = [];
            this.bounce = 0.8;
            this.friction = 0.01;
            this.gravity = 0.1;
            this.isMouseDown = false;
            this.isStop = false;
            this.canvas = canvas;
            this.shaps = shaps.slice();
            this.shapsStates = shaps.map(s => {
                let ram = Math.random();
                let bx = 10;
                let by = 10;
                return {
                    vx: ram > 0.5 ? bx * ram : bx * ram * -1,
                    vy: ram > 0.5 ? by * ram : by * ram * -1,
                    gravity: this.gravity,
                    friction: this.friction,
                    bounce: this.bounce,
                    isSelected: false,
                };
            });
        }
        registerMouseEvent() {
            this.canvas.addEventListener('mousedown', this.handleMouseDown);
            this.canvas.addEventListener('mouseup', this.handleMouseUp);
            this.canvas.addEventListener('mousemove', this.handleMouseMove);
        }
        handleMouseDown(event) {
            let pos = index_16.default.getOffset(event);
            let hasSel = false;
            this.shaps.forEach((s, i) => {
                let { x, y, r } = s;
                let clickR = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
                if (clickR < r && !hasSel) {
                    this.mouseDownPos = { x: pos.x, y: pos.y };
                    this.isMouseDown = true;
                    this.shapsStates[i].isSelected = true;
                    hasSel = true;
                }
            });
        }
        handleMouseMove(event) {
            if (this.isMouseDown) {
                let pos = index_16.default.getOffset(event);
                let offset = [pos.x - this.mouseDownPos.x, pos.y - this.mouseDownPos.y];
                this.shapsStates.forEach((s, i) => {
                    if (s.isSelected) {
                        this.shaps[i].x += offset[0];
                        this.shaps[i].y += offset[1];
                    }
                });
            }
        }
        handleMouseUp(event) {
            let i = this.shapsStates.length;
            this.isMouseDown = false;
            while (--i >= 0) {
                if (this.shapsStates[i].isSelected) {
                    this.shapsStates[i].isSelected = false;
                    break;
                }
            }
        }
        move(ctx) {
            if (this.isStop)
                return;
            window.requestAnimationFrame(_ => {
                let { shaps, shapsStates } = this;
                index_15.clear(ctx);
                shaps.forEach((shap, i) => {
                    let ss = shapsStates[i];
                    let { isSelected, vx, vy, gravity, friction } = ss;
                    console.log("move", ss);
                    if (!isSelected) {
                        shap.x += vx;
                        shap.y += vy;
                        ss.vx += (vx > 0 ? -friction * 0.2 : friction * 0.2);
                        ss.vy += gravity;
                        ss.vy += (vy > 0 ? -friction : friction);
                        index_16.boxBounce(shap, ss, index_15.W, index_15.H);
                    }
                    shap.render(ctx);
                });
                this.move(ctx);
            });
        }
    }
    exports.default = Throw;
});
define("ts/index", ["require", "exports", "ts/draw/index", "ts/shap/arrow", "ts/shap/ball", "ts/interactive/throw"], function (require, exports, draw, arrow_1, ball_1, throw_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    draw = __importStar(draw);
    arrow_1 = __importDefault(arrow_1);
    throw_1 = __importDefault(throw_1);
    function init(e) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let arrow = new arrow_1.default({ x: draw.W / 2, y: draw.H / 6 });
        let balls = new Array(120);
        for (let i = 0; i < balls.length; i++) {
            balls[i] = new ball_1.Ball({ x: draw.W * Math.random(), y: draw.H * Math.random(), r: 30 });
        }
        let throwIns = new throw_1.default([balls[0]], canvas);
        // let slide = new Slide([ball]);
        // let circle = new Circle([ball, arrow]);
        // let oval = new Oval([ball, arrow]);
        // let vec = new VectorAnimation({
        //   shaps: [ball],
        //   vectors: [new Vector({
        //     vx: 0.5,
        //     vy: 0.5,
        //     angle: 1
        //   })]
        // })
        // let flow = new FlowAnimation({ shaps: [arrow] });
        // let gravity = new GravityAnimation({ shaps:balls });
        // let foutain = new FountainAnimation({shaps:balls});
        // canvas?.addEventListener("mousemove", function (e) {
        //   let pos = utils.getOffset(e);
        //   let dx = pos.x - draw.W / 2;
        //   let dy = pos.y - draw.H / 2;
        //   let rad = Math.atan2(dy, dx)
        //   let angle = Math.atan(dy / dx) * 180 / Math.PI;
        //   let angle2 = Math.atan2(dy, dx) * 180 / Math.PI;
        //   let res = `x: ${dx} , y: ${dy}`
        //   let res2 = `angle : ${angle} `
        //   let res3 = `angle2 : ${angle2}`
        //   draw.clear(ctx);
        //   ctx.fillText(rad + `   dx:${dx}, dy:${dy}`, pos.x + 10, pos.y);
        //   ctx.fillText(res2, pos.x + 10, pos.y + 20);
        //   ctx.fillText(res3, pos.x + 10, pos.y + 40);
        //   flow.x = pos.x;
        //   flow.y = pos.y;
        //   draw.drawSystem(ctx);
        // })
        // canvas.addEventListener("click", e => {
        //   draw.clear(ctx);
        // })
        draw.initDraw(canvas);
        // slide.move(ctx);
        // circle.move(ctx);
        // oval.move(ctx);
        // vec.move(ctx);
        // flow.move(ctx);
        // gravity.move(ctx);
        // foutain.move(ctx);
        throwIns.move(ctx);
    }
    exports.default = init;
});
define("ts/base/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PropertyBase = void 0;
    class PropertyBase {
    }
    exports.PropertyBase = PropertyBase;
});
