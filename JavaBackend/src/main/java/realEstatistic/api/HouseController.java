package realEstatistic.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import realEstatistic.model.House;
import realEstatistic.service.HouseService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequestMapping("api/house")
@RestController
public class HouseController {
    private HouseService houseService;

    @Autowired
    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }

    @GetMapping(path = "/hid")
    public House getHouseById(@RequestParam("id") String houseId, HttpServletResponse response) throws IOException {
        try{
            UUID houseUUID = UUID.fromString(houseId);
            House h =  houseService.getHouseById(houseUUID);
            if (h == null){
                response.sendError(400, "The house does not exist!");
            }
            else{return h;}
        }catch(IllegalArgumentException e){
           response.sendError(400, "Please enter a correct uuid!");
        }
        return null;
    }

    @PostMapping(path = "/fav")
    public void addHouseToFavourite(@RequestBody String email, String houseId, HttpServletResponse response) throws IOException {
        try{
            UUID houseUUID = UUID.fromString(houseId);
            House h =  houseService.getHouseById(houseUUID);
            if (h == null){
                response.sendError(400, "The house does not exist!");
            }
            houseService.addHouseToFavourite(email, houseUUID);
        }catch(IllegalArgumentException e){
            response.sendError(400, "Please enter a correct uuid!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/post")
    public Map<String, Object> postHouse(@RequestBody House house, HttpServletResponse httpResponse) throws IOException {
        Map<String, Object> response = new HashMap<>();
        houseService.AddHouse(house);
        response.put("status", "Added successfully");
        response.put("UUID", house.getHouseId());
        return response;
    }

    @PostMapping("/edit")
    public Map<String, Object> editHouse(@RequestBody Map<String, String> json, HttpServletResponse httpResponse) throws IOException {
        House house = new House();
        try{
            UUID houseId = UUID.fromString(json.get("houseId"));
            house.setHouseId(houseId);
            UUID districtId = UUID.fromString(json.get("districtId"));
            house.setDistrictId(districtId);
            UUID ownerId = UUID.fromString(json.get("ownerId"));
            house.setOwnerId(ownerId);
            boolean isAvailable = Boolean.parseBoolean(json.get("isAvailable"));
            house.setAvalable(isAvailable);
        }catch (IllegalArgumentException e){
            httpResponse.sendError(400, "Please enter a correct uuid!");
        }

        house.setHouseDescription(json.get("houseDescription"));
        house.setImage(json.get("image"));
        house.setVenue(json.get("venue"));
        // problem: string.tolower()!= "true" gives false, how to set criteria?
        Map<String, Object> response = new HashMap<>();
        response.put("status", "successful");
        houseService.editHouse(house);
        return response;
    }

    @GetMapping(path = "/did")
    public List<House> getHouseByDistrictId(@RequestParam("id") String districtId, HttpServletResponse response) throws IOException {

        try{
            UUID districtUUID = UUID.fromString(districtId);
            List<House> houseList = houseService.getAllHouseByDistrictId(districtUUID);
            return houseList;
        }catch (IllegalArgumentException e){
            response.sendError(400, "Please enter a correct UUID!");
        }
        return null;
    }
}

