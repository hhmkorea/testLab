import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  return (
    <div>
      <h1>상세보기</h1>
      <hr />
      <h1>{book.title}</h1>
      <h3>{book.author}</h3>
    </div>
  );
};

export default Detail;
