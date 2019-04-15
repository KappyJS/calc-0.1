import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class Authorization extends React.Component {
    constructor(props, context) {
      super(props, context);
  
     
      this.input = React.createRef();
      this.state = {
        show: false,
      };
    }
  
    handleClick=(val)=> {
     this.authorize(this.input.current.value)
    }


    authorize = value =>{

        if (value==="12345"){
            localStorage.setItem('isAdmin', true);
            this.setState({show:false})
           this.props.getAuthorize();
           window.location.reload()
        }
    }

    unauthorize = () =>{

        localStorage.removeItem('isAdmin');
        this.props.getAuthorize();
        window.location.reload()
    }
    
    handleShow=()=> {
      this.setState({ show: true });
    }

    handleClose=()=> {
        this.setState({ show: false });
      }

      handleExit=()=> {
        this.unauthorize();
      }
  
    render() {
      return (
        <>
    
          {this.props.isAdmin && <Button variant="outline-light" onClick={this.handleExit}>
              Выйти
              </Button>}
              {!this.props.isAdmin&& <Button variant="outline-light" onClick={this.handleShow}>
              Войти
              </Button>}
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Авторизация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Введите уникальный ключ</Form.Label>
    <Form.Control ref={this.input}  placeholder="Введите ключ" />
    <Form.Text className="text-muted">
      Если у вас нет ключа, обратитесь в центр поддержки
    </Form.Text>
  </Form.Group>

  
</Form>
            </Modal.Body>
            <Modal.Footer>
         <Button variant="outline-success" onClick={this.handleClick}>
              Войти
              </Button>

             
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

  
  