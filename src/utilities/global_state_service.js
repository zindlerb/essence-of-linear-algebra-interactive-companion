const INITIAL_STATE = {
  globalCursor: null
}

class GlobalStateService {
  constructor() {
  	this.state = INITIAL_STATE
		this.registeredComponentCtx
	}

	registerComponent(componentCtx) {
    this.registeredComponentCtx = componentCtx
	}

	setState(newObj) {
		Object.assign(this.state, newObj)
		this.registeredComponentCtx.setState(this.state)
	}
}

export default new GlobalStateService()
