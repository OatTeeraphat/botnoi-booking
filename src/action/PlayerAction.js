import 'rxjs'

export const updateDimesion = (action) => action
	.ofType('PLAYER_UPDATE_DIMENSION')
	.debounceTime(300)
	.mapTo({ type: 'PLAYER_UPDATE_DIMENSION_SUCCESS' })
	
export const handleChangeVideo = (action) => action
	.ofType('PLAYER_HANDLE_CHANGE_VIDEO')
	.mapTo({ type: 'PLAYER_HANDLE_CHANGE_VIDEO_SUCCESS' })