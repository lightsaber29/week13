package com.jungle.week13;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class Week13Application {

	public static void main(String[] args) {
		SpringApplication.run(Week13Application.class, args);
	}
}
