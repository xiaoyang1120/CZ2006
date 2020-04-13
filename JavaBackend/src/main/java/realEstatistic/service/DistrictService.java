package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.DistrictDao;
import realEstatistic.model.District;
import realEstatistic.util.PostalConverter;

import java.util.List;
import java.util.UUID;

/**
 * This class implements services that are District-oriented
 */
@Service
public class DistrictService {
    private DistrictDao districtDao;

    @Autowired
    public DistrictService(DistrictDao districtDao) {
        this.districtDao = districtDao;
    }

    /**
     * This method is to get all existing District
     * @return a List of District object
     */
    public List<District> getAllDistrict(){return districtDao.getAllDistrict();}

    /**
     * This method is to get the id of the District which the given postal code belongs to
     * @param postal the given postal code
     * @return the districtId of the corresponding District
     */
    public UUID getDistrictIdByPostal(String postal){
        try {
            float lat = Float.parseFloat(PostalConverter.convertPostal(postal).split("\t")[0]);
            float lon = Float.parseFloat(PostalConverter.convertPostal(postal).split("\t")[1]);
            for (District d: districtDao.getAllDistrict()){
                if (d.getLatStart() <=lat && d.getLatEnd() >= lat && d.getLongStart() <= lon && d.getLongEnd() >= lon){
                    return d.getDistrictId();
                }
            }
        } catch (NullPointerException e){
            System.out.println(postal);
            e.printStackTrace();
        }
        return null;
    }

    /**
     * This method is to get the District by the districtId
     * @param id the id of the District
     * @return the District object whose districtId attribute matches with the given id
     */
    public District getDistrictById(UUID id){return this.districtDao.getDistrictById(id);}
}
