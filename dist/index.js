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
        console.log("clear");
    }
    exports.clear = clear;
});
define("ts/shap/base", ["require", "exports"], function (require, exports) {
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
            let keys = Object.keys(this);
            let key;
            for (key in option) {
                if (keys.indexOf(key) > -1) {
                    Object.defineProperty(this, key, {
                        value: option[key]
                    });
                }
            }
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
            this.propertyInit(option);
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
define("ts/animation/slide", ["require", "exports", "ts/utils/index", "ts/draw/index"], function (require, exports, index_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Slide = void 0;
    index_1 = __importDefault(index_1);
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
                index_2.clear(ctx);
                for (let i = 0; i < shaps.length; i++) {
                    let shap = shaps[i];
                    shap.x = Math.sin(index_1.default.toRad(angle)) * swing + this.start;
                    shap.render(ctx);
                }
                this.angle += 0.5;
                this.move(ctx);
            });
        }
    }
    exports.Slide = Slide;
});
define("ts/animation/circle", ["require", "exports", "ts/utils/index", "ts/draw/index"], function (require, exports, index_3, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Circle = void 0;
    index_3 = __importDefault(index_3);
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
                let rad = index_3.default.toRad(this.angle);
                index_4.clear(ctx);
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
define("ts/animation/oval", ["require", "exports", "ts/utils/index", "ts/draw/index"], function (require, exports, index_5, index_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Oval = void 0;
    index_5 = __importDefault(index_5);
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
                let rad = index_5.default.toRad(this.angle);
                index_6.clear(ctx);
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
define("ts/index", ["require", "exports", "ts/draw/index", "ts/shap/arrow", "ts/shap/ball", "ts/animation/circle", "ts/animation/oval"], function (require, exports, draw, arrow_1, ball_1, circle_1, oval_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    draw = __importStar(draw);
    arrow_1 = __importDefault(arrow_1);
    function init(e) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let arrow = new arrow_1.default({ x: draw.W / 2, y: draw.H / 6 });
        let ball = new ball_1.Ball({ x: draw.W / 2, y: draw.H / 2, r: 30 });
        // let slide = new Slide([ball]);
        let circle = new circle_1.Circle([ball, arrow]);
        let oval = new oval_1.Oval([ball, arrow]);
        // canvas?.addEventListener("mousemove",function(e){
        //   let pos = utils.getOffset(e);
        //   let dx = pos.x - draw.W /2;
        //   let dy = pos.y - draw.H /2;
        //   let rad = Math.atan2(dy,dx)
        //   let angle = Math.atan(dy/dx) * 180 / Math.PI;
        //   let angle2 = Math.atan2(dy,dx) * 180 / Math.PI;
        //   let res = `x: ${dx} , y: ${dy}`
        //   let res2 = `angle : ${angle} `
        //   let res3 = `angle2 : ${angle2}`
        //   draw.clear(ctx);
        //   // draw.drawSystem(ctx);
        //   // draw.drawLine(ctx,pos);
        //   arrow.rotation = rad;
        //   ball.render(ctx);
        //   // arrow.render(ctx);
        //   ctx.fillText(rad + '',pos.x + 10,pos.y);
        //   ctx.fillText(res2,pos.x + 10,pos.y + 20);
        //   ctx.fillText(res3,pos.x + 10,pos.y + 40);
        // })
        canvas.addEventListener("click", e => {
            draw.clear(ctx);
        });
        draw.initDraw(canvas);
        // slide.move(ctx);
        // circle.move(ctx);
        oval.move(ctx);
        console.log("canvas init");
    }
    exports.default = init;
});
