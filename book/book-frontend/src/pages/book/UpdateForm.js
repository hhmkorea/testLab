import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Home from './Home';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateForm = () => {
  const propsParam = useParams();
  const id = propsParam.id;

  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/book/' + id)
      .then((res) => res.json())
      .then((res) => {
        setBook(res); // 여기 res는 항상 새로 만들어서 들어가는 것.
      });
  }, []);

  const changeValue = (e) => {
    setBook({
      ...book, // 기존값 지워지지 않게 spread 연산자로 뿌려둠.
      [e.target.name]: e.target.value, // name이 title이나 author값을 받아서 거기에 있는 value를 변경.
    });
  };

  let navigate = useNavigate();
  const submitBook = (e) => {
    e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.
    fetch('http://localhost:8080/book/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(book), // JS 오브젝트를 Json 형태로 만들어서 던짐.
    })
      .then((res) => {
        console.log('정상', res);
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        // Catch는 여기서 오류가 나야 실행됨(예:json 안들어왔을때)
        if (res !== null) {
          //props.history.push('/');
          navigate('/book/' + id);
        } else {
          alert('책 수정에 실패하였습니다.');
        }
      })
      .catch((error) => {
        console.log('실패', error);
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
          value={book.title}
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
          value={book.author}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default UpdateForm;
