class Index {
  constructor() {
    // 登录按钮绑定点击事件
    this.$('#nc').addEventListener('click', this.checklogin.bind(this))
    this.zhxinxi()
  }

  // 登录按钮的点击事件
  checklogin() {
    // 判断登录状态
    let key = localStorage.getItem('token')
    if (!key) {
      location.assign('./login.html?ReturnUrl=./index.html')
    }
  }

  // 账户信息更新
  zhxinxi() {
    let nc = localStorage.getItem('user_nc')
    if (nc) {
      this.$('#nc').innerHTML = nc
    }
  }

  // 获取节点
  $(dom){
    let res=document.querySelectorAll(dom);
    return res.length==1? res[0]:res
  }
}
new Index


// 轮播图
let mySwiper = new Swiper('.swiper', {
  // direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项

  // autoplay:true, //自动播放
  autoplay: {
    delay: 2000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },

  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // 如果需要滚动条
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})        