package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import realEstatistic.model.Criteria;

import java.util.List;


@Mapper
@Component
public interface OptionDao { //need to connect to sql  //is it necessary?
    List<Criteria> getAllOptions();
}