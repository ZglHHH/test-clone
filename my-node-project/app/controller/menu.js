'use strict';

const Controller = require('egg').Controller;
const menuList = require('../public/data/menuData');

class Menu extends Controller {
    async index() {
        const param = this.ctx.request.body;
        if(!param.shopId){
            this.ctx.body = '请求参数错误';
        }else if(param.shopId!=1){
            this.ctx.body = '参数id有误';
        }else if(param.shopId==1){
            const menu = menuList();
            this.ctx.body = menu;
        }

    }
}

module.exports = Menu;