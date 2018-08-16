import { combineEpics } from 'redux-observable'
import { handleChangeVideo, updateDimesion, } from '../action/PlayerAction'
import { savePhoto64, cameraAlreadySave } from '../action/CameraAction'

export default combineEpics(
	updateDimesion,
	handleChangeVideo,
	savePhoto64,
	cameraAlreadySave
)