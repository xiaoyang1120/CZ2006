package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.*;
import realEstatistic.model.*;

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
    private EWasteDao eWasteDao;
    private HawkerCentreDao hawkerCentreDao;
    private MRTDao mrtDao;
    private ParkDao parkDao;
    private PremiumBusDao premiumBusDao;
    private SchoolDao schoolDao;
    private SupermarketDao supermarketDao;
    private List<District> districtIdList;

    @Autowired
    public GovDataService(DistrictDao districtDao, DistrictInfoDao districtInfoDao, ClinicDao cronClinicDao,
                          CronEWasteDao cronEWasteDao,
                          CronHawkerCentreDao cronHawkerCentreDao, CronMRTDao cronMRTDao, CronParkDao cronParkDao,
                          CronPremiumBusDao cronPremiumBusDao,
                          CronSchoolDao cronSchoolDao, CronSupermarketDao cronSupermarketDao) {
        this.districtInfoDao = districtInfoDao;
        this.clinicDao = cronClinicDao;
        this.eWasteDao = cronEWasteDao;
        this.hawkerCentreDao = cronHawkerCentreDao;
        this.mrtDao = cronMRTDao;
        this.parkDao = cronParkDao;
        this.premiumBusDao = cronPremiumBusDao;
        this.schoolDao = cronSchoolDao;
        this.supermarketDao = cronSupermarketDao;
        this.districtDao = districtDao;
    }

    @Scheduled(cron = "0 11 17 * * *")
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
        for (Map.Entry<UUID,Integer> entry : mapFacility(eWasteDao.getAllEWaste()).entrySet()){
            districtInfoDao.updateEWaste(entry.getKey(), entry.getValue());
        }
    }

    private void updateHawkerCentre(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(hawkerCentreDao.getAllHawkerCentre()).entrySet()){
            districtInfoDao.updateHawkerCenter(entry.getKey(), entry.getValue());
        }
    }

    private void updateMRT(){
        try {
            for (Map.Entry<UUID,Integer> entry : mapFacility(mrtDao.getAllMRT()).entrySet()){
                districtInfoDao.updateMRT(entry.getKey(), entry.getValue());
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    private void updatePark(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(parkDao.getAllPark()).entrySet()){
            districtInfoDao.updatePark(entry.getKey(), entry.getValue());
        }
    }

    private void updateClinicInfo(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(clinicDao.getAllClinic()).entrySet()){
            districtInfoDao.updateClinic(entry.getKey(), entry.getValue());
        }
    }

    private void updatePremiumBus(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(premiumBusDao.getAllPremiumBus()).entrySet()){
            districtInfoDao.updatePremiumBus(entry.getKey(), entry.getValue());
        }
    }

    private void updateSupermarket(){
        for (Map.Entry<UUID,Integer> entry : mapFacility(supermarketDao.getAllSupermarket()).entrySet()){
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
                return parkDao.getParkByLocation(startLat, endLat, startLon, endLon);
            case PRIMARY_SCHOOL:
                return schoolDao.getPrimaryByLocation(startLat, endLat, startLon, endLon);
            case SECONDARY_SCHOOL:
                return schoolDao.getSecondaryByLocation(startLat, endLat, startLon, endLon);
            case JUNIOR_COLLEGE:
                return schoolDao.getJcByLocation(startLat, endLat, startLon, endLon);
            case HAWKER_CENTER:
                return hawkerCentreDao.getHawkerCentreByLocation(startLat, endLat, startLon, endLon);
            case MIXED_SCHOOL:
                return schoolDao.getMixedByLocation(startLat, endLat, startLon, endLon);
            case SUPERMARKET:
                return supermarketDao.getSupermarketByLocation(startLat, endLat, startLon, endLon);
            case PREMIUM_BUS:
                return premiumBusDao.getPremiumBusByLocation(startLat, endLat, startLon, endLon);
            case E_WASTE:
                return eWasteDao.getEWasteByLocation(startLat, endLat, startLon, endLon);
            case CLINIC:
                return clinicDao.getClinicByLocation(startLat, endLat, startLon, endLon);
            case MRT:
                return mrtDao.getMRTByLocation(startLat, endLat, startLon, endLon);
            default:
                return null;
        }
    }
}
