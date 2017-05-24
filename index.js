const express = require('express');
const path = require('path');

const createDynamicStatic = function () {
  let instance;
  let staticPath;
  let expressStatic;

  function init(defaultPath) {
    staticPath = defaultPath || path.resolve('public');

    const dynamicStatic = function (req, res, next) {
      expressStatic = express.static(staticPath);

      return expressStatic(req, res, next);
    };

    dynamicStatic.setPath = function (newPath) {
      staticPath = newPath;
      expressStatic = express.static(staticPath);
    };

    return dynamicStatic;
  }

  return function (defaultPath) {
    if (!instance) {
      instance = init(defaultPath);
    }

    return instance;
  };
};

module.exports = createDynamicStatic();