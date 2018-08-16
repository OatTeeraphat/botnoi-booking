import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'tracking'
import 'tracking/build/data/face'


class Camera extends Component {

	state = {}

	tracker = null

	componentDidMount() {
		this.tracker = new window.tracking.ObjectTracker('face')
		this.tracker.setInitialScale(4)
		this.tracker.setStepSize(2)
		this.tracker.setEdgesDensity(0.1)
		let { canvas, cameraOutput } = this.refs
		let { is_already_capture, isCapture, savePhoto64, handleOnCapturePre, is_loading } = this.props
		//window.tracking.track(this.refs.cameraOutput, this.tracker, { camera: false })
		window.tracking.track(cameraOutput, this.tracker, { camera: true })

		this.tracker.on('track', event => {
			let context = canvas.getContext('2d')
			// let image = context.drawImage(cameraOutput, 0, 0, canvas.width, canvas.height);

			context.clearRect(0, 0, canvas.width, canvas.height)
			context.drawImage(cameraOutput, 0, 0, canvas.width, canvas.height)
			event.data.forEach(function (rect) {
				context.strokeStyle = '#a64ceb'
				context.strokeRect(rect.x, rect.y, rect.width, rect.height)
				context.font = '11px Helvetica'
				context.fillStyle = "#fff"
				context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
				context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)

				if (rect.x > 475 && rect.x < 675 && !is_loading ) {
					
					var dataURI = canvas.toDataURL('image/jpeg')
						//savePhoto64(dataURI)
						handleOnCapturePre()
					// isCapture()

					// isCapture()
					// console.log(dataURI) 
					// image.src = this.refs.cameraOutput.toDataURL();
					// console.log(context.toDataURL())
				}
			})
		})

	}

	render(){
		//console.log(this.props.height)
		return (
				<div>
					<video className="camera_video" ref="cameraOutput" width={this.props.width} height={this.props.height}  preload autoPlay loop muted></video>
					<canvas className="camera_canvas" ref="canvas" width={this.props.width} height={this.props.height} ></canvas>
				</div>
		)
	}

}

const mapStateToProps = (state) => ({
	width: state.player.width,
	height: state.player.height,
	is_already_capture: state.camera.is_already_capture
})

const mapDispatachToProps = {
	savePhoto64: (dataURI) => ({ type: 'CAM_SAVE_PHOTO_64', img_base64: dataURI }),
	handleOnCapturePre: () => ({ type: 'PLAYER_HANDLE_CHANGE_VIDEO', isCaptureOn: 'onCapturePre' }),
	handleChangeVideo: () => ({ type: 'PLAYER_HANDLE_CHANGE_VIDEO', isCaptureOn: 'onCaptureSucess' })
	// isCapture: () => ({ type: 'CAM_CAPTURE_ALREADY', img_url: 'http://s3-ap-southeast-1.amazonaws.com/hotel-recognition-pics/2a1d7830-d880-4688-800b-94f758beca2a.png'}),
}

export default connect(
	mapStateToProps,
	mapDispatachToProps
)( Camera )
