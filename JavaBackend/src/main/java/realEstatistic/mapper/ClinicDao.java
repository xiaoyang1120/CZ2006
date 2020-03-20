package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.Clinic;

import java.util.List;

@Mapper
@Component
public interface ClinicDao {
    List<Clinic> getAllClinic();
    List<Clinic> getClinicByLocation(@Param("startLat") float startLat, @Param("endLat") float endLat,
                                               @Param("startLon") float startLon, @Param("endLon") float endLon);
}
