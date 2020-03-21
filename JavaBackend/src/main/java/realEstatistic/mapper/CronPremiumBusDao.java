package realEstatistic.mapper;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import realEstatistic.model.PremiumBus;

import java.io.*;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Primary
@Component
@EnableScheduling
@Lazy(value = false)
public class CronPremiumBusDao implements PremiumBusDao{

    private static List<PremiumBus> premiumBusList = new ArrayList<PremiumBus>();

    @Override
    public List<PremiumBus> getAllPremiumBus() {
        return premiumBusList;
    }

    @Override
    public List<PremiumBus> getPremiumBusByLocation(float startLat, float endLat, float startLon, float endLon) {
        ArrayList<PremiumBus> filteredList = new ArrayList<PremiumBus>();
        for(PremiumBus s : premiumBusList){
            float lat = s.getLat();
            float lon = s.getLong_();
            if (lat >= startLat && lat <= endLat && lon >= startLon && lon <= endLon){
                filteredList.add(s);
            }
        }
        return filteredList;
    }

    public static String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    public static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
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



    @Scheduled(cron = "* 0 0 * * *")
    public static void CronFetch() throws IOException, JSONException {
        System.setProperty("http.agent", "Mozilla/5.0");
        JSONObject json =  readJsonFromUrl("https://data.gov.sg/api/action/datastore_search?resource_id=7670be81-ca96-49ba-9215-caf1f218954b&limit=10000");

        for(int i = 0; i < json.getJSONObject("result").getJSONArray("records").length(); i++) {
            String premiumBusName = null, premiumBusDescription = null;
            float lat = 0, long_ = 0;
            JSONObject myjson = (JSONObject) json.getJSONObject("result").getJSONArray("records").get(i);
            lat = (float) myjson.getDouble("x_coord");
            long_ = (float) myjson.getDouble("y_coord");
            premiumBusName = myjson.getString("bus_stop_desc_txt");
            premiumBusDescription = myjson.getString("op_hr_1_txt") + "  " + myjson.getString("op_hr_2_txt") + "  " + myjson.getString("fare_txt") + "  " + myjson.getString("orig_dest_txt");
            UUID newId = UUID.randomUUID();
            PremiumBus a = new PremiumBus(newId, premiumBusName, lat, long_, premiumBusDescription);
            premiumBusList.add(a);

        }







    }


}



