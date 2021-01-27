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
        getOffset: function (event) {
            return this.eventWraper(event);
        },
        eventWraper: function (event) {
            var pageX = event.pageX, pageY = event.pageY, target = event.target;
            var _a = target.getBoundingClientRect(), left = _a.left, top = _a.top;
            return { x: pageX - left, y: pageY - top };
        },
        toRad: function (angle) {
            return angle * Math.PI / 180;
        },
        toAng: function (rand) {
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
define("ts/index", ["require", "exports", "ts/utils/index", "ts/draw/index"], function (require, exports, index_1, draw) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1 = __importDefault(index_1);
    draw = __importStar(draw);
    function init(e) {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("mousemove", function (e) {
            var pos = index_1.default.getOffset(e);
            var dx = pos.x - draw.W / 2;
            var dy = pos.y - draw.H / 2;
            var angle = Math.atan(dy / dx) * 180 / Math.PI;
            var angle2 = Math.atan2(dy, dx) * 180 / Math.PI;
            var res = "x: " + dx + " , y: " + dy;
            var res2 = "angle : " + angle + " ";
            var res3 = "angle2 : " + angle2;
            draw.clear(ctx);
            draw.drawSystem(ctx);
            draw.drawLine(ctx, pos);
            ctx.fillText(res, pos.x + 10, pos.y);
            ctx.fillText(res2, pos.x + 10, pos.y + 20);
            ctx.fillText(res3, pos.x + 10, pos.y + 40);
        });
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("click", function (e) {
            var pos = index_1.default.getOffset(e);
            var dx = pos.x - draw.W / 2;
            var dy = pos.y - draw.H / 2;
            var angle = Math.atan(dy / dx) * 180 / Math.PI;
            var angle2 = Math.atan2(dy, dx) * 180 / Math.PI;
            console.log(dx, dy);
            console.log("angle", angle);
            console.log("angle2", angle2);
        });
        draw.initDraw(canvas);
        console.log("canvas init");
    }
    exports.default = init;
});
