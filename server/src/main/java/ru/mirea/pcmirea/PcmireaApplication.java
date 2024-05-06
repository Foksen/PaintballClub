package ru.mirea.pcmirea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class PcmireaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PcmireaApplication.class, args);
	}

}
