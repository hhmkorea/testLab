package com.cos.book.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cos.book.domain.Book;
import com.cos.book.service.BookService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // final 변수의 생성자를 만들어서 받아줌.
@RestController
public class BookController {
	
	private final BookService bookService;

	// security (라이브러리 적용) - CORS 정책을 가지고 있음. 필터(문지기)역할로 보안 적용. 시큐리티가 CORS를 해제해야함, @CrossOrigin 필요없으니 삭제.
	@CrossOrigin // JS로 데이터 통신 받을 수 있게 허락해줌. Controller 진입 직전에 적용됨.
	@PostMapping("/book") // http 통신으로 데이터 주고받는 건 보통 "api/book"로 url에 api 붙여줌.
	public ResponseEntity<?> save(@RequestBody Book book) { // @RequestBody : json 형태로 데이타 받음.		
		// List<Book> abc = new ArrayList<Book>();
		// java 1.6이상은 new ArrayList<>() 만 넣어도 됨.
		//<?>은 리턴될때 데이터 타입이 정해짐.
		return new ResponseEntity<>(bookService.save(book), HttpStatus.CREATED); // 201
		// ResponseEntity : book타입 데이타랑 HttpStatus도 함께 담아서 리턴함.
	}
	
	@CrossOrigin
	@GetMapping("/book")
	public ResponseEntity<?> findAll() { // <?> 어떤 타입을 리턴할지 모름, 어떤 타입이든 리턴 가능,
		return new ResponseEntity<>(bookService.findAll(), HttpStatus.OK); // 200 
	}	
	
	@CrossOrigin
	@GetMapping("/book/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		return new ResponseEntity<>(bookService.findbyOne(id), HttpStatus.OK); 
	}
	
	@CrossOrigin
	@PutMapping("/book/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Book book) { 
		return new ResponseEntity<>(bookService.update(id, book), HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("/book/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id) {
		return new ResponseEntity<>(bookService.delete(id), HttpStatus.OK);
	}
}
