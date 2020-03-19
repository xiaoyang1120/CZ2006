package realEstatistic.model;

import java.util.UUID;

public class Clinic {
    private UUID clinicId;
    private String clinicName;
    private float lat;
    private float long_;
    private String description;

    public UUID getClinicId() {
        return clinicId;
    }

    public void setClinicId(UUID clinicId) {
        this.clinicId = clinicId;
    }

    public String getClinicName() {
        return clinicName;
    }

    public void setClinicName(String clinicName) {
        this.clinicName = clinicName;
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

    public Clinic(UUID clinicId, String clinicName, float lat, float long_, String description) {
        this.clinicId = clinicId;
        this.clinicName = clinicName;
        this.lat = lat;
        this.long_ = long_;
        this.description = description;
    }
}
