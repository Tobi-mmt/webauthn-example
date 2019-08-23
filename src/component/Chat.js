import React from "react"
import { ListGroup, Row, Col, } from 'react-bootstrap'
import posed from 'react-pose';
const Box = posed.div({
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "100%", transition: ({ i }) => ({ delay: i * 3500 }) },
});

const Chat = ({ children, ...rest }) => {
  return (
    <div>
      {children.map((child, i) => React.cloneElement(child, {
        ...rest,
        i
      }))}
    </div>
  )
}

const ChatClient = ({ children, ...rest }) => (
  <Box {...rest}>
    <Row style={{ paddingTop: 15, alignSelf: "center" }}>
      <Col xs={9} style={{ alignSelf: "center" }}>
        <ListGroup.Item variant="primary">{children} </ListGroup.Item>
      </Col>
      <Col>
        <img src="https://webauthn.guide/dist/images/phone-avatar-copy.svg" alt="client" />
      </Col>
    </Row>
  </Box>
)
const ChatServer = ({ children, ...rest }) => (
  <Box {...rest}>
    <Row style={{ paddingTop: 15, alignSelf: "center" }}>
      <Col>
        <img src="https://webauthn.guide/dist/images/browser-avatar-copy-2.svg" alt="client" />
      </Col>
      <Col xs={9} style={{ alignSelf: "center" }}>
        <ListGroup.Item variant="success">{children} </ListGroup.Item>
      </Col>
    </Row>
  </Box>
)


export { Chat, ChatClient, ChatServer }