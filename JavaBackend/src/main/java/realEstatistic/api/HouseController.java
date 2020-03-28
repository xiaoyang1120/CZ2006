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

    @GetMapping(path = "{id}/get")
    public House getHouseById(@PathVariable("id") String houseId, HttpServletResponse response) throws IOException {
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

    @GetMapping(path = "{id}/add_to_fav")
    public String addHouseToFavourite(@RequestParam("email") String email, @PathVariable("id") String houseId, HttpServletResponse response) throws IOException {
        try{
            UUID houseUUID = UUID.fromString(houseId);
            House h =  houseService.getHouseById(houseUUID);
            if (h == null){
                response.sendError(400, "The house does not exist!");
            }
            houseService.addHouseToFavourite(email, houseUUID);
            return "OK";
        }catch(IllegalArgumentException e){
            response.sendError(400, "Please enter a correct uuid!");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Failed";
    }

    @DeleteMapping(path = "{id}/remove_from_fav")
    public String removeHouseFromFavourite(@RequestParam("email") String email, @PathVariable("id") String houseId, HttpServletResponse response) throws IOException {
        try{
            UUID houseUUID = UUID.fromString(houseId);
            House h =  houseService.getHouseById(houseUUID);
            if (h == null){
                response.sendError(400, "The house does not exist!");
            }
            houseService.removeHouseFromFavourite(email, houseUUID);
            return "OK";
        }catch(IllegalArgumentException e){
            response.sendError(400, "Please enter a correct uuid!");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Failed";
    }

    @PostMapping("/add")
    public Map<String, Object> postHouse(@RequestBody House house, HttpServletResponse httpResponse) throws IOException {
        Map<String, Object> response = new HashMap<>();
        houseService.AddHouse(house);
        response.put("status", "Added successfully");
        response.put("UUID", house.getHouseId());
        return response;
    }

    @PostMapping("{id}/update")
    public Map<String, Object> editHouse(@PathVariable("id") String id, @RequestBody Map<String, String> json, HttpServletResponse httpResponse) throws IOException {
        House house = new House();
        try{
            UUID houseId = UUID.fromString(id);
            house.setHouseId(houseId);
            UUID districtId = UUID.fromString(json.get("districtId"));
            house.setDistrictId(districtId);
            UUID ownerId = UUID.fromString(json.get("ownerId"));
            house.setOwnerId(ownerId);
            house.setIsAvailable(Boolean.parseBoolean(json.get("isAvailable")));
        }catch (IllegalArgumentException e){
            httpResponse.sendError(400, "Please enter a correct uuid!");
        }

        house.setHouseDescription(json.get("houseDescription"));
        house.setImage(json.get("image"));
        house.setVenue(json.get("venue"));
        //FIXME problem: string.tolower()!= "true" gives false, how to set criteria?
        Map<String, Object> response = new HashMap<>();
        response.put("status", "successful");
        houseService.editHouse(house);
        return response;
    }

    @GetMapping(path = "/get_list")
    public List<House> getHouseByDistrictId(@RequestParam("district_id") String districtId, HttpServletResponse response) throws IOException {

        try{
            UUID districtUUID = UUID.fromString(districtId);
            return houseService.getAllHouseByDistrictId(districtUUID);
        }catch (IllegalArgumentException e){
            response.sendError(400, "Please enter a correct UUID!");
        }
        return null;
    }
}

