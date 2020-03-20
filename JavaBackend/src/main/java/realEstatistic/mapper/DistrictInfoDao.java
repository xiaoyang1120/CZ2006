package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.DistrictInfo;

import java.util.List;
import java.util.UUID;

@Mapper
@Component
public interface DistrictInfoDao {
    List<DistrictInfo> getAllInfo();
    void updatePrimarySchool(@Param("id") UUID districtId, @Param("num") int numOfPrimarySchool);
    void updateSecondarySchool(@Param("id") UUID districtId, @Param("num") int numOfSecondarySchool);
    void updateJuniorCollege(@Param("id") UUID districtId, @Param("num") int numOfJuniorCollege);
    void updateMixedSchool(@Param("id") UUID districtId, @Param("num") int numOfMixedSchool);
    void updatePark(@Param("id") UUID districtId, @Param("num") int numOfPark);
    void updateClinic(@Param("id") UUID districtId,@Param("num") int numOfClinic);
    void updateHawkerCenter(@Param("id") UUID districtId, @Param("num") int numOfHawkerCenter);
    void updatePremiumBus(@Param("id") UUID districtId, @Param("num") int numOfPremiumBus);
    void updateEWaste(@Param("id") UUID districtId, @Param("num") int numOfEWaste);
    void updateSupermarket(@Param("id") UUID districtId, @Param("num") int numOfSupermarket);
    void updateMRT(@Param("id") UUID districtId, @Param("num") int numOfMRT);
}
