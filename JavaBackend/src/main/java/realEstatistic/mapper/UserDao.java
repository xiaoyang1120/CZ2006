package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Mapper
@Component
public interface UserDao {
    void addUser(@Param("userId") UUID userId, @Param("email") String email, @Param("password") String password);
    void changeUserPassword(@Param("email") String email, @Param("newPassword") String newPassword);
    void getUserByEmail(@Param("email") String email);
}
