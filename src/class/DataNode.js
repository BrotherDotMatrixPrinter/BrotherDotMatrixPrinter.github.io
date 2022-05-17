export default class DataNode {

	/** @type { string } */
	#id

	get() { return document.getElementById( this.#id ) }

	/**
	 * @param { string } id
	 */
	constructor( id ) {
		this.#id = id
	}

}