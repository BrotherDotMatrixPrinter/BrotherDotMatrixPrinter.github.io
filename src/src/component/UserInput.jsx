import '../css/component/UserInput.css'

/** @typedef { import( '../model/UserData' ).default } UserData */

/**
 * @typedef { Object } UserInputProps
 * @property { UserData } userData
 * @property { ( userData: UserData ) => void } setUserData
 */

/** @param { UserInputProps } props */
const UserInput = props => {

	/** @param { Event } e */
	const onChangeTierOneAmount = e => {
		const newUserData = { ...props.userData }

		newUserData.tierOne = parseInt( e.target.value )

		props.setUserData( newUserData )
	}

	/** @param { Event } e */
	const onChangeTierTwoAmount = e => {
		const newUserData = { ...props.userData }

		newUserData.tierTwo = parseInt( e.target.value )

		props.setUserData( newUserData )
	}

	/** @param { Event } e */
	const onChangeTierThreeAmount = e => {
		const newUserData = { ...props.userData }

		newUserData.tierThree = parseInt( e.target.value )

		props.setUserData( newUserData )
	}

	/** @param { Event } e */
	const onChangeTierFourAmount = e => {
		const newUserData = { ...props.userData }

		newUserData.tierFour = parseInt( e.target.value )

		props.setUserData( newUserData )
	}

	/** @param { Event } e */
	const onChangeTaxNft = e => {
		const newUserData = { ...props.userData }

		newUserData.taxNft = e.target.checked

		props.setUserData( newUserData )
	}

	/** @param { Event } e */
	const onChangeBoostNft = e => {
		const newUserData = { ...props.userData }

		newUserData.boostNft = e.target.value

		props.setUserData( newUserData )
	}

	/** @param { Event } e */
	const onChangeDaysUntilClaim = e => {
		const newUserData = { ...props.userData }

		newUserData.daysUntilClaim = parseInt( e.target.value )

		props.setUserData( newUserData )
	}

	return <div id = 'UserInput'>

		<span>

			<label htmlFor = 'userTierOneAmount'>Tier One:</label>

			<input
				type = 'number'
				name = 'userTierOneAmount'
				min = { 0 }
				value = { props.userData.tierOne }
				onChange = { onChangeTierOneAmount } />

		</span>

		<span>
			<label htmlFor = 'userTierTwoAmount'>Tier Two:</label>

			<input
				type = 'number'
				name = 'userTierTwoAmount'
				min = { 0 }
				value = { props.userData.tierTwo }
				onChange = { onChangeTierTwoAmount } />

		</span>

		<span>

			<label htmlFor = 'userTierThreeAmount'>Tier Three:</label>

			<input
				type = 'number'
				name = 'userTierThreeAmount'
				min = { 0 }
				value = { props.userData.tierThree }
				onChange = { onChangeTierThreeAmount } />

		</span>

		<span>

			<label htmlFor = 'userTierFourAmount'>Tier Four:</label>

			<input
				type = 'number'
				name = 'userTierFourAmount'
				min = { 0 }
				value = { props.userData.tierFour }
				onChange = { onChangeTierFourAmount } />

		</span>

		<span>

			<label htmlFor = 'userTaxNft'>Tax NFT:</label>

			<input type="checkbox"
				name = 'userTaxNft'
				checked = { props.userData.taxNft }
				onChange = { onChangeTaxNft } />

		</span>

		<span>

			<label htmlFor = 'userBoostNft'>Boost Nft:</label>

			<select
				name = 'userBoostNft'
				value = { props.userData.boostNft }
				onChange = { onChangeBoostNft }>

				<option value = 'none'>None</option>
				<option value = 'bronze'>Bronze</option>
				<option value = 'silver'>Silver</option>
				<option value = 'gold'>Gold</option>

			</select>

		</span>

		<span>

			<label htmlFor = 'userDaysUntilClaim'>Days Until Claim:</label>

			<input
				type = 'number'
				name = 'userDaysUntilClaim'
				min = { 1 }
				value = { props.userData.daysUntilClaim }
				onChange = { onChangeDaysUntilClaim } />

		</span>

	</div>

}

export default UserInput
