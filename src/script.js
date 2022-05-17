import Elements from './class/Elements.js'
import { getUserInputs, getDailyRewards, getMonthlyFees, getTax, setWaitDaysTaxDisplay, applyTax, updateDisplay, getPrices } from './util/Functions.js'

/** @typedef { import( './util/Functions' ).PriceData } PriceData */

/** @param { PriceData } priceData */
const getNodes = priceData => {
	const { waitDays, hasTaxNft, nodeAmounts } = getUserInputs(),
		dailyReward = getDailyRewards( nodeAmounts ),
		monthlyFees = getMonthlyFees( nodeAmounts )

	const dailyWaitTax = getTax( waitDays, hasTaxNft ),
		dailyWaitTotal = applyTax( dailyReward.total * waitDays, dailyWaitTax )

	setWaitDaysTaxDisplay( dailyWaitTax )
	updateDisplay( nodeAmounts, dailyReward, monthlyFees, dailyWaitTotal, priceData )
}

window.addEventListener( 'load', () => { ( async () => {
	const priceData = await getPrices()

	Elements.inputs.hasTaxNft.get().addEventListener( 'input', () => getNodes( priceData ), false )
	Elements.inputs.waitDays.get().addEventListener( 'input', () => getNodes( priceData ), false )
	Elements.inputs.tierOneNodeAmount.get().addEventListener( 'input', () => getNodes( priceData ), false )
	Elements.inputs.tierTwoNodeAmount.get().addEventListener( 'input', () => getNodes( priceData ), false )
	Elements.inputs.tierThreeNodeAmount.get().addEventListener( 'input', () => getNodes( priceData ), false )
	Elements.inputs.tierFourNodeAmount.get().addEventListener( 'input', () => getNodes( priceData ), false )
} )() }, false )