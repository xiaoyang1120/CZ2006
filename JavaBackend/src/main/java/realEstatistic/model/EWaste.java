package realEstatistic.model;

import java.util.UUID;

public class EWaste extends Facility{
    private UUID eWasteId;
    private String eWasteName;
    private String description;

    public UUID geteWasteId() {
        return eWasteId;
    }

    public void seteWasteId(UUID eWasteId) {
        this.eWasteId = eWasteId;
    }

    public String geteWasteName() {
        return eWasteName;
    }

    public void seteWasteName(String eWasteName) {
        this.eWasteName = eWasteName;
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

    public EWaste(UUID eWasteId, String eWasteName, float lat, float long_, String description) {
        this.eWasteId = eWasteId;
        this.eWasteName = eWasteName;
        this.lat = lat;
        this.long_ = long_;
        this.description = description;
    }
}
