
export const playerReducer = (
	state = { 
		width: 0, 
		height: 0, 
		is_loading: false, 
		url:{
			welcome: [
				'./storage/video/Reception.mp4',
			],
			pre: [
				'./storage/video/เช็คอิน.mp4',
			],
			pre2:[
				'./storage/video/welcome_ยินดีต้อนรับ.mp4',
			],
			success: [
				'./storage/video/welcome_สวัสดีครับ.mp4',
			],
			fail:[
				'./storage/video/welcome_สวัสดีครับ.mp4',
			],
			final:[
				'./storage/video/welcome_สวัสดีครับ.mp4',
			]
		},
		player_state: 'welcome'
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
				is_loading: false
			}
		case 'PLAYER_HANDLE_CHANGE_VIDEO':
			let { player_state } = state
				switch (player_state) {
					case 'welcome':
						// loop นั่งเฉยๆ
						if (action.isCaptureOn === '') {
							return {
								...state,
								player_state: 'welcome',
								is_loading: true
							}
						}
						//คนมายืนหน้ากล้อง
						if (action.isCaptureOn === 'onCapturePre'){
							return {
								...state,
								player_state: 'pre',
								is_loading: true
							}
						}
						if (action.isCaptureOn === 'onCaptureStart') {
							return {
								...state,
								player_state: 'pre',
								is_loading: true
							}
						}
						if (action.isCaptureOn === '') {
							return {
								...state,
								player_state: 'pre',
								is_loading: true
							}
						}
				
					default:
						return state
				}
			
			
		
			return {
				...state,
				player_state: 'pre',
				is_loading: true
			}
	

		case 'PLAYER_HANDLE_CHANGE_VIDEO_SUCCESS':
			return {
				...state,
				is_loading: false
			}
		default:
			return state
	}
}