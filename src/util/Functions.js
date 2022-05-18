import axios from 'axios'
import { Contract } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import Elements from '../class/Elements.js'
import NodeTiers from '../class/NodeTiers.js'
import BoostNfts from '../class/BoostNfts.js'
import Constants from './Constants.js'

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
 * @param { PriceData } priceData
 */
export const updateDisplay = ( nodeAmounts, dailyReward, monthlyFees, dailyWaitTotal, priceData ) => {
	let element = Elements.data.tierOne
	element.noNft.set( `${ dailyReward.tierOne.toFixed( 2 ) } CRN` )
	element.bronzeNft.set( `${ applyBoost( dailyReward.tierOne, BoostNfts.bronze ).toFixed( 2 ) } CRN` )
	element.silverNft.set( `${ applyBoost( dailyReward.tierOne, BoostNfts.silver ).toFixed( 2 ) } CRN` )
	element.goldNft.set( `${ applyBoost( dailyReward.tierOne, BoostNfts.gold ).toFixed( 2 ) } CRN` )

	element = Elements.data.tierTwo
	element.noNft.set( `${ dailyReward.tierTwo.toFixed( 2 ) } CRN` )
	element.bronzeNft.set( `${ applyBoost( dailyReward.tierTwo, BoostNfts.bronze ).toFixed( 2 ) } CRN` )
	element.silverNft.set( `${ applyBoost( dailyReward.tierTwo, BoostNfts.silver ).toFixed( 2 ) } CRN` )
	element.goldNft.set( `${ applyBoost( dailyReward.tierTwo, BoostNfts.gold ).toFixed( 2 ) } CRN` )

	element = Elements.data.tierThree
	element.noNft.set( `${ dailyReward.tierThree.toFixed( 2 ) } CRN` )
	element.bronzeNft.set( `${ applyBoost( dailyReward.tierThree, BoostNfts.bronze ).toFixed( 2 ) } CRN` )
	element.silverNft.set( `${ applyBoost( dailyReward.tierThree, BoostNfts.silver ).toFixed( 2 ) } CRN` )
	element.goldNft.set( `${ applyBoost( dailyReward.tierThree, BoostNfts.gold ).toFixed( 2 ) } CRN` )

	element = Elements.data.tierFour
	element.noNft.set( `${ dailyReward.tierFour.toFixed( 2 ) } CRN` )
	element.bronzeNft.set( `${ applyBoost( dailyReward.tierFour, BoostNfts.bronze ).toFixed( 2 ) } CRN` )
	element.silverNft.set( `${ applyBoost( dailyReward.tierFour, BoostNfts.silver ).toFixed( 2 ) } CRN` )
	element.goldNft.set( `${ applyBoost( dailyReward.tierFour, BoostNfts.gold ).toFixed( 2 ) } CRN` )

	const totalElement = Elements.data.total
	totalElement.nodeAmount.set( `${ nodeAmounts.total.toFixed( 0 ) } Nodes` )
	totalElement.noNft.set( `${ dailyReward.total.toFixed( 2 ) } CRN` )
	totalElement.noNftUsd.set( `$${ ( dailyReward.total * priceData.crnUsd ).toFixed( 2 ) }` )
	totalElement.noNftCro.set( ( dailyReward.total * priceData.crnCro ).toFixed( 2 ) )
	totalElement.bronzeNft.set( `${ applyBoost( dailyReward.total, BoostNfts.bronze ).toFixed( 2 ) } CRN` )
	totalElement.bronzeNftUsd.set( `$${ ( applyBoost( dailyReward.total, BoostNfts.bronze ) * priceData.crnUsd ).toFixed( 2 ) }` )
	totalElement.bronzeNftCro.set( ( applyBoost( dailyReward.total, BoostNfts.bronze ) * priceData.crnCro ).toFixed( 2 ) )
	totalElement.silverNft.set( `${ applyBoost( dailyReward.total, BoostNfts.silver ).toFixed( 2 ) } CRN` )
	totalElement.silverNftUsd.set( `$${ ( applyBoost( dailyReward.total, BoostNfts.silver ) * priceData.crnUsd ).toFixed( 2 ) }` )
	totalElement.silverNftCro.set( ( applyBoost( dailyReward.total, BoostNfts.silver ) * priceData.crnCro ).toFixed( 2 ) )
	totalElement.goldNft.set( `${ applyBoost( dailyReward.total, BoostNfts.gold ).toFixed( 2 ) } CRN` )
	totalElement.goldNftUsd.set( `$${ ( applyBoost( dailyReward.total, BoostNfts.gold ) * priceData.crnUsd ).toFixed( 2 ) }` )
	totalElement.goldNftCro.set( ( applyBoost( dailyReward.total, BoostNfts.gold ) * priceData.crnCro ).toFixed( 2 ) )

	const waitDaysElement = Elements.data.waitDays
	waitDaysElement.noNft.set( `${ dailyWaitTotal.toFixed( 2 ) } CRN` )
	waitDaysElement.noNftUsd.set( `$${ ( dailyWaitTotal * priceData.crnUsd ).toFixed( 2 ) }` )
	waitDaysElement.noNftCro.set( ( dailyWaitTotal * priceData.crnCro ).toFixed( 2 ) )
	waitDaysElement.bronzeNft.set( `${ applyBoost( dailyWaitTotal, BoostNfts.bronze ).toFixed( 2 ) } CRN` )
	waitDaysElement.bronzeNftUsd.set( `$${ ( applyBoost( dailyWaitTotal, BoostNfts.bronze ) * priceData.crnUsd ).toFixed( 2 ) }` )
	waitDaysElement.bronzeNftCro.set( ( applyBoost( dailyWaitTotal, BoostNfts.bronze ) * priceData.crnCro ).toFixed( 2 ) )
	waitDaysElement.silverNft.set( `${ applyBoost( dailyWaitTotal, BoostNfts.silver ).toFixed( 2 ) } CRN` )
	waitDaysElement.silverNftUsd.set( `$${ ( applyBoost( dailyWaitTotal, BoostNfts.silver ) * priceData.crnUsd ).toFixed( 2 ) }` )
	waitDaysElement.silverNftCro.set( ( applyBoost( dailyWaitTotal, BoostNfts.silver ) * priceData.crnCro ).toFixed( 2 ) )
	waitDaysElement.goldNft.set( `${ applyBoost( dailyWaitTotal, BoostNfts.gold ).toFixed( 2 ) } CRN` )
	waitDaysElement.goldNftUsd.set( `$${ ( applyBoost( dailyWaitTotal, BoostNfts.gold ) * priceData.crnUsd ).toFixed( 2 ) }` )
	waitDaysElement.goldNftCro.set( ( applyBoost( dailyWaitTotal, BoostNfts.gold ) * priceData.crnCro ).toFixed( 2 ) )

	const monthlyFeeElement = Elements.data.monthlyFees
	monthlyFeeElement.tierOne.set( monthlyFees.tierOne.toFixed( 2 ) )
	monthlyFeeElement.tierOneUsd.set( `$${ ( monthlyFees.tierOne * priceData.croUsd ).toFixed( 2 ) }` )
	monthlyFeeElement.tierOneCrn.set( ( monthlyFees.tierOne * priceData.croCrn ).toFixed( 2 ) )
	monthlyFeeElement.tierTwo.set( monthlyFees.tierTwo.toFixed( 2 ) )
	monthlyFeeElement.tierTwoUsd.set( `$${ ( monthlyFees.tierTwo * priceData.croUsd ).toFixed( 2 ) }` )
	monthlyFeeElement.tierTwoCrn.set( ( monthlyFees.tierTwo * priceData.croCrn ).toFixed( 2 ) )
	monthlyFeeElement.tierThree.set( monthlyFees.tierThree.toFixed( 2 ) )
	monthlyFeeElement.tierThreeUsd.set( `${ ( monthlyFees.tierThree * priceData.croUsd ).toFixed( 2 ) }` )
	monthlyFeeElement.tierThreeCrn.set( ( monthlyFees.tierThree * priceData.croCrn ).toFixed( 2 ) )
	monthlyFeeElement.tierFour.set( monthlyFees.tierFour.toFixed( 2 ) )
	monthlyFeeElement.tierFourUsd.set( `$${ ( monthlyFees.tierFour * priceData.croUsd ).toFixed( 2 ) }` )
	monthlyFeeElement.tierFourCrn.set( ( monthlyFees.tierFour * priceData.croCrn ).toFixed( 2 ) )
	monthlyFeeElement.total.set( monthlyFees.total.toFixed( 2 ) )
	monthlyFeeElement.totalUsd.set( `$${ ( monthlyFees.total * priceData.croUsd ).toFixed( 2 ) }` )
	monthlyFeeElement.totalCrn.set( ( monthlyFees.total * priceData.croCrn ).toFixed( 2 ) )
}

/** @returns { Promise< PriceData > } */
export const getPrices = async () => {
	const /** @type { number } */ croUsd = ( await axios.get( Constants.croUsdCGUrl ) ).data[ 'crypto-com-chain' ][ 'usd' ],
		/** @type { number } */ crnUsd = ( await axios.get( Constants.crnUsdCGUrl ) ).data[ 'cronodes' ][ 'usd' ],
		croCrn = croUsd / crnUsd,
		crnCro = crnUsd / croUsd

	Elements.data.prices.croUsd.set( `$${ croUsd.toFixed( 2 ) }` )
	Elements.data.prices.croCrn.set( croCrn.toFixed( 2 ) )
	Elements.data.prices.crnUsd.set( crnUsd.toFixed( 2 ) )
	Elements.data.prices.crnCro.set( crnCro.toFixed( 2 ) )

	return {
		croUsd,
		croCrn,
		crnUsd,
		crnCro
	}
}

export const printError = exception => {
	console.info( '========================================' )
	console.warn( `An Error Has Occurred: ${ typeof exception }` )
	console.info( '========================================' )
	console.warn( 'Please Contact The Developer' )
	console.info( '========================================' )
	console.warn( exception )
	console.info( '========================================' )
	window.alert( 'An Error Has Occurred, Contact The Developer' )
}

export const connectToMetamask = async () => {
	if ( window.ethereum ) {
		const rpcProvider = new Web3Provider( window.ethereum, 'any' )

		await rpcProvider.send( 'eth_requestAccounts', [] )

		return rpcProvider
	}
}

/**
 * My other repo has most of the contract functions and events
 * @param { Web3Provider } rpcProvider
 */
export const getNodes = async ( rpcProvider ) => {
	const result = await ( new Contract(
		Constants.v2NodeManagementContractAddress,

		[ {
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "getAllNodes",
			"outputs": [
				{
					"components": [
						{
							"internalType": "string",
							"name": "name",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "nodeTier",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "creationTime",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "lastClaimTime",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "lastPaidTime",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "paymentDueTime",
							"type": "uint256"
						},
						{
							"internalType": "bool",
							"name": "hasMonthlyFee",
							"type": "bool"
						},
						{
							"internalType": "uint256",
							"name": "extendedParam1",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "extendedParam2",
							"type": "uint256"
						}
					],
					"internalType": "struct CRNNodesManagement.NodeEntity[]",
					"name": "_nodes",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		} ],

		rpcProvider
	) ).getAllNodes( await rpcProvider.getSigner().getAddress() )

	console.log( result )
}