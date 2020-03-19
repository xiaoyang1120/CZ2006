package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.DistrictDao;
import realEstatistic.model.District;

import java.util.UUID;

@Service
public class DistrictService {
    private DistrictDao districtDao;

    @Autowired
    public DistrictService(DistrictDao districtDao) {
        this.districtDao = districtDao;
    }

    public void iniDistrict(){
        double maxLat = 1.470104;
        double minLat = 1.239169;
        double maxLon = 104.032530;
        double minLon = 103.601493;
        double stepLat = (maxLat - minLat)/10;
        double stepLon = (maxLon - minLon)/18;
        double tempLat = minLat;
        double tempLon = minLon;
        Integer i = 1;
        while (tempLat < maxLat){
            while (tempLon <= maxLon){
                UUID id = UUID.randomUUID();
                String name = "District " + i.toString();
                District tempDistrict = new District(id, name, (float)tempLat, (float)(tempLat+stepLat), (float)tempLon, (float)(tempLon+stepLon), "");
                districtDao.addNewDistrict(tempDistrict);
                tempLon += stepLon;
                i++;
            }
            tempLon = minLon;
            tempLat += stepLat;
        }
    }
}
