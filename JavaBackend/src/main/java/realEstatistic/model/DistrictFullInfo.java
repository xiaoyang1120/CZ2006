package realEstatistic.model;

import java.util.List;
import java.util.UUID;
import realEstatistic.mapper.DistrictDao;

public class DistrictFullInfo extends DistrictInfo{
    private List<Float> districtRange;
    private String Name;
    private String Description;
    public DistrictFullInfo(UUID districtId, int numOfPrimary, int numOfSecondary, int numOfJc, int numOfMixed, int numOfPark, int numOfSupermarket, int numOfHawkerCentre, int numOfClinic, int numOfPremiumBus, int numOfEWaste, int numOfMRT, List<Float> districtRange, String Name, String Description) {
        super(districtId, numOfPrimary, numOfSecondary, numOfJc, numOfMixed, numOfPark, numOfSupermarket, numOfHawkerCentre, numOfClinic, numOfPremiumBus, numOfEWaste, numOfMRT);
        this.districtRange=districtRange;
        this.Name=Name;
        this.Description=Description;
    }

}
