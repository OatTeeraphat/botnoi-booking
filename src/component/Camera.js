import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'tracking'
import 'tracking/build/data/face'


class Camera extends Component {

	state = {}

	tracker = null

	componentDidMount() {
		
		this.faceTracker();

	}

	faceTracker = () => {
		
		this.tracker = new window.tracking.ObjectTracker('face')
		this.tracker.setInitialScale(4)
		this.tracker.setStepSize(2)
		this.tracker.setEdgesDensity(0.1)
		let { canvas, cameraOutput } = this.refs
		let { is_already_capture,  savePhoto64, handleOnCapturePre, can_capture, handleChangeVideo, closeCamera, openCamera } = this.props
		//window.tracking.track(this.refs.cameraOutput, this.tracker, { camera: false })
		let trackTasks = window.tracking.track(cameraOutput, this.tracker, { camera: true })
	
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
				//console.log(can_capture)
				//set opacity to 1
				
				if (rect.x > 475 && rect.x < 675 && can_capture) {
					openCamera(1)
					var dataURI = canvas.toDataURL('image/jpeg')
						setTimeout(function () {
							trackTasks.stop()
							handleChangeVideo(2)
							openCamera(0)
							savePhoto64(dataURI)
						}, 3000);
						
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
		let opacityCamera = this.props.cam_opacity
		//let opacityCamera = 1
		return (
			<div className="camera" style={{ opacity: opacityCamera }} >
				<video className="camera_video" ref="cameraOutput" width={this.props.width} height={this.props.height}  preload autoPlay loop muted></video>
					<canvas className="camera_canvas" ref="canvas" width={this.props.width} height={this.props.height} ></canvas>
				</div>
		)
	}

}

const mapStateToProps = (state) => ({
	width: state.player.width,
	height: state.player.height,
	is_already_capture: state.camera.is_already_capture,
	can_capture : state.player.can_capture,
	handle_cam: state.camera.handle_cam,
	cam_opacity: state.camera.show_cam
})

const mapDispatachToProps = {
	savePhoto64: (dataURI, hide_cam) => ({ type: 'CAM_SAVE_PHOTO_64', img_base64: dataURI, hide_cam: hide_cam }),
	handleChangeVideo: (index) => ({ type: 'PLAYER_HANDLE_CHANGE_VIDEO', isCaptureOn: index }),
	openCamera: (val) => ({ type: 'CAM_OPEN', opacity : val }),
	closeCamera: () => ({ type: 'CAM_CLOSE'})
	// isCapture: () => ({ type: 'CAM_CAPTURE_ALREADY', img_url: 'http://s3-ap-southeast-1.amazonaws.com/hotel-recognition-pics/2a1d7830-d880-4688-800b-94f758beca2a.png'}),
}

export default connect(
	mapStateToProps,
	mapDispatachToProps
)( Camera )
