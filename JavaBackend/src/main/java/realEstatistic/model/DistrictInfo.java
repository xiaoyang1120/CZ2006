package realEstatistic.model;

import java.util.UUID;

public class DistrictInfo {
    private UUID districtId;
    private int numOfPrimary;
    private int numOfSecondary;
    private int numOfJc;
    private int numOfMixed;
    private int numOfPark;
    private int numOfSupermarket;
    private int numOfHawkerCentre;
    private int numOfClinic;
    private int numOfPremiumBus;
    private int numOfEWaste;
    private int numOfMRT;

    public DistrictInfo(UUID districtId, int numOfPrimary, int numOfSecondary, int numOfJc, int numOfMixed, int numOfPark, int numOfSupermarket, int numOfHawkerCentre, int numOfClinic, int numOfPremiumBus, int numOfEWaste, int numOfMRT) {
        this.districtId = districtId;
        this.numOfPrimary = numOfPrimary;
        this.numOfSecondary = numOfSecondary;
        this.numOfJc = numOfJc;
        this.numOfMixed = numOfMixed;
        this.numOfPark = numOfPark;
        this.numOfSupermarket = numOfSupermarket;
        this.numOfHawkerCentre = numOfHawkerCentre;
        this.numOfClinic = numOfClinic;
        this.numOfPremiumBus = numOfPremiumBus;
        this.numOfEWaste = numOfEWaste;
        this.numOfMRT = numOfMRT;
    }

    public UUID getDistrictId() {
        return districtId;
    }

    public void setDistrictId(UUID districtId) {
        this.districtId = districtId;
    }

    public int getNumOfPrimary() {
        return numOfPrimary;
    }

    public void setNumOfPrimary(int numOfPrimary) {
        this.numOfPrimary = numOfPrimary;
    }

    public int getNumOfSecondary() {
        return numOfSecondary;
    }

    public void setNumOfSecondary(int numOfSecondary) {
        this.numOfSecondary = numOfSecondary;
    }

    public int getNumOfJc() {
        return numOfJc;
    }

    public void setNumOfJc(int numOfJc) {
        this.numOfJc = numOfJc;
    }

    public int getNumOfMixed() {
        return numOfMixed;
    }

    public void setNumOfMixed(int numOfMixed) {
        this.numOfMixed = numOfMixed;
    }

    public int getNumOfPark() {
        return numOfPark;
    }

    public void setNumOfPark(int numOfPark) {
        this.numOfPark = numOfPark;
    }

    public int getNumOfSupermarket() {
        return numOfSupermarket;
    }

    public void setNumOfSupermarket(int numOfSupermarket) {
        this.numOfSupermarket = numOfSupermarket;
    }

    public int getNumOfHawkerCentre() {
        return numOfHawkerCentre;
    }

    public void setNumOfHawkerCentre(int numOfHawkerCentre) {
        this.numOfHawkerCentre = numOfHawkerCentre;
    }

    public int getNumOfClinic() {
        return numOfClinic;
    }

    public void setNumOfClinic(int numOfClinic) {
        this.numOfClinic = numOfClinic;
    }

    public int getNumOfPremiumBus() {
        return numOfPremiumBus;
    }

    public void setNumOfPremiumBus(int numOfPremiumBus) {
        this.numOfPremiumBus = numOfPremiumBus;
    }

    public int getNumOfEWaste() {
        return numOfEWaste;
    }

    public void setNumOfEWaste(int numOfEWaste) {
        this.numOfEWaste = numOfEWaste;
    }

    public int getNumOfMRT() {
        return numOfMRT;
    }

    public void setNumOfMRT(int numOfMRT) {
        this.numOfMRT = numOfMRT;
    }
}
