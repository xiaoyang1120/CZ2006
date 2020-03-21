package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.DistrictInfoDao;
import realEstatistic.model.FACILITY_TYPE;
import realEstatistic.util.EnumStringlizer;

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

