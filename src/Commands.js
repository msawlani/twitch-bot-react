import React from "react";
import commands from "./data/commands.json";

const Commands = () => {
  return (
    <div className="container bg-secondary">
      <div className="row p-5">
        <div className="col-sm-6">
          <button>Plus</button>
          <ul className="list-unstyled">
            {commands.commands.map((command, id) => (
              <li key={id}>{`!${command.command}`}</li>
            ))}
          </ul>
        </div>
        <div className="col-sm-6">
          <form>
            <input placeholder="Name"></input>
            <button>checkbox</button>
            <label>Mod & up</label>
            <input placeholder="Cooldown in seconds"></input>
            <textarea placeholder="Message"></textarea>
          </form>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Commands;
