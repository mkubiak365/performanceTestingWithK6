import http from "k6/http";
import { check } from 'k6';

export function deleteMethod(bookingId) {

    /// Generate tokens to delete records ///

    let getToken = http.request('POST', `https://restful-booker.herokuapp.com/auth`, 

        JSON.stringify({
            username : "admin",
            password : "password123"
        }), 

        {
            headers: { 'Content-Type': 'application/json',
                        "Accept": "application/json" },
        }
    );
        
    let sendToken = getToken.json().token;


    /// Delete records ///

    let pathId = bookingId;

    let request = http.request('DELETE', `https://restful-booker.herokuapp.com/booking/${pathId}`, null, {
        headers: { 'Content-Type': 'application/json',
                    "Cookie" : `token=${sendToken}` },
        }
    );
    
    check(request, {
        'DELETE is status 201' : (r) => r.status === 201,
    })

}