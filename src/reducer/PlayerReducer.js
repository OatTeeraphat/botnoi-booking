
export const playerReducer = (
	state = { 
		width: 0, 
		height: 0, 
		is_loading: false, 
		url:[
			'./storage/video/Reception.mp4',
			'./storage/video/เช็คอิน.mp4',
			'./storage/video/ขออนุญาติถ่ายรูป.mp4',
			'./storage/video/welcome_สวัสดีครับ.mp4',
			'./storage/video/welcome_สวัสดีครับ.mp4',
			'./storage/video/welcome_สวัสดีครับ.mp4',
		],
		player_state: 0,
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

			switch (action.isCaptureOn) {
				case '':
					return {
						...state,
						player_state: 0,
						can_capture: true
					}
				case 'onPreCapture':
					return { 
						...state,
						player_state: state.player_state + 1,
						can_capture: true
					}
			}




				/* switch (player_state) {
					case 0:
						// loop นั่งเฉยๆ welcome
						console.log(action.isCaptureOn)
						if (action.isCaptureOn === '') {
							return {
								...state,
								player_state: 0,
								can_capture: true
							}
						}
						//คนมายืนหน้ากล้อง
						if (action.isCaptureOn === 'onPreCapture') {
							return {
								...state,
								player_state: player_state + 1,
								can_capture: true
							}
						}
					
					case 1:
						//คนมายืนหน้ากล้อง
						if (action.isCaptureOn === 'onPreCapture') {
							return {
								...state,
								player_state: 1,
								can_capture: false
							}
						}
						//คนมายืนหน้ากล้อง
						if (action.isCaptureOn === 'onPreCapture') {
							return {
								...state,
								player_state: 2,
								can_capture: false
							}
						}


					default:
						return state
				} */
				
			return {
				...state,
				player_state: 'welcome',
			}
	

		case 'PLAYER_HANDLE_CHANGE_VIDEO_SUCCESS':
			return {
				...state,
				can_capture: 0,
			}
		default:
			return state
	}
}