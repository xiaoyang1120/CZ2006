package realEstatistic.model;

import java.util.HashMap;
import java.util.Map;

public enum SCHOOL_TYPE {
    PRIMARY, SECONDASRY, MIXEDLEVEL, JC, CI, NA;
    static final private Map<String,SCHOOL_TYPE> ALIAS_MAP = new HashMap<>();
    static {
        ALIAS_MAP.put("JUNIOR COLLEGE", JC);
        ALIAS_MAP.put("MIXED LEVELS", MIXEDLEVEL);
        ALIAS_MAP.put("MIXED LEVEL", MIXEDLEVEL);
        ALIAS_MAP.put("PRIMARY", PRIMARY);
        ALIAS_MAP.put("SECONDARY", SECONDASRY);
        ALIAS_MAP.put("CENTRALISED INSTITUTE", CI);
        ALIAS_MAP.put("NA", NA);
    }

    static public SCHOOL_TYPE fromString(String value) throws IllegalArgumentException {
        SCHOOL_TYPE schoolType = ALIAS_MAP.get(value.toUpperCase());
        if (schoolType == null)
            throw new IllegalArgumentException("Not an alias: "+value);
        return schoolType;
    }
}