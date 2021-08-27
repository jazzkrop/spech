const express = require("express");
const CommandController = require("./Command.controller");
const Validation = require("./Command.validation");
const validate = require("../../middlewares/validate");

const router = express.Router();
const Controller = new CommandController();

/**
 * @api {post} /command Create new application
 * @apiVersion 1.0.0
 * @apiName CreateApp
 * @apiGroup App
 *
 * @apiParam {String} appName Name of the new app
 *
 * @apiSuccess {String} 200 OK.
 */

router.route('/get-html').post(Controller.getHtml)
router.route('/download-html').get(Controller.downloadHtml)


module.exports = router;
