import { combineEpics } from 'redux-observable'
import PlayerAction from '../action/PlayerAction'

export default combineEpics(
	PlayerAction.updateDimesion,
	PlayerAction.handleChangeVideo
)