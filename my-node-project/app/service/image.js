const fs = require('fs');
const path = require('path');
const Service = require('egg').Service;

class UserService extends Service {

    async getPicture(stream) {
        const filePath = '/image';
        const fileName = `${new Date().getTime()}.${stream.mimeType.split('/')[1]}`;
        const detailPath = await path.join(`${this.config.static.dir}${filePath}`,`${fileName}`);
        const ws = await fs.createWriteStream(detailPath);
        await stream.pipe(ws);
        await stream.on('error',(err)=>{
            return err
        });
        await stream.on('end',(data)=>{
            console.log(data)
        });
        await stream.on('finish',()=>{
        });
        return `http://127.0.0.1:7001/public/image/${fileName}`;
    }
}
module.exports = UserService;