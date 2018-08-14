import React, { Component } from 'react';
import ReactPlayer from "react-player";
import { connect } from 'react-redux'


class Player extends Component {

	componentDidMount() {
		let { innerHeight, innerWidth } = window
		this.props.updateDimensions(innerWidth, innerHeight)
		window.addEventListener("resize", () => this.updateDimensions());
	}

	updateDimensions() {
		let { innerHeight, innerWidth } = window
		this.props.updateDimensions(innerWidth, innerHeight)
	}

	render() {

		let { url, index_url, width, height } = this.props
		
		return (
			<div className="player">
				<ReactPlayer
					playing
					url={ url[index_url] }
					width={ width }
					height={ height }
				/>
				<button onClick={() => this.props.handleChangeVideo()}>BTN</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	is_loading: state.player.is_loading,
	url: state.player.url,
	height: state.player.height,
	width: state.player.width,
	index_url: state.player.index_url
})

const mapDispatachToProps = {
	updateDimensions: ( width, height ) => ({ type: 'UPDATE_DIMENSION', width: width, height: height }),
	handleChangeVideo: () => ({ type: 'HANDLE_CHANGE_VIDEO'})
}

export default connect(
	mapStateToProps,
	mapDispatachToProps,
)( Player )

