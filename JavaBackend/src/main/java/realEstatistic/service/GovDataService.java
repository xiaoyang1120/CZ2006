package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.*;
import realEstatistic.model.Clinic;
import realEstatistic.model.District;
import realEstatistic.model.Facility;

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
    private EWasteDao EWasteDao;
    private HawkerCentreDao HawkerCentreDao;
    private MRTDao MRTDao;
    private ParkDao ParkDao;
    private PremiumBusDao PremiumBusDao;
    private SchoolDao SchoolDao;
    private SupermarketDao SupermarketDao;
    private List<District> districtIdList;

    @Autowired
    public GovDataService(DistrictDao districtDao, DistrictInfoDao districtInfoDao, ClinicDao cronClinicDao,
                          CronEWasteDao cronEWasteDao,
                          CronHawkerCentreDao cronHawkerCentreDao, CronMRTDao cronMRTDao, CronParkDao cronParkDao,
                          CronPremiumBusDao cronPremiumBusDao,
                          CronSchoolDao cronSchoolDao, CronSupermarketDao cronSupermarketDao) {
        this.districtInfoDao = districtInfoDao;
        this.clinicDao = cronClinicDao;
        this.EWasteDao = cronEWasteDao;
        this.HawkerCentreDao = cronHawkerCentreDao;
        this.MRTDao = cronMRTDao;
        this.ParkDao = cronParkDao;
        this.PremiumBusDao = cronPremiumBusDao;
        this.SchoolDao = cronSchoolDao;
        this.SupermarketDao = cronSupermarketDao;
        this.districtDao = districtDao;
    }

    @Scheduled(cron = "* 0 1 * * *")
    public void updateDistrictInfoDao(){
        // one hour after the rest cron fetch
        //TODO will it be better to change it to DAO and let each dao to call it after they finished?
        this.districtIdList = districtDao.getAllDistrict();
        updateClinicInfo();
        updateEWasteInfo();
        updateHawkerCentre();
        updateMRT();
        updatePark();
        updatePremiumBus();
        updateSupermarket();
        updatePrimary();
        updateSecondary();
        updateJC();
        updateMixed();
    }

    private void updateEWasteInfo(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(EWasteDao.getAllEWaste()).entrySet()){
            districtInfoDao.updateEWaste(entry.getKey(), entry.getValue());
        }
    }

    private void updateHawkerCentre(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(HawkerCentreDao.getAllHawkerCentre()).entrySet()){
            districtInfoDao.updateHawkerCenter(entry.getKey(), entry.getValue());
        }
    }

    private void updateMRT(){
        try {
            for (Map.Entry<UUID,Integer> entry : mapFacility(MRTDao.getAllMRT()).entrySet()){
                districtInfoDao.updateMRT(entry.getKey(), entry.getValue());
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    private void updatePark(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(ParkDao.getAllPark()).entrySet()){
            districtInfoDao.updatePark(entry.getKey(), entry.getValue());
        }
    }

    private void updateClinicInfo(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(clinicDao.getAllClinic()).entrySet()){
            districtInfoDao.updateClinic(entry.getKey(), entry.getValue());
        }
    }

    private void updatePremiumBus(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(PremiumBusDao.getAllPremiumBus()).entrySet()){
            districtInfoDao.updatePremiumBus(entry.getKey(), entry.getValue());
        }
    }

    private void updateSupermarket(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(SupermarketDao.getAllSupermarket()).entrySet()){
            districtInfoDao.updateSupermarket(entry.getKey(), entry.getValue());
        }
    }

    private void updatePrimary(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(SchoolDao.getAllPrimary()).entrySet()){
            districtInfoDao.updatePrimarySchool(entry.getKey(), entry.getValue());
        }
    }

    private void updateSecondary(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(SchoolDao.getAllSecondary()).entrySet()){
            districtInfoDao.updateSecondarySchool(entry.getKey(), entry.getValue());
        }
    }

    private void updateJC(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(SchoolDao.getAllJc()).entrySet()){
            districtInfoDao.updateJuniorCollege(entry.getKey(), entry.getValue());
        }
    }

    private void updateMixed(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(SchoolDao.getAllMixed()).entrySet()){
            districtInfoDao.updateMixedSchool(entry.getKey(), entry.getValue());
        }
    }

    private Map<UUID, Integer> mapFacility(List<? extends Facility> facilityList){
        Map<UUID, Integer> localtionForm = new HashMap<>();
        for (Facility c: facilityList){
            UUID districtId = inDistrict(c.getLat(), c.getLong_());
            if (districtId != null){
                if (localtionForm.containsKey(districtId)){
                    localtionForm.put(districtId, localtionForm.get(districtId) + 1);
                } else {
                    localtionForm.put(districtId, 1);
                }
            }
        }
        return localtionForm;
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
