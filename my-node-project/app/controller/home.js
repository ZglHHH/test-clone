'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = `search:${ctx.query.name}`;
  }
}

module.exports = HomeController;
