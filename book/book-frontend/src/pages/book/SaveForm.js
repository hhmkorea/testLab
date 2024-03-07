import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

const SaveForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  const changeValue = (e) => {
    setBook({
      ...book, // 기존값 지워지지 않게 spread 연산자로 뿌려둠.
      [e.target.name]: e.target.value, // name이 title이나 author값을 받아서 거기에 있는 value를 변경.
    });
  };

  let navigate = useNavigate();
  const submitBook = (e) => {
    e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.
    fetch('http://localhost:8080/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(book), // JS 오브젝트를 Json 형태로 만들어서 던짐.
    })
      .then((res) => {
        console.log(1, res);
        if (res.status === 201) {
          // try~catch로 해도 됨.
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          //props.history.push('/');
          navigate('/');
        } else {
          alert('책 등록에 실패하였습니다.');
        }
      });
  };

  return (
    <Form onSubmit={submitBook}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        {/* bootstrap insert text */}
        <Form.Control
          type="text"
          placeholder="Enter Title"
          onChange={changeValue}
          name="title"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Author"
          onChange={changeValue}
          name="author"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SaveForm;
