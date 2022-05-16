/**
 * @param { number? } days Number of days to wait before claiming.
 * @param { boolean? } hasTaxNft Wether or not to to include the tax NFT modifier.
 * @returns { 0.50 | 0.40 | 0.30 | 0.10 | 0.05 } Percentage tax.
 */
const tax = ( days = 30, hasTaxNft = false ) => {

	if ( days <= 0 || typeof days !== 'number' || typeof hasTaxNft !== 'boolean' )
		throw new Error( `tax(days: ${days}, hasTaxNft: ${hasTaxNft}): invalid argument` )

	switch ( true ) {

		case days >= 0 && days <= 5: return 0.50
		case days >= 6 && days <= 10: return 0.40
		case days >= 11 && days <= 15: return 0.30
		case days > 15 && ! hasTaxNft: return 0.10
		case days > 15 && hasTaxNft: return 0.05

	}

}

/**
 * @param { number } value
 * @param { number } tax
 * @returns { number }
 */
const applyTax = ( value, tax ) => value - ( value * tax )

const tiers = {

	one: {

		crnCostPerNode: 10.00,
		crnRewardPerDay: 0.06,
		monthlyCROFee: 2.00

	},

	two: {

		crnCostPerNode: 20.00,
		crnRewardPerDay: 0.18,
		monthlyCROFee: 10.00

	},

	three: {

		crnCostPerNode: 55.00,
		crnRewardPerDay: 0.57,
		monthlyCROFee: 20.00

	},

	four: {

		crnCostPerNode: 110.00,
		crnRewardPerDay: 1.20,
		monthlyCROFee: 40.00

	}

}

const boostNfts = {

	bronze: 0.02,
	silver: 0.05,
	gold: 0.10

}

const getNodes = _ => {

	/** @type { boolean } */
	const hasTaxNft = document.getElementById( 'user-has-tax-nft' ).checked

	const nodeAmount = {

		one: parseInt( document.getElementById( 'tier-one-node-amount-user-input' ).value ),
		two: parseInt( document.getElementById( 'tier-two-node-amount-user-input' ).value ),
		three: parseInt( document.getElementById( 'tier-three-node-amount-user-input' ).value ),
		four: parseInt( document.getElementById( 'tier-four-node-amount-user-input' ).value ),
		total: 0

	}

	nodeAmount.total = nodeAmount.one + nodeAmount.two + nodeAmount.three + nodeAmount.four

	const dailyReward = {

		one: nodeAmount.one * tiers.one.crnRewardPerDay,
		two: nodeAmount.two * tiers.two.crnRewardPerDay,
		three: nodeAmount.three * tiers.three.crnRewardPerDay,
		four: nodeAmount.four * tiers.four.crnRewardPerDay,
		total: 0

	}

	dailyReward.total = dailyReward.one + dailyReward.two + dailyReward.three + dailyReward.four

	const monthlyReward = {

		one: applyTax( ( dailyReward.one * 30 ), tax( 30, hasTaxNft ) ),
		two: applyTax( ( dailyReward.two * 30 ), tax( 30, hasTaxNft) ),
		three: applyTax( ( dailyReward.three * 30 ), tax( 30, hasTaxNft) ),
		four: applyTax( ( dailyReward.four * 30 ), tax( 30, hasTaxNft) ),
		total: 0

	}

	monthlyReward.total = applyTax( ( monthlyReward.one + monthlyReward.two + monthlyReward.three + monthlyReward.four ), tax( 30, hasTaxNft ) )

	const monthlyFee = {

		one: nodeAmount.one * tiers.one.monthlyCROFee,
		two: nodeAmount.two * tiers.two.monthlyCROFee,
		three: nodeAmount.three * tiers.three.monthlyCROFee,
		four: nodeAmount.four * tiers.four.monthlyCROFee,
		total: 0

	}

	monthlyFee.total = monthlyFee.one + monthlyFee.two + monthlyFee.three + monthlyFee.four

	// Set Total Nodes
	document.getElementById( 'total-node-amount-user-data' ).innerHTML = `${ nodeAmount.total.toFixed( 0 ) } Nodes`

	// Set Tier One Data
	document.getElementById( 'tier-one-daily-reward-user-data' ).innerHTML = `${ dailyReward.one.toFixed( 2 ) } CRN`
	document.getElementById( 'tier-one-daily-reward-with-bronze-nft' ).innerHTML = `${ ( dailyReward.one + ( dailyReward.one * boostNfts.bronze ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-one-daily-reward-with-silver-nft' ).innerHTML = `${ ( dailyReward.one + ( dailyReward.one * boostNfts.silver ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-one-daily-reward-with-gold-nft' ).innerHTML = `${ ( dailyReward.one + ( dailyReward.one * boostNfts.gold ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-one-monthly-reward-user-data' ).innerHTML = `${ monthlyReward.one.toFixed( 2 ) } CRN`
	document.getElementById( 'tier-one-monthly-reward-with-bronze-nft' ).innerHTML = `${ ( monthlyReward.one + ( monthlyReward.one * boostNfts.bronze ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-one-monthly-reward-with-silver-nft' ).innerHTML = `${ ( monthlyReward.one + ( monthlyReward.one * boostNfts.silver ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-one-monthly-reward-with-gold-nft' ).innerHTML = `${ ( monthlyReward.one + ( monthlyReward.one * boostNfts.gold ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-one-monthly-fee-user-data' ).innerHTML = `${ monthlyFee.one.toFixed( 2 ) } CRO`

	// Set Tier Two Data
	document.getElementById( 'tier-two-daily-reward-user-data' ).innerHTML = `${ dailyReward.two.toFixed( 2 ) } CRN`
	document.getElementById( 'tier-two-daily-reward-with-bronze-nft' ).innerHTML = `${ ( dailyReward.two + ( dailyReward.two * boostNfts.bronze ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-two-daily-reward-with-silver-nft' ).innerHTML = `${ ( dailyReward.two + ( dailyReward.two * boostNfts.silver ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-two-daily-reward-with-gold-nft' ).innerHTML = `${ ( dailyReward.two + ( dailyReward.two * boostNfts.gold ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-two-monthly-reward-user-data' ).innerHTML = `${ monthlyReward.two.toFixed( 2 ) } CRN`
	document.getElementById( 'tier-two-monthly-reward-with-bronze-nft' ).innerHTML = `${ ( monthlyReward.two + ( monthlyReward.two * boostNfts.bronze ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-two-monthly-reward-with-silver-nft' ).innerHTML = `${ ( monthlyReward.two + ( monthlyReward.two * boostNfts.silver ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-two-monthly-reward-with-gold-nft' ).innerHTML = `${ ( monthlyReward.two + ( monthlyReward.two * boostNfts.gold ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-two-monthly-fee-user-data' ).innerHTML = `${ monthlyFee.two.toFixed( 2 ) } CRO`

	// Set Tier Three Data
	document.getElementById( 'tier-three-daily-reward-user-data' ).innerHTML = `${ dailyReward.three.toFixed( 2 ) } CRN`
	document.getElementById( 'tier-three-daily-reward-with-bronze-nft' ).innerHTML = `${ ( dailyReward.three + ( dailyReward.three * boostNfts.bronze ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-three-daily-reward-with-silver-nft' ).innerHTML = `${ ( dailyReward.three + ( dailyReward.three * boostNfts.silver ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-three-daily-reward-with-gold-nft' ).innerHTML = `${ ( dailyReward.three + ( dailyReward.three * boostNfts.gold ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-three-monthly-reward-user-data' ).innerHTML = `${ monthlyReward.three.toFixed( 2 ) } CRN`
	document.getElementById( 'tier-three-monthly-reward-with-bronze-nft' ).innerHTML = `${ ( monthlyReward.three + ( monthlyReward.three * boostNfts.bronze ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-three-monthly-reward-with-silver-nft' ).innerHTML = `${ ( monthlyReward.three + ( monthlyReward.three * boostNfts.silver ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-three-monthly-reward-with-gold-nft' ).innerHTML = `${ ( monthlyReward.three + ( monthlyReward.three * boostNfts.gold ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-three-monthly-fee-user-data' ).innerHTML = `${ monthlyFee.three.toFixed( 2 ) } CRO`

	// Set Tier Four Data
	document.getElementById( 'tier-four-daily-reward-user-data' ).innerHTML = `${ dailyReward.four.toFixed( 2 ) } CRN`
	document.getElementById( 'tier-four-daily-reward-with-bronze-nft' ).innerHTML = `${ ( dailyReward.four + ( dailyReward.four * boostNfts.bronze ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-four-daily-reward-with-silver-nft' ).innerHTML = `${ ( dailyReward.four + ( dailyReward.four * boostNfts.silver ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-four-daily-reward-with-gold-nft' ).innerHTML = `${ ( dailyReward.four + ( dailyReward.four * boostNfts.gold ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-four-monthly-reward-user-data' ).innerHTML = `${ monthlyReward.four.toFixed( 2 ) } CRN`
	document.getElementById( 'tier-four-monthly-reward-with-bronze-nft' ).innerHTML = `${ ( monthlyReward.four + ( monthlyReward.four * boostNfts.bronze ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-four-monthly-reward-with-silver-nft' ).innerHTML = `${ ( monthlyReward.four + ( monthlyReward.four * boostNfts.silver ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-four-monthly-reward-with-gold-nft' ).innerHTML = `${ ( monthlyReward.four + ( monthlyReward.four * boostNfts.gold ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'tier-four-monthly-fee-user-data' ).innerHTML = `${ monthlyFee.four.toFixed( 2 ) } CRO`

	// Set Total Data
	document.getElementById( 'total-daily-reward-user-data' ).innerHTML = `${ dailyReward.total.toFixed( 2 ) } CRN`
	document.getElementById( 'total-daily-reward-with-bronze-nft' ).innerHTML = `${ ( dailyReward.total + ( dailyReward.total * boostNfts.bronze ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'total-daily-reward-with-silver-nft' ).innerHTML = `${ ( dailyReward.total + ( dailyReward.total * boostNfts.silver ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'total-daily-reward-with-gold-nft' ).innerHTML = `${ ( dailyReward.total + ( dailyReward.total * boostNfts.gold ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'total-monthly-reward-user-data' ).innerHTML = `${ monthlyReward.total.toFixed( 2 ) } CRN`
	document.getElementById( 'total-monthly-reward-with-bronze-nft' ).innerHTML = `${ ( monthlyReward.total + ( monthlyReward.total * boostNfts.bronze ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'total-monthly-reward-with-silver-nft' ).innerHTML = `${ ( monthlyReward.total + ( monthlyReward.total * boostNfts.silver ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'total-monthly-reward-with-gold-nft' ).innerHTML = `${ ( monthlyReward.total + ( monthlyReward.total * boostNfts.gold ) ).toFixed( 2 ) } CRN`
	document.getElementById( 'total-monthly-fee-user-data' ).innerHTML = `${ monthlyFee.total.toFixed( 2 ) } CRO`

}

window.addEventListener( 'load', () => {

	document.getElementById( 'user-has-tax-nft' ).addEventListener( 'input', getNodes, false )
	document.getElementById( 'tier-one-node-amount-user-input' ).addEventListener( 'input', getNodes, false )
	document.getElementById( 'tier-two-node-amount-user-input' ).addEventListener( 'input', getNodes, false )
	document.getElementById( 'tier-three-node-amount-user-input' ).addEventListener( 'input', getNodes, false )
	document.getElementById( 'tier-four-node-amount-user-input' ).addEventListener( 'input', getNodes, false )

}, false )