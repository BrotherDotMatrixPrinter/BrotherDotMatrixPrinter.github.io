"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NodeTiers {}

exports.default = NodeTiers;

_defineProperty(NodeTiers, "tierOne", {
  crnCostPerNode: 10.00,
  crnRewardPerDay: 0.06,
  monthlyCROFee: 2.00
});

_defineProperty(NodeTiers, "tierTwo", {
  crnCostPerNode: 20.00,
  crnRewardPerDay: 0.18,
  monthlyCROFee: 8.00
});

_defineProperty(NodeTiers, "tierThree", {
  crnCostPerNode: 55.00,
  crnRewardPerDay: 0.57,
  monthlyCROFee: 20.00
});

_defineProperty(NodeTiers, "tierFour", {
  crnCostPerNode: 110.00,
  crnRewardPerDay: 1.20,
  monthlyCROFee: 40.00
});