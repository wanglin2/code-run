/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-29 15:50:26 
 * @Desc: 尺寸拖动调整类 
 */
class Resize {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-29 15:50:41 
     * @Desc: 构造函数 
     */
    constructor() {
        // 拖动方向
        this._dir = ''
        // 属性
        this._prop = ''
        // 容器的宽度/高度
        this._containerSize = 0
        // 编辑器列表
        this._dragItemList = []
        // 鼠标上一次的位置
        this._last = 0
        // 缓存
        this._minSizeCache = {}
        this._maxSizeCache = {}

        this.init = this.init.bind(this)
        this.onDrag = this.onDrag.bind(this)
        this.onDragStart = this.onDragStart.bind(this)
    }

    /**
     * @Author: 王林25
     * @Date: 2021-04-28 14:47:12
     * @Desc: 初始化
     */
    init({
        dir, // 拖动方向：v（垂直）、h（水平）
        dragItemList, // 拖动列表，ref数组，[{width,height,...}]
        containerSize // 容器的宽度或高度
    }) {
        this._dir = dir
        this._dragItemList = dragItemList
        this._containerSize = containerSize
        this._prop = this._dir === 'v' ? 'height' : 'width'
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-29 14:39:33 
     * @Desc: 获取某个区域允许的最小尺寸 
     */
    getMinSize(index) {
        if (this._minSizeCache[index] !== undefined) {
            return this._minSizeCache[index]
        }
        return this._minSizeCache[index] = ((this._dragItemList.value[index].min ? this._dragItemList.value[index].min : 0) / this._containerSize) * 100
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-29 14:48:32 
     * @Desc: 获取某个区域允许的最大尺寸 
     */
    getMaxSize(index) {
        if (this._maxSizeCache[index] !== undefined) {
            return this._maxSizeCache[index]
        }
        let minSum = this._dragItemList.value.reduce((sum, cur, i) => {
            return sum += index === i ? 0 : (cur.min || 0)
        }, 0)
        return this._maxSizeCache[index] = ((this._dragItemList.value[index].max ? this._dragItemList.value[index].max : (this._containerSize - minSum)) / this._containerSize) * 100
    }

    /**
     * @Author: 王林25
     * @Date: 2021-04-28 14:47:09
     * @Desc: 获取第一个可以调整的元素索引
     */
    getFirstNarrowItemIndex(dir, index) {
        if (dir === 'leftUp') {
            let narrowItemIndex = index - 1
            while (narrowItemIndex >= 0) {
                let _minSize = this.getMinSize(narrowItemIndex)
                if (this._dragItemList.value[narrowItemIndex][this._prop] > _minSize) {
                    break
                }
                narrowItemIndex--
            }
            return narrowItemIndex
        } else if (dir === 'rightDown') {
            let narrowItemIndex = index
            while (narrowItemIndex <= this._dragItemList.value.length - 1) {
                let _minSize = this.getMinSize(narrowItemIndex)
                if (this._dragItemList.value[narrowItemIndex][this._prop] > _minSize) {
                    break
                }
                narrowItemIndex++
            }
            return narrowItemIndex
        }
    }

    /**
     * @Author: 王林25
     * @Date: 2021-04-28 14:47:03
     * @Desc: 判断是否允许拖动
     */
    isCanDrag(dir, index) {
        // 自身的区域是否还允许调整
        // if (dir === 'leftUp') {
        //     if (this._dragItemList.value[index][this._prop] >= this.getMaxSize(index)) {
        //         return false
        //     }
        // } else if (dir === 'rightDown') {
        //     if (this._dragItemList.value[index][this._prop] <= this.getMinSize(index)) {
        //         return false
        //     }
        // }
        // 其他部分已经没有可压缩的空间
        let narrowItemIndex = this.getFirstNarrowItemIndex(dir, index)
        if (
            narrowItemIndex < 0 ||
            narrowItemIndex > this._dragItemList.value.length - 1
        ) {
            return false
        }
        return true
    }

    /**
     * @Author: 王林25
     * @Date: 2021-04-28 14:46:55
     * @Desc: 拖动开始
     */
    onDragStart(e) {
        this._last = this._dir === 'v' ? e.clientY : e.clientX
    }

    /**
     * @Author: 王林25
     * @Date: 2021-04-28 14:47:17
     * @Desc: 拖动
     */
    onDrag(index, ox, oy, e) {
        let client = this._dir === 'v' ? e.clientY : e.clientX
        // 本次移动的距离
        let dx = client - this._last
        // 换算成百分比
        let rx = (dx / this._containerSize) * 100
        // 更新上一次的鼠标位置
        this._last = client
        if (dx < 0) {
            // 向左/上拖动
            if (!this.isCanDrag('leftUp', index)) {
                return
            }
            // 拖动中的编辑器增加宽度
            if (this._dragItemList.value[index][this._prop] - rx < this.getMaxSize(index)) {
                this._dragItemList.value[index][this._prop] -= rx
            } else {
                this._dragItemList.value[index][this._prop] = this.getMaxSize(index)
            }
            // 找到左边第一个还有空间的编辑器索引
            let narrowItemIndex = this.getFirstNarrowItemIndex('leftUp', index)
            let _minSize = this.getMinSize(narrowItemIndex)
            // 左边的编辑器要同比减少宽度
            if (narrowItemIndex >= 0) {
                // 加上本次偏移还大于最小宽度
                if (this._dragItemList.value[narrowItemIndex][this._prop] + rx > _minSize) {
                    this._dragItemList.value[narrowItemIndex][this._prop] += rx
                } else {
                    // 否则固定为最小宽度
                    this._dragItemList.value[narrowItemIndex][this._prop] = _minSize
                }
            }
        } else if (dx > 0) {
            // 向右/下拖动
            if (!this.isCanDrag('rightDown', index)) {
                return
            }
            // 找到拖动中的编辑器及其右边的编辑器中的第一个还有空间的编辑器索引
            let narrowItemIndex = this.getFirstNarrowItemIndex('rightDown', index)
            let _minSize = this.getMinSize(narrowItemIndex)
            if (narrowItemIndex <= this._dragItemList.value.length - 1) {
                let ax = 0
                // 减去本次偏移还大于最小宽度
                if (this._dragItemList.value[narrowItemIndex][this._prop] - rx > _minSize) {
                    ax = rx
                } else {
                    // 否则本次能移动的距离为到达最小宽度的距离
                    ax = this._dragItemList.value[narrowItemIndex][this._prop] - _minSize
                }
                // 更新拖动中的编辑器的宽度
                this._dragItemList.value[narrowItemIndex][this._prop] -= ax
                // 左边第一个编辑器要同比增加宽度
                if (index > 0) {
                    if (this._dragItemList.value[index - 1][this._prop] + ax < this.getMaxSize(index - 1)) {
                        this._dragItemList.value[index - 1][this._prop] += ax
                    } else {
                        this._dragItemList.value[index - 1][this._prop] = this.getMaxSize(index - 1)
                    }
                }
            }
        }
    }
}

export default Resize