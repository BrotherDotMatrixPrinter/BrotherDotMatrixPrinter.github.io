import Elements from '../class/Elements.js'
import NodeTiers from '../class/NodeTiers.js'
import BoostNfts from '../class/BoostNfts.js'

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
export const getUserInputs = () => {
	const waitDays = parseInt( Elements.inputs.waitDays.get().value ),
		/** @type { boolean } */ hasTaxNft = Elements.inputs.hasTaxNft.get().checked

	const nodeAmounts = {
		tierOne: parseInt( Elements.inputs.tierOneNodeAmount.get().value ),
		tierTwo: parseInt( Elements.inputs.tierTwoNodeAmount.get().value ),
		tierThree: parseInt( Elements.inputs.tierThreeNodeAmount.get().value ),
		tierFour: parseInt( Elements.inputs.tierFourNodeAmount.get().value ),
		total: 0
	}

	nodeAmounts.total = nodeAmounts.tierOne + nodeAmounts.tierTwo + nodeAmounts.tierThree + nodeAmounts.tierFour

	return {
		waitDays,
		hasTaxNft,
		nodeAmounts
	}
}

/**
 * @param { NodeAmounts } nodeAmounts
 * @returns { NodeAmounts }
 */
export const getDailyRewards = nodeAmounts => {
	const dailyReward = {
		tierOne: nodeAmounts.tierOne * NodeTiers.tierOne.crnRewardPerDay,
		tierTwo: nodeAmounts.tierTwo * NodeTiers.tierTwo.crnRewardPerDay,
		tierThree: nodeAmounts.tierThree * NodeTiers.tierThree.crnRewardPerDay,
		tierFour: nodeAmounts.tierFour * NodeTiers.tierFour.crnRewardPerDay,
		total: 0
	}

	dailyReward.total = dailyReward.tierOne + dailyReward.tierTwo + dailyReward.tierThree + dailyReward.tierFour

	return dailyReward
}

/**
 * @param { NodeAmounts } nodeAmounts
 * @returns { NodeAmounts }
 */
export const getMonthlyFees = nodeAmounts => {
	const monthlyFees = {
		tierOne: nodeAmounts.tierOne * NodeTiers.tierOne.monthlyCROFee,
		tierTwo: nodeAmounts.tierTwo * NodeTiers.tierTwo.monthlyCROFee,
		tierThree: nodeAmounts.tierThree * NodeTiers.tierThree.monthlyCROFee,
		tierFour: nodeAmounts.tierFour * NodeTiers.tierFour.monthlyCROFee,
		total: 0
	}

	monthlyFees.total = monthlyFees.tierOne + monthlyFees.tierTwo + monthlyFees.tierThree + monthlyFees.tierFour

	return monthlyFees
}

/**
 * @param { number } days
 * @param { boolean } hasTaxNft
 * @returns { ( 0.50| 0.40 | 0.30 | 0.10 | 0.05 )? }
 */
export const getTax = ( days, hasTaxNft ) => {
	switch ( true ) {
		case days >= 0 && days <= 5: return 0.50
		case days >= 6 && days <= 10: return 0.40
		case days >= 11 && days <= 15: return 0.30
		case days > 15 && ! hasTaxNft: return 0.10
		case days > 15 && hasTaxNft: return 0.05
	}

	return null
}

/**
 * @param { 0.50| 0.40 | 0.30 | 0.10 | 0.05 } dailyWaitTax
 */
export const setWaitDaysTaxDisplay = dailyWaitTax => {
	const element = Elements.data.waitDays.tax.get()

	switch ( dailyWaitTax ) {
		case 0.50:
			element.innerHTML = 'Tax: 50%'
			break
		case 0.40:
			element.innerHTML = 'Tax: 40%'
			break
		case 0.30:
			element.innerHTML = 'Tax: 30%'
			break
		case 0.10:
			element.innerHTML = 'Tax: 10%'
			break
		case 0.05:
			element.innerHTML = 'Tax: 5%'
			break
	}
}

/**
 * @param { number } value
 * @param { 0.50| 0.40 | 0.30 | 0.10 | 0.05 } tax
 * @returns { number }
 */
export const applyTax = ( value, tax ) => value - ( value * tax )

/**
 * @param { number } value
 * @param { 0.10 | 0.05 | 0.02 } boost
 */
export const applyBoost = ( value, boost ) => value + ( value * boost )

/**
 * @param { NodeAmounts } nodeAmounts
 * @param { NodeAmounts } dailyReward
 * @param { NodeAmounts } monthlyFees
 * @param { number } dailyWaitTotal
 */
export const updateDisplay = ( nodeAmounts, dailyReward, monthlyFees, dailyWaitTotal ) => {
	let element = Elements.data.total
	element.nodeAmount.get().innerHTML = `${ nodeAmounts.total.toFixed( 0 ) } Nodes`
	element.noNft.get().innerHTML = `${ dailyReward.total.toFixed( 2 ) } CRN`
	element.bronzeNft.get().innerHTML = `${ applyBoost( dailyReward.total, BoostNfts.bronze ).toFixed( 2 ) } CRN`
	element.silverNft.get().innerHTML = `${ applyBoost( dailyReward.total, BoostNfts.silver ).toFixed( 2 ) } CRN`
	element.goldNft.get().innerHTML = `${ applyBoost( dailyReward.total, BoostNfts.gold ).toFixed( 2 ) } CRN`

	element = Elements.data.waitDays
	element.noNft.get().innerHTML = `${ dailyWaitTotal.toFixed( 2 ) } CRN`
	element.bronzeNft.get().innerHTML = `${ applyBoost( dailyWaitTotal, BoostNfts.bronze ).toFixed( 2 ) } CRN`
	element.silverNft.get().innerHTML = `${ applyBoost( dailyWaitTotal, BoostNfts.silver ).toFixed( 2 ) } CRN`
	element.goldNft.get().innerHTML = `${ applyBoost( dailyWaitTotal, BoostNfts.gold ).toFixed( 2 ) } CRN`

	element = Elements.data.tierOne
	element.noNft.get().innerHTML = `${ dailyReward.tierOne.toFixed( 2 ) } CRN`
	element.bronzeNft.get().innerHTML = `${ applyBoost( dailyReward.tierOne, BoostNfts.bronze ).toFixed( 2 ) } CRN`
	element.silverNft.get().innerHTML = `${ applyBoost( dailyReward.tierOne, BoostNfts.silver ).toFixed( 2 ) } CRN`
	element.goldNft.get().innerHTML = `${ applyBoost( dailyReward.tierOne, BoostNfts.gold ).toFixed( 2 ) } CRN`

	element = Elements.data.tierTwo
	element.noNft.get().innerHTML = `${ dailyReward.tierTwo.toFixed( 2 ) } CRN`
	element.bronzeNft.get().innerHTML = `${ applyBoost( dailyReward.tierTwo, BoostNfts.bronze ).toFixed( 2 ) } CRN`
	element.silverNft.get().innerHTML = `${ applyBoost( dailyReward.tierTwo, BoostNfts.silver ).toFixed( 2 ) } CRN`
	element.goldNft.get().innerHTML = `${ applyBoost( dailyReward.tierTwo, BoostNfts.gold ).toFixed( 2 ) } CRN`

	element = Elements.data.tierThree
	element.noNft.get().innerHTML = `${ dailyReward.tierThree.toFixed( 2 ) } CRN`
	element.bronzeNft.get().innerHTML = `${ applyBoost( dailyReward.tierThree, BoostNfts.bronze ).toFixed( 2 ) } CRN`
	element.silverNft.get().innerHTML = `${ applyBoost( dailyReward.tierThree, BoostNfts.silver ).toFixed( 2 ) } CRN`
	element.goldNft.get().innerHTML = `${ applyBoost( dailyReward.tierThree, BoostNfts.gold ).toFixed( 2 ) } CRN`

	element = Elements.data.tierFour
	element.noNft.get().innerHTML = `${ dailyReward.tierFour.toFixed( 2 ) } CRN`
	element.bronzeNft.get().innerHTML = `${ applyBoost( dailyReward.tierFour, BoostNfts.bronze ).toFixed( 2 ) } CRN`
	element.silverNft.get().innerHTML = `${ applyBoost( dailyReward.tierFour, BoostNfts.silver ).toFixed( 2 ) } CRN`
	element.goldNft.get().innerHTML = `${ applyBoost( dailyReward.tierFour, BoostNfts.gold ).toFixed( 2 ) } CRN`

	const monthlyFeeElement = Elements.data.monthlyFees
	monthlyFeeElement.tierOne.get().innerHTML = `${ monthlyFees.tierOne.toFixed( 2 ) } CRO`
	monthlyFeeElement.tierTwo.get().innerHTML = `${ monthlyFees.tierTwo.toFixed( 2 ) } CRO`
	monthlyFeeElement.tierThree.get().innerHTML = `${ monthlyFees.tierThree.toFixed( 2 ) } CRO`
	monthlyFeeElement.tierFour.get().innerHTML = `${ monthlyFees.tierFour.toFixed( 2 ) } CRO`
	monthlyFeeElement.total.get().innerHTML = `${ monthlyFees.total.toFixed( 2 ) } CRO`
}