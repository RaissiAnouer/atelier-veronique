package com.AtelierVeronique.Atelier.Veronique;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class AtelierVeroniqueApplication {

	private static final Logger logger = LoggerFactory.getLogger(AtelierVeroniqueApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(AtelierVeroniqueApplication.class, args);
	}

	@Bean
	public CommandLineRunner cleanDatabaseSchema(JdbcTemplate jdbcTemplate) {
		return args -> {
			try {
				// We first try to drop foreign keys from profile_id to tbl_orders if any exist
				jdbcTemplate.execute("SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE " +
						"WHERE TABLE_NAME = 'tbl_orders' AND COLUMN_NAME = 'profile_id' AND CONSTRAINT_SCHEMA = DATABASE() AND REFERENCED_TABLE_NAME IS NOT NULL " +
						"INTO @fk_name;");
				jdbcTemplate.execute("SET @s = IF(@fk_name IS NOT NULL, CONCAT('ALTER TABLE tbl_orders DROP FOREIGN KEY ', @fk_name), 'SELECT 1');");
				jdbcTemplate.execute("PREPARE stmt FROM @s; EXECUTE stmt; DEALLOCATE PREPARE stmt;");
			} catch (Exception e) {
				// Ignore errors if foreign key logic doesn't apply
			}

			try {
				// Drop the problematic column
				jdbcTemplate.execute("ALTER TABLE tbl_orders DROP COLUMN profile_id");
				logger.info("Successfully dropped unused 'profile_id' column from tbl_orders.");
			} catch (Exception e) {
				logger.info("Column 'profile_id' not found in tbl_orders or already dropped.");
			}
		};
	}

}
