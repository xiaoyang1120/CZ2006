package realEstatistic.mapper;

import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import realEstatistic.model.Supermarket;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.io.FileUtils;
import realEstatistic.util.Unzipper;

@Component
@EnableScheduling
@Lazy(value = false)
public class CronSupermarketDao implements SupermarketDao{

    private static List<Supermarket> supermarketList = new ArrayList<Supermarket>();
    private static String downloadDir = "./src/main/java/realEstatistic/downloads";

    @Override
    public List<Supermarket> getAllSupermarket() {
        return supermarketList;
    }

    @Override
    public List<Supermarket> getSupermarketByLocation(float startLat, float endLat, float startLon, float endLon) {
        ArrayList<Supermarket> filteredList = new ArrayList<Supermarket>();
        for(Supermarket s : supermarketList){
            float lat = s.getLat();
            float lon = s.getLong_();
            if (lat >= startLat && lat <= endLat && lon >= startLon && lon <= endLon){
                filteredList.add(s);
            }
        }
        return filteredList;
    }

    @Scheduled(cron = "* 0 0 * * *")
    public void CronFetch(){
        String url = "https://data.gov.sg/dataset/11bb7b0b-ea38-4981-9f1f-660ad88409aa/download";
        String fileName = "supermarkets.zip";
        try {
            System.out.println("ready to download supermarket.zip");
            System.setProperty("http.agent", "Monzilla/5.0");
            URL dataSource = new URL(url);
            File dir = new File(downloadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            FileUtils.copyURLToFile(dataSource, new File(dir+"/"+fileName));
            Unzipper.unzip(downloadDir+"/" + fileName, downloadDir);
            System.out.println("download finished");
            supermarketListGenerator();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void supermarketListGenerator(){
        String unzippedFileName = "supermarkets-geojson.geojson";
        //read downloadDir + "/" + unzippedFileName, update supermarketList here
    }
}
