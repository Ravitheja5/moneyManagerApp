import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    websiteInput: 'w1',
    usernameInput: 'u1',
    passwordInput: 'p1',
    listOfPasswords: [],
    searchInput: '',
    showPasswords: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {usernameInput, passwordInput, websiteInput} = this.state

    const newObject = {
      name: usernameInput,
      password: passwordInput,
      website: websiteInput,
      id: v4(),
    }

    this.setState(prevState => ({
      listOfPasswords: [...prevState.listOfPasswords, newObject],
      usernameInput: '',
      passwordInput: '',
      websiteInput: '',
    }))
  }

  onClickCheckhBox = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickDelete = id => {
    this.setState(prevState => ({
      listOfPasswords: prevState.listOfPasswords.filter(
        eachObject => eachObject.id !== id,
      ),
    }))
  }

  render() {
    const {
      showPasswords,
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      listOfPasswords,
    } = this.state
    const filteredList = listOfPasswords.filter(eachObject =>
      eachObject.website.includes(searchInput),
    )
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="image-logo"
        />
        <div className="upper-section">
          <form className="form-container" onSubmit={this.onClickAddButton}>
            <h1>Add New Password</h1>
            <div className="input-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="icon"
              />
              <input
                value={websiteInput}
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
              />
            </div>

            <div className="input-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="icon"
              />
              <input
                value={usernameInput}
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="icon"
              />
              <input
                value={passwordInput}
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
            </div>

            <button className="add-button" type="submit">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="upper-image"
          />
        </div>
        <div className="lower-section">
          <nav className="nav-bar">
            <h1>
              Your Passwors <span>{listOfPasswords.length}</span>
            </h1>
            <div className="input-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="icon"
              />
              <input
                value={searchInput}
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </nav>
          <input
            className="check-box"
            value={showPasswords}
            type="checkbox"
            onClick={this.onClickCheckhBox}
          />

          {filteredList.length !== 0 ? (
            <ul className="unordered-list">
              {listOfPasswords.map(eachObject => {
                const {id, name, website, password} = eachObject
                return (
                  <li className="box" key={eachObject.id}>
                    <p className="para">{website[0]}</p>
                    <div className="small-box">
                      <p>{website}</p>
                      <p>{name}</p>
                      {showPasswords === true ? (
                        password
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="stars-image"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => this.onClickDelete(id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="icon"
                        type="button"
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="passwords"
              className="no-image"
            />
          )}
        </div>
      </div>
    )
  }
}

export default App


