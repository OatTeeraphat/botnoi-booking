export const cameraReducer = (
	state = {
		handle_cam: true,
		is_already_capture: false
	},
	action
) => {

	switch (action.type) {
		case 'CAM_SAVE_PHOTO_64' : {
			return {
				...state,
				is_already_capture: true,
			}
		}
		case 'CAM_CAPTURE_ALREADY':
			return {
				...state,
				handle_cam: false,
				img_url: action.img_url
			}

		case 'BOOKING':
			return {
				...state,
				booking_detail: action.booking_detail
			}

		default:
			return state
	}
}