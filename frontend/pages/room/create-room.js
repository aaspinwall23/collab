import React, { createRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Head from "next/head";
import { COLORS } from "../../styles/colors";
import ADD_ROOM from "../../components/polloTest/CreateVoteOptions";
import { useMutation } from "@apollo/client";
import Boop from "../../components/animations/Boop";
export default function LandingPage() {
  // these are the options being set
  const [options, setOptions] = useState([]);
  const [created, setCreated] = useState(false);
  const [addRoom] = useMutation(ADD_ROOM);
  // setting roomId here is used to access the Link to bring the user to the created-room
  // TODO: Access the roomId in a cleaner way?
  const [roomId, setRoomId] = useState(null);
  // this is the individual option being set in the form that's pushed to the array of total options
  const individualOption = createRef(null);
  // Creates the room ID (Will be replaced by automated function)
  const createRoomId = createRef(null);
  // this creates the room name
  const createRoomName = createRef(null);
  // this creates the rooms times limit in seconds (TODO: Change seconds to minutes and
  // create a function to change minutes to seconds in timer function to simplify it for the user)
  // function that pushes individual optiuon to total options
  const createTimeLimit = createRef(null);
  const createOptionsArray = () => {
    setOptions([individualOption.current.value, ...options]);
    individualOption.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOptionsArray();
  };
  // this adds the array of options to the database
  const submitRoom = async () => {
    const res = await addRoom({
      variables: {
        name: createRoomName.current.value, // to change
        id: createRoomId.current.value, // we will generate this on backend
        timeLimit: createTimeLimit.current.value,
        voteOptions: options,
      },
    });

    const { success, message, room } = res.data.addRoom;

    // clears the List
    if (success) {
      setCreated(true);
      setRoomId(room.id);
      setOptions([]);
    } else {
      alert(message);
    }
  };

  return (
    <Container>
      <Head>
        <title>Create A Room!</title>
      </Head>
      <Header>Create A Room Page</Header>
      <Description>
        This page will be used to create a room / have the configurations for
        the room
      </Description>
      <Link href="/">
        <Button>Home</Button>
      </Link>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {/* Fix variable names */}
          {/* useRef for the two below input to validate variables: name, timelimit*/}
          <div>
            <label>
              Room Name
              <input type="text" placeholder="Room Name" ref={createRoomName} />
            </label>
          </div>
          <div>
            <label>
              Room ID (ex: 1A3E)
              <input type="text" placeholder="Room ID" ref={createRoomId} />
            </label>
          </div>
          <div>
            <label>
              {" "}
              Time limit (in seconds)
              <input
                type="number"
                placeholder="Time Limit in seconds"
                ref={createTimeLimit}
              />
            </label>
          </div>
          <div>
            <label>
              Add some options
              <input type="text" placeholder="Options" ref={individualOption} />
            </label>
          </div>
          <div>
            <input type="submit" value="Add Option" />
          </div>
          {options.length >= 1 ? (
            <ul className="overflow">
              {options &&
                options.map((option, index) => (
                  <li className="each-option" key={index}>
                    <p>{option}</p>
                  </li>
                ))}
            </ul>
          ) : (
            " "
          )}
          <button onClick={submitRoom}>Submit Room</button>
        </form>
      </FormContainer>
      {created && (
        <Boop rotation={15}>
          <Link href={`/room/voting-room/${roomId}`}>
            <button>Take Me To The Vote!</button>
          </Link>
        </Boop>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  .overflow {
      width: 200px;
      max-height: 100px;
      overflow: auto;
      list-style-type: none;
      border: 1px solid black;
      border-radius: 8px;
      box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.3);
      padding: 5px 8px;
      text-align: center;
    };
  };
  .each-option {
      border-bottom: 1px solid black;
      &:last-child {
      border-bottom: none;
    };
  };
  `;

const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.85);
    padding: 25px;
    margin: 15px;
    border-radius: 10px;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.5);
  }
  div {
    margin: 8px;
  }
  input {
    width: 200px;
    margin-top: 5px;
  }
  input,
  label {
    display: block;
    padding: 5px;
  }
  label {
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

const Header = styled.h1`
  color: ${COLORS.SHADES.OFFWHITE};
  text-align: center;
  margin-top: 0;
  padding-top: 15px;
  font-size: 2rem;
`;

const Description = styled.p`
  color: ${COLORS.SHADES.OFFWHITE};
  margin-left: 1rem;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 8px;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 2px;
  border: 3px solid #293241;
  cursor: pointer;
  &:active {
    background: #e5e5e5;
    box-shadow: inset 0px 0px 5px #c1c1c1;
    outline: none;
    transform: scale(0.9);
  }
`;
