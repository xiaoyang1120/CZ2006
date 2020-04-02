package realEstatistic.model;

import java.util.List;
import java.util.UUID;
import realEstatistic.mapper.DistrictDao;

public class DistrictFullInfo extends DistrictInfo{
    private List<Float> districtRange;
    private String name;
    private String description;

    public DistrictFullInfo(UUID districtId, int numOfPrimary, int numOfSecondary, int numOfJc, int numOfMixed, int numOfPark, int numOfSupermarket, int numOfHawkerCentre, int numOfClinic, int numOfPremiumBus, int numOfEWaste, int numOfMRT, List<Float> districtRange, String Name, String Description) {
        super(districtId, numOfPrimary, numOfSecondary, numOfJc, numOfMixed, numOfPark, numOfSupermarket, numOfHawkerCentre, numOfClinic, numOfPremiumBus, numOfEWaste, numOfMRT);
        this.districtRange=districtRange;
        this.name=Name;
        this.description=Description;
    }

    public List<Float> getDistrictRange() {
        return this.districtRange;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDistrictRange(List<Float> districtRange) {
        this.districtRange = districtRange;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
