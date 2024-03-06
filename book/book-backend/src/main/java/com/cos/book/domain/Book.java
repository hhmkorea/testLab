package com.cos.book.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
//@Data // Getter, Setter 자동으로 만들어줌.
@Entity // 서버 실행시에 테이블이 h2에 생성됨. ORM(Object Relation Mapping) 
@Table(name="book")
@Getter
@Setter
public class Book {
	@Id // PK를 해당 변수로 하겠다는 읨.
	@GeneratedValue(strategy = GenerationType.IDENTITY) // 해당 데이터베이스 번호증가 전략을 따라가겠다.
	private Long id; // long이 아닌 Long으로 하는 이유, Wrapping Class로 넣으면 null로도 넣을 수 있음.
	
	private String title;
	private String author;
	
}
