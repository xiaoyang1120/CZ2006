package realEstatistic.model;

import java.util.UUID;

public class School extends Facility{
    private UUID schoolId;
    private String schoolName;
    private String description;
    private SCHOOL_TYPE type;

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

    public SCHOOL_TYPE getType() {
        return type;
    }

    public void setType(SCHOOL_TYPE type) {
        this.type = type;
    }

    public School(UUID schoolId, String schoolName, float lat, float long_, String description, SCHOOL_TYPE type) {
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.lat = lat;
        this.long_ = long_;
        this.description = description;
        this.type = type;
    }
}
