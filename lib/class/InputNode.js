"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataNode = _interopRequireDefault(require("./DataNode.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InputNode extends _DataNode.default {
  /** @param { () => void } callback */
  onInput(callback) {
    this.get().addEventListener('input', callback, false);
  }
  /** @param { () => void } callback */


  onClick(callback) {
    this.get().addEventListener('click', callback, false);
  }

}

exports.default = InputNode;