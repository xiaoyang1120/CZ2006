package realEstatistic.mapper;

import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import realEstatistic.model.MRT;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Primary
@Component
@EnableScheduling
@Lazy(value = false)
public class CronMRTDao implements MRTDao{

    private static List<MRT> mrtList = new ArrayList<MRT>();


    @Override
    public List<MRT> getAllMRT() throws IOException {
        if (mrtList.size() == 0){
            mrtListGenerator();
        }
        return mrtList;
    }

    @Override
    public List<MRT> getMRTByLocation(float startLat, float endLat, float startLon, float endLon) {
        ArrayList<MRT> filteredList = new ArrayList<MRT>();
        for(MRT s : mrtList){
            float lat = s.getLat();
            float lon = s.getLong_();
            if (lat >= startLat && lat <= endLat && lon >= startLon && lon <= endLon){
                filteredList.add(s);
            }
        }
        return filteredList;
    }

    public static void mrtListGenerator() throws IOException {
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
            MRT a = new MRT(newId, stopName, lat, long_);
            mrtList.add(a);
        }





        }


}






