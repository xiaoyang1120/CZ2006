package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.*;
import realEstatistic.model.*;
import realEstatistic.config.CronTime;

import javax.annotation.Resource;
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
    private List<District> districtIdList;

    @Resource(name="CronClinicDao")
    private FacilityDao clinicDao;

    @Resource(name="CronEWasteDao")
    private FacilityDao eWasteDao;

    @Resource(name="CronHawkerCentreDao")
    private FacilityDao hawkerCentreDao;

    @Resource(name="CronMRTDao")
    private FacilityDao mrtDao;

    @Resource(name="CronParkDao")
    private FacilityDao parkDao;

    @Resource(name="CronPremiumBusDao")
    private FacilityDao premiumBusDao;

    private SchoolDao schoolDao;

    @Resource(name="CronSupermarketDao")
    private FacilityDao supermarketDao;

    @Autowired
    public GovDataService(DistrictDao districtDao, DistrictInfoDao districtInfoDao, SchoolDao schoolDao) {
        this.districtDao = districtDao;
        this.districtInfoDao = districtInfoDao;
        this.schoolDao = schoolDao;
    }

    @Scheduled(cron = CronTime.updateTime)
    public void updateDistrictInfoDao(){
        // one hour after the rest cron fetch
        //TODO will it be better to change it to DAO and let each dao to call it after they finished?
        this.districtIdList = districtDao.getAllDistrict();
        System.out.println("+++++++++++++++updateClinicInfo++++++++++");
        updateClinicInfo();
        System.out.println("+++++++++++++++updateEWasteInfo++++++++++");
        updateEWasteInfo();
        System.out.println("+++++++++++++++updateHawkerCentre++++++++++");
        updateHawkerCentre();
        System.out.println("+++++++++++++++updateMRT++++++++++");
        updateMRT();
        System.out.println("+++++++++++++++updatePark++++++++++");
        updatePark();
        System.out.println("+++++++++++++++updatePremiumBus++++++++++");
        updatePremiumBus();
        System.out.println("+++++++++++++++updateSupermarket++++++++++");
        updateSupermarket();
        System.out.println("+++++++++++++++updatePrimary++++++++++");
        updatePrimary();
        System.out.println("+++++++++++++++updateSecondary++++++++++");
        updateSecondary();
        System.out.println("+++++++++++++++updateJC++++++++++");
        updateJC();
        System.out.println("+++++++++++++++updateMixed++++++++++");
        updateMixed();
        System.out.println("+++++++++++++++End++++++++++");
    }

    private void updateEWasteInfo(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(eWasteDao.getAllFacility()).entrySet()){
            districtInfoDao.updateEWaste(entry.getKey(), entry.getValue());
        }
    }

    private void updateHawkerCentre(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(hawkerCentreDao.getAllFacility()).entrySet()){
            districtInfoDao.updateHawkerCenter(entry.getKey(), entry.getValue());
        }
    }

    private void updateMRT(){
        try {
            for (Map.Entry<UUID,Integer> entry : mapFacility(mrtDao.getAllFacility()).entrySet()){
                districtInfoDao.updateMRT(entry.getKey(), entry.getValue());
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    private void updatePark(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(parkDao.getAllFacility()).entrySet()){
            districtInfoDao.updatePark(entry.getKey(), entry.getValue());
        }
    }

    private void updateClinicInfo(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(clinicDao.getAllFacility()).entrySet()){
            districtInfoDao.updateClinic(entry.getKey(), entry.getValue());
        }
    }

    private void updatePremiumBus(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(premiumBusDao.getAllFacility()).entrySet()){
            districtInfoDao.updatePremiumBus(entry.getKey(), entry.getValue());
        }
    }

    private void updateSupermarket(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(supermarketDao.getAllFacility()).entrySet()){
            districtInfoDao.updateSupermarket(entry.getKey(), entry.getValue());
        }
    }

    private void updatePrimary(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(schoolDao.getAllPrimary()).entrySet()){
            districtInfoDao.updatePrimarySchool(entry.getKey(), entry.getValue());
        }
    }

    private void updateSecondary(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(schoolDao.getAllSecondary()).entrySet()){
            districtInfoDao.updateSecondarySchool(entry.getKey(), entry.getValue());
        }
    }

    private void updateJC(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(schoolDao.getAllJc()).entrySet()){
            districtInfoDao.updateJuniorCollege(entry.getKey(), entry.getValue());
        }
    }

    private void updateMixed(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(schoolDao.getAllMixed()).entrySet()){
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
    }

    public List<? extends Facility> getFacilityByDistrict(UUID districtId, FACILITY_TYPE facilityType){
        District district = districtDao.getDistrictById(districtId);
        float startLat = district.getLatStart();
        float endLat = district.getLatEnd();
        float startLon = district.getLongStart();
        float endLon = district.getLongEnd();
        switch (facilityType) {
            case PARK:
                return parkDao.getFacilityByLocation(startLat, endLat, startLon, endLon);
            case PRIMARY_SCHOOL:
                return schoolDao.getPrimaryByLocation(startLat, endLat, startLon, endLon);
            case SECONDARY_SCHOOL:
                return schoolDao.getSecondaryByLocation(startLat, endLat, startLon, endLon);
            case JUNIOR_COLLEGE:
                return schoolDao.getJcByLocation(startLat, endLat, startLon, endLon);
            case HAWKER_CENTER:
                return hawkerCentreDao.getFacilityByLocation(startLat, endLat, startLon, endLon);
            case MIXED_SCHOOL:
                return schoolDao.getMixedByLocation(startLat, endLat, startLon, endLon);
            case SUPERMARKET:
                return supermarketDao.getFacilityByLocation(startLat, endLat, startLon, endLon);
            case PREMIUM_BUS:
                return premiumBusDao.getFacilityByLocation(startLat, endLat, startLon, endLon);
            case E_WASTE:
                return eWasteDao.getFacilityByLocation(startLat, endLat, startLon, endLon);
            case CLINIC:
                return clinicDao.getFacilityByLocation(startLat, endLat, startLon, endLon);
            case MRT:
                return mrtDao.getFacilityByLocation(startLat, endLat, startLon, endLon);
            default:
                return null;
        }
    }
}
