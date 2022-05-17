"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataNode = _interopRequireDefault(require("./DataNode.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Elements {}

exports.default = Elements;

_defineProperty(Elements, "inputs", {
  tierOneNodeAmount: new _DataNode.default('tier-one-node-amount-user-input'),
  tierTwoNodeAmount: new _DataNode.default('tier-two-node-amount-user-input'),
  tierThreeNodeAmount: new _DataNode.default('tier-three-node-amount-user-input'),
  tierFourNodeAmount: new _DataNode.default('tier-four-node-amount-user-input'),
  waitDays: new _DataNode.default('user-wait-days'),
  hasTaxNft: new _DataNode.default('user-has-tax-nft')
});

_defineProperty(Elements, "data", {
  tierOne: {
    noNft: new _DataNode.default('tier-one-daily-reward-user-data'),
    bronzeNft: new _DataNode.default('tier-one-daily-reward-with-bronze-nft'),
    silverNft: new _DataNode.default('tier-one-daily-reward-with-silver-nft'),
    goldNft: new _DataNode.default('tier-one-daily-reward-with-gold-nft')
  },
  tierTwo: {
    noNft: new _DataNode.default('tier-two-daily-reward-user-data'),
    bronzeNft: new _DataNode.default('tier-two-daily-reward-with-bronze-nft'),
    silverNft: new _DataNode.default('tier-two-daily-reward-with-silver-nft'),
    goldNft: new _DataNode.default('tier-two-daily-reward-with-gold-nft')
  },
  tierThree: {
    noNft: new _DataNode.default('tier-three-daily-reward-user-data'),
    bronzeNft: new _DataNode.default('tier-three-daily-reward-with-bronze-nft'),
    silverNft: new _DataNode.default('tier-three-daily-reward-with-silver-nft'),
    goldNft: new _DataNode.default('tier-three-daily-reward-with-gold-nft')
  },
  tierFour: {
    noNft: new _DataNode.default('tier-four-daily-reward-user-data'),
    bronzeNft: new _DataNode.default('tier-four-daily-reward-with-bronze-nft'),
    silverNft: new _DataNode.default('tier-four-daily-reward-with-silver-nft'),
    goldNft: new _DataNode.default('tier-four-daily-reward-with-gold-nft')
  },
  total: {
    nodeAmount: new _DataNode.default('total-node-amount-user-data'),
    noNft: new _DataNode.default('total-daily-reward-user-data'),
    bronzeNft: new _DataNode.default('total-daily-reward-with-bronze-nft'),
    silverNft: new _DataNode.default('total-daily-reward-with-silver-nft'),
    goldNft: new _DataNode.default('total-daily-reward-with-gold-nft')
  },
  waitDays: {
    tax: new _DataNode.default('user-wait-days-tax'),
    noNft: new _DataNode.default('user-wait-days-no-nft'),
    noNftUsd: new _DataNode.default('user-wait-days-no-nft-usd'),
    noNftCro: new _DataNode.default('user-wait-days-no-nft-cro'),
    bronzeNft: new _DataNode.default('user-wait-days-bronze-nft'),
    bronzeNftUsd: new _DataNode.default('user-wait-days-bronze-nft-usd'),
    bronzeNftCro: new _DataNode.default('user-wait-days-bronze-nft-cro'),
    silverNft: new _DataNode.default('user-wait-days-silver-nft'),
    silverNftUsd: new _DataNode.default('user-wait-days-silver-nft-usd'),
    silverNftCro: new _DataNode.default('user-wait-days-silver-nft-cro'),
    goldNft: new _DataNode.default('user-wait-days-gold-nft'),
    goldNftUsd: new _DataNode.default('user-wait-days-gold-nft-usd'),
    goldNftCro: new _DataNode.default('user-wait-days-gold-nft-cro')
  },
  monthlyFees: {
    tierOne: new _DataNode.default('tier-one-monthly-fee-user-data'),
    tierTwo: new _DataNode.default('tier-two-monthly-fee-user-data'),
    tierThree: new _DataNode.default('tier-three-monthly-fee-user-data'),
    tierFour: new _DataNode.default('tier-four-monthly-fee-user-data'),
    total: new _DataNode.default('total-monthly-fee-user-data')
  },
  prices: {
    croUsd: new _DataNode.default('cro-current-price-usd'),
    croCrn: new _DataNode.default('cro-current-price-crn'),
    crnUsd: new _DataNode.default('crn-current-price-usd'),
    crnCro: new _DataNode.default('crn-current-price-cro')
  }
});