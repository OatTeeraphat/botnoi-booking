import 'rxjs'


export const updateDimesion = (action) => action
	.ofType('UPDATE_DIMENSION')
	.debounceTime(300)
	.mapTo({ type: 'UPDATE_DIMENSION_SUCCESS' })


export const handleChangeVideo = (action) => action
	.ofType('HANDLE_CHANGE_VIDEO')
	.delay(0)
	.mapTo({ type: 'HANDLE_CHANGE_VIDEO_SUCCESS' })



