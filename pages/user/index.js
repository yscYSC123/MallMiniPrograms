import {request} from "../../request/index.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLogin:0,      //0未登录，1已登录
        userInfo:{},        //用户信息
        avatarUrl:'',       //头像
        account:0      //用户余额
    },

    /**
     * 微信接口，获取用户信息
     */
    getUserInfo: function(e) {
        var userInfo = e.detail.userInfo;
        wx.setStorageSync('avatarUrl', userInfo.avatarUrl);
        var data = {
            name:userInfo.nickName,
            code:userInfo.avatarUrl,
            nickName:userInfo.nickName,
            password:"0000",
            account:80000
        }

        request({url:"/register",data:data,method:"POST"}).then(res => {
            if(res.code === '0'){
                wx.showToast({
                  title: '登录成功',
                  mask: true
                })
                //获取后存储本地数据
                this.setData({
                    isLogin:1,
                    userInfo:res.data
                });
                //存到localStorage里
                wx.setStorageSync('user', res.data)
            }else{
                wx.showToast({
                  title: '登录失败',
                  mask: true
                })
            }
        })
    },

    /**
     * 监听页面显示
     */
    onShow:function() {
        let user = wx.getStorageSync('user');
        let avatarUrl = wx.getStorageSync('avatarUrl');
        if(user){
            this.setData({
                isLogin:1,
                userInfo:user,
                avatarUrl:avatarUrl
            })
        }
    }
})