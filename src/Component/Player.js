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
		let { url, player_state, width, height, handleChangeVideo } = this.props
		return (
			<div className="player">
				<Reactplayer
					playing
					url={url[player_state][0] }
					width={ width }
					height={ height }
					onEnded={ () => handleChangeVideo() }
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
	player_state: state.player.player_state
})

const mapDispatachToProps = {
	updateDimensions: (width, height) => ({ type: 'PLAYER_UPDATE_DIMENSION', width: width, height: height }),
	handleChangeVideo: () => ({ type: 'PLAYER_HANDLE_CHANGE_VIDEO' , isCaptureOn : ''})
}

export default connect(
	mapStateToProps,
	mapDispatachToProps,
)( Player )

