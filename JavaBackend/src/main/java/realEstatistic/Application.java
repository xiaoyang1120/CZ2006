package realEstatistic;

import net.minidev.json.parser.ParseException;
import org.dom4j.DocumentException;
import org.json.JSONException;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.xml.sax.SAXException;
import realEstatistic.mapper.CronMRTDao;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

@SpringBootApplication
@MapperScan("softwareGenius.mapper")
public class Application implements CommandLineRunner{

	private JdbcTemplate jdbcTemplate;

	@Autowired
	public static void main(String[] args) throws ParserConfigurationException, SAXException, DocumentException, IOException, JSONException, ParseException, InterruptedException {
		SpringApplication.run(Application.class, args);
	}

	public void run(String... args) throws Exception {
		CronMRTDao.mrtListGenerator();
	}

}
