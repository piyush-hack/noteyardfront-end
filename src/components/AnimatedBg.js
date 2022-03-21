import React, { useEffect } from 'react'
// import * as dat from 'dat.gui';

const AnimatedBg = () => {

    useEffect(() => {



        function Star(id, x, y) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = Math.floor(Math.random() * 2) + 1;
            var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
            this.color = "rgba(255,255,255," + alpha + ")";
        }

        Star.prototype.draw = function () {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.r * 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }

        Star.prototype.move = function () {
            this.y -= .15 + params.backgroundSpeed / 100;
            if (this.y <= -10) this.y = HEIGHT + 10;
            this.draw();
        }


        function Dot(id, x, y, r) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = Math.floor(Math.random() * 5) + 1;
            this.maxLinks = 2;
            this.speed = .5;
            this.a = .5;
            this.aReduction = .005;
            this.color = "rgba(255,255,255," + this.a + ")";
            this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

            this.dir = Math.floor(Math.random() * 140) + 200;
        }

        Dot.prototype.draw = function () {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.r * 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }

        Dot.prototype.link = function () {
            if (this.id === 0) return;
            var previousDot1 = getPreviousDot(this.id, 1);
            var previousDot2 = getPreviousDot(this.id, 2);
            var previousDot3 = getPreviousDot(this.id, 3);
            if (!previousDot1) return;
            ctx.strokeStyle = this.linkColor;
            ctx.moveTo(previousDot1.x, previousDot1.y);
            ctx.beginPath();
            ctx.lineTo(this.x, this.y);
            if (previousDot2 !== false) ctx.lineTo(previousDot2.x, previousDot2.y);
            if (previousDot3 !== false) ctx.lineTo(previousDot3.x, previousDot3.y);
            ctx.stroke();
            ctx.closePath();
        }

        function getPreviousDot(id, stepback) {
            if (id === 0 || id - stepback < 0) return false;
            if (typeof dots[id - stepback] !== "undefined") return dots[id - stepback];
            else return false;//getPreviousDot(id - stepback);
        }

        Dot.prototype.move = function () {
            this.a -= this.aReduction;
            if (this.a <= 0) {
                this.die();
                return
            }
            this.color = "rgba(255,255,255," + this.a + ")";
            this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
            this.x = this.x + Math.cos(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100);
            this.y = this.y + Math.sin(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100);

            this.draw();
            this.link();
        }

        Dot.prototype.die = function () {
            dots[this.id] = null;
            delete dots[this.id];
        }


        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            WIDTH,
            HEIGHT,
            mouseMoving = false,
            mouseMoveChecker,
            mouseX,
            mouseY,
            stars = [],
            initStarsPopulation = 80,
            dots = [],
            dotsMinDist = 2,
            params = {
                maxDistFromCursor: 50,
                dotsSpeed: 0,
                backgroundSpeed: 0
            };

        // var gui;
        // gui = new dat.GUI({ autoPlace: false });
        // gui.add(params, 'maxDistFromCursor').min(0).max(100).step(10).name('Size');
        // gui.add(params, 'dotsSpeed').min(0).max(100).step(.5).name('Speed');
        // gui.add(params, 'backgroundSpeed').min(0).max(150).step(1).name('Sky speed');
        // gui.close();
        // // Create GUI   

        // var customContainer = document.querySelector(".anbg").appendChild(gui.domElement);
        setCanvasSize();
        init();

        function setCanvasSize() {
            WIDTH = document.documentElement.clientWidth;
            HEIGHT = document.documentElement.clientHeight;

            canvas.setAttribute("width", WIDTH);
            canvas.setAttribute("height", HEIGHT);
        }

        function init() {
            ctx.strokeStyle = "white";
            ctx.shadowColor = "white";
            for (var i = 0; i < initStarsPopulation; i++) {
                stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));
                //stars[i].draw();
            }
            ctx.shadowBlur = 0;
            animate();
            document.querySelector(".anbg").appendChild(canvas)

        }

        function animate() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            for (var i in stars) {
                stars[i].move();
            }
            for (var j in dots) {
                dots[j].move();
            }
            drawIfMouseMoving();
            requestAnimationFrame(animate);
        }

        let winScroll = 0

        window.onscroll = function (e) {
            winScroll = window.scrollY; // Value of scroll Y in px
        };

        window.onmousemove = function (e) {
            mouseMoving = true;
            mouseX = e.clientX;
            mouseY = e.clientY - 100 + winScroll;
            clearInterval(mouseMoveChecker);
            mouseMoveChecker = setTimeout(function () {
                mouseMoving = false;
            }, 100);
        }


        function drawIfMouseMoving() {
            if (!mouseMoving) return;

            if (dots.length === 0) {
                dots[0] = new Dot(0, mouseX, mouseY);
                dots[0].draw();
                return;
            }

            var previousDot = getPreviousDot(dots.length, 1);
            var prevX = previousDot.x;
            var prevY = previousDot.y;

            var diffX = Math.abs(prevX - mouseX);
            var diffY = Math.abs(prevY - mouseY);

            if (diffX < dotsMinDist || diffY < dotsMinDist) return;

            var xVariation = Math.random() > .5 ? -1 : 1;
            xVariation = xVariation * Math.floor(Math.random() * params.maxDistFromCursor) + 1;
            var yVariation = Math.random() > .5 ? -1 : 1;
            yVariation = yVariation * Math.floor(Math.random() * params.maxDistFromCursor) + 1;
            dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
            dots[dots.length - 1].draw();
            dots[dots.length - 1].link();
        }
        //setInterval(drawIfMouseMoving, 17);

        function degToRad(deg) {
            return deg * (Math.PI / 180);
        }

        // const cursorRounded = document.querySelector('.rounded');
        const cursorPointed = document.querySelector('.pointed');




        const moveCursor = (e) => {
            const mouseY = e.clientY;
            const mouseX = e.clientX;

            // cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            cursorPointed.style.transform = `translate(${mouseX}px, ${mouseY - 100 + winScroll}px)`;

        }

        window.addEventListener('mousemove', moveCursor)
    }, [])

    return (
        <>
            <div className="anbg">
                {/* <div className="cursor rounded" /> */}
                <div className="cursor pointed" />
                <div className="bgfilter" />
                <canvas id="canvas" />
            </div>
        </>
    )
}

export default AnimatedBg