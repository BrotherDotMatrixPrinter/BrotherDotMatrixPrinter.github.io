import axios from 'axios'
import Urls from '../constant/Urls.js'

class PriceData {
	croUsd = 0
	croCrn = 0
	crnUsd = 0
	crnCro = 0

	/**
	 * @param { number } croUsd
	 * @param { number } croCrn
	 * @param { number } crnUsd
	 * @param { number } crnCro
	 */
	constructor(
		croUsd = 0,
		croCrn = 0,
		crnUsd = 0,
		crnCro = 0
	) {
		this.croUsd = croUsd
		this.croCrn = croCrn
		this.crnUsd = crnUsd
		this.crnCro = crnCro
	}

	/** @param { ( priceData: PriceData ) => void } setPriceData */
	async getData( setPriceData ) {

		const croUsd = ( await axios.get( Urls.croUsdCGUrl ) ).data[ 'crypto-com-chain' ][ 'usd' ],
			crnUsd = ( await axios.get( Urls.crnUsdCGUrl ) ).data[ 'cronodes' ][ 'usd' ]

		const newPriceData = new PriceData(
			croUsd,
			croUsd / crnUsd,
			crnUsd,
			crnUsd / croUsd
		)

		setPriceData( newPriceData )
	}
}

export default PriceData
