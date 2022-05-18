import DataNode from './DataNode.js'

export default class InputNode extends DataNode {
	/** @param { () => void } callback */
	onInput( callback ) {
		this.get().addEventListener( 'input', callback, false )
	}

	/** @param { () => void } callback */
	onClick( callback ) {
		this.get().addEventListener( 'click', callback, false )
	}
}