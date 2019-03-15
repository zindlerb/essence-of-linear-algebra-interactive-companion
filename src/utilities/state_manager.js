import _ from 'lodash'
import { Vec, VectorGraphData } from '../data_types.js'

class StateManager {
	constructor() {
		this.stateChangeCallbacks = []
		this.state = {
			vectorGraphs: [new VectorGraphData({ x: 40, y: 40 }, [new Vec(30, 65)])],
		}
	}

	registerStateCallback(cb) {
		this.stateChangeCallbacks.push(cb)
	}

	setState(arg) {
		if (typeof arg === 'function') {
			arg(this.state)
		} else {
			Object.assign(this.state, arg)
		}

		this.triggerRender()
	}

	triggerRender() {
		this.stateChangeCallbacks.forEach(stateCb => stateCb(this.state))
	}
}

const stateManager = new StateManager()

export default stateManager
