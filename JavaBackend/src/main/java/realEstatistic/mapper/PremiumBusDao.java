package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.PremiumBus;

import java.util.List;

@Mapper
@Component
public interface PremiumBusDao {
    List<PremiumBus> getAllPremiumBus();
    List<PremiumBus> getPremiumBusByLocation(@Param("startLat") float startLat, @Param("endLat") float endLat,
                                     @Param("startLon") float startLon, @Param("endLon") float endLon);
}