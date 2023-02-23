const color_scale = chroma.scale(['yellow', 'lightgreen', '008ae5']);

window.onload = () => {
    let predictionDiv = document.getElementById('prediction-bars')
    let clearBtn = document.getElementById('clearBtn')

    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d', { willReadFrequently: true })

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.width)

    let drawFlag = false;
    let prevX = 0, prevY = 0, currX = 0, currY = 0;

    canvas.addEventListener('mousemove', (e) => {
        if (!drawFlag) return;
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop + scrollY;
        draw(ctx,
            prevX,
            prevY,
            currX,
            currY
        );
    })

    canvas.addEventListener('mousedown', (e) => {
        drawFlag = true
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop + scrollY;
    })

    canvas.addEventListener('mouseup', () => {
        drawFlag = false
    })

    canvas.addEventListener('mouseout', () => {
        drawFlag = false
    })

    // All touch functionality below comes from following
    // https://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html

    // Set up touch events for mobile, etc
    canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchend", function (e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);

    // Get the position of a touch relative to the canvas
    function getTouchPos(canvasDom, touchEvent) {
        //var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX,// - canvas.offsetLeft,
            y: touchEvent.touches[0].clientY// - canvas.offsetTop
        };
    }

    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function (e) {
        if (e.target === canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchend", function (e) {
        if (e.target === canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchmove", function (e) {
        if (e.target === canvas) {
            e.preventDefault();
        }
    }, false);

    clearBtn.onclick = () => {
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.width)
        scaleBars(Array(10).fill(0.1))
    }

    const draw = (ctx, fromX, fromY, toX, toY) => {
        console.log(fromX, fromY, toX, toY);
        
        let scale = ctx.canvas.clientHeight / ctx.canvas.height
        ctx.beginPath();
        ctx.moveTo(fromX / scale, fromY / scale);
        ctx.lineTo(toX / scale, toY / scale);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();

        predict()
    }

    const generateBlob = async () => {
        return await new Promise(res => canvas.toBlob(res))
    }

    let allowPredict = true
    const predict = async () => {
        if (!allowPredict) return;
        allowPredict = false
        setTimeout(() => {
            allowPredict = true
        }, 150);

        let blob = await generateBlob()
        let form = new FormData()
        form.append("image", blob)

        let resp = await fetch('https://draw.intrntsr.fr/api/predict', {
            method: 'POST',
            body: form
        })
        let data = await resp.json()
        scaleBars(data)
    }

    const scaleBars = (nums) => {
        for (let i = 0; i < predictionDiv.children.length; i++) {
            let col = predictionDiv.children[i].children[0]
            col.style.transform = `scaleY(${nums[i]})`
            col.style.backgroundColor = color_scale(nums[i])
        }
    }
}