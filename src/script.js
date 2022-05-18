import Elements from './class/Elements.js'
import { getUserInputs, getDailyRewards, getMonthlyFees, getTax, setWaitDaysTaxDisplay, applyTax, updateDisplay, getPrices, printError, connectToMetamask, getNodes } from './util/Functions.js'

/** @typedef { import( './util/Functions' ).PriceData } PriceData */

/** @param { PriceData } priceData */
const run = priceData => {
	const { waitDays, hasTaxNft, nodeAmounts } = getUserInputs(),
		dailyReward = getDailyRewards( nodeAmounts ),
		monthlyFees = getMonthlyFees( nodeAmounts )

	const dailyWaitTax = getTax( waitDays, hasTaxNft ),
		dailyWaitTotal = applyTax( dailyReward.total * waitDays, dailyWaitTax )

	setWaitDaysTaxDisplay( dailyWaitTax )
	updateDisplay( nodeAmounts, dailyReward, monthlyFees, dailyWaitTotal, priceData )
}

window.addEventListener( 'load', () => { ( async () => {
	try {
		let priceData = await getPrices()

		Elements.inputs.hasTaxNft.onInput( () => run( priceData ) )
		Elements.inputs.waitDays.onInput( () => run( priceData ) )
		Elements.inputs.tierOneNodeAmount.onInput( () => run( priceData ) )
		Elements.inputs.tierTwoNodeAmount.onInput( () => run( priceData ) )
		Elements.inputs.tierThreeNodeAmount.onInput( () => run( priceData ) )
		Elements.inputs.tierFourNodeAmount.onInput( () => run( priceData ) )

		Elements.inputs.refreshPricesButton.onClick( () => { ( async () => {
			try {
				priceData = await getPrices()
			} catch ( exception ) {
				printError( exception )
			}

			run( priceData )
		} )() } )

		Elements.inputs.connectMetamaskButton.onClick( () => { ( async () => {
			try {
				const rpcProvider = await connectToMetamask()

				console.info( await getNodes( rpcProvider ) )
			} catch ( exception ) {
				console.warn( exception )
			}
		} )() } )
	} catch ( exception ) {
		printError( exception )
	}
} )() }, false )