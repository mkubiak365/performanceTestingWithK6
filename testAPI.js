
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';
import { postMethod } from './methods/postMethod.js';
import { getMethod } from './methods/getMethod.js';
import { deleteMethod } from './methods/deleteMethod.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

/// Load users to tests ///

const users = new SharedArray('users', function () {
  return JSON.parse(open('./data.json')).users;
});

export const options = {
  scenarios: {
    login: {
      executor: 'per-vu-iterations',
      vus: users.length,
      iterations: 1,
      maxDuration: '1h30m',
    },
  },
};

/// Generate the test report ///

export function handleSummary(data) {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  return {
    [`./report/summary ${date}.html`]: htmlReport(data)
  };
}

/// Run itterations ///

export default function () {

  let bookingId = postMethod(users[vu.idInTest - 1]);
  console.log(bookingId)
  sleep(1);
  let getData = getMethod(bookingId);
  sleep(1);
  let deleteData = deleteMethod(bookingId);

}

