
/**
 * Dependencies
 * @ignore
 */
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Client from 'webauthn/client'
import { Chat, ChatClient, ChatServer } from "./component/Chat"

/**
 * Module Dependencies
 * @ignore
 */

/**
 * App
 * @ignore
 */
function App() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [loginChat, setLoginChat] = useState("hidden")
  const [loginFailed, setLoginFailed] = useState("hidden")
  const [registerChat, setRegisterChat] = useState("hidden")
  const [registerFailed, setRegisterFailed] = useState("hidden")
  const [webauthn] = useState(new Client())

  async function onRegister() {
    resetChat()
    const resulti = await webauthn.register({ name, username })
    console.log("resulti register", resulti)
    if (resulti && resulti.status === "ok") {
      setRegisterChat("visible")
    }
    else {
      setRegisterFailed("visible")
    }
  }

  function resetChat() {
    setLoginChat("hidden")
    setLoginFailed("hidden")
    setRegisterChat("hidden")
    setRegisterFailed("hidden")
  }

  async function onLogin() {
    resetChat()
    const resulti = await webauthn.login({ username })
    if (resulti && resulti.status === "ok") {
      setLoginChat("visible")
    }
    else {
      setLoginFailed("visible")
    }
  }

  async function onLogout() {
    resetChat()
    webauthn.logout()
  }

  return (
    <Container>
      <Row style={{ paddingTop: 80 }}>
        <Col>
          <h3>Register</h3>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={e => {
                  resetChat()
                  setUsername(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
              <Form.Text className="text-muted">This name will be displayed publicly.</Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={onRegister}>
              Register
            </Button>
          </Form>
          <Row style={{ paddingTop: 20 }}>
            <Col>
              <Chat>
                <ChatClient pose={registerChat}>Hey server! My operators name is "{username}" and he wants to create a new account!</ChatClient>
                <ChatServer pose={registerChat}>Hi client! "{username}" is ok! Please send me your public key.</ChatServer>
                <ChatClient pose={registerChat}>Ok I will create a new key pair. Wait a moment!</ChatClient>
                <ChatClient pose={registerChat}><i>Hey operator! Are you there? Please verify you in front of this device e.g. with your fingerprint. Thank you!</i></ChatClient>
                <ChatClient pose={registerChat}>Done! Here is my public key!</ChatClient>
                <ChatServer pose={registerChat}>Thank you! I saved the public key with your name in may database. "{username}" is now registered!</ChatServer>
              </Chat>
              <Chat>
                <ChatClient pose={registerFailed}>Hey server! My operators name is "{username}" and he wants to create a new account!</ChatClient>
                <ChatServer pose={registerFailed}>Sorry! "{username}" is already taken. Please try another name!</ChatServer>
              </Chat>
            </Col>
          </Row>
        </Col>
        <Col>
          <h3>Login</h3>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={e => {
                resetChat()
                setUsername(e.target.value)
              }}></Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={onLogin}>
              Login
            </Button>
          </Form>
          <Row style={{ paddingTop: 20 }}>
            <Col>
              <Chat>
                <ChatClient pose={loginChat}>Hey server! My operators name is "{username}" and he wants to sign in!</ChatClient>
                <ChatServer pose={loginChat}>Ok client! I found "{username}" in my database. Please sign this random string (chellenge) so I really know it's you.</ChatServer>
                <ChatClient pose={loginChat}>Ok I will sign your chellenge with my private key.</ChatClient>
                <ChatClient pose={loginChat}><i>Hey operator! Are you there? Please verify you in front of this device e.g. with your fingerprint. Thank you!</i></ChatClient>
                <ChatClient pose={loginChat}>Done! Here's my signature of your chellenge.</ChatClient>
                <ChatServer pose={loginChat}>Thank you! Let me check your signature with your public key in my database.</ChatServer>
                <ChatServer pose={loginChat}>It's valid. You are signed as "{username}"!</ChatServer>
              </Chat>
              <Chat>
                <ChatClient pose={loginFailed}>Hey server! My operators name is "{username}" and he wants to sign in!</ChatClient>
                <ChatServer pose={loginFailed}>Sorry! "{username}" is not in my database. Please register first!</ChatServer>
              </Chat>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ paddingTop: 80 }}>
        <Col>
          <Button variant="outline-primary" block onClick={onLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

/**
 * Exports
 * @ignore
 */
export default App;
