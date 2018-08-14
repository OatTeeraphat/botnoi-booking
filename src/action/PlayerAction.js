import 'rxjs'
import { Observable } from 'rxjs';

class PlayerAction {

	updateDimesion = (action) => {
		return action
			.ofType('UPDATE_DIMENSION')
			.debounceTime(300)
			.mapTo({ type: 'UPDATE_DIMENSION_SUCCESS' })
	}

	handleChangeVideo = (action) => {
		return action
			.ofType('HANDLE_CHANGE_VIDEO')
			.delay(0)
			.mapTo({ type: 'HANDLE_CHANGE_VIDEO_SUCCESS' })
	}
}

export default new PlayerAction

