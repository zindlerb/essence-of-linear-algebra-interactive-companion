	import classnames from 'classnames'
import _ from 'lodash'
import React, { Component } from 'react'
import './App.css'
import SymbolicVector from 'Components/svg/SymbolicVector.js'
import CoordinateGraph from 'Components/svg/CoordinateGraph'
import VectorIntroductionContainer from 'Root/containers/VectorIntroductionContainer'
import VectorAdditionContainer from 'Root/containers/VectorAdditionContainer'
import VectorScalingContainer from 'Root/containers/VectorScalingContainer'
import BasisVectorContainer from 'Root/containers/BasisVectorContainer'
import AlternativeBasisVectorContainer from 'Root/containers/AlternativeBasisVectorContainer'
import SpanContainer from 'Root/containers/SpanContainer'
import LinearTransformationContainer from 'Root/containers/LinearTransformationContainer'
import MatrixCompositionContainer from 'Root/containers/MatrixCompositionContainer'
import globalStateService from 'Utilities/global_state_service'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {
		globalStateService.registerComponent(this)
	}

	render() {
		const { globalCursor } = this.state
		return (
			<div style={{ cursor: globalCursor ? `${globalCursor}` : null }} className="App w-100 h-100">
				<h1>Essence of Linear Algebra Interactive Companion</h1>
				<p>
					Below are some interactive examples that can be paired with the
					<a href="https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab">
						Essence of Linear Algebra
					</a>
					Series by <a href="https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw">3Blue1Brown</a>.
					If you liked their series or this companion make sure to support them on their <a href="https://www.patreon.com/3blue1brown">Patreon page</a>.
				</p>

				<h2>Vectors, what even are they? (<a href="https://www.youtube.com/watch?v=fNk_zzaMoSs">video link</a>)</h2>
				<h3>Basic Vector (<a href="https://youtu.be/fNk_zzaMoSs">0:00</a>)</h3>
				<p>
					Below is an example of a basic vector. Drag the handle to move the vector around the coordinate plane.
				</p>
				<VectorIntroductionContainer/>
				<h3>Vector Addition (<a href="https://youtu.be/fNk_zzaMoSs?t=287">4:47</a>)</h3>
				<p>Below is an example of adding two vectors.</p>
				<VectorAdditionContainer/>
				<h3>Vector Multiplication (<a href="https://youtu.be/fNk_zzaMoSs?t=412">6:52</a>)</h3>
				<p>Below is an example of multiplying two vectors.</p>
				<VectorScalingContainer/>

				<h2>Linear combinations, span, and basis vectors (<a href="https://www.youtube.com/watch?v=k7RM-ot2NWY&t=456s">video link</a>)</h2>
				<h3>Basis Vectors (<a href="https://youtu.be/k7RM-ot2NWY?t=32">0:32</a>)</h3>
				<BasisVectorContainer/>
				<h3>Alternative Basis Vectors (<a href="https://youtu.be/k7RM-ot2NWY?t=109">1:49</a>)</h3>
				<AlternativeBasisVectorContainer/>
				<h3>Span (<a href="https://youtu.be/k7RM-ot2NWY?t=209">3:29</a>)</h3>
				<SpanContainer />

				<h2>Linear transformations and matrices (<a href="https://youtu.be/kYB8IZa5AuE">video link</a>)</h2>
				<LinearTransformationContainer />

				<h2>Matrix multiplication as composition (<a href="https://youtu.be/XkY2DOUCWMU">video link</a>)</h2>
				<MatrixCompositionContainer />
			</div>
		)
	}
}

export default App
