package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import realEstatistic.model.User;

import java.util.UUID;

@Mapper
@Component
public interface UserDao {
    void addUser(User user);
    void changeUserPassword(@Param("email") String email, @Param("newPassword") String newPassword);
    User getUserByEmail(@Param("email") String email);
    String getEmailById(@Param("userId") UUID userId);
}
