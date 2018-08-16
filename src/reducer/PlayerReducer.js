
export const playerReducer = (
	state = { 
		width: 0, 
		height: 0, 
		is_loading: false, 
		url:[
			'./storage/video/Reception.mp4',
			'./storage/video/เช็คอิน.mp4',
			'./storage/video/welcome.mp4',
			'./storage/video/คุณบิ๊ก.mp4',
			'./storage/video/คุณวิน.mp4',
			'./storage/video/คุณใหญ่.mp4',
			'./storage/video/คุณโอ๊ต.mp4',
			'./storage/video/คุณลุงตู่.mp4',
			'./storage/video/ไม่มีชื่อ.mp4',
			'./storage/video/ไม่พบข้อมูลครับ.mp4',
		],
		index_url: 0,
		can_capture: true,
	},
	action
) => {
	switch (action.type) {	
		case 'PLAYER_UPDATE_DIMENSION':
			return {
				...state,
				width: action.width,
				height: action.height,
				is_loading: true
			}
		case 'PLAYER_UPDATE_DIMENSION_SUCCESS':
			return {
				...state,
				is_loading: false,
			}
		case 'PLAYER_HANDLE_CHANGE_VIDEO':
			let index = action.isCaptureOn
			return {
				...state,
				index_url: index ? index : 0,
				is_loading: true,
				can_capture: false,
			}

		case 'PLAYER_HANDLE_CHANGE_VIDEO_SUCCESS':
			return {
				...state,
				is_loading: false,
				can_capture: true,
			}
		default:
			return state
	}
}