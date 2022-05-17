import DataNode from './DataNode.js'

export default class Elements {

	static inputs = {
		tierOneNodeAmount: new DataNode( 'tier-one-node-amount-user-input' ),
		tierTwoNodeAmount: new DataNode( 'tier-two-node-amount-user-input' ),
		tierThreeNodeAmount: new DataNode( 'tier-three-node-amount-user-input' ),
		tierFourNodeAmount: new DataNode( 'tier-four-node-amount-user-input' ),
		waitDays: new DataNode( 'user-wait-days' ),
		hasTaxNft: new DataNode( 'user-has-tax-nft' )
	}

	static data = {
		tierOne: {
			noNft: new DataNode( 'tier-one-daily-reward-user-data' ),
			bronzeNft: new DataNode( 'tier-one-daily-reward-with-bronze-nft' ),
			silverNft: new DataNode( 'tier-one-daily-reward-with-silver-nft' ),
			goldNft: new DataNode( 'tier-one-daily-reward-with-gold-nft' )
		},

		tierTwo: {
			noNft: new DataNode( 'tier-two-daily-reward-user-data' ),
			bronzeNft: new DataNode( 'tier-two-daily-reward-with-bronze-nft' ),
			silverNft: new DataNode( 'tier-two-daily-reward-with-silver-nft' ),
			goldNft: new DataNode( 'tier-two-daily-reward-with-gold-nft' )
		},

		tierThree: {
			noNft: new DataNode( 'tier-three-daily-reward-user-data' ),
			bronzeNft: new DataNode( 'tier-three-daily-reward-with-bronze-nft' ),
			silverNft: new DataNode( 'tier-three-daily-reward-with-silver-nft' ),
			goldNft: new DataNode( 'tier-three-daily-reward-with-gold-nft' )
		},

		tierFour: {
			noNft: new DataNode( 'tier-four-daily-reward-user-data' ),
			bronzeNft: new DataNode( 'tier-four-daily-reward-with-bronze-nft' ),
			silverNft: new DataNode( 'tier-four-daily-reward-with-silver-nft' ),
			goldNft: new DataNode( 'tier-four-daily-reward-with-gold-nft' )
		},

		total: {
			nodeAmount: new DataNode( 'total-node-amount-user-data' ),
			noNft: new DataNode( 'total-daily-reward-user-data' ),
			noNftUsd: new DataNode( 'total-daily-reward-user-data-usd' ),
			noNftCro: new DataNode( 'total-daily-reward-user-data-cro' ),
			bronzeNft: new DataNode( 'total-daily-reward-with-bronze-nft' ),
			bronzeNftUsd: new DataNode( 'total-daily-reward-with-bronze-nft-usd' ),
			bronzeNftCro: new DataNode( 'total-daily-reward-with-bronze-nft-cro' ),
			silverNft: new DataNode( 'total-daily-reward-with-silver-nft' ),
			silverNftUsd: new DataNode( 'total-daily-reward-with-silver-nft-usd' ),
			silverNftCro: new DataNode( 'total-daily-reward-with-silver-nft-cro' ),
			goldNft: new DataNode( 'total-daily-reward-with-gold-nft' ),
			goldNftUsd: new DataNode( 'total-daily-reward-with-gold-nft-usd' ),
			goldNftCro: new DataNode( 'total-daily-reward-with-gold-nft-cro' )
		},

		waitDays: {
			tax: new DataNode( 'user-wait-days-tax' ),
			noNft: new DataNode( 'user-wait-days-no-nft' ),
			noNftUsd: new DataNode( 'user-wait-days-no-nft-usd' ),
			noNftCro: new DataNode( 'user-wait-days-no-nft-cro' ),
			bronzeNft: new DataNode( 'user-wait-days-bronze-nft' ),
			bronzeNftUsd: new DataNode( 'user-wait-days-bronze-nft-usd' ),
			bronzeNftCro: new DataNode( 'user-wait-days-bronze-nft-cro' ),
			silverNft: new DataNode( 'user-wait-days-silver-nft' ),
			silverNftUsd: new DataNode( 'user-wait-days-silver-nft-usd' ),
			silverNftCro: new DataNode( 'user-wait-days-silver-nft-cro' ),
			goldNft: new DataNode( 'user-wait-days-gold-nft' ),
			goldNftUsd: new DataNode( 'user-wait-days-gold-nft-usd' ),
			goldNftCro: new DataNode( 'user-wait-days-gold-nft-cro' )
		},

		monthlyFees: {
			tierOne: new DataNode( 'tier-one-monthly-fee-user-data' ),
			tierOneUsd: new DataNode( 'tier-one-monthly-fee-user-data-usd' ),
			tierOneCrn: new DataNode( 'tier-one-monthly-fee-user-data-crn' ),
			tierTwo: new DataNode( 'tier-two-monthly-fee-user-data' ),
			tierTwoUsd: new DataNode( 'tier-two-monthly-fee-user-data-usd' ),
			tierTwoCrn: new DataNode( 'tier-two-monthly-fee-user-data-crn' ),
			tierThree: new DataNode( 'tier-three-monthly-fee-user-data' ),
			tierThreeUsd: new DataNode( 'tier-three-monthly-fee-user-data-usd' ),
			tierThreeCrn: new DataNode( 'tier-three-monthly-fee-user-data-crn' ),
			tierFour: new DataNode( 'tier-four-monthly-fee-user-data' ),
			tierFourUsd: new DataNode( 'tier-four-monthly-fee-user-data-usd' ),
			tierFourCrn: new DataNode( 'tier-four-monthly-fee-user-data-crn' ),
			total: new DataNode( 'total-monthly-fee-user-data' ),
			totalUsd: new DataNode( 'total-monthly-fee-user-data-usd' ),
			totalCrn: new DataNode( 'total-monthly-fee-user-data-crn' )
		},

		prices: {
			croUsd: new DataNode( 'cro-current-price-usd' ),
			croCrn: new DataNode( 'cro-current-price-crn' ),
			crnUsd: new DataNode( 'crn-current-price-usd' ),
			crnCro: new DataNode( 'crn-current-price-cro' )
		}
	}

}