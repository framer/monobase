import * as React from "react"
import {Dynamic} from "monobase"
import {pill} from "theme"

declare var document

const style: React.CSSProperties = {
	...pill,
	fontFamily: "monospace",
	background: "white",
	border: "1px solid #F0F0F0"
}

class MouseLocation extends React.Component {
	point = {x: 0, y: 0}

	componentDidMount() {
		document.addEventListener("mousemove", this.onMouseMove)
	}

	onMouseMove = event => {
		this.point = {x: event.clientX, y: event.clientY}
		this.forceUpdate()
	}

	render() {
		return (
			<button style={style}>
				{this.point.x}, {this.point.y}
			</button>
		)
	}
}

export default Dynamic(MouseLocation)
