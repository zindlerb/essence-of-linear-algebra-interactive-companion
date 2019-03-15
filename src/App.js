	import classnames from 'classnames'
import _ from 'lodash'
import React, { Component } from 'react'
import './App.css'
import SymbolicVector from 'Components/svg/SymbolicVector.js'
import CoordinateGraph from 'Components/svg/CoordinateGraph'
import VectorIntroductionContainer from 'Root/containers/VectorIntroductionContainer'

class App extends Component {
	render() {
		return (
			<div className="App w-100 h-100">
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
				<VectorIntroductionContainer/>
			</div>
		)
	}
}

export default App
