import React, { useEffect, useState, useRef } from "react";
import { Form, Button, FormCheck, FormControl, Modal } from "react-bootstrap";
import { client } from "./bot.js";
import { config } from "./Constants";

const url = config.url;

const TimedMessages = () => {
  const [timedMessages, setTimeMessages] = useState([]);
  const messageRef = useRef();
  const timedMessagesRef = useRef();
  const timeRef = useRef();
  const linesRef = useRef();
  const remainingRef = useRef();

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

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    const timedMessage = {
      name: timedMessagesRef.current.value,
      time: timeRef.current.value,
      message: messageRef.current.value,
      lines: linesRef.current.value,
    };
    // When a post request is sent to the create url, we'll add a new record to the database.

    await fetch(`${url}/timedMessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timedMessage),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    console.log(timedMessage);
  }

  return (
    <div className="container bg-secondary">
      <div className="row p-5">
        <div className="col-sm-6">
          <div className="float-right">
            <Button>Plus</Button>
          </div>

          <ul className="list-unstyled">
            {timedMessages.map((timedMessage) => (
              <div className="row p-1">
                <div className="col-12 col-sm-6">
                  <li>
                    {timedMessage.name} | {timedMessage.message}
                  </li>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="d-flex justify-content-evenly">
                    <Button onClick={(e) => Delete(e, timedMessage.name)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="col-sm-6">
          <Form onSubmit={onSubmit}>
            <FormControl
              placeholder="Name"
              type="text"
              ref={timedMessagesRef}
            />
            <FormControl
              placeholder="Time it takes for message to appear in seconds"
              type="text"
              ref={timeRef}
            />
            <FormControl
              placeholder="Number of chat lines it takes for message to appear"
              type="text"
              ref={linesRef}
            />
            <FormControl
              as="textarea"
              placeholder="Message"
              type="text"
              ref={messageRef}
            />
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TimedMessages;
