package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.DistrictDao;
import realEstatistic.mapper.HouseDao;
import realEstatistic.mapper.UserDao;
import realEstatistic.model.House;

import java.util.List;
import java.util.UUID;

/**
 *  This class implements services that are House-oriented
 */
@Service
public class HouseService {
    private HouseDao houseDao;
    private DistrictDao districtDao;
    private UserDao userDao;

    @Autowired
    public HouseService(HouseDao houseDao, DistrictDao districtDao, UserDao userDao) {
        this.houseDao = houseDao;
        this.districtDao = districtDao;
        this.userDao = userDao;
    }

    /**
     * This method is to add a new house record to database
     * @param house the new, unassigned house record
     * @return the assigned id of the new house
     */
    public UUID AddHouse(House house){
        house.setHouseId(UUID.randomUUID());
        houseDao.addHouse(house);
        return house.getHouseId();
    }

    /**
     * This method is to update a existing house record in database
     * @param house the updated house record
     */
    public void editHouse(House house){
        houseDao.editHouse(house);
    }

    /**
     * This method is to get all house records which belongs to the given District
     * @param districtId the id of the District
     * @return a List of House objects
     */
    public List<House> getAllHouseByDistrictId(UUID districtId){
        return houseDao.getHouseByDistrictId(districtId);
    }

    /**
     * This method is to get the particular record of the given house
     * @param houseId the id of the house
     * @return House object whose houseid attribute matches with the given houseId
     */
    public House getHouseById(UUID houseId){
        return houseDao.getHouseById(houseId);
    }

    /**
     * This method is to add a house record to the favourite list of a user
     * @param userId the id of the user
     * @param houseId the id of the house to be added
     */
    public void addHouseToFavourite(UUID userId, UUID houseId){
        houseDao.addHouseToFavourite(userId, houseId);
    }

    /**
     * This method is to remove a house record from the favourite list of a user
     * @param userId the id of the user
     * @param houseId the id of the house to be removed
     */
    public void removeHouseFromFavourite(UUID userId, UUID houseId) {houseDao.removeHouseFromFavourite(userId, houseId);}
}
