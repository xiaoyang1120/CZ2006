package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.DistrictInfoDao;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.util.EnumStringlizer;
import realEstatistic.model.DistrictInfo;
import java.util.List;

@Service
public class SearchService {
    private DistrictInfoDao districtInfoDao;

    @Autowired
    public SearchService(DistrictInfoDao districtInfoDao) {
        this.districtInfoDao = districtInfoDao;
    }

    public static String[] getAllAvailableCriteria(){
        return EnumStringlizer.getNames(FACILITY_TYPE.class);
    }

}
    public List<Criteria> getSortedDistrictByCriteria(int [] selectedCriteriaId){
        List<DistrictInfo> districts=districtInfoDao.getAllInfo();
        for(int i:selectedCriteriaId){
            switch(i){
                case 0://need a map

                    break;
            }
        }
    }


    }

