// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            },
                    timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };

    // Now the experiment
    var imperfect = new IrregularShapes();
    var canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width  = window.innerWidth - 20;
        canvas.height = window.innerHeight;

        render();
    }

    var settings = {
        noise_x: 2,
        noise_y: 2,
        chunk_size: 5
    };

    resizeCanvas();

    function render() {

        context.beginPath();

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = 'rgba(0,0,0,.6)';
        context.fillStyle   = 'rgba(0,0,0,1)';
        context.lineWidth   = 1;


        imperfect.setContext(context);

        imperfect.setNoise(settings.noise_x, settings.noise_y);

        imperfect.setChunkSize(settings.chunk_size);

        // straight line
//        imperfect.drawLine(20, 0, 40, canvas.height - 20);

        // rectangles
        context.beginPath();
        context.fillStyle = 'rgba('+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', .1)';
        // big one
        imperfect.drawRect(10, 20, canvas.width / 3, canvas.height / 2);
        context.fill();
        
        // little ones
        for(var i=1; i<7; i++) {
            context.beginPath();
            context.fillStyle = 'rgba('+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', .4)';
            context.lineWidth = 1;
            imperfect.drawRect(20, 10+(i*50), canvas.width/3-20, 40);
            context.fill();
            context.closePath();
        }
        
        context.closePath();

        // circle
        context.beginPath();
        context.fillStyle = 'rgba('+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', .4)';
        imperfect.drawArc(10+canvas.width*.7, canvas.height/3, canvas.width/6, 0, Math.PI*2);
        context.fill();
        context.fillStyle = 'rgba('+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', .4)';
        imperfect.drawStar(10+canvas.width*.7, canvas.height/3, 9, canvas.width * .15, canvas.width * .14);
        context.fill();
        context.fillStyle = 'rgba('+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', .4)';
        imperfect.drawStar(10+canvas.width*.7, canvas.height/3, 5, canvas.width * .08, canvas.width * .04);
        context.fill();
        context.closePath();

        // some polygons
//        imperfect.drawPoly(canvas.width * .5, canvas.height * .3, 5, 100);
//        imperfect.drawPoly(canvas.width * .5, canvas.height * .8, 8, 100);
//        imperfect.drawPoly(canvas.width * .8, canvas.height * .8, 3, 100);
//
        context.beginPath();
        context.strokeStyle = '#999';
        context.lineWidth = 1;
        imperfect.drawBezierCurve(10, canvas.height*0.7, canvas.width * 0.3, canvas.height*0.7, canvas.width * 0.3, canvas.height*.7, canvas.width * 0.9, canvas.height*0.7);
        imperfect.drawBezierCurve(10, canvas.height*0.7, canvas.width * 0.3, canvas.height*0.7, canvas.width * 0.4, canvas.height*.8, canvas.width * 0.9, canvas.height*0.7);
        imperfect.drawBezierCurve(10, canvas.height*0.7, canvas.width * 0.3, canvas.height*0.7, canvas.width * 0.5, canvas.height*.9, canvas.width * 0.9, canvas.height*0.7);
        imperfect.drawBezierCurve(10, canvas.height*0.7, canvas.width * 0.3, canvas.height*0.7, canvas.width * 0.6, canvas.height, canvas.width * 0.9, canvas.height*0.7);
        context.stroke();
        context.closePath();
        
//
//        imperfect.drawQuadraticCurve(canvas.width * .6, canvas.height * .9, canvas.width * .6, canvas.height * .6, canvas.width * .7, canvas.height * .5);

        context.closePath();
    }
}());