package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import realEstatistic.model.District;

import java.util.List;
import java.util.UUID;

@Mapper
@Component
public interface DistrictDao {
    District getDistrictById(UUID districtId);
    List<District> getAllDistrict();
}
