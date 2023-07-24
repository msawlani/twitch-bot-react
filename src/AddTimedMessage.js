import React, { useEffect, useState, useRef } from "react";
import commands from "./data/commands.json";
import { Form, Button, FormCheck, FormControl, Modal } from "react-bootstrap";
import { client } from "./bot.js";
import { config } from "./Constants";

const url = config.url;

const AddTimedMessages = ({ userData }) => {
  const [adding, setAdding] = useState(false);
  const messageRef = useRef();
  const timedMessagesRef = useRef();
  const timeRef = useRef();
  const linesRef = useRef();
  const remainingRef = useRef();

  const handleClose = () => setAdding(false);
  const handleShow = () => {
    setAdding(true);
  };

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
    <>
      <Button
        onClick={handleShow}
        disabled={userData?.login !== process.env.REACT_APP_TWITCH_USER}
      >
        Add
      </Button>
      <Modal show={adding} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Command</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Button
              type="submit"
              disabled={userData?.login !== process.env.REACT_APP_TWITCH_USER}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button form="addForm" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTimedMessages;
