import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

class App extends Component {
  state = {
    count: 0,
    Website: '',
    Username: '',
    Password: '',
    searchText: '',
    istrue: false,
    initialArray: [],
  }

  handleSearchChange = e => {
    this.setState({searchText: e.target.value}) // Update searchText state with input value
  }

  changewebsite = e => {
    this.setState({
      Website: e.target.value,
    })
  }

  clicked = () => {
    const {istrue} = this.state
    this.setState({istrue: !istrue})
  }

  changeusername = e => {
    this.setState({Username: e.target.value})
  }

  changepassword = e => {
    this.setState({Password: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const {Website, Username, Password} = this.state

    const newArray = {
      id: uuidv4(),
      website: Website,
      username: Username,
      password: Password,
    }

    this.setState(prevState => ({
      initialArray: [...prevState.initialArray, newArray],
      Website: '',
      Username: '',
      Password: '',
    }))

    this.setState(prevState => ({count: prevState.count + 1}))
  }

  deleteicon = id => {
    this.deletevalue(id)
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  deletevalue = id => {
    const {initialArray} = this.state
    this.setState({
      initialArray: initialArray.filter(eacharray => eacharray.id !== id),
    })
  }

  handleSearchChange = e => {
    this.setState({searchText: e.target.value.toLowerCase()})
  }

  render() {
    const {
      count,
      Website,
      Username,
      Password,
      initialArray,
      istrue,
      searchText,
    } = this.state
    console.log(initialArray)

    const filteredPasswords = initialArray.filter(
      password =>
        password.website.toLowerCase().includes(searchText) || // Filter by website
        password.username.toLowerCase().includes(searchText) || // Filter by username
        password.password.toLowerCase().includes(searchText), // Filter by password
    )

    return (
      <div className="background-container">
        <img
          className="appLogo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />

        <div className="background-container">
          <div className="innercontainer1">
            <div className="innercontainercard1">
              <h1 className="p1">Add New Password</h1>
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="icon-container">
                  <div className="icon2">
                    <img
                      className="icon1"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                    />
                  </div>
                  <div>
                    <input
                      className="input"
                      type="text"
                      value={Website}
                      placeholder="Enter Website"
                      onChange={this.changewebsite}
                    />
                  </div>
                </div>
                <div className="icon-container">
                  <div className="icon2">
                    <img
                      className="icon1"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                      alt="username"
                    />
                  </div>
                  <div>
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter Username"
                      value={Username}
                      onChange={this.changeusername}
                    />
                  </div>
                </div>
                <div className="icon-container">
                  <div className="icon2">
                    <img
                      className="icon1"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                      alt="password"
                    />
                  </div>
                  <div>
                    <input
                      className="input"
                      type="password"
                      placeholder="Enter password"
                      value={Password}
                      onChange={this.changepassword}
                    />
                  </div>
                </div>
                <div className="button-container">
                  <button
                    type="submit"
                    className="addButton"
                    data-testid="delete"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div>
              <img
                className="passwordmanager1"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
              />
            </div>
          </div>
          <div className="innercontainer2">
            <div className="innercontainer2elements">
              <div className="innercontainer2subelements">
                <h1 className="yourpassword">Your Passwords</h1>
                <div className="count">
                  <p className="numbercount">{count}</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="icon2 innercontainer2icon2">
                  <img
                    className="icon1 "
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                    alt="search"
                  />
                </div>
                <div>
                  <input
                    className="input  innercontainer2input"
                    type="search"
                    placeholder="Search"
                    value={searchText}
                    onChange={this.handleSearchChange}
                  />
                </div>
              </div>
            </div>
            <hr className="hr" />
            <div className="passwords-container">
              <div className="passwords">
                <input
                  id="inputcheckbox"
                  className="checkbox"
                  type="checkbox"
                  onClick={this.clicked}
                />
                <label htmlFor="inputcheckbox" className="show">
                  Show Passwords
                </label>
              </div>
            </div>
            {filteredPasswords.length > 0 ? (
              <ul className="items">
                {filteredPasswords.map(each => (
                  <li className="userdetails" key={each.id}>
                    <div className="containerDetails">
                      <div className="containerDetails2">
                        <div className="lettercontainer">
                          <p>{each.website[0].toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="para">{each.website}</p>
                          <p className="para">{each.username}</p>
                          {istrue ? (
                            <p className="para">{each.password}</p>
                          ) : (
                            <img
                              className="longstars"
                              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                              alt="stars"
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <img
                          className="deleteicon"
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                          alt="delete"
                          onClick={() => this.deleteicon(each.id)} // Pass id to deleteicon method
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p>No Passwords</p>
                <img
                  className="nopassword"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
