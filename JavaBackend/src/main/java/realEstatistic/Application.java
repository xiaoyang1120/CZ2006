package realEstatistic;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import realEstatistic.mapper.CronSupermarketDao;

@SpringBootApplication
@MapperScan("softwareGenius.mapper")
public class Application implements CommandLineRunner{

	private JdbcTemplate jdbcTemplate;

	@Autowired
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	public void run(String... args) throws Exception {

	}

}
