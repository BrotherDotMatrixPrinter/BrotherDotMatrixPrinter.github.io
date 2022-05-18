"use strict";

require("core-js/modules/es.promise.js");

var _Elements = _interopRequireDefault(require("./class/Elements.js"));

var _Functions = require("./util/Functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @typedef { import( './util/Functions' ).PriceData } PriceData */

/** @param { PriceData } priceData */
const run = priceData => {
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
    try {
      let priceData = await (0, _Functions.getPrices)();

      _Elements.default.inputs.hasTaxNft.onInput(() => run(priceData));

      _Elements.default.inputs.waitDays.onInput(() => run(priceData));

      _Elements.default.inputs.tierOneNodeAmount.onInput(() => run(priceData));

      _Elements.default.inputs.tierTwoNodeAmount.onInput(() => run(priceData));

      _Elements.default.inputs.tierThreeNodeAmount.onInput(() => run(priceData));

      _Elements.default.inputs.tierFourNodeAmount.onInput(() => run(priceData));

      _Elements.default.inputs.refreshPricesButton.onClick(() => {
        (async () => {
          try {
            priceData = await (0, _Functions.getPrices)();
          } catch (exception) {
            (0, _Functions.printError)(exception);
          }

          run(priceData);
        })();
      });

      _Elements.default.inputs.connectMetamaskButton.onClick(() => {
        (async () => {
          try {
            const rpcProvider = await (0, _Functions.connectToMetamask)();
            console.info(await (0, _Functions.getNodes)(rpcProvider));
          } catch (exception) {
            console.warn(exception);
          }
        })();
      });
    } catch (exception) {
      (0, _Functions.printError)(exception);
    }
  })();
}, false);