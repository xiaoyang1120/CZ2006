package realEstatistic.util;

import java.util.Arrays;

public class EnumStringlizer {
    public static String[] getNames(Class<? extends Enum<?>> e) {
        return Arrays.stream(e.getEnumConstants()).map(Enum::name).toArray(String[]::new);
    }
}
