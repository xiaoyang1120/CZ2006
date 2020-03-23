package realEstatistic.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import realEstatistic.model.District;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.model.Facility;
import realEstatistic.service.DistrictService;
import realEstatistic.service.GovDataService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequestMapping("api/district")// or use "district" to clear ambiguity?
@RestController
public class DistrictController {

    private DistrictService districtService;
    private GovDataService govDataService;

    @Autowired
    public DistrictController(DistrictService districtService, GovDataService govDataService) {
        this.districtService = districtService;
        this.govDataService = govDataService;
    }

    @GetMapping("/get_all")
    public List<District> getAllDistrict(){
        return districtService.getAllDistrict();
    }


    @GetMapping("/{id}/detail")
    public District getDistrictDetails(@PathVariable("id") String districtId, HttpServletResponse response) throws IOException {
        try{
            UUID districtUUID = UUID.fromString(districtId);
            District d = districtService.getDistrictById(districtUUID);
            if (d == null){
                response.sendError(400, "The district does not exist!");
            }
            else{return d;}
        }catch(IllegalArgumentException e){
            response.sendError(400, "Please enter a correct uuid!");
        }
        return null;
    }

    @GetMapping("/{id}/get_facility_list")
    public List<? extends Facility> getFacility(@PathVariable("id") String districtId, @RequestParam("type") FACILITY_TYPE facilityType, HttpServletResponse response) throws IOException {
        try{
            UUID districtUUID = UUID.fromString(districtId);
            District d = districtService.getDistrictById(districtUUID);
            if (d == null){
                response.sendError(400, "The district does not exist!");
            }
            else{
                switch (facilityType) {
                    case PARK:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.PARK);
                    case PRIMARY_SCHOOL:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.PRIMARY_SCHOOL);
                    case SECONDARY_SCHOOL:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.SECONDARY_SCHOOL);
                    case JUNIOR_COLLEGE:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.JUNIOR_COLLEGE);
                    case HAWKER_CENTER:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.HAWKER_CENTER);
                    case MIXED_SCHOOL:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.MIXED_SCHOOL);
                    case SUPERMARKET:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.SUPERMARKET);
                    case PREMIUM_BUS:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.PREMIUM_BUS);
                    case E_WASTE:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.E_WASTE);
                    case CLINIC:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.CLINIC);
                    case MRT:
                        return govDataService.getFacilityByDistrict(districtUUID, FACILITY_TYPE.MRT);
                    default:
                        return null;
                }
            }
        }catch(IllegalArgumentException e){
            response.sendError(400, "Please enter a correct uuid!");
        }
        return null;
    }



}

