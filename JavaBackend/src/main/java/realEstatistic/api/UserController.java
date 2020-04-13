package realEstatistic.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import realEstatistic.model.House;
import realEstatistic.model.User;
import realEstatistic.service.UserService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * This class implements the controller that provides User-Related APIs used by the front-end
 */
@RequestMapping("api/user")
@RestController
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * This method is to define a Restful API (HTTP POST) for user log in purpose
     * @param user the user-entered credentials
     * @param httpResponse 403 if the credentials are invalid
     * @return status and UUID of the user
     * @throws IOException thrown if response not correctly sent
     */
    @PostMapping("/log_in")
    public Map<String, Object> login (@RequestBody User user, HttpServletResponse httpResponse) throws IOException {
        Map<String, Object> response = new HashMap<>();
        UUID id = userService.validatePassword(user);
        if (id == null){
//            response.put("status", "Forbidden");
//            return response;
            httpResponse.sendError(403, "invalid credential");
            return null;
        } else {
            response.put("status", "Pass");
            response.put("UUID", id);
            return response;
        }
    }

    /**
     * This method is to define a Restful API (HTTP POST) for user sign up purpose
     * @param user the user-entered new credentials
     * @param httpResponse 400 if the email was used by another account
     * @return status and UUID of the user
     * @throws IOException thrown if response not correctly sent
     */
    @PostMapping("/sign_up")
    public Map<String, Object> signUp(@RequestBody User user, HttpServletResponse httpResponse) throws IOException {
        Map<String, Object> response = new HashMap<>();
        UUID id = userService.AddNewUser(user);
        if (id == null){
//            response.put("status", "Failed");
//            return response;
            httpResponse.sendError(400, "email already registered!");
            return null;  //add user会出错吗
        } else {
            response.put("status", "Pass");
            response.put("UUID", user.getUserId());
            return response;
        }
    }

    /**
     * This method is to define a Restful API (HTTP POST) for user to change their password
     * @param json the user-entered old credentials and new password
     * @param httpResponse 403 if the old credentials are invalid
     * @return status: success if succeed
     * @throws IOException thrown if response not correctly sent
     */
    @PostMapping("/change_password")
    public Map<String, Object> changPwd(@RequestBody Map<String, String> json, HttpServletResponse httpResponse) throws IOException {
        User user = new User();
        user.setEmail(json.get("email"));
        user.setPassword(json.get("password"));
        Map<String, Object> response = new HashMap<>();
        if (userService.changePassword(user, json.get("newPassword"))){
            response.put("status", "Success");
            return response;
        } else {
//            response.put("status", "Forbidden");
//            return response;
            httpResponse.sendError(403, "wrong old password");
            return null;
        }
    }

    /**
     * This method is to define a Restful API (HTTP GET) to get the favourite list of a user
     * @param userId id of the targeted user
     * @return a List of Houses favoured by the user
     */
    @GetMapping("/{id}/get_fav")
    public List<House> getFavourites(@PathVariable("id") UUID userId){
        return userService.getFavourites(userId);
    }

    /**
     * This method is to define a Restful API (HTTP GET) to get all posted house records of a user
     * @param userId id of the targeted user
     * @return a List of Houses posted by the user
     */
    @GetMapping("/{id}/get_posted")
    public List<House> getPostedHouse(@PathVariable("id") UUID userId){
        return userService.getPostedHouses(userId);
    }

    /**
     * This method is to define a Restful API (HTTP GET) to get the email of user according to the userId
     * @param userId id of the targeted user
     * @return email of the user
     */
    @GetMapping("/{id}/get_email")
    public String getEmailById(@PathVariable("id") UUID userId){
        return userService.getEmailById(userId);
    }
}
