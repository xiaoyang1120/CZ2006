package realEstatistic.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import realEstatistic.model.DemoModel;
import realEstatistic.model.District;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.model.Facility;
import realEstatistic.service.DemoModelService;
import realEstatistic.service.DistrictService;
import realEstatistic.service.GovDataService;

import java.util.List;
import java.util.UUID;

@RequestMapping("api/demo")
@RestController
public class DemoController {
    private DemoModelService demoModelService;
    private DistrictService districtService;
    private GovDataService govDataService;

    @Autowired
    public DemoController(DemoModelService demoModelService, DistrictService districtService, GovDataService govDataService) {
        this.demoModelService = demoModelService;
        this.districtService = districtService;
        this.govDataService = govDataService;
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

}
