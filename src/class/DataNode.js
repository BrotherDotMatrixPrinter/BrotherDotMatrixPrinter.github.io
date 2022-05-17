export default class DataNode {

	/** @type { string } */
	#id

	get() { return document.getElementById( this.#id ) }

	set( data ) { document.getElementById( this.#id ).innerHTML = data }

	/**
	 * @param { string } id
	 */
	constructor( id ) {
		this.#id = id
	}

}