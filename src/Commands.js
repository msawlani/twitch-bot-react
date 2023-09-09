import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { config } from "./Constants";
import EditCommand from "./EditCommand";
import AddCommands from "./AddCommandModule";
import { client } from "./bot";
import { useOutletContext } from "react-router-dom";

const url = config.url;

const Commands = () => {
  const [commands, setCommands] = useState([]);
  const [userData, setUserData] = useOutletContext();

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
    client.say("sinsofaninja", command + " command has been deleted!");
  }

  return (
    <div className="container d-flex flex-column bg-dark">
      <div className="row p-5 flex-grow-1 overflow-auto chat">
        <div className="p-4 float-end">
          <AddCommands userData={userData} />
        </div>
        <ul className="list-unstyled">
          {commands.map((command) => (
            <div className="row p-3">
              <div className="col-12 col-sm-6">
                <li>
                  {command.command} | {command.message}
                </li>
              </div>
              <div className="col-12 col-sm-6">
                <div className="d-flex justify-content-evenly">
                  <EditCommand
                    command={command}
                    userData={userData}
                  ></EditCommand>
                  <Button
                    onClick={(e) => deleteCommand(e, command.command)}
                    disabled={
                      userData?.login !== process.env.REACT_APP_TWITCH_USER
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Commands;
