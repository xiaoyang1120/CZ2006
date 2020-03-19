package realEstatistic.mapper;

import realEstatistic.model.District;

import java.util.List;
import java.util.UUID;

public interface DistrictDao {
    District getDistrictById(UUID districtId);
    List<District> getAllDistrict();
}
