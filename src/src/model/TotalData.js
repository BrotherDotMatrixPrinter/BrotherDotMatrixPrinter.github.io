import Tiers from '../constant/Tiers.js'

/** @typedef { import( './UserData' ).default } UserData */

class TotalData {
	daysWaited = 0

	totalNodes = 0

	/** CRN */
	cost = 0

	/** CRO */
	monthlyFees = 0

	/** CRN */
	dailyReward = 0

	tax = 0

	/** CRN */
	totalRewardBeforeTax = 0

	/** CRN */
	totalTaxed = 0

	/** CRN */
	totalRewardAfterTax = 0

	boost = 0

	/** CRN */
	totalBoosted = 0

	/** CRN */
	totalRewardAfterBoost = 0

	roi = 0

	/** @param { UserData } userData */
	constructor( userData ) {
		this.daysWaited = userData.daysUntilClaim

		this.totalNodes = userData.tierOne
		this.totalNodes += userData.tierTwo
		this.totalNodes += userData.tierThree
		this.totalNodes += userData.tierFour

		this.cost = userData.tierOne * Tiers.one.crnCostPerNode
		this.cost += userData.tierTwo * Tiers.two.crnCostPerNode
		this.cost += userData.tierThree * Tiers.three.crnCostPerNode
		this.cost += userData.tierFour * Tiers.four.crnCostPerNode

		this.monthlyFees = userData.tierOne * Tiers.one.monthlyCROFee
		this.monthlyFees += userData.tierTwo * Tiers.two.monthlyCROFee
		this.monthlyFees += userData.tierThree * Tiers.three.monthlyCROFee
		this.monthlyFees += userData.tierFour * Tiers.four.monthlyCROFee

		this.dailyReward = userData.tierOne * Tiers.one.crnRewardPerDay
		this.dailyReward += userData.tierTwo * Tiers.two.crnRewardPerDay
		this.dailyReward += userData.tierThree * Tiers.three.crnRewardPerDay
		this.dailyReward += userData.tierFour * Tiers.four.crnRewardPerDay

		// eslint-disable-next-line default-case
		switch( true ) {
			case userData.daysUntilClaim < 6:
				this.tax = 0.5
				break
			case userData.daysUntilClaim < 11:
				this.tax = 0.4
				break
			case userData.daysUntilClaim < 15:
				this.tax = 0.3
				break
			case ! userData.taxNft:
				this.tax = 0.1
				break
			case userData.taxNft:
				this.tax = 0.05
				break
		}

		this.totalRewardBeforeTax = this.dailyReward * userData.daysUntilClaim
		this.totalTaxed = this.totalRewardBeforeTax * this.tax
		this.totalRewardAfterTax = this.totalRewardBeforeTax - this.totalTaxed

		// eslint-disable-next-line default-case
		switch( userData.boostNft ) {
			case 'none':
				this.boost = 0
				this.totalBoosted = 0
				break
			case 'bronze':
				this.boost = 0.02
				this.totalBoosted = this.totalRewardAfterTax * 0.02
				break
			case 'silver':
				this.boost = 0.05
				this.totalBoosted = this.totalRewardAfterTax * 0.05
				break
			case 'gold':
				this.boost = 0.1
				this.totalBoosted = this.totalRewardAfterTax * 0.1
				break
		}

		this.totalRewardAfterBoost = this.totalRewardAfterTax + this.totalBoosted
		this.roi = this.cost / this.totalRewardAfterBoost
	}
}

export default TotalData
