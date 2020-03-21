package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.DistrictInfoDao;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.util.EnumStringlizer;
import realEstatistic.model.DistrictInfo;

import java.util.*;
import java.util.function.Function;
import java.util.function.ToDoubleFunction;
import java.util.function.ToIntFunction;
import java.util.function.ToLongFunction;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SearchService {
    private DistrictInfoDao districtInfoDao;

    @Autowired
    public SearchService(DistrictInfoDao districtInfoDao) {
        this.districtInfoDao = districtInfoDao;
    }

    public static String[] getAllAvailableCriteria() {
        return EnumStringlizer.getNames(FACILITY_TYPE.class);
    }

    public int getScore(DistrictInfo info,FACILITY_TYPE[] facility_types){
        int score=0;
        for (FACILITY_TYPE i:facility_types){
            switch(i){
                case PRIMARY_SCHOOL:
//                    List<int> score=new Arrays.asList(1,2,3);
                    int temp=0;
                    List<Integer> listPS = Stream.of(1,3,5).collect(Collectors.toList());
                    while (temp <= listPS.size()){
                        if (info.getNumOfPrimary()<listPS.get(temp)){
                            score+=temp;
                        }
                        temp+=1;
                    }
                    break;
                case SECONDARY_SCHOOL:
                case JUNIOR_COLLEGE:
                case MIXED_SCHOOL:
                case SUPERMARKET:
                case PREMIUM_BUS:
                    List<Integer> listSS = Stream.of(1,3,5).collect(Collectors.toList());
                    temp=0;
                    while (temp <= listSS.size()){
                        if (info.getNumOfSecondary()<listSS.get(temp)){
                            score+=temp;
                        }
                        temp+=1;
                    }
                    break;

                case MRT:
                    List<Integer> listMRT = Stream.of(1,2,3,4,5).collect(Collectors.toList());
                    temp=0;
                    while (temp <= listMRT.size()){
                        if (info.getNumOfSecondary()<listMRT.get(temp)){
                            score+=temp;
                        }
                        temp+=1;
                    }
                    break;


                case HAWKER_CENTER:
                    List<Integer> listHC = Stream.of(1,3,5,10).collect(Collectors.toList());
                    temp=0;
                    while (temp <= listHC.size()){
                        if (info.getNumOfSecondary()<listHC.get(temp)){
                            score+=temp;
                        }
                        temp+=1;
                    }
                    break;
                case PARK:
                    List<Integer> listP = Stream.of(1,2,3).collect(Collectors.toList());
                    temp=0;
                    while (temp <= listP.size()){
                        if (info.getNumOfSecondary()<listP.get(temp)){
                            score+=temp;
                        }
                        temp+=1;
                    }
                    break;
                case CLINIC:
                    List<Integer> listC = Stream.of(1,2,5).collect(Collectors.toList());
                    temp=0;
                    while (temp <= listC.size()){
                        if (info.getNumOfSecondary()<listC.get(temp)){
                            score+=temp;
                        }
                        temp+=1;
                    }
                    break;
                case E_WASTE:
                    List<Integer> listEW = Stream.of(1).collect(Collectors.toList());
                    temp=0;
                    while (temp <= listEW.size()){
                        if (info.getNumOfSecondary()<listEW.get(temp)){
                            score+=temp;
                        }
                        temp+=1;
                    }

                    break;
            }

        }
        return 0;
    }


    public List<DistrictInfo> getSortedDistrictByCriteria(FACILITY_TYPE[] facility_types,int k) {

        List<DistrictInfo> districts = districtInfoDao.getAllInfo();
        Map<UUID, Integer> result = new HashMap<UUID, Integer>();
        for (DistrictInfo i : districts) {
            result.put(i.getDistrictId(),getScore(i,facility_types));
        }
        List<Map.Entry<UUID, Integer>> list = new ArrayList<Map.Entry<UUID, Integer>>(result.entrySet());
        Collections.sort(list, new Comparator<Map.Entry<UUID, Integer>>() {
            public int compare(Map.Entry<UUID, Integer> o1, Map.Entry<UUID, Integer> o2) {
                if(o1.getValue()-o2.getValue() < 0 ){
                    return -1;
                }else if(o1.getValue()-o2.getValue()== 0){
                    return 0;
                }else{
                    return 1;
                }
            }
        });
        List<UUID> keys = new ArrayList<>();
        for (Map.Entry<UUID, Integer> en : result.entrySet()) {
            if (keys.size()<k){
                keys.add(en.getKey());}
            else{
                break;
            }
        }
        List<DistrictInfo> Dresults = new ArrayList<>();
        for (DistrictInfo i : districts) {
            if (keys.contains(i.getDistrictId())){
                Dresults.add(i);
            }
        }
        return Dresults;

    }

}
