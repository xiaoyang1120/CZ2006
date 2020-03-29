package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.HouseDao;
import realEstatistic.mapper.UserDao;
import realEstatistic.model.House;
import realEstatistic.model.User;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private UserDao userDao;
    private HouseDao houseDao;

    @Autowired
    public UserService(UserDao userDao, HouseDao houseDao) {
        this.userDao = userDao;
        this.houseDao = houseDao;
    }

    public UUID AddNewUser(User user){
        user.setUserId(UUID.randomUUID());
        userDao.addUser(user);
        return user.getUserId();
    }

    public UUID validatePassword(User user){
        User targetUser = userDao.getUserByEmail(user.getEmail());
        if ((targetUser != null) && targetUser.getPassword().equals(user.getPassword())){
            return targetUser.getUserId();
        } else {
            return null;
        }
    }

    public Boolean changePassword(User user, String newPassword){
        if (validatePassword(user) != null) {
            userDao.changeUserPassword(user.getEmail(), newPassword);
            return true;
        } else {
            return false;
        }
    }

    public String getEmailById(UUID userId){return userDao.getEmailById(userId).getEmail();}

    public List<House> getFavourites(UUID userId){
        return houseDao.getFavouriteByUserId(userId);
    }

    public List<House> getPostedHouses(UUID userId){
        return houseDao.getPostedRecordsByOwnerId(userId);
    }
}
