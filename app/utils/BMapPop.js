/*
* @Author: qiaoxin
* @Date:   2019/1/3 15:37
* @Email: qiaoxinfc@gmail.com
* @File Name: BMapPop
* @Description:
*/
class BMapPop extends BMap.Overlay {
    /**
     * 实例化
     */
    constructor(params) {

        super();
        this.map = null;
        this.wrapper = null;
        this.params = params;

    }
    /**
     * 初始化图层, 在此描述 html 结构
     * @param  {Object} map 地图对象
     * @return {Object} DOM
     * @htmlStr {String} DOM string
     */
    initialize(map, htmlStr) {

        let wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'map-pop-container');
        wrapper.setAttribute('style', 'display: none');
        wrapper.innerHTML = htmlStr;

        // 将节点添加到地图图层中
        // - 在此之后可以找到对应的节点
        map.getPanes().markerPane.appendChild(wrapper);
        this.map = map;
        this.wrapper = wrapper;

        return wrapper;

    }

    /**
     * 绘制图层
     * @return {void} void
     */
    draw() {

        const {lng, lat} = this.params;
        const point = new BMap.Point(Number(lng), Number(lat));
        // 将经纬度转换为像素位置
        let position = this.map.pointToOverlayPixel(point);

        // 设置弹窗的位移
        this.wrapper.style.position = 'absolute';
        this.wrapper.style.left = `${position.x}px`;
        this.wrapper.style.top = `${position.y}px`;

    }

    /**
     * 显示图层
     * @return {void} void
     */
    show() {

        if(this.wrapper) {

            this.wrapper.style.display = '';

        }

    }

    /**
     * 隐藏图层
     * @return {void} void
     */
    hide() {

        if(this.wrapper) {

            this.wrapper.style.display = 'none';

        }

    }

    /**
     * 隐藏显示切换
     * @return {void}   void
     */
    toggle() {

        if(this.wrapper) {

            if(this.wrapper.style.display == '') {

                this.hide();

            } else {

                this.show();

            }

        }

    }
}

export default BMapPop;
