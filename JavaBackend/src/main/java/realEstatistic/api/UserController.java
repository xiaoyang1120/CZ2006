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

    @PostMapping("/login")
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

    @PostMapping("/signUp")
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

    @PostMapping("/changePwd")
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

    @GetMapping("/getFavourites{userId}")
    public List<House> getFavourites(@PathVariable("userId") UUID userId){
        return userService.getFavourites(userId);
    }

    @GetMapping("/getPostedHouse{userId}")
    public List<House> getPostedHouse(@PathVariable("userId") UUID userId){
        return userService.getPostedHouses(userId);
    }
}
