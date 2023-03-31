import React, { useEffect, useState, useRef } from "react";
import commands from "./data/commands.json";
import { Form, Button, FormCheck, FormControl, Modal } from "react-bootstrap";
import { client } from "./bot.js";
import { config } from "./Constants";

const url = config.url;

const AddCommands = () => {
  const [adding, setAdding] = useState(false);
  const messageRef = useRef();
  const commandRef = useRef();

  const handleClose = () => setAdding(false);
  const handleShow = () => {
    setAdding(true);
  };

  async function onSubmit() {
    const command = {
      command: commandRef.current.value,
      active: true,
      message: messageRef.current.value,
    };
    // When a post request is sent to the create url, we'll add a new record to the database.

    await fetch(`${url}/commands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setAdding(false);
    console.log(command);
  }

  return (
    <>
      <Button onClick={handleShow}>Add</Button>
      <Modal show={adding} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Command</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addForm" onSubmit={onSubmit}>
            <FormControl
              placeholder="Name"
              type="text"
              ref={commandRef}
            ></FormControl>
            <FormCheck label="Mod & Up"></FormCheck>
            <FormControl placeholder="Cooldown in seconds"></FormControl>
            <FormControl
              as="textarea"
              placeholder="Message"
              type="text"
              ref={messageRef}
            ></FormControl>
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

export default AddCommands;
