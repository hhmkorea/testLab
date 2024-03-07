import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Detail = (props) => {
  const propsParam = useParams();
  const id = propsParam.id;

  //const id = props.match.params.id;

  const [book, setBook] = useState({
    id: '',
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

  let navigate = useNavigate();

  const deleteBook = () => {
    fetch('http://localhost:8080/book/' + id, {
      method: 'DELETE',
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          navigate('/');
        } else {
          alert('삭제 실패');
        }
      });
  };

  const updateBook = () => {
    navigate('/updateForm/' + id);
  };

  return (
    <div>
      <h1>책 상세보기</h1>
      <Button variant="warning" onClick={updateBook}>
        수정
      </Button>{' '}
      <Button variant="danger" onClick={deleteBook}>
        {' '}
        {/* 이렇게 해도 됨.onClick={() => deleteBook(book.id)} */}
        삭제
      </Button>
      <hr />
      <h1>{book.title}</h1>
      <h3>{book.author}</h3>
    </div>
  );
};

export default Detail;
