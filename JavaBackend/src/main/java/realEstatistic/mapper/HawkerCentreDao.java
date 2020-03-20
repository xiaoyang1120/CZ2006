package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.HawkerCentre;

import java.util.List;

@Mapper
@Component
public interface HawkerCentreDao {
    List<HawkerCentre> getAllHawkerCentre();
    List<HawkerCentre> getHawkerCentreByLocation(@Param("startLat") float startLat, @Param("endLat") float endLat,
                                 @Param("startLon") float startLon, @Param("endLon") float endLon);
}
