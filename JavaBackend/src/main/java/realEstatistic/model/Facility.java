package realEstatistic.model;

import java.util.UUID;

public class Facility {
    protected UUID id;
    protected FACILITY_TYPE type;
    protected String name;
    protected String description;
    protected float lat;
    protected float long_;

    public Facility() {
    }


    public Facility(UUID id, FACILITY_TYPE type, String name, String description, float lat, float long_) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.description = description;
        this.lat = lat;
        this.long_ = long_;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public FACILITY_TYPE getType() {
        return type;
    }

    public void setType(FACILITY_TYPE type) {
        this.type = type;
    }
}
