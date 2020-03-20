package realEstatistic.model;

import java.util.UUID;

public class PremiumBus extends Facility {
    private UUID premiumBusId;
    private String premiumBusName;
    private String description;

    public UUID getPremiumBusId() {
        return premiumBusId;
    }

    public void setPremiumBusId(UUID premiumBusId) {
        this.premiumBusId = premiumBusId;
    }

    public String getPremiumBusName() {
        return premiumBusName;
    }

    public void setPremiumBusName(String premiumBusName) {
        this.premiumBusName = premiumBusName;
    }

    public void setLat(float lat) {
        this.lat = lat;
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

    public PremiumBus(UUID premiumBusId, String premiumBusName, float lat, float long_, String description) {
        this.premiumBusId = premiumBusId;
        this.premiumBusName = premiumBusName;
        this.lat = lat;
        this.long_ = long_;
        this.description = description;
    }
}
