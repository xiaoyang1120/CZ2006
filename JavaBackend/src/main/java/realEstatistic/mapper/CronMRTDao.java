package realEstatistic.mapper;

import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.model.Facility;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Component(value = "CronMRTDao")
@EnableScheduling
@Lazy(value = false)
public class CronMRTDao extends FacilityDao{
    @Override
    public List<Facility> getAllFacility(){
        if (facilityList.size() == 0){
            try {
                mrtListGenerator();
            } catch (Exception e){
                e.printStackTrace();
            }
        }
        return facilityList;
    }

    private void mrtListGenerator() throws IOException {
        String filePath = "./src/main/java/realEstatistic/downloads/mrt_lrt_data.csv";
        BufferedReader reader = new BufferedReader(new FileReader(filePath));
        String stopName;
        float lat, long_;
        reader.readLine();
        String line = null;

        while((line=reader.readLine())!=null){
            lat = Float.parseFloat(line.split(",")[2]);
            long_ = Float.parseFloat(line.split(",")[3]);
            stopName = line.split(",")[0];
            UUID newId = UUID.randomUUID();
            Facility a = new Facility(newId, FACILITY_TYPE.MRT, stopName, null, lat, long_);
            facilityList.add(a);
        }
    }
}






