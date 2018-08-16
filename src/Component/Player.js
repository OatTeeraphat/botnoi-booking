import React, { Component } from 'react';
import Reactplayer from "react-player";
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

	rndNum(data){
		let num = Math.floor(Math.random() * Math.floor(data.length))
		return num
	}

	render() {
		let { url, index_url, width, height, handleChangeVideo, openCamera } = this.props
		return (
			<div className="player">
				<Reactplayer
					playing
					url={ url[index_url] }
					width={ width }
					height={ height }
					onEnded={() => openCamera(0)}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	is_loading: state.player.is_loading,
	url: state.player.url,
	height: state.player.height,
	width: state.player.width,
	index_url: state.player.index_url,
})

const mapDispatachToProps = {
	updateDimensions: (width, height) => ({ type: 'PLAYER_UPDATE_DIMENSION', width: width, height: height }),
	handleChangeVideo: () => ({ type: 'PLAYER_HANDLE_CHANGE_VIDEO' , isCaptureOn : ''}),
	openCamera: (opacity) => ({ type: 'CAM_OPEN', opacity: opacity }),
}

export default connect(
	mapStateToProps,
	mapDispatachToProps,
)( Player )

