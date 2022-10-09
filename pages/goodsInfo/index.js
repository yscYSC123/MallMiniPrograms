import {request} from "../../request/index.js";
import {config} from "../../request/config.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        goodsId:0,      //商品主键id
        obj:{},     //当前商品
        swiperList:[]      //当前商品的图片数组
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function(options) {
        const id = options.id;
        this.setData({
            goodsId:id
        })
        //获取当前商品
        this.getDetail(id);
    },

    /**
     * 获取当前商品
     */
    getDetail(id){
        request({url:'/goodsInfo/'+id}).then(res => {
            if(res.code === '0'){
                let obj = res.data;
                let swiperList = [];
                if(obj.fields){
                    let list = JSON.parse(obj.fields);
                    list.forEach(item => {
                        let imgObj = {};
                        imgObj.fields = item;
                        imgObj.imgSrc = config.baseFileUrl+item;
                        swiperList.push(imgObj);
                    })
                }
                if(swiperList.length === 0){
                    swiperList.push({imgSrc:"../../imgs/default.png"});
                    swiperList.push({imgSrc:"../../imgs/default.png"});
                }
                this.setData({
                    obj,
                    swiperList
                })
            }else{
                wx.showToast({
                  title: res.msg,
                  icon:'none'
                })
            }
        })
    }
})