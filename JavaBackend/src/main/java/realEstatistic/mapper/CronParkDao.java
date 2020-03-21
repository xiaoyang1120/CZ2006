package realEstatistic.mapper;

import org.apache.commons.io.FileUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import realEstatistic.model.Park;
import realEstatistic.util.Unzipper;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

@Primary
@Component
@EnableScheduling
@Lazy(value = false)
public class CronParkDao implements ParkDao{

    private static List<Park> parkList = new ArrayList<Park>();
    private static String downloadDir = "./src/main/java/realEstatistic/downloads";

    @Override
    public List<Park> getAllPark() {
        return parkList;
    }

    @Override
    public List<Park> getParkByLocation(float startLat, float endLat, float startLon, float endLon) {
        ArrayList<Park> filteredList = new ArrayList<Park>();
        for(Park s : parkList){
            float lat = s.getLat();
            float lon = s.getLong_();
            if (lat >= startLat && lat <= endLat && lon >= startLon && lon <= endLon){
                filteredList.add(s);
            }
        }
        return filteredList;
    }

    @Scheduled(cron = "0 10 17 * * *")
    public static void CronFetch(){
        String url = "https://data.gov.sg/dataset/f3005537-b958-479c-9ba9-d2adffeb9c73/download";
        String fileName = "parks.zip";
        try {
            System.out.println("ready to download park.zip");
            System.setProperty("http.agent", "Monzilla/5.0");
            URL dataSource = new URL(url);
            File dir = new File(downloadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            FileUtils.copyURLToFile(dataSource, new File(dir+"/"+fileName));
            Unzipper.unzip(downloadDir+"/" + fileName, downloadDir);
            System.out.println("download finished");
            parkListGenerator();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void parkListGenerator(){
        String unzippedFileName = "parks-kml.kml";
        //read downloadDir + "/" + unzippedFileName, update supermarketList here
        SAXReader reader = new SAXReader();
        Document document = null;
        try {//read file
            document = reader.read(downloadDir + "/" + unzippedFileName);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        Element root = document.getRootElement();//kml
        Iterator<Element> child = root.elementIterator();
        root = child.next();//document

        child = root.elementIterator();
        while(child.hasNext()){
            root = child.next();
        } //root = folder
        //we want: attrib in Placemark
        child = root.elementIterator();
        Element e = child.next();
        while(child.hasNext()){
            e = child.next();
            String parkName = null, parkDescription = null;
            float lat = 0, long_= 0;
            Element temp;

            Iterator<Element> tempIter = e.elementIterator();

            while(tempIter.hasNext()){
                temp = tempIter.next();
                if(temp.getName() == "description"){
                    parkName = temp.getStringValue().split("<td>")[7].split("</td>")[0];
                    parkDescription = (temp.getStringValue().split("<td>")[10]).split("</td>")[0];
                }

                if(temp.getName() == "Point"){
                    String coorStr = temp.getStringValue().replaceAll("\\<[^\\]]+\\>", "");
                    long_ = Float.parseFloat(coorStr.split(",")[0]);
                    lat = Float.parseFloat(temp.getStringValue().split(",")[1].split(",")[0]);
                }
            }
            UUID newId = UUID.randomUUID();
            Park a = new Park(newId, parkName, lat, long_, parkDescription);
            parkList.add(a);
        }
    }

}

