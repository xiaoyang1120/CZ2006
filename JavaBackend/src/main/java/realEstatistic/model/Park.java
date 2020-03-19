package realEstatistic.model;

import java.util.UUID;

public class Park {
    private UUID parkId;
    private String parkName;
    private float lat;
    private float long_;
    private String description;

    public Park(UUID parkId, String parkName, float lat, String description) {
        this.parkId = parkId;
        this.parkName = parkName;
        this.lat = lat;
        this.description = description;
    }

    public UUID getParkId() {
        return parkId;
    }

    public void setParkId(UUID parkId) {
        this.parkId = parkId;
    }

    public String getParkName() {
        return parkName;
    }

    public void setParkName(String parkName) {
        this.parkName = parkName;
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
}
