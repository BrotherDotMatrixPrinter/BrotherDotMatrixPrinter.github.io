/** @typedef { import( '../model/TotalData' ).default } TotalData */

import '../css/component/Totals.css'

/**
 * @typedef { Object } TotalsProps
 * @property { TotalData } totalData
 */

/** @param { TotalsProps } props */
const Totals = props => {

	return <div id = 'Totals'>

		<table>

			<tbody>
				<tr>
					<td>Total Nodes:</td>
					<td>{ props.totalData.totalNodes }</td>
				</tr>

				<tr>
					<td>Total Cost:</td>
					<td>{ props.totalData.cost.toFixed( 2 ) } CRN</td>
				</tr>

				<tr>
					<td>Monthly Fees:</td>
					<td>{ props.totalData.monthlyFees.toFixed( 2 ) } CRO</td>
				</tr>

				<tr>
					<td>Daily Reward:</td>
					<td>{ props.totalData.dailyReward.toFixed( 2 ) } CRN</td>
				</tr>

				<tr>
					<td>Total Reward<br/>Before Tax:</td>
					<td><br/>{ props.totalData.totalRewardBeforeTax.toFixed( 2 ) } CRN</td>
				</tr>
			</tbody>

			<tbody>
				<tr>
					<td>Tax Percentage:</td>
					<td>{ ( props.totalData.tax * 100 ).toFixed( 2 ) }%</td>
				</tr>

				<tr>
					<td>Tax Amount:</td>
					<td>{ props.totalData.totalTaxed.toFixed( 2 ) } CRN</td>
				</tr>

				<tr>
					<td>Total Reward<br/>After Tax:</td>
					<td><br/>{ props.totalData.totalRewardAfterTax.toFixed( 2 ) } CRN</td>
				</tr>
			</tbody>

			<tbody>
				<tr>
					<td>Boost Percentage:</td>
					<td>{ ( props.totalData.boost * 100 ).toFixed( 2 ) }%</td>
				</tr>

				<tr>
					<td>Boost Amount:</td>
					<td>{ props.totalData.totalBoosted.toFixed( 2 ) } CRN</td>
				</tr>

				<tr>
					<td>Total Reward<br/>After Boost:</td>
					<td><br/>{ props.totalData.totalRewardAfterBoost.toFixed( 2 ) } CRN</td>
				</tr>
			</tbody>

			<tbody>
				<tr>
					<td>ROI in CRN<br/>(approximate):</td>
					<td><br/>{ ( ( props.totalData.roi * props.totalData.daysWaited ) || 0 ).toFixed( 2 ) } Days</td>
				</tr>
			</tbody>

		</table>

	</div>

}

export default Totals
