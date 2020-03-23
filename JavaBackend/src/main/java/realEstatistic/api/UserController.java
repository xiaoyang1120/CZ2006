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

@RequestMapping("api/user")
@RestController
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

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

    @GetMapping("/{id}/get_fav")
    public List<House> getFavourites(@PathVariable("id") UUID userId){
        return userService.getFavourites(userId);
    }

    @GetMapping("/{id}/get_posted")
    public List<House> getPostedHouse(@PathVariable("id") UUID userId){
        return userService.getPostedHouses(userId);
    }
}
