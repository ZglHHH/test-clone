'use strict';

const Controller = require('egg').Controller;
const shopList = require('../public/data/shopData');


class Shop extends Controller {
    async index() {
        try{
            const shop = shopList();
            this.ctx.body = shop;
        }catch(e){
            console.log(e);
            this.ctx.body = '请求异常';
        }
    }
}

module.exports = Shop;