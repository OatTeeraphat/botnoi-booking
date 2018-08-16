export const cameraReducer = (
	state = {
		handle_cam: true,
		is_already_capture: false,
		show_cam : 0
	},
	action
) => {

	switch (action.type) {
		case 'CAM_OPEN':
			return {
				...state,
				show_cam: action.opacity,
			}

		case 'CAM_SAVE_PHOTO_64' :
			return {
				...state,
				is_already_capture: true,
				show_cam: 0,
			}
		
		case 'CAM_CAPTURE_ALREADY':
			return {
				...state,
				handle_cam: false,
				img_url: action.img_url
			}

		case 'CHECK_BOOKING':
			return {
				...state,
				booking_detail: action.booking_detail,
			}

		case 'BOOKING':
			return {
				...state,
				booking_detail: action.booking_detail,
			}

		case 'BOOKING_DONE':
			return {
				...state,
			}

		default:
			return state
	}
}