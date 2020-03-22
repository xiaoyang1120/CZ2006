package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.DistrictDao;
import realEstatistic.mapper.HouseDao;
import realEstatistic.mapper.UserDao;
import realEstatistic.model.House;

import java.util.List;
import java.util.UUID;

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

    public UUID AddHouse(House house){
        house.setHouseId(UUID.randomUUID());
        houseDao.addHouse(house);
        return house.getHouseId();
    }

    public void editHouse(House house){
        houseDao.editHouse(house);
    }

    public List<House> getAllHouseByDistrictId(UUID districtId){
        return houseDao.getHouseByDistrictID(districtId);
    }

    public House getHouseById(UUID houseId){
        return houseDao.getHouseById(houseId);
    }

    public void addHouseToFavourite(String email, UUID houseId){
        houseDao.addHouseToFavourite(email, houseId);
    }

}
