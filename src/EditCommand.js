import React, { useEffect, useState } from "react";
import commands from "./data/commands.json";
import { Form, Button, FormCheck, FormControl, Modal } from "react-bootstrap";
import { client } from "./bot.js";
import { config } from "./Constants";

const url = config.url;

const Commands = (props) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    command: "",
    active: Boolean,
    message: "",
  });

  const handleClose = () => setEditing(false);
  const handleShow = () => {
    setEditing(true);
    setForm({
      command: props.command.command,
      active: props.command.active,
      message: props.command.message,
    });
  };

  function UpdateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function save(id) {
    const command = { ...form };
    console.log(id);
    await fetch(`${url}/commands/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });
    setEditing(false);
  }

  return (
    <>
      <Button onClick={handleShow}>Edit</Button>
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
            <FormCheck label="Mod & Up"></FormCheck>
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
