"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDisplay = exports.setWaitDaysTaxDisplay = exports.getUserInputs = exports.getTax = exports.getMonthlyFees = exports.getDailyRewards = exports.applyTax = exports.applyBoost = void 0;

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.number.to-fixed.js");

var _Elements = _interopRequireDefault(require("../class/Elements.js"));

var _NodeTiers = _interopRequireDefault(require("../class/NodeTiers.js"));

var _BoostNfts = _interopRequireDefault(require("../class/BoostNfts.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef { Object } NodeAmounts
 * @property { number } tierOne
 * @property { number } tierTwo
 * @property { number } tierThree
 * @property { number } tierFour
 * @property { number } total
 */

/**
 * @typedef { Object } UserInputs
 * @property { number } waitDays
 * @property { boolean } hasTaxNft
 * @property { NodeAmounts } nodeAmounts
 */

/** @returns { UserInputs } */
const getUserInputs = () => {
  const waitDays = parseInt(_Elements.default.inputs.waitDays.get().value),

  /** @type { boolean } */
  hasTaxNft = _Elements.default.inputs.hasTaxNft.get().checked;

  const nodeAmounts = {
    tierOne: parseInt(_Elements.default.inputs.tierOneNodeAmount.get().value),
    tierTwo: parseInt(_Elements.default.inputs.tierTwoNodeAmount.get().value),
    tierThree: parseInt(_Elements.default.inputs.tierThreeNodeAmount.get().value),
    tierFour: parseInt(_Elements.default.inputs.tierFourNodeAmount.get().value),
    total: 0
  };
  nodeAmounts.total = nodeAmounts.tierOne + nodeAmounts.tierTwo + nodeAmounts.tierThree + nodeAmounts.tierFour;
  return {
    waitDays,
    hasTaxNft,
    nodeAmounts
  };
};
/**
 * @param { NodeAmounts } nodeAmounts
 * @returns { NodeAmounts }
 */


exports.getUserInputs = getUserInputs;

const getDailyRewards = nodeAmounts => {
  const dailyReward = {
    tierOne: nodeAmounts.tierOne * _NodeTiers.default.tierOne.crnRewardPerDay,
    tierTwo: nodeAmounts.tierTwo * _NodeTiers.default.tierTwo.crnRewardPerDay,
    tierThree: nodeAmounts.tierThree * _NodeTiers.default.tierThree.crnRewardPerDay,
    tierFour: nodeAmounts.tierFour * _NodeTiers.default.tierFour.crnRewardPerDay,
    total: 0
  };
  dailyReward.total = dailyReward.tierOne + dailyReward.tierTwo + dailyReward.tierThree + dailyReward.tierFour;
  return dailyReward;
};
/**
 * @param { NodeAmounts } nodeAmounts
 * @returns { NodeAmounts }
 */


exports.getDailyRewards = getDailyRewards;

const getMonthlyFees = nodeAmounts => {
  const monthlyFees = {
    tierOne: nodeAmounts.tierOne * _NodeTiers.default.tierOne.monthlyCROFee,
    tierTwo: nodeAmounts.tierTwo * _NodeTiers.default.tierTwo.monthlyCROFee,
    tierThree: nodeAmounts.tierThree * _NodeTiers.default.tierThree.monthlyCROFee,
    tierFour: nodeAmounts.tierFour * _NodeTiers.default.tierFour.monthlyCROFee,
    total: 0
  };
  monthlyFees.total = monthlyFees.tierOne + monthlyFees.tierTwo + monthlyFees.tierThree + monthlyFees.tierFour;
  return monthlyFees;
};
/**
 * @param { number } days
 * @param { boolean } hasTaxNft
 * @returns { ( 0.50| 0.40 | 0.30 | 0.10 | 0.05 )? }
 */


exports.getMonthlyFees = getMonthlyFees;

const getTax = (days, hasTaxNft) => {
  switch (true) {
    case days >= 0 && days <= 5:
      return 0.50;

    case days >= 6 && days <= 10:
      return 0.40;

    case days >= 11 && days <= 15:
      return 0.30;

    case days > 15 && !hasTaxNft:
      return 0.10;

    case days > 15 && hasTaxNft:
      return 0.05;
  }

  return null;
};
/**
 * @param { 0.50| 0.40 | 0.30 | 0.10 | 0.05 } dailyWaitTax
 */


exports.getTax = getTax;

const setWaitDaysTaxDisplay = dailyWaitTax => {
  const element = _Elements.default.data.waitDays.tax.get();

  switch (dailyWaitTax) {
    case 0.50:
      element.innerHTML = 'Tax: 50%';
      break;

    case 0.40:
      element.innerHTML = 'Tax: 40%';
      break;

    case 0.30:
      element.innerHTML = 'Tax: 30%';
      break;

    case 0.10:
      element.innerHTML = 'Tax: 10%';
      break;

    case 0.05:
      element.innerHTML = 'Tax: 5%';
      break;
  }
};
/**
 * @param { number } value
 * @param { 0.50| 0.40 | 0.30 | 0.10 | 0.05 } tax
 * @returns { number }
 */


exports.setWaitDaysTaxDisplay = setWaitDaysTaxDisplay;

const applyTax = (value, tax) => value - value * tax;
/**
 * @param { number } value
 * @param { 0.10 | 0.05 | 0.02 } boost
 */


exports.applyTax = applyTax;

const applyBoost = (value, boost) => value + value * boost;
/**
 * @param { NodeAmounts } nodeAmounts
 * @param { NodeAmounts } dailyReward
 * @param { NodeAmounts } monthlyFees
 * @param { number } dailyWaitTotal
 */


exports.applyBoost = applyBoost;

const updateDisplay = (nodeAmounts, dailyReward, monthlyFees, dailyWaitTotal) => {
  let element = _Elements.default.data.total;
  element.nodeAmount.get().innerHTML = "".concat(nodeAmounts.total.toFixed(0), " Nodes");
  element.noNft.get().innerHTML = "".concat(dailyReward.total.toFixed(2), " CRN");
  element.bronzeNft.get().innerHTML = "".concat(applyBoost(dailyReward.total, _BoostNfts.default.bronze).toFixed(2), " CRN");
  element.silverNft.get().innerHTML = "".concat(applyBoost(dailyReward.total, _BoostNfts.default.silver).toFixed(2), " CRN");
  element.goldNft.get().innerHTML = "".concat(applyBoost(dailyReward.total, _BoostNfts.default.gold).toFixed(2), " CRN");
  element = _Elements.default.data.waitDays;
  element.noNft.get().innerHTML = "".concat(dailyWaitTotal.toFixed(2), " CRN");
  element.bronzeNft.get().innerHTML = "".concat(applyBoost(dailyWaitTotal, _BoostNfts.default.bronze).toFixed(2), " CRN");
  element.silverNft.get().innerHTML = "".concat(applyBoost(dailyWaitTotal, _BoostNfts.default.silver).toFixed(2), " CRN");
  element.goldNft.get().innerHTML = "".concat(applyBoost(dailyWaitTotal, _BoostNfts.default.gold).toFixed(2), " CRN");
  element = _Elements.default.data.tierOne;
  element.noNft.get().innerHTML = "".concat(dailyReward.tierOne.toFixed(2), " CRN");
  element.bronzeNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierOne, _BoostNfts.default.bronze).toFixed(2), " CRN");
  element.silverNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierOne, _BoostNfts.default.silver).toFixed(2), " CRN");
  element.goldNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierOne, _BoostNfts.default.gold).toFixed(2), " CRN");
  element = _Elements.default.data.tierTwo;
  element.noNft.get().innerHTML = "".concat(dailyReward.tierTwo.toFixed(2), " CRN");
  element.bronzeNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierTwo, _BoostNfts.default.bronze).toFixed(2), " CRN");
  element.silverNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierTwo, _BoostNfts.default.silver).toFixed(2), " CRN");
  element.goldNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierTwo, _BoostNfts.default.gold).toFixed(2), " CRN");
  element = _Elements.default.data.tierThree;
  element.noNft.get().innerHTML = "".concat(dailyReward.tierThree.toFixed(2), " CRN");
  element.bronzeNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierThree, _BoostNfts.default.bronze).toFixed(2), " CRN");
  element.silverNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierThree, _BoostNfts.default.silver).toFixed(2), " CRN");
  element.goldNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierThree, _BoostNfts.default.gold).toFixed(2), " CRN");
  element = _Elements.default.data.tierFour;
  element.noNft.get().innerHTML = "".concat(dailyReward.tierFour.toFixed(2), " CRN");
  element.bronzeNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierFour, _BoostNfts.default.bronze).toFixed(2), " CRN");
  element.silverNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierFour, _BoostNfts.default.silver).toFixed(2), " CRN");
  element.goldNft.get().innerHTML = "".concat(applyBoost(dailyReward.tierFour, _BoostNfts.default.gold).toFixed(2), " CRN");
  const monthlyFeeElement = _Elements.default.data.monthlyFees;
  monthlyFeeElement.tierOne.get().innerHTML = "".concat(monthlyFees.tierOne.toFixed(2), " CRO");
  monthlyFeeElement.tierTwo.get().innerHTML = "".concat(monthlyFees.tierTwo.toFixed(2), " CRO");
  monthlyFeeElement.tierThree.get().innerHTML = "".concat(monthlyFees.tierThree.toFixed(2), " CRO");
  monthlyFeeElement.tierFour.get().innerHTML = "".concat(monthlyFees.tierFour.toFixed(2), " CRO");
  monthlyFeeElement.total.get().innerHTML = "".concat(monthlyFees.total.toFixed(2), " CRO");
};

exports.updateDisplay = updateDisplay;