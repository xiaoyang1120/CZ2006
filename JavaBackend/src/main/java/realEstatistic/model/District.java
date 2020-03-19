package realEstatistic.model;

import java.util.UUID;

public class District {
    private UUID districtId;
    private String districtName;
    private float latStart;
    private float latEnd;
    private float longStart;
    private float longEnd;
    private String districtDescription;

    public District(UUID districtId, String districtName, float latStart, float latEnd, float longStart, float longEnd, String districtDescription) {
        this.districtId = districtId;
        this.districtName = districtName;
        this.latStart = latStart;
        this.latEnd = latEnd;
        this.longStart = longStart;
        this.longEnd = longEnd;
        this.districtDescription = districtDescription;
    }

    public UUID getDistrictId() {
        return districtId;
    }

    public void setDistrictId(UUID districtId) {
        this.districtId = districtId;
    }

    public String getDistrictName() {
        return districtName;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    public float getLatStart() {
        return latStart;
    }

    public void setLatStart(float latStart) {
        this.latStart = latStart;
    }

    public float getLatEnd() {
        return latEnd;
    }

    public void setLatEnd(float latEnd) {
        this.latEnd = latEnd;
    }

    public float getLongStart() {
        return longStart;
    }

    public void setLongStart(float longStart) {
        this.longStart = longStart;
    }

    public float getLongEnd() {
        return longEnd;
    }

    public void setLongEnd(float longEnd) {
        this.longEnd = longEnd;
    }

    public String getDistrictDescription() {
        return districtDescription;
    }

    public void setDistrictDescription(String districtDescription) {
        this.districtDescription = districtDescription;
    }
}
