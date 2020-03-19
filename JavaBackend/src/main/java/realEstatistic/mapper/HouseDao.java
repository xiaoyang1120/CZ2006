package realEstatistic.mapper;

import org.apache.ibatis.annotations.Param;
import realEstatistic.model.House;

import java.util.List;
import java.util.UUID;

public interface HouseDao {
    void addHouse(House house);
    void editHouse(House house);
    List<House> getHouseByDistrictID(@Param("districtId") UUID districtId);
    House getHouseById(@Param("houseId") UUID houseId);
    void addHouseToFavourite(@Param("email") String email, @Param("houseId") UUID houseId);
    List<House> getFavouriteByUserId(@Param("userId") UUID userId);
    void getPostedRecordsByOwnerId(@Param("userId") UUID userId);
    void updateHouseStatus(@Param("houseId") UUID houseId, @Param("isAvailable") boolean isAvailable);
//    void updateHouseDescription(id: String, description: String)
//    void updateHouseImage(id: String, image: String)

}
