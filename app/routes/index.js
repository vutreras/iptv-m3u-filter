const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const request = require("request");
const StringUtils = require('../utils/StringUtils');
const { BadRequestException, NotFoundException, BadGatewayException } = require('../exception/HttpException');

var readline = require('readline');
var stream = require('stream');

function getFile(url, cb) {
  let options = {
    method: 'GET',
    url: url
  };
  logger.info(options);
  request(options, cb);
}

function includeText(value, array) {
  for (var i = 0; i < array.length; i++) {
    if (!StringUtils.isBlank(array[i]) && value.includes(array[i])) {
      return true;
    }
  }
  return false;
}

router.get('', async (req, res, next) => {
  try {

    if (StringUtils.isBlank(req.query.url)) {
      throw new BadRequestException('1', 'Invalid parameters').addDetail('url', 'is missing');
    }

    let url = req.query.url;
    let incs = (req.query.inc || '').split(',');
    let excs = (req.query.exc || '').split(',');

    getFile(url, (error, response, body) => {

      if (error) {
        throw new BadGatewayException(`File not found ${url}`);
      }

      let buf = new Buffer(body.toString());

      let bufferStream = new stream.PassThrough();
      bufferStream.end(buf);

      let rl = readline.createInterface({
        input: bufferStream
      });

      let items = [];
      let lastLine = undefined;

      rl.on('line', (line) => {

        if (StringUtils.isBlank(line) || line.includes('##') ||
        !(line.startsWith('#EXTM3U') || line.startsWith('#EXTINF:') || line.startsWith('https://') || line.startsWith('http://'))) {
          return;
        }

        if (line.startsWith('#EXTM3U')) {
          items.push(line);
        }

        if (line.startsWith('#EXTINF:') && includeText(line, incs, excs) && !includeText(line, excs)) {
          lastLine = line.split(' ').filter(v => !v.startsWith('tvg-logo=')).join(' ');
        }

        if (lastLine != undefined && (line.startsWith('https://') || line.startsWith('http://'))) {
          items.push(lastLine);
          items.push(line);
          lastLine = undefined;
        }

      }).on('close', function(){
        rl.close();
        items.push('');
        res.responseOk(items.join('\n'));
      });
    });

  } catch(error) {
    return res.responseError(error);
  }
});

router.get('/status', async (req, res, next) => {
  res.status(200).json({success: true});
});

module.exports = router;
