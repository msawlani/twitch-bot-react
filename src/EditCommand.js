import React, { useEffect, useState } from "react";
import { Form, Button, FormCheck, FormControl, Modal } from "react-bootstrap";
import { client } from "./bot.js";
import { config } from "./Constants";

const url = config.url;

const Commands = ({ command, userData }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    command: "",
    modandup: Boolean,
    active: Boolean,
    message: "",
  });

  const handleClose = () => setEditing(false);
  const handleShow = () => {
    setEditing(true);
    setForm({
      command: command.command,
      modandup: command.modandup,
      active: command.active,
      message: command.message,
    });
  };

  function UpdateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function save() {
    const command = { ...form };
    console.log(command.command);
    await fetch(`${url}/commands/${command.command}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });
    client.say("sinsofaninja", command.command + " command has been edited!");

    setEditing(false);
  }

  return (
    <>
      <Button
        onClick={handleShow}
        disabled={userData?.login !== process.env.REACT_APP_TWITCH_USER}
      >
        Edit
      </Button>
      <Modal show={editing} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="editForm" onSubmit={(e) => save(props.command._id)}>
            <FormControl
              placeholder="Name"
              type="text"
              value={form.command}
              onChange={(e) => UpdateForm({ command: e.target.value })}
            ></FormControl>
            <FormCheck
              label="Mod & Up"
              defaultChecked={form.modandup}
              onChange={(e) => UpdateForm({ modandup: e.target.checked })}
            ></FormCheck>
            <FormControl placeholder="Cooldown in seconds"></FormControl>
            <FormControl
              as="textarea"
              placeholder="Message"
              type="text"
              value={form.message}
              onChange={(e) => UpdateForm({ message: e.target.value })}
            ></FormControl>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button form="editForm" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Commands;
