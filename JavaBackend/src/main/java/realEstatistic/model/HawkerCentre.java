package realEstatistic.model;

import java.util.UUID;

public class HawkerCentre {
    private UUID hawkerCentreId;
    private String hawkerCentreName;
    private float lat;
    private float long_;
    private String description;

    public UUID getHawkerCentreId() {
        return hawkerCentreId;
    }

    public void setHawkerCentreId(UUID hawkerCentreId) {
        this.hawkerCentreId = hawkerCentreId;
    }

    public String getHawkerCentreName() {
        return hawkerCentreName;
    }

    public void setHawkerCentreName(String hawkerCentreName) {
        this.hawkerCentreName = hawkerCentreName;
    }

    public float getLat() {
        return lat;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }

    public float getLong_() {
        return long_;
    }

    public void setLong_(float long_) {
        this.long_ = long_;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public HawkerCentre(UUID hawkerCentreId, String hawkerCentreName, float lat, float long_, String description) {
        this.hawkerCentreId = hawkerCentreId;
        this.hawkerCentreName = hawkerCentreName;
        this.lat = lat;
        this.long_ = long_;
        this.description = description;
    }
}
