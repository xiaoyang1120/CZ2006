package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.MRT;

import java.io.IOException;
import java.util.List;

@Mapper
@Component
public interface MRTDao {
    List<MRT> getAllMRT() throws IOException;
    List<MRT> getMRTByLocation(@Param("startLat") float startLat, @Param("endLat") float endLat,
                                 @Param("startLon") float startLon, @Param("endLon") float endLon);
}
