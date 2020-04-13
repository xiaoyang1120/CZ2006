package realEstatistic.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import realEstatistic.model.Facility;

import java.util.ArrayList;
import java.util.List;

/**
 * This class implements an abstract FacilityDao, which is used to get facility information.
 */
@Mapper
@Component
public abstract class FacilityDao {
    final List<Facility> facilityList = new ArrayList<>();

    /**
     * This method is to get all recorded facilities (of certain type)
     * @return a List of certain type Facility (e.g. clinic)
     */
    public List<Facility> getAllFacility(){
        return facilityList;
    };

    /**
     * This method is to get all facilities (of certain type) that lays within the given region
     * @param startLat the starting latitude
     * @param endLat the ending latitude
     * @param startLon the starting longitude
     * @param endLon the ending longitude
     * @return a List of Facility objects
     */
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
