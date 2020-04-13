package realEstatistic.util;

import java.util.Arrays;

/**
 * This class implements a tool that can map all values of a Enum into a string.
 */
public class EnumStringlizer {
    /**
     * This method is to map all values of a Enum into a string.
     * @param e the given Enum to be 'flattened'
     * @return a string of all values in the Enum e, separated by comma
     */
    public static String[] getNames(Class<? extends Enum<?>> e) {
        return Arrays.stream(e.getEnumConstants()).map(Enum::name).toArray(String[]::new);
    }
}
