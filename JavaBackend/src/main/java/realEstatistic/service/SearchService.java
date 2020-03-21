package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.DistrictInfoDao;
import realEstatistic.mapper.DistrictDao;
import realEstatistic.model.District;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.util.EnumStringlizer;
import realEstatistic.model.DistrictInfo;
import realEstatistic.model.DistrictFullInfo;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;




@Service
public class SearchService {
    private DistrictInfoDao districtInfoDao;
    private DistrictService districtService;

    @Autowired
    public SearchService(DistrictInfoDao districtInfoDao,DistrictService districtService) {
        this.districtInfoDao = districtInfoDao;
        this.districtService = districtService;
    }

    public static String[] getAllAvailableCriteria() {
        return EnumStringlizer.getNames(FACILITY_TYPE.class);
    }

    private int getScore(DistrictInfo info, FACILITY_TYPE[] facility_types){
        int score = 0;
        for (FACILITY_TYPE i:facility_types)
            switch (i) {
                case PRIMARY_SCHOOL:
//                    List<int> score=new Arrays.asList(1,2,3);
                    int temp = 0;
                    List<Integer> listPS = Stream.of(1, 3, 5).collect(Collectors.toList());
                    while (temp < listPS.size()) {
                        if (info.getNumOfPrimary() < listPS.get(temp)) {
                            score += temp;
                        }
                        temp += 1;
                    }
                    break;
                case SECONDARY_SCHOOL:
                case JUNIOR_COLLEGE:
                case MIXED_SCHOOL:
                case SUPERMARKET:
                case PREMIUM_BUS:
                    List<Integer> listSS = Stream.of(1, 3, 5).collect(Collectors.toList());
                    temp = 0;
                    while (temp < listSS.size()) {
                        if (info.getNumOfSecondary() < listSS.get(temp)) {
                            score += temp;
                        }
                        temp += 1;
                    }
                    break;

                case MRT:
                    List<Integer> listMRT = Stream.of(1, 2, 3, 4, 5).collect(Collectors.toList());
                    temp = 0;
                    while (temp < listMRT.size()) {
                        if (info.getNumOfSecondary() < listMRT.get(temp)) {
                            score += temp;
                        }
                        temp += 1;
                    }
                    break;


                case HAWKER_CENTER:
                    List<Integer> listHC = Stream.of(1, 3, 5, 10).collect(Collectors.toList());
                    temp = 0;
                    while (temp < listHC.size()) {
                        if (info.getNumOfSecondary() < listHC.get(temp)) {
                            score += temp;
                        }
                        temp += 1;
                    }
                    break;
                case PARK:
                    List<Integer> listP = Stream.of(1, 2, 3).collect(Collectors.toList());
                    temp = 0;
                    while (temp < listP.size()) {
                        if (info.getNumOfSecondary() < listP.get(temp)) {
                            score += temp;
                        }
                        temp += 1;
                    }
                    break;
                case CLINIC:
                    List<Integer> listC = Stream.of(1, 2, 5).collect(Collectors.toList());
                    temp = 0;
                    while (temp < listC.size()) {
                        if (info.getNumOfSecondary() < listC.get(temp)) {
                            score += temp;
                        }
                        temp += 1;
                    }
                    break;
                case E_WASTE:
                    List<Integer> listEW = Stream.of(1).collect(Collectors.toList());
                    temp = 0;
                    while (temp < listEW.size()) {
                        if (info.getNumOfSecondary() < listEW.get(temp)) {
                            score += temp;
                        }
                        temp += 1;
                    }

                    break;
            }
        return 0;
    }


    public List<DistrictFullInfo> getSortedDistrictByCriteria(FACILITY_TYPE[] facility_types,int k) {

        List<DistrictInfo> districts = districtInfoDao.getAllInfo();
        Map<UUID, Integer> result = new HashMap<>();
        for (DistrictInfo i : districts) {
            result.put(i.getDistrictId(),getScore(i,facility_types));
        }
        List<Map.Entry<UUID, Integer>> list = new ArrayList<>(result.entrySet());
        list.sort((o1, o2) -> Integer.compare(o1.getValue() - o2.getValue(), 0));
        List<UUID> keys = new ArrayList<>();
        for (Map.Entry<UUID, Integer> en : result.entrySet()) {
            if (k>0){
                k-=1;
                continue;
            }
            if (keys.size()<10){
                keys.add(en.getKey());}
            else{
                break;
            }
        }
        List<DistrictFullInfo> Dresults = new ArrayList<>();
        for (DistrictInfo i : districts) {
            if (keys.contains(i.getDistrictId())){
                District districtT=districtService.getDistrictById(i.getDistrictId());
                List<Float> districtRange=new ArrayList<>();
                districtRange.add(districtT.getLatEnd());
                districtRange.add(districtT.getLatStart());
                districtRange.add(districtT.getLongEnd());
                districtRange.add(districtT.getLongStart());
                String name=districtT.getDistrictName();
                String description=districtT.getDistrictDescription();
                DistrictFullInfo temp= new DistrictFullInfo(i.getDistrictId(), i.getNumOfPrimary(), i.getNumOfSecondary(), i.getNumOfJc(), i.getNumOfMixed() , i.getNumOfPark() , i.getNumOfSupermarket(), i.getNumOfHawkerCentre() ,i.getNumOfClinic(),i.getNumOfPremiumBus(), i.getNumOfEWaste() , i.getNumOfMRT() , districtRange, name, description);
                Dresults.add(temp);
            }
        }
        return Dresults;

    }

}
