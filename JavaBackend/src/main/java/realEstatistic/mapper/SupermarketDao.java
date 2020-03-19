package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.Supermarket;

import java.util.List;

@Mapper
@Component
public interface SupermarketDao {
    List<Supermarket> getAllSupermarket();
    List<Supermarket> getSupermarketByLocation(@Param("startLat") float startLat, @Param("endLat") float endLat,
                                               @Param("startLon") float startLon, @Param("endLon") float endLon);
}
