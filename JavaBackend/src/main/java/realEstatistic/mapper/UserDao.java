package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.User;

import java.util.UUID;

/**
 * This interface defines the legal operations to interact with the user SQL table.
 * Detailed implementation is defined in UserDao.xml using MyBatis 3.
 */
@Mapper
@Component
public interface UserDao {
    /**
     * This method is to record a new user into SQL database
     * @param user the new user to be added
     */
    void addUser(User user);

    /**
     * This method is to change the password of the given user
     * @param email the email of the user
     * @param newPassword the new password (encrypted)
     */
    void changeUserPassword(@Param("email") String email, @Param("newPassword") String newPassword);

    /**
     * This method is to get user information by the given email
     * @param email the email of the user
     * @return a User object whose email attribute matches with the given email parameter
     */
    User getUserByEmail(@Param("email") String email);

    /**
     * This method is to get user information by the given userId
     * @param userId the id of the user
     * @return a User object whose userId attribute matches with the given userId parameter
     */
    User getEmailById(@Param("userId") UUID userId);
}
