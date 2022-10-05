import {request} from "../../request/index.js";
import {config} from "../../request/config.js";
Page({
    data:{
        defaultImageUrl:'../../imgs/default.png',
        goodsInfoCarouselList:[]    //轮播图列表
    },
    onLoad: function(){
        this.getGoodsInfoCarouselList();
    },

    //获取轮播图
    getGoodsInfoCarouselList(){
        request({url: '/goodsInfo/page/all?pageNum=1&pageSize=3'}).then(res => {
            if(res.code === '0'){
                let goodsInfoCarouselList = res.data.list;
                if(!goodsInfoCarouselList || goodsInfoCarouselList.length === 0){
                    goodsInfoCarouselList.push({"name":"名称1","url":this.data.defaultImageUrl});
                    goodsInfoCarouselList.push({"name":"名称2","url":this.data.defaultImageUrl});
                    goodsInfoCarouselList.push({"name":"名称3","url":this.data.defaultImageUrl});
                }else{
                    if(goodsInfoCarouselList.length>4){
                        goodsInfoCarouselList = goodsInfoCarouselList.slice(0,4);
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
    }
});
