package realEstatistic.model;

import java.util.UUID;

/**
 * This class implements the User entity with the attributes userId, email, password.
 * User can be either seller or buyer, depending on their needs.
 */
public class User {
    private UUID userId;
    private String email;
    private String password;

    public User() {
    }

    public User(UUID userId, String email, String password) {
        this.userId = userId;
        this.email = email;
        this.password = password;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
