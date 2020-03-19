package realEstatistic.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import realEstatistic.model.DemoModel;
import realEstatistic.model.District;
import realEstatistic.service.DemoModelService;
import realEstatistic.service.DistrictService;

import java.util.List;
import java.util.UUID;

@RequestMapping("api/demo")
@RestController
public class DemoController {
    private DemoModelService demoModelService;
    private DistrictService districtService;

    @Autowired
    public DemoController(DemoModelService demoModelService, DistrictService districtService) {
        this.demoModelService = demoModelService;
        this.districtService = districtService;
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
    public District demoApi() {
        UUID test = UUID.fromString("643f139e-924c-4094-a8e5-8c1cb766d19d");
        districtService.iniDistrict();
        return demoModelService.test(test);
    }

}
