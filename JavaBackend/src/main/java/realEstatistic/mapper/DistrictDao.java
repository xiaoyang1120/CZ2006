package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import realEstatistic.model.District;

import java.util.List;
import java.util.UUID;

/**
 * This interface defines the legal operations to interact with the district SQL table.
 * Detailed implementation is defined in DistrictDao.xml using MyBatis 3.
 */
@Mapper
@Component
public interface DistrictDao {
    void addNewDistrict(District district);

    /**
     * This method is used to get a District by the attribute districtId
     * @param districtId the id of the District
     * @return a District object
     */
    District getDistrictById(UUID districtId);

    /**
     * This method is used to get all existing District
     * @return a List of District object
     */
    List<District> getAllDistrict();
}
