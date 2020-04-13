package realEstatistic.mapper;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import realEstatistic.config.CronTime;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.model.Facility;

import java.io.*;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.List;
import java.util.UUID;

/**
 * This class implements the CronPremiumBusDao entity, which is a extension of FacilityDao and is specifically designed to refresh Premium Bus information periodically.
 */
@Component(value = "CronPremiumBusDao")
@EnableScheduling
@Lazy(value = false)
public class CronPremiumBusDao extends FacilityDao{

    @Override
    public List<Facility> getAllFacility() {
        return facilityList;
    }

    public String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    public JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
        InputStream is = new URL(url).openStream();
        try {
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            String jsonText = readAll(rd);
            JSONObject json = new JSONObject(jsonText);
            return json;
        } finally {
            is.close();
        }
    }

    /**
     * This method is set to be a cron method and is used to fetch Premium Bus data from Gov Data.
     * @throws IOException Thrown when the data sent from Gov Data is not in Json format
     * @throws JSONException Thrown when the data sent from Gov Data lacks essential information
     */
    @Scheduled(cron = CronTime.fetchTime)
    public void cronFetch() throws IOException, JSONException {
        System.setProperty("http.agent", "Mozilla/5.0");
        JSONObject json =  readJsonFromUrl("https://data.gov.sg/api/action/datastore_search?resource_id=7670be81-ca96-49ba-9215-caf1f218954b&limit=10000");
        facilityList.clear();
        for(int i = 0; i < json.getJSONObject("result").getJSONArray("records").length(); i++) {
            String premiumBusName = null, premiumBusDescription = null;
            float lat = 0, long_ = 0;
            JSONObject myjson = (JSONObject) json.getJSONObject("result").getJSONArray("records").get(i);
            lat = (float) myjson.getDouble("x_coord");
            long_ = (float) myjson.getDouble("y_coord");
            premiumBusName = myjson.getString("bus_stop_desc_txt");
            premiumBusDescription = myjson.getString("op_hr_1_txt") + "  " + myjson.getString("op_hr_2_txt") + "  " + myjson.getString("fare_txt") + "  " + myjson.getString("orig_dest_txt");
            UUID newId = UUID.randomUUID();
            Facility a = new Facility(newId, FACILITY_TYPE.PREMIUM_BUS, premiumBusName, premiumBusDescription, lat, long_);
            facilityList.add(a);
        }

    }


}



