var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ✅ Canvas Setting ✅
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 300;
// ✅ Main title ✅
var defImg = new Image();
defImg.src = './img/title.png';
defImg.addEventListener('load', function () {
    ctx.drawImage(defImg, 165, 0, 265, 250);
});
ctx.font = "20px sans-serif";
ctx.fillText("- Press start button to start -", 180, 275);
// ✅ Images ✅
var cloud1 = new Image();
var cloud2 = new Image();
var dinosaur1 = new Image();
var dinosaur2 = new Image();
var dinosaur3 = new Image();
var cactusImg = new Image();
var earth = new Image();
cloud1.src = './img/blackwhite/cloud1.png';
cloud2.src = './img/blackwhite/cloud2.png';
dinosaur1.src = './img/blackwhite/dino1.png';
dinosaur2.src = './img/blackwhite/dino2.png';
dinosaur3.src = './img/blackwhite/dinojump.png';
cactusImg.src = './img/cactus.png';
earth.src = './img/earth.png';
var dinosaurArr = [dinosaur1, dinosaur2, dinosaur3];
// ✅ Character and Materials ✅
var dino = {
    x: 50,
    y: 200,
    width: 30,
    height: 50,
    draw: function (num) {
        if (num === void 0) { num = 1; }
        ctx.drawImage(dinosaurArr[num], this.x - 8, this.y, 50, 50);
    }
};
var Materials = /** @class */ (function () {
    function Materials(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Materials;
}());
var Cactus = /** @class */ (function (_super) {
    __extends(Cactus, _super);
    function Cactus() {
        return _super.call(this, 600, 200, 20, 50) || this;
    }
    Cactus.prototype.draw = function () {
        ctx.drawImage(cactusImg, this.x - 4, this.y, 30, 50);
    };
    return Cactus;
}(Materials));
var Cloud1 = /** @class */ (function (_super) {
    __extends(Cloud1, _super);
    function Cloud1() {
        return _super.call(this, 600, 50, 50, 50) || this;
    }
    Cloud1.prototype.draw = function () {
        ctx.drawImage(cloud1, this.x, this.y, this.width, this.height);
    };
    return Cloud1;
}(Materials));
var Cloud2 = /** @class */ (function (_super) {
    __extends(Cloud2, _super);
    function Cloud2() {
        return _super.call(this, 600, 80, 50, 50) || this;
    }
    Cloud2.prototype.draw = function () {
        ctx.drawImage(cloud2, this.x, this.y, this.width, this.height);
    };
    return Cloud2;
}(Materials));
var Earth = /** @class */ (function (_super) {
    __extends(Earth, _super);
    function Earth() {
        return _super.call(this, 600, 235, 600, 20) || this;
    }
    Earth.prototype.draw = function () {
        ctx.drawImage(earth, this.x, this.y, this.width, this.height);
    };
    return Earth;
}(Materials));
// ✅ Variables ✅
var timer = 0;
var cactusArr = [];
var cloud1Arr = [];
var cloud2Arr = [];
var earthArr = [];
var jumpTimer = 0;
var animation;
var scoreCount = 0;
// ✅ Framework ✅
function frameWork() {
    animation = requestAnimationFrame(frameWork);
    timer++;
    if (timer % 10 == 0) {
        scoreCount++;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Score 
    ctx.font = "25px 'Michroma', sans-serif";
    ctx.fillText("Score : ".concat(scoreCount), 10, 30);
    // Background
    backgroundMotion(170, Cloud1, cloud1Arr, 2);
    backgroundMotion(250, Cloud2, cloud2Arr, 2);
    backgroundMotion(100, Earth, earthArr, 5);
    // Cactus
    var ranNum = Math.floor(Math.random() * 10);
    if (timer % 120 === 0 && timer != 120) {
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }
    else if (timer > 120 && timer % 60 == 0 && ranNum > 4) {
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }
    cactusArr.forEach(function (a, i, o) {
        if (a.x < 10) { // 40
            o.splice(i, 1);
        }
        a.x -= 5;
        collisionDetect(dino, a);
        a.draw();
    });
    // Jumping Dino
    if (jump == true) {
        dino.y -= 5;
        jumpTimer++;
    }
    if (jump == false) {
        if (dino.y < 200) {
            dino.y += 5;
        }
    }
    if (jumpTimer > 20) {
        jump = false;
        jumpTimer = 0;
    }
    // Running Dino
    if (timer % 16 < 8 && dino.y == 200) {
        dino.draw(0);
    }
    else if (timer % 16 >= 8 && dino.y == 200) {
        dino.draw(1);
    }
    else {
        dino.draw(2);
    }
}
// ✅ Functions ✅
// Button UI
var start = document.getElementById('startButton');
var retry = document.getElementById('retryButton');
if (start instanceof HTMLButtonElement) {
    start.addEventListener('click', function () {
        frameWork();
        this.disabled = true;
    });
}
if (retry instanceof HTMLButtonElement) {
    retry.addEventListener('click', function () {
        location.reload();
    });
}
// Collision detect
function collisionDetect(dino, cactus) {
    var xFrontMinus = cactus.x - (dino.x + dino.width);
    var xBackMinus = (cactus.x + cactus.width) - dino.x;
    var yMinus = cactus.y - (dino.y + dino.height);
    if (xFrontMinus < 0 && yMinus < 0 && xBackMinus > 0) {
        ctx.font = "25px 'Michroma', sans-serif";
        ctx.fillText("Game Over", 210, 283);
        cancelAnimationFrame(animation);
        if (retry instanceof HTMLButtonElement) {
            retry.disabled = false;
        }
    }
}
// Jumping by pressing space key
var jump = false;
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && dino.y == 200) {
        jump = true;
    }
});
// Background materials moving
function backgroundMotion(loop, objClass, objArr, speed) {
    if (timer % loop === 0) {
        var obj = new objClass;
        objArr.push(obj);
    }
    objArr.forEach(function (a, i, o) {
        if (a.x + a.width < 0) {
            o.splice(i, 1);
        }
        a.x -= speed;
        a.draw();
    });
}
