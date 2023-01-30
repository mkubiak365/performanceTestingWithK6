import http from "k6/http";
import { check } from 'k6';


export function postMethod(users) {

    let payload = users;

    let request = http.post("https://restful-booker.herokuapp.com/booking", JSON.stringify(payload), {
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }});

    check(request, {
        'POST is status 200': r => r.status === 200,
    })

    let response = JSON.parse(request.body);
    
    return response.bookingid;

}

