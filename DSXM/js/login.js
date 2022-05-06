class Login {
    constructor() {
        // 调用一些方法

        // 登录按钮的点击事件的方法
        this.$('.btnnuw').addEventListener('click', this.djfn.bind(this))
    }
    // 登录按钮的点击事件
    djfn() {
       console.log(location.search);
        // console.log(this);
        let username = document.forms[0].elements.uname.value;
        let password = document.forms[0].elements.psd.value
        console.log(username, password);

        // 非空判断
        if (!username.trim() || !password.trim()) throw new Error('no value');

        // 获取值后发送post 请求

        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        let data=`username=${username}&password=${password}`
        axios.post('http://localhost:8888/users/login', data).then(res => {
            // console.log(res);
            let {data,status}=res;
            console.log(data,status);
            // let nc=data.user.nickname
            // console.log(nc);

        //    请求成功
            if(status==200){
                 // 登录成功,把服务器的的token和user-id存到浏览器中,并返回到商品页
                if(data.code==1){
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('user_id',data.user.id);
                    localStorage.setItem('user_nc',data.user.nickname);
                    // 跳转回去list界面
                    location.assign(location.search.split('=')[1])  //||location.assign('./list.html')

                }
                // 登录失败
                // else alert('登录失败')
                else {layer.open({
                    title: '登录失败'
                    ,content: '用户名或密码错误'
                  });}
            }
        })

    }

    // 封装获取节点的方法,
    $(getDom) {
        let res = document.querySelectorAll(getDom)
        return res.length == 1 ? res[0] : res;
    }

}
new Login