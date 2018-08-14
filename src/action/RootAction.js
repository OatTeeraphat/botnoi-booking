import { combineEpics } from 'redux-observable'
import { handleChangeVideo, updateDimesion } from '../action/PlayerAction'

export default combineEpics(
	updateDimesion,
	handleChangeVideo
)