import React, { useEffect, useState } from 'react';
import BookItem from '../../conponents/BookItem';

const Home = () => {
  const [books, setBooks] = useState([]);

  // 함수 실행시 최초 한번 실행되는 것
  useEffect(() => {
    fetch('http://localhost:8080/book') // 비동기 함수, 기본 get 통신. 다운로드 받는 동안 그림먼저 그려!
      .then((res) => res.json()) // promise : 응답이 오면 JS Object로 변경, ajax에서 acceptJson() 역할
      .then((res) => {
        console.log(1, res);
        setBooks(res);
      });
  }, []); // 빈 배열 넣으면 한번만 실행. // books 넣으면 변경될때마다 무한루프됨.

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default Home;
