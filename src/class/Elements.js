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
			bronzeNft: new DataNode( 'total-daily-reward-with-bronze-nft' ),
			silverNft: new DataNode( 'total-daily-reward-with-silver-nft' ),
			goldNft: new DataNode( 'total-daily-reward-with-gold-nft' )
		},

		waitDays: {
			tax: new DataNode( 'user-wait-days-tax' ),
			noNft: new DataNode( 'user-wait-days-no-nft' ),
			bronzeNft: new DataNode( 'user-wait-days-bronze-nft' ),
			silverNft: new DataNode( 'user-wait-days-silver-nft' ),
			goldNft: new DataNode( 'user-wait-days-gold-nft' )
		},

		monthlyFees: {
			tierOne: new DataNode( 'tier-one-monthly-fee-user-data' ),
			tierTwo: new DataNode( 'tier-two-monthly-fee-user-data' ),
			tierThree: new DataNode( 'tier-three-monthly-fee-user-data' ),
			tierFour: new DataNode( 'tier-four-monthly-fee-user-data' ),
			total: new DataNode( 'total-monthly-fee-user-data' )
		}
	}

}