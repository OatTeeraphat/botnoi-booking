import React, { Component } from 'react';
import ReactPlayer from "react-player";

export default class Player extends Component {

	constructor(props) {
		super(props);
		this.state = {
			height: props.height,
			width: props.width,
			url: [
				'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
				'https://staging.coverr.co/s3/mp4/The-mirage.mp4',
				'https://staging.coverr.co/s3/mp4/Chruch.mp4'
			],
			url_num: 0
		};
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener("resize", () => this.updateDimensions());
	}

	updateDimensions() {
		console.log(' w:' + window.innerWidth + ' h:' + window.innerHeight);
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	handleChangeVideo() {
		let num = this.state.url_num || 0
		let length = this.state.url.length
		this.setState({ url_num: num !== length ? num + 1 : 0 })
	}

	render() {
		return (
			<div className="player">
				<ReactPlayer
					playing
					url={this.state.url[this.state.url_num]}
					width={this.state.width}
					height={this.state.height}
				/>
				<button onClick={() => this.handleChangeVideo()}>Hello Mother Fucker</button>
			</div>
		);
	}
}

