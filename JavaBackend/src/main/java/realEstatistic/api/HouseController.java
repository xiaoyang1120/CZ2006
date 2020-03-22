package realEstatistic.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import realEstatistic.model.House;
import realEstatistic.service.HouseService;

import java.util.UUID;

@RequestMapping("api/house")
@RestController
public class HouseController {
    private HouseService houseService;

    @Autowired
    public HouseController(HouseService hosueService) {
        this.houseService = houseService;
    }


    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public class BadRequestException extends RuntimeException {
    }

    @GetMapping(path = "/search")
    public House getHouseById(@RequestParam("id") String houseId) {
        try{
            System.out.println(houseId);
            UUID houseUUID = UUID.fromString(houseId);
            return houseService.getHouseById(houseUUID);
        }catch(Exception e){
            e.printStackTrace();
            throw new BadRequestException();
        }
    }



//    @GetMapping("/search/{id}")
//    public List<DistrictFullInfo> getIt(@PathVariable Integer id){
//        FACILITY_TYPE[] t= {FACILITY_TYPE.CLINIC,FACILITY_TYPE.HAWKER_CENTER};
//
//        return searchService.getSortedDistrictByCriteria(t,2);
//    }
//
//    @GetMapping("/get/{id}")
//    public DemoModel get(@PathVariable Integer id){
//        return demoModelService.getOne(id);
//    }
//
//    @GetMapping("getAll")
//    public List<DemoModel> getAll(){
//        return demoModelService.getAll();
//    }
//
//    @PostMapping("/add")
//    public Boolean add(@RequestBody DemoModel user){
//        return demoModelService.add(user);
//    }
//
//    @GetMapping(path = "{msg}")
//    public String demoApi(@PathVariable("msg") String msg) {
//        return msg;
//    }
//
//
//
//    @GetMapping(path = "/getAllCri")
//    public String[] testOfCriteria(){
//        return SearchService.getAllAvailableCriteria();
//    }
//
//    @PostMapping(path = "/search")
//    public List<DistrictFullInfo> search(@RequestParam("offset") int offset, @RequestBody FACILITY_TYPE[] t){
//        return searchService.getSortedDistrictByCriteria(t, offset);
//    }

}

