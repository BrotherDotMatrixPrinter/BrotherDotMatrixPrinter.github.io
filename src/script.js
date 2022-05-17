import Elements from './class/Elements.js'
import { getUserInputs, getDailyRewards, getMonthlyFees, getTax, setWaitDaysTaxDisplay, applyTax, updateDisplay } from './util/Functions.js'

const getNodes = _ => {
	const { waitDays, hasTaxNft, nodeAmounts } = getUserInputs(),
		dailyReward = getDailyRewards( nodeAmounts ),
		monthlyFees = getMonthlyFees( nodeAmounts )

	const dailyWaitTax = getTax( waitDays, hasTaxNft ),
		dailyWaitTotal = applyTax( dailyReward.total * waitDays, dailyWaitTax )

	setWaitDaysTaxDisplay( dailyWaitTax )
	updateDisplay( nodeAmounts, dailyReward, monthlyFees, dailyWaitTotal )
}

window.addEventListener( 'load', () => {
	Elements.inputs.hasTaxNft.get().addEventListener( 'input', getNodes, false )
	Elements.inputs.waitDays.get().addEventListener( 'input', getNodes, false )
	Elements.inputs.tierOneNodeAmount.get().addEventListener( 'input', getNodes, false )
	Elements.inputs.tierTwoNodeAmount.get().addEventListener( 'input', getNodes, false )
	Elements.inputs.tierThreeNodeAmount.get().addEventListener( 'input', getNodes, false )
	Elements.inputs.tierFourNodeAmount.get().addEventListener( 'input', getNodes, false )
}, false )