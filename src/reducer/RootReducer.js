import { combineReducers } from 'redux'
import { playerReducer } from '../reducer/PlayerReducer'


export default combineReducers({
	player: playerReducer
})