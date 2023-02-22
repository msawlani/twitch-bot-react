import React, { useEffect, useState, useRef } from "react";
import commands from "./data/commands.json";
import { Form, Button, FormCheck, FormControl, Modal } from "react-bootstrap";
import { client } from "./bot.js";
import { config } from "./Constants";
import EditCommand from "./EditCommand";

const url = config.url;

const Commands = () => {
  const [commands, setCommands] = useState([]);
  const messageRef = useRef();
  const commandRef = useRef();

  useEffect(() => {
    fetch(`${url}/commands`)
      .then((res) => res.json())
      .then((data) => {
        setCommands(data);
      });
  });
  async function deleteCommand(e, command) {
    // When a post request is sent to the create url, we'll add a new record to the database.
    await fetch(`${url}/commands/${command}`, { method: "DELETE" }).catch(
      (err) => {
        alert(err);
      }
    );
  }

  // This function will handle the submission.
  async function onSubmit(e) {
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
    console.log(command);
  }

  return (
    <div className="container bg-secondary">
      <div className="row p-5">
        <div className="col-sm-6">
          <div className="float-right">
            <Button>Plus</Button>
          </div>

          <ul className="list-unstyled">
            {commands.map((command) => (
              <div className="row p-1">
                <div className="col-12 col-sm-6">
                  <li>
                    {command.command} | {command.message}
                  </li>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="d-flex justify-content-evenly">
                    <EditCommand command={command}></EditCommand>
                    <Button onClick={(e) => deleteCommand(e, command.command)}>
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
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Commands;
