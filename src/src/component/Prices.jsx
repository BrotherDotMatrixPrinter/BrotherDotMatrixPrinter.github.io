import '../css/component/Prices.css'

/** @typedef { import( '../model/PriceData' ).default } PriceData */

/**
 * @typedef { Object } PricesProps
 * @property { PriceData } priceData
 */

/** @param { PricesProps } props */
const Prices = props => {
	return <div id = 'Prices'>

		<table>

			<thead><tr><th>CRO</th></tr></thead>

			<tbody style = { { marginBottom: '32px' } }>
				<tr>
					<td>${ props.priceData.croUsd.toFixed( 2 ) } USD</td>
					<td>{ props.priceData.croCrn.toFixed( 2 ) } CRN</td>
				</tr>
			</tbody>

			<thead><tr><th>CRN</th></tr></thead>

			<tbody>
				<tr>
					<td>${ props.priceData.crnUsd.toFixed( 2 ) } USD</td>
					<td>{ props.priceData.crnCro.toFixed( 2 ) } CRO</td>
				</tr>
			</tbody>

		</table>

	</div>
}

export default Prices
