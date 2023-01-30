import http from "k6/http";
import { check } from 'k6';

export function getMethod(bookingId) {

    let pathId = bookingId;

    let request = http.get(`https://restful-booker.herokuapp.com/booking/${pathId}`, {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    check(request, {
        'GET is status 200' : (r) => r.status === 200,
    })

    let response = JSON.parse(request.body);
    console.log(response)

}