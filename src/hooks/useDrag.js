/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-27 20:24:59 
 * @Desc: 鼠标拖动hook 
 */
const useDrag = (downCallback, moveCallback, upCallback) => {
    let isMouseDown = false
    let startPos = {
        x: 0,
        y: 0
    }
    // 鼠标按下
    const onMousedown = (e) => {
        e.preventDefault()
        isMouseDown = true
        startPos.x = e.clientX
        startPos.y = e.clientY
        downCallback && downCallback(e)
    }
    // 鼠标移动
    const onMousemove = (e) => {
        e.preventDefault()
        if (!isMouseDown) {
            return
        }
        let ox = e.clientX - startPos.x
        let oy = e.clientY - startPos.y
        moveCallback && moveCallback(ox, oy, e)
    }
    // 鼠标松开
    const onMouseup = (e) => {
        isMouseDown = false
        upCallback && upCallback(e)
    }
    window.addEventListener('mousemove', onMousemove)
    window.addEventListener('mouseup', onMouseup)
    // 解绑事件
    const off = () => {
        window.removeEventListener('mousemove', onMousemove)
        window.removeEventListener('mouseup', onMouseup)
    }
    return {
        onMousedown,
        off
    }
}

export default useDrag