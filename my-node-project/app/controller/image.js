'use strict';
const sendToWormhole = require('stream-wormhole');

const Controller = require('egg').Controller;

class Image extends Controller {
    async index() {
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();
        console.log(stream)
        let url;
        try{
            url = await ctx.service.image.getPicture(stream);
        }catch (e) {
            ctx.body = url;
            await sendToWormhole(stream);
            throw e;
        }

        ctx.body = {
            url: url,
            // 所有表单字段都能通过 `stream.fields` 获取到
            fields: stream.fields,
        };

    }
}

module.exports = Image;