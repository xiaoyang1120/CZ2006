package realEstatistic.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import realEstatistic.model.*;
import realEstatistic.service.DemoModelService;
import realEstatistic.service.DistrictService;
import realEstatistic.service.GovDataService;
import realEstatistic.service.SearchService;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequestMapping("api/demo")
@RestController
public class DemoController {
    private DemoModelService demoModelService;
    private DistrictService districtService;
    private GovDataService govDataService;
    private SearchService searchService;

    @Autowired
    public DemoController(DemoModelService demoModelService, DistrictService districtService, GovDataService govDataService,SearchService searchService) {
        this.demoModelService = demoModelService;
        this.districtService = districtService;
        this.govDataService = govDataService;
        this.searchService=searchService;
    }

    @GetMapping("/search/{id}")
    public List<DistrictFullInfo> getIt(@PathVariable Integer id){
        FACILITY_TYPE[] t= {FACILITY_TYPE.CLINIC,FACILITY_TYPE.HAWKER_CENTER};

        return searchService.getSortedDistrictByCriteria(t,2);
    }

    @GetMapping("/get/{id}")
    public DemoModel get(@PathVariable Integer id){
        return demoModelService.getOne(id);
    }

    @GetMapping("getAll")
    public List<DemoModel> getAll(){
        return demoModelService.getAll();
    }

    @PostMapping("/add")
    public Boolean add(@RequestBody DemoModel user){
        return demoModelService.add(user);
    }

    @GetMapping(path = "{msg}")
    public String demoApi(@PathVariable("msg") String msg) {
        return msg;
    }

    @GetMapping(path = "/test")
    public List<? extends Facility> testApi(@RequestParam("id") String id) {
        UUID uuid = UUID.fromString(id);
        FACILITY_TYPE type = FACILITY_TYPE.PARK;
        return govDataService.getFacilityByDistrict(uuid, type);
    }

    @GetMapping(path = "/getAllCri")
    public String[] testOfCriteria(){
        return SearchService.getAllAvailableCriteria();
    }

}
