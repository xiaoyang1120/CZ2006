package realEstatistic.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import realEstatistic.model.DistrictFullInfo;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.service.DistrictService;
import realEstatistic.service.SearchService;

import java.util.List;

@RequestMapping("api/criteria")
@RestController
public class CriteriaMatchingController {
    private SearchService searchService;
    private DistrictService districtService;

    @Autowired
    public CriteriaMatchingController(SearchService searchService, DistrictService districtService) {
        this.searchService = searchService;
        this.districtService = districtService;
    }


    @PostMapping(path = "/all")
    public String[] getAllUserCriteria(){
        return searchService.getAllAvailableCriteria();
    }

    @PostMapping(path = "/rank")
    public List<DistrictFullInfo> search(@RequestParam("offset") int offset, @RequestBody FACILITY_TYPE[] t){
        return searchService.getSortedDistrictByCriteria(t, offset);
    }
}
