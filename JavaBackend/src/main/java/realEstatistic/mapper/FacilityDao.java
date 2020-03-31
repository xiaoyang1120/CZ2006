package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import realEstatistic.model.Facility;

import java.util.ArrayList;
import java.util.List;

@Mapper
@Component
public abstract class FacilityDao {
    final List<Facility> facilityList = new ArrayList<>();

    public List<Facility> getAllFacility(){
        return facilityList;
    };

    public List<Facility> getFacilityByLocation(float startLat, float endLat, float startLon, float endLon) {
        ArrayList<Facility> filteredList = new ArrayList<>();
        for(Facility s : facilityList){
            float lat = s.getLat();
            float lon = s.getLong_();
            if (lat >= startLat && lat <= endLat && lon >= startLon && lon <= endLon){
                filteredList.add(s);
            }
        }
        return filteredList;
    }
}
