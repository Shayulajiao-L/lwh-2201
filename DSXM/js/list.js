let user = 'http://localhost:8888';

class List {
    constructor() {
        // 构造方法上调用其他方法
        this.$('#nc').addEventListener('click', this.checklogin.bind(this))
        this.zhxinxi()
        // 获取数据
        this.getData()
        // 加入购物车方法
        this.$('.box_body').addEventListener('click', this.addCart.bind(this));
        // this.$('.sk_goods').addEventListener('click',this.setInfo.bind(this));

    }



    // 登录按钮 判断登录状态
    checklogin() {
        let key = localStorage.getItem('token');

        // 判断是否登录过或者登录过期,过期则跳转至登录界面
        if (!key) {
            location.assign('./login.html?ReturnUrl=./list.html');
        }

    }
    // 账户信息更新
    zhxinxi() {
        let nc = localStorage.getItem('user_nc')
        if (nc) {
            this.$('#nc').innerHTML = nc
        }
    }

    // 一 1从数据库获取数据,添加到页面中
    async getData() {

        let { data, status } = await axios.get('http://localhost:8888/goods/list?current=2&pagesize=20');
        let html = '';
        // console.log(data);
        if (status == 200) {
            // console.log(data);
            data.list.forEach(goods => {
                // console.log(goods.goods_id);
                html +=
                    `<div class="item fl">
                 
                    <li class="sk_goods" data-id="${goods.goods_id}">
				<div class="box_img"><a href="#"><img src="${goods.img_big_logo}" alt=""></a></div>
				<div class="title">
					<a href="#">${goods.title})</a>
				</div>
				<div class="price">${goods.current_price}</div>
				<div class="bottom">
					<a href="#none" class="btn"><i></i>加入购物车</a>
				</div>
			</div>`
            });
            this.$('.box_body').innerHTML = html;
        }
    }

    // 二 加入购物车绑定点击事件  封装成方法
    async addCart(ele) {
        // console.log(this);
        // console.log(ele.target);
        // 1 判断用户是否登录,如果不能获取token,则表示未登录,进行跳转到登录界面

        let key = localStorage.getItem('token')
        if (!key) {
            location.assign('./login.html?ReturnUrl=./list.html')
        }
        else {
            // 2 若token存在,则表示已经登录,将数据信息加入到购物车
            // 判断是否点击的是a标签
            // console.log(ele.target.classList.contains('btn'));
            if (ele.target.classList.contains('btn')) {
                // 获取到'加入购物车'标签,找到商品ID

                let liobj = ele.target.parentNode.parentNode;
                let goodsid = liobj.dataset.id
                console.log(goodsid);
                // 获取登录后的用户ID
                let userid = localStorage.getItem('user_id')
                console.log(userid);

                if (!goodsid || !userid) throw new Error('can not get userid or goodsid');
                //设置post请求,必须设置内容的类型,默认是json格式,server服务器无法处理
                axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
                // 拿到两个ID和token值发送axios 加入购物车请求
                axios.defaults.headers.common['authorization'] = key;
                // 传输的数据必须以key=value 传输
                let param = `goodsId=${goodsid}&id=${userid}`
                let { data, status } = await axios.post('http://localhost:8888/cart/add', param);
                console.log(data);

                // 3 添加请求成功
                if (status == 200) {
                    if (data.code == 1) {
                        layer.open({
                            content: '已成功加入购物车',
                            btn: ['前往购物车结算', '继续挑选商品']
                            , yes: function (index, layero) {
                                location.assign('./gwche.html')
                            }
                            , btn2: function (index, layero) {
                                //按钮【按钮二】的回调
                                //return false 开启该代码可禁止点击该按钮关闭
                            }
                        });
                    }
                }
            }
            console.log(ele.target.parentNode.parentNode.parentNode);
            // 点击商品然后跳转到详情页
            if(ele.target.classList!='btn'){
                let liobj = ele.target.parentNode.parentNode
                    let goodsid = liobj.dataset.id
                    console.log(goodsid)
                    location.assign('./xiangqing.html')
            }
          

        }



    }

    // 封装获取节点的方法,
    $(getDom) {
        let res = document.querySelectorAll(getDom)
        return res.length == 1 ? res[0] : res;
    }

}
new List
