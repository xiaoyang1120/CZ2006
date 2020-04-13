package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.School;

import java.util.List;

/**
 * This interface defines the legal operations to read buffered school information.
 * Solid implementations are done in CronSchoolDao class.
 */
@Mapper
@Component
public interface SchoolDao {
    List<School> getAllPrimary();
    List<School> getPrimaryByLocation(@Param("startLat") float startLat, @Param("endLat") float endLat,
                                 @Param("startLon") float startLon, @Param("endLon") float endLon);
    List<School> getAllSecondary();
    List<School> getSecondaryByLocation(@Param("startLat") float startLat, @Param("endLat") float endLat,
                                      @Param("startLon") float startLon, @Param("endLon") float endLon);
    List<School> getAllJc();
    List<School> getJcByLocation(@Param("startLat") float startLat, @Param("endLat") float endLat,
                                      @Param("startLon") float startLon, @Param("endLon") float endLon);

    List<School> getAllMixed();
    List<School> getMixedByLocation(@Param("startLat") float startLat, @Param("endLat") float endLat,
                                      @Param("startLon") float startLon, @Param("endLon") float endLon);
}
