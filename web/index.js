const color_scale = chroma.scale(['yellow', 'lightgreen', '008ae5']);

window.onload = () => {
    let predictionDiv = document.getElementById('predictions')
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
        currY = e.clientY - canvas.offsetTop;
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
        currY = e.clientY - canvas.offsetTop;
    })

    canvas.addEventListener('mouseup', () => {
        drawFlag = false
    })

    canvas.addEventListener('mouseout', () => {
        drawFlag = false
    })

    clearBtn.onclick = () => {
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.width)
        scaleBars(Array(10).fill(0.1))
    }

    const draw = (ctx, fromX, fromY, toX, toY) => {
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

        let resp = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            body: form
        })
        let data = await resp.json()
        scaleBars(data)
    }

    const scaleBars = (nums) => {
        for(let i = 0; i < predictionDiv.children.length; i++){
            let col = predictionDiv.children[i].children[0]
            col.style.transform = `scaleY(${nums[i]})`
            col.style.backgroundColor = color_scale(nums[i])
        }
    }
}