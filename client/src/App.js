import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    users: [],
    id: 0,
    name: "",
    email: "",
    password: "",
  });

  const fetchData = () => {
    axios.get("http://localhost:8080/api/").then((res) => {
      setState({
        users: res.data,
        id: 0,
        name: "",
        email: "",
        password: "",
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitUser = (event, id) => {
    event.preventDefault();
    if (id === 0) {
      axios
        .post("http://localhost:8080/api/", {
          name: state.name,
          email: state.email,
          password: state.password,
        })
        .then(fetchData());
    } else {
      axios
        .put("http://localhost:8080/api/", {
          id: state.id,
          name: state.name,
          email: state.email,
          password: state.password,
        })
        .then(fetchData());
    }
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/${id}`).then(fetchData());
  };

  const editUser = (id) => {
    axios
      .get(`http://localhost:8080/api/${id}`)
      .then((res) => {
        setState({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
        });
      })
      .then(fetchData());
  };

  const handleChange = (e) => {
    console.log(e.target.id);
    console.log(e.target.value);
    setState({ ...state, [e.target.id]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s6">
          <form onSubmit={(e) => submitUser(e, state.id)}>
            <div class="input-field col s12">
              <i class="material-icons prefix">person</i>
              <input
                onChange={handleChange}
                value={state.name}
                type="text"
                id="name"
                class="autocomplete"
              />
              <label for="name">Name</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">email</i>
              <input
                onChange={handleChange}
                value={state.email}
                type="email"
                id="email"
                class="autocomplete"
              />
              <label for="email">Email</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">vpn_key</i>
              <input
                onChange={handleChange}
                value={state.password}
                type="password"
                id="password"
                class="autocomplete"
              />
              <label for="password">Password</label>
            </div>
            <button
              class="btn waves-effect waves-light right"
              type="submit"
              name="action"
            >
              Submit
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
        <div className="col s6">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {state.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      onClick={() => editUser(user.id)}
                      class="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      <i class="material-icons">edit</i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteUser(user.id)}
                      class="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      <i class="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
