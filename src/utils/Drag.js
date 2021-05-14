/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-27 20:24:59 
 * @Desc: 鼠标拖动
 */
class Drag {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-05-13 18:40:16 
     * @Desc: 构造函数 
     */
    constructor(downCallback, moveCallback, upCallback) {
        this.isMouseDown = false
        this.startPos = {
            x: 0,
            y: 0
        }
        this.downCallback = downCallback || function () {}
        this.moveCallback = moveCallback || function () {}
        this.upCallback = upCallback || function () {}
        this.bind()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-05-13 18:49:51 
     * @Desc: 绑定事件 
     */
    bind() {
        this.onMousedown = this.onMousedown.bind(this)
        this.onMousemove = this.onMousemove.bind(this)
        this.onMouseup = this.onMouseup.bind(this)
        window.addEventListener('mousemove', this.onMousemove)
        window.addEventListener('mouseup', this.onMouseup)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-05-13 18:41:19 
     * @Desc: 解绑事件 
     */
    off() {
        window.removeEventListener('mousemove', this.onMousemove)
        window.removeEventListener('mouseup', this.onMouseup)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-05-13 18:40:47 
     * @Desc: 鼠标按下 
     */
    onMousedown(e) {
        e.preventDefault()
        this.isMouseDown = true
        this.startPos.x = e.clientX
        this.startPos.y = e.clientY
        this.downCallback && this.downCallback(e)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-05-13 18:40:55 
     * @Desc: 鼠标移动 
     */
    onMousemove(e) {
        e.preventDefault()
        if (!this.isMouseDown) {
            return
        }
        let ox = e.clientX - this.startPos.x
        let oy = e.clientY - this.startPos.y
        this.moveCallback && this.moveCallback(ox, oy, e)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-05-13 18:41:04 
     * @Desc: 鼠标松开 
     */
    onMouseup(e) {
        this.isMouseDown = false
        this.upCallback && this.upCallback(e)
    }
}

export default Drag