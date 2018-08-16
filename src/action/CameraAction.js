import 'rxjs'
import { Observable, Observer } from 'rxjs'

export const savePhoto64 = (action) => action
	.ofType('CAM_SAVE_PHOTO_64')
	.debounceTime(300)
	.switchMap( payload => 
		rxPost('https://hotel-reg-demo.herokuapp.com/upload_scan_image', { "scan_image": payload.img_base64 } )
		.debounceTime(300)
		.catch( err => { console.log( err ) } )
		.map(response => ({ type: 'CAM_CAPTURE_ALREADY', img_url: response.scan_image, is_track: payload.is_track }))
	)

export const cameraAlreadySave = (action) => action
	.ofType('CAM_CAPTURE_ALREADY')
	// .debounceTime(200)
	.switchMap( payload => 
		rxGet('http://hotel-reg-demo.herokuapp.com/get_booking?imgurl=' + payload.img_url )
		//rxGet('http://hotel-reg-demo.herokuapp.com/get_booking?imgurl=' + 'htp://s3-ap-southeast-1.amazonaws.com/hotel-recognition-pics/2a1d7830-d880-4688-800b-94f758beca2a.png' )
		.catch( () => {
			return Observable.of({ type: 'BOOKING', booking_detail: { Name: 'error' } })
		})
		// .catch( err => ({ type: "PLAYER_HANDLE_CHANGE_VIDEO", isCaptureOn: 9 }) )
		.map( response => ({ type: 'BOOKING', booking_detail: response }))
	)


export const bookingDone = (action) => action
	.ofType('BOOKING')
	.switchMap(payload =>
		// rxGet('https://dtacsendsms.herokuapp.com/sendotp?message=0618201998')
			Observable.of('')
			.delay(300)
			.map( response => {

				console.log(' NAME: ', payload.booking_detail.Name )

				switch (payload.booking_detail.Name) {
					case 'บิ้ก':
						return 3
					case 'วิน':
						return 4
					case 'ใหญ่':
						return 5
					case 'โอ๊ต':
						return 6
					case 'ประยุทธ์':
						return 7
					case undefined:
						return 9
					default:	
						return 8
				}	
			})
			.catch(() => {
				return Observable.of({ type: 'PLAYER_HANDLE_CHANGE_VIDEO', isCaptureOn : 9 })
			})
			.map(response => ({ type: 'PLAYER_HANDLE_CHANGE_VIDEO', isCaptureOn: response }))
	)
	
	// .map(x => ({ type: 'PLAYER_HANDLE_CHANGE_VIDEO', isCaptureOn: x }))
	// .mapTo({ type: 'PLAYER_HANDLE_CHANGE_VIDEO', isCaptureOn: 4 })


export const rxPost = (path, body) => {

	return Observable.create(($observer) => {
		const request = new XMLHttpRequest()
		request.open('POST', path)
		request.setRequestHeader('Content-type', 'application/json')
		request.send(JSON.stringify(body))
		request.onload = () => {
			switch (request.status) {
				case 200:
					$observer.next(JSON.parse(request.response))
					$observer.complete()
					break
				default:
					$observer.error(new Error('An error occured'))
					break
			}
		}
		request.onerror = () => {
			$observer.error({ type: 'PLAYER_HANDLE_CHANGE_VIDEO', isCaptureOn: 4 })
		}
	})
}

export const rxGet= (path) => {

	return Observable.create(($observer) => {
		const request = new XMLHttpRequest()
		request.open('GET', path)
		request.setRequestHeader('Content-type', 'application/json')
		request.setRequestHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
		request.setRequestHeader('Access-Control-Allow-Origin', '*')
		// request.send(JSON.stringify(body))
		request.onload = () => {
			switch (request.status) {
				case 200:
					$observer.next(JSON.parse(request.response))
					$observer.complete()
					break
				default:
					$observer.error({case: true})
					break
			}
		}
		request.onerror = () => {
			$observer.error(new Error('An error occured'))
		}

		request.send()
	})
}