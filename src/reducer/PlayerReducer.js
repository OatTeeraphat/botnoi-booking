
export const playerReducer = (
	state = { 
		width: 0, 
		height: 0, 
		is_loading: false, 
		url: [
			'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
			'https://ak1.picdn.net/shutterstock/videos/2258341/preview/stock-footage-black-butterfly-with-flowers-and-with-green-leaves.mp4',
			'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
		],
		index_url: 0
	},
	action
) => {

	switch (action.type) {	
		case 'UPDATE_DIMENSION':
			return {
				...state,
				width: action.width,
				height: action.height,
				is_loading: true
			}
		case 'UPDATE_DIMENSION_SUCCESS':
			return {
				...state,
				is_loading: false
			}
		case 'HANDLE_CHANGE_VIDEO':

			return {
				...state,
				index_url: state.index_url !== state.url.length - 1 ? state.index_url + 1: 0,
				is_loading: true
			}
		case 'HANDLE_CHANGE_VIDEO_SUCCESS':
			return {
				...state,
				is_loading: false
			}
	
		default:
			return state
	}
}