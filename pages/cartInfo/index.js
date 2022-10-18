import {request} from "../../request/index.js";
import {config} from "../../request/config.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultImageUrl:'../../imgs/default.png',
        cart:{},
        totalPrice:0,
        totalNum:0
    },
    
    /**
     * 监听函数
     */
    onShow: function () {
        this.getCartInfo();
    },

    /**
     * 获取购物车的商品列表
     */
    getCartInfo(){
        let user = wx.getStorageSync('user');
        if(!user){
            wx.navigateTo({
              url: '/pages/login/index?isTabBar=1&url=/pages/cartInfo/index'
            })
            return;
        }
        request({url:'/cartInfo?userId='+user.id}).then(res => {
            if(res.code === '0'){
                let cartList = res.data;
                let totalPrice = 0;
                let totalNum  = 0;
                cartList.forEach(item => {
                    totalNum += item.count;
                    totalPrice += item.count * item.price * item.discount;
                    let imgSrc = this.data.defaultImageUrl;
                    if(item.fields){
                        let fields = JSON.parse(item.fields)[0];
                        imgSrc = config.baseFileUrl + fields;
                    }
                    item.url = imgSrc;
                })
                this.setData({
                    cart:cartList,
                    totalNum:totalNum,
                    totalPrice:totalPrice.toFixed(2)
                })
            }
        })
    }
})