const express = require('express');
const path = require('path');

const createDynamicStatic = function () {
  let instance;

  function init(defaultPath, defaultStaticOpts) {
    let expressStatic;
    let staticPath = defaultPath || path.resolve('public');
    let staticOpts = defaultStaticOpts || {};

    const dynamicStatic = function (req, res, next) {
      expressStatic = express.static(staticPath, staticOpts);

      return expressStatic(req, res, next);
    };

    dynamicStatic.setPath = function (newPath) {
      staticPath = newPath;
      expressStatic = express.static(staticPath, staticOpts);
    };

    return dynamicStatic;
  }

  return function (defaultPath, defaultStaticOpts) {
    if (!instance) {
      instance = init(defaultPath, defaultStaticOpts);
    }

    return instance;
  };
};

module.exports = createDynamicStatic();
