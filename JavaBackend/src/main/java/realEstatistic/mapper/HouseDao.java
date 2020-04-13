package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.House;

import java.util.List;
import java.util.UUID;

/**
 * This interface defines the legal operations to interact with the house SQL table.
 * Detailed implementation is defined in HouseDao.xml using MyBatis 3.
 */
@Mapper
@Component
public interface HouseDao {
    /**
     * This method is to add a house record to SQL database
     * @param house the house to be added
     */
    void addHouse(House house);

    /**
     * This method is to update a house record to SQL database
     * @param house the house with updated information
     */
    void editHouse(House house);

    /**
     * This method is to get all house records which belongs to the given District
     * @param districtId the id of the District
     * @return a List of House objects
     */
    List<House> getHouseByDistrictId(@Param("districtId") UUID districtId);

    /**
     * This method is to get the particular record of the given house
     * @param houseId the id of the house
     * @return House object whose houseid attribute matches with the given houseId
     */
    House getHouseById(@Param("houseId") UUID houseId);

    /**
     * This method is to add a house record to the favourite list of a user
     * @param userId the id of the user
     * @param houseId the id of the house to be added
     */
    void addHouseToFavourite(@Param("userId") UUID userId, @Param("houseId") UUID houseId);

    /**
     * This method is to remove a house record from the favourite list of a user
     * @param userId the id of the user
     * @param houseId the id of the house to be removed
     */
    void removeHouseFromFavourite(@Param("userId") UUID userId, @Param("houseId") UUID houseId);

    /**
     * This method is to get the favourite list of a user
     * @param userId the id of the user
     * @return a list of House objects which are liked by the user
     */
    List<House> getFavouriteByUserId(@Param("userId") UUID userId);

    /**
     * This method is to get all posted house records of a user
     * @param userId the id of the user
     * @return a list of House objects which are posted by the user
     */
    List<House> getPostedRecordsByOwnerId(@Param("userId") UUID userId);

}
