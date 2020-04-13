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

/**
 * This class implements the controller that provides House-Related APIs used by the front-end
 */
@RequestMapping("api/house")
@RestController
public class HouseController {
    private HouseService houseService;

    @Autowired
    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }

    /**
     * This method is to define a Restful API (HTTP GET) to get house information by house id
     * @param houseId id of the house
     * @param response 400 if the given districtId is invalid
     * @return a House object with complete information of that particular house
     * @throws IOException thrown if response not correctly sent
     */
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

    /**
     * This method is to define a Restful API (HTTP GET) to add a house record to the favourite list of a user
     * @param userId id of the user
     * @param houseId id of the house
     * @param response 400 if the given userId is invalid
     * @return "OK" if succeed. "Failed" if not
     * @throws IOException thrown if response not correctly sent
     */
    @GetMapping(path = "{id}/add_to_fav")
    public String addHouseToFavourite(@RequestParam("userId") String userId, @PathVariable("id") String houseId, HttpServletResponse response) throws IOException {
        try{
            UUID houseUUID = UUID.fromString(houseId);
            UUID userUUUID = UUID.fromString(userId);
            House h =  houseService.getHouseById(houseUUID);
            if (h == null){
                response.sendError(400, "The house does not exist!");
            }
            houseService.addHouseToFavourite(userUUUID, houseUUID);
            return "OK";
        }catch(IllegalArgumentException e){
            response.sendError(400, "Please enter a correct uuid!");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Failed";
    }

    /**
     * This method is to define a Restful API (HTTP DELETE) to remove a house record from the favourite list of a user
     * @param userId id of the user
     * @param houseId id of the house
     * @param response 400 if either userId or houseId is invalid
     * @return "OK" if succeed. "Failed" if not
     * @throws IOException thrown if response not correctly sent
     */
    @DeleteMapping(path = "{id}/remove_from_fav")
    public String removeHouseFromFavourite(@RequestParam("userId") String userId, @PathVariable("id") String houseId, HttpServletResponse response) throws IOException {
        try{
            UUID houseUUID = UUID.fromString(houseId);
            UUID userUUUID = UUID.fromString(userId);
            House h =  houseService.getHouseById(houseUUID);
            if (h == null){
                response.sendError(400, "The house does not exist!");
            }
            houseService.removeHouseFromFavourite(userUUUID, houseUUID);
            return "OK";
        }catch(IllegalArgumentException e){
            response.sendError(400, "Please enter a correct uuid!");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Failed";
    }

    /**
     * This method is to define a Restful API (HTTP POST) to add a new house record
     * @param house the new house information to be added
     * @return id of the newly added house
     * @throws IOException thrown if response not correctly sent
     */
    @PostMapping("/add")
    public Map<String, Object> postHouse(@RequestBody House house) throws IOException {
        Map<String, Object> response = new HashMap<>();
        houseService.AddHouse(house);
        response.put("status", "Added successfully");
        response.put("UUID", house.getHouseId());
        return response;
    }

    /**
     * This method is to define a Restful API (HTTP POST) to update an existing house record
     * @param id id of the target house
     * @param json the updated house information
     * @param httpResponse 400 if either userId or houseId is invalid
     * @return status "successful" if succeed. "failed" if not
     * @throws IOException thrown if response not correctly sent
     */
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
            house.setPostal(Integer.parseInt(json.get("postal")));
        }catch (IllegalArgumentException e){
            httpResponse.sendError(400, "Please enter a correct uuid!");
        }
        house.setHouseDescription(json.get("houseDescription"));
        house.setImage(json.get("image"));
        house.setVenue(json.get("venue"));
        //FIXME problem: string.tolower()!= "true" gives false, how to set criteria?
        Map<String, Object> response = new HashMap<>();
        try{
            houseService.editHouse(house);
            response.put("status", "successful");
        } catch (Exception e) {
            response.put("status", "failed");
        }
        return response;
    }

    /**
     * This method is to define a Restful API (HTTP GET) to get all house records which belongs to the given District
     * @param districtId id of the district
     * @param response 400 if the districtId is invalid
     * @return a List of Houses in the given District
     * @throws IOException thrown if response not correctly sent
     */
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

