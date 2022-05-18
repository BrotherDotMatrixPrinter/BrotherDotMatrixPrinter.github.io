"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDisplay = exports.setWaitDaysTaxDisplay = exports.printError = exports.getUserInputs = exports.getTax = exports.getPrices = exports.getNodes = exports.getMonthlyFees = exports.getDailyRewards = exports.connectToMetamask = exports.applyTax = exports.applyBoost = void 0;

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.number.to-fixed.js");

require("core-js/modules/es.promise.js");

var _axios = _interopRequireDefault(require("axios"));

var _ethers = require("ethers");

var _providers = require("@ethersproject/providers");

var _Elements = _interopRequireDefault(require("../class/Elements.js"));

var _NodeTiers = _interopRequireDefault(require("../class/NodeTiers.js"));

var _BoostNfts = _interopRequireDefault(require("../class/BoostNfts.js"));

var _Constants = _interopRequireDefault(require("./Constants.js"));

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

/**
 * @typedef { Object } PriceData
 * @property { number } croUsd
 * @property { number } croCrn
 * @property { number } crnUsd
 * @property { number } crnCro
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
 * @param { PriceData } priceData
 */


exports.applyBoost = applyBoost;

const updateDisplay = (nodeAmounts, dailyReward, monthlyFees, dailyWaitTotal, priceData) => {
  let element = _Elements.default.data.tierOne;
  element.noNft.set("".concat(dailyReward.tierOne.toFixed(2), " CRN"));
  element.bronzeNft.set("".concat(applyBoost(dailyReward.tierOne, _BoostNfts.default.bronze).toFixed(2), " CRN"));
  element.silverNft.set("".concat(applyBoost(dailyReward.tierOne, _BoostNfts.default.silver).toFixed(2), " CRN"));
  element.goldNft.set("".concat(applyBoost(dailyReward.tierOne, _BoostNfts.default.gold).toFixed(2), " CRN"));
  element = _Elements.default.data.tierTwo;
  element.noNft.set("".concat(dailyReward.tierTwo.toFixed(2), " CRN"));
  element.bronzeNft.set("".concat(applyBoost(dailyReward.tierTwo, _BoostNfts.default.bronze).toFixed(2), " CRN"));
  element.silverNft.set("".concat(applyBoost(dailyReward.tierTwo, _BoostNfts.default.silver).toFixed(2), " CRN"));
  element.goldNft.set("".concat(applyBoost(dailyReward.tierTwo, _BoostNfts.default.gold).toFixed(2), " CRN"));
  element = _Elements.default.data.tierThree;
  element.noNft.set("".concat(dailyReward.tierThree.toFixed(2), " CRN"));
  element.bronzeNft.set("".concat(applyBoost(dailyReward.tierThree, _BoostNfts.default.bronze).toFixed(2), " CRN"));
  element.silverNft.set("".concat(applyBoost(dailyReward.tierThree, _BoostNfts.default.silver).toFixed(2), " CRN"));
  element.goldNft.set("".concat(applyBoost(dailyReward.tierThree, _BoostNfts.default.gold).toFixed(2), " CRN"));
  element = _Elements.default.data.tierFour;
  element.noNft.set("".concat(dailyReward.tierFour.toFixed(2), " CRN"));
  element.bronzeNft.set("".concat(applyBoost(dailyReward.tierFour, _BoostNfts.default.bronze).toFixed(2), " CRN"));
  element.silverNft.set("".concat(applyBoost(dailyReward.tierFour, _BoostNfts.default.silver).toFixed(2), " CRN"));
  element.goldNft.set("".concat(applyBoost(dailyReward.tierFour, _BoostNfts.default.gold).toFixed(2), " CRN"));
  const totalElement = _Elements.default.data.total;
  totalElement.nodeAmount.set("".concat(nodeAmounts.total.toFixed(0), " Nodes"));
  totalElement.noNft.set("".concat(dailyReward.total.toFixed(2), " CRN"));
  totalElement.noNftUsd.set("$".concat((dailyReward.total * priceData.crnUsd).toFixed(2)));
  totalElement.noNftCro.set((dailyReward.total * priceData.crnCro).toFixed(2));
  totalElement.bronzeNft.set("".concat(applyBoost(dailyReward.total, _BoostNfts.default.bronze).toFixed(2), " CRN"));
  totalElement.bronzeNftUsd.set("$".concat((applyBoost(dailyReward.total, _BoostNfts.default.bronze) * priceData.crnUsd).toFixed(2)));
  totalElement.bronzeNftCro.set((applyBoost(dailyReward.total, _BoostNfts.default.bronze) * priceData.crnCro).toFixed(2));
  totalElement.silverNft.set("".concat(applyBoost(dailyReward.total, _BoostNfts.default.silver).toFixed(2), " CRN"));
  totalElement.silverNftUsd.set("$".concat((applyBoost(dailyReward.total, _BoostNfts.default.silver) * priceData.crnUsd).toFixed(2)));
  totalElement.silverNftCro.set((applyBoost(dailyReward.total, _BoostNfts.default.silver) * priceData.crnCro).toFixed(2));
  totalElement.goldNft.set("".concat(applyBoost(dailyReward.total, _BoostNfts.default.gold).toFixed(2), " CRN"));
  totalElement.goldNftUsd.set("$".concat((applyBoost(dailyReward.total, _BoostNfts.default.gold) * priceData.crnUsd).toFixed(2)));
  totalElement.goldNftCro.set((applyBoost(dailyReward.total, _BoostNfts.default.gold) * priceData.crnCro).toFixed(2));
  const waitDaysElement = _Elements.default.data.waitDays;
  waitDaysElement.noNft.set("".concat(dailyWaitTotal.toFixed(2), " CRN"));
  waitDaysElement.noNftUsd.set("$".concat((dailyWaitTotal * priceData.crnUsd).toFixed(2)));
  waitDaysElement.noNftCro.set((dailyWaitTotal * priceData.crnCro).toFixed(2));
  waitDaysElement.bronzeNft.set("".concat(applyBoost(dailyWaitTotal, _BoostNfts.default.bronze).toFixed(2), " CRN"));
  waitDaysElement.bronzeNftUsd.set("$".concat((applyBoost(dailyWaitTotal, _BoostNfts.default.bronze) * priceData.crnUsd).toFixed(2)));
  waitDaysElement.bronzeNftCro.set((applyBoost(dailyWaitTotal, _BoostNfts.default.bronze) * priceData.crnCro).toFixed(2));
  waitDaysElement.silverNft.set("".concat(applyBoost(dailyWaitTotal, _BoostNfts.default.silver).toFixed(2), " CRN"));
  waitDaysElement.silverNftUsd.set("$".concat((applyBoost(dailyWaitTotal, _BoostNfts.default.silver) * priceData.crnUsd).toFixed(2)));
  waitDaysElement.silverNftCro.set((applyBoost(dailyWaitTotal, _BoostNfts.default.silver) * priceData.crnCro).toFixed(2));
  waitDaysElement.goldNft.set("".concat(applyBoost(dailyWaitTotal, _BoostNfts.default.gold).toFixed(2), " CRN"));
  waitDaysElement.goldNftUsd.set("$".concat((applyBoost(dailyWaitTotal, _BoostNfts.default.gold) * priceData.crnUsd).toFixed(2)));
  waitDaysElement.goldNftCro.set((applyBoost(dailyWaitTotal, _BoostNfts.default.gold) * priceData.crnCro).toFixed(2));
  const monthlyFeeElement = _Elements.default.data.monthlyFees;
  monthlyFeeElement.tierOne.set(monthlyFees.tierOne.toFixed(2));
  monthlyFeeElement.tierOneUsd.set("$".concat((monthlyFees.tierOne * priceData.croUsd).toFixed(2)));
  monthlyFeeElement.tierOneCrn.set((monthlyFees.tierOne * priceData.croCrn).toFixed(2));
  monthlyFeeElement.tierTwo.set(monthlyFees.tierTwo.toFixed(2));
  monthlyFeeElement.tierTwoUsd.set("$".concat((monthlyFees.tierTwo * priceData.croUsd).toFixed(2)));
  monthlyFeeElement.tierTwoCrn.set((monthlyFees.tierTwo * priceData.croCrn).toFixed(2));
  monthlyFeeElement.tierThree.set(monthlyFees.tierThree.toFixed(2));
  monthlyFeeElement.tierThreeUsd.set("".concat((monthlyFees.tierThree * priceData.croUsd).toFixed(2)));
  monthlyFeeElement.tierThreeCrn.set((monthlyFees.tierThree * priceData.croCrn).toFixed(2));
  monthlyFeeElement.tierFour.set(monthlyFees.tierFour.toFixed(2));
  monthlyFeeElement.tierFourUsd.set("$".concat((monthlyFees.tierFour * priceData.croUsd).toFixed(2)));
  monthlyFeeElement.tierFourCrn.set((monthlyFees.tierFour * priceData.croCrn).toFixed(2));
  monthlyFeeElement.total.set(monthlyFees.total.toFixed(2));
  monthlyFeeElement.totalUsd.set("$".concat((monthlyFees.total * priceData.croUsd).toFixed(2)));
  monthlyFeeElement.totalCrn.set((monthlyFees.total * priceData.croCrn).toFixed(2));
};
/** @returns { Promise< PriceData > } */


exports.updateDisplay = updateDisplay;

const getPrices = async () => {
  const
  /** @type { number } */
  croUsd = (await _axios.default.get(_Constants.default.croUsdCGUrl)).data['crypto-com-chain']['usd'],

  /** @type { number } */
  crnUsd = (await _axios.default.get(_Constants.default.crnUsdCGUrl)).data['cronodes']['usd'],
        croCrn = croUsd / crnUsd,
        crnCro = crnUsd / croUsd;

  _Elements.default.data.prices.croUsd.set("$".concat(croUsd.toFixed(2)));

  _Elements.default.data.prices.croCrn.set(croCrn.toFixed(2));

  _Elements.default.data.prices.crnUsd.set(crnUsd.toFixed(2));

  _Elements.default.data.prices.crnCro.set(crnCro.toFixed(2));

  return {
    croUsd,
    croCrn,
    crnUsd,
    crnCro
  };
};

exports.getPrices = getPrices;

const printError = exception => {
  console.info('========================================');
  console.warn("An Error Has Occurred: ".concat(typeof exception));
  console.info('========================================');
  console.warn('Please Contact The Developer');
  console.info('========================================');
  console.warn(exception);
  console.info('========================================');
  window.alert('An Error Has Occurred, Contact The Developer');
};

exports.printError = printError;

const connectToMetamask = async () => {
  if (window.ethereum) {
    const rpcProvider = new _providers.Web3Provider(window.ethereum, 'any');
    await rpcProvider.send('eth_requestAccounts', []);
    return rpcProvider;
  }
};
/** @param { Web3Provider } rpcProvider */


exports.connectToMetamask = connectToMetamask;

const getNodes = async rpcProvider => {
  const result = await new _ethers.Contract(_Constants.default.v2NodeManagementContractAddress, [{
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "getAllNodes",
    "outputs": [{
      "components": [{
        "internalType": "string",
        "name": "name",
        "type": "string"
      }, {
        "internalType": "uint256",
        "name": "nodeTier",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "creationTime",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "lastClaimTime",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "lastPaidTime",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "paymentDueTime",
        "type": "uint256"
      }, {
        "internalType": "bool",
        "name": "hasMonthlyFee",
        "type": "bool"
      }, {
        "internalType": "uint256",
        "name": "extendedParam1",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "extendedParam2",
        "type": "uint256"
      }],
      "internalType": "struct CRNNodesManagement.NodeEntity[]",
      "name": "_nodes",
      "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
  }], rpcProvider).getAllNodes(await rpcProvider.getSigner().getAddress());
  console.log(result);
};

exports.getNodes = getNodes;