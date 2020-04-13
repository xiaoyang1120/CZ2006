package realEstatistic.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import realEstatistic.model.DistrictFullInfo;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.service.SearchService;

import java.util.List;

/**
 * This class implements the controller that provides House-Filtering-Related APIs used by the front-end
 */
@RequestMapping("api/criteria")
@RestController
public class CriteriaMatchingController {
    private SearchService searchService;

    @Autowired
    public CriteriaMatchingController(SearchService searchService) {
        this.searchService = searchService;
    }


    /**
     * This method is to define a Restful API (HTTP GET) to get all available facility types as district-filtering criteria
     * @return a String list of all available criteria.
     */
    @GetMapping(path = "/get_all")
    public String[] getAllUserCriteria(){
        return searchService.getAllAvailableCriteria();
    }

    /**
     * This method is to define a Restful API (HTTP POST) to get a filtered District list according to the user's preference
     * @param offset number of top districts to be excluded
     * @param t user-chosen criteria list
     * @return a List of 10 DistrictFullInfo objects
     */
    @PostMapping(path = "/get_districts")
    public List<DistrictFullInfo> search(@RequestParam("offset") int offset, @RequestBody FACILITY_TYPE[] t){
        return searchService.getSortedDistrictByCriteria(t, offset);
    }
}
