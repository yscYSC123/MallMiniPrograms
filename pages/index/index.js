import {request} from "../../request/index.js";
import {config} from "../../request/config.js";
Page({
    data:{
        defaultImageUrl:'../../imgs/default.png',
        goodsInfoCarouselList:[],    //轮播图列表
        goodsInfoRecommendList:[],     //推荐商品列表
        goodsInfoHotList:[],        //热卖商品列表
    },
    onLoad: function(){
        this.getGoodsInfoCarouselList();
        this.goodsInfoRecommendList();
        this.goodsInfoHotList();
    },

    //获取轮播图
    getGoodsInfoCarouselList(){
        request({url: '/goodsInfo/page/all?pageNum=1&pageSize=6'}).then(res => {
            if(res.code === '0'){
                let goodsInfoCarouselList = res.data.list;
                if(!goodsInfoCarouselList || goodsInfoCarouselList.length === 0){
                    goodsInfoCarouselList.push({"name":"名称1","url":this.data.defaultImageUrl});
                    goodsInfoCarouselList.push({"name":"名称2","url":this.data.defaultImageUrl});
                    goodsInfoCarouselList.push({"name":"名称3","url":this.data.defaultImageUrl});
                }else{
                    if(goodsInfoCarouselList.length>6){
                        goodsInfoCarouselList = goodsInfoCarouselList.slice(0,6);
                    }
                    goodsInfoCarouselList.forEach(item => {
                        if(!item.fields||item.fields==='[]'){
                            item.url = this.data.defaultImageUrl;
                        }else{
                            let fileArr = JSON.parse(item.fields);
                            item.url = config.baseFileUrl+fileArr[0];
                        }
                    });
                }
                this.setData({
                    goodsInfoCarouselList
                })
            }else{
                wx.showToast({
                  title: res.msg,
                  icon:'none'
                })
            }
        })
    },

    //获取推荐商品
    goodsInfoRecommendList(){
        request({url: '/goodsInfo/findRecommendGoods'}).then(res => {
            if(res.code === '0'){
                let goodsInfoRecommendList = res.data.list;
                if(!goodsInfoRecommendList || goodsInfoRecommendList.length === 0){
                    goodsInfoRecommendList.push({"name":"名称1","url":this.data.defaultImageUrl});
                    goodsInfoRecommendList.push({"name":"名称2","url":this.data.defaultImageUrl});
                    goodsInfoRecommendList.push({"name":"名称3","url":this.data.defaultImageUrl});
                }else{
                    if(goodsInfoRecommendList.length>6){
                        goodsInfoRecommendList = goodsInfoRecommendList.slice(0,6);
                    }
                    goodsInfoRecommendList.forEach(item => {
                        if(!item.fields||item.fields==='[]'){
                            item.url = this.data.defaultImageUrl;
                        }else{
                            let fileArr = JSON.parse(item.fields);
                            item.url = config.baseFileUrl+fileArr[0];
                        }
                    });
                }
                this.setData({
                    goodsInfoRecommendList
                })
            }else{
                wx.showToast({
                  title: res.msg,
                  icon:'none'
                })
            }
        })
    },

    //获取热卖商品
    goodsInfoHotList(){
        request({url: '/goodsInfo/findHotSalesGoods'}).then(res => {
            if(res.code === '0'){
                let goodsInfoHotList = res.data.list;
                if(!goodsInfoHotList || goodsInfoHotList.length === 0){
                    goodsInfoHotList.push({"name":"名称1","url":this.data.defaultImageUrl});
                    goodsInfoHotList.push({"name":"名称2","url":this.data.defaultImageUrl});
                    goodsInfoHotList.push({"name":"名称3","url":this.data.defaultImageUrl});
                }else{
                    if(goodsInfoHotList.length>6){
                        goodsInfoHotList = goodsInfoHotList.slice(0,6);
                    }
                    goodsInfoHotList.forEach(item => {
                        if(!item.fields||item.fields==='[]'){
                            item.url = this.data.defaultImageUrl;
                        }else{
                            let fileArr = JSON.parse(item.fields);
                            item.url = config.baseFileUrl+fileArr[0];
                        }
                    });
                }
                this.setData({
                    goodsInfoHotList
                })
            }else{
                wx.showToast({
                  title: res.msg,
                  icon:'none'
                })
            }
        })
    }
});
