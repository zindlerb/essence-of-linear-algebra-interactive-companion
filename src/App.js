	import classnames from 'classnames'
import _ from 'lodash'
import React, { Component } from 'react'
import './App.css'
import { I_HAT, J_HAT } from 'Root/constants'
import { BLUE, PURPLE } from 'Root/constants/colors'
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
import ExternalLink from 'Components/ExternalLink'
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
				<h1>The Unofficial <i>Essence of Linear Algebra</i> Interactive Companion</h1>
				<p>
					Below are some interactive examples that are meant to be paired with the <a href="https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab">Essence of Linear Algebra</a> series by <a href="https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw">3Blue1Brown</a>. If you enjoyed the linked videos or this companion, I encourage you to support 3Blue1Brown on <a href="https://www.patreon.com/3blue1brown">patreon</a>.
				</p>

				<h2>1. Vectors, what even are they? (<ExternalLink href="https://www.youtube.com/watch?v=fNk_zzaMoSs">link</ExternalLink>)</h2>
				<h3>Basic Vector (<ExternalLink href="https://youtu.be/fNk_zzaMoSs">0:00</ExternalLink>)</h3>
				<p>
					Below is an example of a basic vector. Drag the handle to move the vector around the coordinate plane. On the left the vector is represented geomtrically and on the right the same vector is represented symbolically.
				</p>
				<VectorIntroductionContainer/>

				<h3>Vector Addition (<ExternalLink href="https://youtu.be/fNk_zzaMoSs?t=287">4:47</ExternalLink>)</h3>
				<VectorAdditionContainer/>

				<h3>Vector Multiplication (<ExternalLink href="https://youtu.be/fNk_zzaMoSs?t=412">6:52</ExternalLink>)</h3>

				<VectorScalingContainer/>

				<h2>2. Linear combinations, span, and basis vectors (<ExternalLink href="https://www.youtube.com/watch?v=k7RM-ot2NWY&t=456s">link</ExternalLink>)</h2>
				<h3>Basis Vectors (<ExternalLink href="https://youtu.be/k7RM-ot2NWY?t=32">0:32</ExternalLink>)</h3>
				<p>
					Drag the scalars multiplied by the basis vectors below to form a new vector.
					The unscaled basis vectors are shown in light colors next to the origin.
				</p>
				<BasisVectorContainer/>
				<h3>Alternative Basis Vectors (<ExternalLink href="https://youtu.be/k7RM-ot2NWY?t=109">1:49</ExternalLink>)</h3>
				<p>
					Below we have chosen alternate basis vectors. Instead of {I_HAT} and {J_HAT} as our basis vectors we have <span style={{ color: BLUE }} className="i">w</span> and <span style={{ color: PURPLE }} className="i">v</span>.
					Drag the scalars multiplying <span style={{ color: BLUE }} className="i">w</span> and <span style={{ color: PURPLE }} className="i">v</span> to form a new vector.
				</p>
				<AlternativeBasisVectorContainer/>
				<h3>Span (<ExternalLink href="https://youtu.be/k7RM-ot2NWY?t=209">3:29</ExternalLink>)</h3>
				<p>
					The dots below represent the span of the vectors <span style={{ color: BLUE }} className="i">w</span> and <span style={{ color: PURPLE }} className="i">v</span>.
					Each dot is on potential vector that can be formed form a linear combinator of <span style={{ color: BLUE }} className="i">w</span> and <span style={{ color: PURPLE }} className="i">v</span>	.
					Hover the dot to see the vector and a linear combination that results in that vector.
					You can drag the dots at the end of the vectors w and v to move them around.
					What happens to the span when w and v lie on the same line?
				</p>
				<SpanContainer />

				<h2>3. Linear transformations and matrices (<ExternalLink href="https://youtu.be/kYB8IZa5AuE">link</ExternalLink>)</h2>
				<p>
					Below is an example of a matrix tranforming the coordinate space.
					The original grid is shown in gray and the transformed coordinate grid is shown in blue.
					Drag the numbers of the matrix around to change the transformation.
				</p>
				<LinearTransformationContainer />
			</div>
		)
	}
}

export default App
