package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.Park;

import java.util.List;

@Mapper
@Component
public interface ParkDao {
    List<Park> getAllPark();
    List<Park> getParkByLocation(@Param("startLat") float startLat, @Param("endLat") float endLat,
                                               @Param("startLon") float startLon, @Param("endLon") float endLon);
}