import http from "k6/http";
import { check } from 'k6';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';

export function getMethod(bookingId, users) {

    let pathId = bookingId;
    let bodyFromFile = users;

    let request = http.get(`https://restful-booker.herokuapp.com/booking/${pathId}`, {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    check(request, {
        'GET is status 200' : (r) => r.status === 200,
    })


    /// Compare elements between data.json and GET method ///
    
    let response = JSON.parse(request.body);
    expect(bodyFromFile).to.have.eql(response);

    
}