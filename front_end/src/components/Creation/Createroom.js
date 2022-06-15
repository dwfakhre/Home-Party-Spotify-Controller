import * as styles from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Createroom.css"
import React from "react";


export default function Create() {
  return (
    <div className="block-container">
      <form action="#" method="post">
        <div class="form-group row">
          <label for="roomcode" class="col-sm-2 col-form-label">
            Code
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="roomcode"
              placeholder="Code"
            />
          </div>
        </div>
        <div className="form-group row">
          <label for="roomname" class="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="roomname"
              placeholder="Name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="roomhost" class="col-sm-2 col-form-label">
            Host
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="roomhost"
              placeholder="Host"
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-2">Guest can skip the song?</div>
          <div class="col-sm-10">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck1" />
              <label class="form-check-label" for="gridCheck1">
                Yes
              </label>
            </div>
          </div>
        </div>
        <div>
          <label for="votestoskip">Votes to skip</label>
          <input type="number" id="votestoskip" />
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
