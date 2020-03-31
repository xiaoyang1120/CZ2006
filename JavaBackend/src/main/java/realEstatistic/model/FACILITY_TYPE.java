package realEstatistic.model;

import java.util.HashMap;
import java.util.Map;

public enum FACILITY_TYPE {
    PRIMARY_SCHOOL, SECONDARY_SCHOOL, JUNIOR_COLLEGE, MIXED_SCHOOL, MRT, HAWKER_CENTER, PARK, CLINIC, SUPERMARKET,
    PREMIUM_BUS, E_WASTE;

    static final private Map<SCHOOL_TYPE,FACILITY_TYPE> ALIAS_MAP = new HashMap<>();
    static {
        ALIAS_MAP.put(SCHOOL_TYPE.PRIMARY, PRIMARY_SCHOOL);
        ALIAS_MAP.put(SCHOOL_TYPE.SECONDASRY, SECONDARY_SCHOOL);
        ALIAS_MAP.put(SCHOOL_TYPE.MIXEDLEVEL, MIXED_SCHOOL);
        ALIAS_MAP.put(SCHOOL_TYPE.JC, JUNIOR_COLLEGE);
        ALIAS_MAP.put(SCHOOL_TYPE.CI, MIXED_SCHOOL);
        ALIAS_MAP.put(SCHOOL_TYPE.NA, MIXED_SCHOOL);
    }

    static public FACILITY_TYPE fromShool(SCHOOL_TYPE value) throws IllegalArgumentException {
        FACILITY_TYPE schoolType = ALIAS_MAP.get(value);
        if (schoolType == null)
            throw new IllegalArgumentException("Not an alias: "+value);
        return schoolType;
    }
}
