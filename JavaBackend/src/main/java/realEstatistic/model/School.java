package realEstatistic.model;

import java.util.UUID;


public class School {
    public enum Type{
        PRIMARY, SECONDASRY, MIXEDLEVEL, JC;
    }
    private UUID schoolId;
    private String schoolName;
    private float lat;
    private float long_;
    private String description;
    private String type;

    public UUID getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(UUID schoolId) {
        this.schoolId = schoolId;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public School(UUID schoolId, String schoolName, float lat, float long_, String description, String type) {
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.lat = lat;
        this.long_ = long_;
        this.description = description;
        this.type = type;
    }
}
