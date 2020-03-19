package realEstatistic.service;

import realEstatistic.mapper.DemoModelDao;
import realEstatistic.mapper.DistrictDao;
import realEstatistic.model.DemoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import realEstatistic.model.District;

import java.util.List;
import java.util.UUID;

@Service
public class DemoModelService {

    private DemoModelDao demoModelDao;
    private DistrictDao districtDao;

    @Autowired
    public DemoModelService(DemoModelDao demoModelDao, DistrictDao districtDao){
        this.demoModelDao = demoModelDao;
        this.districtDao = districtDao;
    }

    public boolean add(DemoModel user) {
        return demoModelDao.insert(user) > 0;
    }

    public District test(UUID districtId){
        return this.districtDao.getDistrictById(districtId);
    }
    public DemoModel getOne(int id) {
        return demoModelDao.select(id);
    }

    public List<DemoModel> getAll() {
        return demoModelDao.selectAll();
    }

    public boolean modify(DemoModel user) {
        return demoModelDao.update(user) > 0;
    }

    public boolean remove(Integer id) {
        return demoModelDao.delete(id) > 0;
    }
}