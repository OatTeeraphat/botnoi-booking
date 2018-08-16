import { combineReducers } from 'redux'
import { playerReducer } from '../reducer/PlayerReducer'
import { cameraReducer } from '../reducer/CameraReducer'

export default combineReducers({
	player: playerReducer,
	camera: cameraReducer
})