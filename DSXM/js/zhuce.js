class Zhuce {
    constructor() {

        this.$('.reg-btn').addEventListener('click', this.getInfo.bind(this))
    }


    async getInfo() {
        // 获取input值
        let res = this.$('.i-text')
        // console.log(res);
        let arr = new Array();
        res.forEach(val => {
            // console.log(val.value);
            arr.push(val.value)

        })
        // console.log(arr)
        let [username, password, rpassword, nickname, phone] = [...arr];
        // console.log(username, password, rpassword, nickname, phone);
        // let username = arr[0]
        // password = arr[1]
        // rpassword = arr[2]
        // nickname = arr[3]
        let param = `username=${username}&password=${password}&rpassword=${rpassword}&nickname=${nickname}`
        // 发送请求
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        let{ data,status} = await axios.post('http://localhost:8888/users/register', param)
        // console.log(data,status);
        if(status == 200){
            if(data.code == 1){
                layer.open({
                    content: '注册成功',
                    btn: ['立即登录', '5秒之后自动跳转到登录']
                    , yes: function (index, layero) {
                        location.assign('./gwche.html')
                    }
                    , btn2: function (index, layero) {
                        //按钮【按钮二】的回调
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
            }
            console.log(data.code);
        }
    }









    // 获取节点
    $(dom) {
        let res = document.querySelectorAll(dom);
        return res.length == 1 ? res[0] : res

    }

}
new Zhuce