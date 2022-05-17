"use strict";

require("core-js/modules/es.promise.js");

var _Elements = _interopRequireDefault(require("./class/Elements.js"));

var _Functions = require("./util/Functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @typedef { import( './util/Functions' ).PriceData } PriceData */

/** @param { PriceData } priceData */
const getNodes = priceData => {
  const {
    waitDays,
    hasTaxNft,
    nodeAmounts
  } = (0, _Functions.getUserInputs)(),
        dailyReward = (0, _Functions.getDailyRewards)(nodeAmounts),
        monthlyFees = (0, _Functions.getMonthlyFees)(nodeAmounts);
  const dailyWaitTax = (0, _Functions.getTax)(waitDays, hasTaxNft),
        dailyWaitTotal = (0, _Functions.applyTax)(dailyReward.total * waitDays, dailyWaitTax);
  (0, _Functions.setWaitDaysTaxDisplay)(dailyWaitTax);
  (0, _Functions.updateDisplay)(nodeAmounts, dailyReward, monthlyFees, dailyWaitTotal, priceData);
};

window.addEventListener('load', () => {
  (async () => {
    const priceData = await (0, _Functions.getPrices)();

    _Elements.default.inputs.hasTaxNft.get().addEventListener('input', () => getNodes(priceData), false);

    _Elements.default.inputs.waitDays.get().addEventListener('input', () => getNodes(priceData), false);

    _Elements.default.inputs.tierOneNodeAmount.get().addEventListener('input', () => getNodes(priceData), false);

    _Elements.default.inputs.tierTwoNodeAmount.get().addEventListener('input', () => getNodes(priceData), false);

    _Elements.default.inputs.tierThreeNodeAmount.get().addEventListener('input', () => getNodes(priceData), false);

    _Elements.default.inputs.tierFourNodeAmount.get().addEventListener('input', () => getNodes(priceData), false);
  })();
}, false);