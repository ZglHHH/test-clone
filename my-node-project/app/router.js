'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.get('/get/shop', controller.shop.index);
    router.post('/post/menu', controller.menu.index);
    router.post('/post/image', controller.image.index);
};
