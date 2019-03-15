
// Modes
const DRAG = 'DRAG'
const CONNECT = 'CONNECT'

const Scrubber = ({ onChange, value, sensitivity }) => {
	sensitivity = sensitivity || 5;

	return (
		<span
			className="scrubber u-unselectable"
			onMouseDown={(e) => {
				dragManager.start(e, {
					originalValue: value,
					onDrag(e) {
						const newValue = this.originalValue + Math.round((e.clientX - this.originalX) / sensitivity)
						if (newValue !== this.originalValue) {
							onChange(newValue)
						}
					}
				})
			}}>
			{ value }
		</span>
	)
}

export default Scrubber
