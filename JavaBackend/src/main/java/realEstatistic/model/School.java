package realEstatistic.model;

import java.util.UUID;

/**
 * This class implements School entity, which is taken as a special Facility due to the attribute schoolType.
 */
public class School extends Facility{
    private SCHOOL_TYPE schoolType;

    public School(UUID id, FACILITY_TYPE type, String name, String description, float lat, float long_, SCHOOL_TYPE schoolType) {
        super(id, type, name, description, lat, long_);
        this.schoolType = schoolType;
    }

    public SCHOOL_TYPE getSchoolType() {
        return schoolType;
    }

    public void setSchoolType(SCHOOL_TYPE schoolType) {
        this.schoolType = schoolType;
    }

}
