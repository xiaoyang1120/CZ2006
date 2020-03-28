package realEstatistic.util;

import java.io.File;
import java.util.*;

public class PostalConverter {
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

    public static String convertPostal(String postalCode){
        if (!map.containsKey(postalCode)){
            return null;
        }
        return map.get(postalCode);
    }
}
