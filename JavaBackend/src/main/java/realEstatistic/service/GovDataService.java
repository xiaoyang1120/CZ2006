package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.*;
import realEstatistic.model.Clinic;
import realEstatistic.model.District;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@EnableScheduling
@Lazy(value = false)
public class GovDataService {
    private DistrictDao districtDao;
    private DistrictInfoDao districtInfoDao;
    private ClinicDao clinicDao;
    private CronEWasteDao cronEWasteDao;
    private CronHawkerCentreDao cronHawkerCentreDao;
    private CronMRTDao cronMRTDao;
    private CronParkDao cronParkDao;
    private CronPremiumBusDao cronPremiumBusDao;
    private CronSchoolDao cronSchoolDao;
    private CronSupermarketDao cronSupermarketDao;
    private List<District> districtIdList;

    @Autowired
    public GovDataService(DistrictDao districtDao, DistrictInfoDao districtInfoDao, ClinicDao clinicDao,
                          CronEWasteDao cronEWasteDao,
                          CronHawkerCentreDao cronHawkerCentreDao, CronMRTDao cronMRTDao, CronParkDao cronParkDao,
                          CronPremiumBusDao cronPremiumBusDao,
                          CronSchoolDao cronSchoolDao, CronSupermarketDao cronSupermarketDao) {
        this.districtInfoDao = districtInfoDao;
        this.clinicDao = clinicDao;
        this.cronEWasteDao = cronEWasteDao;
        this.cronHawkerCentreDao = cronHawkerCentreDao;
        this.cronMRTDao = cronMRTDao;
        this.cronParkDao = cronParkDao;
        this.cronPremiumBusDao = cronPremiumBusDao;
        this.cronSchoolDao = cronSchoolDao;
        this.cronSupermarketDao = cronSupermarketDao;
        this.districtDao = districtDao;
    }

    @Scheduled(cron = "* 0 1 * * *")
    public void updateDistrictInfoDao(){
        // one hour after the rest cron fetch
        //TODO will it be better to change it to DAO and let each dao to call it after they finished?
        this.districtIdList = districtDao.getAllDistrict();
        updateClinicInfo();
        //TODO finish all updates
    }

    private void updateClinicInfo(){
        Map<UUID, Integer> clinicMap = new HashMap<>();
        for (Clinic c: clinicDao.getAllClinic()){
            UUID districtId = inDistrict(c.getLat(), c.getLong_());
            if (districtId != null){
                if (clinicMap.containsKey(districtId)){
                    clinicMap.put(districtId, clinicMap.get(districtId) + 1);
                } else {
                    clinicMap.put(districtId, 1);
                }
            }
        }
        for (Map.Entry<UUID,Integer> entry : clinicMap.entrySet()){
            districtInfoDao.updateClinic(entry.getKey(), entry.getValue());
        }
    }

    private UUID inDistrict(float lat, float lon){
        for (District d: districtIdList){
            if (lat <= d.getLatEnd() && lat >= d.getLatStart() && lon <= d.getLongEnd() && lon >= d.getLongStart()){
                return d.getDistrictId();
            }
        }
        System.out.println("lat: " + lat + "lon: " + lon + " is not in any district!");
        return null;
    };


}
