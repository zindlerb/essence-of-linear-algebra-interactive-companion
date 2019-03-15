export default class Arrow extends Component {
  componentDidUpdate(prevProps) {
    $(this._lineEl).attr(this.getDomLineAttrs(prevProps.edge.vertices))
  }

  getDomLineAttrs(vertices) {
    const [fromNode, toNode] = vertices
    const fromNodeRect = getRectMidpoint($(`.${fromNode.id}`).get(0).getBoundingClientRect())
    const toNodeRect = getRectMidpoint($(`.${toNode.id}`).get(0).getBoundingClientRect())

    return {
      x1: fromNodeRect.x,
      y1: fromNodeRect.y,
      x2: toNodeRect.x,
      y2: toNodeRect.y
    }
  }

  render() {
    console.log('props', this.props)
    const lineAttrs = this.getDomLineAttrs(this.props.edge.vertices)

    return (
      <line
        ref={(line) => this._lineEl = line}
        strokeWidth="2"
        stroke="black"
        {...lineAttrs} />
    )
  }
}
