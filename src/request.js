import React, { Component } from 'react';
import * as ReactDOM from "react-dom";

function reqListener() {
    var data = JSON.parse(this.responseText);
    console.log(data);
}

function reqError(err) {
    console.log('Fetch Error :-S', err);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open('get', 'https://api.myjson.com/bins/15jwx1', true);
oReq.send();