package realEstatistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.mapper.DistrictInfoDao;
import realEstatistic.mapper.OptionDao;
import realEstatistic.model.Criteria;

import java.util.List;

@Service
public class SearchService {
    private DistrictInfoDao districtInfoDao;
    private OptionDao optionDao;


    @Autowired
    public SearchService(DistrictInfoDao districtInfoDao, OptionDao optionDao) {
        this.districtInfoDao = districtInfoDao;
        this.optionDao = optionDao;
    }


    public List<Criteria> getAllAvailableCriteria(){
        return optionDao.getAllOptions();
    }

//    public List<Criteria> getSortedDistrictByCriteria(int [] selectedCriteriaId){
//        for(int i:selectedCriteriaId){
//            switch(i){
//                case 0://need a map
//                    districtInfoDao.getNumOfJc();//???
//                    break;
//            }
//        }
//    }


    }

