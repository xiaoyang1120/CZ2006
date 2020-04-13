package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.HouseDao;
import realEstatistic.mapper.UserDao;
import realEstatistic.model.House;
import realEstatistic.model.User;

import java.util.List;
import java.util.UUID;

/**
 * This class implements services that are User-oriented
 */
@Service
public class UserService {
    private UserDao userDao;
    private HouseDao houseDao;

    @Autowired
    public UserService(UserDao userDao, HouseDao houseDao) {
        this.userDao = userDao;
        this.houseDao = houseDao;
    }

    /**
     * This method is to record a new user into SQL database
     * @param user the new, unassigned user record
     * @return the assigned id of the new user
     */
    public UUID AddNewUser(User user){
        user.setUserId(UUID.randomUUID());
        userDao.addUser(user);
        return user.getUserId();
    }

    /**
     * This method is to validate a user entered password
     * @param user the user-declared credential information
     * @return the id of the user; null if the credentials are incorrect
     */
    public UUID validatePassword(User user){
        User targetUser = userDao.getUserByEmail(user.getEmail());
        if ((targetUser != null) && targetUser.getPassword().equals(user.getPassword())){
            return targetUser.getUserId();
        } else {
            return null;
        }
    }

    /**
     * This method is to change the password of a user
     * @param user the user-declared credential information
     * @param newPassword hte new password (encrypted) to be updated
     * @return true if succeed; false if failed (incorrect old credential)
     */
    public Boolean changePassword(User user, String newPassword){
        if (validatePassword(user) != null) {
            userDao.changeUserPassword(user.getEmail(), newPassword);
            return true;
        } else {
            return false;
        }
    }

    /**
     * This method is to get the email of user according to the userId
     * @param userId the id of the user
     * @return the email of the user whose userId attribute matches with the userId parameter
     */
    public String getEmailById(UUID userId){return userDao.getEmailById(userId).getEmail();}

    /**
     * This method is to get the favourite list of a user
     * @param userId the id of the user
     * @return a list of House objects which are liked by the user
     */
    public List<House> getFavourites(UUID userId){
        return houseDao.getFavouriteByUserId(userId);
    }

    /**
     * This method is to get all posted house records of a user
     * @param userId the id of the user
     * @return a list of House objects which are posted by the user
     */
    public List<House> getPostedHouses(UUID userId){
        return houseDao.getPostedRecordsByOwnerId(userId);
    }
}
