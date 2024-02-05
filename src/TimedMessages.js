import React, { useEffect, useState, useRef } from "react";
import { Form, Button, FormCheck, FormControl, Modal } from "react-bootstrap";
import { client } from "./bot.js";
import { config } from "./Constants";
import { useOutletContext } from "react-router-dom";
import AddTimedMessages from "./AddTimedMessage.js";

const url = config.url;

const TimedMessages = () => {
  const [timedMessages, setTimeMessages] = useState([]);

  const [userData, setUserData] = useOutletContext();

  useEffect(() => {
    fetch(`${url}/timedMessages`)
      .then((res) => res.json())
      .then((data) => {
        setTimeMessages(data);
      });
  });
  async function Delete(e, timedMessage) {
    console.log(timedMessage);
    // When a post request is sent to the create url, we'll add a new record to the database.
    await fetch(`${url}/timedMessages/${timedMessage}`, {
      method: "DELETE",
    }).catch((err) => {
      alert(err);
    });
  }

  return (
    <div className="container d-flex flex-column bg-dark">
      <div className="row p-5 flex-grow-1 overflow-auto chat">
        <div className="col-sm-12">
          <div className="float-right">
            <AddTimedMessages userData={userData} />
          </div>

          <ul className="list-unstyled">
            {timedMessages.length === 0 ? (
              <div className="text-center fs-1">Bot is offline</div>
            ) : (
              timedMessages.map((timedMessage) => (
                <div className="row pt-3">
                  <div className="col-12 col-sm-10">
                    <li>
                      {timedMessage.name} | {timedMessage.message}
                    </li>
                  </div>
                  <div className="col-12 col-sm-2">
                    <div className="d-flex justify-content-evenly">
                      <Button
                        onClick={(e) => Delete(e, timedMessage.name)}
                        disabled={
                          userData?.login !== process.env.REACT_APP_TWITCH_USER
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimedMessages;
