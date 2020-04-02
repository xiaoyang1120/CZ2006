package realEstatistic.mapper;

import org.apache.commons.io.FileUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import realEstatistic.config.CronTime;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.model.Facility;
import realEstatistic.util.Unzipper;

import java.io.File;
import java.net.URL;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

@Component(value = "CronSupermarketDao")
@EnableScheduling
@Lazy(value = false)
public class CronSupermarketDao extends FacilityDao{
    private static String downloadDir = "./src/main/java/realEstatistic/downloads";

    @Override
    public List<Facility> getAllFacility() {
        return facilityList;
    }

    @Scheduled(cron = CronTime.fetchTime)
    public void cronFetch(){
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
            facilityList.clear();
            supermarketListGenerator();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void supermarketListGenerator() {
        String unzippedFileName = "supermarkets-kml.kml";
        //read downloadDir + "/" + unzippedFileName, update supermarketList here

        SAXReader reader = new SAXReader();
        Document document = null;
        try {
            document = reader.read(downloadDir + "/" + unzippedFileName);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        Element root = document.getRootElement();
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
            String supermarketName = null, supermarketDescription = null;
            float lat = 0, long_= 0;
            Element temp;

            Iterator<Element> tempIter = e.elementIterator();

            while(tempIter.hasNext()){
                temp = tempIter.next();
                if(temp.getName() == "description"){
                    supermarketName = temp.getStringValue().split("<td>")[1].split("</td>")[0];
                    supermarketDescription = (temp.getStringValue().split("<td>")[3]).split("</td>")[0];
                }

                if(temp.getName() == "Point"){
                    String coorStr = temp.getStringValue().replaceAll("\\<[^\\]]+\\>", "");
                    long_ = Float.parseFloat(coorStr.split(",")[0]);
                    lat = Float.parseFloat(temp.getStringValue().split(",")[1]);
                }


            }
            UUID newId = UUID.randomUUID();
            Facility a = new Facility(newId, FACILITY_TYPE.SUPERMARKET, supermarketName, supermarketDescription, lat, long_);
            facilityList.add(a);
        }
    }

}
