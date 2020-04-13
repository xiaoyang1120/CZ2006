package realEstatistic.util;

import java.io.File;
import java.util.*;

/**
 * This class implements a tool that can map a postal code to its corresponding latitude and longitude
 */
public class PostalConverter {
    /**
     * The mapping table of postal code to geo coordinate
     */
    private static Map<String, String> map = new HashMap<>();

    static {
        File file = new File("./src/main/java/realEstatistic/downloads/SG.txt");
        try {
            Scanner sc = new Scanner(file);
            String a = null;

            while (sc.hasNextLine()){
                a = sc.nextLine();
                map.put(a.split("\t")[1], a.split("\t\t\t\t\t\t\t")[1]);
            }
        } catch (Exception e){
            System.out.println("Error when Reading File!");
        }
    }

    /**
     * This method is to map a postal code to its corresponding latitude and longitude
     * @param postalCode the given postal code
     * @return a string contains latitude and longitude, separated by comma
     */
    public static String convertPostal(String postalCode){
        if (!map.containsKey(postalCode)){
            return null;
        }
        return map.get(postalCode);
    }
}
