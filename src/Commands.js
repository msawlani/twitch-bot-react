import React, { useEffect, useState } from "react";
import commands from "./data/commands.json";
import { Form, Button, FormCheck, FormControl } from "react-bootstrap";
import { client } from "./bot.js";
import { config } from "./Constants";

const url = config.url;

const Commands = () => {
  const [commands, setCommands] = useState([]);
  const [form, setForm] = useState({
    command: "",
    active: Boolean,
    message: "",
  });

  useEffect(() => {
    fetch(`${url}/commands`)
      .then((res) => res.json())
      .then((data) => {
        setCommands(data);
      });
  });

  function UpdateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newCommand = { ...form };

    await fetch(`${url}/commands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommand),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ command: "", active: true, message: "" });
    console.log(newCommand);
  }

  return (
    <div className="container bg-secondary">
      <div className="row p-5">
        <div className="col-sm-6">
          <Button>Plus</Button>
          <ul className="list-unstyled">
            {commands.map((command) => (
              <li>{command.command}</li>
            ))}
          </ul>
        </div>
        <div className="col-sm-6">
          <Form onSubmit={onSubmit}>
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
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Commands;
