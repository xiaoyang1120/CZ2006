package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.DistrictDao;
import realEstatistic.model.District;
import realEstatistic.util.PostalConverter;

import java.util.List;
import java.util.UUID;

@Service
public class DistrictService {
    private DistrictDao districtDao;

    @Autowired
    public DistrictService(DistrictDao districtDao) {
        this.districtDao = districtDao;
    }
    public List<District> getAllDistrict(){return districtDao.getAllDistrict();}
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
    public District getDistrictById(UUID id){return this.districtDao.getDistrictById(id);}
}
