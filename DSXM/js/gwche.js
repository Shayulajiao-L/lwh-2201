class Gwche {
    constructor() {
        // 用户昵称加到头部
        this.zhxinxi()
        this.checklogin();
        this.getCart()
        this.bindeve()
    }
    bindeve() {
        // 绑定每条购物车信息绑定点击事件
        this.$('#gwche').addEventListener('click', this.give.bind(this))
        // 给全选按钮绑定事件
        this.$('#allC').addEventListener('click', this.checkAll.bind(this))
        // 给结算按钮绑定点击事件
        this.$('.order_btn').addEventListener('click', this.jiesuan.bind(this))
    }

    // 账户信息更新
    zhxinxi() {
        let nc = localStorage.getItem('user_nc')
        if (nc) {
            this.$('#nc').innerHTML = nc
        }
    }

    // 判断登录状态
    async checklogin() {
        let key = localStorage.getItem('token')
        // 判断是否登录过或者登录过期,过期则跳转至登录界面
        if (!key) {

            let userid = localStorage.getItem('user_id');
            axios.defaults.headers.common['authorization'] = key;
            let { data, status } = await axios.get('http://localhost:8888/cart/list?id=' + userid)
            // console.log(data);
            if (!key || !data.code == 401) {
                location.assign('./login.html?ReturnUrl=./gwche.html')
            }

        }
    }

    // 发送请求,获取购物车数据
    async getCart() {
        let key = localStorage.getItem('token');
        let userid = localStorage.getItem('user_id');
        axios.defaults.headers.common['authorization'] = key;
        let { data, status } = await axios.get('http://localhost:8888/cart/list?id=' + userid)
        // console.log(data);
        // 请求成功
        if (status == 200) {
            // 判断登录状态
            if (data.code == 401) { location.assign('./login.html?ReturnUrl=./cart.html') }
            if (data.code == 1) {
                let html = '';
                data.cart.forEach(xx => {
                    // console.log(xx.price);
                    html += `<div class="goodsfather"><div class="cart-shop-header">
                    <div class="cart-col-2"><span class="gouw_c_dianp">通城自营官方旗舰店 </span></div>
                    </div>
                    <div class="cart-shop-goods">
                    <div class="cart-shop-good " id="son" data-id="${xx.goods_id}">
                        <div class="cart-col-1" id="gxk">
                            <input type="checkbox" class="jdcheckbox" id="ckbox" >
                        </div>
                        <div class="cart-col-2 tupian"id="simg" style="height: 82px;">
                            <a href="" target="_blank" class="g-img " ><img src="${xx.img_small_logo}" alt=""></a>
                        </div>
                        <div class="fl houj_c " id="xinxi"> 
                            <div class="cart-dfsg"><div class="cart-good-name"><a href="#" target="_blank">${xx.title}</a></div></div>
                            <div class="cart-good-pro"></div>
                            <div class="cart-col-4"><div class="cart-good-real-price "><!--主品-->${+xx.price}</div><div class="red"></div></div>
                            <div class="cart-col-5">
                                <div class="gui-count cart-count" >
                                    <a href="#" gui-count-sub="" class="gui-count-btn gui-count-sub gui-count-disabled">-</a>
                                    <a href="#" gui-count-add="" class="gui-count-btn gui-count-add">+</a>
                                    <div class="gui-count-input"><input dytest="" class="shuliang" type="text" value="${xx.cart_number}"></div>
                                </div>
                            </div>
                            <div class="cart-col-6 ">
                            <div class="cart-good-amount" id="xiaoji">${(xx.cart_number * xx.price)}</div><!-- 重量展示(只展示全球百货的重量) --></div>
                        </div>
                        <div class="cart-col-7">
                            <div class="cart-good-fun delfixed">
                                <a href="#">删除</a>
                            </div>
                            <div class="cart-good-fun">
                                <a href="#">移入收藏夹</a>
                            </div>
                        </div>
                    </div>
                </div></div>`

                });
                // console.log(html);
                this.$('#gwche').innerHTML = html;
            }
        }

    }

    // 点击商品信息,获取事件源,判断按钮
    give(eve) {
        // 1寻找删除键
        // console.log(eve);
        let { target } = eve;
        // console.log(target.parentNode);
        let anniu = target.parentNode
        // console.log(anniu);
        //1 判断点击的是否为删除按钮
        // 是删除按钮调用删除的回调
        this.delete(anniu)


        // 判断勾选按钮是  单选按钮还是全选按钮
        // console.log(target.nodeName);
        if (target.nodeName == 'INPUT') {
            // 获取单选按钮的状态值,并传值
            // console.log(target.checked);
            this.getOneCheck(target.checked)
        }
    }


    // 全选按钮的回调方法
    checkAll(eve) {
        // console.log(eve.target.checked);
        // 获取全选按钮的状态值
        let checked = eve.target.checked
        // 调用单个选中并传值
        this.checkOne(checked)

        // 统计选中的商品的  数量和价格
        this.getNumPrice()
    }

    // 单选按钮的回调方法
    getOneCheck(xincan) {
        // console.log(xincan);
        //1 如果某个单选按钮的状态值为false, 取消全选按钮的选中 ,状态值为false
        if (!xincan) {
            this.$('#allC').checked = false;
            return
        }

        // 2如果所有的单选按钮都被选中,则将全选按钮的状态值设置为true
        if (xincan) {
            // console.log(this.$('.jdcheckbox'));
            // 遍历所有的单选按钮
            // 使用断言函数  配合array.from将 伪数组转化成数组
            let res = Array.from(this.$('#ckbox')).find(input => {
                // console.log(input.checked);
                return (!input.checked)
            })
            // 当所有的input框都被选中,res值为undefined
            // console.log(res);

            // 如果所有单选按钮都被选中,把全选按钮的状态值设置为true
            if (!res) this.$('#allC').checked = true;
        }
        this.getNumPrice()

    }

    // 选中单个商品
    checkOne(xincan) {
        let goodN = this.$('#gxk')
        // console.log(goodN, xincan);
        // 循环找到每条商品信息的input框,设置其状态值与全选按钮一致
        goodN.forEach(gxk => {
            // console.log(gxk);
            // let input = goodN.firstElementChild.checked = xincan
            // console.log(input);
            gxk.firstElementChild.checked = xincan
        })


    }

    // 购物车信息列表,获取选中的商品的价格和数量
    getNumPrice() {
        let goods = document.querySelectorAll('#son')
        // 找到整条商品信息并遍历出来
        // console.log(goods);
        let allNum = 0;
        let allPrice = 0;

        goods.forEach(div => {

            // console.log(div.firstElementChild.firstElementChild.checked);
            let tf = div.firstElementChild.firstElementChild.checked
            // 找到并判断该条商品是否被选中;被选中这获取其数量和小计
            if (tf) {
                // console.log(div.querySelector('.shuliang').value);
                allNum = div.querySelector('.shuliang').value - 0 + allNum

                // console.log(div.querySelector('#xiaoji').innerHTML);
                allPrice = div.querySelector('#xiaoji').innerHTML - 0 + allPrice
            }
        })
        // console.log(allNum, allPrice);
        this.$('#allnumber').innerHTML = allNum
        this.$('#allprice').innerHTML = '￥' + allPrice
    }


    // 给删除按钮绑定点击事件
    delete(anniu) {
        let that = this
        if (anniu.classList.contains('delfixed')) {
            // layer.confirm(content, options, yes, cancel)
            // 点击删除按钮弹出提示框
            let layerindex = layer.confirm('确认删除吗?', { title: '删除提示' }, function () {
                // 获取商品id和用户id

                let id = anniu.parentNode.parentNode.dataset.id
                let userid = localStorage.getItem('user_id')
                // console.log(id, userid);
                let param = `id=${userid}&goodsId=${id}`
                // 发送请求删除数据
                axios.get('http://localhost:8888/cart/remove?' + param).then(res => {
                    // console.log(res);
                    let { data, status } = res;
                    // 如果删除成功,
                    if (data.code == 1) {
                        // 关闭弹出框;
                        layer.close(layerindex);
                        // 删除该条购物信息
                        let good = anniu.parentNode.parentNode.parentNode.parentNode;
                        good.remove()
                        // 提示信息
                        layer.msg('删除成功')
                        that.getNumPrice()

                    }
                })
            })


        }
    }

    // 结算按钮的点击事件
    jiesuan() {
        let key = localStorage.getItem('token');
        if (key) {
            location.assign('./jiesuan.html?ReturnUrl=./list.html');
        }
    }


    $(getDom) {
        let res = document.querySelectorAll(getDom)
        return res.length == 1 ? res[0] : res
    }

}



new Gwche