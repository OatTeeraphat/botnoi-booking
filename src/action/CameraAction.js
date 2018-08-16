import 'rxjs'
import { Observable, Observer } from 'rxjs'

export const savePhoto64 = (action) => action
	.ofType('CAM_SAVE_PHOTO_64')
	.debounceTime(300)
	.switchMap( payload => 
		rxPost('https://hotel-reg-demo.herokuapp.com/upload_scan_image', { "scan_image": payload.img_base64 } )
		.debounceTime(300)
		.catch( err => { console.log( err ) } )
		.map(response => ({ type: 'CAM_CAPTURE_ALREADY', img_url: response.scan_image }))
	)

export const cameraAlreadySave = (action) => action
	.ofType('CAM_CAPTURE_ALREADY')
	// .debounceTime(200)
	.switchMap( payload => 
		rxGet('http://hotel-reg-demo.herokuapp.com/get_booking?imgurl=' + 'http://s3-ap-southeast-1.amazonaws.com/hotel-recognition-pics/2a1d7830-d880-4688-800b-94f758beca2a.png')
		.map( response => ({ type: 'BOOKING', booking_detail: response }))
	)


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
					$observer.error(JSON.parse(request.response))
					break
			}
		}
		request.onerror = () => {
			$observer.error(new Error('An error occured'))
		}
	})
}

export const rxGet= (path) => {

	return Observable.create(($observer) => {
		const request = new XMLHttpRequest()
		request.open('GET', path)
		request.setRequestHeader('Content-type', 'application/json')
		// request.send(JSON.stringify(body))
		request.onload = () => {
			switch (request.status) {
				case 200:
					$observer.next(JSON.parse(request.response))
					$observer.complete()
					break
				default:
					$observer.error(JSON.parse(request.response))
					break
			}
		}
		request.onerror = () => {
			$observer.error(new Error('An error occured'))
		}

		request.send()
	})
}